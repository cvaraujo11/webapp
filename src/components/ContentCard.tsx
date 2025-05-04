'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';

interface ContentCardProps {
  title: string;
  children: React.ReactNode;
  isInteractive?: boolean; // Flag para indicar se o card deve ser interativo (expansível)
  startOpen?: boolean; // Nova prop para definir o estado inicial explicitamente
  icon?: React.ReactNode; // Ícone opcional para o card
  variant?: 'default' | 'outline' | 'filled';
  accentColor?: string; // Cor de destaque opcional (classe CSS)
  hoverEffect?: boolean; // Efeito de hover
}

const ContentCard: React.FC<ContentCardProps> = ({ 
  title, 
  children, 
  isInteractive = false, 
  startOpen,
  icon,
  variant = 'default',
  accentColor,
  hoverEffect = true
}) => {
  // Define o estado inicial: usa startOpen se fornecido, senão, abre se NÃO for interativo, fecha se for interativo.
  const [isOpen, setIsOpen] = useState(startOpen !== undefined ? startOpen : !isInteractive);
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const toggleOpen = () => {
    if (isInteractive) { // Só permite toggle se for interativo
      setIsOpen(!isOpen);
    }
  };
  
  // Definir classes com base na variante
  const variantClasses = {
    default: 'bg-background border border-border shadow-sm',
    outline: 'bg-transparent border-2 border-primary/20',
    filled: 'bg-primary/5 border border-primary/20',
  };
  
  // Definir classe de cor de destaque
  const accentClasses = accentColor ? `border-l-4 border-l-${accentColor}` : '';
  
  // Definir classes de hover
  const hoverClasses = hoverEffect ? 'transition-all duration-300 hover:shadow-md' : '';
  
  return (
    <motion.div 
      className={`rounded-lg p-0 mb-6 overflow-hidden ${variantClasses[variant]} ${accentClasses} ${hoverClasses}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={hoverEffect ? { scale: 1.01, y: -2 } : {}}
    >
      <div 
        className={`flex justify-between items-center p-5 ${isInteractive ? 'cursor-pointer' : ''}`} 
        onClick={toggleOpen}
      >
        <div className="flex items-center space-x-3">
          {icon && (
            <motion.div 
              className="text-primary"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.div>
          )}
          <motion.h2 
            className="text-xl font-semibold text-foreground"
            animate={{ x: isHovered && isInteractive ? 3 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h2>
        </div>
        
        {isInteractive && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-muted-foreground"
          >
            <ChevronDown size={20} />
          </motion.div>
        )}
      </div>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            ref={contentRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transition: { height: { duration: 0.3 }, opacity: { duration: 0.3, delay: 0.1 } }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: { height: { duration: 0.3 }, opacity: { duration: 0.2 } }
            }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 border-t border-border mt-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContentCard;