import React, { useState } from 'react';
import { Check, Clock, AlertTriangle, ArrowRight, ArrowLeft, Clipboard } from 'lucide-react';

interface StepItem {
  id: string;
  title: string;
  description: string;
  tips?: string[];
  warningText?: string;
  imageUrl?: string;
  estimatedTime?: string;
}

interface StepByStepGuideProps {
  steps: StepItem[];
  title?: string;
  description?: string;
}

const StepByStepGuide: React.FC<StepByStepGuideProps> = ({
  steps,
  title = "Guia Passo a Passo",
  description = "Siga estas etapas para submeter seu projeto com sucesso"
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean }>({});
  
  const currentStep = steps[currentStepIndex];
  const totalSteps = steps.length;
  const progress = ((currentStepIndex + 1) / totalSteps) * 100;
  
  const goToNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };
  
  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };
  
  const isStepCompleted = (stepId: string) => completedSteps[stepId] || false;
  
  return (
    <div className="border border-[var(--color-border)] rounded-lg overflow-hidden bg-white">
      {/* Cabeçalho com Barra de Progresso */}
      <div className="p-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-[var(--color-foreground)]">{title}</h3>
          <span className="text-sm text-[var(--color-text-light)]">
            Etapa {currentStepIndex + 1} de {totalSteps}
          </span>
        </div>
        
        <p className="text-sm text-[var(--color-text-light)] mb-3">{description}</p>
        
        {/* Barra de Progresso */}
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--color-primary)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Navegação de Etapas */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-[var(--color-border)]">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => setCurrentStepIndex(index)}
            className={`flex items-center gap-1 px-2 py-1 text-xs rounded ${
              currentStepIndex === index
                ? 'bg-[var(--color-primary)] text-white'
                : isStepCompleted(step.id)
                  ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isStepCompleted(step.id) && <Check className="w-3 h-3" />}
            {index + 1}. {step.title}
          </button>
        ))}
      </div>
      
      {/* Conteúdo da Etapa Atual */}
      <div className="p-4 animate-fadeIn">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-xl font-medium text-[var(--color-foreground)]">{currentStep.title}</h4>
            {currentStep.estimatedTime && (
              <div className="flex items-center mt-1 text-sm text-[var(--color-text-light)]">
                <Clock className="w-4 h-4 mr-1" />
                Tempo estimado: {currentStep.estimatedTime}
              </div>
            )}
          </div>
          
          {/* Checkbox para marcar etapa como concluída */}
          <button 
            onClick={() => toggleStepCompletion(currentStep.id)}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-md ${
              isStepCompleted(currentStep.id)
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-light)]'
            }`}
          >
            {isStepCompleted(currentStep.id) ? (
              <>
                <Check className="w-4 h-4" />
                Concluído
              </>
            ) : (
              <>
                <Clipboard className="w-4 h-4" />
                Marcar como concluído
              </>
            )}
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-[var(--color-text)]">{currentStep.description}</p>
          
          {/* Imagem da etapa (se existir) */}
          {currentStep.imageUrl && (
            <div className="mt-4 rounded-lg overflow-hidden border border-[var(--color-border)]">
              <img 
                src={currentStep.imageUrl} 
                alt={`Ilustração para ${currentStep.title}`} 
                className="w-full h-auto"
                onError={(e) => {
                  e.currentTarget.src = '/placeholders/step-placeholder.jpg';
                }}
              />
            </div>
          )}
          
          {/* Dicas */}
          {currentStep.tips && currentStep.tips.length > 0 && (
            <div className="mt-4 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-lg p-3">
              <h5 className="font-medium text-[var(--color-primary)] flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                  <path d="M10 1a9 9 0 100 18 9 9 0 000-18zm-1 15a1 1 0 112 0 1 1 0 01-2 0zm1-1.75a.75.75 0 100-1.5.75.75 0 000 1.5zm.53-4.72a.5.5 0 01-.5.5h-.106a.5.5 0 01-.5-.5V6.522a.5.5 0 01.5-.5h.106a.5.5 0 01.5.5v3.257z" />
                </svg>
                Dicas úteis:
              </h5>
              <ul className="mt-2 space-y-2 text-sm">
                {currentStep.tips.map((tip, index) => (
                  <li key={index} className="flex">
                    <span className="text-[var(--color-primary)] mr-2">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Alertas */}
          {currentStep.warningText && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex">
                <AlertTriangle className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-amber-800">{currentStep.warningText}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Controles de Navegação */}
        <div className="flex justify-between mt-6 pt-4 border-t border-[var(--color-border)]">
          <button
            onClick={goToPreviousStep}
            disabled={currentStepIndex === 0}
            className={`flex items-center px-4 py-2 rounded-md ${
              currentStepIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-background)]'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Anterior
          </button>
          
          <button
            onClick={goToNextStep}
            disabled={currentStepIndex === totalSteps - 1}
            className={`flex items-center px-4 py-2 rounded-md ${
              currentStepIndex === totalSteps - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]'
            }`}
          >
            Próximo
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepByStepGuide; 