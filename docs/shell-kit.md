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
src/app/theme/shared/apexchart/**   # wrappers de gráfico (só usados por dashboards de demo)
src/fake-data/**                    # mocks (se ainda existir)
```
> `theme/shared/apexchart/**` são componentes standalone **não** declarados no
> `SharedModule` — pode remover na casca. Mas ao criar o 1º **dashboard** depois,
> re-adicione `ng-apexcharts`/`apexcharts` e regenere/traga esses wrappers.
**Exceções (mantenha — são referenciadas pelas rotas enxutas):**
`demo/pages/authentication/auth-login/` (login),
`demo/pages/maintenance/error/` e `.../unauthorize-error/`. Se você também
remover o login, ajuste `app-routing.module.ts` para redirecionar `''` → `home`.

> ⚠️ **Dependências compartilhadas dos keepers — mantenha também:** o
> `auth-login.component.scss` importa `../auth.scss` (estilo base das telas de
> auth). **Não apague** `demo/pages/authentication/auth.scss` ao remover os
> irmãos da pasta `authentication/`, senão o build quebra
> (`Can't find stylesheet to import`). Se isso acontecer, **restaure o original**
> — não invente um substituto (o login deve manter o visual do Mantis).
No `styles.scss`, remova os imports de plugins que só servem às demos:
`quill`, `@ng-select`, `ngx-owl-carousel-o`, `angular-calendar`,
`angular-notifier`, `@angular/material/prebuilt-themes`, e (opcional)
`sweetalert2`/`animate.css` se não for usar alertas de imediato.

## EDITAR

> Os arquivos-modelo estão no **repositório de configuração**, em
> `skeleton/shell/` (não são copiados para o projeto-alvo). Consulte-os lá; se
> não tiver o repo à mão, gere pelo conteúdo descrito abaixo.

1. **`navigation.ts`** → menu vazio:
   `export const NavigationItems: NavigationItem[] = [];` (interface `NavigationItem`
   preservada). Ver `skeleton/shell/navigation.ts`.
2. **`home` vazia** em `src/app/demo/home/` — componente standalone fino,
   template vazio. Ver `skeleton/shell/home/`.
3. **`app-routing.module.ts`** enxuto (login + home + unauthorized + wildcard).
   Ver `skeleton/shell/app-routing.module.ts`.
4. **`styles.scss`** enxuto (sem plugins de demo). Ver `skeleton/shell/styles.scss`.
5. **`app-config.ts`** → `DASHBOARD_PATH = '/home'` (destino do redirect
   pós-login, para cair na `home` da casca).

## Dependências (versões reais do Mantis v2.4.0)

> Estratégia recomendada: como você **parte do template**, mantenha o
> `package.json` original e **remova só os pacotes de demo** depois que o build
> passar. Manter dependência a mais é inofensivo (só pesa); remover uma
> necessária quebra o build.

**MANTER (a casca usa em runtime):**

```
@angular/animations @angular/cdk @angular/common @angular/compiler
@angular/core @angular/forms @angular/localize @angular/platform-browser
@angular/platform-browser-dynamic @angular/router          21.0.0
@ng-bootstrap/ng-bootstrap 19.0.1   @popperjs/core 2.11.8   bootstrap 5.3.8
@ant-design/icons-angular 20.0.0    ngx-scrollbar 18.0.0
@ks89/angular-modal-gallery 14.0.0  hammerjs 2.0.8          mousetrap 1.6.5
@ngx-translate/core 17.0.0          ngx-toastr 19.1.0
@sweetalert2/ngx-sweetalert2 14.0.1 sweetalert2 11.26.3     (se mantiver alerts)
screenfull 6.0.2 (fullscreen na top bar)  lodash-es 4.17.21 (pipe do shared)
rxjs ~7.8.2   tslib 2.8.1
```
`@angular/localize` é **obrigatório** — é o polyfill do build (`angular.json`).
Projeto é **zoneless** (não há `zone.js`).

**devDependencies (build/lint/format):** `@angular/cli` 21,
`@angular-devkit/build-angular` 21, `@angular-eslint/*` 20.6.0, `eslint` 9.39.1,
`@typescript-eslint/*` 8.47.0, `prettier` 3.6.2, `typescript` 5.9.3,
`@types/node`, `@types/hammerjs`.

**REMOVÍVEIS (só demo — confirme com o build):** `@angular-slider/ngx-slider`,
`@angular/material`, `@iplab/ngx-file-upload`, `@narik/custom-validators`,
`@ng-select/ng-select`, `ag-grid-angular`/`ag-grid-community`,
`angular-calendar`, `angular-draggable-droppable`, `angular-notifier`,
`angular-resizable-element`, `angular-uploader`, `angularx-flatpickr`,
`animate.css` (se sem sweetalert), `apexcharts`/`ng-apexcharts` (dashboards),
`date-fns`, `dayjs`, `flatpickr`, `ng-recaptcha`, `ng2-date-picker`,
`ngx-chips`, `ngx-clipboard`, `ngx-color-picker`, `ngx-editor`,
`ngx-image-cropper`, `ngx-mask`, `ngx-owl-carousel-o`, `ngx-print`,
`ngx-quill`, `quill`, `uploader`. (`jquery` é script global no `angular.json` —
remova por último, verificando o build.)

## Wiring do `angular.json`

- **`polyfills`**: mantenha `@angular/localize/init`.
- **`styles`**: mantenha `src/styles.scss`, `@angular/cdk/overlay-prebuilt.css`
  e `ngx-toastr/toastr.css`. Remova `flatpickr.css` (e `animate.css` se sem
  sweetalert).
- **`scripts`**: remova `quill.js` e `apexcharts.min.js` (demo). `jquery.js` —
  remova por último, verificando.
- **`assets`**: `src/fake-data` pode sair (removido no strip).

## Moldura enxuta (chrome) — padrão do esqueleto

Depois da casca compilar, enxugue a "moldura" do `admin-layout` (validado em
execução real):

1. **Rodapé central** — em `admin-layout/admin-layout.component.html`, remova o
   bloco `<footer class="pc-footer"> … </footer>` (Copyright/links).
2. **Busca Ctrl+K** — em `admin-layout/nav-bar/nav-left/nav-left.component.html`,
   remova os dois `<li>` de busca (o `dropdown … d-md-none` e o
   `d-none d-md-inline-flex` com `<form class="header-search">`). Em
   `nav-left.component.ts`, remova `SearchOutline` do import e do `addIcon(...)`.
3. **Barra superior** — em `admin-layout/nav-bar/nav-right/nav-right.component.html`,
   remova os `<li>` de **Explore Components** (`pc-mega-menu`), **idioma**
   (ícone `translation`) e **Mensagens** (`#messageDrop`). Mantenha Notificações
   (`bell`), Tela cheia, engrenagem (`settings`) e perfil. Em
   `nav-right.component.ts`, remova o que ficar órfão: `megaMenus`, `messageList`,
   `useLanguage()`, `ngOnInit`/`OnInit`, `TranslateService` (import+inject),
   import `MantisConfig` (se não usado), e ícones `WindowsOutline`,
   `TranslationOutline`, `MailOutline`, `ArrowRightOutline`, `CloseOutline`.
   Confie no `npm run lint`.
4. **Menu lateral** — em `admin-layout/navigation/nav-content/nav-content.component.html`,
   remova o card **"Help ?"** (`<div class="m-4 mb-0">…`) e o bloco de usuário
   (`<div class="user-profile-section">…`). Limpe o que ficar órfão no
   `nav-content.component.ts` (ex.: `logout()`/`authenticationService`).
5. **Engrenagem fixa (sem rotação)** — em
   `scss/theme/layouts/navbar/navbar.scss`, no bloco `.settings`, troque
   `animation: anim-rotate 2s infinite linear;` por `animation: none;`.

## Login esqueleto (PT-BR)

Substitua a tela de login pelo esqueleto PT-BR (arquivos em
`skeleton/shell/login/` no repo de configuração):

- `auth-login.component.{ts,html,scss}` → `src/app/demo/pages/authentication/auth-login/`
- `auth.scss` (original restaurado) → `src/app/demo/pages/authentication/`

Características: sem abas Admin/User, textos em português, só o botão **Google**
(centralizado), rodapé **Home** (esquerda) + **Contato**, campos **pré-preenchidos**
(demo: admin@gmail.com / Admin@123) e mensagem de erro localizada
("Verifique o email e a senha"). Ver detalhes em `skeleton/README.md`.

## Validação

```
npm install --legacy-peer-deps    # ver nota abaixo
npm run lint
ng serve                          # acesse /home
```

> ⚠️ **`--legacy-peer-deps` é obrigatório neste template.** O `npm install` puro
> falha com `ERESOLVE`: `@ant-design/icons-angular@20` declara peer
> `@angular/common@^20`, mas o Mantis v2.4.0 usa Angular 21. A flag só afrouxa a
> checagem de peers na instalação (não muda versões); o template original também
> é instalado assim. Depois dela, `ng build` e `ng lint` passam normalmente.

Ajuste imports remanescentes que o build acusar (o strip pode deixar referências
órfãs a componentes de demo removidos — ex.: `breadcrumb`, `search-filter.pipe`
importando de `simple-layout`; ou `auth.scss` — ver Exceções).
