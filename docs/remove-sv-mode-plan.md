# Remoção do modo SV

## Context

O app VGC Multi Calc tem dois "modos": **SV** (Scarlet/Violet, Regulation I) e **Champions** (Regulation MA). Vamos **remover o modo SV por completo**, mantendo o Champions funcionando exatamente como hoje. Objetivos: simplificar componentes, reduzir o bundle e melhorar métricas de Lighthouse.

Restrições do usuário:

- **NÃO apagar os dados SV do localStorage** dos clientes (`userData.sv`). Ficam preservados para um eventual botão de export futuro (não fazer agora). Prática: nunca escrever em `userData.sv`; manter `migrate-user-data.ts` funcionando.
- **Testes Cypress são fase separada e posterior** — não planejados aqui. Eles vão quebrar após a Fase A; isso é esperado.
- **Manter TODA a funcionalidade de Tera Type** (componentes `tera-combo-box`, `terastal-button`, campos `teraType`/`teraTypeActive`, lógica tera em type-coverage). Vai voltar ao Champions depois.
- **Champions deve continuar funcionando igual em todas as etapas.**
- Validação por task: rodar **unit tests afetados + lint**, depois **parar** para validação manual do usuário. Sem build automático, sem Cypress.

## Descoberta crítica de arquitetura (verificada no código)

Os arquivos de dados "SV" **não são deletáveis** — são a **base** sobre a qual o Champions é construído:

- `src/lib/model/pokemon.ts:287` usa `POKEMON_DETAILS` (SV) como primário e `POKEMON_DETAILS_CHAMPIONS` como fallback.
- `src/data/pokemon-details.ts:3` importa de `move-details.ts` (SV) — dados SV são cross-linked.
- `src/lib/model/move.ts:37-45`: `MOVE_DETAILS` (SV) é a base universal; Champions sobrepõe via `MOVE_DETAILS_CHAMPIONS`.
- `src/lib/type-coverage/type-coverage.service.ts:385` usa `MOVE_DETAILS` (SV base).

**Portanto MANTÉM-SE** `pokemon-details.ts`, `move-details.ts`, `movesets.ts` (`SETDEX_SV`) como base do Champions. Consolidação profunda desses dados é a **Fase F (opcional, baixa prioridade, alto risco)**.

Dados/assets que **são** SV-exclusivos e seguros para remover: `speed-statistics-reg-i.ts` (253KB), pasta `assets/sprites/pokemon-sv/` (6.9MB, referenciada só em `sprite.service.ts:9`), chave `AVAILABLE_ITEMS["sv"]`, entradas de regulation `"I"` em `regulation-pokemon.ts`/`top-usage-regulation.ts`, e `defaultStateSV()` (~430 linhas).

## Decisões tomadas

1. **Legacy `game:"sv"`** → coergir para champions no boot com uma escrita única de topo `writeTopLevel({ game: "champions" })`. NÃO toca `userData.sv`.
2. **Tera UI** → deixar os blocos `@if (game()==="sv")` como condição morta (nunca renderiza, pois game será sempre champions). Componentes Tera 100% intactos. Reativação futura = trocar a condição.
3. **`isChampions()`** → na etapa final, inline/remover de vez e ajustar todos os call sites para sempre-Champions.

## Decisão-chave de sequenciamento

**Narrow do tipo `Game` é a ÚLTIMA etapa, não a primeira.** Cortar a entrada do SV primeiro (toggle) torna o app permanentemente Champions: todo ramo `"sv"` vira código morto em runtime mas ainda compilável. Aí deletamos ramo a ramo (UI → store/services → dados), cada task isolada e shippável, com Champions sempre funcional. O narrowing do tipo no fim é mecânico e o compilador verifica completude.

Ordem dentro disso: **UI → store/services → dados**. Remover UI é deleção de código morto puro (não muda comportamento). Mexer em dados/store antes arriscaria quebrar UI ainda renderizada.

---

## Tasks

### Fase A — Cortar a entrada do SV

- [x] **A1 — Remover toggle de modo + announcement + coerção legacy**
  - Arquivos: `header.component.html:32-35` + `.ts` (`onGameChange`); `header-mobile.component.html:48-52` + `.ts`; `app.component.html:5-10` (announcement-popup de descontinuação SV).
  - Coerção legacy: na inicialização, se `userData.game === "sv"`, fazer `writeTopLevel({ game: "champions" })` (preserva `userData.sv`).
  - Validar: lint. Manual: sem toggle (desktop/mobile), sem announcement; perfil com `game:"sv"` no localStorage abre em Champions e `userData.sv` continua presente no devtools.

### Fase B — Deletar ramos SV mortos na UI

