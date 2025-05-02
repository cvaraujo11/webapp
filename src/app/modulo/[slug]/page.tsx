"use client";
import React, { useState } from 'react'; // Import useState
import DownloadButton from '@/components/DownloadButton';
import ChecklistItem from '@/components/ChecklistItem';
import ContentCard from '@/components/ContentCard'; // Importa o ContentCard

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
          <li><strong>Modelo de Orçamento:</strong> Organize os custos do seu projeto de forma simples e clara.</li>
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
            <strong>Passo a passo:</strong> Entre no Portal Gov.br, busque por “editais abertos” e filtre por área de interesse (cultura, agricultura, juventude, etc.).
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
            <li><a href="https://www.gov.br/igualdaderacial/pt-br" target="_blank" rel="noopener noreferrer" class="hover:underline">Ministério da Igualdade Racial</a> / <a href="https://www.gov.br/palmares/" target="_blank" rel="noopener noreferrer" class="hover:underline">Fundação Palmares</a></li>
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
        type: 'html',
        content: `
          <p class="text-gray-700 mb-3">Transformar uma ideia em projeto exige organização. Siga este roteiro prático:</p>
          <dl class="space-y-4">
            <div>
              <dt class="font-semibold text-gray-800">Título:</dt>
              <dd class="ml-4 text-gray-700">Curto, claro e direto. Ex: "Horta Comunitária Sustentável", "Oficina de Artesanato Quilombola".</dd>
            </div>
            <div>
              <dt class="font-semibold text-gray-800">Apresentação/Justificativa:</dt>
              <dd class="ml-4 text-gray-700">Explique: Qual problema da comunidade o projeto resolve? Por que é importante agora? Exemplo: "Nossa comunidade enfrenta dificuldade de acesso a alimentos frescos. A horta comunitária vai melhorar a alimentação e gerar renda."</dd>
            </div>
            <div>
              <dt class="font-semibold text-gray-800">Objetivos:</dt>
              <dd class="ml-4 text-gray-700">
                <p>O que você quer alcançar?</p>
                <ul class="list-disc list-inside ml-6 mt-1 space-y-1">
                  <li><strong>Objetivo Geral:</strong> Ex: "Promover a segurança alimentar e gerar renda para 10 famílias."</li>
                  <li><strong>Objetivos Específicos:</strong> Use verbos no infinitivo. Ex: "1. Preparar o terreno.", "2. Comprar sementes.", "3. Capacitar as famílias.", "4. Realizar a colheita."</li>
                </ul>
              </dd>
            </div>
            <div>
              <dt class="font-semibold text-gray-800">Metodologia/Plano de Ação:</dt>
              <dd class="ml-4 text-gray-700">Descreva o passo a passo para cada objetivo. Quem faz o quê? Quais recursos serão usados? Exemplo: "O grupo de jovens ficará responsável pelo plantio, com apoio técnico da EMATER."</dd>
            </div>
            <div>
              <dt class="font-semibold text-gray-800">Cronograma:</dt>
              <dd class="ml-4 text-gray-700">Quando cada atividade será feita? Monte uma tabela simples: Mês 1 - Preparar terreno; Mês 2 - Comprar insumos; Mês 3 - Plantio.</dd>
            </div>
            <div>
              <dt class="font-semibold text-gray-800">Orçamento Simplificado:</dt>
              <dd class="ml-4 text-gray-700">Liste tudo que precisa comprar ou contratar (materiais, serviços, transporte, alimentação). Pesquise preços. <span class="text-green-700">Dica: Use o modelo de planilha do Módulo 1.</span></dd>
            </div>
          </dl>
          <p class="mt-4 text-blue-700 text-sm">Exemplo prático:<br/>
            <strong>Título:</strong> Oficina de Artesanato Quilombola<br/>
            <strong>Justificativa:</strong> Valorizar a cultura local e gerar renda.<br/>
            <strong>Objetivo Geral:</strong> Capacitar 20 mulheres em técnicas de artesanato.<br/>
            <strong>Metodologia:</strong> Oficinas mensais com artesãs experientes.<br/>
            <strong>Cronograma:</strong> Março a junho.<br/>
            <strong>Orçamento:</strong> Materiais, transporte, alimentação.
          </p>
        `,
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
    title: 'Módulo 5: Ação, Submissão, Acompanhamento e Rede de Apoio',
    slug: 'acao-apoio', // Adiciona slug do módulo para chave de estado
    sections: [
      {
        slug: 'checklist-final',
        title: '1. Checklist Final de Submissão',
        type: 'checklist',
        items: [
          { label: 'O projeto responde exatamente ao que o edital pede?' },
          { label: 'Todos os documentos exigidos estão separados, corretos e atualizados?' },
          { label: 'Os documentos estão no formato solicitado (PDF, DOC, ODT, etc.)?' },
          { label: 'O formulário online (se houver) está totalmente preenchido?' },
          { label: 'Fiz uma revisão final de ortografia, clareza e dados?' },
          { label: 'Verifiquei a data e hora limite para o envio?' },
          { label: 'Tenho o comprovante de envio (print, e-mail, AR dos Correios)?' },
          { label: 'Pedi para alguém revisar tudo antes de enviar?' },
        ],
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
      // Removida a seção 'links-uteis' duplicada do Módulo 5, pois os links relevantes já estão na seção 'Rede de Apoio' ou são genéricos.
    ],
  },
};

// --- Componente da Página ---
// Adiciona 'use client' no topo para permitir hooks como useState

