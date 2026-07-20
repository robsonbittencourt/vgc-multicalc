# Análise das notas técnicas (NOTES.md) — problemas classificados e planos de ação

Gerado em 2026-07-12 a partir de `history/test-strategy/NOTES.md`. O arquivo original mistura
três coisas: bugs reais no motor, decisões em aberto, e registro de cobertura/branches mortos
(que não são problemas — apenas documentação). Abaixo, só os itens acionáveis, deduplicados e
classificados por criticidade, cada um com parecer e instrução para o próximo agente.

**Redundâncias eliminadas:**

- Ring Target (§2) foi absorvido pelo achado maior de imunidade Ground (§0) — é a mesma família de bug.
- Flower Gift/Steely Spirit de aliado (§7) foi absorvido pela auditoria de abilities de aliado
  (§"Unnerve") — o achado do Unnerve reclassifica esses itens de "extensão futura" para "possível bug ativo".
- Registros puros de cobertura (stats.ts, mega-stone.ts, guards coverage, base-power,
  multi-result branches, §13, §14) foram descartados — não há ação, só documentação de branches mortos.
- Bugs da referência/oráculo (Kee/Maranga §9, Lash Out) não são nossos — descartados.

---

## 🔴 CRÍTICO

- [X] **1. `dropsStats` não aplica em moves de hit único (Overheat, Close Combat, Draco Meteor...)**
  **Parecer:** Bug estrutural confirmado por reprodução. `checkMultihitBoost`
  (`pre-damage-effects.ts:159`) é o único ponto que aplica quedas de stat do próprio usuário,
  mas só roda dentro do loop multi-hit (`multi-hit.ts:19`), que exige `hits > 1 || timesUsed > 1`.
  Afeta também Power-Up Punch, Stamina, Weak Armor, Seed Sower/Sand Spit — tudo que é "efeito
  após qualquer hit" mas hoje só dispara em multihit. Impacto real em simulação multi-turno/KO
  chance; menor em análise de 1 turno.
  **Solução p/ próximo agente:** (1) Confirmar com o usuário que é não-intencional.
  (2) Extrair de `checkMultihitBoost` os efeitos que são "após qualquer hit" e chamá-los também
  no caminho de hit único em `resolve-damage.ts` (após o `computeHitDamage` inicial da linha 8).
  (3) Verificar double-counting no caminho multihit (o primeiro hit não pode aplicar 2x).
  (4) Rodar suíte completa + oráculo.

- [X] **2. Tera Blast Stellar quebra o cálculo (dano `null`, `description()` lança)** — RESOLVIDO (2026-07-12)
  **Parecer:** Crash confirmado e corrigido. Duas lacunas: (a) `computeTypeEffectiveness`
  (`guards.ts`) não forçava a efetividade Stellar — a type chart não tem entrada `Stellar` como
  tipo ofensivo, gerando dano `null`; (b) o Stellar STAB boost (`getStellarStabMod`) nunca foi
  portado, então o dano ficava abaixo do real mesmo sem crash.
  **Correção aplicada:** (1) Em `computeTypeEffectiveness`, override `if (move.type === "Stellar")
  typeEffectiveness = defender.teraType ? 2 : 1` (2x vs alvo Terastalizado, 1x caso contrário,
  igual à ref gen789:461-463). (2) Nova `getStellarStabMod` em `stats.ts` espelhando a ref
  (util.ts:628): +2048 se o move é do tipo original do atacante, senão `4915`; ativa em Tera
  Blast first-use ou Terapagos-Stellar. Aplicada em `calculate.ts` (turn 0) e `multi-hit.ts`
  (turns 2+, boost só no turno 0). (3) `description.isStellarFirstUse` e `description.attackerTera`
  agora setados em `calculate.ts` seguindo gen789:112-118. BP 100 (`base-power.ts:253`) já existia.
  **Testes:** 5 novos em `tera-and-quark.spec.ts` (2x vs Tera, 1x vs non-Tera, gate first-use vs
  não-first-use, Terapagos always-on, physical flip). Todos MATCH no oráculo (subiu p/ 158 MATCH).
  Oráculo ajustado para repassar `isStellarFirstUse` ao Move da ref (mesmo padrão do `isWonderRoom`).
  Suíte completa verde (2665 testes). Valores validados byte a byte contra `temp/damage-calc`.

