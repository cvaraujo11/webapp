'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

type TransitionVariant = 'fade' | 'slide' | 'scale' | 'none';

interface PageTransitionProps {
  children: React.ReactNode;
  variant?: TransitionVariant;
  duration?: number;
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  variant = 'fade',
  duration = 0.3,
}) => {
  const pathname = usePathname();
  
  // Definir variantes de animação
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.05 },
    },
    none: {
      initial: {},
      animate: {},
      exit: {},
    },
  };
  
  // Se a variante for 'none', apenas renderizar os filhos sem animação
  if (variant === 'none') {
    return <>{children}</>;
  }
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={variants[variant].initial}
        animate={variants[variant].animate}
        exit={variants[variant].exit}
        transition={{ duration }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
