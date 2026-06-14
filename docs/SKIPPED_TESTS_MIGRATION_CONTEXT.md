# Contexto: Migração de Testes Skipados (SV → Champions)

## Objetivo
Adaptar testes que foram skipados durante a remoção do modo SV, trocando Pokémon/moves por equivalentes válidos em Champions.

## Regra Principal
**VERIFICAR PRIMEIRO se o Pokémon existe em Champions antes de qualquer coisa.**
Não tentar rodar testes com Pokémon inválidos.

---

## Lista Completa de Pokémon Válidos em Champions

```
Abomasnow-Mega, Absol-Mega, Aegislash-Blade, Aegislash-Shield,
Aerodactyl-Mega, Aggron-Mega, Alakazam-Mega, Altaria-Mega, Ampharos-Mega,
Arcanine-Hisui, Audino-Mega, Avalugg-Hisui, Banette-Mega, Basculegion-F,
Beedrill-Mega, Blastoise-Mega, Camerupt-Mega, Chandelure-Mega,
Charizard-Mega-X, Charizard-Mega-Y, Chesnaught-Mega, Chimecho-Mega,
Clefable-Mega, Crabominable-Mega, Decidueye-Hisui, Delphox-Mega,
Dragonite-Mega, Drampa-Mega, Emboar-Mega, Excadrill-Mega, Feraligatr-Mega,
Floette-Eternal, Floette-Mega, Froslass-Mega, Gallade-Mega, Garchomp-Mega,
Gardevoir-Mega, Gengar-Mega, Glalie-Mega, Glimmora-Mega, Golurk-Mega,
Goodra-Hisui, Greninja-Mega, Gyarados-Mega, Hawlucha-Mega, Heracross-Mega,
Houndoom-Mega, Kangaskhan-Mega, Kommo-o, Lopunny-Mega, Lucario-Mega,
Lycanroc-Dusk, Lycanroc-Midnight, Manectric-Mega, Medicham-Mega, Meganium-Mega,
Meowstic-F, Meowstic-F-Mega, Meowstic-M-Mega, Mr. Rime, Ninetales-Alola,
Palafin-Hero, Pidgeot-Mega, Pinsir-Mega, Raichu-Alola, Rotom-Fan,
Rotom-Frost, Rotom-Heat, Rotom-Mow, Rotom-Wash, Sableye-Mega, Samurott-Hisui,
Scizor-Mega, Scovillain-Mega, Sharpedo-Mega, Skarmory-Mega, Slowbro-Galar,
Slowbro-Mega, Slowking-Galar, Starmie-Mega, Steelix-Mega, Stunfisk-Galar,
Tauros-Paldea-Aqua, Tauros-Paldea-Blaze, Tauros-Paldea-Combat,
Typhlosion-Hisui, Tyranitar-Mega, Venusaur-Mega, Victreebel-Mega, Zoroark-Hisui
```

**Nota:** Também existem versões não-Mega de alguns (ex: Lopunny, Gyarados, Torterra, etc.) sem "-Mega" no nome. Ver `src/data/movesets-champions.ts` para a lista completa com atributos.

---

## Pokémon com Multi-Hit Moves (Champions)

| Pokémon | Multi-hit Move |
|---------|---------------|
| Torterra | Bullet Seed, Rock Blast |
| Lopunny / Lopunny-Mega | Triple Axel |
| Beartic | Icicle Spear |
| Infernape | (verificar) |
| Scovillain-Mega | Bullet Seed |
| Tsareena (verificar) | Triple Axel |

---

## Pokémon SV que NÃO existem em Champions (todos os testes os usam)

- Urshifu-Rapid-Strike ❌
- Flutter Mane ❌
- Raging Bolt ❌
- Rillaboom ❌
- Incineroar ❌
- Wo-Chien ❌
- Kyogre ❌
- Ting-Lu ❌
- Vaporeon ❌
- Whimsicott ❌
- Tornadus ❌
- Gholdengo ❌
- Chi-Yu ❌
- Landorus-Therian ❌
- Moltres-Galar ❌
- Iron Hands ❌
- Archaludon ❌
- Kingambit ❌
- Dondozo ❌
- Heatran ❌
- Dragonite ❌ (mas Dragonite-Mega ✅)
- Garchomp ❌ (mas Garchomp-Mega ✅)
- Empoleon ❌

