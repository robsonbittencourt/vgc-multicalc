# Plano: Unificar dados de Pokémon (Dados ≠ Disponibilidade)

## TASKS (execução sequencial)

Ordem pensada para minimizar quebra: limpezas isoladas primeiro, unificação de pokes
no meio, reorganização de pastas por último (move imports já estáveis).

### T1 — Remover `items.ts` (código morto) [independente]
- [ ] Substituir os 4 usos de `Items.instance.withoutItem()` por constante `"(none)"`:
      `pokemon.ts`, `hp-badge.component.ts`, `pokemon-build.component.ts`, `calculator-store.ts`.
- [ ] Deletar `src/data/items.ts`.
- Validação: build + testes. Selects de item não dependem de `Items` (já vêm das tabelas).
- Detalhe: ver seção "Items".

### T2 — Achatar overrides de moves [independente]
- [ ] Aplicar cada override de `MOVE_DETAILS_CHAMPIONS` em `MOVE_DETAILS` (champions vence campo a campo).
- [ ] Validar que os PPs champions são os desejados para os 451 moves.
- [ ] Remover merge em `move.ts:72-73` → ler `MOVE_DETAILS[moveName]` direto.
- [ ] Deletar `src/data/move-details-champions.ts`.
- Validação: testes de dano/PP. Detalhe: ver seção "Moves".

### T3 — Unificar pokémon-details [base p/ T4]
- [ ] Trazer p/ champions os 636 keys que NÃO existem nele (vindos de `pokemon-details.ts`).
- [ ] Migrar os tipos `SpeciesData`/`PokemonName`/`PokemonDetail` para dentro do champions.
- [ ] Renomear champions → `pokemon-details.ts`; export `POKEMON_DETAILS` (não `_CHAMPIONS`).
- [ ] Atualizar `import-pokemon-button.component.ts` (único user de `_CHAMPIONS`).
- Resultado esperado: 946 entradas, champions vence. Validação: `pokemon-details.spec.ts` + build.
- Detalhe: ver seção "Estado atual" / "Abordagem".

### T4 — Renomear movesets [depois de T3]
- [ ] `movesets-champions.ts` → `movesets.ts`; `SETDEX_CHAMPIONS` → `SETDEX` nos 5 importadores.
- Validação: build + testes. Detalhe: ver seção "Movesets / SETDEX".

### T5 — Criar pasta `configuration/` e mover disponibilidade [por último]
- [ ] Adicionar alias `@configuration/*` em `tsconfig.json`.
- [ ] Mover `top-usage-regulation.ts` e `available-items.ts` para `src/configuration/`.
- [ ] Atualizar imports dos consumidores.
- Detalhe: ver seção "Reorganização de pastas".

### Fora deste plano (pendências)
- Criar `available-pokemon.ts` + `AVAILABLE_POKEMON` e fazer `allowAllPokes` trocar a lista
  (não o filtro) — desacoplar disponibilidade de pokes do setdex.
- Realocar não-dado (`regulation-pokemon.ts` lógica, `sprite.service.ts`, `store/`).
- Abilities: nenhuma ação.

---

## Princípio norteador

**Os arquivos de dados são SÓ dados.** Eles não devem determinar quais Pokémon estão
disponíveis. A disponibilidade (por regulação / top-usage / flag) é responsabilidade de
outra camada.

## Decisão tomada

Unificar `pokemon-details.ts` e `pokemon-details-champions.ts` em um único catálogo de
espécies. Nos Pokémon que existem nos dois arquivos, **a versão champions prevalece**.

## Estado atual (levantado)

- `POKEMON_DETAILS` (`pokemon-details.ts`): 923 entradas. Catálogo amplo de `SpeciesData`
  (name, abilities, learnset, metaMoves, metaItems, group). Consumido em todo lugar como
  fonte de atributos da espécie (ex.: `pokemon.ts`, speed calculator).
- `POKEMON_DETAILS_CHAMPIONS` (`pokemon-details-champions.ts`): 310 entradas, mesmo tipo
  `SpeciesData`. Hoje só é lido em um lugar: `import-pokemon-button.component.ts`.