const ModulePage = ({ params }: { params: { slug: string } }) => { // Removido ModulePageProps, tipo inferido/direto
  const { slug } = params; // Removido await
  const content = moduleContent[slug];

  // Estado para os checklists interativos
  // A chave será algo como 'decifrando-checklist-analise' ou 'acao-apoio-checklist-final'
  const [checklistStates, setChecklistStates] = useState<{ [checklistSlug: string]: { [itemLabel: string]: boolean } }>({});

  const handleChecklistChange = (checklistSlug: string, itemLabel: string, isChecked: boolean) => {
    setChecklistStates(prevStates => ({
      ...prevStates,
      [checklistSlug]: {
        ...(prevStates[checklistSlug] || {}),
        [itemLabel]: isChecked,
      },
    }));
  };


  if (!content) {
    // Idealmente, redirecionar para uma página 404 ou mostrar mensagem
    return <div className="p-6 text-center text-red-600">Conteúdo do módulo "{slug}" não encontrado.</div>;
  }

  // --- Estrutura JSX do Componente ---
  return (
    // Adiciona padding e um fundo branco/sombra para destacar a área de conteúdo
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-lg space-y-6"> {/* Adiciona space-y-6 aqui */}
      {/* Título do Módulo */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-3">
        {content.title}
      </h1>
      {/* Mapeia e renderiza cada seção do módulo */}
      {content.sections.map((section: any) => {
        // Lógica de renderização movida para dentro do map para facilitar condicionais
        if (section.type === 'html') {
          return (
            <ContentCard key={section.slug} title={section.title}>
              {/* Usar 'prose' do Tailwind para estilização básica de HTML */}
              <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: section.content }} />
            </ContentCard>
          );
        } else if (section.type === 'downloads') {
          return (
            <ContentCard key={section.slug} title={section.title}>
               {/* Renderiza conteúdo HTML adicional se existir */}
               {section.content && <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-gray-700 mb-3" dangerouslySetInnerHTML={{ __html: section.content }} />}
               {/* Renderiza os botões de download */}
               <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                 {section.items.map((item: { fileName: string; label: string }) => (
                   <DownloadButton
                     key={item.fileName}
                     // Garante que o caminho para o arquivo no diretório public está correto
                     fileName={`templates/${item.fileName}`}
                     label={item.label}
                   />
                 ))}
               </div>
            </ContentCard>
          );
        } else if (section.type === 'checklist') {
          // Identificador único para o estado deste checklist específico
          // Usa o slug definido no módulo (se existir) ou o slug da URL como prefixo
          const modulePrefix = content.slug || slug;
          const currentChecklistSlug = `${modulePrefix}-${section.slug}`; // Ex: 'decifrando-checklist-analise' ou 'acao-apoio-checklist-final'
          const currentChecklistState = checklistStates[currentChecklistSlug] || {};
          return (
            <ContentCard key={section.slug} title={section.title}>
              <ul className="list-none space-y-1 mt-2">
                {section.items.map((item: { label: string }) => (
                  <ChecklistItem
                    key={item.label}
                    label={item.label}
                    // Usa o estado para determinar se está checado
                    isChecked={!!currentChecklistState[item.label]}
                    // Atualiza o estado quando o item muda - Adicionado tipo explícito boolean
                    onChange={(isChecked: boolean) => handleChecklistChange(currentChecklistSlug, item.label, isChecked)}
                  />
                ))}
              </ul>
              {/* Renderizar section.content se existir */}
              {section.content && <div className="mt-4 prose prose-sm sm:prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: section.content }} />}
            </ContentCard>
          );
        } else if (section.type === 'glossary') {
          return (
            <ContentCard key={section.slug} title={section.title}>
              <dl className="space-y-3 mt-2">
                {section.terms.map((termData: { term: string; definition: string }) => (
                  <React.Fragment key={termData.term}>
                    <dt className="font-semibold text-gray-800">{termData.term}:</dt>
                    <dd className="ml-4 text-gray-700">{termData.definition}</dd>
                  </React.Fragment>
                ))}
              </dl>
              {/* Renderizar section.content se existir */}
              {section.content && <div className="mt-4 prose prose-sm sm:prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: section.content }} />}
            </ContentCard>
          );
        } else if (section.type === 'anatomia') { // Novo tipo para Anatomia do Edital
           return (
             // Card principal: Não interativo (sempre aberto por padrão)
             <ContentCard key={section.slug} title={section.title} isInteractive={false}>
               {section.introContent && <div className="prose prose-sm sm:prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: section.introContent }} />}
               <div className="space-y-3 mt-4"> {/* Espaçamento entre os cards internos */}
                 {section.items.map((item: { title: string; content: string }) => (
                   // Cards internos: Interativos (começam fechados por padrão)
                   <ContentCard key={item.title} title={item.title} isInteractive={true}>
                     <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: item.content }} />
                   </ContentCard>
                 ))}
               </div>
               {section.outroContent && <div className="mt-4 prose prose-sm sm:prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: section.outroContent }} />}
             </ContentCard>
           );
        } else if (section.content) { // Fallback para outros tipos com conteúdo
          return (
            <ContentCard key={section.slug} title={section.title}>
              <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: section.content }} />
            </ContentCard>
          );
        }
        // Retorna null se a seção não tiver um tipo conhecido ou conteúdo
        return null;
      })}
    </div>
  );
};

export default ModulePage;

// Geração de páginas estáticas foi removida para permitir useState (Client Component)