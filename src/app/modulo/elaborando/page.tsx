'use client';

import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { ProjectStructure } from '@/components/modules/propostas/ProjectStructure';
import { IdeaBank } from '@/components/modules/propostas/IdeaBank';
import { WritingGuide } from '@/components/modules/propostas/WritingGuide';
import { ContentCard } from '@/components/ContentCard';

// Seções do projeto com dicas e exemplos
const projectSections = [
  {
    title: 'Título do Projeto',
    description: 'Seja específico e direto. Mencione o principal objetivo e o público-alvo.',
    tips: [
      'Use no máximo 10-15 palavras',
      'Inclua palavras-chave relevantes',
      'Evite títulos genéricos'
    ],
    example: 'Oficina de Artesanato em Palha: Preservando Saberes Tradicionais na Comunidade Quilombola Terra Firme'
  },
  {
    title: 'Justificativa',
    description: 'Explique por que o projeto é importante e qual problema ele resolve.',
    tips: [
      'Apresente dados concretos quando possível',
      'Relacione com a realidade da comunidade',
      'Mencione políticas públicas relevantes'
    ],
    example: 'A comunidade Terra Firme possui 30 artesãs que mantêm viva a tradição do trançado em palha, conhecimento passado por gerações. No entanto, observamos uma diminuição no interesse dos jovens por essa prática, arriscando a perda desse patrimônio cultural.'
  },
  {
    title: 'Objetivos',
    description: 'O que o projeto pretende alcançar, dividido em geral e específicos.',
    tips: [
      'Use verbos no infinitivo (realizar, promover, capacitar)',
      'Objetivos específicos devem ser mensuráveis',
      'Limite-se a 3-5 objetivos específicos'
    ],
    example: `Objetivo Geral: Fortalecer a transmissão dos saberes tradicionais do artesanato em palha através de oficinas intergeracionais.

Objetivos Específicos:
1. Capacitar 15 jovens nas técnicas tradicionais de trançado
2. Realizar 10 oficinas práticas com mestras artesãs
3. Produzir um catálogo digital com as técnicas e histórias`
  },
  {
    title: 'Metodologia',
    description: 'Como o projeto será realizado na prática.',
    tips: [
      'Detalhe cada etapa do projeto',
      'Explique quem fará o quê',
      'Inclua cronograma de atividades'
    ],
    example: `1. Mobilização (Mês 1):
- Reuniões com lideranças e artesãs
- Inscrição dos jovens interessados

2. Oficinas (Meses 2-5):
- Encontros semanais de 4 horas
- Registro fotográfico e em vídeo

3. Documentação (Mês 6):
- Organização do material coletado
- Produção do catálogo digital`
  }
];

// Exemplos de escrita para o guia
const writingExamples = [
  {
    before: 'A gente quer fazer oficinas de artesanato porque é importante pra comunidade.',
    after: 'Propomos a realização de oficinas de artesanato tradicional como estratégia para preservar os saberes ancestrais de nossa comunidade, fortalecendo a identidade cultural e gerando oportunidades de renda para 20 famílias.',
    tips: [
      'Use linguagem formal, mas clara',
      'Apresente números e dados específicos',
      'Explique os benefícios concretos'
    ]
  },
  {
    before: 'Vai ter aula de trançado toda semana.',
    after: 'O projeto prevê a realização de oficinas semanais de trançado em palha, com duração de 4 horas cada, ministradas por mestras artesãs da comunidade. As atividades incluirão teoria e prática, com demonstrações técnicas e exercícios supervisionados.',
    tips: [
      'Detalhe as atividades',
      'Especifique duração e frequência',
      'Mencione os responsáveis'
    ]
  }
];

export default function ElaborandoPropostas() {
  return (
    <PageTemplate
      title="Elaborando Propostas"
      description="Transforme suas ideias em projetos bem estruturados"
      variant="default"
      breadcrumbs={[
        { label: 'Início', href: '/' },
        { label: 'Módulos', href: '/modulo' },
        { label: 'Elaborando', href: '/modulo/elaborando' }
      ]}
    >
      {/* Estrutura do Projeto */}
      <ContentCard className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Estrutura do Projeto</h2>
        <ProjectStructure sections={projectSections} />
      </ContentCard>

      {/* Guia de Escrita */}
      <ContentCard className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Guia de Escrita</h2>
        <WritingGuide examples={writingExamples} />
      </ContentCard>

      {/* Banco de Ideias */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4">Banco de Ideias</h2>
        <IdeaBank />
      </ContentCard>
    </PageTemplate>
  );
}