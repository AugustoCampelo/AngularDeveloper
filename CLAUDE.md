# CLAUDE.md — Ambiente de geração de UI Angular (Template Mantis)

Este repositório configura o Claude para **gerar telas Angular** sobre o
template proprietário **Mantis (CodedThemes) — versão Bootstrap/ng-bootstrap**.
A configuração é **replicável**: copie a pasta `.claude/`, o `CLAUDE.md` e a
pasta `docs/` para qualquer projeto que use esse template.

> Sempre responda ao usuário em **português**. No **código**, use
> identificadores em **inglês** (seguindo o template); comentários podem ser
> curtos e em inglês, no mesmo estilo do template.

## O que você faz aqui

Você cria interfaces de usuário (telas, componentes, formulários, tabelas,
dashboards) em Angular + TypeScript, reaproveitando os controles já prontos do
Mantis. Você **não** reinventa controles: usa `<app-card>`, ng-bootstrap,
ApexCharts, ícones Ant Design e os componentes/serviços compartilhados que já
existem.

## Stack (não troque sem pedir)

- **Angular standalone** (bootstrap via `bootstrapApplication`, `inject()`,
  signals: `signal()`, `input()`, e em telas novas o `@angular/forms/signals`).
- **UI:** Bootstrap + **ng-bootstrap** (`@ng-bootstrap/ng-bootstrap`). **Não é
  Angular Material.**
- **Ícones:** `@ant-design/icons-angular` via `IconService`.
- **Gráficos:** ApexCharts (`ng-apexcharts`). **Tabelas:** ng-bootstrap / ag-grid.
- **Notificações:** `ngx-toastr`, SweetAlert2. **i18n:** `@ngx-translate`.
- **HTTP:** `provideHttpClient` + interceptors (`BasicAuthInterceptor`,
  `ErrorInterceptor`). **Auth:** `AuthGuardChild` + enum `Role`.

Detalhes e imports exatos: **`.claude/rules/stack-mantis.md`**.

## Regras inegociáveis

1. **Arquitetura MVC adaptada ao Angular** — Model (tipos/serviços/estado),
   View (HTML/SCSS), Controller (classe do componente + service de feature).
   Ver **`.claude/rules/arquitetura.md`**.
2. **Estilo de código** consistente com o template (naming, organização de
   imports, standalone, `inject()`). Ver **`.claude/rules/estilo-codigo.md`**.
3. **Patterns do GoF** aplicados de forma idiomática (Facade, Observer,
   Strategy, Adapter, Singleton, Factory…). Ver **`.claude/rules/patterns-gof.md`**.
4. **Antes de criar qualquer tela**, consulte os exemplos padrão-ouro em
   **`docs/exemplos/README.md`** e o código real em `template-reference/`.

## Fluxo recomendado para uma nova tela

1. Identifique o **arquétipo** (lista/CRUD, formulário, dashboard, detalhe,
   wizard) e o exemplo padrão-ouro correspondente em `docs/exemplos/`.
2. Releia o(s) arquivo(s) reais em `template-reference/` antes de escrever.
3. Gere a feature seguindo a estrutura de pastas de `arquitetura.md`.
4. Reuse controles compartilhados; não crie estilos do zero sem necessidade.
5. Rode lint/format e ajuste (`npm run lint`, build se aplicável).

Comandos úteis: `/nova-tela <nome>` e `/novo-componente <nome>`.

## `template-reference/`

Cópia enxuta do `src/` do Mantis (sem binários), usada **somente como
referência de leitura** para você imitar os padrões reais. Não é compilada e
**não** deve ser copiada para os projetos finais. Pode ser removida quando os
exemplos em `docs/exemplos/` já cobrirem suas necessidades.
