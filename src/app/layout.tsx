'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState, useEffect } from 'react'; 
import "./globals.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PageTransition from "../components/PageTransition";
import SkipLink from "../components/ui/SkipLink";
import { initializeAnalytics } from "@/lib/analytics";

// Fonte otimizada com display swap para melhor performance de carregamento
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    // Verificar se é dispositivo móvel
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Verificar inicialmente
    checkIfMobile();
    
    // Adicionar listener para redimensionamento
    window.addEventListener('resize', checkIfMobile);
    
    // Inicializar analytics
    initializeAnalytics();
    
    // Limpar listeners
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Ajustar classe do conteúdo principal com base no estado do sidebar
  const mainClassName = `flex-1 p-6 overflow-y-auto transition-all duration-300 ${
    hasMounted && isSidebarOpen ? 'md:ml-64' : ''
  }`;

  // Atualizar anúncios para leitores de tela quando a navegação mudar
  useEffect(() => {
    const announcer = document.getElementById('page-announcer');
    if (announcer) {
      announcer.textContent = `Página ${window.location.pathname.replace('/', '')} carregada`;
    }
  }, [children]);

  return (
    <html 
      lang="pt-BR" 
      className={inter.variable}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#2E7D32" />
        <meta name="description" content="Semente de Projeto - Seu guia para editais e políticas" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Skip Links para acessibilidade */}
        <SkipLink />
        
        <div className="flex flex-col h-screen">
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} /> 
          <div className="flex flex-1 relative">
            <Sidebar 
              id="sidebar" // ID para os skip links
              isOpen={isSidebarOpen} 
              setIsOpen={setIsSidebarOpen} 
            />
            <main 
              id="main-content" // ID para os skip links
              className={mainClassName}
              tabIndex={-1} // Permite receber foco para navegação por teclado
            >
              <PageTransition variant="fade" duration={0.3}>
                {children}
              </PageTransition>
            </main>
          </div>
        </div>
        
        {/* Anúncio para leitores de tela quando a página muda */}
        <div 
          aria-live="polite" 
          aria-atomic="true" 
          className="sr-only"
          id="page-announcer"
        >
          Página carregada
        </div>
      </body>
    </html>
  );
}