- [x] **B1 — Gating de Tera UI (MANTER componentes)** — sem mudanças de código: a gating `game()==="sv"` / `!isChampions()` já existe e é dead-correct no Champions; componentes Tera intactos.
  - Deixar `@if (game()==="sv")` como dead condition em: `pokemon-card.component.html:109,130`; `pokemon-build.component.html:63-66` + mobile; type-calc defensive/offensive coverage (+mobile) toggles Tera Blast/Tera Type; `type-coverage-insights(.mobile)`.
  - NÃO deletar componentes/lógica. Validar: lint. Manual: Tera escondido; arquivos tera intactos.

- [x] **B2 — Remover UI de edição de IV** (`MAX_EVS_SV` adiado p/ Fase E por decisão do usuário; ramos de clamp ainda usam o símbolo)
  - `ev-slider.component.html:77-83` + const `MAX_EVS_SV` no `.ts`; `pokemon-build.component.html:160-161`; referências IV0 em `speed-insights.component.html`/`.ts`.
  - Risco: não deixar símbolo `MAX_EVS_SV` órfão. Validar: lint. Manual: EV sliders no comportamento Champions; sem inputs de IV.

- [x] **B3 — HP badge + simplificação de sprite**
  - `damage-result.component.html:4-8`; `pokemon-card.component.html:69-99` (manter `champions-hp-badge`); `sprite.service.ts:9` (sempre `pokemon-champions`); `pokemon-sprite.component.ts` intrinsicSize → sempre 128.
  - Validar: lint. Manual: sprites carregam, badges corretos, sem imagem quebrada.

- [x] **B4 — Field, probability, speed-calc e tables (ramos de UI)** (simplificados só os ternários de fonte de dados SETDEX/DETAILS/ITEMS; flags `isChampions()`/`activeSetdex` mantidos p/ Fase C/E; imports base `POKEMON_DETAILS`/`MOVE_DETAILS` preservados onde o model/override precisa). **Choice Scarf (toggle manual) REMOVIDO de vez do speed-calc** (decisão final do usuário): removido o `mat-button-toggle`, o estado `choiceScarfActive` + `toggleChoiceScarf` no `speed-calc-options-store.ts`, o campo em `SpeedCalculatorOptions`, e o override em `speed-calculator-service.ts:179`. Specs atualizados. **Mantida** a detecção automática de scarf na speed list (`hasChoiceScarf`/dataset MA) — não é o toggle. Cypress (`speed-calc-choice-scarf`) fica p/ a fase Cypress.
  - `field.component.html`/`.ts` (remover SV-only: Battery, Power Spot, Ruins x4, Neutralizing Gas; manter Champions Protected); `general-probability.component.ts`/`.html` (remover variantes `*SV`, manter `*Champions`); `opponent-options.component.ts:18` `showChoiceScarf`; tables `moves-table`/`items-table`/`pokemon-table .ts` (manter fonte Champions — **NÃO** remover imports base `POKEMON_DETAILS`/`MOVE_DETAILS`); `import-pokemon-button.component.ts:71`; `target-pokemon.component.ts:92,96`; `multi-calc-mobile.component.ts:270,319` (manter `SETDEX_CHAMPIONS`).
  - Risco: nas tables, não dropar os imports base que o model precisa. Validar: lint. Manual: field/probability/speed-calc/tables corretos.

### Fase C — Colapsar ramos SV em store/services

- [x] **C1 — speed-calculator-service** — removidos ramos SV-only (TR IV0 `minSpeedIvZero` + Choice-Scarf `maxScarf`/`hasChoiceScarf`) e `statisticsByRegulation.I` (só `MA`); imports órfãos (`SPEED_STATISTICS_REG_I`, `MIN_IV_0`, `SCARF`) removidos. Arg `isChampions()` na linha 86 mantido p/ C3. **11 testes SV-acoplados marcados `.skip` + lista TODO no fim do spec** (decisão do usuário: migrar p/ Champions depois). `beforeEach` → `updateGame("champions")`.
  - `speed-calculator-service.ts:86` (arg `isChampions` — coordenar com C3), `104/108` (remover ramos SV-only de TR-IV0 e Choice-Scarf — manter EXCLUÍDOS para Champions), `statisticsByRegulation` (dropar `I`).
  - ⚠️ Watchlist #3. Validar: `speed-calculator-service.spec.ts` (usa `updateGame("sv")` — atualizar p/ Champions), `speed-calc-options-store.spec.ts`. Manual: resultados Champions inalterados; sem linhas IV0/Scarf.

