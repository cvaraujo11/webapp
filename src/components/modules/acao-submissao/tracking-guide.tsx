'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Timeline, TimelineItem } from '@/components/ui/timeline';
import { CheckCircle, Clock, FileText, AlertTriangle } from 'lucide-react';

interface TrackingItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'warning';
  date?: string;
}

interface TrackingGuideProps {
  className?: string;
}

const submissionTrackingData: TrackingItem[] = [
  {
    id: '1',
    title: 'Confirmação de Recebimento',
    description: 'Verificação inicial da submissão da proposta. Você receberá um e-mail ou notificação confirmando que sua proposta foi recebida com sucesso.',
    status: 'completed',
    date: '10/04/2023'
  },
  {
    id: '2',
    title: 'Análise de Conformidade',
    description: 'Verificação se a proposta atende a todos os requisitos formais do edital (documentação completa, formatação correta, etc).',
    status: 'completed',
    date: '15/04/2023'
  },
  {
    id: '3',
    title: 'Avaliação Técnica',
    description: 'Análise do mérito da proposta de acordo com os critérios estabelecidos no edital. Esta fase pode incluir pareceres de especialistas externos.',
    status: 'pending',
    date: '25/05/2023'
  },
  {
    id: '4',
    title: 'Resultado Preliminar',
    description: 'Divulgação da primeira lista de propostas aprovadas, normalmente sujeita a recursos.',
    status: 'warning',
    date: '15/06/2023'
  },
  {
    id: '5',
    title: 'Período de Recursos',
    description: 'Prazo para contestar resultados preliminares com justificativas formais.',
    status: 'pending'
  },
  {
    id: '6',
    title: 'Resultado Final',
    description: 'Divulgação da lista definitiva de propostas aprovadas após análise dos recursos.',
    status: 'pending'
  }
];

export function TrackingGuide({ className }: TrackingGuideProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className={className}>
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Guia de Acompanhamento</h3>
        
        <Tabs defaultValue="timeline">
          <TabsList className="mb-4">
            <TabsTrigger value="timeline">Linha do Tempo</TabsTrigger>
            <TabsTrigger value="tips">Dicas de Acompanhamento</TabsTrigger>
          </TabsList>
          
          <TabsContent value="timeline">
            <Timeline>
              {submissionTrackingData.map((item) => (
                <TimelineItem key={item.id}>
                  <TimelineItem.Icon>
                    {getStatusIcon(item.status)}
                  </TimelineItem.Icon>
                  <TimelineItem.Content>
                    <TimelineItem.Title>{item.title}</TimelineItem.Title>
                    <TimelineItem.Description>
                      {item.description}
                    </TimelineItem.Description>
                    {item.date && (
                      <TimelineItem.Meta>
                        Data estimada: {item.date}
                      </TimelineItem.Meta>
                    )}
                  </TimelineItem.Content>
                </TimelineItem>
              ))}
            </Timeline>
          </TabsContent>
          
          <TabsContent value="tips">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Mantenha-se informado</h4>
                <p className="text-muted-foreground text-sm">
                  Acompanhe regularmente o site da instituição financiadora e verifique seu e-mail, incluindo a pasta de spam.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">Organize sua documentação</h4>
                <p className="text-muted-foreground text-sm">
                  Mantenha todos os documentos relacionados à submissão organizados, incluindo protocolos de envio e comprovantes.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">Prepare-se para responder rapidamente</h4>
                <p className="text-muted-foreground text-sm">
                  Esteja preparado para fornecer informações adicionais ou esclarecimentos quando solicitados, frequentemente com prazos curtos.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium">Acompanhe os prazos</h4>
                <p className="text-muted-foreground text-sm">
                  Crie lembretes para datas importantes, especialmente para o período de recursos, que geralmente é curto.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}