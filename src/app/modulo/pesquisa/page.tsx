'use client';

import React, { useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Lightbulb, Bell } from 'lucide-react';
import { ContentCard } from '@/components/ContentCard';
import SearchResults from '@/components/modules/pesquisa/search-results';
import AIAssistant from '@/components/modules/pesquisa/ai-assistant';
import AlertSystem from '@/components/modules/pesquisa/alert-system';

export default function PesquisaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simular busca com delay
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          title: 'Edital XPTO 2025 - Apoio a Projetos Culturais',
          excerpt: 'Financiamento para iniciativas culturais em comunidades tradicionais...',
          category: 'Editais Abertos',
          date: '2025-04-01',
          relevance: 100
        },
        {
          id: 2,
          title: 'Guia de Elaboração de Projetos',
          excerpt: 'Manual completo com orientações para desenvolvimento de propostas competitivas...',
          category: 'Guias e Manuais',
          date: '2025-03-15',
          relevance: 95
        },
        {
          id: 3,
          title: 'Exemplos de Projetos Aprovados',
          excerpt: 'Coletânea de projetos bem-sucedidos em editais anteriores com análise detalhada...',
          category: 'Exemplos',
          date: '2025-02-10',
          relevance: 90
        }
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 800);
  };

  return (
    <PageTemplate
      title="Pesquisa de Editais"
      description="Encontre e monitore oportunidades para sua comunidade"
      variant="default"
      breadcrumbs={[
        { label: 'Início', href: '/' },
        { label: 'Módulos', href: '/modulo' },
        { label: 'Pesquisa', href: '/modulo/pesquisa' }
      ]}
    >
      <div className="space-y-8">
        {/* Interface de Busca */}
        <ContentCard>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Busque por editais, guias ou recursos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" disabled={isSearching}>
                <Search className="w-4 h-4 mr-2" />
                {isSearching ? 'Buscando...' : 'Buscar'}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              <span className="text-muted-foreground">Sugestões:</span>
              <Button
                variant="link"
                type="button"
                className="p-0 h-auto"
                onClick={() => setSearchQuery('projetos culturais')}
              >
                projetos culturais
              </Button>
              <Button
                variant="link"
                type="button"
                className="p-0 h-auto"
                onClick={() => setSearchQuery('apoio agricultura familiar')}
              >
                apoio agricultura familiar
              </Button>
            </div>
          </form>
        </ContentCard>

        {/* Resultados da Busca */}
        {searchResults.length > 0 && (
          <SearchResults results={searchResults} isLoading={isSearching} />
        )}

        {/* Assistente IA */}
        <ContentCard>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Assistente de Busca</h2>
          </div>
          <AIAssistant />
        </ContentCard>

        {/* Sistema de Alertas */}
        <ContentCard>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Alertas</h2>
          </div>
          <AlertSystem />
        </ContentCard>
      </div>
    </PageTemplate>
  );
}
