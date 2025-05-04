import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, Bookmark, Share2, Eye, EyeOff, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SecaoEdital {
  id: string;
  titulo: string;
  conteudo: string;
  destaque: boolean;
}

interface Edital {
  titulo: string;
  numero: string;
  orgao: string;
  dataPublicacao: string;
  dataEncerramento: string;
  valorTotal: string;
  secoes: SecaoEdital[];
}

interface EditalViewerProps {
  edital: Edital;
}

const EditalViewer: React.FC<EditalViewerProps> = ({ edital }) => {
  const [filtro, setFiltro] = useState('');
  const [secaoExpandida, setSecaoExpandida] = useState<string | null>(null);
  const [mostrarDestaques, setMostrarDestaques] = useState(false);
  const [secoesSalvas, setSecoesSalvas] = useState<string[]>([]);

  const secoesFiltradas = edital.secoes.filter(secao => {
    if (mostrarDestaques && !secao.destaque) return false;
    if (!filtro) return true;
    
    return (
      secao.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      secao.conteudo.toLowerCase().includes(filtro.toLowerCase())
    );
  });

  const toggleSecaoExpandida = (id: string) => {
    setSecaoExpandida(secaoExpandida === id ? null : id);
  };

  const toggleSalvarSecao = (id: string) => {
    if (secoesSalvas.includes(id)) {
      setSecoesSalvas(secoesSalvas.filter(secaoId => secaoId !== id));
    } else {
      setSecoesSalvas([...secoesSalvas, id]);
    }
  };

  const destacarTexto = (texto: string) => {
    if (!filtro) return texto;
    
    const regex = new RegExp(`(${filtro})`, 'gi');
    const partes = texto.split(regex);
    
    return (
      <>
        {partes.map((parte, i) => 
          regex.test(parte) ? (
            <mark key={i} className="bg-yellow-200 px-0.5 rounded">
              {parte}
            </mark>
          ) : (
            parte
          )
        )}
      </>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/30 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-sm text-muted-foreground">Edital</div>
            <div className="font-medium">{edital.numero}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Órgão</div>
            <div className="font-medium">{edital.orgao}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Valor Total</div>
            <div className="font-medium">{edital.valorTotal}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Publicação</div>
            <div className="font-medium">{edital.dataPublicacao}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Encerramento</div>
            <div className="font-medium">{edital.dataEncerramento}</div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{edital.titulo}</h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar no edital..."
            className="pl-10"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMostrarDestaques(!mostrarDestaques)}
                className={mostrarDestaques ? "bg-amber-100 border-amber-200" : ""}
              >
                {mostrarDestaques ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{mostrarDestaques ? "Mostrar todos os itens" : "Mostrar apenas destaques"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Baixar edital completo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Compartilhar edital</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-3">
        {secoesFiltradas.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhuma seção encontrada com os filtros atuais</p>
          </div>
        ) : (
          <AnimatePresence>
            {secoesFiltradas.map((secao) => (
              <motion.div
                key={secao.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className={`border rounded-lg overflow-hidden ${
                  secao.destaque ? "border-amber-200 bg-amber-50/50" : "bg-white"
                } ${secaoExpandida === secao.id ? "shadow-md" : ""}`}
              >
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleSecaoExpandida(secao.id)}
                >
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">
                      {filtro ? destacarTexto(secao.titulo) : secao.titulo}
                    </h4>
                    {secao.destaque && (
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                        Destaque
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSalvarSecao(secao.id);
                      }}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
                          secoesSalvas.includes(secao.id)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  </div>
                </div>
                
                <AnimatePresence>
                  {secaoExpandida === secao.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 pb-4 border-t pt-3">
                        <p className="text-muted-foreground">
                          {filtro ? destacarTexto(secao.conteudo) : secao.conteudo}
                        </p>
                        
                        {secao.id === "objeto" && (
                          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md flex gap-2">
                            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-700">
                              <strong>Dica:</strong> O objeto do edital define o escopo e finalidade do financiamento. 
                              Certifique-se de que seu projeto está alinhado com este objetivo antes de prosseguir.
                            </div>
                          </div>
                        )}
                        
                        {secao.id === "selecao" && (
                          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md flex gap-2">
                            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-700">
                              <strong>Dica:</strong> Os critérios de seleção são fundamentais para entender como seu projeto será avaliado.
                              Estruture sua proposta destacando os pontos que serão mais valorizados pela comissão.
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default EditalViewer;
