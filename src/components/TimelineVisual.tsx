import React, { useState } from 'react';
import { CalendarDays, ChevronRight, ChevronLeft, FileText, ExternalLink } from 'lucide-react';

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  link?: string;
  linkLabel?: string;
  category: 'ambiental' | 'social' | 'cultural' | 'territorial' | 'economica';
}

interface TimelineVisualProps {
  events: TimelineEvent[];
  title?: string;
  description?: string;
}

const CategoryColors = {
  ambiental: {
    bg: 'bg-green-500',
    light: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-200'
  },
  social: {
    bg: 'bg-blue-500',
    light: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200'
  },
  cultural: {
    bg: 'bg-purple-500',
    light: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-200'
  },
  territorial: {
    bg: 'bg-amber-500',
    light: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-200'
  },
  economica: {
    bg: 'bg-red-500',
    light: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-200'
  }
};

const TimelineVisual: React.FC<TimelineVisualProps> = ({ 
  events,
  title = "Linha do Tempo: Políticas Públicas Relevantes",
  description = "Conheça as principais políticas públicas para comunidades tradicionais ao longo do tempo"
}) => {
  const [activeEvent, setActiveEvent] = useState<string>(events[0]?.id || '');
  const [filter, setFilter] = useState<string | null>(null);
  
  // Ordenar eventos por ano
  const sortedEvents = [...events].sort((a, b) => parseInt(a.year) - parseInt(b.year));
  
  // Aplicar filtro de categoria, se houver
  const filteredEvents = filter 
    ? sortedEvents.filter(event => event.category === filter)
    : sortedEvents;
  
  const currentEventIndex = filteredEvents.findIndex(event => event.id === activeEvent);
  const currentEvent = filteredEvents[currentEventIndex];
  
  const navigatePrev = () => {
    if (currentEventIndex > 0) {
      setActiveEvent(filteredEvents[currentEventIndex - 1].id);
    }
  };
  
  const navigateNext = () => {
    if (currentEventIndex < filteredEvents.length - 1) {
      setActiveEvent(filteredEvents[currentEventIndex + 1].id);
    }
  };
  
  // Ajustar posição visual na timeline
  const calculatePosition = (index: number) => {
    const totalEvents = filteredEvents.length;
    // Garantir que o primeiro item esteja no início e o último no fim
    return index === 0 ? 0 : index === totalEvents - 1 ? 100 : (index / (totalEvents - 1)) * 100;
  };
  
  return (
    <div className="border border-[var(--color-border)] rounded-lg overflow-hidden bg-white">
      {/* Cabeçalho */}
      <div className="p-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="flex items-center mb-2">
          <CalendarDays className="w-5 h-5 text-[var(--color-primary)] mr-2" />
          <h3 className="text-lg font-medium text-[var(--color-foreground)]">{title}</h3>
        </div>
        <p className="text-sm text-[var(--color-text-light)]">{description}</p>
        
        {/* Filtros de categoria */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button 
            onClick={() => setFilter(null)}
            className={`px-2 py-1 text-xs rounded-full transition-colors ${
              filter === null 
                ? 'bg-gray-200 text-gray-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todas
          </button>
          {Object.keys(CategoryColors).map(category => (
            <button 
              key={category}
              onClick={() => setFilter(category as any)}
              className={`px-2 py-1 text-xs rounded-full transition-colors ${
                filter === category 
                  ? `${CategoryColors[category as keyof typeof CategoryColors].bg} text-white` 
                  : `${CategoryColors[category as keyof typeof CategoryColors].light} ${CategoryColors[category as keyof typeof CategoryColors].text} hover:saturate-150`
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Timeline Visual */}
      <div className="p-6 relative">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-8 text-[var(--color-text-light)]">
            Nenhum evento encontrado para este filtro.
          </div>
        ) : (
          <>
            {/* Linha da Timeline */}
            <div className="h-1 bg-gray-200 rounded w-full relative my-6">
              {filteredEvents.map((event, index) => (
                <button
                  key={event.id}
                  onClick={() => setActiveEvent(event.id)}
                  className={`absolute transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 transition-all 
                  ${event.id === activeEvent 
                    ? `${CategoryColors[event.category].bg} border-white scale-125` 
                    : `${CategoryColors[event.category].light} ${CategoryColors[event.category].border} hover:scale-110`
                  }`}
                  style={{ left: `${calculatePosition(index)}%`, top: '50%' }}
                  aria-label={`Ver evento de ${event.year}: ${event.title}`}
                >
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                    {event.year}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Card do Evento Atual */}
            {currentEvent && (
              <div className={`mt-12 p-4 rounded-lg border ${CategoryColors[currentEvent.category].border} ${CategoryColors[currentEvent.category].light} animate-fadeIn`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${CategoryColors[currentEvent.category].bg} text-white mb-2`}>
                      {currentEvent.category.charAt(0).toUpperCase() + currentEvent.category.slice(1)}
                    </span>
                    <h4 className="text-lg font-medium text-[var(--color-foreground)]">{currentEvent.title}</h4>
                  </div>
                  <span className={`text-2xl font-bold ${CategoryColors[currentEvent.category].text}`}>
                    {currentEvent.year}
                  </span>
                </div>
                
                <p className="text-sm text-[var(--color-text)]">{currentEvent.description}</p>
                
                {currentEvent.link && (
                  <a 
                    href={currentEvent.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-flex items-center mt-3 text-sm ${CategoryColors[currentEvent.category].text} hover:underline`}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    {currentEvent.linkLabel || "Saiba mais"}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
                
                {/* Navegação entre eventos */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={navigatePrev}
                    disabled={currentEventIndex === 0}
                    className={`flex items-center px-2 py-1 text-sm rounded
                    ${currentEventIndex === 0 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : `${CategoryColors[currentEvent.category].text} hover:underline`
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Anterior
                  </button>
                  
                  <button
                    onClick={navigateNext}
                    disabled={currentEventIndex === filteredEvents.length - 1}
                    className={`flex items-center px-2 py-1 text-sm rounded
                    ${currentEventIndex === filteredEvents.length - 1
                      ? 'text-gray-400 cursor-not-allowed' 
                      : `${CategoryColors[currentEvent.category].text} hover:underline`
                    }`}
                  >
                    Próximo
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TimelineVisual; 