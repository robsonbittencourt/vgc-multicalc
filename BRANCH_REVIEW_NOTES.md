# Revisão da branch remove-sv vs main — anotações

Data: 2026-07-19. Revisão autônoma, somente leitura (nada foi corrigido).
Fontes da verdade usadas: código da main, fork damage-calc (`~/dev/damage-calc`), pokemon-showdown (`~/dev/pokemon-showdown`).

Legenda de severidade:
- 🔴 provável regressão / bug
- 🟡 suspeito, precisa confirmação do Robson
- 🔵 observação / débito / limpeza

## Contexto da branch

- Main consumia o motor via `@robsonbittencourt/calc@0.11.19`; a branch internalizou o motor em `src/domain/calc` já decomposto em módulos (base-power, modifiers, etc.) — não é cópia textual do fork.
- ~40 commits: remoção do modo SV, merge de dados SV+Champions, arquitetura hexagonal (domain/infrastructure/app), fixes no motor e no EV optimizer.

## Resumo executivo

Suite de testes: **verde** (131 arquivos, 2824 testes, cobertura 96,68% linhas).

Prioridades para revisar antes do merge:

1. 🔴 **Air Balloon ignora Gravity no motor** (`guards.ts:234`) — imunidade indevida a Ground sob Gravity.
2. 🔴 **Type Calc: Ring Target/Iron Ball anulam imunidades de habilidade** e **Ring Target zera o multiplicador do segundo tipo** — diverge do Showdown e do próprio motor de dano da branch.
3. 🔴 **Type Calc: Thick Fat/Heatproof/Water Bubble removidos silenciosamente** (main mostrava as resistências).
4. 🔴 **Merge de moves perdeu overrides Champions**: Dragon Claw/Shadow Claw/Crush Claw/Dire Claw sem `slicing` (Sharpness), multihit fixo (2/3) virou faixa ([1,2]/[1,3]).
5. 🟡 **Migração de userData descarta `sv` sem backup** e adota dados SV como Champions.
6. 🟡 **Maushold-Four sumiu** do pokemon-data.

## Achados

### Motor de cálculo (src/domain/calc) — mudanças intra-branch

