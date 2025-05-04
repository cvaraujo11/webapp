'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Check, Loader2 } from 'lucide-react';

interface DownloadButtonProps {
  fileName: string;
  label: string;
  fileSize?: string; // Tamanho do arquivo (opcional)
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  fileName, 
  label, 
  fileSize,
  variant = 'default',
  size = 'md'
}) => {
  // Estados para controlar o progresso do download
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  
  // O link aponta para a pasta public/templates
  const filePath = `/templates/${fileName}`;
  
  // Simular o progresso do download (em uma aplicação real, isso seria baseado no progresso real do download)
  const simulateDownload = () => {
    if (downloadState !== 'idle') return;
    
    setDownloadState('downloading');
    setProgress(0);
    
    // Simular progresso com intervalos
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setDownloadState('complete');
          
          // Resetar após um tempo
          setTimeout(() => {
            setDownloadState('idle');
            setProgress(0);
          }, 2000);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 200);
  };
  
  // Definir classes com base no tamanho
  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-2.5 px-5',
  };
  
  // Definir classes com base na variante
  const variantClasses = {
    default: 'bg-primary hover:bg-primary-dark text-white',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-primary/10',
  };
  
  // Definir tamanho do ícone com base no tamanho do botão
  const iconSize = {
    sm: 14,
    md: 16,
    lg: 18,
  };
  
  return (
    <div className="relative inline-block">
      <a
        href={downloadState === 'idle' ? filePath : '#'}
        download={downloadState === 'idle'}
        onClick={(e) => {
          if (downloadState !== 'idle') {
            e.preventDefault();
            return;
          }
          simulateDownload();
        }}
        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${sizeClasses[size]} ${variantClasses[variant]}`}
      >
        <span className="relative flex items-center">
          {/* Ícone baseado no estado */}
          {downloadState === 'idle' && (
            <Download className="mr-2" size={iconSize[size]} />
          )}
          
          {downloadState === 'downloading' && (
            <Loader2 className="mr-2 animate-spin" size={iconSize[size]} />
          )}
          
          {downloadState === 'complete' && (
            <Check className="mr-2" size={iconSize[size]} />
          )}
          
          {/* Texto do botão */}
          <span>
            {downloadState === 'idle' && label}
            {downloadState === 'downloading' && 'Baixando...'}
            {downloadState === 'complete' && 'Concluído!'}
          </span>
          
          {/* Tamanho do arquivo (se fornecido) */}
          {fileSize && downloadState === 'idle' && (
            <span className="ml-1 text-xs opacity-70">({fileSize})</span>
          )}
        </span>
      </a>
      
      {/* Barra de progresso */}
      {downloadState === 'downloading' && (
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      )}
    </div>
  );
};

export default DownloadButton;