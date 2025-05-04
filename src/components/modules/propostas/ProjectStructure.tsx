import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

interface ProjectSection {
  title: string;
  description: string;
  tips: string[];
  template: string;
}

interface ProjectStructureProps {
  sections: ProjectSection[];
}

export function ProjectStructure({ sections }: ProjectStructureProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div 
          key={section.title}
          className="border border-[var(--color-border)] rounded-lg overflow-hidden"
        >
          <button
            onClick={() => setExpandedSection(expandedSection === section.title ? null : section.title)}
            className="w-full flex items-center justify-between p-4 bg-[var(--color-surface)] hover:bg-[var(--color-surface)]/80 transition-colors"
          >
            <div className="flex items-center">
              <span className="font-medium">{section.title}</span>
              {expandedSection === section.title ? 
                <ChevronUp className="h-4 w-4 ml-2" /> : 
                <ChevronDown className="h-4 w-4 ml-2" />
              }
            </div>
            <div className="text-xs text-[var(--color-primary)]">
              {expandedSection === section.title ? 'Recolher' : 'Expandir'}
            </div>
          </button>

          {expandedSection === section.title && (
            <div className="p-4 space-y-4 animate-slideDown">
              <p className="text-[var(--color-text)]">{section.description}</p>

              {/* Dicas */}
              <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-md p-3">
                <div className="flex items-start">
                  <Info className="w-4 h-4 text-[var(--color-primary)] mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-[var(--color-primary)] mb-2">Dicas:</h4>
                    <ul className="space-y-1 text-sm text-[var(--color-text)]">
                      {section.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[var(--color-primary)] mr-2">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Modelo */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-3">
                <h4 className="font-medium text-[var(--color-foreground)] mb-2">Modelo:</h4>
                <pre className="text-sm text-[var(--color-text)] whitespace-pre-wrap">{section.template}</pre>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}