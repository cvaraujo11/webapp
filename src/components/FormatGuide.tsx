import React from 'react';
import BeforeAfterExample from './BeforeAfterExample';
import Image from 'next/image';

interface FormatGuideProps {
  type: 'texto' | 'imagem';
  examples: Array<{
    title: string;
    description: string;
    image?: string;
  }>;
}

const FormatGuide: React.FC<FormatGuideProps> = ({ type, examples }) => {
  // Converter exemplos para formato BeforeAfterExample quando necessário
  const beforeAfterExamples = examples.map((example, index) => ({
    id: `example-${index}`,
    title: example.title,
    before: example.description.split('||')[0] || '',
    after: example.description.split('||')[1] || '',
    explanation: example.description.split('||')[2] || ''
  }));

  const hasBeforeAfter = examples.some(ex => ex.description.includes('||'));

  return (
    <section 
      aria-labelledby="format-guide-title"
      className="w-full"
    >
      <h2 
        id="format-guide-title"
        className="text-2xl font-semibold mb-4 text-[var(--color-foreground)]"
      >
        {type === 'texto' ? 'Guia de Formatação de Texto' : 'Guia de Formatação de Imagens'}
      </h2>

      {hasBeforeAfter ? (
        // Usar BeforeAfterExample para exemplos com antes/depois
        <BeforeAfterExample 
          examples={beforeAfterExamples}
          title={`Exemplos de ${type === 'texto' ? 'Formatação de Texto' : 'Tratamento de Imagens'}`}
          description={`Veja as melhores práticas para ${type === 'texto' ? 'formatar seus textos' : 'preparar suas imagens'}`}
        />
      ) : (
        // Grid de cards para exemplos simples
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {examples.map((example, index) => (
            <article
              key={index}
              className="bg-white rounded-lg border border-[var(--color-border)] overflow-hidden"
              aria-labelledby={`example-${index}-title`}
            >
              {example.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={example.image}
                    alt={`Ilustração para ${example.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3
                  id={`example-${index}-title`}
                  className="text-lg font-medium mb-2 text-[var(--color-foreground)]"
                >
                  {example.title}
                </h3>
                <p className="text-sm text-[var(--color-text)]">
                  {example.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default FormatGuide;