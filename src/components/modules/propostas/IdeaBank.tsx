import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Tag, Users, Calendar, Target } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const projectIdeas = [
  {
    id: 1,
    title: 'Horta Comunitária Sustentável',
    description: 'Implementação de horta comunitária com técnicas agroecológicas para produção de alimentos orgânicos.',
    category: 'Agricultura',
    beneficiaries: '20 famílias',
    duration: '12 meses',
    tags: ['agricultura familiar', 'agroecologia', 'segurança alimentar'],
    objectives: [
      'Produzir alimentos orgânicos para consumo local',
      'Capacitar moradores em técnicas agroecológicas',
      'Gerar renda através da venda do excedente'
    ]
  },
  {
    id: 2,
    title: 'Oficina de Arte e Memória',
    description: 'Resgate e valorização das tradições culturais através de oficinas de arte com jovens e idosos.',
    category: 'Cultura',
    beneficiaries: '30 participantes',
    duration: '6 meses',
    tags: ['cultura tradicional', 'artesanato', 'memória'],
    objectives: [
      'Preservar técnicas artesanais tradicionais',
      'Promover diálogo intergeracional',
      'Criar exposição com obras produzidas'
    ]
  },
  {
    id: 3,
    title: 'Casa de Farinha Coletiva',
    description: 'Modernização da casa de farinha comunitária para melhorar a produção e comercialização.',
    category: 'Infraestrutura',
    beneficiaries: '15 famílias',
    duration: '8 meses',
    tags: ['produção tradicional', 'geração de renda', 'segurança alimentar'],
    objectives: [
      'Melhorar condições de produção',
      'Aumentar capacidade produtiva',
      'Adequar às normas sanitárias'
    ]
  },
  {
    id: 4,
    title: 'Turismo de Base Comunitária',
    description: 'Desenvolvimento de roteiros turísticos que valorizem a cultura e natureza local.',
    category: 'Turismo',
    beneficiaries: 'Comunidade geral',
    duration: '18 meses',
    tags: ['turismo sustentável', 'cultura local', 'meio ambiente'],
    objectives: [
      'Criar roteiros turísticos sustentáveis',
      'Capacitar guias locais',
      'Estruturar hospedagem familiar'
    ]
  }
];

const categories = ['Todos', 'Agricultura', 'Cultura', 'Infraestrutura', 'Turismo'];

export const IdeaBank = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedIdea, setSelectedIdea] = useState<number | null>(null);

  const filteredIdeas = projectIdeas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(search.toLowerCase()) ||
                         idea.description.toLowerCase().includes(search.toLowerCase()) ||
                         idea.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory = activeCategory === 'Todos' || idea.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Cabeçalho com busca e filtros */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Buscar ideias de projeto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="Todos" className="w-full">
          <TabsList className="grid grid-cols-2 sm:grid-cols-5">
            {categories.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
                className="text-sm"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Lista de ideias */}
      <div className="grid gap-4">
        <AnimatePresence>
          {filteredIdeas.map(idea => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium">{idea.title}</h3>
                      <Badge variant="secondary">{idea.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {idea.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {idea.beneficiaries}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {idea.duration}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {idea.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <AnimatePresence>
                    {selectedIdea === idea.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <div className="pt-4 border-t">
                          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Objetivos
                          </h4>
                          <ul className="list-disc list-inside space-y-1">
                            {idea.objectives.map((objective, index) => (
                              <li key={index} className="text-sm text-muted-foreground">
                                {objective}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedIdea(selectedIdea === idea.id ? null : idea.id)}
                    className="w-full"
                  >
                    {selectedIdea === idea.id ? "Ocultar detalhes" : "Ver objetivos"}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredIdeas.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhuma ideia encontrada com os filtros atuais</p>
          </div>
        )}
      </div>
    </div>
  );
};