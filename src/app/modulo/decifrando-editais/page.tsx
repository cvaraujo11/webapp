'use client';

import React, { useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Link2, Search } from 'lucide-react';
import EditalViewer from '@/components/modules/decifrando-editais/edital-viewer';
import GlossarioTermos from '@/components/modules/decifrando-editais/glossario-termos';
import PoliticasLinks from '@/components/modules/decifrando-editais/politicas-links';

// Dados simulados de um edital para demonstração
const editalExemplo = {
  titulo: 'Edital de Apoio à Produção Cultural 2025',
  numero: 'EDITAL Nº 01/2025',
  orgao: 'Secretaria Nacional de Cultura',
  dataPublicacao: '15/04/2025',
  dataEncerramento: '15/06/2025',
  valorTotal: 'R$ 5.000.000,00',
  secoes: [
    {
      id: 'objeto',
      titulo: 'OBJETO',
      conteudo: 'O presente Edital tem por objeto a seleção de projetos culturais que promovam a diversidade cultural brasileira em suas diferentes manifestações, contribuindo para a democratização do acesso à cultura e para o desenvolvimento da economia criativa no país.',
      destaque: true
    },
    {
      id: 'elegibilidade',
      titulo: 'ELEGIBILIDADE',
      conteudo: 'Poderão participar deste Edital pessoas físicas maiores de 18 anos, pessoas jurídicas de direito privado, com ou sem fins lucrativos, de natureza cultural, e coletivos culturais representados por pessoa física, mediante apresentação de declaração de representação.',
      destaque: false
    },
    {
      id: 'recursos',
      titulo: 'RECURSOS FINANCEIROS',
      conteudo: 'Os recursos destinados a este Edital são de R$ 5.000.000,00 (cinco milhões de reais), distribuídos entre as categorias estabelecidas no item 4, oriundos do Fundo Nacional de Cultura.',
      destaque: true
    },
    {
      id: 'categorias',
      titulo: 'CATEGORIAS',
      conteudo: 'O presente Edital contemplará projetos nas seguintes categorias: A) Artes Cênicas; B) Artes Visuais; C) Audiovisual; D) Literatura; E) Música; F) Patrimônio Cultural; G) Culturas Populares.',
      destaque: false
    },
    {
      id: 'inscricao',
      titulo: 'INSCRIÇÃO',
      conteudo: 'As inscrições serão gratuitas e deverão ser realizadas exclusivamente pela internet, mediante preenchimento do formulário eletrônico disponível no site www.cultura.gov.br/editais, no período de 15/04/2025 a 15/06/2025.',
      destaque: true
    },
    {
      id: 'documentacao',
      titulo: 'DOCUMENTAÇÃO',
      conteudo: 'No ato da inscrição, deverão ser anexados os seguintes documentos: I - Formulário de inscrição devidamente preenchido; II - Cópia do documento de identificação e CPF do proponente pessoa física ou do representante legal da pessoa jurídica; III - Cópia do CNPJ e do estatuto social da instituição (para pessoa jurídica); IV - Portfólio do proponente; V - Projeto detalhado contendo justificativa, objetivos, metodologia, cronograma e orçamento.',
      destaque: false
    },
    {
      id: 'selecao',
      titulo: 'SELEÇÃO',
      conteudo: 'A seleção dos projetos será realizada por uma Comissão de Seleção composta por especialistas nas áreas contempladas pelo Edital, que avaliarão os projetos de acordo com os seguintes critérios: I - Excelência artística e cultural (0-25 pontos); II - Viabilidade técnica e orçamentária (0-20 pontos); III - Impacto cultural e social (0-20 pontos); IV - Abrangência e alcance do projeto (0-15 pontos); V - Inovação e criatividade (0-10 pontos); VI - Acessibilidade e democratização do acesso (0-10 pontos).',
      destaque: true
    },
    {
      id: 'contratacao',
      titulo: 'CONTRATAÇÃO',
      conteudo: 'Os projetos selecionados serão contratados mediante assinatura de Termo de Compromisso Cultural, após a apresentação da documentação complementar solicitada pela Secretaria Nacional de Cultura.',
      destaque: false
    },
    {
      id: 'prestacao',
      titulo: 'PRESTAÇÃO DE CONTAS',
      conteudo: 'A prestação de contas deverá ser apresentada no prazo de 60 (sessenta) dias após o término da execução do projeto, conforme as normas estabelecidas na Instrução Normativa nº 05/2023.',
      destaque: true
    }
  ]
};

export default function DecifrandoEditaisPage() {
  const [activeTab, setActiveTab] = useState('visualizacao');

  return (
    <PageTemplate
      title="Decifrando Editais"
      description="Aprenda a interpretar e compreender editais culturais de forma simples e objetiva"
      variant="default"
      breadcrumbs={[
        { label: 'Início', href: '/' },
        { label: 'Módulos', href: '/modulo' },
        { label: 'Decifrando Editais', href: '/modulo/decifrando-editais' }
      ]}
    >
      <section className="mb-8">
        <p className="text-muted-foreground">
          Neste módulo, você aprenderá a interpretar editais culturais, compreender termos técnicos e
          conhecer as principais políticas e legislações que regem o financiamento à cultura no Brasil.
        </p>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[600px]">
          <TabsTrigger value="visualizacao" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Visualização</span>
            <span className="sm:hidden">Visual</span>
          </TabsTrigger>
          <TabsTrigger value="glossario" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Glossário</span>
            <span className="sm:hidden">Termos</span>
          </TabsTrigger>
          <TabsTrigger value="politicas" className="flex items-center gap-2">
            <Link2 className="h-4 w-4" />
            <span className="hidden sm:inline">Políticas</span>
            <span className="sm:hidden">Links</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visualizacao" className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h2 className="text-xl font-semibold mb-4">Visualização Interativa</h2>
            <EditalViewer edital={editalExemplo} />
          </div>
        </TabsContent>

        <TabsContent value="glossario" className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h2 className="text-xl font-semibold mb-4">Glossário de Termos</h2>
            <GlossarioTermos />
          </div>
        </TabsContent>

        <TabsContent value="politicas" className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h2 className="text-xl font-semibold mb-4">Políticas e Legislação</h2>
            <PoliticasLinks />
          </div>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
}