---

## 🟠 ALTO

- [X] **3. Imunidade Ground não é anulada por Ring Target / Iron Ball** — RESOLVIDO (2026-07-12; Thousand Arrows fora de escopo por decisão do usuário)
  **Parecer:** Porte incompleto confirmado por diff contra o gen789 real (linhas 421-427).
  `computeTypeEffectiveness` chamava `getMoveEffectiveness` com `isRingTarget=false` hardcoded, e
  Iron Ball vs Flying não era tratado.
  **Correção aplicada** (`guards.ts::computeTypeEffectiveness`): (1) `isRingTarget =
  defender.hasItem("Ring Target") && !defender.hasAbility("Klutz")` agora é passado a ambos os
  `getMoveEffectiveness` (a função já suportava a lógica). (2) Bloco novo espelhando gen789:421:
  `if (typeEffectiveness === 0 && move.hasType("Ground") && defender.hasItem("Iron Ball") &&
  !defender.hasAbility("Klutz")) typeEffectiveness = 1`.
  **Testes** (`items.spec.ts`, 4 novos): Ring Target Ground→Flying (102-120), Ring Target
  Normal→Ghost (91-108), Klutz suprimindo Ring Target (imune, `damage === 0`), Iron Ball
  Ground→Flying (102-120). Todos validados byte a byte contra `temp/damage-calc`; os 3 com dano
  dão MATCH no oráculo (subiu p/ 161 MATCH). Suíte completa verde (2669 testes).
  **Thousand Arrows NÃO implementado** (decisão do usuário, 2026-07-12): o move continua ausente
  do motor/dataset; quando for adicionado, incluir o bloco análogo `if (typeEffectiveness === 0
  && move.named("Thousand Arrows")) typeEffectiveness = 1` (gen789:426).

- [X] **4. Harsh Sunshine/Heavy Rain não dão o boost de dano de clima**
  **Parecer:** Inconsistência interna confirmada por reprodução: `guards.ts:132` e `desc.ts:744`
  tratam "Sun"/"Harsh Sunshine" como equivalentes, mas `hit-damage.ts` (~146-166) só checa
  `"Sun"`/`"Rain"`. No jogo real o boost de Harsh Sunshine é idêntico ao do Sun; a diferença é
  que moves de Water **falham** (mecânica possivelmente ausente por completo).
  **Solução:** Confirmar com o usuário se Desolate Land/Primal está no escopo. Se sim: trocar as
  checagens em `hit-damage.ts` para `hasWeather("Sun", "Harsh Sunshine")` e
  `hasWeather("Rain", "Heavy Rain")`; avaliar em seguida implementar a falha total de Water sob
  Harsh Sunshine e Fire sob Heavy Rain. Rodar suíte + oráculo.