- [x] **C2 — move.ts seleção de Gen** — `move.ts:19` fixado em `Generations.get(0)`; `:43` override Champions sempre aplicado (mantida base `MOVE_DETAILS`). `MOVES[9]` em `moveHits()` intocado. **Descoberta-chave (verificada no fork e no pacote 0.11.13): `Generations.get(0)` = bloco CHAMPIONS** (`MOVES = [CHAMPIONS, RBY, ...]`) — tem todos os moves novos (Surging Strikes/Glacial Lance/etc.), então sem regressão de produção. Param `game` na assinatura do `Move` deixado p/ C4/E. **27 testes SV-acoplados (`ev-optimizer`: defensive 21, attacker-selector 2, double 2, single 2) marcados `.skip` + TODO** — usam pokes/valores SV (Gen 9); migrar p/ Champions depois. Specs do escopo C2 (`damage-calculator.service.spec.ts`, `pokemon-details.spec.ts`) passam.
  - `move.ts:19` → sempre `Generations.get(0)`; `:43` manter override Champions. NÃO tocar `moveHits()` `MOVES[9]` nem `isTrickRoomPokemon` `Generations.get(9)` (internos da lib).
  - ⚠️ Watchlist #2 (alto). Validar: `damage-calculator.service.spec.ts`, `pokemon-details.spec.ts`. Manual: spot-check de dano e de move com override Champions.

- [x] **C3 — regulation-pokemon defaults** — defaults de `pokemonByRegulation`/`toPokemon` trocados para `SETDEX_CHAMPIONS`/`isChampions=true`; `bannedByRegulation` virou `Partial` sem entrada `I`; `filterBannedByRegulation` e `sortByRegulationOrder` com `?? []` para robustez; lista `I` removida de `top-usage-regulation.ts`; `topUsageByRegulation` virou `Partial`. **1 teste SV-acoplado marcado `.skip` + TODO** em `speed-calc-options-store.spec.ts` (Kyogre/Regulation I). Assinatura `isChampions` mantida p/ C4/E (call sites ainda passam o valor).
  - ⚠️ Watchlist #1 (alto). Validar: `ev-optimizer/internal/*.spec.ts`, `defensive-ev-optimizer.service.spec.ts`. Manual: lista MA e sets com SP→EV inalterados.

- [x] **C4 — calculator-store + field-store + user-data-storage**
  - `calculator-store.ts` `updateGame` (dropar ramo `defaultStateSV()`/`readGameData("sv")`), `loadPokemonInfo:713` (**MANTER** `isChampions ? spToEv : raw` como caminho spToEv do Champions); `field-store.ts` + `initial-field-state.ts` (remover efeitos SV-only); `user-data-storage.ts` (simplificar assinaturas com game param).
  - ⚠️ Watchlist #1 e #4. `migrate-user-data.ts` + `fixInvalidPokemon` INTOCADOS. Nunca escrever `userData.sv`.
  - Validar: `calculator-store.spec.ts`, `field-store.spec.ts`, `initial-field-state.spec.ts`, `export-poke.service.spec.ts`. Manual: load de set (EVs via SP→EV), field correto, `userData.sv` intacto.

### Fase D — Deletar dados e assets SV-exclusivos

- [x] **D1 — Deletar dados SV-only + defaultStateSV**
  - Deletar `speed-statistics-reg-i.ts`; remover `defaultStateSV()` (`initial-calculator-state.ts:440-874`); remover `AVAILABLE_ITEMS["sv"]`; remover entradas regulation `"I"`.
  - **MANTER** `pokemon-details.ts`, `move-details.ts`, `movesets.ts` (base Champions). Nota: `SETDEX_SV` ainda importado em `activeSetdex` até a Fase E.
  - Risco: grep antes de deletar p/ não deixar import órfão. Validar: `initial-calculator-state.spec.ts`. Manual: app boota, speed-calc (MA) ok, dropdowns de item ok.

- [x] **D2 — Deletar pasta de sprites SV**
  - Deletar `src/assets/sprites/pokemon-sv/` (referenciada só em `sprite.service.ts:9`, já simplificado em B3).
  - Risco: re-grep `pokemon-sv` antes. Validar: manual — sprites renderizam, sem 404 no network.

### Fase E — Narrowing final do tipo

