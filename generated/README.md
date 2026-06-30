# Tela gerada (teste): Dashboard Default

Saída de teste da configuração. Gerada a partir de
`template-reference/app/demo/dashboard/default`, **refatorada** para seguir as
regras do repositório (MVC adaptado, Facade + Observer, tipos e dados separados).

> Destino: **colar num projeto Mantis real** (não compila aqui, pois este repo
> não é um app Angular).

## Onde colar

Copie os arquivos de `generated/dashboard/default/` para, no projeto-alvo:

```
src/app/demo/dashboard/default/
├── default.component.ts
├── default.component.html
├── default.component.scss
├── default.service.ts        # NOVO (Facade)
├── default-type.ts           # NOVO (Model: interfaces)
└── default-data.ts           # NOVO (Model: mock; substitui o fake-data JSON)
```

Os imports usam o caminho absoluto `src/app/...` (convenção do Mantis), então
resolvem assim que estiverem dentro de um projeto Mantis.

## Cabeçalho + menu retrátil (já existem no template)

O **cabeçalho** (top bar) e o **menu lateral retrátil** **não** fazem parte
desta tela — vêm do `admin-layout`, que todo projeto Mantis já possui:

- `theme/layout/admin-layout/nav-bar/` → cabeçalho (com toggle do menu).
- `theme/layout/admin-layout/navigation/` → menu lateral retrátil.
- `admin-layout.component` compõe `nav-bar` + `navigation` + `<router-outlet>`.

Esta tela renderiza **dentro** do `<router-outlet>` do `admin-layout`. A rota já
existe no `app-routing.module.ts` do Mantis:

```ts
{
  path: '',
  component: AdminLayout,
  canActivateChild: [AuthGuardChild],
  children: [
    {
      path: 'dashboard',
      loadChildren: () => import('./demo/dashboard/dashboard.module').then((m) => m.DashboardModule),
      data: { roles: [Role.Admin, Role.User] }
    }
    // ...
  ]
}
```

E `dashboard-routing.module.ts` aponta `default` → `DefaultComponent`. Ou seja:
acesse **`/dashboard/default`** e a tela aparece com cabeçalho e menu. Nada a
fazer no roteamento se você mantém a estrutura padrão do Mantis.

## O que mudou em relação ao original (por causa das regras)

| Antes (template) | Agora (nossas regras) |
|---|---|
| Arrays de dados embutidos no `*.component.ts` | Movidos para `default-data.ts` (Model) |
| Sem interfaces | `default-type.ts` com `AnalyticCard`, `RecentOrder`, `TransactionHistory` |
| `import tableData from 'src/fake-data/...json'` | `default.service.ts` (Facade) expõe `recentOrders$` |
| Componente acessava dados direto | Componente fino consome `analytics$ \| async`, `recentOrders$ \| async`, `transactions$ \| async` |
| `@for (... track analytic)` (objeto) | `track` por chave estável (`title`/`id`) |
| SCSS com classes não usadas (`welcome-card`, etc.) | SCSS enxuto (só o que a View usa) |

Comportamento visual: **idêntico** ao default do Mantis. Os 4 gráficos
(`monthly-bar-chart`, `income-overview-chart`, `analytics-chart`,
`sales-report-chart`) são **reaproveitados** de `theme/shared/apexchart/` — não
recriados.

## Como validar no projeto real

```bash
npm run lint          # corrigir apontamentos, se houver
ng serve              # acessar /dashboard/default
```

Os avatares em "Help & Support Chat" usam `assets/images/user/avatar-*.jpg`
(presentes no Mantis; foram removidos só do nosso template-reference enxuto).
