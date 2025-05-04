import React from 'react';
import { CalendarIcon, BookmarkIcon, BarChart3Icon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type SearchResult = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  relevance: number;
};

interface SearchResultsProps {
  results: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Editais Abertos': 'bg-green-100 text-green-800',
      'Guias e Manuais': 'bg-blue-100 text-blue-800',
      'Exemplos': 'bg-purple-100 text-purple-800',
      'Webinars': 'bg-amber-100 text-amber-800',
      'Relatórios': 'bg-indigo-100 text-indigo-800'
    };
    
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Resultados da Pesquisa</h2>
        <span className="text-sm text-muted-foreground">{results.length} resultados encontrados</span>
      </div>

      <motion.div 
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {results.map((result) => (
          <motion.div
            key={result.id}
            className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow"
            variants={item}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <h3 className="text-lg font-medium">{result.title}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <BarChart3Icon className="h-4 w-4" />
                <span>Relevância: {result.relevance}%</span>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-3">{result.excerpt}</p>
            
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Badge className={getCategoryColor(result.category)}>
                {result.category}
              </Badge>
              
              <div className="flex items-center gap-1 text-muted-foreground">
                <CalendarIcon className="h-3.5 w-3.5" />
                <span>{result.date}</span>
              </div>
              
              <div className="flex-grow"></div>
              
              <Button variant="outline" size="sm" className="gap-1">
                <BookmarkIcon className="h-3.5 w-3.5" />
                Salvar
              </Button>
              
              <Button size="sm">Ver Detalhes</Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SearchResults;
