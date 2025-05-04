import React from 'react';

interface ModuleProgress {
  id: string;
  name: string;
  progress: number; // 0-100
  color: string;
}

// Dados de exemplo para o progresso dos módulos
const moduleProgressData: ModuleProgress[] = [
  { id: 'ferramentas', name: 'Ferramentas', progress: 80, color: 'bg-green-500' },
  { id: 'pesquisa', name: 'Pesquisa', progress: 60, color: 'bg-blue-500' },
  { id: 'decifrando', name: 'Decifrando', progress: 40, color: 'bg-purple-500' },
  { id: 'elaborando', name: 'Elaborando', progress: 20, color: 'bg-amber-500' },
  { id: 'acao-apoio', name: 'Ação e Apoio', progress: 10, color: 'bg-red-500' },
];

interface ProgressIndicatorProps {
  currentModule?: string;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentModule,
  className = ''
}) => {
  // Filtra para mostrar apenas o módulo atual se especificado
  const modulesToShow = currentModule 
    ? moduleProgressData.filter(module => module.id === currentModule)
    : moduleProgressData;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {modulesToShow.map((module) => (
        <div key={module.id} className="flex flex-col items-center">
          <div className="relative w-16 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full ${module.color} rounded-full`}
              style={{ width: `${module.progress}%` }}
            />
          </div>
          {modulesToShow.length <= 2 && (
            <span className="text-xs mt-1 text-white/80">{module.name}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
