# Notas técnicas — achados durante a cobertura de testes (H1+)

Arquivo único, uma seção por achado. Ordenado por criticidade: bugs/fragilidades
ainda presentes no código primeiro, depois decisões em aberto, metodologia do
oráculo e, por fim, o registro de cobertura.

---

## stats.ts — 83% → 100% (100/100) (2026-07-12)

`src/domain/calc/engine/stats.ts` levado a 100% de branches. Testes novos em
`stats.spec.ts`: Sand Rush/Swift Swim/Slush Rush/Surge Surfer (as 4 abilities de
`speedMods.push(8192)` que faltavam), Quick Feet (boost + suprimindo a redução de
paralisia), Slow Start, Quark Drive (`isQPActive`/`getQPBoostedStat` isolados, incluindo
o caso `boostedStat` setado manualmente sem a ability correspondente), bloqueio do boost
de item quando Unburden já está ativo, Iron Ball, Quick Powder+Ditto (item engine-only,
ausente do dataset — mesmo padrão do §6, usado via `as never`), Protean/Libero (STAB
custom, incluindo o caso bloqueado por Tera em tipo diferente), `getWeight` com Heavy
Metal/Light Metal (nota: `Math.trunc` no cálculo, não divisão simples — Skarmory 50.5kg
vira 25.2, não 25.25), Eelevate/Air Balloon em `isGrounded`. 100% real, nenhum branch
morto neste arquivo.

## multi-result.ts — 83% → 90% (90/100), 9 branches remanescentes de baixo valor/dead code (2026-07-12)

`MultiResult.afterTurn()` não tinha NENHUM teste direto antes desta rodada (só exercitado
indiretamente via `description()`/`getHKO()` nos specs de `damage/multi-*.spec.ts`).
Criado `multi-result-after-turn.spec.ts` (6 testes): HP ao longo de turnos sem EOT,
consumo de berry genérica (Sitrus) com cap em maxHP, resist berry (Occa) só no primeiro
hit, chegada a KO com `hp:0`, e Stamina via `StaminaBoostSimulator`. Também 1 teste novo
em `multi-result-formatting.spec.ts` instanciando `MultiResult` diretamente com
`results: []` (bypassa o crash de `calculateMulti([])` documentado no §4 — o construtor
público não valida array vazio), cobrindo o fallback `"No result"` da `description()`.

Restam 9 branches, investigados individualmente:
- **Linha 44** (`if (subArrays.length === 0) return 0` dentro do `sumDamage` de
  `afterTurn`): só ocorre se `result.damage` for um array vazio no nível superior.
  Testado com `Splash` (dano 0) — `extractDamageSubArrays` retorna `[[0]]` (não vazio),
  então mesmo dano zero não aciona esse branch. Não encontrei um `Move`/cenário real que
  produza array de damage vazio; não investido mais tempo em forçar isso.
- **Linha 75** (`damagesWithoutBerryAtIndex.map((d, idx) => d ?? damagesAtIndex[idx])`,
  sub-branch do lado direito do `?imit:`): exigiria multi-hit com berry de tipo (Occa
  etc.) ativa em turnos 2+, ANDE algum resultado individual sem correspondente
  `damagesWithoutBerryAtIndex` (fica `null`) caindo no fallback. Não montei o cenário
  exato — provavelmente precisa de 3+ atacantes com berries mistas; baixo valor dado o
  esforço de reprodução.
- **Linha 85** (`if (currentHP > defender.maxHp())` após consumir berry no meio do
  turno): preciso de HP quase cheio + berry (Sitrus/tipo) cujo recovery ultrapasse
  `maxHp()`. Tentei via `curHP` alto mas o construtor de `Pokemon` já clampa
  `originalCurrrentHp` ao `rawStats.hp` (`pokemon.ts:66`), então não dá pra simular "HP
  acima do máximo antes do turno" — precisaria calcular o dano exato do primeiro turno
  para deixar o HP MUITO perto do máximo antes do recovery. Não persegui além disso.
- **Linha 101** (mesmo padrão da 85, mas para o recovery de fim de turno/Leftovers):
  mesma dificuldade de ajuste fino de HP relatada acima.
- **Linha 235** (`defenderNameAndDamage.includes(" -- ") ? ... : ...` dentro de
  `description()`, branch `true`): investigado com probe — `defenderNameAndDamage` nesta
  altura do código é só o texto "HP / Def Nome: min-max (%)", nunca contém "--" (o "--"
  só é concatenado DEPOIS, junto com `koChanceText`). Parece código morto por construção
  (talvez defensivo contra uma mudança futura em `updateDefenderDamageText`), mas não
  isolei 100% a prova formal — fica documentado como suspeito de dead code, não
  confirmado.
- **Linha 324** (`getMinMaxDamageFromRolls`, `if (sub.length > 0)` branch falso): mesmo
  problema da linha 44 — precisaria de um sub-array de damage vazio dentro de
  `extractDamageSubArrays(result.damage)`, não reproduzido.
- **Linha 336** (`updateDefenderDamageText`, `if (lastColonIndex !== -1)` branch falso):
  o texto de entrada sempre tem um ":" no formato padrão "... Nome: min-max (%)" — o
  fallback regex (linhas 342-346) parece existir para um formato de texto que este motor
  nunca produz mais (talvez legado de uma versão anterior do formato de description).
  Não reproduzido.
- **Linha 344** (o `regex.test(text)` dentro do fallback acima — inatingível pela mesma
  razão: nunca chega lá porque a 336 já resolve antes).
- **Linha 356** (`this.defender.boosts.def ?? 0`): mesmo padrão já documentado várias
  vezes no arquivo — `Pokemon.boosts` é sempre populado com os 5 stats numéricos via
  `Pokemon.withDefault` (`pokemon.ts:58`), nunca `undefined`. Morto por garantia do
  model, confirmado.

Resumo: dos 9 restantes, 2 confirmados mortos por garantia de dados/model (356, e por
extensão 336/344 que parecem ligados ao mesmo tipo de defensividade morta), os demais
(44/75/85/101/235/324) são reproduzíveis em teoria mas exigem cenários muito específicos
de array vazio ou ajuste fino de HP que não valeram o custo/risco de forçar um teste
artificial. Nenhum foi contornado com teste falso.

---

## mega-stone.ts — spec novo, 28/29 branches (97%), 1 morto confirmado por paridade de dados (2026-07-12)

`src/domain/multicalc/model/mega-stone.ts` não tinha spec dedicado (só exercitado
indiretamente via componentes de UI). Criado `mega-stone.spec.ts` com 29 testes cobrindo
`isMegaStone`, `isMega`, `getBaseName`, `extractMegaStoneLetter`, `getMegaFormName` e
`isMegaStoneCompatible` (incluindo os casos especiais Floette-Eternal/Meowstic via
`MEGA_FORM_MAPPING`/`MEGA_FORM_REVERSE_MAPPING`, e os dual-mega Charizard X/Y).

Resta 1 branch morto: `isMegaStoneCompatible` linha 33 (`if (!itemBaseName) return
false`, onde `itemBaseName = getBasePokemonNameFromItem(item)`). Só seria alcançável se
existisse um item com `isMegaStone: true` em `item-data.ts` sem entrada correspondente em
`MEGA_STONE_TO_POKEMON_NAME` (`mega-stone-data.ts`). Confirmado por probe (`FORCE_FAIL`)
iterando todo `ITEM_DETAILS`: **zero** itens `isMegaStone: true` ficam sem mapeamento —
os dois datasets têm exatamente 75 entradas cada, em paridade total. Não é um bug (os
dados estão corretos); é só uma defesa no código para o caso de dessincronia futura
entre os dois arquivos de dados, que hoje nunca dispara.

---

## guards.ts — 81.3% → 99% (206/208), 2 branches mortos confirmados (2026-07-12)

Cobertura levada de 169/208 para 206/208 branches em `src/domain/calc/engine/guards.ts`
(`guards.spec.ts` ganhou ~20 testes novos): Tera Blast/Tera Starstorm category flip
(incluindo o ramo Special quando SpA > Atk), Weather Ball nos climas restantes (Harsh
Sunshine/Heavy Rain/Sand/Hail/Snow) + o ramo Mega Sol vs não-Mega-Sol na description,
Terrain Pulse nos 4 terrenos + fallback Normal + airborne + os 2 ramos de quando
`description.moveType` é setado (Dark-type defender / Psychic Terrain grounded),
Galvanize/Normalize/Dragonize (as 3 abilities Ate que faltavam) + o ramo "não é
Normal-type" que bloqueia a troca, Aura Wheel/Raging Bull/Ivy Cudgel em todas as formas
alternativas + fallback (nenhuma forma reconhecida — mantém tipo original), Tera Shell
em `computeTypeEffectiveness` (ativa/não-ativa por HP não-cheio, SR sem Boots, SR com
Boots, Spikes sem Flying, Spikes com Flying), e Shell Side Arm com/sem Wonder Room
escolhendo a categoria certa.

Restam 2 branches mortos, ambos documentados como o mesmo problema estrutural:

1. **Linha 46** (`if (move.named("Pain Split")) { ... return damage ... }` dentro de
   `applyEarlyReturnGuards`) — todo o bloco é inalcançável porque Pain Split é
   `category: "Status"` no dataset (`move-data.ts:3355`), e a linha 25-27
   (`if (move.category === "Status") return { type: "immune" }`) já retorna ANTES de
   chegar na linha 46. O teste existente "Pain Split is a Status move and returns
   immune" já documenta esse comportamento — o branch de dano fixo do Pain Split nunca
   executa neste motor.
