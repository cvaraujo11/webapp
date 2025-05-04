'use client';

import React, { useState, useRef, useEffect } from 'react';
import SidebarItem from './SidebarItem';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { 
  ChevronDown, 
  ChevronRight, 
  Menu, 
  Home, 
  Wrench, 
  BookOpen, 
  FileText, 
  Lightbulb, 
  Send, 
} from 'lucide-react';
import { 
  Sheet, 
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'; 
import { NavigationDirection, useKeyboardNavigation } from '@/lib/hooks/useKeyboardNavigation';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  id?: string;
}

interface SubItem {
  name: string;
  slug: string;
}

interface Module {
  name: string;
  slug: string;
  icon: React.ElementType; 
  subItems: SubItem[];
  progress?: number; // Progresso de 0-100
}

const modules: Module[] = [
  {
    name: 'Módulo 1: Ferramentas',
    slug: 'ferramentas',
    icon: Wrench,
    progress: 75,
    subItems: [
      { name: 'Introdução às Ferramentas', slug: 'introducao' },
      { name: 'Configuração do Ambiente', slug: 'configuracao' },
      { name: 'Uso Básico', slug: 'uso-basico' },
    ]
  },
  {
    name: 'Módulo 2: Fundamentos',
    slug: 'fundamentos',
    icon: BookOpen,
    progress: 50,
    subItems: [
      { name: 'Conceitos Básicos', slug: 'conceitos' },
      { name: 'Primeiros Passos', slug: 'primeiros-passos' },
      { name: 'Exercícios Práticos', slug: 'exercicios' },
    ]
  },
  {
    name: 'Módulo 3: Documentação',
    slug: 'documentacao',
    icon: FileText,
    progress: 30,
    subItems: [
      { name: 'Estrutura de Documentos', slug: 'estrutura' },
      { name: 'Boas Práticas', slug: 'boas-praticas' },
      { name: 'Exemplos', slug: 'exemplos' },
    ]
  },
  {
    name: 'Módulo 4: Ideias',
    slug: 'ideias',
    icon: Lightbulb,
    progress: 10,
    subItems: [
      { name: 'Brainstorming', slug: 'brainstorming' },
      { name: 'Validação', slug: 'validacao' },
      { name: 'Implementação', slug: 'implementacao' },
    ]
  },
  {
    name: 'Módulo 5: Conclusão',
    slug: 'conclusao',
    icon: Send,
    progress: 0,
    subItems: [
      { name: 'Resumo', slug: 'resumo' },
      { name: 'Próximos Passos', slug: 'proximos-passos' },
      { name: 'Recursos Adicionais', slug: 'recursos' },
    ]
  },
  {
    name: 'Página Inicial',
    slug: 'home',
    icon: Home,
    progress: 100,
    subItems: []
  },
  {
    name: 'Pesquisa',
    slug: 'pesquisa',
    icon: ChevronDown, // Substituído Search por ChevronDown temporariamente
    subItems: []
  }
];

