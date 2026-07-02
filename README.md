# Configuração Claude — UI Angular sobre o Template Mantis

Pacote de configuração **replicável** que ensina o Claude (Claude Code) a gerar
interfaces de usuário em **Angular + TypeScript** sobre o template proprietário
**Mantis (CodedThemes) — versão Bootstrap/ng-bootstrap**, seguindo:

- **Arquitetura MVC** adaptada ao idioma Angular;
- **Boas práticas de estilo** consistentes com o template;
- **Patterns do GoF** aplicados de forma idiomática.

## O que tem aqui

| Caminho | Função |
|---|---|
| `CLAUDE.md` | Memória principal (carregada automaticamente). Stack + regras + fluxo. |
| `.claude/rules/arquitetura.md` | MVC adaptado + estrutura de pastas por feature. |
| `.claude/rules/estilo-codigo.md` | Naming, imports, standalone, signals, lint. |
| `.claude/rules/stack-mantis.md` | Libs, `<app-card>`, ng-bootstrap, ícones, layouts. |
| `.claude/rules/patterns-gof.md` | Quando/como aplicar cada pattern do GoF. |
| `.claude/agents/ui-builder.md` | Subagente especialista em criar telas. |
| `.claude/commands/tela-inicial.md` | Comando `/tela-inicial` (casca inicial em branco). |
| `.claude/commands/nova-tela.md` | Comando `/nova-tela <nome>`. |
| `.claude/commands/novo-componente.md` | Comando `/novo-componente <nome>`. |
| `.claude/settings.json` | Permissões (lint/build/generate) e proteção do reference. |
| `docs/exemplos/README.md` | Mapa de arquétipos → exemplos reais do template. |
| `docs/shell-kit.md` | Manifesto da casca inicial (manter/remover/editar + dependências). |
| `docs/inicializando-tela-inicial.md` | Passo a passo para testar `/tela-inicial` no VSCode. |
| `skeleton/` | **Modelos canônicos** do esqueleto (menu vazio, home, rotas, styles, login PT-BR) aplicados pelo `/tela-inicial`. |
| `template-reference/` | Cópia enxuta do `src/` do Mantis, **só para leitura**. |

## Como usar neste repositório

- `/tela-inicial` — gera a casca em branco (barra superior + menu retrátil vazio + centro vazio).
- `/nova-tela clientes crud` — gera uma tela de listagem/CRUD.
- `/novo-componente kpi-card` — gera um componente de apresentação.
- Ou peça em linguagem natural; o subagente `ui-builder` é acionado para telas.

## Como replicar em outro projeto

1. Copie para a raiz do projeto-alvo:
   - `CLAUDE.md`
   - a pasta `.claude/`
   - a pasta `docs/`
   - a pasta `skeleton/` (modelos do esqueleto usados pelo `/tela-inicial`)
2. **Não** copie `template-reference/` para projetos de produção — ela existe só
   como base de referência aqui. Se o projeto-alvo já é um app Mantis real, o
   Claude usa o próprio `src/` do projeto como referência viva.
3. Ajuste, se necessário, os caminhos em `.claude/settings.json` (a regra de
   `template-reference` só faz sentido neste repo de configuração).
4. Confirme a stack do projeto-alvo (mesma versão de Angular/Mantis) e atualize
   `stack-mantis.md` se houver divergência.

> Evolução futura: esta configuração pode ser empacotada como **plugin do Claude
> Code** para distribuição/versionamento centralizado. Por ora, o método é
> copiar os arquivos acima.

## Decisões em aberto (a confirmar com o time)

Estas afetam as regras e foram assumidas com base no próprio template; ajuste se
necessário:

- **Distribuição:** hoje por cópia (repo template). Migrar para plugin depois?
- **Gerência de estado:** services RxJS + signals (padrão do template). Adotar
  NgRx/Signal Store em telas complexas?
- **Formulários:** Reactive Forms por padrão, signal forms em telas novas.
- **Testes:** gerar testes (Jasmine/Karma) junto de cada tela? (hoje opcional)
- **i18n / dark mode / a11y:** tratados como recomendação; tornar obrigatórios?
- **Idioma do código:** identificadores em inglês (como o template); respostas e
  docs em português.

Veja também os comentários no topo de cada arquivo de regra.
