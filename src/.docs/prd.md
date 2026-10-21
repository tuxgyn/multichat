# PRD — Jarvis de Harry (v1 de implantação)

**Produto:** interface inicial de chat com IA, no estilo ChatGPT / Claude / Grok  
**Versão:** 1.0 (somente UI)  
**Fonte:** `src/.docs/brain-dump.md` + decisões alinhadas antes deste PRD  
**Data:** 2026-10-19

---

## 1. Objetivo

Substituir o boilerplate atual do Vite/Preact por uma tela de chat dark, com composer central, modos de resposta, toggles de ferramenta e uma sidebar visual de conversas.

Esta versão **não** envia mensagens a uma API e **não** renderiza bolhas de conversa. O valor da v1 é o layout, os estados visuais e a organização de componentes.

## 2. Estado atual do repositório

Já existe e **não deve ser reconfigurado do zero**:

- Vite
- TypeScript
- Tailwind CSS **última versão** (v4.3.x, plugin oficial `@tailwindcss/vite`) — não usar v3, `tailwind.config.js` nem PostCSS
- Preact (`preact` + `@preact/preset-vite`)

O `src/app.tsx` ainda é o template padrão (hero, counter, links). A implantação troca essa tela pelo layout do Jarvis.

> O brain-dump cita React. A stack oficial deste PRD é **Preact**, que já está no projeto. Componentes usam `preact` / `preact/hooks`. Não migrar para React nesta versão.

## 3. Escopo da v1

### Incluído

- Shell dark em tela cheia
- Sidebar visual à esquerda (Nova conversa + histórico vazio ou mock)
- Área principal com:
  - título **Jarvis de Harry**
  - tabs de modo: **Rápido**, **Equilíbrio**, **Especialista**
  - composer central (textarea + controles)
- Toggles **Pensamento profundo** e **Pesquisa Inteligente**
- Botão de enviar arredondado (feedback visual apenas)
- Estado local dos controles (tab ativa, toggles, texto digitado)
- Componentes em `src/components`, sem duplicação

### Fora de escopo (v1)

- Integração com qualquer API de IA
- Bolhas de mensagem (usuário ou assistente)
- Streaming, markdown, código, anexos
- Autenticação, múltiplos usuários, persistência real
- Histórico funcional (criar/renomear/apagar conversas de verdade)
- Temas claro / customização de cor
- Mobile como prioridade (desktop first; quebra básica ok)

## 4. Usuário e fluxo

**Usuário:** Harry, usando o app no desktop como ponto de entrada de um assistente pessoal.

**Fluxo da v1:**

1. Abre o app e vê fundo escuro, sidebar à esquerda e composer no centro.
2. Lê o nome **Jarvis de Harry**.
3. Escolhe um modo (Rápido / Equilíbrio / Especialista). Default: **Equilíbrio**.
4. Ativa ou desativa **Pensamento profundo** e **Pesquisa Inteligente**.
5. Digita no campo. O botão enviar reflete se há texto.
6. Clica em enviar (ou usa Enter) e recebe só feedback visual. A tela **não** cria mensagens.
7. Clica em **Nova conversa**: reseta texto, volta o modo para Equilíbrio e desliga os dois toggles.

## 5. Layout

Prioridade: **desktop**. Mobile deve permanecer usável (sidebar colapsável ou empilhada), sem um redesign específico.

```
┌─────────────┬──────────────────────────────────────────┐
│  Sidebar    │                                          │
│             │           Jarvis de Harry                │
│  [Nova]     │     [Rápido] [Equilíbrio] [Especialista] │
│             │                                          │
│  Histórico  │              ┌──────────────────┐        │
│  (vazio ou  │              │  textarea        │        │
│   mock)     │              │                  │        │
│             │              │ [Profundo] [Web] │ [➤]    │
│             │              └──────────────────┘        │
│             │                                          │
└─────────────┴──────────────────────────────────────────┘
```

Regras:

- Tema **sempre dark** (não seguir `prefers-color-scheme` light).
- Composer **vertical e horizontalmente centralizado** na área principal.
- Tabs **acima** do composer.
- Título **acima** das tabs.
- Controles **dentro** da caixa do composer:
  - inferior esquerda: os dois toggles
  - inferior direita: enviar, botão circular/arredondado
- A v1 não mostra conversa, mas o composer deve permanecer no centro para uma v2 poder colocar mensagens acima/ao redor **sem** descer o input para o rodapé (não copiar o layout ChatGPT pós-envio nesta versão).

## 6. Requisitos de UI

### 6.1 Sidebar

- Fundo um pouco distinto da área principal (mesmo tema dark).
- Botão **Nova conversa** no topo.
- Lista de conversas: estado vazio (“Nenhuma conversa ainda”) **ou** 2–3 itens mock estáticos, não persistidos.
- Item mock, se existir, é só visual (hover ok; clique não navega).
- Largura fixa no desktop (~260px). Em viewport estreita, pode colapsar.

### 6.2 Título

- Texto: `Jarvis de Harry`
- Destaque visual (maior que as tabs, peso médio/alto)
- Sem logo obrigatório nesta versão

### 6.3 Tabs de modo

Três opções mutuamente exclusivas:

| Tab          | Papel visual                                      |
| ------------ | ------------------------------------------------- |
| Rápido       | Modo mais curto / direto                          |
| Equilíbrio   | Default ao abrir e após Nova conversa             |
| Especialista | Modo mais aprofundado                             |

