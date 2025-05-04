'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox"; 
import { Label } from "@/components/ui/label"; 

interface ChecklistItemProps {
  id: string; 
  label: string;
  description?: string; 
  checked: boolean; 
  onChange: (checked: boolean) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ id, label, description, checked, onChange }) => {
  // Estado local para controlar a animação
  const [isAnimating, setIsAnimating] = useState(false);
  const [wasChecked, setWasChecked] = useState(checked);
  
  // Efeito para detectar mudanças no estado checked
  useEffect(() => {
    if (checked !== wasChecked) {
      setIsAnimating(true);
      setWasChecked(checked);
      
      // Resetar a animação após um tempo
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [checked, wasChecked]);
  
  // Função para lidar com a mudança de estado
  const handleChange = (value: boolean) => {
    onChange(value);
  };
  
  return (
    <motion.div 
      className="flex items-start space-x-3 p-3 rounded-lg relative overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{
        backgroundColor: checked ? 'rgba(0, 128, 0, 0.05)' : 'transparent',
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Animação de conclusão */}
      <AnimatePresence>
        {checked && isAnimating && (
          <motion.div 
            className="absolute inset-0 bg-green-50 dark:bg-green-950/20 z-0"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ transformOrigin: 'left' }}
          />
        )}
      </AnimatePresence>
      
      {/* Checkbox personalizado com animação */}
      <div className="relative mt-1 z-10">
        <Checkbox
          id={id} 
          checked={checked} 
          onCheckedChange={handleChange} 
          aria-checked={checked}
          className={cn(
            "transition-all duration-300",
            checked ? "border-primary bg-primary" : ""
          )}
        />
        
        {/* Ícone de conclusão animado */}
        <AnimatePresence>
          {checked && isAnimating && (
            <motion.div 
              className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-0.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
            >
              <Check size={12} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Conteúdo do item */}
      <div className="grid gap-1.5 leading-none relative z-10"> 
        <motion.div
          animate={{
            opacity: checked ? 0.7 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Label
            htmlFor={id} 
            className={cn(
              "font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-all duration-300", 
              checked && "line-through text-muted-foreground" 
            )}
          >
            {/* Texto com efeito de risco */}
            <motion.span
              animate={{
                textDecoration: checked ? "line-through" : "none",
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {label}
            </motion.span>
          </Label>
        </motion.div>
        
        {description && (
          <motion.p 
            className={cn(
              "text-sm text-muted-foreground transition-all duration-300", 
              checked && "line-through" 
            )}
            animate={{
              opacity: checked ? 0.6 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default ChecklistItem;