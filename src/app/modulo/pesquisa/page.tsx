'use client';

import React, { useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Lightbulb, Bell } from 'lucide-react';
import SearchResults from '@/components/modules/pesquisa/search-results';
import AIAssistant from '@/components/modules/pesquisa/ai-assistant';
import AlertSystem from '@/components/modules/pesquisa/alert-system';

export default function PesquisaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Simulação de busca
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    // Simulação de delay de rede
    setTimeout(() => {
      // Dados simulados de resultados de pesquisa
      const mockResults = [
        {
          id: 1,
          title: 'Edital de Financiamento Cultural 2025',
          excerpt: 'Programa de apoio a projetos culturais com foco em inclusão e diversidade...',
          category: 'Editais Abertos',
          date: '2025-04-28',
          relevance: 98
        },
        {
          id: 2,
          title: 'Guia de Elaboração de Projetos Culturais',
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
        },
        {
          id: 4,
          title: 'Webinar: Como elaborar orçamentos eficientes',
          excerpt: 'Apresentação sobre técnicas de planejamento financeiro para projetos culturais...',
          category: 'Webinars',
          date: '2025-01-22',
          relevance: 85
        },
        {
          id: 5,
          title: 'Relatório de Tendências em Editais 2025',
          excerpt: 'Análise das principais tendências e prioridades dos editais culturais para o ano...',
          category: 'Relatórios',
          date: '2025-01-05',
          relevance: 82
        }
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 800);
  };

  return (
    <PageTemplate
      title="Pesquisa Avançada"
      description="Encontre editais, guias e recursos para seus projetos culturais"
      variant="default"
      breadcrumbs={[
        { label: 'Início', href: '/' },
        { label: 'Módulos', href: '/modulo' },
        { label: 'Pesquisa', href: '/modulo/pesquisa' }
      ]}
    >
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Busca Inteligente</h2>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Busque por editais, guias, exemplos de projetos..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isSearching}>
                {isSearching ? 'Buscando...' : 'Pesquisar'}
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Dica: Use termos específicos como "edital audiovisual" ou "modelo de orçamento"
            </div>
          </form>
        </div>
      </section>

      {searchResults.length > 0 && (
        <SearchResults results={searchResults} />
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h2 className="text-2xl font-semibold">Assistente IA</h2>
          </div>
          <AIAssistant />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-blue-500" />
            <h2 className="text-2xl font-semibold">Alertas de Editais</h2>
          </div>
          <AlertSystem />
        </section>
      </div>
    </PageTemplate>
  );
}