- [X] **5. `type-chart.ts:419` — efetividade 0.125 vira 0 (imunidade falsa)** — RESOLVIDO em 2026-07-12,
  **REVERTIDO em 2026-07-12 (mesma sessão do item 15)** por estar mecanicamente errado.
  **Parecer original:** Bug alcançável, confirmado com repro:
  `getEffectiveness("Fire", "Fire", "Water", "Heatproof")` → 0.25 base × ability = 0.125, que
  não bate nenhum `if` e cai no `return 0`. Defensor 4x resistente + ability de halving vira "imune".
  **Correção original aplicada:** `TypeEffectiveness` ganhou o literal `0.125`; `getEffectiveness`
  (halving por ability e multiplicador base), `formatEffectiveness` (→ `"1/8"`) e `isResistance`
  em `type-chart.ts` tratam o novo valor. `TypeCoverage.getCellClass` mapeia `0.125` → classe
  `"resistance"`. Nos dois componentes de offensive-coverage (desktop/mobile), o filtro de
  `notVeryEffective` ganhou `0.125`. Também foi adicionado **Purifying Salt** (halving de Ghost)
  ao `ABILITY_RESISTANCES`, junto de `Heatproof`/`Thick Fat`/`Water Bubble` já existentes.
  **Por que foi revertido:** verificação no source real do pokemon-showdown (item 15, 2ª rodada)
  confirmou que **nenhuma dessas 4 abilities muda type effectiveness de fato** — todas usam
  `onSourceModifyAtk`/`onSourceModifySpA`/`onSourceModifyDamage` com `chainModify(0.5)`
  (`data/abilities.ts`, Heatproof 1823-1847, Purifying Salt 3608-3637, Thick Fat 5006-5025, Water
  Bubble 5369-5409), que reduzem o dano final sem tocar no `typeMod`. A mensagem de batalha real
  continua "super effective" normalmente; o halving da effectiveness nominal era uma modelagem
  errada desde a versão anterior a este item (que já tinha Thick Fat/Heatproof/Water Bubble como
  halving, antes até do bug do 0.125 aparecer). Mesmo padrão mecânico de Solid Rock/Filter/Prism
  Armor/Fluffy (só leem `typeMod`, nunca o alteram) — nenhuma dessas 8 abilities pertence à
  `type-chart.ts`.
  **Reversão aplicada:** removidos de `type-chart.ts`: literal `0.125` do `TypeEffectiveness`,
  entradas `Thick Fat`/`Heatproof`/`Water Bubble`/`Purifying Salt` do `AbilityName` e todo o
  dicionário `ABILITY_RESISTANCES`, o bloco de halving em `getEffectiveness`, o branch `0.125` em
  `formatEffectiveness` e `isResistance`. Revertido também `getCellClass`
  (`type-coverage.ts`) e o filtro `notVeryEffective` nos dois componentes offensive-coverage
  (desktop/mobile) para não incluir mais `0.125`. Specs correspondentes removidos (não
  regressão — comportamento que não deveria existir). Suíte completa verde (2662 testes, exceto
  o flake conhecido do item 16, não relacionado).
  **Se reaparecer no futuro:** qualquer nova ability/item que precise reduzir dano sem mudar
  effectiveness (padrão `onSourceModifyDamage`) NÃO deve entrar em `getEffectiveness`/`type-chart.ts`
  — pertence ao motor de dano real (`src/domain/calc/engine/modifiers.ts`), não à feature de
  coverage de tipos.

- [X] **6. Auditoria de abilities de aliado no dano combinado (padrão Unnerve)**
  **Parecer:** O bug do Unnerve (já corrigido via `UnnerveAdjuster`) revelou um padrão: efeitos
  "de um Pokémon em campo" que o código só lê do atacante do hit, ignorando o `secondAttacker`.
  Candidatos: **Friend Guard** (hoje só flag manual), **Flower Gift/Steely Spirit de aliado**
  (zero writers — pode ser bug ativo, não só extensão futura), Pressure/Intimidate
  (provavelmente não afetam dano, mas confirmar).
  **Solução:** Para cada candidato: grep de onde a flag/condição é lida; verificar se existe
  `CalcAdjuster` derivando do `secondAttacker` (modelo: `NeutralizingGasAdjuster`/`UnnerveAdjuster`);
  se não, montar cenário real de 2 atacantes e comparar com o jogo. Para Friend Guard, criar
  adjuster análogo. Para Flower Gift/Steely Spirit de aliado, primeiro adicionar
  `isFlowerGift`/`isSteelySpirit` ao `Side` e o modifier espelhando `gen789.ts:1435/1445` —
  decisão do usuário pendente.

---

## 🟡 MÉDIO

