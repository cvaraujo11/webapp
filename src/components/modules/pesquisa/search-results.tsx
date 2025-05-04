import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

interface SearchResult {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  relevance: number;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
}

const SearchResults = ({ results, isLoading }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-4 rounded-lg border">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Resultados da Busca</h2>
        <span className="text-sm text-muted-foreground">{results.length} encontrados</span>
      </div>

      <div className="space-y-4">
        {results.map((result) => (
          <article 
            key={result.id}
            className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium hover:text-primary">
                <a href="#" className="hover:underline">{result.title}</a>
              </h3>
              <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                {result.category}
              </span>
            </div>

            <p className="text-muted-foreground mb-3 line-clamp-2">
              {result.excerpt}
            </p>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                {result.date}
              </div>

              <a 
                href="#" 
                className="flex items-center text-primary hover:underline"
              >
                Ver mais
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
