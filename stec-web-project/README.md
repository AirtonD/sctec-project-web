# Empreendimentos SC

Este repositório traz uma aplicação web em Next.js focada no gerenciamento de empreendimentos em Santa Catarina. A ideia central foi entregar uma experiência CRUD completa (Create, Read, Update e Delete) por meio de um painel responsivo, com listagem, formulários e confirmação de exclusão. A camada visual combina componentes inspirados no `shadcn/ui` com ícones da `lucide-react`; o estado dos empreendimentos é sincronizado com o `localStorage`, então os registros sobrevivem ao fechamento do navegador. Ao clicar em “Editar”, os dados do empreendimento fluem diretamente para o formulário, e o diálogo pode ser aberto tanto para edição quanto para cadastro.

## Tecnologias utilizadas
- **Next.js 16.1.6** com o App Router para renderização híbrida e carregamento otimizado.
- **React 19** abastecendo os hooks `useState`, `useCallback` e `useEffect`.
- **PnPM** como gerenciador de pacotes (o `pnpm-lock.yaml` garante instalação reprodutível).
- **@base-ui/react**, `class-variance-authority`, `clsx` e os componentes do `shadcn/ui` para montar botões, cards, tabelas e diálogos coerentes.
- **lucide-react** para os ícones de edição, exclusão e alternância de tema.
- **next-themes** para entregar troca de tema, integrada ao `ThemeProvider`.
- **Tailwind CSS (v4)** e fontes `Geist` (via `next/font`) para estilo e tipografia.
- **LocalStorage** para persistir a lista de empreendimentos sem servidor.

## Estrutura geral do projeto
- `app/`: contém o entrypoint (`page.tsx`) que renderiza o cabeçalho com `ThemeToggle`, chama os diálogos e monta a tabela de empreendimentos. Também abriga o `layout.tsx` que registra a fonte e o `ThemeProvider`.
- `components/`: reúne o formulário controlado (`empreendimento-form-dialog.tsx`), a tabela responsiva (`empreendimento-table.tsx`), o diálogo de confirmação (`delete-confirm-dialog.tsx`), o `ThemeToggle` e os primitives personalizados em `components/ui/`.
- `data/mock-empreendimentos.ts`: traz dados iniciais para simular cadastros reais durante o desenvolvimento.
- `types/empreendimento.ts`: define os `type` e `const` compartilhados (segmento, municípios de SC, status).
- `public/` e `lib/`: seguem o padrão Next.js (pode abrigar assets e helpers se necessário).
- `package.json`, `pnpm-lock.yaml` e `README.md`: guiam scripts, dependências e documentação.

## Instruções para execução
1. Clone o repositório: `git clone <URL>` e entre na pasta `stec-web-project`.
2. Instale as dependências com `pnpm install`.
3. Rode `pnpm dev` para ativar o servidor de desenvolvimento e abra `http://localhost:3000`.
4. Para gerar uma versão de produção, use `pnpm build` seguido de `pnpm start`.
5. Execute `pnpm lint` para conferir a qualidade do código antes de enviar o projeto.
6. Caso queira limpar o `localStorage` e testar um estado zerado, use o console do navegador ou `window.localStorage.removeItem("empreendimentos-sctec")`.

## Vídeo pitch
Assista ao pitch da solução neste link: https://youtu.be/RR_l6tdbbwc