- [X] **15. Type calc (feature de coverage) ignora Ring Target / Iron Ball / itens e abilities de imunidade adicionais — diverge da calc de dano**
  **Parecer:** Achado ao concluir o item 3 (2026-07-12). A `type-calc`
  (`src/domain/multicalc/type-calc/type-chart.ts`, `getEffectiveness`) é um caminho
  **totalmente separado** do motor de dano: considerava só abilities de imunidade
  (`ABILITY_IMMUNITIES`, ex. Levitate) e nenhum item — não havia `hasItem`/Ring Target/Iron
  Ball/Klutz/Air Balloon no arquivo, e a função nem recebia item do defensor. Levantamento
  completo (2026-07-12) contra o motor de dano (`src/domain/calc/engine/guards.ts`,
  `type-effectiveness.ts`, `modifiers.ts`) mapeou tudo que falta:
  **Decisão do usuário:** implementar o essencial (itens + abilities de imunidade total do
  defensor) agora; registrar os achados extras abaixo para depois.
  **Correção de escopo em 2026-07-12 (2ª rodada):** verificação contra o source real do
  pokemon-showdown (`~/dev/pokemon-showdown`, `data/abilities.ts`/`data/items.ts`/`sim/pokemon.ts`)
  mostrou que **Bulletproof, Soundproof, Queenly Majesty/Dazzling/Armor Tail e Wind Rider NÃO
  mudam type effectiveness** — usam `onTryHit`/`onFoeTryMove` retornando `null`/`false`, que
  bloqueia o hit **antes** de qualquer cálculo de tipo (mesmo padrão mecânico do Heatproof/Purifying
  Salt, que reduzem dano via `onSourceModifyAtk`/`onSourceModifySpA` sem tocar no `typeMod`). Essas
  4 abilities foram **removidas** da implementação (chegaram a ser adicionadas e revertidas na
  mesma sessão) — não pertencem à type-calc por não serem type effectiveness real, mesmo que o
  resultado prático (0 dano) pareça "imunidade de tipo" para o usuário.
  **Correção aplicada (final):** `getEffectiveness` (`type-chart.ts`) ganhou parâmetro `defender:
  DefenderInput { ability, item }`. Cobertos, todos confirmados como mudança real de type
  effectiveness no pokemon-showdown (`onEffectiveness`/`onNegateImmunity`/`isGrounded` dentro de
  `runImmunity`): **Air Balloon** (imunidade Ground enquanto o item existir — via `isGrounded()`
  retornando `false`, `sim/pokemon.ts:2164`), **Iron Ball** (remove imunidade Ground de
  Levitate/Eelevate — `sim/pokemon.ts:2158` + `data/items.ts:3052`), **Ring Target** (remove
  qualquer imunidade de tipo — `onNegateImmunity: false`, `data/items.ts:5229`, propagado por
  `runImmunity`), **Klutz** (anula Ring Target e Iron Ball do defensor via `ignoringItem()`).
  **Fora de escopo desta correção (registrados para depois):**
  - Scrappy / Mind's Eye / Foresight (atacante, ignoram imunidade Ghost) e Mold Breaker (zera
    ability do defensor) — ver item 17.
  - Bug real encontrado no motor de dano: `guards.ts:213` só checa `Scrappy`, enquanto
    `modifiers.ts:58` (só usado por Collision Course/Electro Drift) checa
    `Scrappy || Mind's Eye || Foresight` — ver item 18.
  - ~~Correção pendente do item 5~~ — **feita ainda na mesma sessão** (2026-07-12, 3ª rodada):
    `Heatproof`/`Purifying Salt`/`Thick Fat`/`Water Bubble` removidas de `ABILITY_RESISTANCES` e
    `AbilityName`; suporte a `0.125` revertido por completo. Ver detalhes no item 5.

