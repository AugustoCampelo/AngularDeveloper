# Stack do Template Mantis (Bootstrap) — referência técnica

Tudo aqui foi extraído do código real em `template-reference/`. Ao gerar telas,
use **estes** pacotes e padrões de import — não introduza Angular Material,
PrimeNG, Tailwind ou outras libs sem autorização explícita.

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
