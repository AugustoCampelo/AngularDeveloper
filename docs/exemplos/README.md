# Exemplos padrão-ouro (mapa de arquétipos → código real)

Antes de gerar uma tela, identifique o **arquétipo** e estude o exemplo real
correspondente em `template-reference/`. São referências de leitura: imite
estrutura, imports, idioma e uso de controles. **Não** copie literalmente para o
projeto — adapte ao domínio.

> Caminho-base: `template-reference/app/`

## 0. Tela inicial / casca em branco do sistema
**Comando:** `/tela-inicial` · **Referências:**
- `theme/layout/admin-layout/` — barra superior (`nav-bar/`) + menu lateral
  retrátil (`navigation/`) + `<router-outlet>`.
- `theme/layout/admin-layout/navigation/navigation.ts` — dados do menu (para a
  casca inicial, este array fica **vazio**: `NavigationItems: NavigationItem[] = []`).

Entrega o esqueleto de arranque: barra superior + menu retrátil vazio + área
central vazia. A barra e o comportamento retrátil **vêm do `admin-layout`** — não
recrie; apenas zere `navigation.ts` e adicione uma `home` vazia.

## 1. Lista / CRUD com busca, ordenação e paginação ⭐
**Referência:** `demo/admin-panel/helpdesk/helpdesk-customer/`
- `helpdesk-customer.component.ts` — Controller fino: injeta o service, expõe
  `customers$`/`total$`, abre modal de cadastro.
- `helpdesk-customer.service.ts` — **Facade + Observer**: `BehaviorSubject`/
  `Subject`, máquina de estado (page/pageSize/searchTerm/sort), `_search()`.
- `helpdesk-customer-type.ts` — Model (interface).
- `helpdesk-customer-data.ts` — dados mock.
- Diretiva de ordenação: `theme/shared/directive/sortable.directive.ts`.

Este é o **molde principal** para telas de listagem. Comece por ele.

## 2. Formulário (Reactive / signal forms)
**Referências:**
- `demo/pages/authentication/auth-login/auth-login.component.ts` — formulário com
  **signal forms** (`@angular/forms/signals`: `form`, `Field`, `signal`).
- `demo/forms/forms-elements/`, `demo/forms/forms-layouts/` — catálogo de campos,
  layouts e validação com Reactive Forms.
- `demo/forms/forms-validator/` — validação.
- `demo/forms/file-upload/`, `demo/forms/image-cropper/` — upload/recorte.

Padrão: Reactive Forms por default; signal forms em telas novas quando coerente.

## 3. Dashboard (cards + gráficos)
**Referências:**
- `demo/admin-panel/helpdesk/helpdesk-dashboard/` — cards + subgráficos
  (`satisfaction-chart/`, `support-bar-chart/`) com ApexCharts.
- `demo/admin-panel/invoice/invoice-dashboard/` — variações de gráfico.
- `demo/dashboard/` — dashboards padrão do template.
- Wrapper de chart: `theme/shared/apexchart/`.

Padrão: cada KPI/gráfico é um **componente presentational** dentro de
`components/`, orquestrado por um container.

## 4. Detalhe / visualização
**Referências:**
- `demo/admin-panel/helpdesk/helpdesk-ticket/ticket-details/`
- `demo/admin-panel/invoice/invoice-details/`

## 5. Criação com modal / sub-fluxos
**Referências:**
- `demo/admin-panel/invoice/invoice-create/` (+ `address-modal/`) — uso de
  `NgbModal`.
- `theme/shared/components/modal/` — componente de modal compartilhado.

## 6. Tabelas
**Referências:**
- `demo/table/bootstrap-table/` — tabela ng-bootstrap (simples).
- `demo/table/ag-grid-table/` — ag-grid (rica/virtualizada).

## 7. Página simples / institucional
**Referências:** `demo/others/sample-page/`, `demo/pages/contact-us/`.

---

## Blocos de UI reutilizáveis (não recrie)
- `theme/shared/components/card/` — `<app-card>` (contêiner padrão).
- `theme/shared/components/breadcrumb/`, `.../spinner/`, `.../placeholder-card/`,
  `.../scrollbar/`, `.../pipe/`.
- `theme/shared/components/_helpers/` — interceptors, `auth.guard.ts`, `role.ts`.
- `theme/shared/service/` — `authentication`, `customs-theme`, `product`, `user`.

## Layouts
- `theme/layout/admin-layout/` (autenticado) · `guest-layout/` (público) ·
  `simple-layout/` (avulso).

> Dica: ao receber um pedido, faça `Grep`/`Glob` no `template-reference/` para
> achar o exemplo mais próximo do domínio antes de escrever.
