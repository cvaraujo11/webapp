import React from 'react';
import { FiMenu, FiHelpCircle, FiUser } from 'react-icons/fi'; // Exemplo de ícones

interface HeaderProps {
  toggleSidebar?: () => void; // Função para lidar com o toggle da sidebar
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-[var(--color-primary)] text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center">
        {/* Ícone de menu para mobile */}
        <button className="md:hidden mr-4 p-1 rounded-md hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-white" onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <FiMenu size={24} />
        </button>
        <span className="text-xl font-semibold">Semente de Projeto</span> {/* Ajustado para font-semibold */}
      </div>
      <div className="flex items-center">
        {/* Ícone de Ajuda */}
        <button className="ml-4 p-1 rounded-md hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-white" aria-label="Ajuda">
          <FiHelpCircle size={24} />
        </button>
        {/* Ícone de Usuário (Opcional) */}
        {/* <button className="ml-4 p-1 rounded-md hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-white" aria-label="Perfil do Usuário">
          <FiUser size={24} />
        </button> */} {/* Comentado temporariamente se não for usado */}
      </div>
    </header>
  );
};

export default Header;