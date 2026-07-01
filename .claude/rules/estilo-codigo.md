# Estilo de código — convenções do Mantis

Imite o estilo real do `template-reference/`. Consistência com o template vale
mais que preferências pessoais.

## Nomenclatura de arquivos

- **kebab-case** sempre: `helpdesk-customer.component.ts`.
- Sufixos: `*.component.{ts,html,scss}`, `*.service.ts`, `*-type.ts` (interfaces
  de domínio), `*-data.ts` (mock), `*-routing.module.ts`, `*.module.ts`,
  `*.directive.ts`, `*.guard.ts`, `*.interceptor.ts`, `*.pipe.ts`.

## Componentes

- **Standalone** (sem `standalone: true` explícito quando já é o default do
  projeto; siga o que o template faz — componentes declaram `imports: [...]`).
- Seletor com prefixo **`app-`**: `selector: 'app-helpdesk-customer'`.
- `imports: [SharedModule]` (e `CommonModule`/`RouterModule`/`Field` quando
  necessário).
- DI por **`inject()`**, não por parâmetros de construtor:
  ```ts
  service = inject(helpDeskCustomerService);
  private modalService = inject(NgbModal);
  ```
- `providers: [...]` no componente quando o service é por-instância (ex.:
  `providers: [helpDeskCustomerService, DecimalPipe]`).
- Use `templateUrl`/`styleUrl(s)` (arquivos separados), nunca templates inline
  grandes.

## Organização dos imports (com cabeçalhos de comentário)

Siga a ordem e os comentários usados no template:

```ts
// angular import
import { Component, inject } from '@angular/core';

// rxjs import
import { Observable } from 'rxjs';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// bootstrap import
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// icon
import { EditOutline } from '@ant-design/icons-angular/icons';

// third party
import { ToastrService } from 'ngx-toastr';
```

## TypeScript

- `strict` ligado; tipar entradas/saídas. Evite `any` (o template tem poucos
  casos legados com `// eslint-disable-next-line` — não os replique).
- Interfaces de domínio em `*-type.ts`. (O template às vezes usa nomes em
  minúsculo como `interface customer`; **prefira PascalCase** em código novo:
  `interface Customer` — exceto quando estiver editando um arquivo existente que
  já segue o padrão antigo, aí mantenha a consistência local.)
- Signals para estado de UI: `signal()`, `computed()`, `input()`, `output()`.

## Templates (HTML)

- Control flow novo: `@if`, `@for` (com `track`), `@switch`.
- Envolva blocos em `<app-card [cardTitle]="...">`.
- Use `translate` pipe para textos visíveis quando i18n for requisito.
- Acessibilidade: `label` associado a inputs, `aria-*` em controles
  interativos, ordem de foco coerente.

## Estilos (SCSS)

- Reaproveite as classes do tema (utilitários Bootstrap, `scss/theme`,
  `scss/settings`). Evite CSS solto; prefira as variáveis/mixins existentes.
- Mantenha o `*.component.scss` enxuto — só o que é específico do componente.

## Lint e formatação

- Toolchain real: **ESLint 9** (flat config, `@angular-eslint` 20.6) via
  `ng lint`, e **Prettier 3.6**. Comandos: `npm run lint`, `npm run lint:fix`,
  `npm run prettier`. Rode antes de concluir e corrija; não silencie regras sem
  justificativa.
- Não deixe `console.log` nem código morto.

### Regras exatas do ESLint (`eslint.config.mjs` real)

Extends: `eslint:recommended`, `@typescript-eslint/recommended`,
`@angular-eslint/recommended` (+ `template/recommended` e
`template/process-inline-templates`). Regras customizadas relevantes:

- **`component-selector`**: elemento, prefixo `app`, **kebab-case** →
  `selector: 'app-helpdesk-customer'`.
- **`directive-selector`**: atributo, prefixo `app`, **camelCase** →
  `selector: '[appHighlight]'`.
- **`component-class-suffix`: `off`** → a classe **não** precisa terminar em
  `Component` (o template mistura `AdminLayout` e `HelpdeskCustomerComponent`).
  Prefira o sufixo `Component` em telas novas por clareza, mas não é erro omiti-lo.
- `@typescript-eslint/recommended`: evite `any` (regra ativa), sem variáveis/
  imports sem uso.

### Prettier (`.prettierrc` real) — escreva já nesse formato

`printWidth: 140` · `singleQuote: true` · **`trailingComma: "none"`** ·
`tabWidth: 2` · `useTabs: false` · `bracketSpacing: true` · `bracketSameLine: false` ·
`htmlWhitespaceSensitivity: "ignore"` · `endOfLine: "lf"`.
→ Aspas simples, **sem trailing comma**, linhas até ~140 colunas, 2 espaços.

## TypeScript / compilador (do `tsconfig` real)

- `strict: true`, mas `strictTemplates: false` e `useDefineForClassFields: false`.
- `noPropertyAccessFromIndexSignature: true` → acesse propriedades de index
  signature por colchetes (`obj['x']`), não por ponto.
- `experimentalDecorators: true`, target/module **ES2022**, `moduleResolution: bundler`.
- Projeto **zoneless** (Angular 21, sem `zone.js`): garanta reatividade via
  signals/`async` pipe; evite depender de change detection implícita por zone.

## Comentários

- Curtos, em inglês, no estilo do template (`// public props`,
  `// life cycle events`). Documente inputs públicos de componentes reutilizáveis
  com JSDoc, como em `card.component.ts`.