- [X] **17. Type calc não considera Scrappy / Mind's Eye (atacante) nem Mold Breaker** — RESOLVIDO
  em 2026-07-12, após revisão do critério de escopo usado na 1ª análise.
  **Parecer original:** No motor de dano real (`guards.ts:213`, `modifiers.ts:58`), abilities do
  **atacante** (Scrappy, Mind's Eye) e o efeito de campo Foresight removem a imunidade Ghost vs
  moves Normal/Fighting. Mold Breaker zera a ability do defensor. Nenhum desses é considerado hoje
  em `getEffectiveness`.
  **1ª análise (fechado como fora de escopo):** verificação no pokemon-showdown mostrou que Scrappy/
  Mind's Eye/Foresight/Mold Breaker atuam em `runImmunity`/evento `NegateImmunity`, um canal
  separado de `runEffectiveness` (o que calcula o `typeMod` nominal) — mesmo critério mecânico
  usado para excluir Bulletproof/Soundproof/Queenly Majesty/Wind Rider no item 15. Por esse
  critério, a mecânica foi descartada da type-calc.
  **Por que foi reaberto:** o usuário questionou o critério. A distinção que importa não é "qual
  canal interno do showdown implementa isso", e sim **o que a pergunta responde**: Scrappy/Mind's
  Eye respondem literalmente "esse tipo ainda é imune a esse defensor?" — a mesma pergunta que Ring
  Target/Iron Ball/Air Balloon (já implementados) respondem. Bulletproof etc. bloqueiam o move por
  categoria (bala/som/prioridade), não por tipo — critério diferente, continuam fora.
  **Escopo final:**
  - **Scrappy / Mind's Eye** (ability do atacante): implementadas. **Foresight** ficou de fora —
    não é ability, é um volátil de batalha temporário (`isNonstandard: "Past"` no showdown, não
    aprendido por nenhum Pokémon a partir da Gen 8, irrelevante para VGC) e o modelo `Pokemon` do
    domínio (usado pelo team builder) não tem conceito de estado de batalha/volatiles — não há onde
    guardar "esse Pokémon usou Foresight" num set estático.
  - **Mold Breaker** (e Teravolt/Turboblaze, mesmo efeito): implementado via omissão da ability do
    defensor no call site, não mudança de assinatura de `getEffectiveness` — Mold Breaker suprime
    a ability inteira, o que equivale a chamar a função como se o defensor não tivesse ability.
  **Correção de mecânica (achado durante a implementação, 2026-07-12):** a primeira versão
  implementou Scrappy/Mind's Eye como "força 1x quando o resultado seria 0", o que está **errado**
  para defensores dual-type com Ghost. Confirmado no pokemon-showdown (`sim/pokemon.ts:2214-2239`
  `runEffectiveness`, `sim/dex.ts:268-290` `Dex.getEffectiveness`) que o motor real **soma
  expoentes por tipo** e trata imunidade (`damageTaken === 3`) como contribuição `0` (neutra) nesse
  somatório — não como um fator que zera tudo. Ou seja, Fighting (Scrappy) vs Ghost/Poison
  (ex.: Gengar) deve resultar em **0.5x** (só a resistência do Poison conta), não 1x. Corrigido em
  `type-chart.ts`: a contribuição do tipo Ghost é tratada como neutra (1x) apenas para esse tipo
  específico, preservando o multiplicador do tipo secundário.
  **Implementação final:**
  - `type-chart.ts`: novo parâmetro `attacker?: AttackerInput { ignoresGhostImmunity }`; helper
    privado `typeEffectivenessAgainst` trata Ghost como neutro por tipo (não por resultado final)
    quando a flag está ativa e o ataque é Normal ou Fighting.
  - `type-coverage.ts`: novo helper `getAttackerInput(pokemon)` (mapeia Scrappy/Mind's Eye) e
    `hasMoldBreaker(pokemon)` (mapeia Mold Breaker/Teravolt/Turboblaze), usados em
    `getOffensiveCoverageAgainstTeam` (atacante real) e `getDefensiveCoverageAgainstTeam`
    (atacante real do lado do target team).
  **Achado colateral:** nenhum teste cobria Air Balloon/Iron Ball/Ring Target/Klutz (implementados
  no item 15) até esta sessão — cobertura adicionada agora em `type-chart.spec.ts` junto com os
  testes novos de Scrappy/Mind's Eye/Mold Breaker.
  **Testes:** `type-chart.spec.ts` ganhou `describe` para Air Balloon, Iron Ball, Ring Target e
  Scrappy/Mind's Eye (incluindo o caso dual-type Ghost/Steel = 0.5x). `type-coverage.spec.ts`
  ganhou testes de Mold Breaker (Rotom-Wash Levitate exposto a Ground = 2x) e Scrappy via Flamigo
  (ability default do dataset) vs Gengar (0.5x, não 1x). Um teste pré-existente em
  `type-coverage-insights.spec.ts` (Flamigo com Scrappy default vs Flutter Mane) foi corrigido de
  `value: 3` para `value: 2`, refletindo a perda real de uma imunidade que o teste assumia
  incorretamente. Suíte completa verde (2681 testes, exceto o flake conhecido do item 16).

- [X] **18. Bug real no motor de dano: Mind's Eye ausente do cálculo principal de effectiveness** —
  RESOLVIDO em 2026-07-12.
  **Parecer:** Achado no levantamento do item 15, fora do escopo da type-calc — bug no motor de
  dano de verdade, não na feature de coverage. `computeTypeEffectiveness` (`guards.ts:213`), usado
  no cálculo principal de effectiveness de qualquer move, só verificava `attacker.hasAbility
  ("Scrappy")` para ignorar imunidade Ghost vs Normal/Fighting. Já `modifiers.ts:58` — usado só
  para o base power de Collision Course/Electro Drift — verificava corretamente
  `Scrappy || Mind's Eye || Foresight`. Um atacante com Mind's Eye não deveria ser bloqueado por
  Ghost, mas a calc de dano principal tratava como imune mesmo assim.
  **Confirmado por prova contra a lib real** (`~/dev/damage-calc`, gen 9): Machamp (Mind's Eye)
  Close Combat vs Gengar deveria bater 84-100 de dano (mesmo valor de Scrappy, ambas ignoram a
  imunidade Ghost do mesmo jeito); nosso motor retornava `damage: 0` antes da correção.
  **Foresight não incluído**: não é ability (é volátil de batalha, `isNonstandard: "Past"` no
  showdown, não aprendido por ninguém desde a Gen 8) — mesma decisão de escopo do item 17.
  **Correção aplicada:** `guards.ts:213`, `isGhostRevealed = attacker.hasAbility("Scrappy")` virou
  `attacker.hasAbility("Scrappy", "Mind's Eye")`.
  **Testes:** novo `describe("Type effectiveness overrides (items and abilities)")` em
  `damage-calc.spec.ts`, casos "Scrappy" e "Mind's Eye" com valores idênticos (84-100), validados
  byte a byte contra a lib real. Suíte completa verde (2672 testes) e oráculo sem novas mismatches
  (161 MATCH, mesmas 3 mismatches pré-existentes e já descartadas).

- [X] **19. Bug real no motor de dano: Air Balloon nunca implementado (nenhuma imunidade a Ground)** —
  RESOLVIDO em 2026-07-12, achado durante a prova do item 18.
  **Parecer:** `computeTypeEffectiveness` (`guards.ts:211-238`, único ponto que decide o
  `typeEffectiveness` usado no cálculo de dano) nunca checava Air Balloon. `Air Balloon` só
  aparecia em `stats.ts:9` (dentro de `isGrounded()`, usado para terrain/prioridade) e em
  `desc.ts:717` (texto de descrição) — a imunidade de tipo em si (o que faria um move Ground
  causar dano 0) nunca existiu. Confirmado por prova isolada contra a lib real: Garchomp Earthquake
  vs Incineroar segurando Air Balloon dava o **mesmo dano** (152-182) com ou sem o item — deveria
  ser `0` (imune).
  **Por que passou despercebido:** o bug só se manifesta quando o defensor tem um item Ground-
  relevante mas NÃO tem uma ability de imunidade a Ground (Levitate/Eelevate) — nesse caso
  `applyTypeGuards` (`guards.ts:71-86`) nunca tem chance de barrar o hit, porque ele só age quando
  `typeEffectiveness === 0` já vem calculado assim de `computeTypeEffectiveness`.
  **Correção aplicada:** em `computeTypeEffectiveness`, bloco novo antes do ajuste de Iron Ball:
  `if (move.hasType("Ground") && defender.hasItem("Air Balloon")) typeEffectiveness = 0`.
  **Testes:** caso "Air Balloon" em `damage-calc.spec.ts` (mesmo `describe` do item 18),
  `expect(result.damage).toEqual(0)`. Suíte completa verde, oráculo sem novas mismatches.

- [X] **7. `description()` lança exceção com dano 0 (imunidades)**
  **Parecer:** Fragilidade real: `getKOChance` lança quando o dano é 0. Se algum caminho da app
  chamar `description()` num matchup imune sem checar antes, é crash em produção. Ainda não
  verificado do lado da app.
  **Solução:** Grep na app por chamadas de `description()` e verificar se há guard de
  `damage === 0` a montante. Se não houver, ou adicionar o guard, ou fazer `description()`
  repassar `err: false` para `fullDesc` (parâmetro já existe) e retornar texto seguro.

- [X] **8. `guards.ts:143` — checagem Nature Power+Prankster morta dentro do ramo Terrain Pulse**
  **Parecer:** Código morto por construção: o bloco só executa quando
  `originalName === "Terrain Pulse"`, então `move.named("Nature Power")` é sempre falso. Parece
  lógica de Nature Power copiada para o lugar errado — pode indicar feature ausente (Nature Power
  resolvendo tipo por terreno).
  **Solução:** Perguntar ao usuário se Nature Power deveria ter resolução dinâmica de tipo
  própria. Se sim, criar branch `else if (move.named("Nature Power"))` dedicado; se não, remover
  a sub-condição morta.

- [X] **9. Items engine-only ausentes do dataset (Thick Club, Deep Sea Tooth/Scale, Metal Powder, Type Gems)**
  **Parecer:** Decisão em aberto, não bug: o motor calcula, mas nenhum `Pokemon` tipado consegue
  equipar (só via cast). Os Pokémon donos estão no dataset; só os items sumiram. Já protegido por
  `items-engine-only.spec.ts`.
  **Solução:** Decisão do usuário entre: (a) repor os items em `item-data.ts` (specs viram
  normais), (b) remover a lógica do motor, ou (c) manter como está (documentado).
  Recomendação: (a) para Type Gems ao menos, se relevantes ao formato; caso contrário (c).

---

## 🟢 BAIXO

- [X] **10. `calculateMulti([])` → crash com array vazio**
  **Parecer:** Degenerado (UI nunca chama assim), mas fragilidade real. O construtor de
  `MultiResult` também aceita `results: []` sem validar.
  **Solução:** Guard `if (attackers.length === 0)` no início de `calculateMulti` retornando erro
  claro ou resultado vazio consistente com o fallback `"No result"` já existente.

- [X] **11. `MultiResult.description()` só formata 2 atacantes**
  **Parecer:** O cálculo usa todos; só o texto trunca em `results[0]`/`results[1]`. Só é bug se a
  app permitir combinar 3+.
  **Solução:** Verificar na UI se combinação de 3+ é possível. Se sim, generalizar o join
  ("A, B AND C"); se não, documentar como limite intencional.

- [X] **12. `isSwitching` — efeito vivo, texto morto**
  **Parecer:** `modifiers.ts:149` aplica o efeito (Analytic) mas nunca seta
  `description.isSwitching`, deixando o ramo de texto inalcançável.
  **Solução:** Setar `description.isSwitching = true` no mesmo ponto onde o modifier aplica, e
  cobrir o ramo de `buildDescription` com teste.

- [X] **16. `pdf-export.service.spec.ts` — flaky com `TestBed.configureTestingModule` "already instantiated"**
  **Parecer:** Observado 2026-07-12 rodando a suíte filtrada por `--include` (fora do contexto do
  bug 0.125, arquivo não tocado). Falha intermitente: `Cannot configure the test module when the
  test module has already been instantiated` em `pdf-export.service.spec.ts:46`, sugerindo
  `TestBed` sendo reaproveitado entre specs/arquivos sem reset (`TestBed.resetTestingModule()`)
  ou vazamento de estado entre suites quando rodadas com `--include` seletivo. Na rodada seguinte,
  sem alterar nada, passou normalmente — não reproduz de forma determinística.
  **Solução:** Investigar se falta `afterEach(() => TestBed.resetTestingModule())` no spec ou em
  setup global; verificar se o problema só ocorre com `--include` (execução parcial) ou também na
  suíte completa. Rodar `npm run test` completo algumas vezes para medir taxa de flakiness antes
  de mexer.

- [X] **13. Padrão de tipagem `?` opcional que nunca é `undefined` em runtime (`Move.timesUsed` e afins)**
  **Parecer:** Higiene de código: campos opcionais sempre atribuídos com fallback no construtor
  geram branches `??`/`?.` mortos e non-null assertions espalhados.
  **Solução:** Varredura em `Move`/`Pokemon`/`Field`: para cada campo `?` atribuído
  incondicionalmente no construtor, estreitar o tipo da propriedade da classe (não do options) e
  remover `??`/`!` dos consumidores. Mudança mecânica, validar com suíte completa.

- [X] **14. Suspeitas de dead code em `multi-result.ts` (linhas 235, 336, 344) e artefato de coverage v8 em classes `@Injectable`**
  **Parecer:** Baixo valor: fallbacks de parsing de texto que o formato atual nunca aciona
  (provável legado), mais um artefato de instrumentação do v8 em classes decoradas
  (`damage-result-order.service.ts:5`, `calc-store.ts:814`) que não é problema de código.
  **Solução:** Opcional: remover os fallbacks de regex/`includes(" -- ")` de `multi-result.ts`
  após confirmar com grep que nenhum caminho produz esses formatos. O artefato do v8 só merece
  ação se reaparecer sistematicamente (aí avaliar trocar o coverage provider).

---

## 📦 ev-optimizer (agrupado, sem análise)

- Reconhecimento inicial: 285 branches em 9 arquivos; estratégia "só API pública `optimize()`" (§15).
- Branches supostamente mortos nos arquivos pequenos: ev-intervals-calc L11,
  ev-optimizer-utils L43/L103, single-attacker-optimizer L104, survival-checker L30 (default-args).
- Classificação dos 121 branches do solution-combiner (mortos por default-args/guards de soma
  vs vivos algorítmicos).
- Sessão de fechamento fase 1: 285 → 198 branches (método de instrumentação `__B` + sweep).
- Novos supostamente mortos da fase 1: solution-combiner L142, defensive-ev-optimizer L111-else,
  refinement-stage L28/L31, attacker-selector L158/160/164.
- Fase 2: 198 → 156 branches (80.4%); cenários novos cobertos e classificação final dos 156
  restantes (mortos por tipo/guard + fallbacks de janela quase-vazia: solution-combiner
  L178/L184/L191, refinement-stage reduceEvs L200-215, double-attacker mixed heuristic L316-373).
- Conclusão registrada: cobrir o restante exigiria mockar survival-checker/combiner, violando a
  regra de "bater na calc real".

---

## Resumo executivo

2 bugs críticos (dropsStats em hit único; crash do Tera Stellar), 4 de prioridade alta
(imunidade Ground incompleta, boost de Harsh Sunshine/Heavy Rain, efetividade 0.125→0,
auditoria de abilities de aliado), 3 médios e 5 de baixa prioridade. Todos os itens
críticos/altos exigem confirmação do usuário antes de mexer no motor, e todos têm caminho de
correção mapeado com validação obrigatória via suíte + oráculo
(`node history/test-strategy/oracle/oracle.mjs`).
