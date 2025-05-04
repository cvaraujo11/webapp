'use client';

import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { ProjectStructure } from '@/components/modules/propostas/ProjectStructure';
import { IdeaBank } from '@/components/modules/propostas/IdeaBank';
import { BeforeAfterExample } from '@/components/BeforeAfterExample';
import { DownloadButton } from '@/components/DownloadButton';
import { ContentCard } from '@/components/ContentCard';

// Dados de exemplo para antes/depois
const writingExamples = [
  {
    id: 'justificativa',
    title: 'Justificativa',
    before: 'A gente quer fazer esse projeto porque é importante pra comunidade ter uma horta.',
    after: 'Este projeto de horta comunitária atenderá uma necessidade urgente de nossa comunidade: o acesso a alimentos frescos e saudáveis. Atualmente, 30 famílias precisam se deslocar 15km até a cidade mais próxima para comprar verduras e legumes, aumentando o custo da alimentação.',
    explanation: 'A nova versão apresenta dados concretos (número de famílias, distância) e explica claramente o problema que o projeto resolverá.'
  },
  {
    id: 'objetivos',
    title: 'Objetivos',
    before: 'Queremos fazer uma horta e ensinar as pessoas a plantar.',
    after: '1. Implantar uma horta comunitária de 500m² para produção de hortaliças orgânicas;\n2. Capacitar 20 moradores em técnicas de agricultura orgânica;\n3. Estabelecer um sistema de gestão compartilhada da horta entre as famílias participantes.',
    explanation: 'Os objetivos agora são específicos, mensuráveis e organizados em tópicos claros.'
  }
];

// Estrutura do projeto com seções detalhadas
const projectSections = [
  {
    title: 'Identificação',
    description: 'Dados básicos do projeto e da organização proponente',
    tips: [
      'Inclua nome do projeto, organização responsável e dados de contato',
      'Adicione um resumo curto do projeto (até 3 linhas)',
      'Mencione o valor total solicitado'
    ],
    template: 'Nome do Projeto: [título]\nOrganização: [nome]\nResponsável: [nome]\nContato: [email/telefone]\nValor: R$ [total]'
  },
  {
    title: 'Justificativa',
    description: 'Por que o projeto é importante? Qual problema ele resolve?',
    tips: [
      'Descreva a situação atual da comunidade',
      'Use dados concretos quando possível',
      'Explique por que agora é o momento ideal'
    ],
    template: '1. Contexto atual: [descreva]\n2. Problema específico: [detalhe]\n3. Por que é importante resolver: [explique]'
  },
  {
    title: 'Objetivos',
    description: 'O que o projeto pretende alcançar',
    tips: [
      'Use verbos no infinitivo (construir, capacitar, implementar)',
      'Seja específico e mensurável',
      'Divida em objetivo geral e específicos'
    ],
    template: 'Objetivo Geral: [descreva]\n\nObjetivos Específicos:\n1. [objetivo 1]\n2. [objetivo 2]\n3. [objetivo 3]'
  }
];

export default function ElaborandoPropostas() {
  return (
    <PageTemplate
      title="Elaborando Propostas"
      description="Aprenda a transformar suas ideias em projetos estruturados"
    >
      {/* Seção 1: Estrutura do Projeto */}
      <ContentCard className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Estrutura Básica do Projeto</h2>
        <ProjectStructure sections={projectSections} />
      </ContentCard>

      {/* Seção 2: Exemplos de Antes/Depois */}
      <ContentCard className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Exemplos de Escrita</h2>
        <BeforeAfterExample
          title="Melhorando a Escrita do Projeto"
          description="Veja como melhorar a forma de apresentar suas ideias"
          examples={writingExamples}
        />
      </ContentCard>

      {/* Seção 3: Templates Disponíveis */}
      <ContentCard className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Templates para Download</h2>
        <p className="text-gray-600 mb-4">
          Baixe modelos prontos para facilitar a elaboração do seu projeto:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DownloadButton
            fileName="projeto-basico.docx"
            label="Modelo de Projeto Básico"
          />
          <DownloadButton
            fileName="planilha-orcamento.xlsx"
            label="Planilha de Orçamento"
          />
        </div>
      </ContentCard>

      {/* Seção 4: Banco de Ideias */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4">Banco de Ideias</h2>
        <IdeaBank />
      </ContentCard>
    </PageTemplate>
  );
}