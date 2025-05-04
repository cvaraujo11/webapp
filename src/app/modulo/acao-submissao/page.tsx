'use client';

import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { SubmissionChecklist } from '@/components/modules/acao-submissao/submission-checklist';
import { TrackingGuide } from '@/components/modules/acao-submissao/tracking-guide';
import { SupportNetwork } from '@/components/modules/acao-submissao/support-network';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentCard } from '@/components/ContentCard';
import { CheckSquare, Activity, Network } from 'lucide-react';

// Itens do checklist final
const checklistItems = [
  {
    category: 'Documentação',
    items: [
      { id: 'docs-1', label: 'Documentos da organização (CNPJ, estatuto, atas)', tip: 'Certifique-se de que todos os documentos estão atualizados e autenticados quando necessário.' },
      { id: 'docs-2', label: 'Certidões negativas', tip: 'Verifique a validade de todas as certidões antes do envio.' },
      { id: 'docs-3', label: 'Projeto completo com anexos', tip: 'Confira se todos os anexos mencionados no projeto estão incluídos.' }
    ]
  },
  {
    category: 'Projeto',
    items: [
      { id: 'proj-1', label: 'Revisão do texto e formatação', tip: 'Peça para alguém fazer uma revisão final do texto, verificando erros e clareza.' },
      { id: 'proj-2', label: 'Orçamento detalhado e dentro do limite', tip: 'Confirme se todos os valores estão corretos e dentro dos limites do edital.' },
      { id: 'proj-3', label: 'Cronograma viável', tip: 'Verifique se os prazos são realistas e consideram possíveis imprevistos.' }
    ]
  },
  {
    category: 'Processo',
    items: [
      { id: 'proc-1', label: 'Formato de envio correto', tip: 'Confira se está seguindo exatamente o formato solicitado (físico, digital, plataforma específica).' },
      { id: 'proc-2', label: 'Prazos e datas importantes', tip: 'Anote todas as datas importantes: envio, resultado, recursos, documentação complementar.' },
      { id: 'proc-3', label: 'Cópias de segurança', tip: 'Mantenha cópias de todo o material enviado, incluindo comprovantes de envio.' }
    ]
  }
];

// Etapas de acompanhamento
const trackingSteps = [
  {
    title: 'Confirmação de Recebimento',
    description: 'Após o envio, guarde o protocolo ou comprovante.',
    tasks: [
      'Salvar número de protocolo',
      'Arquivar comprovante de envio',
      'Confirmar recebimento se possível'
    ]
  },
  {
    title: 'Análise do Projeto',
    description: 'Acompanhe o processo de análise.',
    tasks: [
      'Verificar regularmente o status',
      'Responder rapidamente a diligências',
      'Manter documentos atualizados'
    ]
  },
  {
    title: 'Resultado Preliminar',
    description: 'Fique atento à publicação do resultado.',
    tasks: [
      'Verificar pontuação recebida',
      'Avaliar necessidade de recurso',
      'Preparar documentação complementar'
    ]
  },
  {
    title: 'Resultado Final',
    description: 'Próximos passos após o resultado.',
    tasks: [
      'Em caso de aprovação, reunir documentos solicitados',
      'Se reprovado, solicitar feedback para melhorias',
      'Manter a comunidade informada'
    ]
  }
];

// Rede de apoio
const supportContacts = [
  {
    category: 'Organizações Parceiras',
    contacts: [
      { name: 'Rede de Comunidades Tradicionais', type: 'Articulação', contact: 'contato@redetradicional.org' },
      { name: 'Assessoria Jurídica Popular', type: 'Jurídico', contact: '(XX) XXXX-XXXX' }
    ]
  },
  {
    category: 'Órgãos Públicos',
    contacts: [
      { name: 'Secretaria de Cultura', type: 'Governamental', contact: 'cultura@governo.org' },
      { name: 'EMATER', type: 'Assistência Técnica', contact: 'atendimento@emater.org' }
    ]
  }
];

export default function AcaoSubmissaoPage() {
  return (
    <PageTemplate
      title="Ação e Submissão"
      description="Prepare-se para enviar seu projeto e acompanhar o processo"
      variant="default"
      breadcrumbs={[
        { label: 'Início', href: '/' },
        { label: 'Módulos', href: '/modulo' },
        { label: 'Ação e Submissão', href: '/modulo/acao-submissao' }
      ]}
    >
      <Tabs defaultValue="checklist" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full md:w-[600px]">
          <TabsTrigger value="checklist" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Checklist</span>
            <span className="sm:hidden">Lista</span>
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Acompanhamento</span>
            <span className="sm:hidden">Status</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            <span className="hidden sm:inline">Rede de Apoio</span>
            <span className="sm:hidden">Apoio</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="checklist" className="space-y-4">
          <ContentCard>
            <h2 className="text-xl font-semibold mb-4">Checklist Final</h2>
            <SubmissionChecklist items={checklistItems} />
          </ContentCard>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <ContentCard>
            <h2 className="text-xl font-semibold mb-4">Guia de Acompanhamento</h2>
            <TrackingGuide steps={trackingSteps} />
          </ContentCard>
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <ContentCard>
            <h2 className="text-xl font-semibold mb-4">Rede de Apoio</h2>
            <SupportNetwork contacts={supportContacts} />
          </ContentCard>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
}