- A disponibilidade real da listagem NÃO vem desses arquivos: vem de `SETDEX_CHAMPIONS`
  (movesets) em `regulation-pokemon.ts`, filtrado por `topUsageByRegulation`. Esse
  acoplamento "estar no arquivo champions = estar disponível" é o que viola o princípio.

### Sobreposição entre os dois arquivos (fato medido)

- 287 keys aparecem nos DOIS arquivos → manter a versão **champions**. Destes, **59 são
  megas** (ex. forms que existem em ambos) — todos herdam a versão champions na colisão.
- 23 keys existem SÓ no champions → preservar na unificação (não jogar fora). Dessas:
  - **16 megas exclusivos**: `barbaraclemega`, `blazikenmega`, `dragalgemega`,
    `eelektrossmega`, `falinksmega`, `malamarmega`, `mawilemega`, `metagrossmega`,
    `pyroarmega`, `raichumegax`, `raichumegay`, `sceptilemega`, `scolipedemega`,
    `scraftymega`, `staraptormega`, `swampertmega`.
  - **7 não-megas**: `barbaracle`, `eelektross`, `gourgeistlarge`, `gourgeistsmall`,
    `gourgeistsuper`, `musharna`, `scolipede` (e correlatos).
- Contagem de megas: champions=75, all=60. O único "mega" exclusivo do all é `yanmega`
  (falso positivo — é o Pokémon Yanmega, não uma mega-evolução).
- 636 keys existem só no `pokemon-details.ts`.
- Total unificado esperado: 923 + 23 = **946 entradas**.

> NÃO é subconjunto perfeito. A unificação é um MERGE (champions vence nas colisões +
> preserva os 23 exclusivos), não uma simples remoção do arquivo champions.

## Escopo deste passo inicial

Apenas a camada de **Pokémon**. Moves (`move-details` / `move-details-champions`) ficam
FORA por agora — já têm semântica diferente (champions é `Partial<MoveDetail>` mesclado
por cima em `move.ts`). Lazy/sob-demanda também está fora de escopo agora.

## Abordagem (operação concreta)

Em vez de "mergear dois arquivos", a operação é **aumentar o champions**:

1. Manter `pokemon-details-champions.ts` como base (310 entradas, versão preferida).
2. Trazer do `pokemon-details.ts` apenas os **636 keys que NÃO existem no champions**.
   Os 287 em comum ficam com a versão champions; os 23 exclusivos já estão na base.
   Resultado: 310 + 636 = **946 entradas**.
3. Apagar `pokemon-details.ts` e renomear o champions para `pokemon-details.ts`,
   mantendo o nome exportado `POKEMON_DETAILS` (todos os consumidores importam isso).

### Implicação técnica a tratar no passo 3

- Hoje `pokemon-details-champions.ts` faz `import { SpeciesData } from "@data/pokemon-details"`.
  Os tipos `SpeciesData`, `PokemonName` e `PokemonDetail` são DEFINIDOS no arquivo default.
  Ao renomear o champions para `pokemon-details.ts`, esses tipos precisam migrar para ele
  (passa a defini-los, não importá-los).
- O símbolo exportado muda de `POKEMON_DETAILS_CHAMPIONS` para `POKEMON_DETAILS`.
- Único consumidor de `POKEMON_DETAILS_CHAMPIONS` hoje:
  `import-pokemon-button.component.ts` — passa a usar `POKEMON_DETAILS`.

## Moves (análise — escopo separado dos pokes)

Semântica **diferente** dos pokes. `move-details-champions.ts` NÃO é um catálogo
alternativo: é `Record<string, Partial<MoveDetail>>` — só diffs/overrides.

### Fatos medidos

- `MOVE_DETAILS` (base): 698 entradas, `MoveDetail` completo.
- `MOVE_DETAILS_CHAMPIONS`: 458 overrides parciais, **todos subconjunto** dos 698
  (zero moves exclusivos).
- Consumo é MERGE em runtime em `move.ts:73`: `{ ...base, ...championsOverride }`.
- Campos efetivamente sobrescritos: **451 de 458 são só `pp`**. Resto marginal:
  13 `basePower`, 4 `description`, 4 `secondary`, 3 `accuracy`/`chance`, 2 `type`,
  e alguns avulsos (`boosts`, `volatileStatus`, `spa`, `category`, `name`, `target`).