- 🔵 `modifiers.ts`: remoção de `field.defenderSide.isForesight` no cálculo de `isGhostRevealed` (Collision Course/Electro Drift). Coerente com remoção de Foresight do escopo (não existe em SV/Champions), mas o gen789 original considera. OK se Foresight foi removido do Field de forma consistente.
- ✅ `modifiers.ts`: reestruturação do Analytic (flag `isSwitching` na descrição) é semanticamente igual ao gen789 original para o valor do boost.
- ✅ `modifiers.ts`: Flower Gift (ally, lado atacante) e Steely Spirit (ally) idênticos ao gen789.js do pacote original, incluindo o guard `!attacker.hasAbility("Flower Gift")`. O champions.js do fork NÃO tem essas mecânicas — é uma extensão deliberada do motor Champions com comportamento gen789.
- 🟡 Assimetria Flower Gift: só o lado ofensivo foi portado. No gen789 original existem também (a) SpD 1.5x no sol para o próprio defensor com Flower Gift e (b) `field.defenderSide.isFlowerGift` (ally Cherrim protegendo o defensor). Nenhum dos dois existe em `DF_RULES`. Consistente com a decisão prévia "Champions não porta mecânicas defensivas do gen789" (memória), mas fica registrado: dano especial recebido sob sol com Cherrim aliado será superestimado.
- ✅ `modifiers.ts`: Vile Vial/Venomicon removido (fake mon, decisão registrada).
- ✅ `modifiers.ts`/`parental-bond.ts`: Parental Bond child agora é flag no move clonado (`move.isParentalBondChild`) em vez de renomear ability do clone — wiring correto, semanticamente equivalente.
- 🔴 `guards.ts:234` (computeTypeEffectiveness): `if (move.hasType("Ground") && defender.hasItem("Air Balloon")) typeEffectiveness = 0` **sem checar `!field.isGravity`**. No gen789 original e no Showdown, Gravity anula o Air Balloon (golpe Ground acerta). Na branch, Ground move vs Air Balloon sob Gravity dá imunidade indevida. O early-guard de Levitate (guards.ts:77) checa `!field.isGravity` corretamente — só o Air Balloon ficou sem.
- 🟡 `modifiers.ts:601` (resist berry): original checava `!attacker.hasAbility("Unnerve", "As One (Glastrier)", "As One (Spectrier)")`; a branch manteve só `"Unnerve"` + `field.isUnnerve`. O UnnerveAdjuster da camada multicalc seta `field.isUnnerve` para Unnerve/As One (então o caminho do app está coberto), mas o motor puro (@calc usado direto, ex. specs/consumidores sem adjusters) perde o As One. Inconsistente: por que manter "Unnerve" nativo e As One só via flag? Mesma coisa em `parental-bond.ts` (dropou até o Unnerve nativo do atacante).
- ✅ `guards.ts`: Techno Blast + Drives adicionado, compatível com gen789/Showdown (descrição só quando muda o tipo — cosmético vs original).
- ✅ `guards.ts`: Mind's Eye, Ring Target e Stellar (`typeEffectiveness = teraType ? 2 : 1`) conferem com gen789 original.
- 🔵 `guards.ts`: Weather Ball perdeu "Harsh Sunshine"/"Heavy Rain" (remoção dos Primais — intencional, commit 5ad576c2) e Nature Power saiu do `noTypeChange`/interação Prankster (Nature Power não existe em gen9 — ok como escopo).
- 🔵 `guards.ts`: Mold Breaker agora faz `defender.ability = undefined` em vez de string vazia — conferir que nenhum consumidor exibe "undefined" (desc usa `defenderAbility` da descrição, deve estar ok).
- ✅ Adjusters usam import relativo same-dir (`"./calc-adjuster"`) — o ESLint da branch restringe apenas `../*`, então está dentro da regra.
- ✅ `calculate.ts`/`stats.ts`: Tera Stellar (isStellarFirstUse, `getStellarStabMod` com `hasOriginalType`, +2048/4915, decaimento por turnos no multi-hit) — idêntico ao gen789 original.
- ✅ `items.ts` (model): tabela de Fling reescrita e conferida item a item contra pokemon-showdown/data/items.ts (Assault Vest 80, Life Orb 30, Hard Stone 100, Dragon Scale 30, Pretty Feather 20, Silk Scarf/Silver Powder/Soft Sand 10 etc.). Corrigiu inclusive o bug herdado onde FLING_120 retornava 85. Itens de origem (Adamant Crystal etc.) retornam 0 — correto, não podem ser arremessados no Showdown.
- ✅ `multi-target.ts`: assinatura restrita a exatamente 2 atacantes (era array) — todos os ramos defensivos de tamanho removidos junto; `description()` agora assume 2 resultados sempre (seguro com a nova assinatura).
- 🔵 `multi-result.ts#description()`: antes, sem koChanceText o texto vinha sem sufixo `-- ...`; agora sempre concatena `-- ${getHKO()}`. `getHKO()` sempre retorna string não-vazia (fallback "10HKO or more"), então ok — só muda o texto em cenários que antes não mostravam KO (ex.: dano 0?). Conferir se dano 0 cai no catch ("possibly the worst move ever").
- 🟡 `stamina-boost-simulator.ts` (novo): `consumesTypeBerry` marca a berry como consumida só por bater o tipo do golpe, sem exigir super-efetividade (>1) ou tipo Normal como a regra real de consumo (gen789: `typeEffectiveness > 1 || move.hasType("Normal")`). Num hit neutro/resistido do tipo da berry, o simulador descarta a berry cedo demais → turnos seguintes superestimam dano contra defensor com Stamina. Caso raro (berry de resistência + hit não-efetivo), mas diverge da regra usada no restante do arquivo.
- ✅ `desc.ts`: remoção de defaults de parâmetros (chamadas internas atualizadas; TS pega), `timesUsed` agora não-opcional com default 1 no construtor de Move — equivalente.
- 🔵 Remoções de escopo confirmadas como intencionais: Primal (Harsh Sunshine/Heavy Rain em Weather Ball, Forecast, EoT), Foresight, Nature Power, Vile Vial/Venomicon.

### Type Calc (src/domain/multicalc/type-calc/type-chart.ts)

- 🔴 `removesTypeImmunity` aplica Ring Target/Iron Ball a **imunidades de habilidade**. No Showdown: Ring Target só anula imunidades **de tipo** (não afeta Levitate/Flash Fire/Volt Absorb/Earth Eater); Iron Ball só aterra (anula apenas a imunidade a Ground de Levitate/Eelevate). Na branch: Flash Fire + Iron Ball → Fire mostra 1x (deveria imune); Levitate + Ring Target → Ground mostra 1x (deveria imune); Earth Eater + Iron Ball → 1x (deveria imune).
- 🔴 Ring Target em dual-type: o código multiplica os dois tipos e, se o produto é 0, retorna 1 — perdendo o multiplicador do outro tipo. Showdown/motor tratam por tipo: Electric vs Ground/Water com Ring Target deveria ser 2x (mostra 1x); Ground vs Flying/Steel com Ring Target deveria ser 0.5x (mostra 1x). O próprio motor de dano da branch (guards.ts) faz certo, por tipo — Type Calc e Damage Calc vão discordar entre si.
- 🔴 `ABILITY_RESISTANCES` (Thick Fat, Heatproof, Water Bubble) foi **removido silenciosamente** no commit 392936fd (mensagem só fala de Ring Target/Iron Ball/Air Balloon/Klutz). Na main, o Type Calc mostrava Fire/Ice reduzidos para Thick Fat etc.; na branch não mostra mais. Se foi decisão de escopo, não está documentada.
- 🔵 Air Balloon sem check de Klutz (Klutz desativa Air Balloon no Showdown) — mas é a mesma convenção da damage-calc original e do motor; consistente.
- ✅ Scrappy/Mind's Eye (ignoresGhostImmunity) e Mold Breaker (ignora habilidade do defensor) no Type Calc conferem com o Showdown.

