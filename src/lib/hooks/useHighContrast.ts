'use client';

import { useState, useEffect } from 'react';

/**
 * Hook para gerenciar o modo de alto contraste
 * @returns {Object} { isHighContrast, toggleHighContrast, enableHighContrast, disableHighContrast }
 */
export function useHighContrast() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  // Verificar preferência do usuário na inicialização
  useEffect(() => {
    // Verificar se existe preferência salva
    const savedPreference = localStorage.getItem('high-contrast-mode');
    
    if (savedPreference === 'true') {
      setIsHighContrast(true);
      document.documentElement.classList.add('high-contrast');
    } else if (savedPreference === null) {
      // Se não há preferência salva, verificar configuração do sistema
      const prefersHighContrast = window.matchMedia('(prefers-contrast: more)').matches;
      
      if (prefersHighContrast) {
        setIsHighContrast(true);
        document.documentElement.classList.add('high-contrast');
        localStorage.setItem('high-contrast-mode', 'true');
      }
    }
  }, []);

  // Alternar modo de alto contraste
  const toggleHighContrast = () => {
    setIsHighContrast(prev => {
      const newValue = !prev;
      
      // Atualizar classes no documento
      if (newValue) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
      
      // Salvar preferência
      localStorage.setItem('high-contrast-mode', String(newValue));
      
      return newValue;
    });
  };

  // Habilitar alto contraste
  const enableHighContrast = () => {
    if (!isHighContrast) {
      setIsHighContrast(true);
      document.documentElement.classList.add('high-contrast');
      localStorage.setItem('high-contrast-mode', 'true');
    }
  };

  // Desabilitar alto contraste
  const disableHighContrast = () => {
    if (isHighContrast) {
      setIsHighContrast(false);
      document.documentElement.classList.remove('high-contrast');
      localStorage.setItem('high-contrast-mode', 'false');
    }
  };

  return {
    isHighContrast,
    toggleHighContrast,
    enableHighContrast,
    disableHighContrast,
  };
}

export default useHighContrast; 