### Decisão: achatar (resíduo de migração, não diferença intencional)

Aplicar os overrides champions DENTRO de `move-details.ts` e eliminar a camada de patch.

Operação (≠ a dos pokes — aqui não há "faltantes a trazer"):
1. Para cada move em `MOVE_DETAILS_CHAMPIONS`, sobrescrever os campos correspondentes
   na entrada de `MOVE_DETAILS` (champions vence campo a campo).
2. Apagar `move-details-champions.ts`.
3. Remover o merge em `move.ts:72-73` — passa a ler `MOVE_DETAILS[moveName]` direto.
4. Conferir os outros consumidores de `MOVE_DETAILS` (`type-coverage.service.ts`,
   o `multihit` em `move.ts:108`) — não dependem do champions, seguem inalterados.

> Nota: a maioria esmagadora do diff é PP. Achatar = os valores de PP champions passam
> a ser os valores de `MOVE_DETAILS`. Validar que isso é desejável para TODOS os 451
> (não só os usados em Champions) antes de executar.

## Movesets / SETDEX (análise)

Caso mais simples dos três: **só renomear**.

- NÃO existe `movesets.ts` (sem sufixo). `movesets-champions.ts` é o único catálogo de
  sets — sem par, sem merge, sem "faltantes a trazer".
- Símbolo `SETDEX_CHAMPIONS`, importado em 5 lugares reais: `regulation-pokemon.ts`,
  `target-pokemon.component.ts`, `multi-calc-mobile.component.ts`, `calculator-store.ts`,
  `speed-calc-options-store.spec.ts`.

Operação: renomear `movesets-champions.ts` → `movesets.ts` e `SETDEX_CHAMPIONS` → `SETDEX`
nos importadores. Mudança cosmética.

> ATENÇÃO (princípio 1): este arquivo é hoje a allowlist de fato de disponibilidade —
> `regulation-pokemon.ts:13` faz `Object.keys(setdex)` para montar a lista de pokes.
> Renomear NÃO desacopla dado de disponibilidade; isso fica como pendência abaixo.

## Items (análise)

Items NÃO segue o padrão "unificar champions" — não há `item-details-champions`. A camada
de dados e a de disponibilidade já estão separadas (já é o modelo-alvo). Três peças:

1. **`item-details.ts` (`ITEM_DETAILS`)** — camada de DADOS de todos os itens. Sem sufixo,
   sem par. Permanece como está.
2. **`available-items.ts`** — camada de DISPONIBILIDADE (correta p/ princípio 1):
   `availableItemNames()` retorna `Object.keys(ITEM_DETAILS)` se `FEATURES.allItems`, senão
   `AVAILABLE_ITEMS["champions"]`. A flag `allItems` JÁ existe e JÁ funciona aqui.
   → Este é o modelo que a camada de POKES deve copiar.
3. **`items.ts` (`Items.allItems()`)** — terceira lista, hardcoded em display-name
   ("Choice Band"), singleton. **Redundante / a eliminar.**

### Ação para items

A lista `Items.allItems()` (177 entradas) é **código morto / resíduo de refactor**: antes
populava os selects, mas hoje os selects vêm das tabelas (`items-table` lê `ITEM_DETAILS` +
`availableItemNames()`). `Items.instance.items` NÃO é lido em lugar nenhum (`.ts` nem
`.html`). O único uso vivo de `Items` é `withoutItem()` → constante `"(none)"`.

Portanto a remoção é trivial (não é "dinamizar leitura" — ninguém lê a lista):
- Deletar a lista `allItems()` / a classe `Items` em `items.ts`.
- Substituir os 4 usos de `Items.instance.withoutItem()` por uma constante `"(none)"`
  (ou helper pequeno): `pokemon.ts`, `hp-badge.component.ts`, `pokemon-build.component.ts`,
  `calculator-store.ts`.
- Selects NÃO são afetados (já não dependem de `Items`).

### Nota de performance (dúvida levantada e resolvida)