---

## Arquivos com Testes Skipados

### 1. `src/lib/damage-calculator/damage-calculator.service.spec.ts` (13 testes)

**Status:** Todos usam Pokémon SV inválidos. Precisam de substituição.

**Estratégia de substituição por feature:**

| Feature testada | Pokémon Original (SV) | Substituto Champions |
|-----------------|----------------------|---------------------|
| Multi-hit move | Urshifu-RS + Surging Strikes | Lopunny-Mega + Triple Axel |
| all attacks calc | Raging Bolt 4 moves | Chandelure-Mega (Shadow Ball, Heat Wave, Trick Room, Protect) |
| Two attackers | Raging Bolt + Rillaboom vs Flutter Mane | Chandelure-Mega + Gyarados-Mega vs algum tank |
| Two attackers speed | mesmo com +2 spe | mesmo padrão |
| Two attackers multi-hit | Urshifu-RS + Rillaboom | Lopunny-Mega + Gyarados-Mega |
| Two attackers Tera | Flutter Mane Tera Fairy | qualquer Champions com Tera |
| Two attackers def/spd modifiers | Flutter Mane AV | qualquer Champions com AV |
| Ruination (fixed half HP) | Wo-Chien Ruination | Chi-Yu Ruination → **Chi-Yu não existe!** Skipar |
| Water Spout + Sitrus Berry | Kyogre + Urshifu + Incineroar Sitrus | Blastoise-Mega Water Spout existe ✅ |

**Linhas específicas:**
- L54: multi-hit → Lopunny-Mega Triple Axel vs algum defender
- L78: calcDamageAllAttacks → Chandelure-Mega
- L124: two attackers → Chandelure-Mega + Gyarados-Mega
- L144: two attackers speed → mesmo
- L245: two attackers multi-hit → Lopunny-Mega + Gyarados-Mega
- L271-334: Tera/modifiers → qualquer Champions com AV
- L376: Ruination → **SKIP** (Wo-Chien não existe, Chi-Yu também não)
- L408: Sitrus Berry Water Spout → Blastoise-Mega Water Spout + algum attacker vs tank com Sitrus

---

### 2. `src/lib/ev-optimizer/defensive-ev-optimizer.service.spec.ts` (47 testes)

**Status:** Todos usam Pokémon SV inválidos. A lógica da feature é válida.

**Substituições sugeridas por grupo:**

| Grupo | Feature testada | Substituto sugerido |
|-------|-----------------|---------------------|
| single attacker físico | Flutter Mane vs Urshifu-RS SS | Audino-Mega vs Lopunny-Mega Triple Axel |
| single attacker físico 2 | Ting-Lu vs Urshifu-RS SS Tera | Goodra-Hisui vs Lopunny-Mega CC |
| single attacker especial | Vaporeon vs Raging Bolt TB | Slowbro-Mega vs Chandelure-Mega Heat Wave |
| berry defender | Empoleon Shuca vs Garchomp EQ | Steelix-Mega Shuca vs Excadrill-Mega HHP |
| berry Sitrus | Incineroar Sitrus vs Urshifu SS | Kangaskhan-Mega Sitrus vs Lopunny-Mega CC |
| priorizar HP | Whimsicott vs Tornadus Bleakwind | Audino-Mega vs Ninetales-Alola Blizzard |
| priorizar especial | Gholdengo vs múltiplos | Gardevoir-Mega vs múltiplos Champions |
| multiple attackers | Flutter Mane vs 2+ attackers | Goodra-Hisui vs 2+ attackers Champions |
| simultaneous | Urshifu+Flutter Mane vs Gholdengo | Lopunny-Mega+Chandelure-Mega vs algum |
| residual damage | múltiplos | trocar por Champions equivalentes |
| recovery | Leftovers cenários | Champions com Leftovers |

