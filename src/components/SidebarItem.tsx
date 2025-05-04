// SidebarItem.tsx
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Importar utilitário cn do shadcn

interface SidebarItemProps {
  href: string;
  label: string;
  pathname: string;
  icon?: React.ElementType; // Adicionar prop de ícone opcional
  isSubItem?: boolean; // Adicionar prop para indicar subitem opcional
  children?: React.ReactNode;
  wrapWithLi?: boolean; // Controla se o componente deve ser envolvido em um <li>
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  label,
  pathname,
  icon: IconComponent, // Renomear para evitar conflito
  isSubItem,
  children,
  wrapWithLi = true, // Por padrão, envolve em um <li>
}) => {
  // Lógica de ativação: exata ou começa com href + '/' (evita ativar '/modulo' se estiver em '/modulo-extra')
  const isActive = pathname === href || pathname.startsWith(href + '/');

  // Componente de link com seu conteúdo
  const linkContent = (
    <Link
      href={href}
      className={cn(
        "flex items-center px-3 py-1.5 rounded-md transition-colors text-sm group", // Alterado py-2 para py-1.5
        isSubItem && "pl-7", // Padding extra para subitens
        isActive
          ? "bg-primary text-primary-foreground font-medium" // Estilo Ativo (shadcn)
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground" // Estilo Inativo (shadcn)
      )}
    >
      {IconComponent && (
        <IconComponent className="mr-2 h-4 w-4" /> // Renderizar ícone se existir
      )}
      <span className="truncate">{label}</span> {/* Evitar quebra de texto */}
    </Link>
  );

  // Retorna apenas o link e os filhos, sem envolver em <li>
  // O elemento <li> deve ser adicionado pelo componente pai quando necessário
  return (
    <>
      {linkContent}
      {children}
    </>
  );
};

export default SidebarItem;