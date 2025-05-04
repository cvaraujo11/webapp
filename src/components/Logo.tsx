import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  withText = true,
  className = ''
}) => {
  // Definir tamanhos com base no parâmetro size
  const sizes = {
    sm: { icon: 'h-6 w-6', text: 'text-sm' },
    md: { icon: 'h-8 w-8', text: 'text-base' },
    lg: { icon: 'h-10 w-10', text: 'text-lg' },
  };

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizes[size].icon} bg-accent rounded-md flex items-center justify-center text-primary-dark font-bold`}>
        <span>SP</span>
      </div>
      {withText && (
        <span className={`font-semibold ${sizes[size].text} text-inherit`}>
          Semente de Projeto
        </span>
      )}
    </Link>
  );
};

export default Logo;