2. **Linha 143** (dentro do branch de `Terrain Pulse`): a sub-condição
   `move.named("Nature Power") && attacker.hasAbility("Prankster")` — o lado direito
   (`hasAbility("Prankster")`) nunca é avaliado porque o lado esquerdo já é sempre
   falso: Nature Power é um move `Status` com `originalName: "Nature Power"` próprio
   (`move-data.ts:3722`), nunca `"Terrain Pulse"`, e o bloco inteiro só executa quando
   `move.originalName === "Terrain Pulse"` (linha 139). Ou seja, a checagem de
   Nature Power+Prankster dentro do ramo de Terrain Pulse é código morto por
   construção — parece ter sido copiado de uma lógica de Nature Power separada
   (que resolveria o tipo do move dinamicamente) mas nunca foi de fato ligada aqui.
   Vale confirmar com o usuário se este `if` deveria estar em outro lugar do arquivo
   (talvez faltando um branch `else if (move.named("Nature Power"))` próprio, hoje
   ausente) — não alterei o código, só documentei.

---

## src/app + src/infrastructure — branches mortos confirmados na rodada autônoma de 6 arquivos (2026-07-12)

Cobertura autônoma de `theme.service.ts`, `export-poke.service.ts`, `speed-calc-options-store.ts`,
`damage-result-order.service.ts`, `pokemon-by-regulation.ts` e `calc-store.ts`. Resultado final e
raciocínio de cada branch morto restante:

**`theme.service.ts`** (57.9% → 17/19, 89%): restam 2, ambos `typeof document ===
"undefined"` (`applyTheme`/`applyCollor`). Angular test builder roda em ambiente browser-like
(jsdom equivalente) — `document` está sempre definido nos testes. Guard só faria sentido em SSR
real, que não é o ambiente de teste deste projeto.

**`speed-calc-options-store.ts`** (64.4% → 40/45, 89%): restam 5 — `REGULATION_FILTER_LABELS`
fallback (`?? "Reg M-B"`), `constructor`'s branch de "sem estatística" (`hasStatisticsForRegulation`
false), e as duas condições análogas em `updateRegulation`. Todos dependem de
`this.regulation()` não ser `"MB"`, mas `Regulation` (`multicalc/types.ts`) só tem esse valor —
`type Regulation = "MB"` — e o dataset de estatísticas sempre tem a chave `MB` com dados reais.
Morto por tipo, não por falta de cenário de teste.

**`pokemon-by-regulation.ts`** (70.6% → 12/17, 71%): restam 5 — os `?? []` de
`topUsageByRegulation[regulation]` (linhas 18/45/46) e os dois ramos `indexA/B === -1 ? Infinity`
em `sortByRegulationOrder` (linhas 48/49). O primeiro é morto porque `topUsageByRegulation` sempre
tem a chave `MB` (única regulation existente). O segundo é morto por construção: `sortByRegulationOrder`
só roda depois de `.filter(pokemon => regulationList.includes(pokemon.name))` — logo todo item que
chega no sort já está garantidamente na lista, `indexOf` nunca retorna `-1`. Mesmo padrão
"filter-then-sort" já documentado antes em `type-coverage-insights.ts` (ver §H2 de branches
inalcançáveis em domain/multicalc).

**`export-poke.service.ts`** (59.6% → 55/57, 96%): restam 2 (mesma branch, dois `binary-expr` —
`arg instanceof Pokemon || (arg && typeof arg === "object" && "name" in arg)`). O sub-caso
isolado "não é instância de Pokemon, mas tem propriedade `name`" só é exercitável passando um
objeto plano pelo array de args — mas esse objeto, se sobreviver ao filtro, é then passado para
`.parse()`, que acessa `.item`/`.ability.name`/etc. e quebraria com um objeto incompleto. Não
forcei esse teste (crash artificial não agrega valor); ficou como gap de baixo risco, não dead code
por estrutura — apenas caro demais para cobrir sem simular um objeto Pokemon completo via cast.

**`damage-result-order.service.ts`** (66.7% → 7/9, 78%) e **`calc-store.ts`** (70.8% → 119/120,
99%): ambos com 1-2 branches que o `coverage-final.json` reporta como não cobertos numa linha sem
nenhuma expressão condicional real (ex: `damage-result-order.service.ts:5`, que é só
`export class DamageResultOrderService {`; `calc-store.ts:814`, cuja lógica foi confirmada correta
e exercitada via probe isolado com FORCE_FAIL). Aparenta ser artefato de instrumentação do v8
coverage em classes decoradas com `@Injectable()` — não peguei em nenhum outro arquivo desta sessão,
mas já é o segundo caso (o primeiro foi só notado, não registrado). Vale reavaliar se aparecer de
novo: se for realmente sistemático, pode valer a pena reportar upstream ou trocar o coverage
provider, mas por ora não impede considerar essas classes como efetivamente 100% cobertas.

---

## base-power.ts — 2 branches mortos confirmados (2026-07-12)

Ao levar `base-power.ts` de 69/95 para 93/95 branches, sobraram 2 inalcançáveis por
estrutura: `defender.stats.spe === 0` (Electro Ball, linha ~36) e `attacker.stats.spe
=== 0` (Gyro Ball, linha ~50). Nenhum Pokémon no dataset (`pokemon-data.ts`) tem base
Speed 0, e a fórmula de stat (`calcStat`, `pokemon.ts:146`) nunca produz stat final 0
mesmo com IV/EV 0 e -6 de boost (o boost não é aplicado neste caminho de cálculo de
base power via `computeFinalStats` isolado, e o piso da fórmula de stat em si já é >0
para qualquer base stat real). Confirmado tentando forçar via boosts e via espécie de
baixa Speed — ambos convergem para stat > 0. Deixados sem teste, mesmo padrão do
`?? 0` de `Move.timesUsed` já documentado abaixo.

## prepare-combatants.ts / model/result.ts — reforço do padrão "clone interno" ao testar
efeitos que mutam o Pokémon passado para calculate() (2026-07-12)

Ao cobrir os branches de Meteor Beam/Electro Shot (auto-boost de SpA antes do dano) em
`prepare-combatants.ts`, a primeira tentativa foi assertar `attacker.boosts.spa` após
`calculate(attacker, ...)` — sempre veio `0`, porque `calculate()` clona attacker/defender
internamente (mesmo padrão já visto com Mummy/Wandering Spirit em `pre-damage-effects`).
Correção: observar o efeito via `result.description()`, que já imprime o prefixo `+1`/`-1`
quando o boost muda o texto do turno, e comparar o `moveBP`/dano resultante contra o
esperado. Mesma técnica usada para os testes de `model/result.spec.ts` (novo arquivo,
cobrindo `afterTurn`/`recovery`/`kochance`/etc. via `calculate()` real em vez de mockar
`Result` diretamente — `recovery()`/`kochance()` retornam objetos `{ text, ... }`, não
strings; usar `.text` ao assertar a descrição textual).

---

## CRÍTICO — BUG: dropsStats (Overheat, Close Combat, Superpower, Leaf Storm, Draco
## Meteor, V-create...) não reduz o stat do usuário em moves de hit único (2026-07-11,
## achado autônomo)

**Prioridade: máxima. Ainda não confirmado com o usuário — achado durante cobertura de
`pre-damage-effects.ts::checkMultihitBoost`, sessão autônoma. NÃO CORRIGI o código —
apenas documentei, por ser mudança de mecânica de cálculo que precisa de aprovação.**

`Move.dropsStats` (setado em `move.ts:78` a partir de `data.self.boosts[stat] < 0` —
ex: Close Combat tem `self.boosts: { def: -1, spd: -1 }`, Overheat/Leaf Storm/Draco
Meteor têm queda de -2 no próprio stat ofensivo) só é **aplicado** em UM lugar de todo
o motor: `pre-damage-effects.ts:159` (`if (move.dropsStats) { ... attacker.boosts[stat]
-= move.dropsStats * atkSimple ... }`), dentro da função `checkMultihitBoost`.

O problema: `checkMultihitBoost` só é chamada de `multi-hit.ts:19`, dentro do loop
`for (times = 1; times < numAttacks; times++)` de `computeMultiHitDamage` — que por sua
vez só roda quando `move.hits > 1 || move.timesUsed > 1` (`resolve-damage.ts:19`).
Como Overheat/Close Combat/Superpower/Leaf Storm/Draco Meteor/V-create são todos moves
de **hit único** (não multi-hit, não usados via Rollout/Ice Ball timesUsed), o branch de
`dropsStats` **nunca executa** para eles.

**Reproduzido**: `calculate(Incineroar com Overheat 252 SpA, Blissey, new Move("Overheat"),
new Field())` — após o cálculo, `attacker.boosts.spa` permanece `0` e a descrição não
menciona nenhuma queda de stat. O jogo real aplicaria -2 Special Attack no Incineroar
após usar Overheat.

**Impacto**: qualquer simulação de **múltiplos turnos/KO chance ao longo do tempo**
envolvendo esses moves está incorreta — o segundo uso do mesmo move (ou de outro move
Special/Physical) não reflete a queda de stat real. Como a calculadora foca em análise
de matchup VGC de um turno (não simulação de batalha completa), o impacto prático pode
ser menor do que parece — mas ainda assim é uma mecânica de jogo ausente para moves
extremamente comuns em VGC (Overheat/Draco Meteor especialmente).

**A mesma limitação estrutural também afeta** todo o resto de `checkMultihitBoost` para
moves de hit único: Power-Up Punch (+1 Atk ao usuário), Stamina do defensor (+1 Def ao
ser atingido), Weak Armor do defensor (-1 Def / +2 Spe ao ser atingido), Seed Sower/Sand
Spit do defensor (muda terrain/weather ao ser atingido), Gyro Ball/Electro Ball vs
Gooey/Tangling Hair (—esses dois na real nunca são multihit mesmo, então são só um caso
a mais do mesmo bug estrutural, não um bug isolado). Todos só dependem de "o defensor
foi atingido", não de "foi atingido múltiplas vezes" — mas hoje só disparariam num
Icicle Spear/Bullet Seed/etc., nunca num hit único de Tackle/Close Combat/etc.

