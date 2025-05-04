'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import FlexGrid from './FlexGrid';

type PageTemplateVariant = 'default' | 'article' | 'gallery' | 'dashboard';

interface PageTemplateProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  variant?: PageTemplateVariant;
  headerImage?: string;
  className?: string;
  animate?: boolean;
  breadcrumbs?: { label: string; href: string }[];
}

const PageTemplate: React.FC<PageTemplateProps> = ({
  title,
  description,
  children,
  variant = 'default',
  headerImage,
  className = '',
  animate = true,
  breadcrumbs,
}) => {
  // Configurações específicas para cada variante
  const variantConfig = {
    default: {
      contentClass: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
      headerClass: 'mb-8',
      titleClass: 'text-3xl font-bold text-foreground',
      descriptionClass: 'mt-2 text-xl text-muted-foreground',
    },
    article: {
      contentClass: 'max-w-3xl mx-auto px-4 sm:px-6 py-8',
      headerClass: 'mb-10 text-center',
      titleClass: 'text-4xl font-bold text-foreground',
      descriptionClass: 'mt-3 text-xl text-muted-foreground',
    },
    gallery: {
      contentClass: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
      headerClass: 'mb-10',
      titleClass: 'text-3xl font-bold text-foreground',
      descriptionClass: 'mt-2 text-xl text-muted-foreground',
    },
    dashboard: {
      contentClass: 'max-w-full px-4 sm:px-6 lg:px-8 py-6',
      headerClass: 'mb-6 flex justify-between items-center',
      titleClass: 'text-2xl font-bold text-foreground',
      descriptionClass: 'mt-1 text-base text-muted-foreground',
    },
  };
  
  // Animações para entrada de página
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      }
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };
  
  // Renderizar breadcrumbs se fornecidos
  const renderBreadcrumbs = () => {
    if (!breadcrumbs || breadcrumbs.length === 0) return null;
    
    return (
      <nav className="flex mb-4 text-sm">
        <ol className="flex items-center space-x-2">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              {index > 0 && <span className="text-muted-foreground mx-1">/</span>}
              <li>
                <a 
                  href={crumb.href}
                  className={cn(
                    "hover:text-primary transition-colors",
                    index === breadcrumbs.length - 1 
                      ? "text-foreground font-medium" 
                      : "text-muted-foreground"
                  )}
                >
                  {crumb.label}
                </a>
              </li>
            </React.Fragment>
          ))}
        </ol>
      </nav>
    );
  };
  
  // Renderizar cabeçalho da página
  const renderHeader = () => (
    <header className={variantConfig[variant].headerClass}>
      {renderBreadcrumbs()}
      
      {headerImage && (
        <div className="mb-6 relative aspect-[21/9] overflow-hidden rounded-lg">
          <img 
            src={headerImage} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <motion.h1 
        className={variantConfig[variant].titleClass}
        variants={animate ? itemVariants : undefined}
      >
        {title}
      </motion.h1>
      
      {description && (
        <motion.p 
          className={variantConfig[variant].descriptionClass}
          variants={animate ? itemVariants : undefined}
        >
          {description}
        </motion.p>
      )}
    </header>
  );
  
  // Conteúdo específico para cada variante
  const renderContent = () => {
    // Para a variante de artigo, envolvemos o conteúdo em uma div de artigo
    if (variant === 'article') {
      return (
        <article className="prose prose-lg dark:prose-invert max-w-none">
          {children}
        </article>
      );
    }
    
    // Para a variante de galeria, envolvemos o conteúdo em um FlexGrid
    if (variant === 'gallery') {
      return (
        <FlexGrid 
          variant="bento" 
          columns={3} 
          gap="md"
          animate={animate}
        >
          {children}
        </FlexGrid>
      );
    }
    
    // Para a variante de dashboard, envolvemos o conteúdo em um grid específico
    if (variant === 'dashboard') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children}
        </div>
      );
    }
    
    // Variante padrão
    return children;
  };
  
  // Renderizar a página com ou sem animações
  if (animate) {
    return (
      <motion.div
        className={cn(variantConfig[variant].contentClass, className)}
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        {renderHeader()}
        <motion.div variants={itemVariants}>
          {renderContent()}
        </motion.div>
      </motion.div>
    );
  }
  
  // Versão sem animações
  return (
    <div className={cn(variantConfig[variant].contentClass, className)}>
      {renderHeader()}
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default PageTemplate;
