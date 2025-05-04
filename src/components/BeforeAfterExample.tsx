import React, { useState } from 'react';
import { ArrowRight, Info, Check, X } from 'lucide-react';

interface BeforeAfterProps {
  examples: {
    id: string;
    title: string;
    before: string;
    after: string;
    explanation: string;
  }[];
  title?: string;
  description?: string;
}

const BeforeAfterExample: React.FC<BeforeAfterProps> = ({
  examples,
  title = "Exemplos de Antes e Depois",
  description = "Veja como melhorar a escrita do seu projeto"
}) => {
  const [activeExample, setActiveExample] = useState<string>(examples[0]?.id || '');
  const [showMode, setShowMode] = useState<'before' | 'after' | 'both'>('before');
  
  const currentExample = examples.find(ex => ex.id === activeExample);
  
  return (
    <div className="border border-[var(--color-border)] rounded-lg overflow-hidden bg-white">
      {/* Cabeçalho */}
      <div className="p-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <h3 className="text-lg font-medium text-[var(--color-foreground)] mb-1">{title}</h3>
        <p className="text-sm text-[var(--color-text-light)]">{description}</p>
      </div>
      
      {/* Seleção de Exemplos */}
      <div className="p-2 border-b border-[var(--color-border)] bg-[var(--color-background)] flex flex-wrap gap-1">
        {examples.map(example => (
          <button
            key={example.id}
            onClick={() => {
              setActiveExample(example.id);
              setShowMode('before');
            }}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeExample === example.id
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-background)]'
            }`}
          >
            {example.title}
          </button>
        ))}
      </div>
      
      {/* Conteúdo do Exemplo */}
      {currentExample && (
        <div className="p-4">
          <div className="flex items-center mb-4">
            <h4 className="text-lg font-medium text-[var(--color-foreground)]">{currentExample.title}</h4>
          </div>
          
          {/* Controles de exibição */}
          <div className="flex border border-[var(--color-border)] rounded-lg overflow-hidden mb-4">
            <button
              onClick={() => setShowMode('before')}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                showMode === 'before' || showMode === 'both'
                  ? 'bg-red-50 text-red-700'
                  : 'bg-white text-[var(--color-text-light)] hover:bg-gray-50'
              }`}
            >
              Antes <X className="w-4 h-4 inline ml-1" />
            </button>
            <button
              onClick={() => setShowMode('both')}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                showMode === 'both'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-white text-[var(--color-text-light)] hover:bg-gray-50'
              }`}
            >
              Comparar <ArrowRight className="w-4 h-4 inline ml-1" />
            </button>
            <button
              onClick={() => setShowMode('after')}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                showMode === 'after' || showMode === 'both'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-white text-[var(--color-text-light)] hover:bg-gray-50'
              }`}
            >
              Depois <Check className="w-4 h-4 inline ml-1" />
            </button>
          </div>
          
          {/* Visualização dos textos */}
          <div className={`grid ${showMode === 'both' ? 'grid-cols-1 md:grid-cols-2 gap-4' : 'grid-cols-1'}`}>
            {/* Texto "Antes" */}
            {(showMode === 'before' || showMode === 'both') && (
              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <div className="flex items-center mb-2">
                  <X className="w-4 h-4 text-red-600 mr-1" />
                  <h5 className="font-medium text-red-700">Antes (Problemático)</h5>
                </div>
                <div className="prose prose-sm max-w-none text-gray-700">
                  {currentExample.before.split('\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
            
            {/* Texto "Depois" */}
            {(showMode === 'after' || showMode === 'both') && (
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-center mb-2">
                  <Check className="w-4 h-4 text-green-600 mr-1" />
                  <h5 className="font-medium text-green-700">Depois (Melhorado)</h5>
                </div>
                <div className="prose prose-sm max-w-none text-gray-700">
                  {currentExample.after.split('\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Explicação */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <Info className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h5 className="font-medium text-blue-700 mb-1">O que melhorou?</h5>
                <p className="text-sm text-blue-800">{currentExample.explanation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeforeAfterExample; 