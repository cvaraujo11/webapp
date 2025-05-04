import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, HelpCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ChecklistItem {
  id: string;
  label: string;
  tip: string;
}

interface ChecklistCategory {
  category: string;
  items: ChecklistItem[];
}

interface SubmissionChecklistProps {
  items: ChecklistCategory[];
}

export const SubmissionChecklist = ({ items }: SubmissionChecklistProps) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(items[0]?.category || null);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const calculateProgress = () => {
    const totalItems = items.reduce((acc, category) => acc + category.items.length, 0);
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    return (checkedCount / totalItems) * 100;
  };

  const resetChecklist = () => {
    setCheckedItems({});
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Progresso geral: {Math.round(calculateProgress())}%
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetChecklist}
            className="text-xs"
          >
            Recomeçar
          </Button>
        </div>
        <Progress value={calculateProgress()} className="h-2" />
      </div>

      <div className="grid gap-6">
        {items.map((category) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`p-4 rounded-lg border ${
                activeCategory === category.category
                  ? "bg-primary/5 border-primary/20"
                  : "bg-white"
              }`}
            >
              <button
                onClick={() => setActiveCategory(
                  activeCategory === category.category ? null : category.category
                )}
                className="w-full text-left"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{category.category}</h3>
                  <div className="text-sm text-muted-foreground">
                    {category.items.filter(item => checkedItems[item.id]).length}/
                    {category.items.length} concluídos
                  </div>
                </div>
              </button>

              {activeCategory === category.category && (
                <div className="mt-4 space-y-3">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-2 rounded hover:bg-muted/50"
                    >
                      <button
                        onClick={() => toggleItem(item.id)}
                        className={`flex items-center justify-center w-5 h-5 rounded border ${
                          checkedItems[item.id]
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-input"
                        }`}
                      >
                        {checkedItems[item.id] && (
                          <CheckSquare className="h-4 w-4" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{item.label}</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-4 w-4 text-muted-foreground"
                                >
                                  <HelpCircle className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs max-w-xs">{item.tip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};