- [x] **E1 — Narrow `Game`, remover `isChampions`/`activeSetdex`, narrow `Regulation`**
  - `type Game = "champions"`, `isChampions = true` (constante), `activeSetdex = SETDEX_CHAMPIONS` (constante), `Regulation = "MA"`. Todos os call sites simplificados. `game` removido de `stateToPokemon`/`stateToTeam`/`stateToTargets` e de `Move` constructor. Effects dead (troca de game) removidos de `speed-scale` e `speed-calculator`.
  - **Nota Tera Type no export:** ao remover `if (!isChampions()) { text += Tera Type... }`, o export Champions parou de incluir a linha Tera Type no paste Showdown. Isso precisa ser revisado — decidir se Champions deve exportar Tera Type ou não. 4 testes de `export-poke.service.spec.ts` estão skipped aguardando essa decisão.
  - **Nota moves Gen 0 vs Gen 9:** `Surging Strikes`, `Thunderclap` e outros moves SV (Gen 9) não existem em `Generations.get(0)` da lib, retornando BP=0. Testes afetados marcados `.skip`: 13 em `damage-calculator.service.spec.ts`, 9 em `defensive-ev-optimizer.service.spec.ts`, 1 em `single-attacker-optimizer.spec.ts`, 1 em `attacker-selector.spec.ts`, 3 em `survival-checker.spec.ts`.
  - Validar: lint limpo. Suíte: 1355 passando, 96 skipped, 0 falhas. Manual: smoke de todas as páginas em Champions.

### Fase F — Limpeza de dados SV

Há **dois padrões distintos** entre os dados base SV e os `_CHAMPIONS` — e eles têm risco oposto:

- **Substituição direta (código morto, seguro):** `SETDEX_SV` (`movesets.ts`). Todos os call sites de produção já usam `SETDEX_CHAMPIONS` diretamente (verificado: `grep` por `SETDEX_SV`/`from "@data/movesets"` não encontra nenhum importador). O arquivo é só uma constante exportada e não importada.
- **Override parcial (NÃO deletável):** `MOVE_DETAILS` e `POKEMON_DETAILS`. Os `_CHAMPIONS` correspondentes são dados **parciais** (`MOVE_DETAILS_CHAMPIONS: Record<string, Partial<MoveDetail>>`) que sobrepõem a base via spread (`move.ts:43-44`) ou servem de fallback (`pokemon.ts:287`). Deletar a base e renomear o `_CHAMPIONS` quebraria Champions, pois os dados Champions não são completos por si só.

- [x] **F1 — Deletar `movesets.ts` (`SETDEX_SV`)** — código morto puro, sem importadores de produção. Deletado (12.337 linhas / 245KB). `tsc --noEmit` limpo, sem imports órfãos. Zero impacto em Champions.

- [x] **F2 — (OPCIONAL, baixa prioridade, ALTO RISCO) Consolidar `move-details`/`pokemon-details` com overrides Champions**
  - Spike read-only primeiro. Mergear `pokemon-details.ts`/`move-details.ts` com `*_CHAMPIONS`, materializando os dados parciais e eliminando a indireção de override em `move.ts:43`, `pokemon.ts:287`, `type-coverage.service.ts:385`. Alto risco (cross-linked, dados parciais). Só seguir com sign-off separado.

---

## Watchlist de comportamento (não regredir o Champions)

1. **SP→EV** — `loadPokemonInfo:713` e `regulation-pokemon.ts toPokemon`: Champions SEMPRE converte. Manter o braço `spToEv` (C3, C4).
2. **Gen 0 vs Gen 9** — `move.ts:19`: Champions = Gen 0. Fixar `Generations.get(0)`. Deixar `MOVES[9]`/`Generations.get(9)` (internos da lib) (C2).
3. **Linhas TR IV0 + Choice Scarf** — `speed-calculator-service.ts:104/108`: SV-only; devem continuar EXCLUÍDAS no Champions (C1).
4. **`migrate-user-data.ts` + `fixInvalidPokemon`** — manter funcionando; nunca escrever `userData.sv` (todas as fases).

## Verificação end-to-end (ao final)

- `npm run test` (suíte unitária completa passa); `npm run lint` limpo.
- `grep -rn "\"sv\"\|SETDEX_SV\|defaultStateSV\|isChampions\|speed-statistics-reg-i\|pokemon-sv" src` → só restam usos intencionais (ou nenhum).
- Manual: smoke de cada página em Champions; localStorage com `userData.sv` preservado.
- Cypress: deferido (fase separada).

### Fase G — Migrar testes skipped (TODO remove-sv)

Todos os testes abaixo foram marcados `it.skip` + `TODO(remove-sv)` durante as fases C1–C3 por estarem acoplados a dados/valores do modo SV (Gen 9 / Regulation I). Devem ser migrados para Champions (Gen 0 / Regulation MA) após a Fase E.

- [ ] **G1 — `speed-calculator-service.spec.ts`** (11 testes) — Fase C1. Usam `updateGame("sv")`, Pokémon SV, valores de velocidade de Regulation I. Migrar para `updateGame("champions")` e valores MA.

