---
description: Gera uma nova tela/feature Angular no padrão Mantis (MVC, ng-bootstrap, GoF)
argument-hint: <nome-da-feature> [arquetipo: crud|form|dashboard|detalhe|wizard]
---

Crie uma nova tela Angular chamada **$1** para este projeto baseado no template
Mantis (Bootstrap/ng-bootstrap).

Siga rigorosamente, nesta ordem:

1. **Carregue o contexto**: leia `.claude/rules/arquitetura.md`,
   `.claude/rules/estilo-codigo.md`, `.claude/rules/stack-mantis.md` e
   `.claude/rules/patterns-gof.md`. Identifique o **arquétipo** (use o 2º
   argumento se fornecido; senão, infira do pedido) e abra o exemplo
   padrão-ouro correspondente em `docs/exemplos/README.md` + os arquivos reais
   em `template-reference/`.

2. **Verifique reuso**: procure em `theme/shared/components` e
   `theme/shared/service` por controles/serviços já existentes que sirvam.

3. **Gere a feature** com a estrutura de pastas de `arquitetura.md`:
   - `$1.component.ts` (Controller fino, `inject()`, `imports: [SharedModule]`)
   - `$1.component.html` / `.scss` (View, usando `<app-card>` e ng-bootstrap)
   - `$1.service.ts` (Facade + estado Observer/signals)
   - `$1-type.ts` (interfaces) e, se útil, `$1-data.ts` (mock)
   - subcomponentes de apresentação em `components/` quando fizer sentido
   - registre a rota (loadComponent/loadChildren) com `AuthGuardChild` e `roles`

4. **Aplique os patterns do GoF** pertinentes (Facade/Observer no mínimo) sem
   over-engineering.

5. **Finalize**: rode `npm run lint`, corrija apontamentos e relate os arquivos
   criados e a rota.

Se faltar informação essencial (campos, fonte de dados, arquétipo sem exemplo),
**pergunte antes** de gerar. Não introduza libs novas sem autorização.