Comportamento:

- Uma tab ativa por vez
- A ativa tem estilo claramente diferente (fundo, borda ou underline)
- Clique troca o estado local; nenhum efeito colateral além do visual

### 6.4 Composer

- Caixa única, cantos bem arredondados, borda sutil, fundo um tom acima do canvas
- Textarea multilinha, sem borda interna aparente
- Placeholder sugerido: `Pergunte ao Jarvis…`
- Auto-resize até um máximo (~6–8 linhas); depois, scroll interno
- Sem anexo, microfone ou seletor de modelo nesta versão

**Toggles (inferior esquerda), independentes entre si:**

| Controle                 | Tipo     | Default |
| ------------------------ | -------- | ------- |
| Pensamento profundo      | on/off   | off     |
| Pesquisa Inteligente     | on/off   | off     |

Cada um mostra estado ligado/desligado de forma óbvia (cor de fundo, ícone ou borda). São só estado de UI.

**Enviar (inferior direita):**

- Botão circular (ou fortemente arredondado)
- Ícone de seta/enviar
- **Habilitado** só com texto não-vazio (após trim)
- Desabilitado: opacidade reduzida, sem clique útil
- Clique ou Enter (sem Shift): feedback visual (press/ripple curto ou ícone em estado “enviado”) e **não** limpa o texto automaticamente nesta versão, para o usuário não achar que a mensagem foi despachada
- Shift+Enter: nova linha
- Não cria bolhas, não chama API, não abre overlay de erro

## 7. Arquitetura de componentes

Tudo em `src/components`. Um componente por responsabilidade; não extrair átomos demais.

Sugestão (nomes podem variar, a divisão não):

```
src/
  app.tsx                          # só monta o shell
  index.css                        # tokens dark + Tailwind
  components/
    layout/
      AppShell.tsx                 # sidebar + main
      Sidebar.tsx
    chat/
      ChatHome.tsx                 # título + tabs + composer (estado da tela)
      ModeTabs.tsx
      Composer.tsx
      ToolToggle.tsx               # reutilizado pelos dois toggles
      SendButton.tsx
```

Regras:

- Estado da tela (modo, toggles, texto) vive em `ChatHome` (ou um hook `useChatHomeState` ao lado). Não espalhar `useState` irmão em vários filhos se o pai já precisa coordenar o reset de Nova conversa.
- `ToolToggle` é o único botão de liga/desliga; os dois usos passam `label` + `pressed`.
- Não criar `Button.tsx` genérico se só o enviar e os toggles precisam de estilo próprio.
- Remover CSS do template (`app.css` e regras de landing em `index.css`) quando a tela nova substituir o boilerplate.
- Estilizar só com Tailwind v4 (última versão já no repo). Tokens de cor dark (fundo, superfície, borda, texto, acento) ficam em `@theme` no `index.css`. Não adicionar `tailwind.config.js` da v3.

## 8. Critérios de aceite

A v1 está pronta quando:

1. A tela inicial do Vite some; o app abre direto no Jarvis dark.
2. Título visível: **Jarvis de Harry**.
3. Três tabs funcionam; **Equilíbrio** inicia selecionado.
4. Composer está no centro da área principal.
5. Os dois toggles ligam/desligam de forma independente e visível.
6. Enviar fica desabilitado com campo vazio e habilitado com texto.
7. Enviar (clique ou Enter) não cria mensagens nem chama rede; há feedback visual.
8. Shift+Enter quebra linha no textarea.
9. Sidebar mostra Nova conversa + vazio ou mock.
10. Nova conversa reseta texto, modo (Equilíbrio) e toggles (off).
11. Componentes estão em `src/components` e `ToolToggle` não está duplicado.
12. `npm run build` (`tsc -b && vite build`) passa.
13. Desktop (~1280px e ~1440px) está correto; ~768px não quebra de forma ilegível.

## 9. Não fazer nesta implantação

- Não conectar OpenAI, Anthropic, Groq ou proxy próprio
- Não renderizar thread de mensagens
- Não persistir estado em `localStorage` (pode entrar na v2)
- Não adicionar React Router
- Não instalar UI kit (shadcn, Headless UI, etc.) salvo necessidade clara de a11y nos toggles — preferir HTML + Tailwind
- Não reescrever Vite/Tailwind/Preact

## 10. Direção da v2 (não implementar agora)

- Ao enviar, criar mensagem do usuário e resposta mock ou API, **mantendo o composer no centro**
- Histórico real na sidebar
- Os modos e toggles influenciarem o request (modelo, thinking, web search)
- Acessibilidade mais completa (foco visível, `aria-pressed` já vale fazer na v1 nos toggles)

## 11. Decisões já fechadas

| Tema              | Decisão                                              |
| ----------------- | ---------------------------------------------------- |
| Escopo            | Somente interface                                    |
| Terceira tab      | Equilíbrio                                           |
| Pós-envio (futuro)| Composer permanece no centro                         |
| Enviar na v1      | Só feedback visual; sem bolhas                       |
| Sidebar           | Visual, com Nova conversa e histórico vazio ou mock  |
| Nome na UI        | Jarvis de Harry                                      |
| Stack             | Preact + Vite + TypeScript + Tailwind v4 (última)    |
| Responsivo        | Desktop first                                        |
| Arquivo deste PRD | `src/.docs/prd.md`                                   |
