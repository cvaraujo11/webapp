import React, { useState } from 'react';
import { Lightbulb, ChevronLeft, ChevronRight, Tag, MapPin } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location?: string;
  tags: string[];
  fullDescription?: string;
}

interface ProjectGalleryProps {
  projects: ProjectItem[];
  title?: string;
  description?: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects,
  title = "Banco de Ideias Inspiradoras",
  description = "Conheça projetos que podem inspirar sua própria iniciativa"
}) => {
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  
  // Obter todas as tags únicas para filtros
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));
  
  // Filtrar projetos por tag (se necessário)
  const filteredProjects = filterTag 
    ? projects.filter(project => project.tags.includes(filterTag))
    : projects;
  
  // Projeto para exibição detalhada
  const selectedProject = currentProjectId 
    ? projects.find(p => p.id === currentProjectId)
    : null;
  
  return (
    <div className="border border-[var(--color-border)] rounded-lg overflow-hidden bg-white">
      {/* Cabeçalho */}
      <div className="p-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="flex items-center mb-2">
          <Lightbulb className="w-5 h-5 text-[var(--color-primary)] mr-2" />
          <h3 className="text-lg font-medium text-[var(--color-foreground)]">{title}</h3>
        </div>
        <p className="text-sm text-[var(--color-text-light)]">{description}</p>
        
        {/* Filtros por tag */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => setFilterTag(null)}
            className={`px-2 py-1 text-xs rounded-full transition-colors ${
              filterTag === null 
                ? 'bg-[var(--color-primary)] text-white' 
                : 'bg-[var(--color-surface)] text-[var(--color-text-light)] border border-[var(--color-border)] hover:bg-[var(--color-background)]'
            }`}
          >
            Todas
          </button>
          
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-2 py-1 text-xs rounded-full transition-colors ${
                filterTag === tag 
                  ? 'bg-[var(--color-primary)] text-white' 
                  : 'bg-[var(--color-surface)] text-[var(--color-text-light)] border border-[var(--color-border)] hover:bg-[var(--color-background)]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {/* Galeria de Projetos */}
      <div className="p-4">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-8 text-[var(--color-text-light)]">
            Nenhum projeto encontrado para este filtro.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProjects.map(project => (
              <div 
                key={project.id}
                className="border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setCurrentProjectId(project.id)}
              >
                <div 
                  className="h-40 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${project.imageUrl})`,
                    backgroundImage: `url(${project.imageUrl}), url(/placeholders/project-placeholder.jpg)`
                  }}
                ></div>
                <div className="p-3">
                  <h4 className="font-medium text-[var(--color-foreground)] line-clamp-1">{project.title}</h4>
                  
                  {project.location && (
                    <div className="flex items-center mt-1 text-xs text-[var(--color-text-light)]">
                      <MapPin className="w-3 h-3 mr-1" />
                      {project.location}
                    </div>
                  )}
                  
                  <p className="mt-1 text-sm text-[var(--color-text-light)] line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 text-xs bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Modal de Detalhes do Projeto */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-fadeIn">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="relative h-48 md:h-64 bg-cover bg-center" 
              style={{ backgroundImage: `url(${selectedProject.imageUrl})` }}
            >
              <button 
                onClick={() => setCurrentProjectId(null)}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70 transition-colors"
                aria-label="Fechar detalhes"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-xl font-medium">{selectedProject.title}</h3>
                {selectedProject.location && (
                  <div className="flex items-center mt-1 text-white/80">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedProject.location}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              <div className="flex flex-wrap gap-1 mb-4">
                {selectedProject.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full">
                    <Tag className="w-3 h-3 inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="text-[var(--color-text)]">
                {selectedProject.fullDescription || selectedProject.description}
              </p>
              
              <div className="mt-6 bg-[var(--color-background)] p-4 rounded-lg">
                <h4 className="font-medium text-[var(--color-foreground)]">Como adaptar para sua realidade</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex">
                    <span className="text-[var(--color-primary)] mr-2">•</span>
                    <span>Identifique os recursos disponíveis na sua comunidade</span>
                  </li>
                  <li className="flex">
                    <span className="text-[var(--color-primary)] mr-2">•</span>
                    <span>Adapte a escala conforme o número de participantes</span>
                  </li>
                  <li className="flex">
                    <span className="text-[var(--color-primary)] mr-2">•</span>
                    <span>Considere as necessidades específicas da sua região</span>
                  </li>
                  <li className="flex">
                    <span className="text-[var(--color-primary)] mr-2">•</span>
                    <span>Busque parcerias locais para fortalecer a iniciativa</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 border-t border-[var(--color-border)] flex justify-end">
              <button
                onClick={() => setCurrentProjectId(null)}
                className="px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md text-sm font-medium hover:bg-[var(--color-background)] transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery; 