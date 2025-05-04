import React, { useState } from 'react';
import { Clock, Calendar, ChevronDown, ChevronUp, Check, X, AlertTriangle } from 'lucide-react';

interface TimelinePhase {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'pendente' | 'andamento' | 'concluido' | 'atrasado';
  tasks?: {
    description: string;
    status: 'pendente' | 'andamento' | 'concluido' | 'atrasado';
    dueDate?: string;
  }[];
}

interface ProjectTimelineProps {
  phases: TimelinePhase[];
  title?: string;
  description?: string;
  projectTitle?: string;
  projectStartDate?: string;
  projectEndDate?: string;
  isEditable?: boolean;
}

const StatusColors = {
  pendente: {
    bg: 'bg-gray-200',
    text: 'text-gray-700',
    light: 'bg-gray-50',
    border: 'border-gray-200',
    icon: <Clock className="w-4 h-4" />
  },
  andamento: {
    bg: 'bg-blue-500',
    text: 'text-blue-700',
    light: 'bg-blue-50',
    border: 'border-blue-200',
    icon: <Clock className="w-4 h-4" />
  },
  concluido: {
    bg: 'bg-green-500',
    text: 'text-green-700',
    light: 'bg-green-50',
    border: 'border-green-200',
    icon: <Check className="w-4 h-4" />
  },
  atrasado: {
    bg: 'bg-red-500',
    text: 'text-red-700',
    light: 'bg-red-50',
    border: 'border-red-200',
    icon: <AlertTriangle className="w-4 h-4" />
  }
};

const StatusLabels = {
  pendente: 'Pendente',
  andamento: 'Em andamento',
  concluido: 'Concluído',
  atrasado: 'Atrasado'
};

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({
  phases,
  title = "Cronograma do Projeto",
  description = "Acompanhe as fases e tarefas do seu projeto",
  projectTitle = "Meu Projeto",
  projectStartDate,
  projectEndDate,
  isEditable = false
}) => {
  const [expandedPhases, setExpandedPhases] = useState<{ [key: string]: boolean }>({});
  
  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };
  
  const isPhaseExpanded = (phaseId: string) => expandedPhases[phaseId] || false;
  
  // Calcular o progresso geral do projeto
  const calculateProgress = () => {
    const totalPhases = phases.length;
    const completedPhases = phases.filter(phase => phase.status === 'concluido').length;
    return totalPhases > 0 ? Math.round((completedPhases / totalPhases) * 100) : 0;
  };
  
  // Formatar data para exibição
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
    } catch (error) {
      return dateStr;
    }
  };
  
  return (
    <div className="border border-[var(--color-border)] rounded-lg overflow-hidden bg-white">
      {/* Cabeçalho */}
      <div className="p-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="flex items-center mb-2">
          <Calendar className="w-5 h-5 text-[var(--color-primary)] mr-2" />
          <h3 className="text-lg font-medium text-[var(--color-foreground)]">{title}</h3>
        </div>
        
        <p className="text-sm text-[var(--color-text-light)] mb-4">{description}</p>
        
        {/* Informações do Projeto */}
        <div className="bg-[var(--color-background)] p-3 rounded-lg border border-[var(--color-border)]">
          <h4 className="font-medium text-[var(--color-foreground)] mb-2">{projectTitle}</h4>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-text-light)]">
            {projectStartDate && (
              <div className="flex items-center">
                <span className="font-medium mr-1">Início:</span>
                {formatDate(projectStartDate)}
              </div>
            )}
            {projectEndDate && (
              <div className="flex items-center">
                <span className="font-medium mr-1">Término previsto:</span>
                {formatDate(projectEndDate)}
              </div>
            )}
            <div className="flex items-center">
              <span className="font-medium mr-1">Progresso:</span>
              {calculateProgress()}%
            </div>
          </div>
        </div>
        
        {/* Barra de Progresso */}
        <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--color-primary)] transition-all duration-500 ease-out"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>
      
      {/* Lista de Fases */}
      <div className="divide-y divide-[var(--color-border)]">
        {phases.map((phase, index) => (
          <div key={phase.id} className="animate-fadeIn">
            {/* Cabeçalho da Fase */}
            <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => togglePhase(phase.id)}>
              <div className="flex items-start">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${StatusColors[phase.status].bg} text-white mr-3 flex-shrink-0`}>
                  {StatusColors[phase.status].icon}
                </div>
                
                <div>
                  <h4 className="font-medium text-[var(--color-foreground)]">
                    {index + 1}. {phase.title}
                  </h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-[var(--color-text-light)]">
                    <span className={`px-2 py-0.5 rounded-full ${StatusColors[phase.status].light} ${StatusColors[phase.status].text}`}>
                      {StatusLabels[phase.status]}
                    </span>
                    <span>
                      {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                className="text-[var(--color-text-light)] hover:text-[var(--color-text)] ml-2"
                aria-label={isPhaseExpanded(phase.id) ? "Recolher fase" : "Expandir fase"}
              >
                {isPhaseExpanded(phase.id) ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
            
            {/* Detalhes da Fase */}
            {isPhaseExpanded(phase.id) && (
              <div className="px-4 pb-4 bg-[var(--color-background)]/50">
                <div className="pl-9">
                  <p className="text-sm text-[var(--color-text)]">{phase.description}</p>
                  
                  {/* Lista de Tarefas */}
                  {phase.tasks && phase.tasks.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-[var(--color-foreground)] mb-2">Tarefas:</h5>
                      <ul className="space-y-2">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start bg-white p-2 rounded-md border border-[var(--color-border)]">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${StatusColors[task.status].bg} text-white mr-2 flex-shrink-0 mt-0.5`}>
                              {StatusColors[task.status].icon}
                            </div>
                            
                            <div className="flex-1">
                              <p className="text-sm text-[var(--color-text)]">{task.description}</p>
                              <div className="flex justify-between mt-1">
                                <span className={`text-xs ${StatusColors[task.status].text}`}>
                                  {StatusLabels[task.status]}
                                </span>
                                {task.dueDate && (
                                  <span className="text-xs text-[var(--color-text-light)]">
                                    Prazo: {formatDate(task.dueDate)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Dicas para uso do cronograma */}
      <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <h5 className="font-medium text-[var(--color-foreground)] mb-2 text-sm">Dicas para acompanhamento:</h5>
        <ul className="text-xs text-[var(--color-text-light)] space-y-1">
          <li className="flex items-start">
            <span className="text-[var(--color-primary)] mr-2">•</span>
            <span>Mantenha seu cronograma atualizado, alterando o status de cada fase e tarefa conforme o progresso.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[var(--color-primary)] mr-2">•</span>
            <span>Compartilhe o cronograma com todos os envolvidos no projeto para alinhar expectativas.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[var(--color-primary)] mr-2">•</span>
            <span>Fique atento aos prazos e ajuste-os se necessário, comunicando alterações aos financiadores.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectTimeline; 