# Checklist de Implementação - Semente de Projeto

## Funcionalidades Gerais e Técnicas
- [x] Estrutura base do projeto Next.js (App Router)
- [x] Layout principal com Header e Sidebar
- [x] Página inicial (`page.tsx`) com design refinado
- [x] Rota dinâmica `[slug]` para os módulos
- [x] Componentes reutilizáveis básicos (DownloadButton, ChecklistItem, ContentCard, SidebarItem, Header)
- [x] Estilização base com Tailwind CSS e paleta de cores inicial
- [x] Templates de exemplo em `/public/templates`
- [ ] Implementar lógica de abertura/fechamento do menu Sidebar no mobile (`Header.tsx` / `Sidebar.tsx` / `layout.tsx`)
- [x] Implementar gerenciamento de estado para Checklists interativos (`ChecklistItem.tsx` e páginas dos Módulos 3 e 5)
- [ ] Revisão completa de Acessibilidade (a11y): HTML semântico, `alt` tags, navegação por teclado, contraste (verificação final), ARIA attributes.
- [ ] Otimização de performance (revisão final, se necessário).
- [ ] (Opcional/Não especificado) Criar página `/sobre` ou remover link da home.

## Módulo 1 – Ferramentas
- [x] Criar/Estruturar conteúdo da seção "Introdução" em `/modulo/ferramentas`
- [x] Criar/Estruturar conteúdo da seção "Formatação Texto" em `/modulo/ferramentas`
- [x] Criar/Estruturar conteúdo da seção "Imagens" em `/modulo/ferramentas`
- [x] Criar/Estruturar conteúdo da seção "Templates" em `/modulo/ferramentas`
- [x] Integrar `DownloadButton` na seção "Templates" para linkar aos arquivos `.docx`, `.odt`, `.xlsx`.

## Módulo 2 – Pesquisa
- [x] Criar/Estruturar conteúdo da seção "Onde Buscar?" em `/modulo/pesquisa`
- [x] Criar/Estruturar conteúdo da seção "Usando IAs (chatbots)" em `/modulo/pesquisa`
- [x] Criar/Estruturar conteúdo da seção "Alertas relevantes" em `/modulo/pesquisa`
- [x] Adicionar links e referências para órgãos/plataformas.

## Módulo 3 – Decifrando Editais e Políticas para PCTs
- [x] Criar/Estruturar conteúdo da seção "Anatomia de um Edital" em `/modulo/decifrando`
- [x] Implementar interatividade na seção "Anatomia de um Edital" (ex: acordeão, visualização passo-a-passo).
- [x] Criar/Estruturar conteúdo da seção "Glossário de Termos" em `/modulo/decifrando`
- [x] Implementar interatividade/formatação no "Glossário" (ex: lista, acordeão, tooltips).
- [x] Criar/Estruturar conteúdo da seção "Seus Direitos e Políticas" em `/modulo/decifrando`
- [x] Adicionar links e resumos de políticas públicas.
- [x] Criar/Estruturar conteúdo do "Checklist Análise" em `/modulo/decifrando`
- [x] Implementar interatividade no "Checklist Análise" (`ChecklistItem`).

## Módulo 4 – Elaborando Propostas
- [x] Criar/Estruturar conteúdo da seção "Estrutura básica de um projeto" em `/modulo/elaborando`
- [x] Criar/Estruturar conteúdo da seção "Disponibilização de modelos/templates" em `/modulo/elaborando`
- [x] Integrar `DownloadButton` na seção de templates.
- [x] Criar/Estruturar conteúdo da seção "Banco de ideias inspiradoras" em `/modulo/elaborando`
- [x] Criar/Estruturar conteúdo da seção "Dicas de escrita" em `/modulo/elaborando`

## Módulo 5 – Ação, Submissão e Apoio
- [x] Criar/Estruturar conteúdo do "Checklist final de submissão" em `/modulo/acao-apoio`
- [x] Implementar interatividade no "Checklist final" (`ChecklistItem`).
- [x] Criar/Estruturar conteúdo da seção "Orientações práticas: Como enviar propostas" em `/modulo/acao-apoio`
- [x] Criar/Estruturar conteúdo da seção "Acompanhamento" em `/modulo/acao-apoio`
- [x] Criar/Estruturar conteúdo da seção "Rede de Apoio" em `/modulo/acao-apoio`
- [x] Adicionar lista de contatos/organizações parceiras.