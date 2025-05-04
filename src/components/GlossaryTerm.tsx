'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

interface GlossaryTermProps {
  term: string;
  definition: string;
  children: React.ReactNode;
  category?: string;
  source?: string;
  sourceUrl?: string;
  tooltipOnly?: boolean;
}

const GlossaryTerm: React.FC<GlossaryTermProps> = ({
  term,
  definition,
  children,
  category,
  source,
  sourceUrl,
  tooltipOnly = false,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  // Manipular a posição do tooltip
  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + window.scrollY,
    });
    setShowTooltip(true);
  };
  
  return (
    <>
      {tooltipOnly ? (
        // Versão apenas com tooltip
        <span 
          className="relative inline-flex items-center border-b border-dotted border-primary cursor-help group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {children}
          <HelpCircle className="ml-0.5 h-3 w-3 text-primary/70" />
          
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className="absolute z-50 w-64 bg-white dark:bg-gray-800 p-3 rounded-md shadow-lg text-sm"
                style={{
                  left: `calc(${tooltipPosition.x}px - 128px)`,
                  top: `${tooltipPosition.y + 10}px`,
                }}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-semibold text-primary mb-1">{term}</div>
                <p className="text-foreground">{definition}</p>
                {category && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    Categoria: <span className="font-medium">{category}</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </span>
      ) : (
        // Versão com modal
        <Dialog>
          <DialogTrigger asChild>
            <span 
              className="relative inline-flex items-center border-b border-dotted border-primary cursor-help"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => setShowTooltip(false)}
            >
              {children}
              <HelpCircle className="ml-0.5 h-3 w-3 text-primary/70" />
              
              {/* Tooltip que aparece ao passar o mouse */}
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    className="absolute z-50 w-64 bg-white dark:bg-gray-800 p-3 rounded-md shadow-lg text-sm"
                    style={{
                      left: `calc(${tooltipPosition.x}px - 128px)`,
                      top: `${tooltipPosition.y + 10}px`,
                    }}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="font-semibold text-primary mb-1">{term}</div>
                    <p className="text-foreground line-clamp-2">{definition}</p>
                    <p className="text-xs text-primary mt-1">Clique para mais detalhes</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
          </DialogTrigger>
          
          {/* Modal com definição completa */}
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl text-primary">{term}</DialogTitle>
              {category && (
                <DialogDescription>
                  <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-full text-xs mt-2">
                    {category}
                  </span>
                </DialogDescription>
              )}
            </DialogHeader>
            
            <div className="mt-4">
              <p className="text-foreground">{definition}</p>
              
              {source && (
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
                  <span>Fonte: {source}</span>
                  
                  {sourceUrl && (
                    <a 
                      href={sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      Ver referência
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
            
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Fechar</span>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default GlossaryTerm;
