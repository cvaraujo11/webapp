'use client';

import React from 'react';

interface SkipLinkProps {
  links?: Array<{
    id: string;
    label: string;
  }>;
}

/**
 * Componente que fornece links de acessibilidade para pular diretamente para áreas principais do site
 * Estes links ficam visíveis apenas quando recebem foco (para usuários de teclado)
 */
const SkipLink: React.FC<SkipLinkProps> = ({
  links = [
    { id: 'main-content', label: 'Pular para o conteúdo principal' },
    { id: 'sidebar', label: 'Pular para o menu de navegação' },
  ],
}) => {
  return (
    <div className="skip-links absolute z-[100]">
      {links.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className="
            sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
            bg-accent text-black px-4 py-2 rounded-md focus:ring-2 focus:ring-primary
            focus:outline-none transition-transform transform focus:translate-y-0
            font-medium text-sm
          "
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById(link.id);
            if (element) {
              element.setAttribute('tabindex', '-1');
              element.focus();
              // Permitir que seja desfocado mais tarde
              setTimeout(() => {
                element.removeAttribute('tabindex');
              }, 1000);
            }
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default SkipLink; 