**Como confirmar e corrigir, se aprovado**: separar a lógica de
`checkMultihitBoost` em duas responsabilidades — (1) o que é genuinamente "efeito que
se acumula por hit" e deve ficar dentro do loop multi-hit (nada do que está lá hoje se
encaixa nisso, na real — são todos "efeito após qualquer hit"), e (2) o que deveria
rodar uma vez por chamada de `resolveDamage`/`computeHitDamage`, independente de
`hits>1`. A opção mais simples é mover a chamada de `checkMultihitBoost` (ou parte dela)
para fora do `if (hits>1)` em `resolve-damage.ts`, garantindo que rode ao menos 1x para
todo hit (inclusive o primeiro, hoje só coberto pelo `damage = computeHitDamage(...)`
inicial em `resolve-damage.ts:8`, que não chama `checkMultihitBoost`).

**Antes de tocar no código**: confirmar com o usuário se este é de fato um
comportamento não intencional (parece que sim, dado o nome da função e a lista de
mecânicas que ela cobre) e qual o efeito colateral esperado ao mover a chamada — pode
haver double-counting se não for cuidadoso (ex: já existe algum outro lugar que
aplica esses drops de forma redundante para multihit especificamente?).

---

## IMPORTANTE — BUG suspeito: Harsh Sunshine/Heavy Rain não dão o boost de dano de clima (2026-07-11, achado autônomo)

**Prioridade: alta. Ainda não confirmado com o usuário — achado durante cobertura de
`pre-damage-effects.ts` (Castform/Forecast), sessão autônoma.**

`guards.ts:132` (mudança de tipo do Castform/Forecast) já trata `"Sun"` e `"Harsh Sunshine"`
como equivalentes: `field.hasWeather("Sun", "Harsh Sunshine") ... ? "Fire" : ...`. Também
`desc.ts:744` trata os dois juntos na formatação de texto.

Mas o **boost de dano real** em `hit-damage.ts` (linhas ~146-166, onde `baseDamage` é
multiplicado por 6144/4096 = 1.5x para moves Fire no Sol, 2048/4096 = 0.5x para moves
Water no Sol) só checa `field.hasWeather("Sun")` — **nunca inclui `"Harsh Sunshine"`**.
O mesmo padrão provavelmente se repete para `"Rain"` vs `"Heavy Rain"` (grep por
`hasWeather("Rain")` sem o par "Heavy Rain" na mesma condição).

**Reproduzido**: Castform com Forecast + Ember, comparando `Field({weather: "Sun"})` vs
`Field({weather: "Harsh Sunshine"})` — o tipo do Castform vira Fire nos dois casos
(confirmado via `pokemon.types`), mas o dano do Ember (Fire) só recebe o boost 1.5x em
"Sun" (31-37 dano) e fica sem boost em "Harsh Sunshine" (21-25 dano, igual ao clima
neutro). Isso é uma inconsistência real: a descrição/tipo tratam os dois climas como
equivalentes, mas o cálculo de dano não.

**Isso pode ser**:
1. Um bug real — Harsh Sunshine (de Desolate Land/Groudon Primal) deveria dar o MESMO
   boost de 1.5x/0.5x que Sun normal, já que no jogo real a única diferença de Harsh
   Sunshine é que moves Water falham completamente (não apenas reduzem dano) — o boost
   de moves Fire é idêntico ao Sun comum.
2. Uma lacuna deliberada — talvez o projeto não suporte Desolate Land/Primal Groudon
   como mecânica completa e só existe o rótulo "Harsh Sunshine" no enum de weather sem
   a implementação completa (skip consciente, como Water Compaction em outra nota).

**Como confirmar**: perguntar ao usuário se Desolate Land/Primal Groudon é uma mecânica
que o projeto pretende suportar plenamente. Se sim, é bug — corrigir `hit-damage.ts`
para usar `field.hasWeather("Sun", "Harsh Sunshine")` e `field.hasWeather("Rain", "Heavy
Rain")` nas checagens de boost de dano, igual já é feito em `guards.ts`/`desc.ts`. Também
verificar se moves Water deveriam **falhar** (não apenas ficar sem redução) sob Harsh
Sunshine, e se moves Fire deveriam **falhar** sob Heavy Rain — mecânica adicional que
pode estar totalmente ausente.

---

## Tipagem `?` opcional em `Move` nem sempre reflete undefined real em runtime (2026-07-11)

`Move.timesUsed` é declarado como `timesUsed?: number` em `src/domain/calc/model/move.ts`,
mas o construtor sempre atribui `this.timesUsed = options.timesUsed || 1` — nunca fica
`undefined` de fato. Isso gerava um branch morto em `multi-hit.ts:11`
(`(move.timesUsed ?? 0) > 1`, o fallback `?? 0` nunca ativava). Removido o `?? 0`,
mantido um `!` non-null assertion (`move.timesUsed! > 1`) já que o campo mesmo assim é
tipado como opcional — não estreitei o tipo da classe porque isso teria alcance maior
(outros consumidores de `Move.timesUsed` no arquivo, que já usam o mesmo `!`).

**Ponto de atenção para o resto do `src/domain/calc/model`**: outros campos opcionais
(`?`) em `Move`/`Pokemon`/etc podem ter o mesmo padrão — atribuídos incondicionalmente no
construtor com fallback, mas com o tipo ainda declarado opcional só por cautela/estilo.
Ao investigar branches "mortos" causados por `??`/`?.` sobre um campo desses, checar
primeiro se o construtor da classe garante um valor sempre — se sim, é candidato a
remoção segura do fallback (como fizemos aqui), não uma lacuna de teste real.

## IMPORTANTE — Auditar abilities de aliado que afetam dano combinado (2 atacantes)

**Prioridade: alta.** Data: 2026-07-11.

