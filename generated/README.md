# Tela inicial (casca em branco) — projeto Angular novo

Saída do comando `/tela-inicial` para o **Caso B** (projeto vazio). Entrega o
**esqueleto de arranque** de um sistema Mantis, sem conteúdo de demonstração:

- **Barra superior** + **menu lateral retrátil vazio** + **área central vazia**.

## Modelo: reduzir o template, não reconstruir

Num projeto vazio, a casca depende de toda a infraestrutura do Mantis (layout,
`SharedModule`, tema SCSS, bootstrap, dependências). O caminho robusto é **partir
do template Mantis** (que já compila) e **reduzi-lo** à casca. O manifesto
completo de _manter / remover / editar / dependências_ está em
**`../docs/shell-kit.md`**.

## Arquivos autorais desta casca

Estes são os arquivos que você edita/cria (o restante do layout vem do template):

```
generated/shell/
├── navigation.ts             → theme/layout/admin-layout/navigation/navigation.ts   (SUBSTITUI: menu vazio)
├── app-routing.module.ts     → app/app-routing.module.ts                            (SUBSTITUI: rotas enxutas)
├── styles.scss               → src/styles.scss                                       (SUBSTITUI: sem plugins de demo)
├── home/                      → src/app/demo/home/                                    (NOVO: centro vazio)
│   ├── home.component.ts
│   ├── home.component.html
│   └── home.component.scss
└── login/                     → login esqueleto (PT-BR, simplificado)
    ├── auth-login.component.ts    → src/app/demo/pages/authentication/auth-login/    (SUBSTITUI)
    ├── auth-login.component.html  → .../auth-login/                                   (SUBSTITUI)
    ├── auth-login.component.scss  → .../auth-login/                                   (SUBSTITUI)
    └── auth.scss                  → src/app/demo/pages/authentication/auth.scss       (RESTAURA o original)
```

### Login esqueleto (`login/`)

Versão PT-BR/simplificada da tela de login: **sem** abas Admin/User, textos em
português, **só o botão Google** (centralizado), rodapé com **Home** (à esquerda)
e **Contato**. O `auth.scss` aqui é o **original** do Mantis — use-o para
restaurar caso o strip o remova (não fabrique um substituto). O ícone de mostrar/
ocultar senha foi reposicionado via wrapper `.position-relative` (robusto, sem
offset fixo em pixels).

> ⚠️ Os links **"Não possui uma conta?"** (`/register`) e **"Esqueceu a senha?"**
> (`/forgot-password`) apontam para páginas removidas na casca — só o texto foi
> traduzido, conforme pedido. Se for usá-los, re-inclua essas telas; senão,
> transforme-os em placeholder/remova.

## Passo a passo (resumo)

1. Parta de uma cópia do template Mantis como base do projeto novo.
2. Aplique os 4 arquivos acima (menu vazio, rotas enxutas, styles enxuto, home).
3. Remova `app/demo/**` (exceto `home` e as páginas de login/erro referenciadas
   pelas rotas — ver `shell-kit.md`).
4. Ajuste o `package.json` para o subconjunto do shell e `npm install`.
5. `npm run lint` → `ng serve` → acesse `/home`.

## Barra superior + menu retrátil

Continuam vindo do `admin-layout` do Mantis (`nav-bar/` = barra superior;
`navigation/` = menu retrátil). Aqui só **zeramos os dados do menu** — ele segue
retrátil, porém sem itens.

## Observação sobre este repositório

Não copiamos o subsistema de layout do Mantis para dentro de `generated/` (seria
apenas duplicar o `template-reference/`). Os arquivos aqui são só os **autorais**
da casca; o layout/tema/shared vêm da sua base Mantis, conforme o manifesto.
