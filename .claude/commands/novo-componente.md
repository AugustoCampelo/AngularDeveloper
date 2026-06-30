---
description: Cria um componente de apresentação reutilizável no padrão Mantis
argument-hint: <nome-do-componente>
---

Crie um componente Angular reutilizável chamado **$1** para este projeto Mantis.

Diretrizes:

1. Leia `.claude/rules/estilo-codigo.md` e `.claude/rules/stack-mantis.md` antes
   de começar. Use `card.component.ts` em `template-reference/` como referência
   de um componente reutilizável bem feito (inputs via `input()`, JSDoc nos
   inputs públicos, slots por `TemplateRef`).

2. Por padrão, faça um componente **presentational (burro)**:
   - dados de entrada por `input()`, eventos por `output()`;
   - **não** injete serviços de domínio;
   - standalone, seletor com prefixo `app-`, `imports: [CommonModule, SharedModule]`
     conforme necessidade;
   - View enxuta (html/scss), control flow `@if`/`@for`.

3. Reuse `<app-card>` e controles ng-bootstrap quando couber; documente os
   inputs públicos com JSDoc.

4. Coloque-o em `components/` da feature relevante, ou em
   `theme/shared/components/` se for genuinamente compartilhável por várias
   telas (confirme com o usuário se for shared).

5. Rode `npm run lint` e relate o que foi criado.

Se o componente precisar de estado/serviço (ou seja, for "inteligente"),
pergunte ao usuário se não deveria ser uma feature/tela via `/nova-tela`.