Remover `items.ts` e ler dinamicamente NÃO é problema de performance:
- Os 4 consumidores de `Items` (`pokemon.ts`, `hp-badge`, `pokemon-build`,
  `calculator-store`) só chamam `withoutItem()` → retorna a constante `"(none)"`.
  NENHUM deles lê a lista `Items.instance.items`. Para esses, basta uma constante.
- Quem monta a lista de itens da UI (`items-table.component.ts:60`) JÁ lê dinamicamente
  de `Object.entries(ITEM_DETAILS)` + `availableItemNames()` — não usa `Items`.
- `Object.keys(ITEM_DETAILS)` é sobre 253 chaves, uma vez na abertura da tabela
  (não é hot path / não roda por frame). Custo desprezível.
- `ITEM_DETAILS` já está no bundle. Eliminar `items.ts` REMOVE ~4KB duplicados, não adiciona.
- Drift atual: `Items.allItems()` tem 177 entradas vs 253 em `ITEM_DETAILS` — as listas
  já divergem, o que é o argumento real para remover a lista à mão.

## Abilities (análise)

Caso mais limpo — **nenhuma ação necessária**. Já é o estado-alvo.

- `abiliity-details.ts` (`ABILITY_DETAILS`, 290): camada de dados. Sem sufixo champions,
  sem par, sem flag.
- NÃO existe lista global de abilities disponíveis (sem `available-abilities`, sem
  `allAbilities`) — e está correto: disponibilidade de ability NÃO é global, é
  **por Pokémon**.
- Disponibilidade vem de `pokemon.ts:279` `availableAbilities`, que lê
  `SpeciesData.abilities` daquele poke e resolve via `ABILITY_DETAILS`. Selects consomem:
  `ability-combo-box.component.ts:41` e `abilities-table.component.ts:28`.
- Dado e disponibilidade já separados, disponibilidade já dinâmica/per-pokémon. Princípio 1
  satisfeito.

> Ligação com o plano de pokes: como `availableAbilities` lê `SpeciesData.abilities`, a
> unificação de pokes (champions vence) já define as abilities de cada poke. Reforça que o
> campo `abilities[]` precisa estar correto no resultado do merge de pokes.

## Reorganização de pastas: data/ (dado puro) + configuration/ (disponibilidade)

Princípio 1 virando estrutura física: `src/data/` guarda só DADO (fatos do jogo).
Nova pasta `src/configuration/` (mesmo nível) guarda DISPONIBILIDADE: filtros por
regulação, listas de pokes permitidos, itens permitidos.

### Fica em `src/data/` (dado puro)

- `abiliity-details.ts`, `item-details.ts`, `move-details.ts`, `pokemon-details.ts`
  (+ champions enquanto não unificados)
- `movesets-champions.ts` (os sets em si são dado, mesmo que hoje sirvam de allowlist)
- `natures.ts`, `speed-data.ts` (tipos), `speed-statistics-reg-ma.ts`, `-mb.ts`
- `pokemon-details.spec.ts`

### Vai para `src/configuration/`

- `top-usage-regulation.ts` — lista de quem aparece por regulação (config pura).
- `available-items.ts` — `AVAILABLE_ITEMS` + `availableItemNames()`.
- (futuro) `available-pokemon.ts` — `AVAILABLE_POKEMON` + `availablePokemonNames()`,
  espelhando o modelo de items, com a flag `allowAllPokes`.

### NÃO é dado nem config — fica onde está por ora (pendência de realocação futura)

- `regulation-pokemon.ts` — lógica (`pokemonByRegulation`, monta `Pokemon`). Serviço/lib.
- `sprite.service.ts` — Angular service.
- `store/` — NgRx stores.

### Mecânica da mudança

- Adicionar alias `@configuration/*` em `tsconfig.json` (espelhar `@data/*`).
- Atualizar imports dos arquivos movidos e de seus consumidores
  (`@data/top-usage-regulation` → `@configuration/...`, idem available-items).
- `regulation-pokemon.ts` passa a importar `topUsageByRegulation` de `@configuration`.

## Pendências (não fazer agora)

- Garantir que a disponibilidade (quem aparece na UI) continue vindo da camada de
  disponibilidade (top-usage / regulação), não da presença no arquivo de dados.
