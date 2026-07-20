# Revisão da camada app — lógica de componentes → services

Data: 2026-07-19. Objetivo: identificar lógica que hoje vive em componentes e deveria estar em services, deixando os componentes focados na interação com o usuário. **Comportamento preservado** como restrição absoluta.
Rede de segurança: `npm run test` entre cada extração; um refactor por commit.

Convenções a respeitar:

- Services da camada app mantêm o sufixo `Service` e arquivo `*.service.ts` (a regra "sem sufixo Service" vale só para o domínio `@multicalc`).
- Services de página ficam co-locados com a página (ex.: [speed-match.service.ts](src/app/pages/speed-calc/speed-match.service.ts)); services de feature co-locados com a feature (ex.: [teams.service.ts](src/app/features/team/teams.service.ts)); services app-wide em [src/app/services/](src/app/services/).
- Estado compartilhado por página → service **component-provided** (padrão já usado por `FieldStore`, `AutomaticFieldService`, `MobileTableOverlayService`, `DamageResultOrderService` no array `providers` das páginas).
- Regra do projeto: preferir eventos a `effect()`; onde o effect for inevitável, ele deve virar uma linha que delega ao service.

Legenda de esforço/risco: 🟢 mecânico e seguro · 🟠 exige atenção · 🔴 direcional (avaliar custo/benefício antes)

---

## 1. Duplicações grandes prontas para extração

### 1.1 🟢 Sessão de otimização de EVs → `EvOptimizationService` (component-provided)

A maior duplicação da camada. O fluxo completo (guardar EVs/nature originais → chamar `DefensiveEvOptimizer` → aplicar no store → apply/discard/reset) está copiado em **4 componentes**, e o `SimpleCalcComponent` o duplica internamente para left/right:

