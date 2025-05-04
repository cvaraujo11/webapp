import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, PenLine, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProjectSection {
  title: string;
  description: string;
  tips: string[];
  example: string;
}

interface ProjectStructureProps {
  sections: ProjectSection[];
}

export const ProjectStructure = ({ sections }: ProjectStructureProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showingExample, setShowingExample] = useState(false);

  const toggleSection = (title: string) => {
    if (expandedSection === title) {
      setExpandedSection(null);
      setShowingExample(false);
    } else {
      setExpandedSection(title);
      setShowingExample(false);
    }
  };

  const toggleExample = () => {
    setShowingExample(!showingExample);
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-700">
          Clique em cada seção para ver dicas e exemplos de como estruturar seu projeto.
          Você pode usar os exemplos como inspiração, adaptando-os à realidade da sua comunidade.
        </p>
      </div>

      {sections.map((section) => (
        <Card
          key={section.title}
          className="overflow-hidden"
        >
          <button
            onClick={() => toggleSection(section.title)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <PenLine className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            </div>
            {expandedSection === section.title ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          <AnimatePresence>
            {expandedSection === section.title && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="border-t p-4 bg-muted/10">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Dicas:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {section.tips.map((tip, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Exemplo:</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggleExample}
                          className="text-xs"
                        >
                          {showingExample ? "Ocultar" : "Ver exemplo"}
                        </Button>
                      </div>

                      <AnimatePresence>
                        {showingExample && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ScrollArea className="h-[200px] mt-2">
                              <div className="p-3 bg-muted rounded-md">
                                <pre className="text-sm whitespace-pre-wrap font-sans">
                                  {section.example}
                                </pre>
                              </div>
                            </ScrollArea>

                            <div className="mt-2 flex justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs gap-1"
                              >
                                <Download className="h-3 w-3" />
                                Baixar modelo
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
    </div>
  );
};