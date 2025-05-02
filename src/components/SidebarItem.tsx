// SidebarItem.tsx
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  href: string;
  label: string;
  pathname: string; // Adicionar a prop pathname
  children?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, label, pathname, children }) => {
  const isActive = pathname === href || (children && pathname.startsWith(href + '/')); // Lógica para sub-itens ativos

  return (
    <li>
      <Link
        href={href}
        className={`block px-3 py-2 rounded-md transition-colors text-sm ${ // Usando novas variáveis de cor
          isActive
            ? "bg-[var(--color-primary)] text-white font-semibold" // Estilo ativo com nova cor primária
            : "text-[var(--color-text-light)] hover:bg-[var(--color-border)] hover:text-[var(--color-foreground)]" // Estilo inativo com cores secundárias e hover sutil
        }`}
      >
        {label}
      </Link>
      {children}
    </li>
  );
};

export default SidebarItem;