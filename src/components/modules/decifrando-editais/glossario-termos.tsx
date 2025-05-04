import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, X, ChevronDown, ChevronUp, Bookmark } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Termo {
  id: string;
  termo: string;
  definicao: string;
  exemplo?: string;
  categoria: string;
  favorito?: boolean;
}

const termos: Termo[] = [
  {
    id: 'objeto',
    termo: 'Objeto',
    definicao: 'Descrição sucinta do propósito e finalidade do edital, indicando o que será financiado ou apoiado.',
    exemplo: 'Objeto: Seleção de projetos culturais que promovam a diversidade cultural brasileira.',
    categoria: 'Estrutura do Edital'
  },
  {
    id: 'proponente',
    termo: 'Proponente',
    definicao: 'Pessoa física ou jurídica responsável pela apresentação e execução do projeto cultural.',
    exemplo: 'O proponente deverá comprovar atuação na área cultural por pelo menos 2 anos.',
    categoria: 'Participantes'
  },
  {
    id: 'contrapartida',
    termo: 'Contrapartida',
    definicao: 'Ação, serviço ou bem que o proponente oferece em retribuição ao apoio recebido, podendo ser financeira ou não-financeira.',
    exemplo: 'Como contrapartida, o projeto deverá realizar 2 oficinas gratuitas para a comunidade local.',
    categoria: 'Financeiro'
  },
  {
    id: 'rubrica',
    termo: 'Rubrica',
    definicao: 'Cada item específico de despesa previsto no orçamento de um projeto cultural.',
    exemplo: 'A rubrica "Direção Artística" não poderá ultrapassar 20% do valor total do projeto.',
    categoria: 'Financeiro'
  },
  {
    id: 'cnpj',
    termo: 'CNPJ Cultural',
    definicao: 'Cadastro Nacional de Pessoa Jurídica específico para entidades culturais, que comprova a regularidade fiscal da organização.',
    exemplo: 'É necessário apresentar CNPJ ativo com atividade cultural como principal ou secundária.',
    categoria: 'Documentação'
  },
  {
    id: 'habilitacao',
    termo: 'Habilitação',
    definicao: 'Fase inicial de análise documental que verifica se o proponente atende aos requisitos formais do edital.',
    exemplo: 'Apenas os projetos habilitados seguirão para a fase de avaliação técnica.',
    categoria: 'Processo Seletivo'
  },
  {
    id: 'comissao',
    termo: 'Comissão de Seleção',
    definicao: 'Grupo de especialistas designados para avaliar e selecionar os projetos inscritos no edital.',
    exemplo: 'A Comissão de Seleção será composta por 5 membros com notório saber na área cultural.',
    categoria: 'Processo Seletivo'
  },
  {
    id: 'diligencia',
    termo: 'Diligência',
    definicao: 'Solicitação de esclarecimentos ou documentos complementares durante o processo de análise de um projeto.',
    exemplo: 'O proponente terá 5 dias úteis para responder à diligência enviada pela comissão.',
    categoria: 'Processo Seletivo'
  },
  {
    id: 'readequacao',
    termo: 'Readequação Orçamentária',
    definicao: 'Ajuste no orçamento do projeto após sua aprovação, geralmente quando o valor aprovado é menor que o solicitado.',
    exemplo: 'Após a aprovação parcial do valor, o proponente deverá apresentar readequação orçamentária em até 10 dias.',
    categoria: 'Financeiro'
  },
  {
    id: 'captacao',
    termo: 'Captação de Recursos',
    definicao: 'Processo de obtenção de recursos financeiros junto a patrocinadores para execução de projetos aprovados em mecanismos de incentivo fiscal.',
    exemplo: 'O proponente terá 12 meses para realizar a captação de recursos após a aprovação do projeto.',
    categoria: 'Financeiro'
  },
  {
    id: 'prestacao',
    termo: 'Prestação de Contas',
    definicao: 'Processo de comprovação da execução física e financeira do projeto, demonstrando a correta aplicação dos recursos recebidos.',
    exemplo: 'A prestação de contas deverá ser apresentada até 60 dias após o término da execução do projeto.',
    categoria: 'Financeiro'
  },
  {
    id: 'interveniente',
    termo: 'Interveniente',
    definicao: 'Pessoa física ou jurídica que participa do projeto apoiando sua execução, sem ser o proponente principal.',
    exemplo: 'A universidade atuará como interveniente, cedendo espaço para as oficinas do projeto.',
    categoria: 'Participantes'
  }
];

const categorias = [
  'Todas',
  'Estrutura do Edital',
  'Participantes',
  'Financeiro',
  'Documentação',
  'Processo Seletivo'
];

