# Shell Kit — casca inicial a partir do template Mantis (projeto novo)

Manifesto para transformar o template Mantis na **casca em branco** de um projeto
novo: barra superior + menu lateral retrátil vazio + área central vazia, já
compilável. Use com o comando `/tela-inicial`.

> Modelo: **parta do template Mantis** (que já compila) e **reduza** — não
> reconstrua o layout a partir de um `ng new` cru.

## MANTER (a casca depende disto)

```
src/main.ts                         # bootstrap (providers, interceptors)
src/index.html · src/styles.scss    # (styles.scss enxuto — ver abaixo)
src/app/app.component.*             # root
src/app/app-config.ts               # MantisConfig
src/app/app-routing.module.ts       # (enxuto — ver abaixo)
src/app/theme/layout/admin-layout/  # barra superior (nav-bar) + menu (navigation) + configuration
src/app/theme/layout/guest-layout/  # (se mantiver login)
src/app/theme/shared/**             # SharedModule, card, breadcrumb, spinner, scrollbar,
                                    #   _helpers (interceptors, auth.guard, role),
                                    #   directive, custom-translate-loader, customs-theme.service
src/scss/settings/**  src/scss/bootstrap/**
src/scss/theme/**  src/scss/fonts/**   # tema + fontes (feather/fontawesome/material/tabler)
src/assets/i18n/**                  # traduções (CustomTranslateLoader)
angular.json · package.json · tsconfig*.json
```

## REMOVER (conteúdo de demonstração)

```
src/app/demo/**                     # telas de demo (crie uma home vazia — ver EDITAR)
src/app/theme/layout/simple-layout/ # navegação de componentes (demo) — opcional
src/fake-data/**                    # mocks (se ainda existir)
```
**Exceções (mantenha — são referenciadas pelas rotas enxutas):**
`demo/pages/authentication/auth-login/` (login),
`demo/pages/maintenance/error/` e `.../unauthorize-error/`. Se você também
remover o login, ajuste `app-routing.module.ts` para redirecionar `''` → `home`.
No `styles.scss`, remova os imports de plugins que só servem às demos:
`quill`, `@ng-select`, `ngx-owl-carousel-o`, `angular-calendar`,
`angular-notifier`, `@angular/material/prebuilt-themes`, e (opcional)
`sweetalert2`/`animate.css` se não for usar alertas de imediato.

## EDITAR

1. **`navigation.ts`** → menu vazio:
   `export const NavigationItems: NavigationItem[] = [];` (interface preservada).
   Ver `generated/shell/navigation.ts`.
2. **`home` vazia** em `src/app/demo/home/` — ver `generated/shell/home/`.
3. **`app-routing.module.ts`** enxuto — ver `generated/shell/app-routing.module.ts`.
4. **`styles.scss`** enxuto — ver `generated/shell/styles.scss`.

## Dependências do shell (subconjunto)

Confirme as **versões** no `package.json` original do Mantis (é a fonte
autoritativa); a lista abaixo é o que a casca precisa em runtime:

- `@angular/{animations,cdk,common,compiler,core,forms,platform-browser,router}`
- `@ng-bootstrap/ng-bootstrap` · `@popperjs/core`
- `@ant-design/icons-angular`
- `@ngx-translate/core`
- `ngx-scrollbar`
- `ngx-toastr`
- `@sweetalert2/ngx-sweetalert2` · `sweetalert2` (se mantiver o SweetAlert)
- `@ks89/angular-modal-gallery` · `hammerjs` · `mousetrap` (usados pelo `SharedModule`)
- `bootstrap` (SCSS) · `rxjs` · `zone.js` · `tslib`

> **Enxugar mais (opcional):** se não quiser a galeria/hammer/mousetrap, remova
> `GalleryModule` (e os `import 'hammerjs'/'mousetrap'`) do `shared.module.ts` e
> tire as libs correspondentes. Reduz dependências, mas diverge do template —
> faça só se o time preferir.

## Validação

`npm install` → `npm run lint` → `ng serve` → acesse `/home`.
Ajuste imports remanescentes que o build acusar (o strip pode deixar referências
órfãs a componentes de demo removidos).
