'use client';

import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, BookOpen, Link2 } from 'lucide-react';
import EditalViewer from '@/components/modules/decifrando-editais/edital-viewer';
import GlossarioTermos from '@/components/modules/decifrando-editais/glossario-termos';
import PoliticasLinks from '@/components/modules/decifrando-editais/politicas-links';

// Exemplo de edital para visualização
const editalExemplo = {
  titulo: 'EDITAL DE APOIO A PROJETOS CULTURAIS 2025',
  objeto: 'Apoio financeiro a projetos culturais de comunidades tradicionais',
  publico: 'Associações culturais de comunidades quilombolas, indígenas e tradicionais',
  prazo: '60 dias a partir da publicação',
  recurso: 'Até R$ 50.000,00 por projeto',
  documentacao: [
    'CNPJ ativo da associação',
    'Estatuto Social',
    'Ata de eleição da diretoria',
    'Certidões negativas',
    'Projeto cultural detalhado',
    'Planilha orçamentária',
    'Portfólio de atividades'
  ],
  etapas: [
    'Inscrição online',
    'Análise documental',
    'Avaliação técnica',
    'Resultado preliminar',
    'Recursos',
    'Resultado final',
    'Contratação'
  ]
};

export default function DecifrandoEditaisPage() {
  return (
    <PageTemplate
      title="Decifrando Editais"
      description="Aprenda a interpretar editais e entenda seus direitos"
      variant="default"
      breadcrumbs={[
        { label: 'Início', href: '/' },
        { label: 'Módulos', href: '/modulo' },
        { label: 'Decifrando Editais', href: '/modulo/decifrando-editais' }
      ]}
    >
      <Tabs defaultValue="visualizacao" className="space-y-4">
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
