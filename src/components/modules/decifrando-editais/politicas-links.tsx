import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, FileText, BookOpen, Scale, Download, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Politica {
  id: string;
  titulo: string;
  descricao: string;
  link: string;
  tipo: 'lei' | 'decreto' | 'instrucao' | 'portaria' | 'manual';
  ano: number;
  relevancia: 'alta' | 'média' | 'baixa';
  tags: string[];
}

const politicas: Politica[] = [
  {
    id: 'lei-rouanet',
    titulo: 'Lei Rouanet (Lei nº 8.313/1991)',
    descricao: 'Institui o Programa Nacional de Apoio à Cultura (Pronac) e estabelece o principal mecanismo de incentivo fiscal à cultura no Brasil.',
    link: 'http://www.planalto.gov.br/ccivil_03/leis/l8313cons.htm',
    tipo: 'lei',
    ano: 1991,
    relevancia: 'alta',
    tags: ['incentivo fiscal', 'mecenato', 'pronac']
  },
  {
    id: 'lei-cultura-viva',
    titulo: 'Lei Cultura Viva (Lei nº 13.018/2014)',
    descricao: 'Institui a Política Nacional de Cultura Viva, com foco no fortalecimento de iniciativas culturais já desenvolvidas por comunidades.',
    link: 'http://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l13018.htm',
    tipo: 'lei',
    ano: 2014,
    relevancia: 'alta',
    tags: ['pontos de cultura', 'cultura comunitária']
  },
  {
    id: 'lei-aldir-blanc',
    titulo: 'Lei Aldir Blanc (Lei nº 14.017/2020)',
    descricao: 'Dispõe sobre ações emergenciais destinadas ao setor cultural durante o estado de calamidade pública reconhecido pelo Decreto Legislativo nº 6/2020.',
    link: 'http://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/L14017.htm',
    tipo: 'lei',
    ano: 2020,
    relevancia: 'alta',
    tags: ['emergencial', 'pandemia', 'auxílio']
  },
  {
    id: 'lei-paulo-gustavo',
    titulo: 'Lei Paulo Gustavo (Lei Complementar nº 195/2022)',
    descricao: 'Dispõe sobre apoio financeiro da União aos Estados, ao Distrito Federal e aos Municípios para ações do setor cultural.',
    link: 'http://www.planalto.gov.br/ccivil_03/leis/lcp/Lcp195.htm',
    tipo: 'lei',
    ano: 2022,
    relevancia: 'alta',
    tags: ['audiovisual', 'fomento', 'descentralização']
  },
  {
    id: 'pnc',
    titulo: 'Plano Nacional de Cultura (Lei nº 12.343/2010)',
    descricao: 'Estabelece o Plano Nacional de Cultura (PNC) e cria o Sistema Nacional de Informações e Indicadores Culturais (SNIIC).',
    link: 'http://www.planalto.gov.br/ccivil_03/_ato2007-2010/2010/lei/l12343.htm',
    tipo: 'lei',
    ano: 2010,
    relevancia: 'média',
    tags: ['planejamento', 'metas', 'indicadores']
  },
  {
    id: 'decreto-rouanet',
    titulo: 'Decreto nº 10.755/2021',
    descricao: 'Regulamenta a Lei nº 8.313/1991, estabelecendo sistemática de execução do Pronac.',
    link: 'http://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/decreto/D10755.htm',
    tipo: 'decreto',
    ano: 2021,
    relevancia: 'alta',
    tags: ['incentivo fiscal', 'regulamentação']
  },
  {
    id: 'instrucao-normativa',
    titulo: 'Instrução Normativa nº 2/2019',
    descricao: 'Estabelece procedimentos para apresentação, recebimento, análise, homologação, execução e prestação de contas de propostas culturais.',
    link: 'https://www.gov.br/cultura/pt-br/assuntos/apoio-a-projetos/instrucao-normativa-no-2-de-23-de-abril-de-2019',
    tipo: 'instrucao',
    ano: 2019,
    relevancia: 'média',
    tags: ['prestação de contas', 'execução', 'projetos']
  },
  {
    id: 'manual-prestacao',
    titulo: 'Manual de Prestação de Contas',
    descricao: 'Guia prático para elaboração da prestação de contas de projetos culturais financiados por recursos públicos.',
    link: 'https://www.gov.br/cultura/pt-br/assuntos/apoio-a-projetos/manual-de-prestacao-de-contas',
    tipo: 'manual',
    ano: 2023,
    relevancia: 'alta',
    tags: ['prestação de contas', 'comprovação', 'relatórios']
  },
  {
    id: 'portaria-captacao',
    titulo: 'Portaria nº 146/2022',
    descricao: 'Estabelece procedimentos para a captação de recursos incentivados e define limites para projetos culturais.',
    link: 'https://www.gov.br/cultura/pt-br/assuntos/apoio-a-projetos/portaria-no-146-de-2022',
    tipo: 'portaria',
    ano: 2022,
    relevancia: 'média',
    tags: ['captação', 'limites', 'incentivo']
  },
  {
    id: 'sistema-nacional',
    titulo: 'Sistema Nacional de Cultura (Emenda Constitucional nº 71/2012)',
    descricao: 'Acrescenta o art. 216-A à Constituição Federal para instituir o Sistema Nacional de Cultura.',
    link: 'http://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc71.htm',
    tipo: 'lei',
    ano: 2012,
    relevancia: 'média',
    tags: ['sistema', 'gestão', 'articulação']
  }
];

