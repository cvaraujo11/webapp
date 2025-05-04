Desenvolvimento dos Módulos

Módulo Ferramentas

Interface base
Sistema de templates
Funcionalidades de download

Módulo Pesquisa

Interface de busca
Integração com IA
Sistema de alertas

Módulo Decifrando Editais

Visualização interativa
Glossário
Links para políticas

Módulo Elaborando Propostas

Templates editáveis
Banco de ideias
Sistema de dicas

Módulo Ação e Submissão

Checklists interativos
Guia de submissão
Rede de apoio


1. Módulo Ferramentas
Objetivo
Fornecer recursos práticos para elaboração de documentos e projetos.
Funcionalidades
Templates para download (.docx, .odt, .xlsx)
Guia de formatação de texto
Gerenciamento de imagens
Dicas de uso dos recursos
Componentes
// components/modules/ferramentas/template-card.tsx

interface TemplateCardProps {

  title: string

  format: 'docx' | 'odt' | 'xlsx'

  description: string

  filename: string

}

// components/modules/ferramentas/format-guide.tsx

interface FormatGuideProps {

  type: 'texto' | 'imagem'

  examples: Array<{

    title: string

    description: string

    image?: string

  }>

}
2. Módulo Pesquisa
Objetivo
Facilitar a busca e monitoramento de editais e oportunidades.
Funcionalidades
Interface de busca intuitiva
Integração com chatbots/IAs
Sistema de alertas
Links para plataformas de editais
Componentes
// components/modules/pesquisa/search-interface.tsx

interface SearchInterfaceProps {

  onSearch: (term: string) => Promise<void>

  filters: Array<{

    label: string

    value: string

  }>

}

// components/modules/pesquisa/ai-helper.tsx

interface AIHelperProps {

  query: string

  context?: string

}
3. Módulo Decifrando Editais
Objetivo
Explicar de forma clara a estrutura e termos técnicos dos editais.
Funcionalidades
Anatomia interativa do edital
Glossário de termos técnicos
Links para políticas públicas
Exemplos práticos
Componentes
// components/modules/editais/edital-anatomy.tsx

interface EditalAnatomyProps {

  sections: Array<{

    title: string

    description: string

    examples: string[]

  }>

}

// components/modules/editais/glossary.tsx

interface GlossaryProps {

  terms: Array<{

    term: string

    definition: string

    examples?: string[]

  }>

}
4. Módulo Elaborando Propostas
Objetivo
Auxiliar na construção de propostas efetivas.
Funcionalidades
Estrutura básica de projetos
Templates editáveis
Banco de ideias
Dicas de escrita
Componentes
// components/modules/propostas/project-structure.tsx

interface ProjectStructureProps {

  sections: Array<{

    title: string

    description: string

    tips: string[]

    template?: string

  }>

}

// components/modules/propostas/idea-bank.tsx

interface IdeaBankProps {

  categories: Array<{

    name: string

    ideas: Array<{

      title: string

      description: string

      examples: string[]

    }>

  }>

}
5. Módulo Ação e Submissão
Objetivo
Orientar o processo final de submissão e acompanhamento.
Funcionalidades
Checklist interativo
Guia de submissão
Acompanhamento de status
Rede de apoio
Componentes
// components/modules/submissao/checklist.tsx

interface ChecklistProps {

  items: Array<{

    id: string

    label: string

    description?: string

    required: boolean

  }>

  onComplete: (completedItems: string[]) => void

}

// components/modules/submissao/support-network.tsx

interface SupportNetworkProps {

  contacts: Array<{

    name: string

    type: string

    contact: string

    description: string

  }>

}