- [ ] **G2 — `ev-optimizer/defensive-ev-optimizer.service.spec.ts`** (21 testes) — Fase C2. Usam Pokémon SV (Urshifu-Rapid-Strike, Flutter Mane, Raging Bolt) com moves Gen 9 e valores de dano calibrados para SV. Migrar para Pokémon e moves Champions (Gen 0).

- [ ] **G3 — `ev-optimizer/internal/single-attacker-optimizer.spec.ts`** (2 testes) — Fase C2. Usam Urshifu-Rapid-Strike + Surging Strikes com valores físicos de Gen 9. Migrar para atacante físico Champions.

- [ ] **G4 — `ev-optimizer/internal/double-attacker-optimizer.spec.ts`** (2 testes) — Fase C2. Usam Urshifu-Rapid-Strike como atacante físico com valores de Gen 9. Migrar para atacante físico Champions.

- [ ] **G5 — `ev-optimizer/internal/attacker-selector.spec.ts`** (2 testes) — Fase C2. Usam Urshifu-Rapid-Strike + Surging Strikes para classificação física. Migrar para atacante físico Champions.

- [ ] **G6 — `speed-calc-options-store.spec.ts`** (1 teste) — Fase C3. Usa `updateRegulation("I")` e espera Kyogre na lista. Migrar para Regulation MA e Pokémon MA.

- [ ] **G7 — `calculator-store.spec.ts`** (23 testes) — Fase C4. `describe("computed")` inteiro usa `updateGame("sv")` no `beforeEach`; espera Miraidon/Koraidon/Rillaboom/Incineroar como defaults SV. Migrar `beforeEach` para Champions e ajustar valores esperados.

- [ ] **G8 — `field-store.spec.ts`** (2 testes) — Fase C4. Verificavam que field é salvo em `userData.sv.fields`; agora deve ser `userData.champions.fields`. Migrar asserções.

**Total original: 64 testes skipped** (G1–G8). Na Fase E1 foram adicionados 32 testes skipped adicionais:

- [ ] **G9 — `damage-calculator.service.spec.ts`** (13 testes) — Fase E1. Usam moves Gen 9 (`Surging Strikes`, `Thunderclap`) que não existem em `Generations.get(0)`, ou têm valores calibrados para Gen 9. Migrar para moves Champions (Gen 0) com valores corretos. **Atenção:** verificar se comportamento de Grassy Glide/Thunderbolt difere entre Gen 0 e Gen 9 na lib antes de atualizar os valores.

- [ ] **G10 — `export-poke.service.spec.ts`** (4 testes) — Fase E1. **Depende de decisão de produto sobre Tera Type no export Champions.** Antes o export SV incluía `Tera Type:` e `IVs:`; o Champions nunca incluía. Com a remoção do guard `!isChampions()`, o export Champions agora não inclui mais `Tera Type:`. Decidir se Champions deve exportar Tera Type → ajustar `export-poke.service.ts` e fixtures do spec.

- [ ] **G11 — `defensive-ev-optimizer.service.spec.ts`** (9 testes) — Fase E1. Mesma causa dos G2: moves/Pokémon SV com dano calibrado para Gen 9. Migrar para Champions.

- [ ] **G12 — `survival-checker.spec.ts`** (3 testes), `single-attacker-optimizer.spec.ts` (1 teste), `attacker-selector.spec.ts` (1 teste) — Fase E1. Mesma causa. Migrar para moves/Pokémon Champions.

**Total geral: 96 testes skipped.** Rodar `npm run test` ao final de cada G\* e confirmar que o skip vira pass.

- [ ] **G13 — `pokemon.spec.ts`** (5 testes) — Fase F. `availableAbilities` para Dondozo e Ogerpon (todas as formas) retorna vazio porque esses Pokémon não estão em `pokemon-details.ts` (Champions). Dondozo e Ogerpon não são parte do metagame Champions — decidir se devem ser adicionados ao arquivo de dados ou se esses testes devem ser migrados para Pokémon Champions.

---

## Estado atual

**Fases A, B, C, D, E e F1 concluídas** (A1; B1–B4; C1–C4; D1–D2; E1; F1). Unit suite verde: 1355 passando, 96 skipped, 0 falhas. Lint limpo. F1 deletou `movesets.ts` (`SETDEX_SV`, 12.337 linhas / 245KB de código morto) — `tsc --noEmit` limpo. Restam **Fase G** (migrar testes skipped), **F2** (consolidação opcional alto-risco) e **validação manual** das páginas Champions. Ao retomar, ler este arquivo e seguir pela primeira `[ ]` não marcada.