- [simple-calc.component.ts:157-229](src/app/pages/simple-calc/simple-calc/simple-calc.component.ts#L157-L229) (×2, left/right) + sinais em 46-57
- [simple-calc-mobile.component.ts:174-221](src/app/pages/simple-calc/simple-calc-mobile/simple-calc-mobile.component.ts#L174-L221)
- [multi-calc.component.ts:242-287](src/app/pages/multi-calc/multi-calc/multi-calc.component.ts#L242-L287)
- [multi-calc-mobile.component.ts:521-564](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L521-L564)

Agravantes:

- O effect de invalidação ("se os EVs mudaram por fora, descarta a otimização pendente") também está triplicado: [simple-calc.component.ts:80-114](src/app/pages/simple-calc/simple-calc/simple-calc.component.ts#L80-L114) (×2) e [multi-calc.component.ts:149-169](src/app/pages/multi-calc/multi-calc/multi-calc.component.ts#L149-L169).
- `PokemonBuildComponent` mantém uma **segunda cópia** de `originalEvs`/`originalNature` ([pokemon-build.component.ts:84-85](src/app/features/pokemon-build/pokemon-build/pokemon-build.component.ts#L84-L85), usada em 584-594 e 606-614), ou seja, o mesmo estado vive em dois lugares ao mesmo tempo.

Proposta: service component-provided com os sinais `status`, `optimizedEvs`, `optimizedNature` (privados: `originalEvs`, `originalNature`) e métodos `optimize(defenderId, targets, rollIndex, options)`, `apply()`, `discard()`, `reset()` e `invalidateIfChangedExternally(pokemon)`. Cada página instancia um (SimpleCalc desktop instancia dois, um por lado — resolve o left/right sem duplicar código). `PokemonBuildComponent`/`PokemonBuildMobileComponent` passam a só emitir eventos, sem guardar estado próprio de otimização.

Local sugerido: `src/app/features/pokemon-build/ev-optimization.service.ts` (é a feature dona do painel de otimização).
Estimativa: ~300 linhas duplicadas removidas.

### 1.2 🟢 Rastreamento de mudança de Pokémon/ability → dentro do `AutomaticFieldService`

O padrão "compara `lastHandledPokemonName`/`lastHandledAbilityName` com o atual e chama `checkAutomaticField`" está copiado em **6 componentes**:

- [simple-calc.component.ts:59-78](src/app/pages/simple-calc/simple-calc/simple-calc.component.ts#L59-L78)
- [simple-calc-mobile.component.ts:106-135](src/app/pages/simple-calc/simple-calc-mobile/simple-calc-mobile.component.ts#L106-L135)
- [multi-calc.component.ts:84-130](src/app/pages/multi-calc/multi-calc/multi-calc.component.ts#L84-L130)
- [multi-calc-mobile.component.ts:120-145](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L120-L145)
- [speed-calc-mobile.component.ts:124-154](src/app/pages/speed-calc/speed-calc-mobile/speed-calc-mobile.component.ts#L124-L154)
- speed-calc desktop (mesmo padrão)

O rastreamento é responsabilidade do próprio `AutomaticFieldService` (já component-provided em todas essas páginas). Proposta: mover os campos `lastHandled*` para dentro dele e expor `handlePokemonChange(first, second?)` que detecta a mudança internamente e retorna flags `{ firstChanged, secondChanged }` (o multi-calc precisa delas para o best-move — ver 1.3). O effect de cada componente vira 2-3 linhas.

### 1.3 🟠 Orquestração de resultados do multi-calc → `MultiCalcResultsService` (component-provided)

`MultiCalcComponent` e `MultiCalcMobileComponent` duplicam todo o pipeline de cálculo:

- `countTargetsWithSpecificCalc`: [multi-calc.component.ts:51-56](src/app/pages/multi-calc/multi-calc/multi-calc.component.ts#L51-L56) e [multi-calc-mobile.component.ts:217-222](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L217-L222)
- `multiCalcMode` computed: [multi-calc.component.ts:44-48](src/app/pages/multi-calc/multi-calc/multi-calc.component.ts#L44-L48) e [multi-calc-mobile.component.ts:210-214](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L210-L214)
- `multiCalc`/`calculateResults`/`damageResults` (+ ordenação via `DamageResultOrderService`): [multi-calc.component.ts:57-75](src/app/pages/multi-calc/multi-calc/multi-calc.component.ts#L57-L75) e [multi-calc-mobile.component.ts:224-242](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L224-L242)
- `activateBestMoveForAllTargets`: [multi-calc.component.ts:189-199](src/app/pages/multi-calc/multi-calc/multi-calc.component.ts#L189-L199) e [multi-calc-mobile.component.ts:147-155](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L147-L155)

Proposta: service component-provided em `src/app/pages/multi-calc/` que injeta `CalcStore`, `MenuStore`, `FieldStore` e `DamageResultOrderService`, expõe `damageResults` (computed já ordenado), `multiCalcMode`, `targetsWithSpecificCalc` e `activateBestMoveForAllTargets(attacker?)`. Os dois componentes consomem os computeds e disparam o best-move em resposta aos eventos/flags de 1.2.
🟠 porque envolve mover computeds encadeados — validar com os specs de `damage-result-order` e testes de página existentes.

### 1.4 🟢 Mobile reimplementa o que `@multicalc/target-list` já resolve

O desktop ([target-pokemon.component.ts](src/app/pages/multi-calc/target-pokemon/target-pokemon.component.ts)) já usa `addMember`, `combineAttackers`, `separateAttackers`, `excludeMetaData` do domínio. O mobile reimplementa tudo à mão, com mutação direta de `Target`:

- `drop` (combinar atacantes, com mutação `target.secondPokemon = active.pokemon`): [multi-calc-mobile.component.ts:753-772](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L753-L772) → `combineAttackers` (a regra extra de distância mínima de 80px fica no componente, que é interação)
- `separateAttackers`: [multi-calc-mobile.component.ts:774-784](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L774-L784) → `separateAttackers` do domínio
- `targetsExcludingMetaData`: [multi-calc-mobile.component.ts:496-515](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L496-L515) → `excludeMetaData`
- `onTargetsImported` (loop com `new Target(p)`): [multi-calc-mobile.component.ts:459-474](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L459-L474) → `addMember`

Não cria service novo — deleta código trocando por chamadas ao domínio. Ganho imediato de consistência (o caminho desktop é o testado).

### 1.5 🟠 Fluxo de meta regulation → service compartilhado

`onMetaClick` (toggle add/remove meta + abertura do `MetaRegulationModalComponent`), `applyMeta`, `removeAll`, `exportPokemon` e `exportCalcs` estão duplicados entre:

- [target-pokemon.component.ts:150-228](src/app/pages/multi-calc/target-pokemon/target-pokemon.component.ts#L150-L228)
- [multi-calc-mobile.component.ts:411-494](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L411-L494)

Proposta: `TargetsMetaService` em `src/app/pages/multi-calc/` (pode ser root, não guarda estado próprio além do que já está no store) com `toggleMeta(onApplied)`, `applyMeta(regulation)`, `removeAllTargets()`, `exportTargets()`, `exportCalcs(results)`. Segue o molde do `TeamsService`, que já centraliza diálogo+export+store para times. As pequenas diferenças entre desktop e mobile (snackbar "Pokémon removed" só no desktop, ativação do membro após remover) ficam nos callbacks/parâmetros.

### 1.6 🟢 Filtros de resultados + matching de custom sets → service ou classe de apresentação

`setNameByPokemonId` (matching de custom set com `pokemonToState`+`setsMatch`), `availableSetNames`, `targetPokemonNames`, `filteredDamageResults`, `teamNames` e os quatro computeds de habilitação de filtro estão idênticos em:

- [target-pokemon.component.ts:88-146](src/app/pages/multi-calc/target-pokemon/target-pokemon.component.ts#L88-L146) e [268-306](src/app/pages/multi-calc/target-pokemon/target-pokemon.component.ts#L268-L306)
- [multi-calc-mobile.component.ts:244-360](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L244-L360)

Proposta: `DamageResultFiltersService` component-provided em `src/app/pages/multi-calc/`, dono dos sinais `cardsFilter`/`setFilter`/`teamFilter` e dos computeds derivados (recebe `damageResults` e `isAttacker` como inputs via método `connect(...)` ou sinais setáveis). Conforme decisão registrada do projeto, custom set/matching e ordenação/filtragem de resultados são responsabilidade da app — service de app é o lugar certo, não `@multicalc`.
Estimativa: ~110 linhas duplicadas removidas.

---

## 2. Scaffolding das 5 páginas mobile

As cinco páginas mobile (multi-calc, simple-calc, probability-calc, speed-calc, type-calc) repetem quatro blocos quase idênticos. É a maior massa de código repetido da camada (~250 linhas por página).

### 2.1 🟠 Controller de seleção via overlay → estender `MobileTableOverlayService`

O bloco `justOpenedTable` + `onPokemonMouseDown/Click/Input/Selected` + `onItem*` + `onMove*` + `onAbility*` + `onClose*Table` + `onTableSelect` se repete nas 5 páginas:

- [multi-calc-mobile.component.ts:566-746](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L566-L746)
- [simple-calc-mobile.component.ts:227-361](src/app/pages/simple-calc/simple-calc-mobile/simple-calc-mobile.component.ts#L227-L361)
- [probability-calc-mobile.component.ts:157-309](src/app/pages/probability-calc/probability-calc-mobile/probability-calc-mobile.component.ts#L157-L309)
- [speed-calc-mobile.component.ts:157-281](src/app/pages/speed-calc/speed-calc-mobile/speed-calc-mobile.component.ts#L157-L281)
- [type-calc-mobile.component.ts:143-288](src/app/pages/type-calc/type-calc-mobile/type-calc-mobile.component.ts#L143-L288)

O [MobileTableOverlayService](src/app/features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.service.ts) hoje só guarda `kind`+`filter`. Proposta em duas partes:

1. **Interação com o input** (mousedown/click/blur/limpar valor): extrair para uma **directive** (`appOverlayTableInput`) que encapsula `justOpenedTable`, o clear-on-click e o restore-on-close — é comportamento de DOM, directive é o encaixe natural.
2. **Efeito da seleção** (escrever no store e fechar): estender o service com `handleSelect(event: TableSelectEvent, editingId: string)` cobrindo o caminho comum (`loadPokemonInfo`/`updateMove`/`ability`/`item` + `close`). Os desvios de cada página (adicionar ao time/targets quando `addingPokemon`/`addingTarget`) permanecem no componente, interceptando antes de delegar.

🟠 porque é código de interação sensível a regressão visual — fazer uma página por commit, começando pela mais simples (type-calc), e conferir no browser além dos testes.

### 2.2 🟢 Tabs inferiores + preservação de scroll + back navigation → `MobileTabsService`

`switchTab` com `scrollPositions: Map` + `backNavigation.push/pop` + restore com `setTimeout` está copiado nas 5 páginas ([multi-calc-mobile.component.ts:817-839](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L817-L839), [simple-calc-mobile.component.ts:363-385](src/app/pages/simple-calc/simple-calc-mobile/simple-calc-mobile.component.ts#L363-L385), [probability-calc-mobile.component.ts:117-140](src/app/pages/probability-calc/probability-calc-mobile/probability-calc-mobile.component.ts#L117-L140), [speed-calc-mobile.component.ts:300-321](src/app/pages/speed-calc/speed-calc-mobile/speed-calc-mobile.component.ts#L300-L321), [type-calc-mobile.component.ts:99-122](src/app/pages/type-calc/type-calc-mobile/type-calc-mobile.component.ts#L99-L122)), variando apenas o nome das tabs e qual é a "home" (a que faz `pop`).

Proposta: `MobileTabsService<T extends string>` component-provided (em `src/app/services/` ou junto do layout mobile) configurado com `initialize(homeTab, scrollContainer)`, expondo `activeTab` (signal) e `switchTab(tab)`. O registro do handler de back (`backNavigation.register(...)`) e o `unregister` no destroy também entram no service, eliminando o `OnDestroy` repetido.

### 2.3 🟢 Computeds de edição de Pokémon → `PokemonEditingService` (component-provided)

`pokemonOnEditId` + `activePokemonId` + `effectiveEditingId` + `editingPokemon` + `editingPokemonName` (com `SELECT_POKEMON_LABEL`) + `editingPokemonItem` + `editingMoveIndex` + `onHeaderImport` se repetem nas 5 páginas mobile e parcialmente em [team-tabs-mobile.component.ts:41-51](src/app/features/team/team-tabs-mobile/team-tabs-mobile.component.ts#L41-L51). Há duas variantes de `activePokemonId` (com e sem exclusão do `secondAttackerId`) — parametrizar com um flag na criação.

Proposta: service component-provided dono desse estado+derivações; `TeamTabsMobileComponent` e `PokemonBuildMobileComponent` passam a receber o service (ou continuam com `model()` sincronizado pela página — decidir na implementação; a primeira opção elimina o vai-e-vem de `pokemonOnEditId` entre página e filhos).

### 2.4 🟢 Registro do ícone pokeball → uma vez, no bootstrap

`iconRegistry.addSvgIcon("pokeball", ...)` está no construtor das 5 páginas mobile (ex.: [multi-calc-mobile.component.ts:99-101](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L99-L101)). Registrar uma única vez — em `AppComponent` ou num provider de inicialização — e apagar as 5 cópias.

---

## 3. Feature team

### 3.1 🟠 Seleção de atacante/segundo atacante (malabarismo de 6 booleans)

A tradução "quero ativar X (e manter Y como segundo)" → `updateTeamMembersActive(a1..a6)` está espalhada e duplicada:

- [team.component.ts:167-197](src/app/features/team/team/team.component.ts#L167-L197) (`selectedPokemon` / `selectedPokemonRemovingSecond`)
- [team-tabs-mobile.component.ts:98-123](src/app/features/team/team-tabs-mobile/team-tabs-mobile.component.ts#L98-L123) (long-press p/ combinar) e [170-206](src/app/features/team/team-tabs-mobile/team-tabs-mobile.component.ts#L170-L206) (`setActivePokemon`)

Proposta: expor intenção no `TeamsService` (ou no próprio `CalcStore`, já que é manipulação de estado): `activateMember(pokemonId)` e `activateAttackerPair(mainId, secondId)`, que computam os 6 booleans internamente. Os componentes ficam só com o gesto (click/long-press). A API `updateTeamMembersActive(6 args)` vira detalhe interno.

### 3.2 🟠 Remoção/duplicação de membro e escolha do próximo selecionado → `TeamsService`

- [team-tabs-mobile.component.ts:221-268](src/app/features/team/team-tabs-mobile/team-tabs-mobile.component.ts#L221-L268): `removeActivePokemon` decide se o id é target ou membro, remove, escolhe o próximo a selecionar e notifica — ~50 linhas de política de negócio num componente de tabs.
- [team.component.ts:203-232](src/app/features/team/team/team.component.ts#L203-L232): `duplicatePokemon`/`removePokemon` desktop com política própria (via `Team.removeMember`/`duplicateMember`).

Proposta: mover para o `TeamsService` (que já concentra add/delete/import de times): `removeMember(pokemonId): nextSelectedId`, `removeTarget(pokemonId): nextSelectedId`, `duplicateMember(pokemonId)`. Unificar as duas políticas de "quem fica selecionado depois" (hoje desktop e mobile divergem sutilmente — documentar a escolhida no spec do service).

---

## 4. Outros pontos

### 4.1 🟠 `PokemonBuildComponent` (615 linhas): máquina de foco + commit-on-blur

- 10 sinais `*HasFocus` + `removeFocusFromAllFields` ([pokemon-build.component.ts:516-527](src/app/features/pokemon-build/pokemon-build/pokemon-build.component.ts#L516-L527)) + `activeTable` formam uma máquina de estados implícita.
- O padrão "perdeu foco com filtro digitado → aplica o primeiro da lista" está repetido 4× (moves [383-402](src/app/features/pokemon-build/pokemon-build/pokemon-build.component.ts#L383-L402), ability [438-443](src/app/features/pokemon-build/pokemon-build/pokemon-build.component.ts#L438-L443), item [463-468](src/app/features/pokemon-build/pokemon-build/pokemon-build.component.ts#L463-L468), pokemon [495-514](src/app/features/pokemon-build/pokemon-build/pokemon-build.component.ts#L495-L514)).
- `focusNextTabIndex` ([364-381](src/app/features/pokemon-build/pokemon-build/pokemon-build.component.ts#L364-L381)) faz `document.querySelector` — acesso direto ao DOM global.

Proposta: `BuildFocusService` component-provided com `focusedField` (um único signal em vez de 10 booleans) e `activeTable`; helper único `commitFilterOnBlur(kind, filter, firstFromList)`. É o refactor de maior toque em interação — deixar por último e validar manualmente cada campo. 🔴 se for feito de uma vez; 🟠 se por partes (primeiro o commit-on-blur, depois o foco).

### 4.2 🟠 Type-calc: lógica de classificação/apresentação duplicada desktop/mobile

Os pares desktop/mobile de type-calc são cópias quase literais (diff de `type-coverage-insights` vs `-mobile` = só imports/selector). A lógica que os infla:

- `getPokemonCategory` e `getPokemonExplanation` ([type-coverage-insights.component.ts:78-115](src/app/pages/type-calc/type-coverage-insights/type-coverage-insights.component.ts#L78-L115), [165-203](src/app/pages/type-calc/type-coverage-insights/type-coverage-insights.component.ts#L165-L203)) — classificação derivada dos dados do domínio; candidata a método do próprio `TypeCoverageInsights` (`@multicalc/type-calc`), seguindo a diretriz de domínio rico.
- `transposedCoverageData` ([offensive-coverage.component.ts:49-92](src/app/pages/type-calc/offensive-coverage/offensive-coverage.component.ts#L49-L92)) — transformação de dados pura; mover para `TypeCoverage` no domínio.
- Obs.: os componentes instanciam o domínio com `new TypeCoverageInsights()` / `new TypeCoverage()` em cada componente — ao mover a lógica, avaliar unificar a instância.

Com a lógica no domínio, cada par desktop/mobile fica fino o suficiente para (num passo separado e opcional 🔴) fundir em um componente com `isMobile` input — o `type-coverage-insights` desktop já tem esse input.

### 4.3 🟢 Regra de clamp de EVs/SPs no `EvSliderComponent` → domínio

`adjustEv`, `evsExceed` e `maxAvailableEv` ([ev-slider.component.ts:274-289](src/app/features/pokemon-build/ev-slider/ev-slider.component.ts#L274-L289), [146-149](src/app/features/pokemon-build/ev-slider/ev-slider.component.ts#L146-L149)) implementam a regra de negócio "novo EV não pode estourar 66 SPs; se estourar, clampa no restante". Isso pertence a `@multicalc/utils/ev-sp-converter` (ex.: `clampEvToRemainingSps(evs, stat, newEv)`), testável em unit puro. O posicionamento de jumps no slider (306-338) é UI e fica.

### 4.4 🟢 Interações de scroll/drag do multi-calc-mobile → directives (não services)

- Auto-scroll durante drag ([multi-calc-mobile.component.ts:889-948](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L889-L948), ~60 linhas com `requestAnimationFrame`) → directive `appDragAutoScroll`.
- Esconder bottom-nav no scroll ([876-887](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L876-L887)) → directive ou fica (pequeno).

São interação pura de DOM — o ganho é tirar ruído do componente de 949 linhas, não reuso imediato.

---

## 5. O que já está bom (não mexer)

- **Páginas de probability-calc** (general/combined/pokemon/team-probability): finas, delegam ao domínio. Modelo a seguir.
- **[teams.service.ts](src/app/features/team/teams.service.ts)**, **[speed-match.service.ts](src/app/pages/speed-calc/speed-match.service.ts)**, **[mega-stone.service.ts](src/app/features/pokemon-build/utils/mega-stone.service.ts)**, **[damage-result-order.service.ts](src/app/services/damage-result-order.service.ts)**, **[table-data-filter.service.ts](src/app/features/pokemon-build/tables/filterable-table/table-data-filter.service.ts)** — exemplos corretos do padrão desejado; as extrações acima devem imitá-los.
- **Componentes de type-calc**: a maior parte já delega para `TypeCoverage`/`TypeCoverageInsights`; só sobrou a camada fina do item 4.2.
- **`PokemonBuildMobileComponent`**: os computeds de stats modificados delegam para `@multicalc/stat-calc`; ok.
- **`calc-store.ts` (883 linhas)**: fora do escopo desta revisão (componentes→services). Se crescer, vale revisão própria à luz de "keep stores simple".

---

## Ordem sugerida de execução

| # | Item | Risco | Dependências |
|---|------|-------|--------------|
| 1 | 2.4 ícone pokeball | 🟢 | — |
| 2 | 1.4 reuso de target-list no mobile | 🟢 | — |
| 3 | 1.2 tracking no AutomaticFieldService | 🟢 | — |
| 4 | 1.1 EvOptimizationService | 🟢 | — |
| 5 | 4.3 clamp de EVs no domínio | 🟢 | — |
| 6 | 1.3 MultiCalcResultsService | 🟠 | 1.2 |
| 7 | 1.6 DamageResultFiltersService | 🟢 | 1.3 (usa damageResults) |
| 8 | 1.5 TargetsMetaService | 🟠 | 1.4 |
| 9 | 2.2 MobileTabsService | 🟢 | — |
| 10 | 2.3 PokemonEditingService | 🟢 | — |
| 11 | 2.1 overlay controller + directive | 🟠 | 2.3 |
| 12 | 3.1 seleção de atacantes | 🟠 | — |
| 13 | 3.2 remoção/duplicação no TeamsService | 🟠 | 3.1 |
| 14 | 4.2 type-calc → domínio | 🟠 | — |
| 15 | 4.4 directives de scroll/drag | 🟢 | — |
| 16 | 4.1 BuildFocusService | 🔴 | 2.1 |

Cada item = 1 commit, `npm run test` verde entre eles. Itens 🟠/🔴 de interação (2.1, 4.1) pedem verificação manual no browser além dos testes.

Resultado esperado: `MultiCalcMobileComponent` cai de ~949 para ~350-400 linhas; `SimpleCalcComponent` de 230 para ~100; as 5 páginas mobile perdem ~250 linhas cada de scaffolding repetido; componentes passam a conter apenas gestos do usuário + bindings.
