import React, { useState } from 'react';

interface ContentCardProps {
  title: string;
  children: React.ReactNode;
  isInteractive?: boolean; // Flag para indicar se o card deve ser interativo (expansível)
  startOpen?: boolean; // Nova prop para definir o estado inicial explicitamente
}

const ContentCard: React.FC<ContentCardProps> = ({ title, children, isInteractive = false, startOpen }) => {
  // Define o estado inicial: usa startOpen se fornecido, senão, abre se NÃO for interativo, fecha se for interativo.
  const [isOpen, setIsOpen] = useState(startOpen !== undefined ? startOpen : !isInteractive);

  const toggleOpen = () => {
    if (isInteractive) { // Só permite toggle se for interativo
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-lg shadow-md mb-6"> {/* Fundo surface, borda e sombra */}
      <div className={`flex justify-between items-center ${isInteractive ? 'cursor-pointer' : ''}`} onClick={toggleOpen}>
        <h2 className="text-xl font-semibold text-[var(--color-foreground)]">{title}</h2> {/* Cor do título atualizada */}
        {isInteractive && (
          <svg
            className={`w-6 h-6 text-[var(--color-text-light)] transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        )}
      </div>
      {isOpen && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default ContentCard;