---

### 3. Outros Arquivos

#### `src/lib/ev-optimizer/internal/` (8 testes, 3 arquivos)
Mesma substituição — Pokémon SV por Champions.

#### `src/lib/model/pokemon.spec.ts` (5 testes)
- **Dondozo** available abilities → Dondozo não existe em Champions. Mas a feature `availableAbilities` funciona com qualquer poke. Substituir por `Gyarados-Mega` ou `Tyranitar-Mega`.
- **Ogerpon formas** → Ogerpon não existe em Champions. Testar com `Aegislash-Blade/Shield` que tem mecânica de forma similar (Stance Change). Mas esses testes de Ogerpon sem Tera (testam ability sem Tera) — verificar se fazem sentido em Champions.

#### `src/lib/user-data/export-poke.service.spec.ts` (4 testes)
- Pokémon usados: Rillaboom, Incineroar, Urshifu-RS, Aegislash ✅ (apenas Aegislash existe!)
- Substituir Rillaboom → Gyarados-Mega, Incineroar → Tyranitar-Mega, Urshifu-RS → Lopunny-Mega
- O problema atual era formato de saída — `Tera Type` aparecia em linha errada. Verificar se Champions tem teraType vazio por padrão.

#### `src/lib/speed-calculator/speed-calculator-service.spec.ts` (4 testes)
- `should return only Pokémon informed in options and actual when option target is informed` → Tyranitar (não está em Champions regulação) → Substituir target por `Tyranitar-Mega`
- `should calculate Base speed` → Raging Bolt → Substituir por algum Champions com speed interessante (ex: Lopunny-Mega)
- Os outros 2 são de Regulation F/I específicos de SV → **SKIP permanente**

#### Store tests (4 testes em 3 arquivos)
- `calculator-store.spec.ts` L775: `should load Pokémon information using it name` → verificar qual Pokémon usa
- `field-store.spec.ts` (2 testes) → verificar
- `speed-calc-options-store.spec.ts` (1 teste) → verificar

---

## Workflow Recomendado para o Próximo Agente

1. **Para cada arquivo com skip:**
   a. Ler o teste original
   b. Identificar a **feature** sendo testada (não o Pokémon específico)
   c. Verificar se os substitutos existem em Champions (checar `src/data/movesets-champions.ts`)
   d. Ativar o teste, trocar Pokémon/moves
   e. Rodar o teste → se falhar, capturar valores corretos pelo erro (o expect mostra o valor recebido)
   f. Atualizar valores esperados
   g. Confirmar passando

2. **Para capturar valores corretos:** Quando um teste falha, o Vitest mostra o valor recebido no diff — usar esse valor para atualizar o `expect`.

3. **Se não há substituto viável:** Manter skip e adicionar à lista de "não adaptável".

---

## Como Rodar os Testes

```bash
# Todos os testes
npm test

# Apenas um arquivo específico
npx ng test --watch=false --coverage=false --include='src/lib/damage-calculator/damage-calculator.service.spec.ts'
```

## Estado Atual
- **1340 passando / 111 skipados / 0 falhando**
- Todos os skips são `it.skip()` — estrutura preservada

## Arquivos a Editar
1. `src/lib/damage-calculator/damage-calculator.service.spec.ts`
2. `src/lib/ev-optimizer/defensive-ev-optimizer.service.spec.ts`
3. `src/lib/ev-optimizer/internal/attacker-selector.spec.ts`
4. `src/lib/ev-optimizer/internal/double-attacker-optimizer.spec.ts`
5. `src/lib/ev-optimizer/internal/single-attacker-optimizer.spec.ts`
6. `src/lib/ev-optimizer/internal/survival-checker.spec.ts`
7. `src/lib/model/pokemon.spec.ts`
8. `src/lib/user-data/export-poke.service.spec.ts`
9. `src/lib/speed-calculator/speed-calculator-service.spec.ts`
10. `src/data/store/calculator-store.spec.ts`
11. `src/data/store/field-store.spec.ts`
12. `src/data/store/speed-calc-options-store.spec.ts`
