'use client';

import React, { useState } from 'react';
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

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void; 
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
    <nav className="flex flex-col h-full">
      <ul className="space-y-1 px-2">
        {modules.map((module) => {
          // Verificar se o módulo atual está ativo com base no pathname
          const isActive = pathname.includes(`/modulo/${module.slug}`);
          
          // Determinar se deve mostrar subitens (quando o módulo está ativo ou expandido manualmente)
          const shouldShowSubItems = isActive || expandedModules[module.slug];
          
          return (
            <li key={module.slug} className="px-2">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  {/* Botão de expandir/colapsar */}
                  <button
                    onClick={() => toggleModule(module.slug)}
                    className="w-5 h-5 flex items-center justify-center rounded-sm hover:bg-accent"
                    aria-label={shouldShowSubItems ? "Colapsar módulo" : "Expandir módulo"}
                  >
                    <ChevronRight 
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        shouldShowSubItems && "rotate-90"
                      )} 
                    />
                  </button>
                  
                  {/* Item principal do módulo - sem envolver em li */}
                  <div className="flex-1">
                    <Link
                      href={`/modulo/${module.slug}`}
                      className={cn(
                        "flex items-center px-3 py-1.5 rounded-md transition-colors text-sm group",
                        isActive
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {module.icon && (
                        <module.icon className="mr-2 h-4 w-4" />
                      )}
                      <span className="truncate">{module.name}</span>
                    </Link>
                  </div>
                </div>
                
                {/* Barra de progresso */}
                {module.progress !== undefined && (
                  <div className="ml-8 mt-1 mb-1 w-[80%]">
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
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
                
                {/* Subitens do módulo */}
                {shouldShowSubItems && (
                  <ul className="ml-8 mt-1 border-l border-muted pl-2 space-y-1">
                    {module.subItems.map((subItem) => (
                      <li key={subItem.slug}>
                        <Link
                          href={`/modulo/${module.slug}/${subItem.slug}`}
                          className={cn(
                            "flex items-center px-3 py-1.5 rounded-md transition-colors text-sm group",
                            "pl-7", // Padding extra para subitens
                            pathname === `/modulo/${module.slug}/${subItem.slug}` || pathname.startsWith(`/modulo/${module.slug}/${subItem.slug}/`)
                              ? "bg-primary text-primary-foreground font-medium"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          <span className="truncate">{subItem.name}</span>
                        </Link>
                      </li>
                    ))}
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

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Sidebar para desktop - aparece apenas quando ativado */}
      <aside 
        className={`md:block w-64 border-r border-border bg-background fixed top-16 bottom-0 left-0 z-30 overflow-y-auto transition-transform duration-300 shadow-lg ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="py-2">
          <SidebarContent />
        </div>
      </aside>

      {/* Sidebar para mobile - usa o componente Sheet */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="left" className="w-64 p-0 bg-background top-16">
            <SheetHeader className="sr-only">
              <SheetTitle>Menu Principal</SheetTitle>
              <SheetDescription>
                Navegação principal do site
              </SheetDescription>
            </SheetHeader>
            <div className="overflow-y-auto h-full">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;