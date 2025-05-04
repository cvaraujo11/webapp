import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight } from 'lucide-react';

interface WritingExample {
  before: string;
  after: string;
  tips: string[];
}

interface WritingGuideProps {
  examples: WritingExample[];
}

export const WritingGuide = ({ examples }: WritingGuideProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Dicas de Escrita</h3>
            <p className="text-sm text-amber-700 mt-1">
              Compare os exemplos abaixo e veja como melhorar a escrita do seu projeto.
              Use uma linguagem profissional, mas mantenha a clareza.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {examples.map((example, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-red-600">Evite</h4>
                <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                  <p className="text-sm text-red-700">{example.before}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-green-600">Prefira</h4>
                <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                  <p className="text-sm text-green-700">{example.after}</p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="text-sm font-medium mb-2">Por que é melhor?</h5>
              <ul className="grid gap-2">
                {example.tips.map((tip, tipIndex) => (
                  <li
                    key={tipIndex}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <ArrowRight className="h-4 w-4 mt-0.5 text-primary" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};