const tipoIcone = (tipo: string) => {
  switch (tipo) {
    case 'lei':
      return <Scale className="h-5 w-5 text-purple-500" />;
    case 'decreto':
      return <FileText className="h-5 w-5 text-blue-500" />;
    case 'instrucao':
      return <BookOpen className="h-5 w-5 text-green-500" />;
    case 'portaria':
      return <FileText className="h-5 w-5 text-amber-500" />;
    case 'manual':
      return <BookOpen className="h-5 w-5 text-red-500" />;
    default:
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
};

const tipoLabel = (tipo: string) => {
  switch (tipo) {
    case 'lei':
      return 'Lei';
    case 'decreto':
      return 'Decreto';
    case 'instrucao':
      return 'Instrução Normativa';
    case 'portaria':
      return 'Portaria';
    case 'manual':
      return 'Manual';
    default:
      return tipo;
  }
};

const relevanciaColor = (relevancia: string) => {
  switch (relevancia) {
    case 'alta':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'média':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'baixa':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const PoliticasLinks: React.FC = () => {
  const [filtro, setFiltro] = useState('');
  const [tipoAtivo, setTipoAtivo] = useState('todos');
  const [politicasFiltradas, setPoliticasFiltradas] = useState<Politica[]>(politicas);

  const handleFiltro = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setFiltro(valor);
    
    filtrarPoliticas(valor, tipoAtivo);
  };

  const handleTipoChange = (tipo: string) => {
    setTipoAtivo(tipo);
    filtrarPoliticas(filtro, tipo);
  };

  const filtrarPoliticas = (termo: string, tipo: string) => {
    let resultado = politicas;
    
    if (tipo !== 'todos') {
      resultado = resultado.filter(politica => politica.tipo === tipo);
    }
    
    if (termo) {
      const termoLower = termo.toLowerCase();
      resultado = resultado.filter(
        politica => 
          politica.titulo.toLowerCase().includes(termoLower) || 
          politica.descricao.toLowerCase().includes(termoLower) ||
          politica.tags.some(tag => tag.toLowerCase().includes(termoLower))
      );
    }
    
    setPoliticasFiltradas(resultado);
  };

  return (
    <div className="space-y-8">
      {/* Seção de Políticas */}
      <section>
        <h3 className="text-lg font-medium mb-4">Principais Políticas Públicas</h3>
        <div className="grid gap-4">
          {politicasFiltradas.map((politica) => (
            <motion.div
              key={politica.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {tipoIcone(politica.tipo)}
                      <Badge variant="outline">
                        {tipoLabel(politica.tipo)}
                      </Badge>
                      <Badge className={relevanciaColor(politica.relevancia)}>
                        {politica.relevancia === 'alta' ? 'Essencial' : 
                         politica.relevancia === 'média' ? 'Importante' : 'Complementar'}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {politica.ano}
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-2">{politica.titulo}</CardTitle>
                  <CardDescription className="mt-1">
                    {politica.descricao}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-1 mt-2">
                    {politica.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3.5 w-3.5" />
                    PDF
                  </Button>
                  <Button size="sm" className="gap-1" asChild>
                    <a href={politica.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5" />
                      Acessar
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Seção de Órgãos */}
      <section>
        <h3 className="text-lg font-medium mb-4">Órgãos e Instituições Importantes</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {orgaos.map((orgao) => (
            <Card key={orgao.nome} className="p-4">
              <h4 className="font-medium">{orgao.nome}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {orgao.descricao}
              </p>
              <Button
                variant="link"
                className="mt-2 h-auto p-0"
                onClick={() => window.open(orgao.link, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Visitar site
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
        <p className="text-sm text-blue-700">
          <strong>Dica:</strong> Ao elaborar seu projeto, mencione como ele se
          alinha com estas políticas públicas. Isso demonstra que você conhece o
          contexto e fortalece sua proposta.
        </p>
      </div>
    </div>
  );
};

export default PoliticasLinks;
