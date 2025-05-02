'use client';

import React from 'react';
import SidebarItem from './SidebarItem';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
}

const modules = [
  {
    name: 'Módulo 1: Ferramentas',
    slug: 'ferramentas',
    subItems: [
      { name: 'Introdução', slug: 'introducao' },
      { name: 'Formatação Texto', slug: 'formatacao-texto' },
      { name: 'Imagens', slug: 'imagens' },
      { name: 'Templates', slug: 'templates' },
    ],
  },
  { name: 'Módulo 2: Pesquisa', slug: 'pesquisa', subItems: [] },
  { name: 'Módulo 3: Decifrando', slug: 'decifrando', subItems: [] },
  { name: 'Módulo 4: Elaborando', slug: 'elaborando', subItems: [] },
  { name: 'Módulo 5: Ação e Apoio', slug: 'acao-apoio', subItems: [] },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const pathname = usePathname();

  return (
    <aside className={`fixed inset-y-0 left-0 w-64 bg-[var(--color-background)] p-4 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-auto md:block z-30 md:border-r md:border-[var(--color-border)]`}> {/* Fundo igual ao principal, borda sutil em desktop */}
      <nav className="h-full overflow-y-auto"> {/* Adicionado overflow para scroll em listas longas */}
        <ul>
          {modules.map((module) => (
            <SidebarItem
              key={module.slug}
              href={`/modulo/${module.slug}`}
              label={module.name}
              pathname={pathname} // Passar pathname para SidebarItem
            >
              {module.subItems.length > 0 && (
                <ul className="ml-4 mt-1 space-y-1"> {/* Adicionado espaço entre sub-itens */}
                  {module.subItems.map((subItem) => (
                    <SidebarItem
                      key={subItem.slug}
                      href={`/modulo/${module.slug}/${subItem.slug}`}
                      label={subItem.name}
                      pathname={pathname} // Passar pathname para SidebarItem
                    />
                  ))}
                </ul>
              )}
            </SidebarItem>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;