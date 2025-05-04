#!/usr/bin/env node

/**
 * Script para testar a performance do site usando Lighthouse
 * Executa testes em diferentes páginas e dispositivos
 * 
 * Uso: node scripts/test-performance.js [--mobile] [--desktop] [--ci]
 * 
 * Flags:
 *   --mobile: Executar apenas testes mobile (default se nenhum for especificado)
 *   --desktop: Executar apenas testes desktop
 *   --ci: Modo CI (não abre navegador, apenas salva relatório)
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Parse command-line arguments
const argv = yargs(hideBin(process.argv))
  .option('mobile', {
    type: 'boolean',
    description: 'Executar apenas testes mobile'
  })
  .option('desktop', {
    type: 'boolean',
    description: 'Executar apenas testes desktop'
  })
  .option('ci', {
    type: 'boolean',
    description: 'Modo CI (não abre navegador, apenas salva relatório)'
  })
  .argv;

// Se nenhum foi especificado, default para mobile
const runMobile = argv.mobile || (!argv.mobile && !argv.desktop);
const runDesktop = argv.desktop || (!argv.mobile && !argv.desktop);
const ciMode = argv.ci || false;

// Páginas para testar
const pagesToTest = [
  '/',
  '/modulo/ferramentas',
  '/modulo/pesquisa',
  '/modulo/decifrando',
  '/modulo/elaborando',
  '/modulo/conclusao',
  '/design-system'
];

// Configuração de dispositivos
const deviceConfigs = {
  mobile: {
    emulatedFormFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
    },
  },
  desktop: {
    emulatedFormFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 5120,
      cpuSlowdownMultiplier: 1,
    },
  }
};

// Verificar se o diretório de relatórios existe, senão criar
const reportDir = path.join(__dirname, '..', 'lighthouse-reports');
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

// Função para executar o teste Lighthouse
async function runLighthouse(url, device) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage'
    ],
  });

  // Configurações específicas do dispositivo
  const config = {
    extends: 'lighthouse:default',
    settings: {
      ...deviceConfigs[device],
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      output: ['html', 'json'],
      skipAudits: ciMode ? ['uses-http2'] : [],
    },
  };

  const { lhr } = await lighthouse(url, {
    port: chrome.port,
    output: 'json',
    logLevel: 'info',
  }, config);

  // Formatar a data para o nome do arquivo
  const dateStr = new Date().toISOString().replace(/[:.]/g, '-');
  const pageName = url.split('/').pop() || 'home';
  
  // Salvar relatório HTML
  const htmlReport = path.join(
    reportDir, 
    `${pageName}-${device}-${dateStr}.html`
  );
  fs.writeFileSync(htmlReport, lhr.report[0]);
  
  // Salvar relatório JSON
  const jsonReport = path.join(
    reportDir, 
    `${pageName}-${device}-${dateStr}.json`
  );
  fs.writeFileSync(jsonReport, JSON.stringify(lhr, null, 2));

  await chrome.kill();

  return {
    url,
    device,
    scores: {
      performance: lhr.categories.performance.score * 100,
      accessibility: lhr.categories.accessibility.score * 100,
      bestPractices: lhr.categories['best-practices'].score * 100,
      seo: lhr.categories.seo.score * 100,
    },
    reportPath: htmlReport,
  };
}

// Função principal
async function main() {
  console.log('Iniciando testes de performance...\n');
  
  // Detectar URL base
  let baseUrl = 'http://localhost:3000';
  
  // Verificar se o servidor está rodando
  try {
    await new Promise((resolve, reject) => {
      exec('curl -s ' + baseUrl, (error) => {
        if (error) {
          console.log('Servidor não está rodando em localhost:3000. Tentando iniciar...');
          exec('npm run dev', (err) => {
            if (err) {
              reject('Não foi possível iniciar o servidor: ' + err);
            } else {
              // Esperar o servidor iniciar
              setTimeout(() => resolve(), 5000);
            }
          });
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  
  const results = [];
  
  // Executar testes para cada página e dispositivo
  for (const page of pagesToTest) {
    const url = baseUrl + page;
    
    // Testes mobile
    if (runMobile) {
      console.log(`Testando [Mobile]: ${url}`);
      const mobileResult = await runLighthouse(url, 'mobile');
      results.push(mobileResult);
    }
    
    // Testes desktop
    if (runDesktop) {
      console.log(`Testando [Desktop]: ${url}`);
      const desktopResult = await runLighthouse(url, 'desktop');
      results.push(desktopResult);
    }
  }
  
  // Resumo dos resultados
  console.log('\n===== RESUMO DOS RESULTADOS =====');
  results.forEach(result => {
    console.log(`\n${result.url} [${result.device}]:`);
    console.log(`  Performance:   ${result.scores.performance.toFixed(1)}`);
    console.log(`  Acessibilidade: ${result.scores.accessibility.toFixed(1)}`);
    console.log(`  Boas Práticas:  ${result.scores.bestPractices.toFixed(1)}`);
    console.log(`  SEO:            ${result.scores.seo.toFixed(1)}`);
    console.log(`  Relatório:      ${result.reportPath}`);
  });
  
  // Calcular médias
  const avgPerformance = results.reduce((sum, r) => sum + r.scores.performance, 0) / results.length;
  const avgAccessibility = results.reduce((sum, r) => sum + r.scores.accessibility, 0) / results.length;
  const avgBestPractices = results.reduce((sum, r) => sum + r.scores.bestPractices, 0) / results.length;
  const avgSeo = results.reduce((sum, r) => sum + r.scores.seo, 0) / results.length;
  
  console.log('\n===== MÉDIAS =====');
  console.log(`  Performance:    ${avgPerformance.toFixed(1)}`);
  console.log(`  Acessibilidade: ${avgAccessibility.toFixed(1)}`);
  console.log(`  Boas Práticas:  ${avgBestPractices.toFixed(1)}`);
  console.log(`  SEO:            ${avgSeo.toFixed(1)}`);
  
  console.log(`\nRelatórios salvos em: ${reportDir}`);
  
  // Verificar se atingimos os critérios mínimos
  const passedCriteria = avgAccessibility >= 90;
  
  if (!passedCriteria && ciMode) {
    console.error('FALHA: Pontuação de acessibilidade abaixo de 90.');
    process.exit(1);
  }
  
  console.log('\nTestes completados.');
}

main().catch(error => {
  console.error('Erro:', error);
  process.exit(1);
}); 