### Persistência / migração de dados do usuário (src/app/store/utils)

- 🟡 `migrate-user-data.ts`: a nova migração faz `champions ?? sv ?? legacyFlatData` e regrava o localStorage **descartando a chave `sv` para sempre, sem backup**. Usuário que tinha times nos dois modos perde os times SV silenciosamente; usuário só-SV tem os times SV adotados como Champions (podem conter mons/itens/moves inválidos no novo escopo — `fixInvalidPokemon` só corrige Floette). Se a adoção sv→champions é intencional, considerar gravar um backup (`userData-backup`) antes de reescrever.
- 🔵 `user-data-mapper.ts`: `buildTeamMemberState` perdeu o fallback para `teamMembers: []` — mas o novo design trata time vazio como estado legal (`Team.isEmpty()`, `activePokemon()?.`, times novos nascem com `[]`), então dados legados com array vazio devem funcionar. Só conferir visualmente um userData antigo com time "vazio".
- 🟡 `user-data-mapper.ts`: `buildPokemonState` perdeu o tratamento de shape legado do placeholder (`pokemon.ability.name` / `pokemon.ability.on` quando o mon era default). Se existir userData antigo com left/right pokemon nunca selecionado (ability como objeto), a branch vai passar o objeto direto como string de ability.
- 🔵 `buildUserData` não filtra mais placeholders ("Select a Pokémon") ao salvar times/targets — mudança de contrato de dados salvo (agora placeholders persistem). Coerente com o novo fluxo, mas altera o formato salvo.
- ✅ `user-data-storage.ts`: remoção de `gameOverride`/`clearGameFields`/parâmetro `game` — limpeza correta da remoção do modo SV.
- ✅ `state-mapper.ts`: só remoção do parâmetro `game` — mecânico.
- ✅ Modelo `Pokemon` do domínio: `jumps` via `increasedStatByNature` tem mapeamento idêntico ao antigo `baseStatWithBeneficalNature`; `setEvs/recalculateStats` equivalentes; placeholder "Select a Pokémon"→Togepi movido para o adapter (`calc-pokemon-builder.ts:31`).

### Import/Export e feature flags

- 🔵 `poke-paste-parser`: a heurística `totalEvs <= 66` (detectar paste em SP) foi trocada por toggle explícito no modal de import (`useSpsMode`, default ligado). Decisão de produto ok, mas: usuário que colar um paste padrão do Showdown (EVs 0–252) com o toggle ligado terá os valores tratados como SP (`spToEv(252)`…) — vale conferir se há clamp/aviso.
- 🟡 `export-poke.service.ts`: o filtro `!p.isDefault` foi removido do export. Como o placeholder "Select a Pokémon" agora vira "Togepi" no adapter, se algum fluxo ainda mantém placeholder dentro de time, o export vai listar um Togepi falso. Conferir que placeholders nunca entram em `teamMembers` no novo fluxo.
- 🔵 `feature-flags.ts` (novo): flags default-off para mecânicas fora do escopo Champions (tera no export, battery, power spot, ruins, neutralizing gas, allItems, allowAllPokes), sobrescrevíveis via localStorage `featureFlags` — kill-switch, não reativo (exige reload). Campo do Field antes `!isChampions()` agora atrás dessas flags; toggle manual de Unnerve sumiu (agora o UnnerveAdjuster deriva do atacante — ok).
- ✅ `import-validation.ts` (novo domínio): filtra por MOVESETS/moves/itens do modo com snackbar — consistente com a feature registrada.

### Merge de dados (src/infrastructure/data) vs pacote @robsonbittencourt/calc@0.11.19

Comparação programática do dado mesclado contra o dado composto do pacote (base + overrides Champions):

