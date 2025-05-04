import React, { useState } from 'react';
import { 
  PlusCircle, 
  MinusCircle, 
  Calendar, 
  Users, 
  Target, 
  DollarSign,
  FileText,
  ListChecks
} from 'lucide-react';
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
      <div className="border rounded-lg p-4 bg-primary/5">
        <h3 className="text-lg font-semibold text-center mb-2">{edital.titulo}</h3>
        <p className="text-sm text-center text-muted-foreground">
          Clique em cada seção para ver mais detalhes e dicas
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {secoesFiltradas.map((secao) => (
          <div
            key={secao.id}
            className="border rounded-lg overflow-hidden transition-shadow hover:shadow-md"
          >
            <button
              onClick={() => toggleSecaoExpandida(secao.id)}
              className="w-full p-4 flex items-center justify-between bg-white"
            >
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-primary" />
                <span className="font-medium">{secao.titulo}</span>
              </div>
              {secaoExpandida === secao.id ? (
                <MinusCircle className="h-5 w-5 text-primary" />
              ) : (
                <PlusCircle className="h-5 w-5 text-primary" />
              )}
            </button>

            {secaoExpandida === secao.id && (
              <div className="p-4 bg-muted/30 border-t">
                {Array.isArray(secao.conteudo) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {secao.conteudo.map((item, index) => (
                      <li key={index} className="text-sm">{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm">{secao.conteudo}</p>
                )}
                <div className="mt-3 flex items-start gap-2 bg-primary/5 p-2 rounded">
                  <span className="text-primary text-xs">💡 Dica:</span>
                  <p className="text-xs">{secao.id === "objeto" ? "O objeto do edital define o escopo e finalidade do financiamento. Certifique-se de que seu projeto está alinhado com este objetivo antes de prosseguir." : "Os critérios de seleção são fundamentais para entender como seu projeto será avaliado. Estruture sua proposta destacando os pontos que serão mais valorizados pela comissão."}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditalViewer;
