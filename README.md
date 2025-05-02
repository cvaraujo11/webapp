# Webapp Sementes

## Visão Geral

O Webapp Sementes é uma aplicação web desenvolvida para facilitar a gestão, geração e download de documentos personalizados, com foco em acessibilidade, simplicidade e experiência mobile-first. O objetivo é oferecer uma interface intuitiva para usuários técnicos e não técnicos, permitindo a manipulação eficiente de templates e módulos.

---

## Estrutura de Pastas e Principais Arquivos

```mermaid
graph TD
  A[webapp]
    A1[src]
      A11[app]
        A111[layout.tsx]
        A112[page.tsx]
        A113[globals.css]
        A114[modulo/[slug]/page.tsx]
        A115[__tests__/]
      A12[components]
        A121[Header.tsx]
        A122[Sidebar.tsx]
        A123[SidebarItem.tsx]
        A124[ChecklistItem.tsx]
        A125[DownloadButton.tsx]
        A126[__tests__/]
    A2[public]
      A21[svg e templates]
    A3[package.json]
    A4[tsconfig.json]
    A5[next.config.ts]
    A6[eslint.config.mjs]
    A7[postcss.config.mjs]
```

- **src/app/**: Páginas principais, layout global, estilos e módulos dinâmicos.
- **src/components/**: Componentes reutilizáveis da interface.
- **public/**: Arquivos estáticos (SVGs, templates de documentos).
- **package.json**: Dependências e scripts do projeto.
- **tsconfig.json**: Configuração do TypeScript.
- **next.config.ts**: Configuração do Next.js.
- **eslint.config.mjs** e **postcss.config.mjs**: Linters e pós-processamento CSS.

---

## Componentes Essenciais e Responsabilidades

- **Header.tsx**: Cabeçalho da aplicação, exibe título e navegação principal.
- **Sidebar.tsx / SidebarItem.tsx**: Menu lateral de navegação entre módulos e funcionalidades.
- **ChecklistItem.tsx**: Item de checklist para seleção de opções em formulários.
- **DownloadButton.tsx**: Botão para download de documentos gerados.
- **modulo/[slug]/page.tsx**: Página dinâmica para cada módulo, renderiza formulários e lógica específica.
- **globals.css**: Estilos globais, incluindo responsividade e acessibilidade.

---

## Instruções para Rodar, Testar e Configurar o Ambiente

### Pré-requisitos

- Node.js >= 18.x
- npm >= 9.x

### Instalação

```bash
cd webapp
npm install
```

### Rodando em Desenvolvimento

```bash
npm run dev
```
Acesse: http://localhost:3000

### Testes

```bash
npm test
```
Os testes estão localizados em `src/app/__tests__/` e `src/components/__tests__/`.

### Configuração

- Variáveis de ambiente podem ser definidas em `.env.local` (se necessário).
- Ajustes de templates podem ser feitos em `public/templates/`.

---

## Recomendações para Deploy em Produção

- Execute `npm run build` para gerar a versão de produção.
- Utilize serviços como Vercel, Netlify ou hospedagem própria com suporte a Node.js.
- Configure variáveis de ambiente de produção.
- Certifique-se de que os arquivos estáticos em `public/` estejam acessíveis.
- Habilite HTTPS e políticas de segurança recomendadas.

---

## Boas Práticas Seguidas

- **Acessibilidade**: Uso de roles, labels e navegação por teclado.
- **Mobile-first**: Layouts responsivos e adaptados para dispositivos móveis.
- **Simplicidade**: Código modular, componentes reutilizáveis e fácil manutenção.
- **Testes automatizados**: Cobertura de componentes essenciais.
- **Padronização**: ESLint, Prettier e tipagem com TypeScript.

---

## Pontos de Atenção para Manutenção e Evolução

- Manter dependências atualizadas e revisar alertas de segurança.
- Garantir cobertura de testes ao adicionar novos componentes.
- Documentar novos módulos e templates adicionados.
- Revisar práticas de acessibilidade a cada alteração de UI.
- Monitorar performance em dispositivos móveis.
- Validar compatibilidade de templates de documentos.

---
