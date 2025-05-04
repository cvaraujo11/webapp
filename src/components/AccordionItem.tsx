'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem as BaseAccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItemProps {
  value: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  variant?: 'default' | 'card' | 'bordered';
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  showIconChange?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  title,
  children,
  icon,
  defaultOpen = false,
  variant = 'default',
  className = '',
  titleClassName = '',
  contentClassName = '',
  showIconChange = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  // Variantes de estilo
  const variantClasses = {
    default: '',
    card: 'bg-background rounded-lg shadow-sm overflow-hidden mb-4',
    bordered: 'border border-border rounded-lg overflow-hidden mb-4',
  };
  
  // Manipular mudança de estado
  const handleValueChange = (value: string) => {
    setIsOpen(value.length > 0);
  };
  
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? value : ''}
      onValueChange={handleValueChange}
      className={cn(variantClasses[variant], className)}
    >
      <BaseAccordionItem value={value} className="border-0">
        <AccordionTrigger 
          className={cn(
            "px-4 py-3 hover:no-underline group",
            variant !== 'default' && 'hover:bg-muted/50',
            titleClassName
          )}
        >
          <div className="flex items-center gap-3">
            {/* Ícone (se fornecido) */}
            {icon && (
              <motion.div
                animate={{ rotate: isOpen ? 360 : 0 }}
                transition={{ duration: 0.4 }}
                className="text-primary"
              >
                {icon}
              </motion.div>
            )}
            
            {/* Ícone alternativo (+ / -) */}
            {showIconChange && !icon && (
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-muted-foreground"
              >
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </motion.div>
            )}
            
            {/* Título */}
            <motion.span
              animate={{ 
                color: isOpen ? 'var(--color-primary)' : 'inherit',
                fontWeight: isOpen ? 600 : 500
              }}
              transition={{ duration: 0.2 }}
            >
              {title}
            </motion.span>
          </div>
          
          {/* Ícone de chevron personalizado (substituindo o padrão) */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-muted-foreground"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </AccordionTrigger>
        
        <AccordionContent className={cn("px-4", contentClassName)}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {children}
          </motion.div>
        </AccordionContent>
      </BaseAccordionItem>
    </Accordion>
  );
};

export default AccordionItem;
