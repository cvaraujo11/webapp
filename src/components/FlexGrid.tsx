'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type GridVariant = 'default' | 'bento' | 'masonry' | 'featured';
type GridColumns = 1 | 2 | 3 | 4;
type GridGap = 'none' | 'sm' | 'md' | 'lg';

interface FlexGridProps {
  children: React.ReactNode;
  variant?: GridVariant;
  columns?: GridColumns;
  gap?: GridGap;
  className?: string;
  animate?: boolean;
}

const FlexGrid: React.FC<FlexGridProps> = ({
  children,
  variant = 'default',
  columns = 3,
  gap = 'md',
  className = '',
  animate = true,
}) => {
  // Mapear colunas para classes Tailwind
  const columnsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };
  
  // Mapear espaçamentos para classes Tailwind
  const gapClass = {
    'none': 'gap-0',
    'sm': 'gap-2',
    'md': 'gap-4',
    'lg': 'gap-6',
  };
  
  // Variantes de layout
  const variantClass = {
    'default': '',
    'bento': 'auto-rows-[minmax(180px,auto)]',
    'masonry': 'masonry-grid', // Requer CSS adicional
    'featured': 'grid-template-areas: "featured featured" "normal1 normal2"',
  };
  
  // Verificar se estamos renderizando filhos como array
  const childrenArray = React.Children.toArray(children);
  
  // Renderizar grid padrão
  if (variant === 'default' || variant === 'masonry') {
    return (
      <div 
        className={cn(
          'grid',
          columnsClass[columns],
          gapClass[gap],
          variantClass[variant],
          className
        )}
      >
        {animate 
          ? childrenArray.map((child, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.43, 0.13, 0.23, 0.96] 
                }}
              >
                {child}
              </motion.div>
            ))
          : children
        }
      </div>
    );
  }
  
  // Renderizar layout Bento
  if (variant === 'bento') {
    return (
      <div 
        className={cn(
          'grid',
          columnsClass[columns],
          gapClass[gap],
          variantClass[variant],
          className
        )}
      >
        {animate
          ? childrenArray.map((child, index) => {
              // Determinar se este item deve ocupar mais espaço (para cada 5º item)
              const isWide = index % 5 === 0;
              const isTall = index % 7 === 0;
              
              return (
                <motion.div
                  key={index}
                  className={cn(
                    isWide && 'sm:col-span-2',
                    isTall && 'row-span-2'
                  )}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.43, 0.13, 0.23, 0.96] 
                  }}
                >
                  {child}
                </motion.div>
              );
            })
          : childrenArray.map((child, index) => {
              const isWide = index % 5 === 0;
              const isTall = index % 7 === 0;
              
              return (
                <div
                  key={index}
                  className={cn(
                    isWide && 'sm:col-span-2',
                    isTall && 'row-span-2'
                  )}
                >
                  {child}
                </div>
              );
            })
        }
      </div>
    );
  }
  
  // Renderizar layout Featured
  if (variant === 'featured') {
    // Garantir que temos pelo menos 3 itens
    if (childrenArray.length < 3) {
      return (
        <div 
          className={cn(
            'grid',
            columnsClass[columns],
            gapClass[gap],
            className
          )}
        >
          {children}
        </div>
      );
    }
    
    const featuredItem = childrenArray[0];
    const remainingItems = childrenArray.slice(1);
    
    return (
      <div 
        className={cn(
          'grid grid-cols-1 md:grid-cols-2',
          gapClass[gap],
          className
        )}
      >
        {animate ? (
          <>
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {featuredItem}
            </motion.div>
            
            {remainingItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.2 + (index * 0.1),
                  ease: [0.43, 0.13, 0.23, 0.96] 
                }}
              >
                {item}
              </motion.div>
            ))}
          </>
        ) : (
          <>
            <div className="md:col-span-2">
              {featuredItem}
            </div>
            
            {remainingItems.map((item, index) => (
              <div key={index}>
                {item}
              </div>
            ))}
          </>
        )}
      </div>
    );
  }
  
  // Fallback para grid padrão
  return (
    <div 
      className={cn(
        'grid',
        columnsClass[columns],
        gapClass[gap],
        className
      )}
    >
      {children}
    </div>
  );
};

export default FlexGrid;
