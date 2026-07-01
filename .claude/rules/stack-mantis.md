# Stack do Template Mantis (Bootstrap) — referência técnica

Tudo aqui foi extraído do código real em `template-reference/`. Ao gerar telas,
use **estes** pacotes e padrões de import — não introduza Angular Material,
PrimeNG, Tailwind ou outras libs sem autorização explícita.

## Versões reais (do `package.json` do Mantis v2.4.0)

- **Angular 21.0.0** — projeto **`zoneless`** (sem `zone.js`; polyfill é
  `@angular/localize/init`). `type: "module"` (ESM).
- ng-bootstrap **19.0.1** · `@popperjs/core` 2.11.8 · Bootstrap **5.3.8**.
- `@ant-design/icons-angular` **20.0.0** · ngx-scrollbar 18 ·
  `@ks89/angular-modal-gallery` 14 (+ hammerjs 2, mousetrap 1.6.5).
- ngx-toastr **19.1.0** · `@sweetalert2/ngx-sweetalert2` 14 + sweetalert2 11.
- `@ngx-translate/core` **17.0.0** · `screenfull` 6 (fullscreen na top bar) ·
  lodash-es 4 (pipe do shared).
- Gráficos: ng-apexcharts 2 + apexcharts 5 · Tabelas: ag-grid 34 ·
  `@angular/material` 21 (presente, mas UI é ng-bootstrap — Material quase só
  entra via CSS prebuilt/plugins de demo).
- Toolchain: **TypeScript 5.9.3** · **ESLint 9.39.1** (flat config,
  `@angular-eslint` 20.6) · **Prettier 3.6.2** · Angular CLI 21 · build
  `@angular-devkit/build-angular:browser`.
- Scripts: `npm start` (serve), `npm run build`, `npm test`, `npm run lint`,
  `npm run lint:fix`, `npm run prettier`.

> Ao gerar código, respeite **zoneless**: prefira signals/`async` pipe; não
> dependa de detecção de mudanças automática por zone (ex.: mutações fora de
> signals/observables podem não refletir na View).

## Bootstrap da aplicação

`main.ts` usa `bootstrapApplication(AppComponent, { providers: [...] })` com:

- `importProvidersFrom(BrowserModule, AppRoutingModule, SharedModule, ToastrModule.forRoot())`
- `provideHttpClient(withInterceptorsFromDi())`
- `provideAnimations()`
- Interceptors via `HTTP_INTERCEPTORS` (multi): `BasicAuthInterceptor`, `ErrorInterceptor`
- `provideSweetAlert2(...)`

## Componentes e módulos compartilhados (`app/theme/shared/`)

- **`SharedModule`** (`shared.module.ts`): reexporta `CommonModule`,
  `FormsModule`, `ReactiveFormsModule`, módulos do ng-bootstrap
  (`NgbDropdownModule`, `NgbNavModule`, `NgbTooltipModule`, `NgbModule`,
  `NgbAccordionModule`, `NgbCollapseModule`, `NgbDatepickerModule`),
  `NgScrollbarModule`, `GalleryModule`, `TranslateModule`, `IconDirective` e o
  **`CardComponent`**. Quase toda tela faz `imports: [SharedModule]`.
- **`<app-card>`** (`components/card`): contêiner padrão de bloco. Inputs via
  signals: `cardTitle`, `cardClass`, `showContent`, `blockClass`, `headerClass`,
  `showHeader`, `footerClass`, `padding`. Slots por `TemplateRef`:
  `#headerOptionsTemplate`, `#headerTitleTemplate`, `#footerTemplate`.
- Outros: `breadcrumb`, `modal`, `spinner`, `placeholder-card`, `scrollbar`,
  `pipe/`, e `_helpers/` (interceptors, `auth.guard.ts`, `role.ts`).
- **Diretiva:** `directive/sortable.directive.ts` (ordenação de colunas; exporta
  `SortDirection`).
- **Serviços compartilhados** (`service/`): `authentication.service.ts`,
  `customs-theme.service.ts`, `product.service.ts`, `user.service.ts`.

## Layouts (`app/theme/layout/`)

- `admin-layout/` — área autenticada (menu lateral, breadcrumb, configurador).
- `guest-layout/` — páginas públicas (landing, login, registro).
- `simple-layout/` — páginas avulsas / navegação de componentes.

As rotas em `app-routing.module.ts` agrupam telas por layout e usam
`loadComponent` (standalone) ou `loadChildren` (módulos de feature) com
`canActivateChild: [AuthGuardChild]` e `data: { roles: [Role.Admin, Role.User] }`.

## Bibliotecas de UI disponíveis

| Necessidade            | Use                                             |
|------------------------|-------------------------------------------------|
| Card / bloco           | `<app-card>`                                     |
| Dropdown, tabs, modal, tooltip, accordion, datepicker | ng-bootstrap (`Ngb*`) |
| Modal programático     | `NgbModal` (`inject(NgbModal)`)                  |
| Ícones                 | `@ant-design/icons-angular` + `IconService.addIcon(...)` |
| Gráficos               | `ng-apexcharts` (`ApexChart`)                    |
| Tabela rica/virtual    | ag-grid (`ag-grid-angular`)                      |
| Tabela simples + sort/paginação | ng-bootstrap + `SortableDirective`      |
| Toast                  | `ngx-toastr` (`ToastrService`)                   |
| Alert/confirm          | SweetAlert2 (`@sweetalert2/ngx-sweetalert2`)     |
| Tradução               | `@ngx-translate` (`translate` pipe / `TranslateService`) |
| Scrollbar customizada  | `ngx-scrollbar` (`NgScrollbarModule`)            |

## Configuração global

`app/app-config.ts` → `MantisConfig` (layout, tema `preset-*`, dark mode, RTL,
fonte, i18n). Não duplique essas opções; leia/estenda esta classe quando precisar
reagir a tema/layout.

## Ícones — padrão de uso

```ts
import { IconService } from '@ant-design/icons-angular';
import { EditOutline, DeleteOutline } from '@ant-design/icons-angular/icons';
// no constructor:
this.iconService.addIcon(...[EditOutline, DeleteOutline]);
```
No template: `<i antIcon type="edit"></i>` (via `IconDirective` do SharedModule).
