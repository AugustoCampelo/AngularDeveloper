# Tela inicial (casca em branco do sistema)

Saída do comando `/tela-inicial`. Entrega o **esqueleto de arranque** de um
projeto Mantis, sem conteúdo de demonstração:

- **Barra superior** — vem do `admin-layout` (não é recriada).
- **Menu lateral retrátil vazio** — sem itens/sub-itens.
- **Área central vazia** — sem cards/informação.

> Destino: **colar num projeto Mantis real** (este repo não é um app Angular).

## Arquivos e onde colar

```
generated/shell/
├── navigation.ts          → src/app/theme/layout/admin-layout/navigation/navigation.ts   (SUBSTITUI)
└── home/                   → src/app/demo/home/                                            (NOVO)
    ├── home.component.ts
    ├── home.component.html
    └── home.component.scss
```

- **`navigation.ts`**: substitui o do template. Mantém a interface
  `NavigationItem` e define `NavigationItems: NavigationItem[] = []` (menu zerado).
  Há um exemplo comentado no topo mostrando a forma `group → collapse → item`
  para você preencher.
- **`home/`**: a área central vazia (componente fino, template só com um
  contêiner e comentário).

## Barra superior + menu retrátil (já existem)

Ambos são fornecidos pelo `admin-layout`, que todo projeto Mantis já tem:

- `theme/layout/admin-layout/nav-bar/` → **barra superior** (com o botão que
  recolhe/expande o menu).
- `theme/layout/admin-layout/navigation/` → **menu lateral retrátil**, que
  renderiza os itens de `navigation.ts` (agora vazio → menu em branco, mas
  ainda retrátil).

Nada a recriar aqui — apenas zeramos os dados do menu.

## Rota (mostrar a home dentro da casca)

Registre a `home` como filha do `AdminLayout` para herdar barra + menu. No
`app-routing.module.ts` do projeto:

```ts
{
  path: '',
  component: AdminLayout,
  canActivateChild: [AuthGuardChild],
  children: [
    {
      path: 'home',
      loadComponent: () => import('./demo/home/home.component').then((c) => c.HomeComponent),
      data: { roles: [Role.Admin, Role.User] }
    }
    // ...demais rotas
  ]
}
```

Opcional: aponte o redirect inicial para `home` (em `app-config.ts`,
`DASHBOARD_PATH`, ou onde o projeto define a rota pós-login).

## Validar no projeto real

```bash
npm run lint
ng serve      # acessar /home: barra superior + menu vazio retrátil + centro vazio
```
