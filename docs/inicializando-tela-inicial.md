# Testando o `/tela-inicial` (casca do app) na máquina de desenvolvimento

Passo a passo para validar o comando `/tela-inicial` no **VSCode + plugin do
Claude Code**, na sua máquina. O build **não** é feito no ambiente remoto — é
local.

## O que este teste valida

O `/tela-inicial` **não** cria o layout do zero. Ele parte de uma **cópia do
template Mantis** (que já compila) e a **reduz** à casca: zera o menu lateral,
esvazia a área central, enxuga rotas/estilos/dependências. Portanto o projeto de
teste **começa como uma cópia do Mantis**.

Resultado esperado: **barra superior** + **menu lateral retrátil vazio** +
**área central vazia**.

## Pré-requisitos

- **Node.js 20+** (recomendado 22) e **npm**.
- **Git**.
- **VSCode** com a extensão **Claude Code** instalada e autenticada.
- Uma cópia local do **template Mantis (Bootstrap/ng-bootstrap)** — no exemplo:
  `C:\Development\Angular\Templates\CodedThemes\TemplateMantis`.

> Convenções do exemplo (ajuste às suas pastas):
> - Repo de configuração: `C:\Development\IALab\ClaudeAI\ProjetoUIDeveloper\AngularDeveloper`
> - Projeto de teste: `C:\Development\IALab\ClaudeAI\ProjetoUIDeveloper\shell-test`

---

## 1. Clonar o repositório de configuração (não existe local ainda)

```powershell
# cria a pasta-base e entra nela
New-Item -ItemType Directory -Force "C:\Development\IALab\ClaudeAI\ProjetoUIDeveloper" | Out-Null
cd "C:\Development\IALab\ClaudeAI\ProjetoUIDeveloper"

# clona o repo NA pasta AngularDeveloper
git clone https://github.com/AugustoCampelo/AngularDeveloper.git AngularDeveloper

cd AngularDeveloper
# usa a branch de trabalho (troque por 'main' quando estiver mesclada)
git checkout claude/angular-ui-config-75jzm8
```

Aqui ficam os arquivos que vamos usar: `.claude\`, `CLAUDE.md`, `docs\`.

## 2. Criar o projeto de teste a partir do template Mantis (sem `node_modules`)

```powershell
robocopy "C:\Development\Angular\Templates\CodedThemes\TemplateMantis" ^
         "C:\Development\IALab\ClaudeAI\ProjetoUIDeveloper\shell-test" /E ^
         /XD node_modules dist .git .angular
```

> Copia o template inteiro (que compila) **excluindo** `node_modules`, `dist`,
> `.git`, `.angular`. Faremos `npm install` limpo depois.

## 3. Levar a configuração para dentro do projeto de teste

```powershell
$cfg  = "C:\Development\IALab\ClaudeAI\ProjetoUIDeveloper\AngularDeveloper"
$proj = "C:\Development\IALab\ClaudeAI\ProjetoUIDeveloper\shell-test"

Copy-Item -Recurse -Force "$cfg\.claude"   $proj
Copy-Item          -Force "$cfg\CLAUDE.md" $proj
Copy-Item -Recurse -Force "$cfg\docs"      $proj
```

> **Não** copie `template-reference\` nem `generated\`: o próprio projeto de
> teste já é a fonte Mantis (o Claude lê o `src\` dele). O `docs\shell-kit.md` é
> essencial — o comando o consulta.

## 4. (Opcional) Limpar o `.claude\settings.json`

O `settings.json` tem **3 linhas** com caminhos absolutos do ambiente remoto
(`.../template-reference/...`) — 1 em `allow` e 2 em `deny`. São **inofensivas**
na sua máquina (o caminho não existe, então nunca casam), mas se quiser deixar
limpo, substitua o conteúdo de `shell-test\.claude\settings.json` por:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run lint:*)",
      "Bash(npm run build)",
      "Bash(npm run test:*)",
      "Bash(npm test)",
      "Bash(npx ng generate:*)",
      "Bash(npx ng g:*)",
      "Bash(npx ng lint:*)",
      "Bash(npx eslint:*)",
      "Bash(npx prettier:*)"
    ],
    "deny": []
  }
}
```

Pontos de atenção:
- A última linha do `allow` (`"Bash(npx prettier:*)"`) fica **sem vírgula** no
  final — remover a linha do `Read` deixaria uma vírgula órfã e quebraria o JSON.
- O `deny` vazio (`[]`) é **válido e esperado** — não desativa nada.

## 5. Abrir no VSCode e rodar o comando

```powershell
code "C:\Development\IALab\ClaudeAI\ProjetoUIDeveloper\shell-test"
```

1. Confirme que a extensão **Claude Code** está ativa e logada.
2. Escolha um modelo capaz (recomendado **Opus**).
3. No chat do Claude Code, digite:
   ```
   /tela-inicial home
   ```
4. O Claude vai: ler as regras + `docs/shell-kit.md`, remover `app/demo/**`
   (exceto `home`, login e páginas de erro), zerar `navigation.ts`, criar a
   `home` vazia, enxugar `app-routing.module.ts` e `styles.scss`, e apontar
   ajustes no `package.json`/`angular.json`.

> Dica: peça para ele **mostrar o plano/diff antes de apagar** os demos, para
> você validar a remoção com segurança.

## 6. Revisar o diff e validar o build

```powershell
cd "C:\Development\IALab\ClaudeAI\ProjetoUIDeveloper\shell-test"
npm install
npm run lint
ng serve
```

Abra `http://localhost:4200/home`.

## Checklist de aceite

- [ ] **Barra superior** aparece.
- [ ] **Menu lateral vazio**, mas ainda **retrátil** (botão recolhe/expande).
- [ ] **Área central vazia** (nenhum card/gráfico).
- [ ] `navigation.ts` → `NavigationItems: NavigationItem[] = []`.
- [ ] `npm run lint` passa.
- [ ] `ng serve` compila e `/home` renderiza.

## Solução de problemas

- **Erros de import para telas de demo removidas** (referências órfãs): é
  esperado. Rode `ng build` ou `npm run lint`, cole o erro no chat do Claude Code
  e peça a correção. Normalmente 1–2 rodadas resolvem.
- **`ng serve` não sobe por dependência de demo**: confirme no `angular.json` que
  os `scripts`/`styles` de plugins de demo foram comentados/removidos conforme o
  `docs/shell-kit.md`.
- **Menu não recolhe**: verifique se o `admin-layout` (nav-bar + navigation) foi
  preservado — ele fornece a barra e o comportamento retrátil; só os **itens** do
  menu devem estar vazios.

---

Ao final, traga o retorno (sucesso ou o erro exato) para ajustarmos o comando
`/tela-inicial` e as regras conforme o resultado real do build.