Achado real (não hipotético): `Unnerve` no **parceiro** (não no próprio atacante) deveria
impedir o defensor de consumir sua berry resistente durante o cálculo de 2 atacantes
(`calcDamageForTwoAttackers`/`koChanceForTwoAttackers`), independente da flag manual
`field.isUnnerve`. Isso **não estava implementado** — só funcionava se o usuário marcasse
o toggle manualmente no Field Options. Corrigido com `UnnerveAdjuster`
(`src/domain/multicalc/damage-calc/calc-adjuster/unnerve-adjuster.ts`), que seta
`calcField.isUnnerve = true` quando o atacante OU o `secondAttacker` tem
Unnerve/As One (Glastrier)/As One (Spectrier). Ver testes em
`unnerve-adjuster.spec.ts` e o cenário de integração em `damage-calc.spec.ts`
("should not consume the defender's resist berry when a Parental Bond attacker fights
alongside a partner with Unnerve").

**Isso levanta uma dúvida estrutural maior**: existem outras abilities/efeitos que hoje só
são aplicados olhando o atacante do hit atual, mas que no jogo real também deveriam
considerar o **parceiro** (`secondAttacker`) quando o cálculo envolve 2 atacantes? Candidatos
a auditar (mesmo padrão "efeito de campo/aliado, não é ability do próprio atacante"):

- **Friend Guard** (citado pelo usuário como exemplo direto) — já existe como flag manual
  em `Side.isFriendGuard` (ver §7 "Flags de aliado"), mas precisa confirmar se
  `calcDamageForTwoAttackers` deriva isso automaticamente do `secondAttacker` tendo essa
  ability, do jeito que agora fazemos com Unnerve — hoje aparenta ser só manual também.
- **Pressure** (PP mais alto do oponente, normalmente não afeta dano, mas confirmar).
- **Intimidate** (aplica ao entrar em campo — já é tratado via boost manual, mas confirmar
  se o *parceiro* de Intimidate teria algum efeito cruzado relevante ao dano combinado).
- **Flower Gift / Steely Spirit de aliado** — já documentado como lacuna conhecida em §7
  ("Pontos de extensão futura"), mas vale reavaliar à luz deste achado: se Unnerve tinha
  bug real e passou despercebido, esses dois podem ter o mesmo problema e não são só
  "feature futura" — podem ser bug ativo hoje.
- Qualquer outro efeito cujo texto de mecânica na Bulbapedia diga "ability de um Pokémon
  em campo" (não "do usuário do move") é candidato — o padrão de erro é sempre o mesmo:
  o código só olha `attacker`/`defender`, nunca `secondAttacker`.

**Como investigar cada candidato**: seguir o mesmo método que revelou o bug do Unnerve —
1. Grep no motor por onde a flag/condição é lida (`field.isX` ou `attacker.hasAbility(...)`).
2. Verificar se existe algum `CalcAdjuster` (`src/domain/multicalc/damage-calc/calc-adjuster/`)
   setando essa flag a partir de `secondAttacker`, como o `NeutralizingGasAdjuster` já faz.
3. Se não existir, construir o cenário de 2 atacantes real (ex.: parceiro com a ability +
   atacante testado + defensor com o item/condição relevante) e confirmar se o comportamento
   bate com o jogo real antes de decidir se é bug ou lacuna aceitável.

## 0. Revisão de paridade fork vs real vs pokemon-showdown (2026-07-10)

Ao fim de H1, comparamos três projetos do workspace para achar cenários/mecânicas
que o nosso motor pudesse estar perdendo ou que faltasse teste:

- **fork** `~/dev/damage-calc` (origin: robsonbittencourt, com customizações Champions/VGC —
  é o que o oráculo importa) contra
- **real** `~/dev/temp/damage-calc` (origin: smogon/damage-calc, upstream oficial) e
- **pokemon-showdown** `~/dev/pokemon-showdown` (mod Champions oficial).

### Método
1. `diff` dos `calc/src/mechanics/{gen789,champions,util}.ts` entre fork e real —
   separando (A) o que o fork TEM e o real não (= nossas customizações, já portadas) de
   (B) o que o real tem de novo e o fork não (= possíveis mecânicas faltando).
2. `git log` recente do real e do pokemon-showdown, filtrando commits que tocam
   **cálculo de dano** (moves/abilities/items com BP/multiplicador), ignorando
   tier/ban/learnset/validation.
3. Cada mecânica candidata foi `grep`-ada no nosso `src/domain/calc` (presente?) e nos
   specs (`src/domain/calc/engine/damage/*.spec.ts`) (testada?).

### Resultado — o que JÁ temos e está correto
Super Fang/Ruination override, Parental Bond + reduce-damage berry, Fire Mane, Champions
Choice Band/Specs, Fluffy (contact 0.5x / Fire 2x), Eelevate, Mega Sol, Piercing Drill,
Unseen Fist, Freeze-Dry, Wise Glasses/Muscle Band (modifier 4506 = 1.1x). Tudo portado.

### #831 "Champions: Fix stat boosts" — NÃO nos afeta
Real mudou `getModifiedStat`: `gen.num < 3` → `gen.num === 1 || gen.num === 2`. Motivo:
Champions roda como gen 0; `<3` incluía gen 0 → usava a tabela de boost LEGADA
(`[1,1.5,2,2.5,3,3.5,4]`) errada. **Nosso motor não tem geração** — `math.ts:getModifiedStat`
sempre usa a `BOOST_TABLE` moderna (frações [2,8]..[8,2]), sem tabela legada nem clamp 999.
Já estamos do lado correto do fix. (Implicação só p/ o oráculo: o fork ainda tem o bug
`gen<3`; um rebuild do fork com o #831 alinharia boosts −1/−4/−5 em modo Champions — hoje
não gera falso-mismatch porque validamos boost negativo via gen9. Ver [[calc-gen0-legacy-boost-table]].)

### BUG de mecânica achado — grounding de imunidade Ground incompleto
`guards.ts::computeTypeEffectiveness` (linha 217-218) NÃO anula a imunidade de tipo Ground
em nenhum dos casos que o gen789 real trata (linhas 421-427 do real). Faltam **três**:
- **Ring Target** — `getMoveEffectiveness(...)` é chamado com `isRingTarget=false` hardcoded
  (já documentado na §2).
- **Iron Ball** — Ground move vs defensor Flying-type com Iron Ball deveria dar dano real
  (`typeEffectiveness===0 && Ground && Iron Ball && !Klutz → 1`). **Ausente.**
- **Thousand Arrows** — anula imunidade Ground; o move **nem aparece** no nosso motor.

Os três são a mesma família de bug (imunidade de tipo que deveria ser removida no dano
geral). NÃO corrigido — decisão do usuário: só documentar agora, testes primeiro.
Quando corrigir: passar `isRingTarget` de verdade + os dois blocos `if typeEffectiveness===0`,
rodar suíte completa + oráculo p/ detectar regressão.

### Fora de escopo / feature, não bug
- **Analytic toggle** (`abilityOn`): o real (#818/#822) permite ativar Analytic manualmente.
  Calculamos Analytic por `turnOrder` corretamente; o toggle é feature de app, não bug de dano.
- **Intrepid Sword / Dauntless Shield toggle** (util, #817): +1 boost de entrada; fora do dano.
- **pokemon-showdown**: commits recentes são tier/ban/learnset/validation. Gen4 Metronome,
  RBY/GSC DVs, Struggle+Normal-items, totem formes — outras gerações, fora de VGC.

### Gaps de TESTE fechados nesta rodada
Mecânicas presentes no motor mas sem spec dedicado, cobertas em `parity-gaps.spec.ts`
(7 testes, todos MATCH no oráculo):
- Wise Glasses / Muscle Band (1.1x special/físico, modifier 4505).
- Freeze-Dry (SE vs Water).
- Unseen Fist: contact **atravessa** Protect mas com **25% do dano** (×1024/4096) —
  a var interna chama-se `protect` mas significa "hit-through-protect com penalidade";
  confirmado correto contra o real (gen789:649-657). NÃO é bug, apesar do nome confuso.
- Mega-Champions com ability custom — Pyroar-Mega (Fire Mane, +1.5x Fire),
  Meganium-Mega (Mega Sol, Fire como se em Sol), Eelektross-Mega (Eelevate, imune a Ground).
  São espécies REAIS do Champions Reg M-B, não fakemons.

**Gotcha do oráculo (Champions dataset):** Fire Mane/Mega Sol são abilities que o gen9 da
ref desconhece → se o oráculo cair para gen9, dá falso-mismatch. Solução (não skip!):
usar defender que EXISTE no dataset Champions do fork para o oráculo rodar em Champions
mode. **Amoonguss NÃO está no Champions**; Snorlax está. Troquei os defenders para Snorlax
→ Fire Mane e Mega Sol passaram a MATCH em Champions (champions matches 17→19).

---

## 1. BUG — Tera Blast Stellar quebra o cálculo (dano null)

Data: 2026-07-10 · Ao cobrir condition/type base-power moves.

Ao tentar cobrir a branch `base-power.ts:253` (`teraType === "Stellar" ? 100 : 80`
para Tera Blast), o cálculo **quebra**: `result.damage` vem como array de `null` e
`description()` lança "damage[0] must be a number.".

Causa: `guards.ts:202-203` — quando Tera Blast é usado com Tera Stellar,
`move.type = attacker.teraType` = **"Stellar"**. Mas "Stellar" não é um tipo na
tabela de type-effectiveness, então `getMoveEffectiveness` retorna undefined e o
dano vira null.

Mecânica oficial (Showdown `terablast`): Tera Blast Stellar tem BP 100 e
`move.type` vira o teraType; a type chart do Showdown trata Stellar como
super-effective (2x) contra Pokémon Terastalizados e neutro caso contrário. Nosso
motor não implementa "Stellar" na type chart → caminho bugado.

Impacto: qualquer Tera Blast com Tera Stellar (VGC real, Terapagos/Iron Valiant
etc.) quebra. Não testado (seria testar um crash). Corrigir exige tratar Stellar
na type-effectiveness (retornar 1x, ou 2x vs teraType do defender). Deixado para
decisão futura. A branch BP 100 (l.253) fica descoberta enquanto isso.

---

## 2. BUG suspeito — Ring Target não remove imunidade no dano geral

Data: 2026-07-10 · Descoberto ao cobrir item modifiers.

### O que foi observado

`Ring Target` deveria remover a imunidade de tipo do defender (ex: Ground acertar
Flying, Fighting acertar Ghost). A **função** de type-effectiveness já implementa:

- `src/domain/calc/engine/type-effectiveness.ts:24`
  `if (effectiveness === 0 && isRingTarget) { ... }`
- Há unit test provando: `type-effectiveness.spec.ts:25`
  ("grounds a Flying type with Ring Target").

Porém o **cálculo principal de dano** ignora o item. Em
`src/domain/calc/engine/guards.ts:217-218`, `computeTypeEffectiveness` chama
`getMoveEffectiveness(..., isRingTarget = false)` **hardcoded**:

```ts
const e1 = getMoveEffectiveness(move, types[0], isGhostRevealed, field.isGravity, false)
const e2 = types[1] ? getMoveEffectiveness(move, types[1], isGhostRevealed, field.isGravity, false) : 1
```

Resultado: contra um tipo imune, o dano continua **0** mesmo com Ring Target
equipado. O item só tem efeito no bloco de Collision Course / Electro Drift
(`modifiers.ts:59-62`), onde `isRingTarget` é calculado e passado de verdade.

### Diagnóstico

Porte incompleto do gen789: a integração de Ring Target no caminho geral de dano
não foi ligada. `defender.hasItem("Ring Target")` nunca é consultado em
`computeTypeEffectiveness`.

### Decisão

Não escrever teste de Ring Target no dano geral por ora — seria testar um
comportamento bugado. Corrigir o motor é decisão futura. Quando for:

- passar `defender.hasItem("Ring Target") && !defender.hasAbility("Klutz")` como
  `isRingTarget` em `computeTypeEffectiveness`;
- rodar toda a suíte de calc para detectar regressões;
- então adicionar o teste de dano (move imune vira dano real com Ring Target).

---

## 3. Fragilidade — description() lança erro com dano 0 (imunidade)

Data: 2026-07-10 · Notado ao cobrir immunity-abilities.

`Result.description()` → `fullDesc(err = true)` → `getKOChance` chama
`error(err, "damage[damage.length - 1] === 0.")` que **lança** quando o dano é 0
(imunidade por tipo/ability: Water Absorb, Levitate, Normal vs Ghost, etc.).

Consequência: qualquer chamada de `description()` sobre um matchup imune quebra
com exceção. Nos testes contornamos assertando `result.damage === 0` em vez da
description (ver `immunity-abilities.spec.ts`).

**A verificar (app):** a UI precisa guardar contra `damage === 0` antes de chamar
`description()`, ou o `Result` deveria expor um modo seguro (`err: false` já existe
como parâmetro de `fullDesc`, mas `description()` não o repassa). Se a app já
checa dano 0 antes de renderizar a descrição, não é bug; senão, é um crash em
potencial em cenários de imunidade. Não alterado — decisão do usuário.

---

## 4. Fragilidade — calculateMulti([]) com array vazio → CRASH

Data: 2026-07-10 · Ao cobrir a cobertura restante de multi-result.ts.

`calculateMulti([])` (0 atacantes) → **CRASH**: `TypeError: Cannot read
properties of undefined (reading 'named')`. O motor NÃO trata 0 atacantes. É
degenerado (a UI nunca chama assim), mas é uma fragilidade real — um guard
`if (attackers.length === 0)` evitaria. Não testado (testar um crash não agrega);
registrado para decisão futura.

---

## 5. MultiResult.description() lista só 2 atacantes

Data: 2026-07-10 · Ao cobrir calculateMulti.

`MultiResult.description()` (`multi-result.ts:206`) formata apenas `results[0]` e
`results[1]` no texto ("A AND B vs. ..."), mesmo quando há 3+ atacantes. O
**cálculo** usa todos (results.length, range, getHKO consideram o 3º+), só o
**texto** trunca. Provavelmente reflete o uso real da UI (combinar 2). Testado
via asserção de `results.length`/`range()`/`getHKO()` para os 3, não a description.
Não é bug se a app só combina 2; se combinar 3+ e mostrar a description, o texto
seria incompleto. A verificar na app.

---

## 6. Items presentes no motor mas ausentes do dataset

Data: 2026-07-10 · Descoberto ao escrever os specs de item damage modifiers.

### O cenário

O motor de dano (`src/domain/calc/engine/modifiers.ts`) contém a lógica de vários
items que **não existem** no dataset curado do projeto
(`src/infrastructure/data/item-data.ts`, do qual o tipo `ItemName` é derivado):

- **Thick Club** (dobra Atk de Cubone/Marowak físico)
- **Deep Sea Tooth** (dobra SpA de Clamperl)
- **Deep Sea Scale** (dobra SpD de Clamperl)
- **Metal Powder** (dobra Def de Ditto vs físico)
- **Type Gems** (`${type} Gem`, +1.3x na primeira vez) — ex: Electric Gem

Todos existem no gen789 da damage-calc original
(`~/dev/damage-calc/calc/src/data/items.ts`), de onde o motor foi portado.

### Por que compila mesmo o item não estando no `ItemName`?

Porque `Pokemon.hasItem(...items: string[])` recebe **`string`**, não `ItemName`.
O motor só compara strings em runtime — nunca valida contra o dataset. A única
fronteira tipada é o **construtor** `new Pokemon(name, { item?: ItemName })`, que
exige `ItemName`.

Consequência: o modifier funciona em runtime, mas **nenhum `Pokemon` tipado
consegue carregar o item pela API pública**. Alcançável só via cast
(`item: "Thick Club" as ItemName`). Do ponto de vista do usuário/app, é inerte.

Curiosidade: os **Pokémon** donos desses items (Cubone, Marowak, Clamperl, Ditto)
**estão** no dataset e são selecionáveis. Só os items sumiram.

### O que foi feito

- Items **no dataset** → cobertos em `items.spec.ts` (fluxo normal).
- Items **engine-only** → cobertos em `items-engine-only.spec.ts`, via
  `as ItemName`, provando que o motor calcula o boost. Nome do arquivo e `describe`
  deixam o cenário explícito.

### Decisão em aberto (futuro, fora de H1)

1. **Código morto intencional** — removidos do escopo VGC de propósito. Ação:
   talvez remover a lógica morta do motor, ou deixar como está.
2. **Regressão** — o dataset deveria manter paridade gen789. Ação: repor os items
   em `item-data.ts` (trabalho de dados/feature); os specs engine-only viram normais.
3. **Manter como está** — motor mantém paridade gen789 por robustez, dataset expõe
   só o subconjunto VGC. Os specs engine-only documentam/protegem isso.

Nota: **Vile Vial** (Venomicon-Epilogue) era caso à parte — mon fake, não oficial.
Foi **removido** do motor (commit próprio), não vira engine-only.

---

## 7. Flags de aliado: 4 alcançáveis (cobertos) + 3 pontos de extensão futura

Data: 2026-07-10 · Investigação após o usuário questionar se o "não coberto" existia no código.

### Alcançáveis e cobertos — `ally-field-boosts.spec.ts` (5 testes)

`isHelpingHand`, `isBattery`, `isPowerSpot`, `isFriendGuard`: têm opção em `Side`
(`field.ts`), modifier em `modifiers.ts` (72/251/260/556) que aplica boost real e seta
`description.isX`, e a UI os usa (`field.component.html`, `field-store.ts`,
`field-mapper.ts`). Acionáveis via `new Field({ attackerSide: { isHelpingHand: true } })`.
Boosts: Helping Hand ×1.5, Battery ×1.3 (só Special), Power Spot ×1.3, Friend Guard ×0.75.

### Efeito vivo, texto morto — `isSwitching`

`field.defenderSide.isSwitching` é lido em `modifiers.ts:149` (afeta dano via Analytic),
mas **nunca seta `description.isSwitching`**. Logo o ramo "switching boosted" de
`buildDescription` é inalcançável, embora o *efeito* de dano seja testável.

### Pontos de extensão futura — Flower Gift / Steely Spirit **de aliado**

`isFlowerGiftAttacker`, `isFlowerGiftDefender`, `isSteelySpiritAttacker`: aparecem **só**
em `types.ts` (declaração no `RawDesc`) e no `if` de leitura em `desc.ts`
(1081/1089/1178). **Zero writers** em todo o projeto.

Distinção importante: a **ability própria** foi portada e é testável —
`Steely Spirit` no próprio atacante (`modifiers.ts:111`) e `Flower Gift` no próprio
Cherrim no Sol (`modifiers.ts:276`) aplicam boost e imprimem via
`description.attackerAbility` (já cobertos em `attacker-ability-boosts`/`attacker-abilities`).
O que **não** foi portado é o **buff de aliado**: na lib original,
`field.attackerSide.isFlowerGift`/`isSteelySpirit` (gen789.ts:1435/1445) representam "meu
aliado tem a ability" e setam os flags `is...Attacker`. Nosso `Side` **não tem** esses
campos (só os `is...Attacker`/`Defender` no `RawDesc`, órfãos). Portanto os 3 ramos de
`buildDescription` são inalcançáveis por construção — não por escolha de teste.

**Decisão (usuário, 2026-07-10): MANTER.** Não é lixo — são pontos de extensão para uma
feature futura (adicionar `isFlowerGift`/`isSteelySpirit` no `Side` do Field, como já
existe para Battery/Power Spot/etc.). Quando isso for implementado, escrever o modifier
correspondente (espelhando `gen789.ts:1435/1445`) e então estes ramos de `buildDescription`
passam a ser alcançáveis e testáveis. Por ora ficam sem cobertura, conscientemente.

---

## 8. Water Compaction — não testado (limitação de mecânica, não bug)

Data: 2026-07-10 · Ao cobrir multihit-effects.

Water Compaction sobe **Def** (+2) ao ser atingido por um move **Water**. Para
observar o efeito num único `calculate`, seria preciso um move Water **físico
multi-hit** — que não existe no jogo (moves Water multi-hit como Water Shuriken
são special, e o boost de Def não afeta dano special). Logo o efeito no dano não é
exercitável pela fronteira de forma limpa. Pulado. Não é bug; é ausência de um
move que combine as condições.

---

## 9. BUG na REFERÊNCIA — Kee/Maranga/Luminous Moss re-aplicam boost a cada hit

Data: 2026-07-10 · Descoberto ao cobrir `pre-damage-effects.ts` (berries defensivas
mid-multihit) com `defender-reactive-boosts.spec.ts`.

### O cenário

Berries defensivas (Kee → +1 Def contra físico; Maranga → +1 SpD contra especial;
Luminous Moss → +1 SpD contra Water) devem ativar **uma vez** durante um move
multihit: consomem a berry e o boost vale para os hits seguintes.

### A divergência

Oráculo acusou MISMATCH em Kee Berry (nosso 21-27 vs ref 19-25) e Maranga Berry
(nosso 62-80 vs ref 58-74). Nosso dano é **maior** = aplicamos **menos** boost.

### Causa — precedência de operadores na ref (`util.ts:359-362`)

```js
if ((!defenderUsedItem) &&
    (defender.hasItem('Luminous Moss') && move.hasType('Water')) ||
    (defender.hasItem('Maranga Berry') && move.category === 'Special') ||
    (defender.hasItem('Kee Berry') && move.category === 'Physical')) {
```

`&&` liga mais forte que `||`, então isto é
`((!used && luminous) || maranga || kee)`. A guarda `!defenderUsedItem` **só cobre
o ramo Luminous Moss**. Para Kee/Maranga a guarda é ignorada → a ref re-aplica o
boost **a cada hit** (hits 2 e 3), somando +2 no total.

Nosso código (`pre-damage-effects.ts:91`) tem os parênteses corretos:
`!defenderUsedItem && (luminous || maranga || kee)` → aplica **uma vez**, depois
`defenderUsedItem=true` bloqueia. **Nosso está correto** (a berry consome e boosta
1x, alinhado ao jogo real). A ref tem o bug de precedência.

### Decisão

Testes mantidos com os valores **nossos** (corretos). São 2 MISMATCH esperados no
oráculo, pela mesma natureza do Lash Out (bug do `countBoosts` na ref, §10): o
motor está certo, a ref é que erra. Não há nada a corrigir no nosso código.

---

## 10. Validação por oráculo (damage-calc real) — metodologia

Data: 2026-07-10 · Script: `history/test-strategy/oracle/oracle.mjs`
(consolida os snapshots intermediários que existiam antes; o estado atual de
contagem vive na §13 e no output do próprio script)

Oráculo independente que confronta **todos** os cenários dos specs contra a lib
damage-calc real (`~/dev/damage-calc`). Parseia cada `it(...)`, roda na ref e
compara o **range de dano** (min-max), não a `desc()` completa (o texto difere:
Champions imprime "SP", nós imprimimos "EV"). Re-rodar após qualquer mudança no
motor: `node history/test-strategy/oracle/oracle.mjs`.

### Dois modos de referência (dual-mode)
Por cenário, o oráculo roda:
- **gen 9** (level 50) sempre — mecânicas completas, dex moderno, MESMA fórmula
  de stat que a nossa (`(2·base+IV+EV/4)·L/100+5`).
- **Champions (gen 0)** quando ambas as espécies existem lá (~286 mons). O
  Champions usa fórmula de stat própria (`base+sp+20`, sem level/IV), mas é
  EQUIVALENTE à nossa quando os **EVs são convertidos para SP** via `evToSp`
  (`src/domain/multicalc/utils/ev-sp-converter.ts`). Confirmado: Incineroar
  252 EV → 32 SP → mesmo atk (183) → mesmo dano (88-105).

**Lógica "match-either"**: MATCH quando nosso valor bate com QUALQUER uma das
referências, porque nenhuma é completa sozinha — Champions tem os BP overrides VGC
(Grav Apple 90, Infernal Parade 65) mas é incompleta em Boots+Multiscale (§11);
gen9 tem as mecânicas mas os BP genéricos. Nosso motor é a união correta dos dois.

### Limitações do modo Champions (por que não é usado sozinho)
- Dataset pequeno/antigo: 286 espécies vs nossas 1317. ~65% dos mons dos specs
  (Flutter Mane, Great Tusk, Miraidon, paradox...) nem existem lá.
- **Interação incompleta**: Multiscale + Heavy-Duty Boots + Stealth Rock (ver §11).

### Categorias de SKIP (não confrontáveis, todas legítimas — nenhuma é ponto cego)
- **`abilityOn` (Intimidate family + Stakeout)**: a ref não aplica a reação de
  Intimidate nem o estado "ativo" de Stakeout no cálculo estático. Todos têm
  **validação por contraste no próprio spec** (mostram `-1`/`+1`/`+2` ou Atk cheio
  quando bloqueado; Stakeout mostra o dobro na description). Dá para confrontar
  traduzindo Intimidate → `boosts:{atk:-1}` na ref, mas foi decidido NÃO fazer —
  seria semicircular (ensinar à ref o resultado esperado).
- **Items engine-only (Thick Club, Deep Sea Tooth/Scale, Metal Powder, Type Gem)**:
  ausentes de todo dataset da ref (§6). O efeito é visível na própria description.
- **`.moveDesc()`/`.recoil()`** (`recovery-and-recoil.spec.ts`): formato de string
  que o comparador de `.description()` não parseia; excluído via regex MULTI_SPECS.

### Notas de mecânicas confirmadas contra o Showdown
- **Proto/Quark Drive**: a ref ativa sozinha por terrain/weather/Booster Energy;
  basta o oráculo NÃO passar `abilityOn` e passar `boostedStat`. Confirmado.
- **Metronome**: a ref usa `move.timesUsedWithMetronome` (não `timesUsed`).
  Confere com Showdown (`4096 + usos·819`).
- **Light Ball**: bate em ambos os modos (504-592).
- **Wonder Room**: o oráculo passou a repassar `isWonderRoom` ao Field da ref
  (linha análoga a `isGravity`); sem isso dava falso-mismatch (ref sem o swap Def↔SpD).
- Os **MISMATCH persistentes** (Kee/Maranga §9, Lash Out) são bugs NA REF, não
  nossos — o Lash Out: a ref condiciona o double a `countBoosts < 0`, mas
  `countBoosts` (mechanics/util.ts) só soma boosts positivos → nunca < 0 → a ref
  NUNCA dobra Lash Out. Nosso motor dobra (alinhado ao Showdown `statsLoweredThisTurn`).

---

## 11. Champions TEM Multiscale; a lacuna é Multiscale + Heavy-Duty Boots

Data: 2026-07-10 · Correção de afirmação anterior (eu havia dito que "Champions não
implementa mecânicas defensivas como Multiscale" — ERRADO).

- **Champions implementa Multiscale.** `champions.ts:1091` checa
  `defender.hasAbility('Multiscale')`. Confirmado: Multiscale Dragonite full HP no
  modo Champions da ref dá 26-31 (dano pela metade). O Showdown Champions mod
  também herda Multiscale (não sobrescreve → comportamento padrão ativo).
- **A lacuna real** é a interação **Multiscale + Heavy-Duty Boots + Stealth Rock**.
  A `champions.ts:1094` só checa `!field.defenderSide.isSR` e **NÃO considera
  Heavy-Duty Boots**. Então, com SR no campo, a ref quebra Multiscale (53-63)
  mesmo com Boots. Nosso motor inclui `|| defender.hasItem("Heavy-Duty Boots")`
  (guards.ts:222 / modifiers.ts:514) → mantém Multiscale (26-31). **Nosso está
  correto** (Boots negam o dano de entrada de SR, HP fica cheio, Multiscale ativo);
  a ref Champions está incompleta nessa interação.
- O gen9 da ref inclui os Boots e dá 26-31 = nosso valor. Com a lógica
  "match-either" do oráculo, esse caso é MATCH via gen9.

**Ajuste no oráculo:** esta interação motivou a lógica "match-either" (detalhada
na §10) — MATCH quando nosso valor bate com QUALQUER uma das referências, já que
nenhuma é completa sozinha.

---

## 12. Oráculo multi — orquestração de calculateMulti validada

Data: 2026-07-10 · Script: `history/test-strategy/oracle/oracle-multi.mjs`

`calculateMulti` é orquestração: encadeia `calculate` (single) baixando o HP do
alvo pelo **max roll** entre hits, com tratamento de berry. O oráculo multi
**replica essa mesma orquestração na engine de referência** (gen 9, level 50):
chama o `calculate` da lib N vezes com `curHP` decrescente e agrega min/max.

Confronta o **range total** e o desfecho KO contra os valores congelados em
`multi-attackers.spec.ts`:
- 2 atacantes (Rillaboom + Flutter Mane vs Dondozo): ref **312-369** = nosso 312-369, KO ✅
- 3 atacantes (Chien-Pao + Flutter Mane + Iron Hands): ref **215-254** = nosso
  215-254, HP timeline 257→221→82→3, 2HKO ✅

**2/2 batem exatamente (range agregado + desfecho).** Prova que a lógica de
combinação/decremento de HP do nosso calculateMulti é idêntica à da engine de
referência encadeada da mesma forma. (Berry/recovery entre hits são validados
in-spec via a description "after Sitrus Berry recovery" — a orquestração de HP
puro é o que este oráculo isola.)

---

## 13. Registro de cobertura — domain/calc (H1)

Data: 2026-07-10 · Estado ao fechar H1.

**Estado final:** 40 spec files no engine, 354 testes verdes. Oráculo 147 MATCH /
3 MISMATCH (os 3 bugs conhecidos da ref: Kee/Maranga §9, Lash Out §10). Nosso motor
é a referência correta. `domain/calc` coberto exaustivamente.

### stats.ts e guards.ts
- **`speed-and-weight.spec.ts`** cobre `stats.ts::getFinalSpeed` (Electro Ball via
  speed ratio, Tailwind subindo o tier de BP 40→60, paralisia derrubando speed/BP)
  e `getWeight` (Grass Knot 100→80 BP com Float Stone; Heavy Slam 80→40 BP com Light
  Metal; Gyro Ball inverso). Defenders em Champions (Rhydon, Dragapult).
  - Nota de estrutura: cenário com/sem Tailwind deve ficar em **dois `it` separados**,
    um `Field` por teste. O oráculo lê o último `new Field` do bloco; dois cenários no
    mesmo `it` geram falso-mismatch (ele compara a 1ª description contra a config do 2º
    Field). Separados → ambos MATCH.
- **`move-guards.spec.ts`** cobre `guards.ts`: Photon Geyser/Shell Side Arm (flip de
  categoria), Steel Roller/Poltergeist immune, Super Fang/Final Gambit/Endeavor (dano
  fixo por HP — assert em `result.damage` numérico, não description), Wonder Guard,
  Bulletproof, Queenly Majesty + Psychic Terrain (priority block — usar move de
  priority **inata** como Bullet Punch; Grassy Glide não serve, priority só sobe em
  terreno e o motor lê `move.priority` estático), Tera Shell (meia-effectiveness a HP
  cheio).
  - Gotcha Wonder Guard: precisa de move **não** super-efetivo. Contra Shedinja
    (Bug/Ghost) usei Liquidation (Water, neutro) — não Dark, que é SE vs Ghost.

### desc.ts (fraseado e cálculo de KO)
Arquivo mais denso do engine (~1250 linhas). 5 specs, por bloco funcional:

- **`end-of-turn.spec.ts`** (11) — `getEndOfTurn`: Leftovers/Black Sludge (recovery e
  damage)/Sticky Barb/Poison Heal/Toxic/Heatproof burn/Salt Cure/Leech Seed/sandstorm/
  Rain Dish. **Gotcha:** o efeito EOT só aparece no texto se o defender **sobrevive** ao
  1º hit — matchups que dão OHKO (ex. Blissey frágil na Def) escondem o sufixo. Usei
  Amoonguss/Bronzong bulky + Drain Punch fraco.
- **`berry-recovery.spec.ts`** (6) — `getBerryRecovery`: Sitrus/Oran/Figy (thresholds
  ½, ½, ¼)/Ripen (dobro)/Enigma (só em hit SE)/Unnerve (suprime). Berry só dispara se o
  dano cruza o threshold sem matar; Figy (¼) exige ~75%+ de dano — precisei de atacante
  forte + defender que aguenta.
- **`hazards-and-eot-text.spec.ts`** (8) — `getHazards` (SR por Tera/tipo, SR dobrado em
  Flying puro (Tornadus), Boots anulando SR, Spikes 1/3, Flying ignora Spikes) +
  `serializeText` junção "A and B" (SR + Leftovers; Leech Seed + poison).
- **`description-flags.spec.ts`** (6) — `buildDescription`: os 4 Ruin (Beads/Sword no
  clause do atacante; Vessel/Tablets no do defensor), Wonder Room ("(Def)" + "in Wonder
  Room"), crit ignorando boost de Def. Precisou o ajuste de `isWonderRoom` no oráculo (§10).
- **`recovery-and-recoil.spec.ts`** (7) — `getRecovery`/`getRecoil` via `.moveDesc()` e
  `.recoil()` (não `.description()`): drain "recovered", Big Root (boost visível), Shell
  Bell, recoil text, Rock Head (suprime), crash (High Jump Kick), Mind Blown recoil.
  **Excluído do oráculo** (regex MULTI_SPECS): usa formato `.moveDesc()` ("%-% (recovered)"),
  que o comparador de `.description()` não sabe parsear → falso-mismatch por construção.

### defender reactive boosts (pre-damage-effects.ts)
- **`defender-reactive-boosts.spec.ts`** (5) — Stamina, Weak Armor, Kee/Maranga berries
  (ver bug da ref §9), Parental Bond `dropsStats` — todos *entre hits* de multihit.

### O que fica de fora, conscientemente
- Permutações combinatórias de `computeKOChance`/`computeMultiHitKOChance` (distribuição
  de probabilidade): já exercitadas indiretamente por TODOS os 300+ testes que chamam
  `.description()`.
- Flower Gift/Steely Spirit de aliado no `buildDescription`: pontos de extensão futura (§7).
- multi-result.ts (~24 branches): guards de formatação e variações internas do simulador
  cujo efeito já está coberto por caminhos equivalentes; e `calculateMulti([])` (§4).

## 14. Branches inalcançáveis em domain/multicalc (H2)

Data: 2026-07-10 · Achado ao empurrar o "resto" (fora ev-optimizer) para 100%.

### type-coverage.ts — 2 branches defensivos mortos (não cobríveis por input real)
Cobri os 2 alcançáveis (Pokémon só com moves de status → lista de efetividade vazia,
em `getOffensiveCoverage` L144 e `getOffensiveCoverageAgainstTeam` L217; specs
`type-coverage.spec.ts`). Restam 2 que **nenhum input válido dispara**:
- **L377** `if (ivyCudgelType)` ramo falso: `getIvyCudgelType` (L424) tem fallback
  `return "Grass"` — nunca retorna null, apesar da assinatura `PokemonType | null`.
  Só cairia no ramo falso se o fallback mudasse para null.
- **L385** `if (moveDetails && moveDetails.type)` ramo falso: para chegar aqui o move
  precisa ser não-status e ter `getMoveData` undefined. Mas move desconhecido resolve
  para `EMPTY_MOVE_DEFAULTS` (move.ts L28) com `category: "Status"`, então o `continue`
  de status (L364) dispara antes. Inalcançável via objetos `Move`.
Como achamos: `coverage-final.json` (branchMap `b`) + leitura das linhas; confirmado
lendo `getIvyCudgelType` e o default de categoria em move.ts.

### type-coverage-insights.ts — revisão rigorosa (2026-07-11)
Cobertos nesta revisão (`type-coverage-insights.zero-coverage.spec.ts`, via análise da
type chart, sem tentativa-e-erro): **L109** `!selected.has` (membro já no set SE não
re-entra pelo not-very — time Snorlax/Garchomp/Amoonguss/Gastrodon), **L313** (membro sem
SE vs opponent, two-team), **L466** (membro sem resistência, single — Normal resiste nada),
e o `superEffectiveCount>0` false single-mode (Snorlax Normal, 0 SE).

Restam MORTOS, cada um provado por raciocínio:
- **L103 [1]** (`item.value > 0` falso em superEffective): `getTopOffensiveSuperEffective`
  só empurra membros com count>0, então value é sempre >0 aqui.
- **L265 [1]** (single-mode, `effectiveness === 2` falso no ramo super-effective):
  `getOffensiveCoverage` usa tipos defensivos **únicos** (`type2 = undefined`), efetividade
  máxima 2, nunca 4.
- **L305/L336 [1]** (`if (pokemonDataForPokemon)` falso): o `pokemonDataMap` é construído a
  partir de `getOffensiveCoverage(team)`, que itera TODOS os membros nos 18 tipos → todo
  membro está no mapa. O ramo "ausente do mapa" é inalcançável. (ATENÇÃO: não confundir com
  o `superEffectiveCount>0` logo abaixo, que É a linha 344 e está coberto.)
- **L542/L591 [1]** (single-team `weakCount/total > 0` falso): exigiria Pokémon fraco a zero
  dos 18 tipos (L542) ou sem resistência NEM imunidade a nenhum dos 18 (L591). Impossível
  pela type chart: toda tipagem tem ≥1 fraqueza, e toda tipagem resiste ou é imune a algo.

### type-chart.ts — L419 é um BUG, não morto (não coberto de propósito)
`computeEffectivenessWithAbility` L419 (`if (halved === 2)` fall-through → `return 0`):
É **alcançável** — um defender Fire/Water (resiste Fire 4x → base 0.25) com Heatproof/Thick
Fat/Water Bubble dá `halved = 0.125`, que não bate nenhum dos `if` e cai no `return 0`.
Isso é um **bug**: 0.125 vira 0 (imunidade falsa) em vez de manter ~0.125. Decisão do dono:
NÃO travar esse comportamento errado num teste. Deixado descoberto e marcado como bug a
corrigir. Repro: `getEffectiveness("Fire", "Fire", "Water", "Heatproof")` → retorna 0.

### model/pokemon.ts e model/move.ts — branches data-dependent
- pokemon.ts L299 (`availableAbilities`, ramo `: []`): exige nome fora de `POKEMON_DATA`;
  construir tal Pokémon depende do fallback do motor e arrisca throw — baixo valor, deixado fora.
- move.ts L86 (`target ?? "normal"`): COBERTO — 227 moves no dataset não têm `target`
  (Barrage, Bonemerang, Clamp...). `new Move("Barrage")` cai no fallback "normal".
- move.ts L82 (`category ?? "Status"` ramo direito): MORTO — varredura no dataset
  (`src/infrastructure/data/move-data.ts`) mostra **0 moves sem `category`** de 942.

### damage-calc.ts, terastal.ts, speed-calc.ts — branches mortos por normalização/tipo
- damage-calc.ts L52/L71/L104 (`residualHpInTurn(1) ?? 0` ramo direito): `residualHpInTurn`
  (result.ts L26) já retorna `... ?? 0` — tipo de retorno `number`, nunca nullish. O `?? 0`
  externo é inalcançável.
- terastal.ts L58/L59 (`pokemon.boosts[stat] ?? 0` / `bonusBoosts[stat] ?? 0` ramo direito):
  o getter `boosts` (pokemon.ts L165) sempre retorna as 5 chaves com valor do calc (0, não
  undefined). O `?? 0` nunca cai no fallback. (O teste de partial-boost passa, mas o modelo
  normaliza spd→0 antes.)
- speed-calc.ts L277 (`statisticsByRegulation[reg] ?? {}` + `.some()`) e L281 (`baseStats.spe
  ?? 999`): L277 exigiria uma `Regulation` fora do mapa, mas o tipo só admite `"MB"`; L281
  exigiria Pokémon fora de `getPokemonData`. Ambos inalcançáveis por entrada tipada válida.

### Resumo H2 "resto" (fora ev-optimizer)
Após cobertura: **22 branches restantes, TODOS classificados como inalcançáveis ou
data-dependent de risco/baixo valor** (impossibilidades de tipo em single-mode nos insights,
`?? 0`/`?? {}` sobre valores já normalizados, guards de mapa sempre populado, dead defensive
paths). O código realmente exercitável do "resto" está coberto. O gargalo remanescente real
é o **ev-optimizer (~285 branches)**, tratado à parte.

## 15. ev-optimizer — reconhecimento e branches supostamente mortos (H2)

Data: 2026-07-10 · Estratégia: cobrir só branches VIVOS via API pública `optimize()`;
não escrever teste para os mortos, apenas documentá-los aqui conforme achados.

Distribuição (full-suite, exclui *.performance): 285 branches faltando em 9 arquivos.
Concentração: solution-combiner (121), refinement-stage (59), defensive-ev-optimizer (38),
attacker-selector (38), double-attacker-optimizer (21); pequenos: single-attacker (3),
utils (2), survival-checker (2), ev-intervals (1).

Fonte de verdade da mecânica: `DEFENSIVE_EV_OPTIMIZER.md` (fluxograma mermaid + descrição
de cada fallback do combiner e dos 3 sub-processos do refinement). API única:
`optimize(defender, targets, field, updateNature, keepOffensiveEvs, threshold, rollIndex,
rightIsDefender)`. Os inputs que estressam cada caminho:
- `targets` 1-físico / 1-especial / mistos → single-attacker + combiner "two solutions".
- `targets` com `secondPokemon` (double) → double-attacker-optimizer + combiner "three solutions".
- `field` com clima/hazard/Life Orb → refinement **Increase EVs** ("after X damage").
- `field` com Leftovers/Grassy Terrain → refinement **Reduce EVs** ("after X recovery").
- `updateNature=true` → attacker-selector priority/nature.
- `keepOffensiveEvs=true` + EVs altos → reserved-EVs; `null` se total > 508.
- `threshold` 1 (OHKO) vs 2 (2HKO) → critério de sobrevivência.

### Branches supostamente MORTOS achados no reconhecimento (arquivos pequenos)
- **ev-intervals-calc.ts L11 [1]** (`if (current <= 252)` falso): o `while (current < 252)`
  sai antes de `current` passar de 252 (último valor gerado é exatamente 252, aí o while
  encerra). O `if` é sempre verdadeiro → fall-through inalcançável.
- **ev-optimizer-utils.ts L43 [0]** (`hpEv + secondaryEv > 508` verdadeiro): gerador de
  **dois** stats, cada um ≤252 → soma ≤504 < 508. Nunca dispara.
- **ev-optimizer-utils.ts L103 [0]** (`totalEvs > 508` verdadeiro): a linha 102 já faz
  `if (totalEvs > maxTotalEvs) continue`; com `maxTotalEvs ≤ 508` o guard de 508 é redundante.
- **single-attacker-optimizer.ts L104 [0]** (`hpEv + defEv > 508` verdadeiro): mesma soma
  impossível de dois stats (≤504).
- **survival-checker.ts L30 [0]×2** (default-args `rollIndex=15` / `rightIsDefender=true`):
  o único chamador (`solution-combiner.ts` L255/L349) sempre passa `rollIndex`/`rightIsDefender`
  explícitos. Inalcançável via API pública; só um teste isolado com args omitidos cobriria.
  (Deixado sem teste por decisão: só API pública.)

### Branches VIVOS pendentes (a cobrir via API pública)
- single-attacker-optimizer L45 [0] / L87 [1]: caminhos "no solution" (solução inicial falha /
  nenhuma combinação válida). Requerem cenário onde a busca não acha spread que sobrevive.
- refinement-stage / solution-combiner / attacker-selector / double-attacker-optimizer:
  fluxo algorítmico real — em andamento.

### Progresso ev-optimizer (após refinement)
Cobertos via `optimize()` (defensive-ev-optimizer.spec.ts, describes "refinement stage via
optimize" e "solution combiner via optimize"): 285 → 252 branches. refinement-stage 59→29
(cenário mixed-double + sandstorm cobre o round-robin increaseEvs em hp/def/spd de uma vez;
+ Leftovers reduce; + Kartana-CB no-solution). double-attacker-optimizer 21→18.

### solution-combiner.ts — CLASSIFICAÇÃO dos 121 branches (H2)
Método de descoberta: leitura completa do arquivo + `lines.mjs` (branchMap) + verificação
dos call-sites internos. Todos os 6 métodos internos são chamados SEMPRE com `rollIndex` e
`rightIsDefender` explícitos (linhas 28/56/65/68/76/80/112/132/144/159...), logo os default-args
são inalcançáveis via API pública.

**MORTOS / inalcançáveis via API pública** (~default-args + guards de soma redundantes):
- Default-args `rollIndex=15` / `rightIsDefender=true`: L337, L338 (`tryAddDoubleSolution`),
  L507, L508 (`tryCombineSpecialWithDouble`), e análogos em `combineSolutions` (L96-98),
  `findOptimizedCombinedSolution` (L222-223), `tryCombinePhysicalWithDouble` (L448-449),
  `tryOptimizeForSecondStrongest` (L168). Nenhum call-site omite esses args.
- Guards de soma `totalEvs > MAX_TOTAL_EVS` / `remainingEvs <= 0` sobre valores já limitados:
  L250, L267 (`findOptimizedCombinedSolution`), L348/L349 (`tryAddDoubleSolution`, remaining<=0),
  L473/L482 (`tryCombinePhysicalWithDouble`), L187 (`tryOptimizeForSecondStrongest`),
  L532/L537 (`tryCombineSpecialWithDouble`). Somas de 2-3 stats ≤252 raramente cruzam 508 nos
  spreads que o otimizador gera; guards defensivos.

**VIVOS (fallbacks algorítmicos reais — exigem cenário calibrado por branch):**
- Three-solution discard/recombine tiers: L36, L45, L55, L58, L63, L67, L69, L75, L79
  (double cobre físico e/ou especial → descarta solução; depois tenta 2-sol+double,
  físico+double, especial+double, double sozinho).
- `combineSolutions` prioritize físico/especial + re-check de sobrevivência + segundo-mais-forte:
  L127, L130, L142, L150, L154, L157.
- `findOptimizedCombinedSolution` ramo with-double vs sem: L245, L257, L258, L274.
- `tryCombinePhysicalWithDouble` / `tryCombineSpecialWithDouble`: L451, L466, L491, L510, L516,
  L525, L528, L533, L541, L542, L550.
Cada um requer geometria específica de bulk (solução do double cobrindo exatamente um tipo e
não o outro). Alto custo de calibração — cada cenário `optimize()` fecha poucos branches.

### Sessão de fechamento (2026-07-10, cont.) — 285 → 198 branches

**Método consolidado (o que funcionou):** instrumentar temporariamente os branches-alvo com
`(globalThis as any).__B?.add("marcador")`, rodar UM sweep spec com grid de matchups
(defenders × atacantes × geometrias, ~300 chamadas a `optimize()` num único build), ler o
mapa marcador→cenário no diff do FORCE_FAIL, remover instrumentação (filtrar linhas com
`__B`), escrever os testes reais com os valores capturados no próprio sweep. 2 builds por
rodada (sweep + validação) em vez de 1 build por palpite.

**Cenários-chave descobertos (todos em defensive-ev-optimizer.spec.ts):**
- Double **ambos-físicos** / **ambos-especiais** (Garchomp+Ursaluna vs Snorlax; Flutter+Volcarona
  vs Incineroar) → optimizeForTwoPhysical/SpecialAttackers, zerou survival-checker.
- `keepOffensiveEvs=true`: merge com solução (Incineroar atk252 vs Garchomp → hp4/def60 + reservados),
  estouro de 508 → no-solution, already-survives single e double (reservados preservados).
- `updateNature=true` + singles + double juntos → natureUsed ("Bold") flui pelo caminho double.
- Alvo só com moves de status → retorna EVs correntes (status "success").
- Atacante impossível + inofensivo juntos → no-solution (hasImpossible).
- **Second-strongest fallback**: Clefairy vs Ursaluna(sem item) + Miraidon-CS — geometria
  apertada onde nenhum spread combinado ≤508 cobre ambos → prioriza um lado e chama
  tryOptimizeForSecondStrongest. Variantes com double e com 2º especial (Chi-Yu).

**Novos supostamente MORTOS (0 hits em grid de ~320 cenários):**
- solution-combiner `minDefNeeded === null` (L142): findMinDefForPhysicalAttacker só retorna
  null se nem 252 def sobrevive, mas aí a physicalSolution nem existiria a montante.
- defensive-ev-optimizer L111-else (refineForDoubleAttackers null → fallback combineSolutions):
  refine de double só retorna null se increaseEvs esgota 252/252/252 com dano residual — não
  alcançado em nenhuma geometria testada (o no-solution acontece antes, no combiner).
- refinement-stage single-attacker increase (L28/L31): a solução vem do MESMO survival checker
  do re-check (ambos incluem residual), então `survives` é sempre true no caminho single → o
  ramo "falha + after damage" só existe no caminho double.
- attacker-selector ties exatos (L158/160/164): exigem `defMaxDamage === spdMaxDamage` — empate
  exato de dano entre cenários de natureza, não observado em nenhum matchup real.

**Estado ev-optimizer: 285 → 198 branches** nessa fase.

### Fase 2 de fechamento (2026-07-11) — 198 → 156 branches (80.4%)

Mesmo método (instrumentar + sweep). Novos cenários VIVOS cobertos (defensive-ev-optimizer.spec.ts):
- **findOptimizedCombinedSolution com double** (three-solution que acha spread cobrindo tudo):
  Grimmsnarl vs Ursaluna/Miraidon-CS + double Rillaboom+Volcarona → hp212/def4/spd68.
- **tryAddDoubleSolution loop**: Clefairy, mesmo trio → hp244.
- **tryCombinePhysicalWithDouble / tryCombineSpecialWithDouble** (double "inválido" = all-zero):
  Clefairy vs Ursaluna/Chi-Yu e Great Tusk/Miraidon → def252 / spd252.
- **tryCombineSpecialWithDouble loop interno** (double real contribui): Pikachu → hp36/spd148.
- **prioritizeHp all-physical / all-special** (double + Leftovers recovery): Snorlax → def236 / hp132/spd236.
- **inner Def/SpD search** (physical single + mixed double): Snorlax → hp156/def108/spd180.
- **physical-priority spread falha no especial → tryOptimizeForSecondStrongest**: Clefairy vs
  Miraidon-CS + 2 físicos fracos → hp4/def140.
- **single-attacker impossível** (threshold 4/3, atacante Choice vs defender que não aguenta):
  Chansey vs Miraidon-CS Draco Meteor; Snorlax vs Kartana-CB → no-solution (DEO L203/L210, SA L45).

### Branches restantes (156) — classificação por instrumentação + sweep de ~600 cenários
- **MORTOS por tipo/guard** (contados, não vale testar):
  - solution-combiner: 12 guards de soma `>508`/`>=bestSolution.totalEvs` sobre spreads que o
    otimizador mantém abaixo do teto; default-args (call-sites sempre explícitos).
  - refinement-stage L91 `threshold === 1`: tipo `SurvivalThreshold = 2|3|4`, o `=== 1` é
    inalcançável por entrada tipada.
  - ev-intervals L11, ev-optimizer-utils L43/L103, single-attacker L104: somas de 2 stats ≤504
    nunca cruzam 508 (já documentado na fase 1).
  - attacker-selector L158/160/164: ties EXATOS de dano entre cenários de natureza — 0 hits em
    ~350 matchups reais.
- **VIVO mas janela quase-vazia** (0 hits em ~600 cenários, forte suspeita de morto prático):
  - solution-combiner L178/L184/L191 (loop interno de `tryOptimizeForSecondStrongest`): requer
    simultaneamente findOptimizedCombinedSolution falhar E ≥2 atacantes *survivable* do mesmo
    tipo — condições quase mutuamente exclusivas. `SC-2ndEntry` sempre observado com
    `ordered=0 attackers=1` (o strongest é o único survivable → lista ordenada vazia).
  - refinement-stage reduceEvs L200-215 (reduzir def/spd/hp mantendo sobrevivência): o combiner
    já entrega spread mínimo, e o cálculo de dano já inclui o recovery, então nenhuma redução
    de 4 EVs preserva sobrevivência — 0 hits mesmo com Leftovers+Grassy Terrain.
  - double-attacker-optimizer mixed heuristic L316-373 (tentativas +1/+2 def/spd e busca full):
    o caminho mínimo quase sempre já sobrevive; os retries só disparariam num ponto de dano
    muito específico não observado.

**Conclusão:** o código vivo e razoavelmente alcançável do ev-optimizer está coberto (80.4%).
Os 156 restantes são majoritariamente mortos-por-tipo/guard e um punhado de fallbacks defensivos
cuja pré-condição não ocorre com dados reais de Pokémon (demonstrado por sweeps de ~600 cenários,
não por suposição). Cobri-los exigiria mocar o survival-checker/combiner — o que violaria a
regra de "bater na calc real".