- ✅ `pokemon-data.ts`: 285/286 espécies Champions conferem em baseStats/types/weight/notFullyEvolved. O stat legado `sl` (Special de gen1) foi dropado — não é usado pelo motor, ok.
- 🟡 `pokemon-data.ts`: **Maushold-Four sumiu** (existia no pacote; stats iguais ao Maushold base, mas import de paste "Maushold-Four" deixa de resolver — hoje cai no catch de import com "Could not import").
- 🔴 `move-data.ts`: overrides Champions perdidos no merge (o pacote compunha base gen9 + champions-moves): **Crush Claw, Dire Claw, Dragon Claw e Shadow Claw perderam a flag `slicing`** → Sharpness não boosta mais esses moves (na main boostava em modo Champions).
- 🟡 `move-data.ts`: multihit fixo dos Champions virou faixa: Double Hit/Dual Wingbeat/Twin Beam eram `2` (sempre 2 hits) e viraram `[1,2]`; Triple Axel era `3` e virou `[1,3]`. Afeta default de hits e cálculo de KO (na main, em Champions, eram fixos).
- 🔵 `move-data.ts`: Growth marcado como Grass (pacote: Normal) e Dragon Cheer perdeu flag `sound` — ambos status moves, sem impacto no cálculo; cosmético/consistência.
- 🔵 `item-data.ts`/`mega-stone-data.ts`: 18 mega stones do pacote não existem no app (Baxcalibrite, Darkranite, Heatranite, Mewtwonite X/Y, Salamencite, Diancite, etc.) embora as formas Mega correspondentes existam em `pokemon-data.ts`. **A main também não as tinha** — não é regressão, só inconsistência de dados (mega selecionável sem a pedra correspondente; resistedKnockOff do motor não reconhece essas pedras).
- ✅ Mega stones presentes (86) conferem com o mapeamento do pacote; natures conferem.

### Motor de cálculo — porte inicial (migração db58f25e)

- O motor foi migrado já decomposto (não é diff textual do pacote `@robsonbittencourt/calc@0.11.19`); a fidelidade do porte é garantida por `damage-calc.spec.ts` (~1.5k linhas de paridade) + benchmarks em `history/performance` comparando com a damage-calc. Não é viável re-verificar o porte inteiro semanticamente nesta revisão; confiei na suíte de paridade e revisei em detalhe apenas as mudanças pós-migração (acima).

### App layer / infraestrutura / configs

- ✅ `field-mapper` e `calc-pokemon-builder` (adapters): portes fiéis dos equivalentes da main (renames Smogon→Calc). Exceção: o builder **ignora `options.ivs`** (Champions fixa IVs 31) mas `PokemonParameters` ainda expõe `ivs` — parâmetro morto, remover ou documentar.
- ✅ `damage-calc.ts` (domínio): mesma lógica do `damage-calculator.service` da main; lista de adjusters preservada (9 da main + Unnerve/FlowerGift/SteelySpirit novos); dependência do store substituída por parâmetro `useSpsMode` — bom desacoplamento.
- ✅ `MultiCalc` (agregado novo): orquestração fina sobre DamageCalc, sem lógica de cálculo própria.
- ✅ `calc-store`: remoção do conceito `Game`/`updateGame` consistente; team filter deriva do estado (fix do bug de snapshot preservado).
- ✅ `teams.service`: novo modelo de time vazio (sem membro default); PDF export agora pede infos do jogador via modal.
- ✅ ESLint: regras de import por camada (calc → só @data; multicalc → sem UI; data → nada; adapters → sem UI) codificam a hexagonal. 🔵 Nota: multicalc pode importar `@adapters` e adapters pode importar `@multicalc` — ciclo entre camadas tolerado por design (adapter como tradutor), documentado nas mensagens das regras.
- ✅ Rotas: apenas paths de import atualizados, nenhuma rota removida.
- 🔵 `angular.json`: `allowedCommonJsDependencies` ainda lista `@robsonbittencourt/calc` (dependência removida) — limpeza pendente.
- 🔵 `src/.well-known/assetlinks.json` removido no commit "Remove SV mode" — o arquivo era `[]` (vazio), remoção inofensiva; se um TWA Android for configurado um dia, precisa voltar.
- 🔵 `tools/smogon-data-parser`: reescrita relevante (novos geradores, remoção de eggmoves/sprites-download) — tooling de dev, não revisado a fundo; não afeta runtime do app.
- 🔵 Cypress: specs movidos para `cypress/e2e/history/` como safety net (decisão registrada); fixtures ajustadas para o novo formato de dados.

## Veredito geral

A migração estrutural (hexagonal, renames, stores, adapters) foi fiel — as diferenças de comportamento encontradas se concentram em: (1) mudanças deliberadas no motor que introduziram 1 bug de borda (Air Balloon×Gravity), (2) a nova lógica de itens/habilidades do Type Calc, que diverge do Showdown em vários casos, (3) perda de overrides Champions no merge de dados de moves, e (4) a migração destrutiva do localStorage. Tudo o mais que foi removido (SV, Primais, Foresight, Nature Power, Vile Vial) parece escopo intencional e está consistente no código.

