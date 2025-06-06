import React, { useState } from 'react';
import { SendIcon, RefreshCwIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [conversation, setConversation] = useState<{type: 'user' | 'ai'; text: string}[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Adiciona a pergunta do usuário à conversa
    const newConversation = [...conversation, {type: 'user', text: question}];
    setConversation(newConversation);
    
    // Simula o processamento da IA
    setIsLoading(true);
    
    setTimeout(() => {
      // Respostas simuladas baseadas em palavras-chave na pergunta
      let aiResponse = '';
      const lowerQuestion = question.toLowerCase();
      
      if (lowerQuestion.includes('edital') || lowerQuestion.includes('financiamento')) {
        aiResponse = 'Os editais mais recentes de financiamento cultural estão disponíveis no módulo "Decifrando Editais". Recomendo verificar os editais da Lei Paulo Gustavo e do Fundo Nacional de Cultura que estão com inscrições abertas até o final do mês.';
      } else if (lowerQuestion.includes('orçamento') || lowerQuestion.includes('planilha')) {
        aiResponse = 'Para elaborar um orçamento eficiente, utilize nosso modelo de planilha disponível no módulo "Ferramentas". Lembre-se de incluir todas as etapas do projeto, prever contingências e justificar os valores solicitados.';
      } else if (lowerQuestion.includes('projeto') || lowerQuestion.includes('proposta')) {
        aiResponse = 'Para desenvolver uma proposta competitiva, estruture seu projeto com objetivos claros, justificativa convincente, metodologia detalhada e resultados mensuráveis. Consulte os exemplos de projetos aprovados no módulo "Elaborando Propostas".';
      } else {
        aiResponse = 'Posso ajudar com informações sobre editais culturais, elaboração de projetos, orçamentos, cronogramas e estratégias de submissão. Por favor, especifique sua dúvida para que eu possa fornecer orientações mais precisas.';
      }
      
      // Adiciona a resposta da IA à conversa
      setConversation([...newConversation, {type: 'ai', text: aiResponse}]);
      setResponse(aiResponse);
      setIsLoading(false);
      setQuestion('');
    }, 1500);
  };

  const resetConversation = () => {
    setConversation([]);
    setResponse(null);
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4">
      <div className="mb-4 min-h-[200px] max-h-[300px] overflow-y-auto">
        {conversation.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px] text-center text-muted-foreground">
            <Sparkles className="h-8 w-8 mb-2 text-amber-400" />
            <p>Assistente IA pronto para responder suas dúvidas sobre editais e projetos culturais</p>
            <p className="text-sm mt-2">Experimente perguntar sobre editais abertos, dicas para elaboração de projetos ou estratégias de orçamento</p>
          </div>
        ) : (
          <AnimatePresence>
            {conversation.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-3 p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-primary-50 text-primary-900 ml-6' 
                    : 'bg-muted/30 mr-6'
                }`}
              >
                <div className="text-sm font-medium mb-1">
                  {message.type === 'user' ? 'Você' : 'Assistente IA'}
                </div>
                <div>{message.text}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-pulse flex space-x-2">
              <div className="h-2 w-2 bg-amber-400 rounded-full"></div>
              <div className="h-2 w-2 bg-amber-400 rounded-full"></div>
              <div className="h-2 w-2 bg-amber-400 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <Textarea
          placeholder="Digite sua pergunta sobre editais, projetos, orçamentos..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="min-h-[80px]"
        />
        
        <div className="flex justify-between">
          {conversation.length > 0 && (
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={resetConversation}
              className="gap-1"
            >
              <RefreshCwIcon className="h-3.5 w-3.5" />
              Nova Conversa
            </Button>
          )}
          
          <Button 
            type="submit" 
            size="sm" 
            disabled={!question.trim() || isLoading}
            className="gap-1 ml-auto"
          >
            <SendIcon className="h-3.5 w-3.5" />
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AIAssistant;