const SidebarContent = () => {
  const pathname = usePathname();
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const navRef = useRef<HTMLElement>(null);
  
  // Configurar navegação por teclado
  const { focusedIndex, focusItem } = useKeyboardNavigation({
    containerRef: navRef,
    itemSelector: 'a[role="menuitem"], button[aria-label*="módulo"]',
    direction: NavigationDirection.VERTICAL,
    loop: true,
  });

  // Função para alternar a expansão de um módulo
  const toggleModule = (slug: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [slug]: !prev[slug]
    }));
  };

  // Verifica se um módulo deve ser expandido automaticamente
  const isModuleActive = (moduleSlug: string) => {
    return pathname?.includes(`/modulo/${moduleSlug}`);
  };

  // Expandir automaticamente o módulo ativo
  React.useEffect(() => {
    modules.forEach(module => {
      if (isModuleActive(module.slug)) {
        setExpandedModules(prev => ({
          ...prev,
          [module.slug]: true
        }));
      }
    });
  }, [pathname]);

  return (
    <nav 
      ref={navRef} 
      className="flex flex-col h-full"
      role="navigation" 
      aria-label="Menu de navegação principal"
    >
      <ul className="space-y-1 px-2" role="menu">
        {modules.map((module) => {
          // Verificar se o módulo atual está ativo com base no pathname
          const isActive = pathname.includes(`/modulo/${module.slug}`);
          
          // Determinar se deve mostrar subitens (quando o módulo está ativo ou expandido manualmente)
          const shouldShowSubItems = isActive || expandedModules[module.slug];
          
          return (
            <li key={module.slug} className="px-2" role="none">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  {/* Botão de expandir/colapsar */}
                  <button
                    onClick={() => toggleModule(module.slug)}
                    className="w-5 h-5 flex items-center justify-center rounded-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={shouldShowSubItems ? `Colapsar módulo ${module.name}` : `Expandir módulo ${module.name}`}
                    aria-expanded={shouldShowSubItems}
                    aria-controls={`${module.slug}-subitems`}
                  >
                    <ChevronRight 
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        shouldShowSubItems && "rotate-90"
                      )} 
                      aria-hidden="true"
                    />
                  </button>
                  
                  {/* Item principal do módulo */}
                  <div className="flex-1">
                    <Link
                      href={`/modulo/${module.slug}`}
                      className={cn(
                        "flex items-center px-3 py-1.5 rounded-md transition-colors text-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                        isActive
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                      role="menuitem"
                      aria-current={isActive ? "page" : undefined}
                    >
                      {module.icon && (
                        <module.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                      )}
                      <span className="truncate">{module.name}</span>
                    </Link>
                  </div>
                </div>
                
                {/* Barra de progresso */}
                {module.progress !== undefined && (
                  <div 
                    className="ml-8 mt-1 mb-1 w-[80%]"
                    aria-hidden={module.progress === 0}
                  >
                    <div 
                      className="h-1 bg-muted rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={module.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Progresso do módulo ${module.name}: ${module.progress}%`}
                    >
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          isActive ? "bg-primary" : "bg-accent"
                        )}
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {/* Lista de subItems */}
                {shouldShowSubItems && module.subItems.length > 0 && (
                  <ul 
                    id={`${module.slug}-subitems`}
                    className="ml-6 mt-1 space-y-1"
                    role="menu"
                    aria-label={`Subtópicos de ${module.name}`}
                  >
                    {module.subItems.map((subItem) => {
                      const isSubItemActive = pathname.includes(`/modulo/${module.slug}/${subItem.slug}`);
                      
                      return (
                        <li key={`${module.slug}-${subItem.slug}`} role="none">
                          <Link
                            href={`/modulo/${module.slug}/${subItem.slug}`}
                            className={cn(
                              "block px-2 py-1 text-sm rounded-sm transition-colors",
                              isSubItemActive
                                ? "text-primary font-medium bg-accent/50"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                            role="menuitem"
                            aria-current={isSubItemActive ? "page" : undefined}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, id }) => {
  // Detectar se estamos num dispositivo móvel
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Verificar na montagem e adicionar listener para redimensionamento
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  return (
    <>
      {/* Versão Mobile: Sheet da sidebar como overlay */}
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent 
            side="left" 
            className="p-0 w-[270px]"
            id={id}
          >
            <SheetHeader className="p-4 border-b">
              <SheetTitle>Menu de Navegação</SheetTitle>
            </SheetHeader>
            <div className="pt-2 pb-12 overflow-y-auto h-[calc(100vh-60px)]">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        /* Versão Desktop: Sidebar fixa com toggle */
        <aside 
          className={cn(
            "fixed top-[64px] left-0 h-[calc(100vh-64px)] overflow-hidden transition-all duration-300 bg-card border-r",
            isOpen ? "w-64" : "w-0"
          )}
          aria-hidden={!isOpen}
          id={id}
        >
          <div className="w-64 h-full overflow-y-auto pt-2 pb-12">
            <SidebarContent />
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;