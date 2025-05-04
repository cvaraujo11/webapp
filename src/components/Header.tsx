import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, HelpCircle, User, Search, BookOpen, Settings, LogOut } from 'lucide-react'; 
import SearchCommand from './SearchCommand';
import ProgressIndicator from './ProgressIndicator';
import Logo from './Logo';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  toggleSidebar?: () => void; 
  currentSectionTitle?: string;
  isSidebarOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, currentSectionTitle, isSidebarOpen }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  
  // Extrair o módulo atual do pathname
  const currentModule = pathname?.split('/')?.[2] || '';
  
  // Determinar o título da seção atual
  const sectionTitle = currentSectionTitle || 'Início';
  
  return (
    <header className="bg-primary text-white h-[64px] px-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <button
          className="p-1.5 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-white transition-colors"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>
        
        <div className="flex items-center">
          <Logo size="sm" className="text-white" />
          {sectionTitle && (
            <span className="hidden md:inline text-sm text-neutral-100 border-l border-white/30 pl-3 ml-2">
              {sectionTitle}
            </span>
          )}
        </div>
        
        {/* Indicador de progresso */}
        <div className="hidden lg:block ml-4">
          <ProgressIndicator currentModule={currentModule} />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Campo de busca em telas maiores */}
        <div className="hidden md:flex relative items-center max-w-xs">
          <div 
            onClick={() => setSearchOpen(true)}
            className="flex items-center bg-primary-dark/30 rounded-md px-3 py-1.5 text-sm text-white/90 cursor-pointer hover:bg-primary-dark/50 transition-colors w-[180px]"
          >
            <Search size={16} className="mr-2 text-white/70" />
            <span>Buscar...</span>
          </div>
        </div>
        
        {/* Botão de busca em telas menores */}
        <button
          className="md:hidden p-1.5 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-white transition-colors"
          onClick={() => setSearchOpen(true)}
          aria-label="Buscar"
        >
          <Search size={20} />
        </button>

        {/* Diálogo de busca */}
        <SearchCommand open={searchOpen} setOpen={setSearchOpen} />

        {/* Botão de ajuda */}
        <button
          className="p-1.5 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-white transition-colors"
          aria-label="Ajuda"
        >
          <HelpCircle size={20} />
        </button>

        {/* Menu de perfil do usuário */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="p-1.5 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-white transition-colors"
              aria-label="Perfil do Usuário"
            >
              <User size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Meu Progresso</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;