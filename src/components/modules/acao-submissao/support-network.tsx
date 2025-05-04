'use client';

import React from 'react';
import { Card } from '../../ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Mail, Phone, MapPin, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Contact {
  id: string;
  name: string;
  role: string;
  organization: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
}

interface SupportNetworkProps {
  className?: string;
}

const contacts: Contact[] = [
  {
    id: '1',
    name: 'Centro de Apoio a Projetos Comunitários',
    role: 'Agência de Fomento',
    organization: 'Secretaria de Desenvolvimento Social',
    email: 'apoioprojetos@gov.br',
    phone: '(61) 3333-4444',
    address: 'Av. Principal, 1500 - Brasília, DF',
    website: 'https://apoioprojetos.gov.br'
  },
  {
    id: '2',
    name: 'Programa Semear',
    role: 'Rede de Mentoria',
    organization: 'Instituto Nacional de Desenvolvimento',
    email: 'contato@semear.org',
    phone: '(11) 2222-5555',
    address: 'Rua das Flores, 450 - São Paulo, SP',
    website: 'https://semear.org.br'
  },
  {
    id: '3',
    name: 'Rede de Incubadoras Sociais',
    role: 'Suporte Técnico',
    organization: 'Universidade Federal',
    email: 'incubadoras@edu.br',
    phone: '(31) 4444-7777',
    address: 'Campus Universitário - Belo Horizonte, MG',
    website: 'https://incubadoras.edu.br'
  }
];

const communityGroups = [
  {
    id: '1',
    name: 'Fórum de Projetos Socioambientais',
    description: 'Comunidade online dedicada à discussão e compartilhamento de experiências sobre projetos socioambientais.',
    platform: 'Telegram',
    link: 'https://t.me/forumprojetos'
  },
  {
    id: '2',
    name: 'Rede de Proponentes de Editais Públicos',
    description: 'Grupo de WhatsApp para troca de informações sobre editais, dúvidas de submissão e acompanhamento.',
    platform: 'WhatsApp',
    link: 'https://wa.me/123456789'
  },
  {
    id: '3',
    name: 'Comunidade Semente Brasil',
    description: 'Grupo do Facebook com mais de 5.000 membros dedicados à captação de recursos e implementação de projetos comunitários.',
    platform: 'Facebook',
    link: 'https://facebook.com/groups/sementebrasil'
  }
];

export function SupportNetwork({ className }: SupportNetworkProps) {
  return (
    <div className={className}>
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Rede de Apoio</h3>
        
        <Tabs defaultValue="contacts">
          <TabsList className="mb-4">
            <TabsTrigger value="contacts">Contatos Institucionais</TabsTrigger>
            <TabsTrigger value="community">Grupos Comunitários</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contacts">
            <div className="space-y-6">
              {contacts.map((contact) => (
                <div key={contact.id} className="border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div>
                      <h4 className="font-medium text-lg">{contact.name}</h4>
                      <p className="text-sm text-muted-foreground">{contact.role} • {contact.organization}</p>
                      
                      <div className="mt-3 space-y-2">
                        {contact.email && (
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{contact.email}</span>
                          </div>
                        )}
                        
                        {contact.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{contact.phone}</span>
                          </div>
                        )}
                        
                        {contact.address && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{contact.address}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {contact.website && (
                      <Button variant="outline" size="sm" className="mt-2 sm:mt-0 gap-1">
                        <ExternalLink className="h-4 w-4" />
                        Visitar Site
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="community">
            <div className="space-y-6">
              {communityGroups.map((group) => (
                <div key={group.id} className="border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div>
                      <h4 className="font-medium text-lg">{group.name}</h4>
                      <p className="text-sm text-muted-foreground">Via {group.platform}</p>
                      
                      <div className="mt-2">
                        <p className="text-sm">{group.description}</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="mt-2 sm:mt-0 gap-1">
                      <Users className="h-4 w-4" />
                      Participar
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>Dica:</strong> Participar de grupos comunitários pode ser muito útil para tirar dúvidas específicas e aprender com a experiência de outros proponentes que já passaram pelo mesmo processo.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}