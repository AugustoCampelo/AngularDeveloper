---
description: Cria a casca inicial em branco de um PROJETO NOVO a partir do template Mantis (barra superior + menu lateral retrátil vazio + área central vazia)
argument-hint: [rota-inicial: home]
---

Gere a **casca inicial (starter em branco)** de um sistema Mantis para um
**projeto Angular novo/vazio**: barra superior + menu lateral retrátil **sem
itens** + área central **vazia**, já compilável.

## Princípio (leia antes)

Num projeto vazio, a casca precisa de TODA a infraestrutura do Mantis (layout,
shared, tema SCSS, bootstrap, dependências). **Não reconstrua isso do zero** a
partir de um `ng new` — é frágil. O caminho correto é **partir do template
Mantis e reduzi-lo à casca** (ele já compila). O manifesto detalhado de
_manter / remover / editar_ está em **`docs/shell-kit.md`** — siga-o.

## Passos

1. **Contexto:** leia `.claude/rules/*.md` e **`docs/shell-kit.md`**. Confirme a
   fonte do template Mantis (o projeto do time, ou `template-reference/` como
   referência de estrutura).

2. **Base:** parta de uma cópia do template Mantis como esqueleto do projeto
   novo (mantém `src/app/theme/**`, `src/scss/**`, `main.ts`, `app-config.ts`,
   `app.component.*`, `index.html`, `angular.json`, `package.json`,
   `tsconfig*`). Se o usuário insistir em começar de `ng new` puro, avise que
   será preciso trazer o subsistema de layout + as dependências do
   `docs/shell-kit.md`, e confirme antes.

3. **Remova o conteúdo de demonstração** conforme o manifesto: `src/app/demo/**`
   (exceto uma `home` vazia que você cria), páginas/rotas de demo, e os imports
   de plugins de demo no `styles.scss`. Mantenha o layout, o `SharedModule` e o
   tema. **Preserve as dependências compartilhadas dos keepers** — em especial
   `demo/pages/authentication/auth.scss` (o `auth-login.component.scss` importa
   `../auth.scss`; se apagar, o build quebra — não fabrique um substituto).

4. **Zere o menu:** em `theme/layout/admin-layout/navigation/navigation.ts`,
   preserve a interface `NavigationItem` e defina
   `export const NavigationItems: NavigationItem[] = [];` (com um exemplo
   comentado da forma `group → collapse → item`). Remova imports que ficariam
   sem uso.

5. **Área central vazia:** crie `demo/home/home.component.*` (standalone, fino,
   `imports: [CommonModule, SharedModule]`, template vazio — só um contêiner e um
   comentário; sem cards/dados/service).

6. **Enxugue as rotas** (`app-routing.module.ts`): mantenha apenas
   `GuestLayouts` + login e `AdminLayout` + `home` (protegida por
   `AuthGuardChild`, com `data: { roles: [...] }`), além do `unauthorized` e do
   wildcard de erro. Remova as rotas de demo.

7. **Enxugue o `styles.scss`**: mantenha bootstrap + `scss/settings` +
   `scss/theme` (generic/general/components + layouts: sidebar, navbar,
   configuration, pc-common, breadcrumb, footer) + fontes + dark-mode +
   style-preset. Remova imports de plugins de demo (quill, ng-select, owl,
   calendar, notifier, material prebuilt, sweetalert opcional).

8. **Enxugue a moldura (chrome)** conforme `docs/shell-kit.md` → "Moldura
   enxuta": remova o rodapé central (`admin-layout.component.html`), a busca
   Ctrl+K (`nav-left`), e no `nav-right` os itens Explore Components, seletor de
   idioma e Mensagens (mantendo Notificações, Tela cheia, engrenagem e perfil);
   remova os cards "Help ?" e de usuário do `nav-content`. Limpe imports/símbolos
   órfãos nos `.ts` (confie no lint).

9. **Engrenagem fixa:** em `scss/theme/layouts/navbar/navbar.scss`, no bloco
   `.settings`, troque `animation: anim-rotate 2s infinite linear;` por
   `animation: none;` (a engrenagem da barra superior para de girar).

10. **Login esqueleto PT-BR:** aplique os arquivos de `generated/shell/login/`
    (ver `docs/shell-kit.md` → "Login esqueleto"): `auth-login.component.{ts,html,scss}`
    e o `auth.scss` original. Sem abas Admin/User, textos PT, só Google, campos
    pré-preenchidos e erro localizado.

11. **Redirect pós-login:** em `app-config.ts`, defina `DASHBOARD_PATH = '/home'`
    para cair na `home` da casca após autenticar.

12. **Dependências:** ajuste o `package.json` para o subconjunto do shell
    (ver `docs/shell-kit.md`). Rode **`npm install --legacy-peer-deps`** (a flag é
    obrigatória: `@ant-design/icons-angular@20` conflita com Angular 21 no
    template — `npm install` puro falha com `ERESOLVE`).

13. **Valide:** `npm run lint` e `ng build` (ou `ng serve`). Acesse `/home`: deve
    mostrar barra superior + menu vazio retrátil + centro vazio. Corrija erros de
    build/lint — normalmente referências órfãs a demos removidos.

Não introduza libs novas além das do Mantis. Reporte os arquivos criados,
removidos e editados, e a rota inicial.
