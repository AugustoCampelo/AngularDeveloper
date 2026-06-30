# Arquitetura — MVC adaptado ao idioma Angular

O objetivo é **MVC**, mas implementado da forma idiomática que o próprio Mantis
adota — o template **não** usa pastas `models/ views/ controllers/`; usa
**feature folders** com separação clara de responsabilidades. Mantenha essa
separação rigorosa, sem brigar contra o framework.

## Mapeamento MVC

| Camada MVC     | No Angular/Mantis                                            | Arquivos                                  |
|----------------|-------------------------------------------------------------|-------------------------------------------|
| **Model**      | Tipos de domínio, regras, estado, dados                     | `*-type.ts`, `*.service.ts` (estado), `*-data.ts` |
| **View**       | Template e estilo, apresentação pura                        | `*.component.html`, `*.component.scss`    |
| **Controller** | Classe do componente (orquestra) + service de feature (Facade) | `*.component.ts`, `*.service.ts`       |

- **Model:** interfaces em `*-type.ts`; lógica/estado em serviços (RxJS
  `BehaviorSubject`/`Subject` ou signals); mocks em `*-data.ts`. Sem HTML/DOM.
- **View:** só apresentação. Usa `<app-card>` e controles ng-bootstrap. Lógica
  mínima no template (só binding e `@if`/`@for`).
- **Controller:** o `*.component.ts` é **fino** — injeta o service, expõe
  observables/signals para a View e trata eventos do usuário. A regra de negócio
  e o estado moram no **service** (que atua como Facade — ver patterns-gof.md).

## Estrutura de pastas por feature

```
<feature>/
├── <feature>.component.ts        # Controller (container/inteligente)
├── <feature>.component.html      # View
├── <feature>.component.scss      # View (estilo)
├── <feature>.service.ts          # Controller/Facade + estado (Model)
├── <feature>-type.ts             # Model: interfaces de domínio
├── <feature>-data.ts             # Model: dados mock/fixtures (opcional)
├── <feature>-routing.module.ts   # rotas da feature (se módulo)
├── <feature>.module.ts           # NgModule da feature (se lazy via loadChildren)
└── components/                   # subcomponentes de apresentação (View "burra")
    └── <child>/<child>.component.{ts,html,scss}
```

Espelha `template-reference/app/demo/admin-panel/helpdesk/` — use-o como molde.

## Container vs Presentational (Smart vs Dumb)

- **Container** (inteligente): conhece o service, faz fetch/estado, orquestra.
  Geralmente a tela de topo da rota.
- **Presentational** (burro): recebe dados por `input()`, emite eventos por
  `output()`, **não** injeta serviços de domínio. Vive em `components/`.
  Maximize estes — são reutilizáveis e testáveis.

## Roteamento e carregamento

- Telas standalone simples: `loadComponent: () => import(...).then(c => c.X)`.
- Features com várias telas: `loadChildren` apontando para `<feature>.module.ts`.
- Sempre proteja rotas autenticadas com `canActivateChild: [AuthGuardChild]` e
  declare `data: { roles: [...] }` usando o enum `Role`.

## Estado

- Estado **local de tela** com regras de busca/ordenação/paginação → service de
  feature com `BehaviorSubject`/`Subject` (padrão do `helpDeskCustomerService`).
- Estado **derivado/reativo simples** → signals (`signal`, `computed`).
- Nada de estado de negócio dentro do template ou em variáveis soltas do
  componente sem encapsulamento.

## Limites (o que NÃO fazer)

- Não colocar chamadas HTTP/regra de negócio direto no `*.component.ts`.
- Não acessar o DOM na camada Model.
- Não duplicar controles que já existem em `theme/shared/components`.
- Não misturar responsabilidades de layouts diferentes na mesma feature.
