# template-reference/ — referência de leitura (NÃO compilar, NÃO copiar)

Cópia **enxuta** do `src/` do template **Mantis (CodedThemes) — Bootstrap/
ng-bootstrap**, mantida apenas como **referência de leitura** para o Claude
imitar os padrões reais (arquitetura, estilo, uso de controles).

## Importante

- **Não** é compilada e **não** faz parte de nenhum app. Imports podem estar
  "quebrados" fora do contexto original — tudo bem, serve só para leitura.
- **Não edite** nada aqui (protegido em `.claude/settings.json`).
- **Não copie** esta pasta para projetos de produção (é um template comercial;
  respeite a licença CodedThemes).
- Pode ser **removida** quando os exemplos em `docs/exemplos/` já cobrirem as
  necessidades do time.

## O que foi removido do upload original (apenas binários, ~42 MB)

- `assets/images/` (imagens), `scss/fonts/` (fontes), `favicon.ico`,
  `fake-data/` (mocks JSON), `web.config`.

Todo o **código** (`.ts`, `.html`, `.scss`), os SCSS de tema/settings e os
`assets/i18n` foram preservados — é o catálogo vivo de como o template usa cada
controle.

## Pontos de partida para leitura

- `app/app-routing.module.ts`, `app/app-config.ts`, `main.ts` — bootstrap e rotas.
- `app/theme/shared/` — componentes/serviços compartilhados (os "controles").
- `app/theme/layout/` — layouts (admin/guest/simple).
- `app/demo/admin-panel/helpdesk/helpdesk-customer/` — feature CRUD padrão-ouro.

Veja o mapa completo em `../docs/exemplos/README.md`.
