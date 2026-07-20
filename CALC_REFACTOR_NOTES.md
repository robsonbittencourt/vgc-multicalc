# Análise Clean Code — src/domain/calc

Data: 2026-07-19. Análise de simplificação/refatoração com **comportamento preservado** como restrição absoluta.
Rede de segurança: 2824 testes verdes (incl. ~1.5k linhas de paridade em `damage-calc.spec.ts` + specs por módulo). Recomendação geral: um refactor por commit, `npm run test` entre cada um.

Legenda de esforço/risco: 🟢 mecânico e seguro · 🟠 exige atenção · 🔴 direcional (avaliar custo/benefício antes)

---

## 1. Quick wins (alto retorno, baixo risco)

### 1.1 🟢 Typo institucionalizado: `currrentHp` / `originalCurrrentHp` (3 r's)
37 ocorrências em 10 arquivos de produção, vazando até para fora do calc (`damage-calc.ts` do multicalc chama `calcPokemon.currrentHp()`). Herdado do fork (`curHP`→rename com typo). Rename simbólico puro: `currentHp()` / `originalCurrentHp`. Também unificar as options duplicadas do construtor de Pokemon (`options.curHP || options.originalCurrrentHp` em [pokemon.ts:65](src/domain/calc/model/pokemon.ts#L65)) em um único nome.

### 1.2 🟢 Números mágicos de modificadores (base 4096) sem nome
`modifiers.ts` inteiro devolve `6144`, `5325`, `4915`, `3072`, `2048`, `8192`, `5461`, `5120`, `4506`… O leitor precisa saber de cor que 6144/4096 = 1.5×. Constantes nomeadas resolvem sem tocar em comportamento:

```ts
const MOD_2X = 8192
const MOD_1_5X = 6144
const MOD_4_3X = 5461
const MOD_1_3X = 5325
const MOD_1_2X = 4915
const MOD_0_75X = 3072
const MOD_0_5X = 2048
```

Aplicável também a `hit-damage.ts` (3072 spread, 1024 parental bond child, 6144/2048 clima) e `stats.ts` (speed mods).

### 1.3 🟢 Helper `applyMod` para o padrão `pokeRound(overflow32(v * mod) / 4096)`
O idioma aparece 8× (`hit-damage.ts` ~6×, `stats.ts`, `multi-hit`…). Um helper em `math.ts` ao lado de `chainMods`:

```ts
export function applyMod(value: number, mod: number): number {
  return pokeRound(overflow32(value * mod) / 4096)
}
```

`computeBaseDamage` ([hit-damage.ts:132](src/domain/calc/engine/hit-damage.ts#L132)) vira quase declarativo.

### 1.4 🟢 Clamp de boost duplicado
`Math.min(6, Math.max(-6, …))` e variações aparecem 10× (`pre-damage-effects.ts`, `prepare-combatants.ts:34`, `stamina-boost-simulator.ts:69`). Extrair `clampBoost(value)` em `stats.ts` ou `math.ts`. Junto, o par `pokemon.boosts.X = …; pokemon.stats.X = getModifiedStat(...)` repete 6× em `pre-damage-effects.ts` — extrair `applyBoostChange(pokemon, stat, delta)` que clampa e recalcula o stat.

### 1.5 🟢 `Field.clone()` reescrito à mão → `new Field(this)`
[field.ts:98-117](src/domain/calc/model/field.ts#L98-L117) lista os 15 campos manualmente — um campo novo esquecido vira bug silencioso (o `Side.clone()` logo acima já usa o construtor: `new Side(this)`). O construtor de `Field` aceita `Partial<StateField>` e `this` satisfaz o shape, incluindo os sides (o construtor já reembrulha com `new Side(...)`). Mesma pegada, zero repetição.

### 1.6 🟢 `roundChance` duplicada
Fórmula `Math.max(Math.min(Math.round(chance * 1000), 999), 1) / 10` existe como closure em `getKOChance` ([desc.ts:232](src/domain/calc/engine/desc.ts#L232)) e inline em `MultiResult.getHKO` ([multi-result.ts:167](src/domain/calc/model/multi-result.ts#L167)). Exportar uma vez.

### 1.7 🟢 `isSpread` duplicado
`field.gameType !== "Singles" && ["allAdjacent", "allAdjacentFoes"].includes(move.target)` aparece em [resolve-damage.ts:10](src/domain/calc/engine/resolve-damage.ts#L10) e [hit-damage.ts:134](src/domain/calc/engine/hit-damage.ts#L134). Extrair `isSpreadMove(move, field)`.

### 1.8 🟢 Estratégias de base power idênticas registradas em dobro
Em `BASE_POWER_STRATEGIES` ([base-power.ts](src/domain/calc/engine/base-power.ts)) há pares/trios com o mesmo corpo copiado: Low Kick/Grass Knot, Heavy Slam/Heat Crash, Hex/Infernal Parade, Stored Power/Power Trip, Eruption/Water Spout/Dragon Energy, Flail/Reversal. Declarar a função uma vez e registrar nas duas chaves:

```ts
const weightBasedBp: BasePowerStrategy = ({ defender, description }) => { ... }
["Low Kick", weightBasedBp], ["Grass Knot", weightBasedBp],
```

### 1.9 🟢 Padrão `description.moveBP = basePower; return basePower` repetido ~20×
Ainda em `base-power.ts`, quase toda estratégia termina com essas 2 linhas. Um helper `describedBp(description, bp)` que grava e retorna reduz cada estratégia a uma expressão. Atenção aos casos que fogem do padrão (não mudar!): `Assurance` não grava `moveBP`; `Triple Axel` grava valor diferente do retornado ([base-power.ts:278-285](src/domain/calc/engine/base-power.ts#L278-L285)); `Psyblade` só grava condicionalmente.

### 1.10 🟢 Nomes inconsistentes na API de `Result`
- `kochance()` ([result.ts:164](src/domain/calc/model/result.ts#L164)) — casing errado; único uso externo em `damage-calc.ts:178`. Renomear para `koChance()`.
- `description()` delega para `fullDesc()`, que delega para `display()` — três nomes para o mesmo conceito. Sugestão: manter `description(notation?, err?)` e eliminar o intermediário; em `desc.ts`, renomear `display`/`displayMove` para algo que diga o que fazem (`formatResultDescription` / `formatDamageSummary`).

### 1.11 🟢 `Move.secondaries: unknown`
[move.ts:26](src/domain/calc/model/move.ts#L26) — usado apenas como truthy em `modifiers.ts:149` (Sheer Force). Tipar conforme o dado real (`boolean | undefined`) e o uso fica autoexplicativo.

### 1.12 🟢 `combine()` com funções aninhadas
`reduce`, `combineTwo` e `combineDistributions` são declaradas dentro de `combine` ([desc.ts:546-598](src/domain/calc/engine/desc.ts#L546-L598)). Elevá-las a top-level do módulo: legibilidade, testabilidade e stack traces melhores, sem mudança de comportamento.

---

## 2. Duplicação de lógica de domínio

### 2.1 🟠 Consumo de berry: mesma regra escrita 6×
O bloco "se tem recovery, HP caiu abaixo do threshold e ainda está vivo → soma recovery, clampa no maxHp, marca consumida" existe em:
- `computeKOChance` (2×: [desc.ts:906](src/domain/calc/engine/desc.ts#L906) e [desc.ts:953](src/domain/calc/engine/desc.ts#L953))
- `computeMultiHitKOChance` ([desc.ts:399](src/domain/calc/engine/desc.ts#L399) e de novo no bloco final [desc.ts:503](src/domain/calc/engine/desc.ts#L503))
- `Result.afterTurn` ([result.ts:86](src/domain/calc/model/result.ts#L86))
- `MultiResult.afterTurn` ([multi-result.ts:81](src/domain/calc/model/multi-result.ts#L81))

Extrair um helper puro, ex.: `consumeBerryIfTriggered(hp, maxHp, berry): { hp, consumed }`. É a duplicação mais perigosa do módulo — qualquer ajuste futuro na regra precisa ser achado 6 vezes.

### 2.2 🟠 `getBerryRecovery`: padrão Ripen repetido 4×
[desc.ts:639-694](src/domain/calc/engine/desc.ts#L639-L694): cada berry repete `let recovery = X; if (Ripen) recovery *= 2; return { recovery, threshold }`. Virar tabela declarativa (`berry → { fraction do maxHp | valor fixo, threshold }`) com a multiplicação de Ripen num único ponto. Enigma Berry continua como caso especial (depende de efetividade).

### 2.3 🟠 Efetividade de tipo recalculada à mão no Collision Course
[modifiers.ts:57-67](src/domain/calc/engine/modifiers.ts#L57-L67) reimplementa o miolo de `computeTypeEffectiveness` (isGhostRevealed + isRingTarget + tera types + e1*e2) de [guards.ts:221-232](src/domain/calc/engine/guards.ts#L221-L232). Extrair o miolo comum (`rawTypeEffectiveness(attacker, defender, move, field)`) e usar nos dois lugares — os passos extras de guards (Air Balloon, Iron Ball, Stellar, Tera Shell) ficam só em guards.

### 2.4 🟠 "Valor no índice do roll" espalhado
O conceito "pegar o dano no rollIndex em cada sub-array" existe 3×: `Result.getHitsAtIndex` ([result.ts:128](src/domain/calc/model/result.ts#L128)), closure `sumDamage` em `MultiResult.afterTurn` ([multi-result.ts:41](src/domain/calc/model/multi-result.ts#L41)) e o `reduce` do `StaminaBoostSimulator.turnDamages` ([stamina-boost-simulator.ts:21](src/domain/calc/engine/stamina-boost-simulator.ts#L21)). Extrair `rollsAtIndex(damage, rollIndex): number[]` ao lado de `extractDamageSubArrays` e derivar a soma onde precisar. (De quebra, o tipo do parâmetro do `sumDamage` — `(typeof this.results)[0]["damage"]` — vira só `Damage`.)

### 2.5 🟠 Conhecimento de natures duplicado em `MultiResult.natureModifier`
[multi-result.ts:290-308](src/domain/calc/model/multi-result.ts#L290-L308) hardcoda listas de natures (+def, −def, +spd, −spd) que já existem em `@data/nature-data` (`plus`/`minus`). Derivar de `getNatureData(pokemon.nature)` — elimina 4 listas e o risco de divergirem.

### 2.6 🔴 Dois type charts no projeto
O motor tem `TYPES` ([engine/types.ts](src/domain/calc/engine/types.ts), ~430 linhas de matriz) e o domínio tem outro chart completo em `multicalc/type-calc/type-chart.ts`. Mesmo conhecimento, dois formatos, dois donos (e já divergem em semântica de itens — ver BRANCH_REVIEW_NOTES). Direcional: uma única matriz em `@data` consumida pelos dois. Exige cuidado (formatos atacante→defensor diferentes) — fazer só com testes de caracterização dos dois lados.

---

## 3. Funções longas / níveis de abstração misturados

### 3.1 🟠 `desc.ts` é um god file (1240 linhas, 5 responsabilidades)
Hoje mistura: formatação de texto (`display`, `buildDescription`, `serialize*`), recovery/recoil, probabilidade de KO (`getKOChance`, `computeKOChance`, `computeMultiHitKOChance`, `predictTotal`, `combine`), residual/hazards (`getHazards`, `getEndOfTurn`) e mecânica de berries (`getBerryRecovery`, `getDamageWithoutBerry`). São funções puras com poucas interdependências — dividir em módulos coesos é seguro e mecânico:

```
engine/description-text.ts   (display, displayMove, buildDescription, serialize*, toDisplay)
engine/ko-chance.ts          (getKOChance, computeKOChance, computeMultiHitKOChance, predictTotal, combine)
engine/end-of-turn.ts        (getEndOfTurn, getHazards)
engine/berry.ts              (getBerryRecovery, getDamageWithoutBerry, computeDamageWithoutBerry)
```

`getRecovery`/`getRecoil` cabem em description-text (são formatação). Manter re-exports no `desc.ts` durante a transição se quiser diff menor.

### 3.2 🟠 `getKOChance` (~165 linhas) com closure de 50 linhas e chamadas booleanas ilegíveis
[desc.ts:193-357](src/domain/calc/engine/desc.ts#L193-L357). Problemas encadeados:
- A closure `KOChance(chanceWithoutEot, chanceWithEot, n, multipleTurns, berryRelevant, firstBerryTurn, anyBerryConsumed)` é chamada com posicionais tipo `KOChance(0, res.chance, i, false, res.berryConsumed || berryConsumed, …)` — impossível ler no call site. Extrair para função top-level nomeada (`formatKOChanceText`) recebendo um objeto.
- Os três estágios do algoritmo merecem nomes: `tryOhkoChance(...)`, `tryNhkoChance(2..4)`, `predictGuaranteedKO(5..9)`.
- `computeKOChance` recursiva tem **11 parâmetros posicionais** ([desc.ts:869](src/domain/calc/engine/desc.ts#L869)) — parameter object resolve.

### 3.3 🟠 `computeMultiHitKOChance` (~185 linhas): 3 blocos quase idênticos de avanço de estado
[desc.ts:359-544](src/domain/calc/engine/desc.ts#L359-L544). O par de mapas `state`/`stateBerry` avança com o mesmo padrão em 3 lugares (dano por linha, EoT por turno, EoT final). Extrair `advanceStateByDamage(state, damageRow, …)` e `applyEndOfTurnToState(state, eot, maxHP)` derruba o tamanho pela metade. O acesso "array-ou-escalar" (`Array.isArray(berryRecovery) ? berryRecovery[i] : berryRecovery`) repete 4× — normalizar para array logo na entrada.

### 3.4 🟠 `checkMultihitBoost` (~130 linhas): 8 efeitos independentes numa função
[pre-damage-effects.ts:71-199](src/domain/calc/engine/pre-damage-effects.ts#L71-L199): Gooey/Tangling Hair, Power-Up Punch, berries defensivas (Kee/Maranga/Luminous Moss), Seed Sower, Sand Spit, Stamina/Water Compaction/Weak Armor, dropsStats, Mummy. Extrair uma função privada nomeada por efeito, com `checkMultihitBoost` virando a lista de chamadas. O tri-estado repetido "Unaware anula / Contrary inverte / Simple dobra" das berries defensivas e do dropsStats pede um helper comum.

### 3.5 🟠 `computeMoveType` (~95 linhas): cadeia if/else de moves especiais
[guards.ts:125-219](src/domain/calc/engine/guards.ts#L125-L219). O codebase já tem o padrão certo em `BASE_POWER_STRATEGIES`: uma tabela `MOVE_TYPE_RESOLVERS: Record<string, (ctx) => TypeName>` para Weather Ball, Techno Blast, Terrain Pulse, Aura Wheel, Raging Bull, Ivy Cudgel deixa os dois arquivos consistentes entre si. O bloco de -ate abilities (Aerilate/Pixilate/…) também é tabela: `Record<AbilityName, TypeName>`.

### 3.6 🟢 Repetição do tratamento de `GuardResult` em `calculate.ts`
[calculate.ts:21-47](src/domain/calc/engine/calculate.ts#L21-L47) repete 3× o padrão "se immune retorna, se damage seta e retorna". Um helper `applyGuardToResult(result, guard): boolean` (retorna se deve parar) reduz a função principal a uma sequência linear legível.

### 3.7 🟢 Regras anônimas em `modifiers.ts`
`BP_RULES`/`AT_RULES`/`DF_RULES`/`FINAL_RULES` são arrays de lambdas sem nome — na leitura e no stack trace tudo é "anonymous". Dar nome a cada regra (`const conditionalBpDoublingRule: ModifierRule = …`) e montar os arrays com as referências. A primeira regra de `AT_RULES` ([modifiers.ts:275-339](src/domain/calc/engine/modifiers.ts#L275-L339), ~10 habilidades e 60 linhas) merece quebra em regras menores por família (pinch abilities, doubling abilities, etc.) — cada `if` já retorna, o split é mecânico.

---

## 4. Modelo de dados `Damage`

### 4.1 🔴 A union `number | number[] | [number, number] | number[][]` contamina todo o módulo
`extractDamageSubArrays`, `damageRange`, `multiDamageRange`, `combine`, `getMaxDamage` (multi-target), `getDamageWithoutBerry` — todos fazem a mesma dança de `typeof damage === "number"` / `Array.isArray(damage[0])` com casts. É a maior fonte de ruído do módulo.

Direção sugerida (em etapas, cada uma verde):
1. Curto prazo: fazer todo consumo interno passar por `extractDamageSubArrays`/`rollsAtIndex` (item 2.4) — os type-switches ficam em um único arquivo.
2. Longo prazo: um value object `DamageDistribution` (lista de sub-arrays) com `min()`, `max()`, `atRollIndex(i)`, `combined()`, mantendo a union apenas na borda pública (`Result.damage`) por compatibilidade.

### 4.2 🔴 `MultiResult.description()` faz cirurgia de strings no próprio output
[multi-result.ts:206-235](src/domain/calc/model/multi-result.ts#L206-L235) + `mergeBulkStats`: monta a descrição combinada re-parseando com `indexOf`/`substring` as strings formatadas dos dois `Result`s (por isso o `try/catch` com fallback "possibly the worst move ever"). O caminho limpo é compor a partir dos `RawDesc`s dos dois resultados em vez de re-parsear texto. Refactor médio; os specs de `multi-result-formatting` dão boa cobertura para tentar.

### 4.3 🟠 `Result.afterTurn` vs `MultiResult.afterTurn`: dois simuladores de turno paralelos
[result.ts:58-126](src/domain/calc/model/result.ts#L58-L126) e [multi-result.ts:19-113](src/domain/calc/model/multi-result.ts#L19-L113) compartilham o esqueleto (loop de turnos, dano por hit, berry, clamp, EoT, `AfterTurnData`), com diferenças reais (single usa `minHPAfterMove`; multi soma atacantes e Stamina). Dá para extrair o esqueleto para um pequeno simulador comum parametrizado pela fonte de danos do turno — o `StaminaBoostSimulator` já aponta essa direção. Fazer só com specs de caracterização dos dois lados (já existem: `multi-result-after-turn.spec.ts` etc.).

---

## 5. Observações menores

- 🟢 `serializeEndOfTurnTexts` **muta o array recebido** ([desc.ts:1197-1214](src/domain/calc/engine/desc.ts#L1197-L1214)) — callers passam `this.eot.texts` (estado do objeto). Copiar antes de editar.
- 🟢 `getDamageWithoutBerry` usa `Math.floor(damage / reduction)` com `reduction = 0.5 | 0.25` ([desc.ts:605](src/domain/calc/engine/desc.ts#L605)) — dividir por fração para "desfazer" redução lê mal; `damage * 2` / `damage * 4` é idêntico (potências de 2, sem erro de float) e óbvio.
- 🟢 `Pokemon.ivs` é uma única instância `Object.freeze` compartilhada por todos os Pokemon ([pokemon.ts:10,33](src/domain/calc/model/pokemon.ts#L10)) — funciona porque nunca é escrita, mas o tipo não protege. Declarar `readonly ivs` deixa a intenção explícita.
- 🟢 A escada de `multihit` no construtor de `Move` ([move.ts:50-60](src/domain/calc/model/move.ts#L50-L60)) merece extração para `resolveHits(data, options)` com early returns.
- 🟢 `getItemBoostType`/`getBerryResistType` ([items.ts](src/domain/calc/model/items.ts)) são switches de ~68 linhas que seriam `Record<string, TypeName>` de ~20 — menos ruído, lookup direto.
- 🟢 `getHazards`: a escada de spikes 1/2/3 ([desc.ts:714-723](src/domain/calc/engine/desc.ts#L714-L723)) vira lookup `[0, 8, 6, 4]` (divisor por camada).
- 🟠 `stats.ts:66` usa bound `131172` no `chainMods` da velocidade — **não é typo do porte**: vem literal da damage-calc original (que usa `131072` em todo o resto). Inatingível na prática (mods de speed chegam a ~24576), então é inofensivo; se padronizar para `131072`, fazer como decisão consciente de divergência do upstream e ajustar o spec `math.spec.ts:60`. Alternativa: constante nomeada `SPEED_MOD_UPPER_BOUND` mantendo o valor, registrando a paridade.
- 🟢 `error(err, message)` ([desc.ts:44-48](src/domain/calc/engine/desc.ts#L44-L48)): throw condicional controlado por flag booleana que atravessa a API (`err` em `display`/`getKOChance`/`fullDesc`). Herança do upstream; se nenhum caller do app usa `err = false` fora dos specs, avaliar remover o parâmetro inteiro numa etapa própria.

---

## 6. Ordem sugerida de ataque

| Etapa | Itens | Risco |
|-------|-------|-------|
| 1. Renames e constantes | 1.1, 1.2, 1.10, 1.11 | 🟢 quase zero (simbólico) |
| 2. Helpers de duplicação local | 1.3–1.9, 1.12, 5.* | 🟢 baixo, cada um cabe num commit |
| 3. Split do desc.ts em 4 módulos | 3.1 | 🟢 move-only + re-exports |
| 4. Extrações dentro das funções grandes | 3.2–3.7, 2.1–2.4 | 🟠 um efeito/estágio por commit, suite entre cada |
| 5. Direcionais | 4.1–4.3, 2.6 | 🔴 só com caracterização prévia e medição (lembrar do precedente: unificação de modelos Pokemon foi revertida por perf) |

Nota de perf: o motor é hot path do EV optimizer (CachedDamageCalc, benchmarks em `history/performance`). Extrações de função e constantes não afetam; mudanças estruturais (4.1, 4.3) devem rodar o benchmark (`node --expose-gc run.mjs`) antes de ir para main.
