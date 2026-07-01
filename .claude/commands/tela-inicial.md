---
description: Gera a casca inicial em branco do sistema (barra superior + menu lateral retrátil vazio + área central vazia) no padrão Mantis
argument-hint: [rota-inicial: default home]
---

Gere a **tela inicial (casca em branco)** de um sistema Mantis: o esqueleto de
arranque de um projeto novo, **sem conteúdo de demonstração**.

Resultado esperado:
- **Barra superior** (top bar) presente — vem do `nav-bar` do `admin-layout`.
- **Menu lateral retrátil vazio** — sem itens nem sub-itens.
- **Área central vazia** — nenhum card/gráfico/tabela.

Siga nesta ordem:

1. **Contexto:** leia `.claude/rules/arquitetura.md`, `.claude/rules/estilo-codigo.md`
   e `.claude/rules/stack-mantis.md`. Estude, em `template-reference/`:
   `app/theme/layout/admin-layout/` (composição: `nav-bar` + `navigation` +
   `<router-outlet>`) e `app/theme/layout/admin-layout/navigation/navigation.ts`
   (estrutura de dados do menu, tipo `NavigationItem`).

2. **NÃO recrie** a barra superior nem o comportamento retrátil do menu — eles já
   existem no `admin-layout` de qualquer projeto Mantis. **Reaproveite.** Se o
   projeto-alvo ainda não tiver o `admin-layout`, avise o usuário antes de
   prosseguir (é parte do template, não deve ser reescrito do zero).

3. **Zere o menu:** gere/atualize `navigation.ts` preservando a interface
   `NavigationItem` e definindo `export const NavigationItems: NavigationItem[] = [];`
   (vazio). Inclua um comentário com um exemplo comentado da forma de um item
   (`group` → `collapse` → `item`) para o dev preencher depois. Remova imports
   que ficariam sem uso (mantenha lint limpo).

4. **Área central vazia:** crie um componente `home` (ou `$1`, se informado)
   standalone, fino, `imports: [CommonModule, SharedModule]`, com template
   **vazio** (apenas um contêiner e um comentário indicando onde adicionar
   conteúdo). Sem cards, sem dados, sem service (é uma tela em branco).

5. **Rota:** registre a tela como filho padrão do `AdminLayout` (para herdar barra
   superior + menu), com `canActivateChild: [AuthGuardChild]` e
   `data: { roles: [...] }`. Ex.: `path: 'home'` (ou `''`) → `HomeComponent`.

6. **Finalize:** rode `npm run lint`, corrija apontamentos e relate os arquivos
   criados e a rota. Não introduza libs novas.

Objetivo: entregar um ponto de partida limpo, pronto para o dev começar a
adicionar itens de menu e telas.
