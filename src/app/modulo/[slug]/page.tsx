"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import DownloadButton from '@/components/DownloadButton';
import ChecklistItem from '@/components/ChecklistItem';
import ContentCard from '@/components/ContentCard';
import { ChevronDown, ChevronUp, BookOpen, FileText, Info } from 'lucide-react';

// --- Estrutura de Dados para Conteúdo dos Módulos ---
const moduleContent: { [key: string]: any } = {
  // --- Módulo 1: Ferramentas ---
  'ferramentas': {
    title: 'Módulo 1: Ferramentas Essenciais',
    sections: [
      {
        slug: 'introducao',
        title: 'Introdução',
        type: 'html',
        content: `<p>Bem-vindo(a)! Neste módulo, vamos explorar ferramentas básicas para criar documentos simples e organizar suas ideias para projetos. <br/>
        <span class="font-semibold">Dica:</span> Não tenha medo de experimentar! O importante é começar, mesmo que o documento não fique perfeito de primeira.</p>
        <ul class="list-disc list-inside ml-4 my-2 text-gray-700">
          <li><strong>Exemplo prático:</strong> Precisa escrever uma declaração simples? Use o modelo disponível e personalize com os dados da sua comunidade.</li>
          <li><strong>Orientação:</strong> Se tiver dúvidas sobre termos ou formatos, consulte o glossário ou peça ajuda para alguém da associação.</li>
        </ul>
        <p class="mt-2 text-sm text-green-700">Ao final deste módulo, você será capaz de criar documentos básicos, formatar textos e baixar modelos prontos para facilitar sua rotina.</p>`,
      },
      {
        slug: 'formatacao-texto',
        title: '1. Formatando seus Textos',
        type: 'html',
        content: `
          <p>Usar formatação ajuda a organizar e destacar informações importantes.</p>
          <ul class="list-disc list-inside ml-4 my-2 space-y-1 text-gray-700">
            <li><strong>Títulos e Subtítulos:</strong> Use tamanhos diferentes ou negrito para separar seções.</li>
            <li><strong>Parágrafos:</strong> Mantenha-os curtos e focados em uma ideia.</li>
            <li><strong>Listas:</strong> Ótimas para enumerar itens ou passos (como esta!).</li>
            <li><strong>Negrito:</strong> Use <strong>negrito</strong> para dar ênfase a palavras-chave.</li>
            <li><em>Itálico:</em> Use <em>itálico</em> para termos estrangeiros ou ênfase sutil.</li>
          </ul>
          <ul class="list-disc list-inside ml-4 my-2 text-green-700 text-sm">
            <li>Dica: Use sempre títulos claros e objetivos para facilitar a leitura.</li>
            <li>Dica: Se possível, peça para outra pessoa revisar seu texto antes de enviar.</li>
            <li>Dica: Evite textos muito longos: divida em parágrafos curtos.</li>
          </ul>
          <p class="mt-2 text-sm text-blue-700">Exemplo:<br/>
            <strong>Título:</strong> Solicitação de Apoio para Oficina de Artesanato<br/>
            <strong>Parágrafo:</strong> Nossa comunidade busca apoio para realizar uma oficina de artesanato tradicional, valorizando a cultura local e gerando renda para as famílias.
          </p>
        `
      },
      {
        slug: 'imagens',
        title: '2. Usando Imagens Simples',
        type: 'html',
        content: `
          <p>Imagens podem ilustrar suas ideias, mas use com moderação.</p>
          <ul class="list-disc list-inside ml-4 my-2 space-y-1 text-gray-700">
            <li><strong>Onde encontrar:</strong> Se precisar, busque em bancos de imagens gratuitos (como Unsplash, Pexels) ou use fotos próprias.</li>
            <li><strong>Como inserir:</strong> A maioria dos editores de texto (Word, Google Docs, LibreOffice Writer) tem um botão "Inserir Imagem".</li>
            <li><strong>Importante:</strong> Verifique se o edital permite imagens e se elas são realmente necessárias.</li>
          </ul>
          <ul class="list-disc list-inside ml-4 my-2 text-green-700 text-sm">
            <li>Dica: Prefira imagens que realmente ajudem a explicar sua ideia.</li>
            <li>Dica: Sempre confira se o edital permite o uso de imagens.</li>
            <li>Dica: Evite imagens com informações pessoais ou sensíveis.</li>
          </ul>
          <p class="mt-2 text-sm text-blue-700">Exemplo:<br/>
            <strong>Como inserir:</strong> No Word ou Google Docs, clique em 'Inserir' > 'Imagem' e escolha a foto desejada.
          </p>
        `
      },
      {
        slug: 'templates',
        title: '3. Templates Prontos para Usar',
        type: 'downloads',
        items: [
          { fileName: 'oficio.docx', label: 'Modelo de Ofício Simples (.docx)' },
          { fileName: 'declaracao.odt', label: 'Modelo de Declaração Simples (.odt)' },
          { fileName: 'orcamento.xlsx', label: 'Modelo Orçamento Básico (.xlsx)' },
        ],
        content: `<p class="mt-2 text-sm text-gray-600">Clique nos botões para baixar os modelos. <br/>
        <span class="font-semibold">Dica:</span> Após baixar, abra o arquivo e preencha com os dados da sua comunidade. Se tiver dúvidas, consulte as instruções dentro do próprio modelo ou peça ajuda para alguém de confiança.</p>
        <ul class="list-disc list-inside ml-4 my-2 text-gray-700">
          <li><strong>Modelo de Ofício:</strong> Use para solicitações formais a órgãos públicos ou parceiros.</li>
          <li><strong>Modelo de Declaração:</strong> Ideal para comprovar participação, residência ou vínculo com a comunidade.</li>
          <li><strong>Modelo de Orçamento:</strong> Organize os custos do projeto de forma simples e clara.</li>
        </ul>
        <p class="mt-2 text-sm text-green-700">Esses modelos são aceitos na maioria dos editais e facilitam a organização dos documentos.</p>`,
      },
    ],
  },
  // --- Módulo 2: Pesquisa ---
  'pesquisa': {
    title: 'Módulo 2: Pesquisa de Editais e Oportunidades',
    sections: [
      {
        slug: 'onde-buscar',
        title: '1. Onde Buscar Editais?',
        type: 'html',
        content: `
          <p class="text-gray-700 mb-2">Encontrar o edital certo é o primeiro passo! Veja onde procurar oportunidades para sua comunidade:</p>
          <ul class="list-disc list-inside ml-4 space-y-3 text-gray-700">
            <li>
              <strong>Sites Oficiais do Governo:</strong>
              <ul class="list-circle list-inside ml-6 mt-1 space-y-1">
                <li><a href="https://www.gov.br/pt-br" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Portal Gov.br</a> (ministérios como Cidadania, Cultura, Igualdade Racial, Povos Indígenas, Desenvolvimento Agrário).</li>
                <li>Secretarias Estaduais e Municipais (Agricultura, Cultura, Assistência Social, etc.) da sua região.</li>
                <li><a href="https://www.gov.br/transferegov/pt-br" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Plataforma Transferegov</a> (antiga Plataforma +Brasil) – pode ser complexa, peça ajuda se necessário.</li>
              </ul>
            </li>
            <li><strong>Fundações e Institutos:</strong> Ex: Fundação Banco do Brasil, Itaú Social, Fundação Ford. Pesquise por área de interesse.</li>
            <li><strong>ONGs e Organizações da Sociedade Civil:</strong> ONGs que atuam com PCTs ou na sua região podem divulgar ou lançar editais.</li>
            <li><strong>Redes Sociais e Grupos:</strong> Grupos de WhatsApp, Facebook, páginas de associações, sindicatos e coletivos.</li>
            <li><strong>Pergunte para quem já participou:</strong> Converse com associações locais, sindicatos, técnicos da EMATER, jovens que já acessaram editais.</li>
          </ul>
          <ul class="list-disc list-inside ml-4 my-2 text-green-700 text-sm">
            <li>Dica: Visite esses sites periodicamente e cadastre-se para receber informativos ou alertas.</li>
            <li>Dica: Salve links importantes nos favoritos do seu navegador ou anote em um caderno.</li>
          </ul>
          <p class="mt-2 text-blue-700 text-sm">Exemplo prático: <br/>
            <strong>Passo a passo:</strong> Entre no Portal Gov.br, busque por "editais abertos" e filtre por área de interesse (cultura, agricultura, juventude, etc.).
          </p>
        `,
      },
      {
        slug: 'usando-ias',
        title: '2. Usando Inteligência Artificial (Chatbots)',
        type: 'html',
        content: `
          <p class="text-gray-700 mb-2">Ferramentas como ChatGPT, Gemini, Copilot podem ajudar a encontrar editais, resumir textos e tirar dúvidas. Use com atenção:</p>
          <ul class="list-disc list-inside ml-4 space-y-1 text-gray-700">
            <li><strong>Para pesquisar:</strong> Peça: "Encontre editais abertos para comunidades tradicionais na Bahia sobre agricultura familiar".</li>
            <li><strong>Para resumir:</strong> "Resuma os principais pontos deste edital [colar o texto ou link]".</li>
            <li><strong>Para tirar dúvidas:</strong> "O que significa 'contrapartida' em um edital?".</li>
          </ul>
          <div class="mt-4 p-3 bg-red-50 border border-red-200 rounded">
            <p class="font-semibold text-red-700">Atenção:</p>
            <ul class="list-disc list-inside ml-4 mt-1 space-y-1 text-red-600 text-sm">
              <li>As IAs podem errar ou dar informações desatualizadas. <strong>Sempre confira a informação no site oficial do edital!</strong></li>
              <li>Não compartilhe dados pessoais ou informações sensíveis da sua comunidade nos chats.</li>
              <li>Use a IA como apoio, mas sempre valide com fontes oficiais.</li>
            </ul>
          </div>
          <p class="mt-2 text-green-700 text-sm">Dica: Se ficar em dúvida, peça para alguém da associação ou rede de apoio revisar a resposta da IA.</p>
        `,
      },
      {
        slug: 'alertas',
        title: '3. Criando Alertas e Não Perdendo Oportunidades',
        type: 'html',
        content: `
          <p class="text-gray-700 mb-2">Para não perder oportunidades, use ferramentas que avisam quando surgem novos editais:</p>
          <ul class="list-disc list-inside ml-4 space-y-1 text-gray-700">
            <li><strong>Newsletters:</strong> Cadastre-se em listas de e-mail de órgãos públicos, ONGs e fundações.</li>
            <li><strong>Alertas do Google:</strong> Crie alertas para termos como "edital comunidade tradicional", "financiamento projeto quilombola", etc. (<a href="https://www.google.com.br/alerts" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">google.com.br/alerts</a>).</li>
            <li><strong>Redes Sociais:</strong> Siga páginas e perfis de órgãos, ONGs e coletivos relevantes.</li>
            <li><strong>Grupos de WhatsApp:</strong> Entre em grupos de associações, sindicatos e juventudes rurais.</li>
          </ul>
          <ul class="list-disc list-inside ml-4 my-2 text-green-700 text-sm">
            <li>Dica: Combine diferentes fontes de alerta para não depender de apenas um canal.</li>
            <li>Dica: Compartilhe oportunidades nos grupos da sua comunidade.</li>
          </ul>
        `,
      },
      {
        slug: 'links-uteis',
        title: '4. Links Úteis para Pesquisa',
        type: 'html',
        content: `
          <ul class="list-disc list-inside ml-4 space-y-1 text-blue-700">
            <li><a href="https://www.gov.br/pt-br" target="_blank" rel="noopener noreferrer" class="hover:underline">Portal Gov.br</a></li>
            <li><a href="https://www.gov.br/transferegov/pt-br" target="_blank" rel="noopener noreferrer" class="hover:underline">Plataforma Transferegov</a></li>
            <li><a href="https://www.google.com.br/alerts" target="_blank" rel="noopener noreferrer" class="hover:underline">Google Alerts</a></li>
            <li><a href="https://www.itau.com.br/itausocial/" target="_blank" rel="noopener noreferrer" class="hover:underline">Itaú Social</a></li>
            <li><a href="https://www.fbb.org.br/" target="_blank" rel="noopener noreferrer" class="hover:underline">Fundação Banco do Brasil</a></li>
            <li><a href="https://www.facebook.com/groups/editaissociais" target="_blank" rel="noopener noreferrer" class="hover:underline">Grupo Editais Sociais (Facebook)</a></li>
          </ul>
          <p class="mt-2 text-sm text-green-700">Salve esses links e compartilhe com sua rede!</p>
        `,
      },
      {
        slug: 'checklist-pesquisa',
        title: '5. Checklist: Estou Pronto para Pesquisar?',
        type: 'checklist',
        items: [
          { label: 'Sei onde buscar editais e oportunidades para minha comunidade?' },
          { label: 'Tenho uma lista de sites e grupos para acompanhar novidades?' },
          { label: 'Sei como criar alertas para não perder prazos?' },
          { label: 'Consultei alguém da rede de apoio para dicas de pesquisa?' },
          { label: 'Salvei os links e contatos importantes?' },
        ],
      },
    ],
  },
  // --- Módulo 3: Decifrando ---
  'decifrando': {
    title: 'Módulo 3: Decifrando Editais e Políticas para PCTs',
    slug: 'decifrando', // Adiciona slug do módulo para chave de estado
    sections: [
      {
        slug: 'anatomia-edital',
        title: '1. Anatomia de um Edital',
        type: 'anatomia', // Alterado para tipo 'anatomia'
        introContent: `<p class="text-gray-700 mb-3">Editais parecem difíceis, mas quase sempre seguem uma estrutura parecida. Clique em cada item para ver os detalhes e use isso a seu favor:</p>`,
        items: [ // Itens agora são um array para renderização interativa
          { title: 'Objeto', content: 'O que o edital financia? Ex: "Apoiar projetos culturais de comunidades quilombolas".' },
          { title: 'Público-alvo/Elegibilidade', content: 'Quem pode participar? Ex: "Associações quilombolas com CNPJ ativo", "Jovens agricultores familiares de 18 a 29 anos". <span class="text-green-700">Dica: Se sua comunidade não se encaixa, procure outros editais!</span>' },
          { title: 'Prazos', content: 'Fique atento às datas: inscrição, execução do projeto, prestação de contas. <span class="text-green-700">Dica: Anote tudo em um calendário ou peça para alguém ajudar a controlar os prazos.</span>' },
          { title: 'Documentação Exigida', content: 'Quais documentos precisa enviar? Ex: CNPJ, estatuto, ata, certidões negativas, documentos pessoais. <span class="text-green-700">Dica: Veja no Módulo 1 modelos e dicas para organizar documentos.</span>' },
          { title: 'Critérios de Avaliação', content: 'Como seu projeto será avaliado? Ex: "Impacto na comunidade (30 pontos)", "Coerência do orçamento (20 pontos)". <span class="text-green-700">Dica: Foque nos critérios mais valiosos ao escrever sua proposta.</span>' },
          { title: 'Orçamento/Valores', content: 'Quanto o edital oferece? O que pode ser pago? Precisa de contrapartida (dinheiro, trabalho, material)? <span class="text-green-700">Dica: Use o modelo de orçamento do Módulo 1.</span>' },
          { title: 'Contatos/Dúvidas', content: 'Sempre há um contato para dúvidas. <span class="text-green-700">Dica: Não tenha medo de perguntar!</span>' },
        ],
        outroContent: `<p class="mt-4 text-blue-700 text-sm">Exemplo prático: <br/><strong>Passo a passo:</strong> Pegue um edital real, destaque cada parte acima e preencha com as informações da sua comunidade.</p>`
      },
      {
        slug: 'glossario',
        title: '2. Glossário de Termos Comuns',
        type: 'glossary',
        terms: [
          { term: 'Proponente', definition: 'Quem apresenta o projeto (pessoa física, associação, grupo).' },
          { term: 'Contrapartida', definition: 'Parte dos custos do projeto que o proponente assume. Pode ser dinheiro, trabalho, materiais.' },
          { term: 'Rubrica', definition: 'Item de despesa no orçamento. Ex: "Material de escritório", "Alimentação", "Transporte".' },
          { term: 'Plano de Trabalho', definition: 'Documento que detalha etapas, atividades, metas e cronograma.' },
          { term: 'CNPJ', definition: 'Cadastro Nacional da Pessoa Jurídica. É como o "CPF" das associações.' },
          { term: 'Certidões Negativas', definition: 'Documentos que provam que a entidade não tem dívidas com o governo (Receita Federal, INSS, FGTS).' },
          { term: 'Objeto do Edital', definition: 'O que o edital quer financiar ou apoiar.' },
          { term: 'Prestação de Contas', definition: 'Relatório mostrando como o dinheiro do projeto foi usado, com notas fiscais e comprovantes.' },
          { term: 'Edital', definition: 'Documento oficial que apresenta as regras, prazos e condições para participar de uma seleção pública.' },
        ],
      },
      {
        slug: 'direitos-politicas',
        title: '3. Seus Direitos e Políticas Públicas',
        type: 'html',
        content: `
          <p class="text-gray-700 mb-2">Conhecer seus direitos e as políticas públicas fortalece sua comunidade! Veja alguns exemplos importantes para PCTs:</p>
          <ul class="list-disc list-inside ml-4 space-y-2 text-gray-700">
            <li><strong>Direito ao Território:</strong> Regularização fundiária para indígenas, quilombolas, fundo e fecho de pasto.</li>
            <li><strong>ATER (Assistência Técnica e Extensão Rural):</strong> Apoio técnico para produção, manejo sustentável, etc.</li>
            <li><strong>PAA (Programa de Aquisição de Alimentos):</strong> Governo compra alimentos da agricultura familiar para doação.</li>
            <li><strong>PNAPO (Política Nacional de Agroecologia):</strong> Incentivo à produção sustentável.</li>
            <li><strong>Políticas Culturais:</strong> Editais para preservar e divulgar a cultura de PCTs.</li>
            <li><strong>Saúde e Educação Diferenciadas:</strong> Serviços adaptados à realidade das comunidades.</li>
          </ul>
          <ul class="list-disc list-inside ml-4 mt-2 space-y-1 text-blue-700 text-sm">
            <li><a href="https://www.gov.br/incra/pt-br" target="_blank" rel="noopener noreferrer" class="hover:underline">INCRA</a> (Terra, quilombolas)</li>
            <li><a href="https://www.gov.br/mds/pt-br" target="_blank" rel="noopener noreferrer" class="hover:underline">Ministério do Desenvolvimento Social</a> (PAA, políticas sociais)</li>
            <li><a href="https://www.gov.br/povosindigenas/pt-br" target="_blank" rel="noopener noreferrer" class="hover:underline">Ministério dos Povos Indígenas</a></li>
            <li><a href="https://www.gov.br/palmares/" target="_blank" rel="noopener noreferrer" class="hover:underline">Fundação Palmares</a></li>
            <li><a href="https://www.gov.br/mda/pt-br" target="_blank" rel="noopener noreferrer" class="hover:underline">Ministério do Desenvolvimento Agrário</a></li>
            <li><a href="https://www.gov.br/cultura/pt-br" target="_blank" rel="noopener noreferrer" class="hover:underline">Ministério da Cultura</a></li>
          </ul>
          <p class="mt-4 italic text-sm text-gray-600"><strong>Como usar no projeto?</strong> Explique na justificativa como seu projeto ajuda a garantir esses direitos ou se conecta a essas políticas.</p>
        `,
      },
      {
        slug: 'checklist-analise',
        title: '4. Checklist: Estou Pronto para Analisar o Edital?',
        type: 'checklist',
        items: [
          { label: 'Verifiquei o prazo final de inscrição?' },
          { label: 'Minha comunidade/grupo se encaixa no público-alvo?' },
          { label: 'O objeto do edital (o que ele financia) é o que eu preciso?' },
          { label: 'Entendi todos os documentos que preciso enviar?' },
          { label: 'Sei onde conseguir os documentos que não tenho?' },
          { label: 'Li os critérios de avaliação para saber o que é mais importante?' },
          { label: 'O valor oferecido é suficiente para o meu projeto?' },
          { label: 'Entendi se há necessidade de contrapartida?' },
          { label: 'Anotei o contato para tirar dúvidas?' },
          { label: 'Consultei alguém da rede de apoio para revisar minha análise?' },
        ],
      },
      {
        slug: 'links-uteis',
        title: '5. Links Úteis para Entender Editais e Políticas',
        type: 'html',
        content: `
          <ul class="list-disc list-inside ml-4 space-y-1 text-blue-700">
            <li><a href="https://www.gov.br/pt-br" target="_blank" rel="noopener noreferrer" class="hover:underline">Portal Gov.br</a></li>
            <li><a href="https://www.gov.br/incra/pt-br" target="_blank" rel="noopener noreferrer" class="hover:underline">INCRA</a></li>
            <li><a href="https://www.gov.br/povosindigenas/pt-br" target="_blank" rel="noopener noreferrer" class="hover:underline">Ministério dos Povos Indígenas</a></li>
            <li><a href="https://www.gov.br/palmares/" target="_blank" rel="noopener noreferrer" class="hover:underline">Fundação Palmares</a></li>
            <li><a href="https://www.gov.br/mda/pt-br" target="_blank" rel="noopener noreferrer" class="hover:underline">Ministério do Desenvolvimento Agrário</a></li>
          </ul>
          <p class="mt-2 text-sm text-green-700">Salve esses links e compartilhe com sua rede!</p>
        `,
      },
    ],
  },
  // --- Módulo 4: Elaborando ---
  'elaborando': {
    title: 'Módulo 4: Da Ideia ao Projeto - Elaborando sua Proposta',
    sections: [
      {
        slug: 'estrutura-projeto',
        title: '1. Estrutura Básica de um Projeto',
        type: 'estrutura-projeto', // Alterado para novo tipo
        introContent: `
          <p class="text-gray-700 mb-3">Transformar uma ideia em projeto exige organização. Veja este diagrama que mostra as partes essenciais de um projeto:</p>
        `,
        steps: [
          {
            id: 'titulo',
            title: 'Título',
            description: 'Curto, claro e direto. Ex: "Horta Comunitária Sustentável", "Oficina de Artesanato Quilombola".',
            tips: ['Use no máximo 10-15 palavras', 'Mencione o principal foco do projeto', 'Seja específico e evite termos muito técnicos'],
            example: 'Oficina de Artesanato Quilombola para Jovens da Comunidade Terra Firme'
          },
          {
            id: 'justificativa',
            title: 'Justificativa',
            description: 'Explique: Qual problema da comunidade o projeto resolve? Por que é importante agora?',
            tips: ['Descreva a situação atual da comunidade', 'Explique por que o problema precisa ser resolvido', 'Conecte com políticas públicas existentes (ver Módulo 3)'],
            example: 'Nossa comunidade enfrenta dificuldade de acesso a alimentos frescos. A horta comunitária vai melhorar a alimentação e gerar renda.'
          },
          {
            id: 'objetivos',
            title: 'Objetivos',
            description: 'O que você quer alcançar? Divida em objetivo geral (amplo) e específicos (passos).',
            tips: ['Use verbos no infinitivo (construir, capacitar, realizar)', 'Objetivos específicos devem ser mensuráveis', 'De 3 a 5 objetivos específicos é o ideal'],
            example: '<strong>Objetivo Geral:</strong> Promover a segurança alimentar e gerar renda para 10 famílias.<br/><strong>Objetivos Específicos:</strong> 1. Preparar o terreno; 2. Comprar sementes; 3. Capacitar as famílias; 4. Realizar a colheita.'
          },
          {
            id: 'metodologia',
            title: 'Metodologia',
            description: 'Descreva o passo a passo para cada objetivo. Quem faz o quê? Quais recursos serão usados?',
            tips: ['Explique como cada objetivo será alcançado', 'Detalhe as atividades principais', 'Mencione quem será responsável por cada atividade'],
            example: 'O grupo de jovens ficará responsável pelo plantio, com apoio técnico da EMATER. Serão realizadas oficinas mensais para capacitação em técnicas agroecológicas.'
          },
          {
            id: 'cronograma',
            title: 'Cronograma',
            description: 'Quando cada atividade será feita? Monte uma tabela simples com meses/semanas e atividades.',
            tips: ['Seja realista com os prazos', 'Considere atrasos e imprevistos', 'Lembre-se das estações do ano para atividades agrícolas'],
            example: 'Mês 1: Preparar terreno; Mês 2: Comprar insumos; Mês 3: Plantio; Meses 4-6: Manutenção; Mês 7: Colheita.'
          },
          {
            id: 'orcamento',
            title: 'Orçamento',
            description: 'Liste tudo que precisa comprar ou contratar (materiais, serviços, transporte, alimentação). Pesquise preços.',
            tips: ['Pesquise pelo menos 3 orçamentos', 'Seja específico (quantidade, valor unitário, valor total)', 'Sempre inclua uma margem de segurança para imprevistos'],
            example: 'Sementes: R$ 500,00; Ferramentas: R$ 800,00; Alimentação para oficinas: R$ 600,00; Transporte: R$ 400,00.'
          }
        ],
        outroContent: `
          <p class="mt-4 text-blue-700 text-sm">Exemplo prático completo:<br/>
            <strong>Título:</strong> Oficina de Artesanato Quilombola<br/>
            <strong>Justificativa:</strong> Valorizar a cultura local e gerar renda.<br/>
            <strong>Objetivo Geral:</strong> Capacitar 20 mulheres em técnicas de artesanato.<br/>
            <strong>Metodologia:</strong> Oficinas mensais com artesãs experientes.<br/>
            <strong>Cronograma:</strong> Março a junho.<br/>
            <strong>Orçamento:</strong> Materiais, transporte, alimentação.
          </p>
        `
      },
      {
        slug: 'templates-projeto',
        title: '2. Templates e Modelos Editáveis',
        type: 'downloads',
        items: [
          { fileName: 'oficio.docx', label: 'Modelo de Ofício (.docx)' },
          { fileName: 'declaracao.odt', label: 'Modelo de Declaração (.odt)' },
          { fileName: 'orcamento.xlsx', label: 'Modelo de Orçamento (.xlsx)' },
        ],
        content: `
          <p class="mt-2 text-sm text-gray-600">Baixe os modelos prontos e personalize com os dados da sua comunidade. Eles já vêm com dicas de preenchimento.</p>
          <ul class="list-disc list-inside ml-4 my-2 text-gray-700">
            <li><strong>Ofício:</strong> Use para solicitar apoio ou apresentar o projeto.</li>
            <li><strong>Declaração:</strong> Comprove participação, residência ou vínculo.</li>
            <li><strong>Orçamento:</strong> Organize os custos do projeto de forma simples.</li>
          </ul>
          <p class="mt-2 text-green-700 text-sm">Dica: Se tiver dúvida, peça ajuda para alguém da associação ou rede de apoio.</p>
        `,
      },
      {
        slug: 'banco-ideias',
        title: '3. Banco de Ideias Inspiradoras',
        type: 'html',
        content: `
          <p class="text-gray-700 mb-2">Veja exemplos de projetos que podem ser adaptados para sua realidade:</p>
          <ul class="list-disc list-inside ml-4 space-y-1 text-gray-700">
            <li>Horta comunitária ou viveiro de mudas.</li>
            <li>Oficina de beneficiamento de produtos locais (polpa de fruta, farinha, artesanato).</li>
            <li>Projeto de acesso à água (cisterna, irrigação simples).</li>
            <li>Evento cultural para resgate de tradições.</li>
            <li>Compra de equipamentos para associação (computador, impressora).</li>
            <li>Capacitação em gestão, tecnologia ou produção sustentável.</li>
          </ul>
          <p class="mt-2 text-blue-700 text-sm">Dica: Converse com outras comunidades para trocar experiências e ideias.</p>
        `,
      },
      {
        slug: 'dicas-escrita',
        title: '4. Dicas para Escrever Bem',
        type: 'html',
        content: `
          <p class="text-gray-700 mb-2">Escrever bem é ser claro e objetivo. Veja como facilitar a leitura do seu projeto:</p>
          <ul class="list-disc list-inside ml-4 space-y-1 text-gray-700">
            <li><strong>Seja direto:</strong> Evite rodeios. Explique o essencial.</li>
            <li><strong>Frases curtas:</strong> Mais fáceis de entender.</li>
            <li><strong>Linguagem simples:</strong> Use palavras que todos compreendam. Explique termos técnicos.</li>
            <li><strong>Revise:</strong> Peça para alguém ler antes de enviar.</li>
            <li><strong>Conecte as partes:</strong> Objetivos, metodologia e orçamento devem "conversar".</li>
            <li><strong>Mostre o impacto:</strong> Explique como o projeto vai beneficiar a comunidade.</li>
            <li><strong>Use exemplos reais:</strong> Relacione com situações do dia a dia da comunidade.</li>
          </ul>
          <p class="mt-2 text-green-700 text-sm">Dica: Use o checklist abaixo para revisar sua proposta antes de enviar.</p>
        `,
      },
      {
        slug: 'checklist-projeto',
        title: '5. Checklist: Minha Proposta Está Pronta?',
        type: 'checklist',
        items: [
          { label: 'O título do projeto está claro e direto?' },
          { label: 'A justificativa explica o problema e a importância do projeto?' },
          { label: 'Os objetivos estão bem definidos e usam verbos no infinitivo?' },
          { label: 'A metodologia descreve o passo a passo de execução?' },
          { label: 'O cronograma está organizado por etapas/mês?' },
          { label: 'O orçamento está detalhado e realista?' },
          { label: 'Usei os modelos de documentos disponíveis?' },
          { label: 'Pedi para alguém revisar o texto?' },
          { label: 'Consultei a rede de apoio para tirar dúvidas?' },
        ],
      },
    ],
  },
  // --- Módulo 5: Ação e Apoio ---
  'acao-apoio': {
    title: 'Módulo 5: Ação e Apoio - Submissão e Acompanhamento',
    sections: [
      {
        slug: 'checklist-final',
        title: '1. Checklist Final de Submissão',
        type: 'checklist-visual', // Alterado para novo tipo
        introContent: `
          <p class="text-gray-700 mb-4">Antes de enviar seu projeto, faça uma última verificação. Este checklist ajudará você a não esquecer nada importante:</p>
        `,
        items: [
          { 
            id: 'docs', 
            label: 'Todos os documentos estão completos e organizados?', 
            tip: 'Verifique novamente se todos os documentos solicitados no edital estão prontos (certidões, declarações, ofícios, etc.)',
            category: 'Documentação'
          },
          { 
            id: 'formato', 
            label: 'O formato de envio está correto? (PDF, Word, formulário online)', 
            tip: 'Confirme no edital qual formato é aceito. Alguns editais só aceitam PDF, outros pedem Word ou formulários específicos.',
            category: 'Documentação'
          },
          { 
            id: 'assinaturas', 
            label: 'Todos os documentos estão assinados por quem deve assinar?', 
            tip: 'Verifique se as assinaturas necessárias estão presentes (do presidente da associação, do responsável pelo projeto, etc.)',
            category: 'Documentação'
          },
          { 
            id: 'prazo', 
            label: 'Você ainda está dentro do prazo de submissão?', 
            tip: 'Confira no edital a data e hora limite. Envie com antecedência para evitar problemas técnicos de última hora.',
            category: 'Prazo'
          },
          { 
            id: 'copia', 
            label: 'Você guardou uma cópia de tudo que vai enviar?', 
            tip: 'Mantenha sempre uma cópia completa de tudo que foi enviado, incluindo anexos e comprovantes de envio.',
            category: 'Segurança'
          },
          { 
            id: 'revisar', 
            label: 'O projeto foi revisado por alguém além de você?', 
            tip: 'Peça para alguém ler seu projeto antes de enviar para identificar erros ou pontos confusos.',
            category: 'Qualidade'
          },
          { 
            id: 'contato', 
            label: 'Os dados de contato estão atualizados e corretos?', 
            tip: 'Verifique se o email e telefone para contato estão corretos. É por eles que você receberá notificações!',
            category: 'Comunicação'
          },
          { 
            id: 'orcamento', 
            label: 'O orçamento está dentro do limite do edital e bem detalhado?', 
            tip: 'Confira se os valores estão dentro do permitido e se todos os itens estão bem detalhados (quantidade, valor unitário, valor total).',
            category: 'Financeiro'
          },
          { 
            id: 'objetivo', 
            label: 'Os objetivos do projeto estão claros e alinhados com o edital?', 
            tip: 'Releia a descrição do edital e certifique-se que seu projeto está alinhado com o que está sendo solicitado.',
            category: 'Conteúdo'
          },
          { 
            id: 'calendario', 
            label: 'Você anotou as próximas datas importantes (resultado, recursos)?', 
            tip: 'Anote todas as datas importantes: resultado preliminar, prazo para recursos, resultado final, prazo para envio de documentação complementar.',
            category: 'Acompanhamento'
          }
        ],
        outroContent: `
          <p class="mt-4 text-gray-700">Dica final: Fotografe ou tire print de cada etapa do envio. Se algo der errado, você terá como comprovar que tentou enviar dentro do prazo!</p>
        `
      },
      {
        slug: 'como-enviar',
        title: '2. Orientações práticas: Como enviar propostas',
        type: 'html',
        content: `
          <p class="text-gray-700 mb-3">A forma de envio depende do edital. Veja as opções mais comuns e dicas práticas:</p>
          <dl class="space-y-4">
            <div>
              <dt class="font-semibold text-gray-800">Plataformas Online:</dt>
              <dd class="ml-4 text-gray-700">Muitos editais usam sistemas próprios ou plataformas como o Transferegov (antigo SICONV). É <strong>essencial</strong> ler o manual da plataforma e, se possível, fazer um cadastro prévio para se familiarizar. Peça ajuda se encontrar dificuldades.</dd>
            </div>
            <div>
              <dt class="font-semibold text-gray-800">E-mail:</dt>
              <dd class="ml-4 text-gray-700">
                <ul class="list-circle list-inside ml-6 mt-1 space-y-1 text-sm">
                  <li>Verifique <strong>cuidadosamente</strong> o endereço de e-mail no edital.</li>
                  <li>Use um assunto claro e padronizado, se o edital indicar. Ex: "Inscrição Edital [Nome/Número] - [Nome do Proponente]".</li>
                  <li>Anexe <strong>todos</strong> os documentos no formato solicitado (PDF é o mais comum).</li>
                  <li>Nomeie os arquivos de forma organizada (Ex: "01_Projeto_NomeAssociacao.pdf", "02_CNPJ_NomeAssociacao.pdf").</li>
                  <li>Escreva um corpo de e-mail simples e educado, confirmando o envio e listando os anexos.</li>
                  <li><strong>Peça confirmação de recebimento</strong>, se o edital permitir ou se for praxe.</li>
                </ul>
              </dd>
            </div>
            <div>
              <dt class="font-semibold text-gray-800">Correios/Protocolo Físico:</dt>
              <dd class="ml-4 text-gray-700">
                <ul class="list-circle list-inside ml-6 mt-1 space-y-1 text-sm">
                  <li>Imprima e organize toda a documentação na ordem exata pedida no edital.</li>
                  <li>Use envelope adequado e confira o endereço completo do destinatário.</li>
                  <li>Envie com <strong>Aviso de Recebimento (AR)</strong> para ter comprovante de entrega.</li>
                  <li>Se for entregar pessoalmente (protocolo), peça um comprovante carimbado e datado com a lista dos documentos entregues.</li>
                  <li>Envie com antecedência para evitar imprevistos com os Correios.</li>
                </ul>
              </dd>
            </div>
          </dl>
          <div class="mt-4 p-3 bg-red-50 border border-red-200 rounded">
             <p class="font-semibold text-red-700">Atenção:</p>
             <p class="text-red-600 text-sm mt-1">Cumpra o prazo <strong>rigorosamente</strong>! Verifique não apenas o dia, mas também o horário limite. Envios fora do prazo são desclassificados automaticamente.</p>
          </div>
          <p class="mt-2 text-green-700 text-sm">Dica: Tire fotos ou escaneie todos os comprovantes de envio (AR, protocolo, print do e-mail enviado) e guarde em local seguro.</p>
        `,
      },
      {
        slug: 'acompanhamento',
        title: '3. Acompanhamento',
        type: 'html',
        content: `
          <p class="text-gray-700 mb-2">Enviar o projeto é só o começo! O acompanhamento é crucial. Veja o que fazer:</p>
          <ul class="list-disc list-inside ml-4 space-y-1 text-gray-700">
            <li><strong>Guarde Todos os Comprovantes:</strong> Mantenha cópias digitais e físicas do projeto enviado, dos documentos e dos comprovantes de envio.</li>
            <li><strong>Anote as Datas Chave:</strong> O edital informa as datas de divulgação de resultados (preliminar, final), prazos para recursos, etc. Coloque no calendário!</li>
            <li><strong>Verifique o Status Regularmente:</strong> Acompanhe o site oficial do órgão financiador, a plataforma de envio e o Diário Oficial (DOU - União, DOE - Estado) nas datas previstas.</li>
            <li><strong>Diário Oficial:</strong> A publicação oficial dos resultados geralmente ocorre aqui. Busque pelo nome/número do edital, nome do órgão ou nome do proponente.</li>
            <li><strong>Se Aprovado:</strong> Parabéns! Leia atentamente a comunicação oficial. Haverá próximos passos: assinatura de termo de compromisso/convênio, abertura de conta bancária específica, envio de documentos adicionais. Cumpra todos os prazos! Comece a organizar a execução e a guardar <strong>todas</strong> as notas fiscais e comprovantes de despesa para a prestação de contas.</li>
            <li><strong>Se Reprovado ou Habilitado com Pendências:</strong> Não desanime! Verifique se há prazo para recurso. Se sim, analise os motivos da reprovação/pendência e veja se é possível contestar ou corrigir. Se não houver recurso ou não for viável, tente entender os motivos (às vezes é possível solicitar um parecer) para melhorar na próxima oportunidade.</li>
            <li><strong>Comunique-se:</strong> Mantenha a comunidade informada sobre o andamento do processo.</li>
          </ul>
          <p class="mt-2 text-blue-700 text-sm">Dica: Crie uma pasta específica (física e digital) para cada edital, guardando toda a documentação e comunicações relacionadas.</p>
        `,
      },
      {
        slug: 'rede-apoio',
        title: '4. Rede de Apoio',
        type: 'html',
        content: `
          <p class="text-gray-700 mb-3">Lembre-se: você não está sozinho(a) nesta jornada! Construir e acionar sua rede de apoio é fundamental:</p>
          <ul class="list-disc list-inside ml-4 space-y-2 text-gray-700">
            <li><strong>Associações e Cooperativas Locais:</strong> Troque experiências, peça conselhos, compartilhe informações sobre editais.</li>
            <li><strong>Sindicatos Rurais (STRs):</strong> Podem oferecer apoio técnico, jurídico e informações sobre políticas públicas.</li>
            <li><strong>Técnicos de ATER (EMATER, etc.):</strong> Auxiliam na parte técnica do projeto e podem conhecer oportunidades.</li>
            <li><strong>Organizações Parceiras e Movimentos Sociais:</strong> ONGs, coletivos, movimentos (indígena, quilombola, agroecologia) que atuam na sua região ou tema. Exemplos:
              <ul class="list-circle list-inside ml-6 mt-1 space-y-1 text-sm">
                <li><strong>CONAQ</strong> (Coordenação Nacional de Articulação das Comunidades Negras Rurais Quilombolas) - <a href="https://conaq.org.br/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">conaq.org.br</a></li>
                <li><strong>APIB</strong> (Articulação dos Povos Indígenas do Brasil) - <a href="https://apiboficial.org/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">apiboficial.org</a></li>
                <li><strong>Rede Cerrado</strong> - <a href="https://redecerrado.org.br/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">redecerrado.org.br</a></li>
                <li><strong>ASA Brasil</strong> (Articulação Semiárido Brasileiro) - <a href="https://asabrasil.org.br/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">asabrasil.org.br</a></li>
                <li><strong>Cáritas Brasileira</strong> - <a href="https://caritas.org.br/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">caritas.org.br</a></li>
                <li><strong>CPT</strong> (Comissão Pastoral da Terra) - <a href="https://www.cptnacional.org.br/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">cptnacional.org.br</a></li>
                <li><i>(Pesquise e adicione outras organizações relevantes na sua região!)</i></li>
              </ul>
            </li>
            <li><strong>Jovens e Lideranças Experientes:</strong> Converse com quem já acessou editais, peça dicas e compartilhe suas dificuldades.</li>
            <li><strong>Escolas, Universidades e Institutos Federais:</strong> Professores, projetos de extensão e núcleos de estudo podem oferecer apoio.</li>
            <li><strong>Grupos de Comunicação:</strong> Crie ou participe de grupos (WhatsApp, Telegram) para troca rápida de informações sobre editais, prazos e dicas.</li>
          </ul>
          <p class="mt-4 text-green-700 text-sm">Dica: Mapeie quem são as pessoas e organizações que podem te ajudar em cada etapa e mantenha contato!</p>
        `,
      },
    ],
  },
};

