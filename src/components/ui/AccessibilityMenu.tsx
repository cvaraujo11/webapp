'use client';

import React, { useState } from 'react';
import { Accessibility, Moon, Eye, Monitor, Type, AlignLeft } from 'lucide-react';
import useHighContrast from '../../lib/hooks/useHighContrast';

interface AccessibilityMenuProps {
  className?: string;
}

const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isHighContrast, toggleHighContrast } = useHighContrast();
  const [fontSize, setFontSize] = useState('normal');
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Alternar o tamanho da fonte
  const toggleFontSize = () => {
    const html = document.documentElement;
    
    if (fontSize === 'normal') {
      html.style.fontSize = '110%';
      setFontSize('large');
    } else if (fontSize === 'large') {
      html.style.fontSize = '125%';
      setFontSize('x-large');
    } else {
      html.style.fontSize = '100%';
      setFontSize('normal');
    }
    
    localStorage.setItem('font-size-preference', fontSize);
  };
  
  // Alternar redução de movimento
  const toggleReducedMotion = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    
    if (newValue) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    
    localStorage.setItem('reduced-motion', String(newValue));
  };
  
  return (
    <div className={`relative ${className}`}>
      {/* Botão de acessibilidade */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent-dark"
        aria-label="Opções de acessibilidade"
        aria-expanded={isOpen}
        aria-controls="accessibility-menu"
      >
        <Accessibility className="w-5 h-5 text-neutral-700" />
      </button>
      
      {/* Menu dropdown */}
      {isOpen && (
        <div
          id="accessibility-menu"
          className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 z-50"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="p-2 border-b border-neutral-200">
            <h3 className="text-sm font-medium text-neutral-800">Acessibilidade</h3>
          </div>
          
          <div className="p-2">
            {/* Alto contraste */}
            <button
              onClick={toggleHighContrast}
              className="w-full flex items-center justify-between p-2 rounded-md hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent"
              role="menuitem"
            >
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-3 text-primary" />
                <span className="text-sm">Alto contraste</span>
              </div>
              <div className={`w-10 h-5 rounded-full transition-colors ${isHighContrast ? 'bg-primary' : 'bg-neutral-300'}`}>
                <div 
                  className={`w-4 h-4 rounded-full bg-white transform transition-transform ${isHighContrast ? 'translate-x-5' : 'translate-x-1'}`} 
                  style={{ marginTop: '2px' }}
                />
              </div>
            </button>
            
            {/* Tamanho da fonte */}
            <button
              onClick={toggleFontSize}
              className="w-full flex items-center justify-between p-2 rounded-md hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent mt-1"
              role="menuitem"
            >
              <div className="flex items-center">
                <Type className="w-4 h-4 mr-3 text-primary" />
                <span className="text-sm">Tamanho da fonte: {fontSize}</span>
              </div>
            </button>
            
            {/* Reduzir movimento */}
            <button
              onClick={toggleReducedMotion}
              className="w-full flex items-center justify-between p-2 rounded-md hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent mt-1"
              role="menuitem"
            >
              <div className="flex items-center">
                <Monitor className="w-4 h-4 mr-3 text-primary" />
                <span className="text-sm">Reduzir movimento</span>
              </div>
              <div className={`w-10 h-5 rounded-full transition-colors ${reducedMotion ? 'bg-primary' : 'bg-neutral-300'}`}>
                <div 
                  className={`w-4 h-4 rounded-full bg-white transform transition-transform ${reducedMotion ? 'translate-x-5' : 'translate-x-1'}`} 
                  style={{ marginTop: '2px' }}
                />
              </div>
            </button>
          </div>
          
          {/* Botões de ação */}
          <div className="p-2 border-t border-neutral-200">
            <button
              onClick={() => {
                // Resetar todas as configurações
                document.documentElement.classList.remove('high-contrast');
                document.documentElement.classList.remove('reduce-motion');
                document.documentElement.style.fontSize = '100%';
                
                // Limpar localStorage
                localStorage.removeItem('high-contrast-mode');
                localStorage.removeItem('reduced-motion');
                localStorage.removeItem('font-size-preference');
                
                // Resetar estados
                setFontSize('normal');
                setReducedMotion(false);
                
                // Fechar menu
                setIsOpen(false);
              }}
              className="w-full text-center p-2 text-sm text-action hover:underline focus:outline-none"
              role="menuitem"
            >
              Resetar configurações
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityMenu; 