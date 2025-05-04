'use client';

import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import TemplateCard from '@/components/TemplateCard';
import FormatGuide from '@/components/FormatGuide';
import TipsCard from '@/components/modules/ferramentas/tips-card';

export default function FerramentasPage() {
  return (
    <PageTemplate
      title="Bem-vindo(a)!"
      description="Explore as ferramentas essenciais para otimizar seu trabalho"
      variant="article"
      breadcrumbs={[
        { label: 'Início', href: '/' },
        { label: 'Módulos', href: '/modulo' },
        { label: 'Ferramentas', href: '/modulo/ferramentas' }
      ]}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Introdução</h2>
        <p className="text-muted-foreground mb-6">
          Neste módulo, você aprenderá a utilizar ferramentas essenciais que irão facilitar
          seu trabalho diário. Explore as seções abaixo para conhecer cada recurso disponível.
        </p>
      </section>

      <section className="mb-12" aria-labelledby="formatacao-texto">
        <h2 id="formatacao-texto" className="text-2xl font-semibold mb-4">
          Formatação de Texto
        </h2>
        <div className="space-y-6">
          <div className="bg-muted/30 p-6 rounded-lg">
            <p className="text-muted-foreground">
              Aprenda técnicas de formatação para criar documentos profissionais e bem estruturados.
            </p>
          </div>
          
          <FormatGuide
            type="texto"
            examples={[
              {
                title: "Estrutura de Parágrafos",
                description: "Todo o texto amontoado em um único parágrafo, sem quebras ou espaçamento.||Parágrafos bem definidos com espaçamento adequado entre eles. Cada ideia principal em seu próprio parágrafo.||A organização em parágrafos distintos melhora a legibilidade e compreensão do texto."
              },
              {
                title: "Hierarquia de Títulos",
                description: "Títulos e subtítulos sem distinção clara de hierarquia ou formatação.||Títulos principais em destaque, subtítulos com tamanho e peso adequados, criando uma hierarquia visual clara.||A hierarquia visual ajuda o leitor a entender a estrutura do documento."
              },
              {
                title: "Listas e Tópicos",
                description: "Informações importantes misturadas no texto, sem destaque ou organização.||Uso de listas numeradas para sequências e marcadores para itens relacionados.||A organização em listas facilita a localização e compreensão das informações."
              }
            ]}
          />
        </div>
      </section>

      <section className="mb-12" aria-labelledby="imagens">
        <h2 id="imagens" className="text-2xl font-semibold mb-4">
          Imagens
        </h2>
        <div className="space-y-6">
          <div className="bg-muted/30 p-6 rounded-lg">
            <p className="text-muted-foreground">
              Descubra como trabalhar com imagens de forma eficiente em seus documentos.
            </p>
          </div>
          
          <FormatGuide
            type="imagem"
            examples={[
              {
                title: "Resolução Adequada",
                description: "Use imagens com resolução mínima de 300 DPI para garantir boa qualidade de impressão.",
                image: "/placeholders/generic-placeholder.png"
              },
              {
                title: "Formato de Arquivo",
                description: "Escolha JPEG para fotografias e PNG para gráficos/logos com fundo transparente.",
                image: "/placeholders/project-placeholder-placeholder.png"
              },
              {
                title: "Dimensionamento",
                description: "Mantenha as proporções originais ao redimensionar para evitar distorções.",
                image: "/placeholders/step-placeholder-placeholder.png"
              }
            ]}
          />
        </div>
      </section>

      <section className="mb-12" aria-labelledby="templates">
        <h2 id="templates" className="text-2xl font-semibold mb-4">
          Templates
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TemplateCard
            title="Modelo de Ofício"
            format="docx"
            description="Template padrão para criação de ofícios profissionais"
            filename="oficio.docx"
          />
          <TemplateCard
            title="Declaração Padrão"
            format="odt"
            description="Modelo de declaração em formato OpenDocument"
            filename="declaracao.odt"
          />
          <TemplateCard
            title="Planilha de Orçamento"
            format="xlsx"
            description="Planilha para controle e planejamento orçamentário"
            filename="orcamento.xlsx"
          />
        </div>
      </section>
      <section className="mb-16" aria-labelledby="dicas">
        <h2 id="dicas" className="text-2xl font-semibold mb-4">Dicas de Uso</h2>
        <TipsCard
          tips={[
            {
              title: 'Aproveite os Templates',
              description: 'Utilize os modelos prontos para agilizar a produção de documentos e garantir padronização.'
            },
            {
              title: 'Formate com Consistência',
              description: 'Siga as orientações do guia de formatação para criar textos claros e profissionais.'
            },
            {
              title: 'Imagens de Qualidade',
              description: 'Prefira imagens com boa resolução e tamanho adequado para evitar distorções.'
            },
            {
              title: 'Faça Download e Edite',
              description: 'Baixe os arquivos nos formatos disponíveis e personalize conforme sua necessidade.'
            }
          ]}
        />
      </section>
    </PageTemplate>
  );
}