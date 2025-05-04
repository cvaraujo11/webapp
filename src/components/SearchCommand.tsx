import React from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Search } from 'lucide-react';

// Dados de exemplo para sugestões contextuais
const searchSuggestions = [
  {
    group: 'Módulos',
    items: [
      { name: 'Ferramentas', path: '/modulo/ferramentas' },
      { name: 'Pesquisa', path: '/modulo/pesquisa' },
      { name: 'Decifrando Editais', path: '/modulo/decifrando' },
      { name: 'Elaborando Propostas', path: '/modulo/elaborando' },
      { name: 'Ação e Apoio', path: '/modulo/acao-apoio' },
    ],
  },
  {
    group: 'Ferramentas',
    items: [
      { name: 'Formatação de Texto', path: '/modulo/ferramentas/formatacao-texto' },
      { name: 'Imagens', path: '/modulo/ferramentas/imagens' },
      { name: 'Templates', path: '/modulo/ferramentas/templates' },
    ],
  },
  {
    group: 'Recursos',
    items: [
      { name: 'Glossário de Termos', path: '/modulo/decifrando/glossario' },
      { name: 'Checklist de Análise', path: '/modulo/decifrando/checklist' },
      { name: 'Modelos de Projeto', path: '/modulo/elaborando/modelos' },
    ],
  },
];

interface SearchCommandProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SearchCommand: React.FC<SearchCommandProps> = ({ open, setOpen }) => {
  const router = useRouter();

  const handleSelect = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Buscar módulos, recursos, termos..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        
        {searchSuggestions.map((group) => (
          <React.Fragment key={group.group}>
            <CommandGroup heading={group.group}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.path}
                  onSelect={() => handleSelect(item.path)}
                  className="cursor-pointer"
                >
                  <Search className="mr-2 h-4 w-4" />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </React.Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
