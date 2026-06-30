# Patterns do GoF aplicados ao Angular/Mantis

Aplique patterns **quando resolvem um problema real**, não por enfeite. Cada um
abaixo já aparece no `template-reference/` — prefira reusar o jeito que o
template faz. Para cada pattern: *quando usar → exemplo no template → como
aplicar*.

## Facade ⭐ (o mais importante aqui)
- **Quando:** sempre que um componente precisa de estado/lógica não-trivial.
- **Exemplo:** `helpdesk-customer.service.ts` expõe `customers$`, `total$`,
  `loading$` e setters (`page`, `searchTerm`, `sortColumn`) escondendo busca,
  filtro, ordenação e paginação.
- **Como:** o `*.component.ts` (Controller) só injeta o service e faz binding. A
  complexidade fica atrás da fachada do service.

## Observer ⭐
- **Quando:** estado que muda ao longo do tempo e a View precisa reagir.
- **Exemplo:** `BehaviorSubject`/`Subject` + `asObservable()` no service de
  feature; a View consome com `| async`.
- **Como:** exponha `Observable`/signals; nunca exponha o `Subject` cru.

## Strategy
- **Quando:** algoritmo intercambiável (ordenação, validação, formatação) ou
  comportamento plugável por contexto.
- **Exemplo:** funções `sort()`/`compare()` no service; **HTTP interceptors**
  (`BasicAuthInterceptor`, `ErrorInterceptor`) como estratégias de tratamento.
- **Como:** isole o algoritmo em função/serviço injetável e selecione em runtime.

## Adapter
- **Quando:** integrar uma API externa ao formato esperado pelo app.
- **Exemplo:** `CustomTranslateLoader` adapta a fonte de traduções ao contrato
  `TranslateLoader` do ngx-translate.
- **Como:** crie uma classe que implemente a interface esperada e traduza
  chamadas para a lib externa.

## Singleton
- **Quando:** um único ponto de estado/serviço compartilhado.
- **Exemplo:** serviços `@Injectable({ providedIn: 'root' })`
  (`AuthenticationService`).
- **Como:** `providedIn: 'root'`. Para escopo por-tela, declare em
  `providers: []` do componente (instância dedicada).

## Factory / Factory Method
- **Quando:** criar objetos/provedores condicionalmente.
- **Exemplo:** `TranslateModule.forRoot({ loader: { provide, useClass } })`;
  `loadComponent`/`loadChildren` como fábricas de módulos lazy.
- **Como:** use providers com `useClass`/`useFactory`; evite `new` espalhado.

## Decorator
- **Quando:** acrescentar comportamento sem alterar a classe base.
- **Exemplo:** decorators do Angular (`@Component`, `@Injectable`,
  `@Directive`); interceptors que “embrulham” cada request HTTP.
- **Como:** prefira interceptors/diretivas a herança para cross-cutting concerns.

## Template Method
- **Quando:** esqueleto fixo com passos variáveis.
- **Exemplo:** ciclo de vida (`ngOnInit`, `ngOnDestroy`) — o Angular define o
  fluxo, você preenche os passos.
- **Como:** implemente os hooks; não tente controlar a ordem manualmente.

## Composite
- **Quando:** árvore de componentes/itens tratada de forma uniforme.
- **Exemplo:** projeção de conteúdo do `<app-card>` (`#headerTemplate`,
  `#footerTemplate`) e composição container → presentational.
- **Como:** componha componentes pequenos; use `ng-content`/`TemplateRef`.

## Command (use com parcimônia)
- **Quando:** ações encapsuladas, fila/undo, dispatch desacoplado.
- **Como:** métodos do service representando ações; em apps maiores, considere
  um store. **Não** introduza NgRx/store sem autorização — pergunte antes.

---

### Princípio geral
Reuse o pattern que o template já usa para aquele problema. Se for tentado a
introduzir um pattern/lib de estado novo (NgRx, etc.), **pergunte ao usuário
antes** — ver as decisões em aberto no README.