// --- Componente da Página ---
const ModulePage = () => {
  const { slug } = useParams();
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: { [key: string]: boolean } }>({});
  const [expandedAnatomyItems, setExpandedAnatomyItems] = useState<{ [key: string]: boolean }>({});
  const [expandedGlossaryTerms, setExpandedGlossaryTerms] = useState<{ [key: string]: boolean }>({});
  const [selectedStep, setSelectedStep] = useState<string>('titulo');
  const [activeChecklistTip, setActiveChecklistTip] = useState<string | null>(null);

  const handleChecklistChange = (checklistSlug: string, itemLabel: string, isChecked: boolean) => {
    setCheckedItems(prev => {
      const sectionItems = prev[checklistSlug] || {};
      return {
        ...prev,
        [checklistSlug]: {
          ...sectionItems,
          [itemLabel]: isChecked
        }
      };
    });
  };

  const toggleAnatomyItem = (itemTitle: string) => {
    setExpandedAnatomyItems(prev => ({
      ...prev,
      [itemTitle]: !prev[itemTitle]
    }));
  };

  const toggleGlossaryTerm = (term: string) => {
    setExpandedGlossaryTerms(prev => ({
      ...prev,
      [term]: !prev[term]
    }));
  };

  // Calcular o progresso do checklist
  const calculateProgress = (checklistKey: string, items: any[]) => {
    if (!checkedItems[checklistKey]) return 0;
    
    const totalChecked = items.filter(item => 
      checkedItems[checklistKey][item.label] === true
    ).length;
    
    return (totalChecked / items.length) * 100;
  };

  // Se o slug é inválido ou não encontrado
  if (!moduleContent[slug as string]) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-500">Módulo não encontrado</h1>
        <p className="mt-4">O módulo solicitado não existe ou está temporariamente indisponível.</p>
        <a href="/" className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Voltar para a página inicial
        </a>
      </div>
    );
  }

  const module = moduleContent[slug as string];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-foreground)] mb-8">{module.title}</h1>

      {module.sections.map((section: any, sectionIndex: number) => (
        <div key={section.slug} className="mb-8 scroll-mt-20" id={section.slug}>
          <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-foreground)] mb-4">{section.title}</h2>

          {/* HTML Content */}
          {section.type === 'html' && (
            <ContentCard>
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </ContentCard>
          )}

          {/* Downloads Section */}
          {section.type === 'downloads' && (
            <ContentCard>
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {section.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-center">
                    <DownloadButton fileName={item.fileName} label={item.label} />
                  </div>
                ))}
              </div>
            </ContentCard>
          )}

          {/* Checklist Section */}
          {section.type === 'checklist' && (
            <ContentCard>
              <div className="space-y-3">
                {section.items.map((item: any, index: number) => {
                  const checklistKey = `${slug}-${section.slug}`;
                  const isChecked = checkedItems[checklistKey]?.[item.label] || false;
                  
                  return (
                    <ChecklistItem
                      key={index}
                      label={item.label}
                      isChecked={isChecked}
                      onChange={(checked) => handleChecklistChange(checklistKey, item.label, checked)}
                    />
                  );
                })}
              </div>
            </ContentCard>
          )}

          {/* Anatomia de Edital - Visualização Interativa */}
          {section.type === 'anatomia' && (
            <ContentCard>
              <div dangerouslySetInnerHTML={{ __html: section.introContent }} />
              
              <div className="mt-4 border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-surface)] shadow-sm">
                <div className="p-3 bg-[var(--color-primary)]/10 border-b border-[var(--color-border)] flex items-center">
                  <FileText className="h-5 w-5 text-[var(--color-primary)] mr-2" />
                  <h3 className="font-medium text-lg">Exemplo de Edital</h3>
                </div>
                
                <div className="divide-y divide-[var(--color-border)]">
                  {section.items.map((item: any, index: number) => {
                    const isExpanded = expandedAnatomyItems[item.title] || false;
                    
                    return (
                      <div key={index} className="bg-white">
                        <button 
                          onClick={() => toggleAnatomyItem(item.title)}
                          className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                        >
                          <div className="flex items-center">
                            <span className="font-medium">{item.title}</span>
                            {isExpanded ? 
                              <ChevronUp className="h-4 w-4 ml-2 text-gray-500" /> : 
                              <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                            }
                          </div>
                          <div className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs px-2 py-1 rounded-full">
                            Clique para detalhes
                          </div>
                        </button>
                        
                        {isExpanded && (
                          <div className="p-4 bg-gray-50">
                            <div className="flex">
                              <div className="w-1 bg-[var(--color-primary)] rounded-full mr-3"></div>
                              <div className="flex-1">
                                <div dangerouslySetInnerHTML={{ __html: item.content }} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div dangerouslySetInnerHTML={{ __html: section.outroContent }} className="mt-4" />
            </ContentCard>
          )}

          {/* Glossário de Termos */}
          {section.type === 'glossary' && (
            <ContentCard>
              <div className="flex items-center mb-4">
                <BookOpen className="h-5 w-5 text-[var(--color-primary)] mr-2" />
                <p className="text-gray-700">Clique nos termos para ver suas definições:</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.terms.map((glossaryItem: any, index: number) => {
                  const isExpanded = expandedGlossaryTerms[glossaryItem.term] || false;
                  
                  return (
                    <div 
                      key={index} 
                      className="border border-[var(--color-border)] rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleGlossaryTerm(glossaryItem.term)}
                        className="w-full flex items-center justify-between p-3 bg-[var(--color-surface)] text-left"
                      >
                        <span className="font-medium">{glossaryItem.term}</span>
                        {isExpanded ? 
                          <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        }
                      </button>
                      
                      {isExpanded && (
                        <div className="p-3 bg-white">
                          <p className="text-gray-700">{glossaryItem.definition}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ContentCard>
          )}

          {/* Estrutura de Projeto - Diagrama Visual Interativo */}
          {section.type === 'estrutura-projeto' && (
            <ContentCard>
              <div dangerouslySetInnerHTML={{ __html: section.introContent }} />
              
              <div className="mt-6 border border-[var(--color-border)] rounded-lg overflow-hidden">
                {/* Diagrama Visual */}
                <div className="p-4 bg-[var(--color-surface)]">
                  <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                    {section.steps.map((step: any) => (
                      <button
                        key={step.id}
                        onClick={() => setSelectedStep(step.id)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          selectedStep === step.id
                            ? 'bg-[var(--color-primary)] text-white shadow-md scale-105'
                            : 'bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-primary)]/10'
                        }`}
                      >
                        {step.title}
                      </button>
                    ))}
                  </div>
                  
                  {/* Linhas de conexão - SVG estilizado */}
                  <div className="relative flex justify-center my-4">
                    <svg className="w-full max-w-lg h-8" viewBox="0 0 400 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 10 H390" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="4 4" />
                      <circle cx="200" cy="10" r="4" fill="var(--color-primary)" />
                    </svg>
                  </div>
                  
                  {/* Detalhes do passo selecionado */}
                  {section.steps.map((step: any) => (
                    selectedStep === step.id && (
                      <div key={step.id} className="bg-white p-4 rounded-lg border border-[var(--color-border)] transition-all animate-fadeIn">
                        <h3 className="text-lg font-semibold text-[var(--color-primary)]">{step.title}</h3>
                        <p className="mt-2 text-[var(--color-text)]">{step.description}</p>
                        
                        <div className="mt-4 bg-[var(--color-surface)] p-3 rounded-md">
                          <h4 className="font-medium text-[var(--color-foreground)]">Dicas:</h4>
                          <ul className="mt-1 space-y-1 list-disc list-inside text-sm text-[var(--color-text-light)]">
                            {step.tips.map((tip: string, i: number) => (
                              <li key={i}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mt-4 border-t border-[var(--color-border)] pt-3">
                          <h4 className="font-medium text-[var(--color-foreground)]">Exemplo:</h4>
                          <div className="mt-1 text-sm italic text-[var(--color-text-light)]" dangerouslySetInnerHTML={{ __html: step.example }} />
                        </div>
                      </div>
                    )
                  ))}
                  
                  {/* Navegação entre passos */}
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => {
                        const currentIndex = section.steps.findIndex((s: any) => s.id === selectedStep);
                        const prevIndex = (currentIndex - 1 + section.steps.length) % section.steps.length;
                        setSelectedStep(section.steps[prevIndex].id);
                      }}
                      className="px-2 py-1 text-sm text-[var(--color-primary)] hover:underline flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                      Anterior
                    </button>
                    
                    <button
                      onClick={() => {
                        const currentIndex = section.steps.findIndex((s: any) => s.id === selectedStep);
                        const nextIndex = (currentIndex + 1) % section.steps.length;
                        setSelectedStep(section.steps[nextIndex].id);
                      }}
                      className="px-2 py-1 text-sm text-[var(--color-primary)] hover:underline flex items-center"
                    >
                      Próximo
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div dangerouslySetInnerHTML={{ __html: section.outroContent }} className="mt-4" />
            </ContentCard>
          )}

          {/* Checklist com Progresso Visual */}
          {section.type === 'checklist-visual' && (
            <ContentCard>
              <div dangerouslySetInnerHTML={{ __html: section.introContent }} />
              
              {/* Barra de Progresso */}
              <div className="mt-4 mb-6">
                <div className="flex justify-between text-sm text-[var(--color-text-light)] mb-1">
                  <span>Progresso:</span>
                  {(() => {
                    const checklistKey = `${slug}-${section.slug}`;
                    const progress = calculateProgress(checklistKey, section.items);
                    return <span>{Math.round(progress)}% completo</span>;
                  })()}
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--color-primary)] transition-all duration-500 ease-out"
                    style={{ 
                      width: `${calculateProgress(`${slug}-${section.slug}`, section.items)}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              {/* Itens Agrupados por Categoria */}
              <div className="space-y-6">
                {(() => {
                  // Agrupar itens por categoria
                  const categories: { [key: string]: any[] } = {};
                  section.items.forEach((item: any) => {
                    if (!categories[item.category]) {
                      categories[item.category] = [];
                    }
                    categories[item.category].push(item);
                  });
                  
                  return Object.entries(categories).map(([category, items]) => (
                    <div key={category} className="border border-[var(--color-border)] rounded-lg overflow-hidden">
                      <div className="bg-[var(--color-surface)] p-3 border-b border-[var(--color-border)]">
                        <h3 className="font-medium text-[var(--color-foreground)]">{category}</h3>
                      </div>
                      <div className="p-4 bg-white space-y-3">
                        {items.map((item: any) => {
                          const checklistKey = `${slug}-${section.slug}`;
                          const isChecked = checkedItems[checklistKey]?.[item.label] || false;
                          
                          return (
                            <div key={item.id} className="relative">
                              <div className="flex items-start space-x-2">
                                <div className="flex-shrink-0 pt-0.5">
                                  <ChecklistItem
                                    label=""
                                    isChecked={isChecked}
                                    onChange={(checked) => handleChecklistChange(checklistKey, item.label, checked)}
                                  />
                                </div>
                                <div className="flex-grow">
                                  <label 
                                    className={`text-sm cursor-pointer ${isChecked ? 'text-[var(--color-text-light)] line-through' : 'text-[var(--color-text)]'}`}
                                    onClick={() => handleChecklistChange(checklistKey, item.label, !isChecked)}
                                  >
                                    {item.label}
                                  </label>
                                  
                                  <button
                                    type="button"
                                    className="ml-1 text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
                                    onClick={() => setActiveChecklistTip(activeChecklistTip === item.id ? null : item.id)}
                                    aria-label="Ver dica"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                  
                                  {activeChecklistTip === item.id && (
                                    <div className="mt-2 p-2 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded text-xs text-[var(--color-text)] animate-fadeIn">
                                      {item.tip}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ));
                })()}
              </div>
              
              <div dangerouslySetInnerHTML={{ __html: section.outroContent }} className="mt-6" />
            </ContentCard>
          )}

          {/* Next Section Link (except for last section) */}
          {sectionIndex < module.sections.length - 1 && (
            <div className="mt-6">
              <a
                href={`#${module.sections[sectionIndex + 1].slug}`}
                className="inline-flex items-center text-[var(--color-primary)] hover:underline"
              >
                Próxima seção: {module.sections[sectionIndex + 1].title}
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          )}
        </div>
      ))}

      {/* Navegação entre módulos */}
      <div className="mt-12 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Links para navegação entre módulos aqui */}
      </div>
    </div>
  );
};

export default ModulePage;

// Geração de páginas estáticas foi removida para permitir useState (Client Component)