const GlossarioTermos: React.FC = () => {
  const [filtro, setFiltro] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  const [termosFavoritos, setTermosFavoritos] = useState<string[]>([]);
  const [termosFiltrados, setTermosFiltrados] = useState<Termo[]>(termos);
  const [termoSelecionado, setTermoSelecionado] = useState<Termo | null>(null);
  const [dialogAberto, setDialogAberto] = useState(false);

  useEffect(() => {
    let resultado = termos;
    
    if (categoriaAtiva !== 'Todas') {
      resultado = resultado.filter(termo => termo.categoria === categoriaAtiva);
    }
    
    if (filtro) {
      const termoLower = filtro.toLowerCase();
      resultado = resultado.filter(
        termo => 
          termo.termo.toLowerCase().includes(termoLower) || 
          termo.definicao.toLowerCase().includes(termoLower)
      );
    }
    
    // Adicionar propriedade favorito aos termos
    resultado = resultado.map(termo => ({
      ...termo,
      favorito: termosFavoritos.includes(termo.id)
    }));
    
    setTermosFiltrados(resultado);
  }, [filtro, categoriaAtiva, termosFavoritos]);

  const toggleFavorito = (id: string) => {
    if (termosFavoritos.includes(id)) {
      setTermosFavoritos(termosFavoritos.filter(termoId => termoId !== id));
    } else {
      setTermosFavoritos([...termosFavoritos, id]);
    }
  };

  const abrirDetalhes = (termo: Termo) => {
    setTermoSelecionado(termo);
    setDialogAberto(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar termo..."
            className="pl-10"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categorias.map(categoria => (
          <Badge
            key={categoria}
            variant={categoriaAtiva === categoria ? "default" : "outline"}
            className={`cursor-pointer ${
              categoriaAtiva === categoria ? "" : "hover:bg-muted"
            }`}
            onClick={() => setCategoriaAtiva(categoria)}
          >
            {categoria}
          </Badge>
        ))}
      </div>

      {termosFiltrados.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>Nenhum termo encontrado com os filtros atuais</p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="space-y-2">
          <AnimatePresence>
            {termosFiltrados.map((termo) => (
              <motion.div
                key={termo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
              >
                <AccordionItem
                  value={termo.id}
                  className={`border rounded-lg overflow-hidden ${
                    termo.favorito ? "border-amber-200 bg-amber-50/50" : "bg-white"
                  }`}
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <div className="font-medium text-left">{termo.termo}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="mr-2">
                          {termo.categoria}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorito(termo.id);
                          }}
                        >
                          <Bookmark
                            className={`h-4 w-4 ${
                              termo.favorito
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        </Button>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="text-muted-foreground">
                      <p>{termo.definicao}</p>
                      
                      {termo.exemplo && (
                        <div className="mt-2 p-3 bg-muted/30 rounded-md">
                          <div className="text-xs text-muted-foreground mb-1">Exemplo:</div>
                          <div className="text-sm italic">{termo.exemplo}</div>
                        </div>
                      )}
                      
                      <div className="mt-3 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => abrirDetalhes(termo)}
                        >
                          Ver detalhes
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </Accordion>
      )}

      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent className="sm:max-w-[500px]">
          {termoSelecionado && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{termoSelecionado.termo}</span>
                  <Badge>{termoSelecionado.categoria}</Badge>
                </DialogTitle>
                <DialogDescription>
                  Detalhes e contexto sobre este termo
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-2">
                <div>
                  <h4 className="text-sm font-medium mb-1">Definição</h4>
                  <p className="text-muted-foreground">{termoSelecionado.definicao}</p>
                </div>
                
                {termoSelecionado.exemplo && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Exemplo em Editais</h4>
                    <div className="p-3 bg-muted/30 rounded-md">
                      <p className="text-sm italic">{termoSelecionado.exemplo}</p>
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Dicas de Aplicação</h4>
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                    <p className="text-sm text-blue-700">
                      {termoSelecionado.id === 'objeto' && 
                        "Ao ler o objeto do edital, identifique as palavras-chave que definem o escopo do financiamento. Seu projeto deve estar claramente alinhado com este propósito."}
                      {termoSelecionado.id === 'proponente' && 
                        "Verifique cuidadosamente os requisitos para proponentes, incluindo documentação necessária e tempo mínimo de atuação na área cultural."}
                      {termoSelecionado.id === 'contrapartida' && 
                        "Planeje contrapartidas que sejam viáveis e que agreguem valor social ao seu projeto. Contrapartidas bem elaboradas podem diferenciar sua proposta."}
                      {termoSelecionado.id === 'rubrica' && 
                        "Distribua adequadamente os valores entre as rubricas, respeitando os limites percentuais estabelecidos no edital para cada tipo de despesa."}
                      {termoSelecionado.id === 'cnpj' && 
                        "Certifique-se de que seu CNPJ está ativo e possui atividades culturais listadas. Muitos projetos são desclassificados por irregularidades no CNPJ."}
                      {termoSelecionado.id === 'habilitacao' && 
                        "Organize toda a documentação exigida antes de iniciar a inscrição. Use um checklist para garantir que nenhum documento seja esquecido."}
                      {termoSelecionado.id === 'comissao' && 
                        "Ao elaborar seu projeto, considere os critérios que serão avaliados pela comissão de seleção. Destaque os pontos que serão mais valorizados."}
                      {termoSelecionado.id === 'diligencia' && 
                        "Fique atento aos canais de comunicação informados no edital para não perder prazos de resposta a diligências."}
                      {termoSelecionado.id === 'readequacao' && 
                        "Na readequação orçamentária, priorize as atividades essenciais do projeto e mantenha a proporcionalidade entre as rubricas."}
                      {termoSelecionado.id === 'captacao' && 
                        "Desenvolva um plano de captação com antecedência, identificando potenciais patrocinadores alinhados com a temática do seu projeto."}
                      {termoSelecionado.id === 'prestacao' && 
                        "Mantenha organizada toda a documentação financeira desde o início do projeto. Guarde notas fiscais, recibos e comprovantes de pagamento."}
                      {termoSelecionado.id === 'interveniente' && 
                        "Formalize parcerias com intervenientes através de cartas de anuência ou termos de cooperação, detalhando as responsabilidades de cada parte."}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => toggleFavorito(termoSelecionado.id)}
                  >
                    <Bookmark className={`h-4 w-4 ${termoSelecionado.favorito ? "fill-primary" : ""}`} />
                    {termoSelecionado.favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GlossarioTermos;
