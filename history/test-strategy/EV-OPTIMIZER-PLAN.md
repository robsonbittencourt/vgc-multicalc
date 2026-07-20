# Plano — Melhorias EV Optimizer (pós-cache)

Status: Em andamento · 2026-07-14  
Último: bug do refinement corrigido (2026-07-14); aguarda commit

---

## Contexto

Otimização do `DefensiveEvOptimizer`: ~730ms → ~20ms (36x), via cache de damage por stat + finder-first.  
Premissa: **preservar comportamento** (exceção aprovada: empate resolvido com mais HP).  
Novo critério: divergências com **soma total menor** são desejáveis.

---

## Política de Negócio (INEGOCIÁVEL)

**Proteger o que for possível.** Atacante impossível (não sobrevive nem maxed) é descartado; `no-solution` **apenas** quando nenhuma ameaça é possível. Trivial (0 EVs) e imune (0 dano) contam como "possíveis".

---

## Arquitetura do Fluxo

1. **OptimalSpreadFinder** (caminho feliz, ~20ms): constraints = [strongest + survivables] por categoria + double. Se acha spread, fim.
2. **Fallback** (finder falha = conflito de orçamento): single/double-optimizer → combiner → refinement (só com residual).
3. **Blocos finais**: "nenhum possível → null"; "todos já sobrevivem com 0 EVs → not-needed".

**Portão de entrada do fallback**: conflito de orçamento (cada lado ≤508, soma >508). Não há outras formas de falhar depois da política B.

---

## Tarefas (Status)

### T1 — Avaliar specs internos — ✅ CONCLUÍDA
Deletados: single-attacker, double-attacker, refinement-stage, survival-checker, attacker-selector specs (~782 linhas).  
Criados testes públicos equivalentes (+43 linhas). Zero specs internos restantes.

### T2 — Fechar branches não cobertos (~98 pendentes)
| Arquivo | Restam | Diagnóstico |
|---|---|---|
| solution-combiner.ts | ~43 | Maioria contradição pós-finder; caçáveis via list-blocker (Sitrus) |
| refinement-stage.ts | ~18 | loops do double (increase/reduce/prioritizeHp) |
| defensive-ev-optimizer.ts | ~18 | linhas mudaram pós-política; re-mapear |
| attacker-selector.ts | 5 | second-strongest edge |
| double-attacker-optimizer.ts | 4 | linha 50 |
| cached-damage-calc.ts | 3 | paths de cache |
| finder/single/utils/ev-intervals | ~7 | dispersos |

**Método validado** (use para os restantes): probe `zz-*.spec.ts` com dial de EVs + instrumentation do método privado. Se hits=0 após varredura ampla + prova analítica → deleção; se hits>0 → isole 1 cenário e teste público.

**Cuidado**: atacantes impossíveis custam 38ms/chamada (varrem 1089 combos) — filtre antes com 1 checkSurvival no máximo.

### T2c — DESCOBERTA: branch "ambos sobrevivem" é VIVO ✅
Early-return de `combineSolutions` alcançável via **list-blocker** (Sitrus Berry: atacante fraco não ativa a berry, custa MAIS).  
Inversão custo×dano só existe com HP-não-monotônico. Cenário: Ting-Lu@Sitrus, Ursaluna CB atk84 (strongest 104 EVs) + Rillaboom atk124 (blocker 488 EVs) + Chi-Yu spa164.  
Prova: L116 hit por cobertura.

**BUG descoberto e corrigido (test-first, 2026-07-14)**: `refineForSingleAttacker` poda SpD que protegia o especial (só re-valida vs strongest físico).  
Fix: repassa physicalStrongest/specialStrongest ao reduceEvs/prioritizeHp.  
Teste público: 20/84/124 (Ting-Lu, Chi-Yu protegido).  
Também cobre L115/L116 do combiner que caçamos por dias.

### T2d — Espelho especial do combiner — ✅ CONCLUÍDA (2026-07-14, commit 7f651070)
L140 if-true + binary-expr[1] cobertos. Cenário: Ting-Lu@Sitrus th3, Ursaluna CB atk184, Chi-Yu@Life Orb spa124 (blocker abandonado), Iron Bundle Hydro Pump spa220 (strongest especial). Resultado: 236/28/236.  
**Mecanismo descoberto**: ranking de strongest usa dano LÍQUIDO pós-berry vs defensor maxado (`damageWithRemainingUntilTurn`), por isso um atacante de dano bruto maior pode não ser o strongest.  
**Prova de morte (else branch, L144 if[1] / L149)**: no ramo prioritizeSpecial, `survivesSpecial` é sempre true — o result preserva hp/spd da specialSolution (solução solo válida) e def extra não afeta o dano especial. Logo (sp=true, ss=false) é impossível; L149 é inalcançável. Candidata a deleção em T2b.

### T2b — Reestruturar combineSolutions (autorizado, com cautela) — EM ANDAMENTO
Asumir pré-condição "finder falhou" por call-site:
- L31 (sem double), L60 (com double), pós-refine-double, single puro → garantias diferentes.
- Método: escreva prova de contradição lógica (2-3 linhas) antes de deletar; se não conseguir, dial + probe.
- Deleções **uma a uma**, `npm run test` completo entre cada.

**Feito (2026-07-14, commit ab0c6b41)**: guards sempre-verdadeiros deletados nos dois ramos de `combineSolutions` — `survivesPhysical` no ramo físico e `survivesSpecial` no ramo especial são sempre true (o result preserva hp+stat da solução solo; EVs do outro stat não afetam o dano da categoria). 43→38 branches descobertos.

**Feito (2026-07-14, commit 16f11f52)**: L78 (`return doubleSolution` final) coberto via teste público — cenário espelho + double Garchomp CB atk164 + Chi-Yu Flamethrower spa0. O double dá solução hp252 (não-trivial), não cobre o Ursaluna, tryAddDoubleSolution falha → fall-through. Também cobriu 64:if[1], 74:if[1] e branches do tryAddDoubleSolution. 38→34 descobertos.

**Receita de double não-trivial** (janela estreita!): vs Ting-Lu@Sitrus th3, o par precisa falhar com 0 EVs mas sobreviver maxado. Garchomp CB EQ atk164 + Chi-Yu Flamethrower sem item spa0 funciona; Chi-Yu com LO já exclui o par (morre maxado), Dusclops no lugar dá trivial (0 EVs).

**Feito (2026-07-14, commit 3bf632d7)**: `39:if[0]` coberto — double FÍSICO-PURO (Garchomp CB atk184 + Dusclops Body Press atk0) dá solução hp36/def212 que cobre o Ursaluna → physical anulado, fluxo segue pelo especial-com-double. 34→33 descobertos.

**Receita double físico-puro**: parceiro físico quase nulo (Dusclops Body Press atk0 ou Rillaboom Grassy Glide atk0) força a solução do double para hp+def, que naturalmente cobre o strongest físico.

**Feito (2026-07-14, commit 87981ea5)**: `103:if[0]` é VIVO e coberto — Ting-Lu@Sitrus th3 vs Ursaluna CB atk84 + double(Garchomp CB atk164, Chi-Yu Flamethrower spa0) → 20/84/0. Caminho: double sem spread legal → refineForDoubleAttackers null → combineSolutions(ps, null) no call-site L132. 33→? re-medir.

### ✅ CORRIGIDO — spread fake do DoubleAttackerOptimizer / spreads >508 EVs (commit 9ceb2813, 2026-07-14)
Bug (decisão do usuário: comportamento >508 estava ERRADO): `optimizeForMixedAttackers` retornava `hp252` fake não-validado quando nenhuma combinação ≤508 sobrevivia; `increaseEvs` sem teto construía spreads ilegais a partir dele (596/516/588/604 EVs congelados em 5 testes do commit b2aa63af, todos criados numa rodada de cobertura sem validar os valores).

Fix em 3 partes:
1. `optimizeForTwoAttackers` → `Stats | null`; grade esgotada = null (sem fake). Fake same-category era morto (grade 2-stat contém o canto máximo).
2. `increaseEvs` com teto: break quando total+4 > 508.
3. `computeSolution`: double sem spread legal = **causa perdida (política)** → re-roda finder SEM o doublePair; fallback singles via novo helper `combineAndRefineSingleSolutions` (dedup do bloco combine+refine). Blocos finais: double impossível não conta como survivable (não força no-solution).

Validação: para os 3 cenários com singles, resultado com double impossível ≡ resultado sem o double (20/84 burn→244/244; Grimmsnarl→4/0/164). Cenário só-double impossível → no-solution ✓ política.
5 testes corrigidos (2 → no-solution; 3 → valores singles-only validados). Suite 2689 verde.
Nota: teste do increaseEvs do double (f173bb4b) agora cobre o teto; o increase legítimo ≤508 segue vivo em outros cenários? — RE-VERIFICAR cobertura do increase na próxima rodada de T2.

**Análises registradas (não deletar sem provar de novo)**:
- `62:if[1]` MORTO: combineSolutions só retorna null se ambas soluções nulas (L95); em L60 ambas são não-nulas. Deleção exige non-null assertion — avaliar na reestruturação.
- Restantes (~33): edges dos privados — guards de `tryOptimizeForSecondStrongest` (lista vazia, remaining≤0), `tryAddDoubleSolution` (attackers null, remaining≤0) e `tryCombineSingleWithDouble` (guards, isDoubleSolutionInvalid, breaks de poda, desempates hp). Muitos podem ser mortos por pré-condição de call-site — analisar na reestruturação T2b em vez de caçar um a um.

### T3 — Unificar single/double-optimizer no finder
`optimizeForAttacker(a)` ≡ `finder([a], [], null)`. Eliminaria ~140 linhas.  
Polish de −4 do finder pode produzir somas menores em bases ímpares.  
Divergências de teste "soma menor" a apresentar **uma a uma**.

### T4 — Atualizar performance spec — ✅ CONCLUÍDA (2026-07-13)
2000ms → 200ms. Caso pesado roda ~20ms. Verde.

### T5 — Workarounds de latência na app — ✅ CONCLUÍDA (2026-07-13)
Os 4 componentes chamam `optimize()` sincronamente, sem debounce. setTimeout existentes são UX (scroll/focus).  
Nada a remover.

### T6 — Atualizar DEFENSIVE_EV_OPTIMIZER.md — ✅ CONCLUÍDA (2026-07-13)
Reescrito: política, finder-first, cache, fallback, refinement, perf 36x, limitações. (.md não commitado.)

### T7 — Mutation testing (Stryker) — retomar adiado
Com domínio 36x mais rápido, custo pode ter caído. Reconsiderar depois de T2/T2b.

---

## Semântica Crítica (que custou horas descobrir)

- **threshold N** = sobreviver até turno N−1. threshold 2 = 1 hit + eot; threshold 3 = 2 hits + 2 eot.
- **Texto koChance é calculado no defensor original (0 EVs)**, não no candidato.
- `needsRefinement` exige `/after .+ (damage|recovery)/`.
- **Window real do refinement**: threshold 3 + atacante 2HKO base + custo 380–500 EVs.
- `increaseEvs` do DOUBLE é **VIVO** (f173bb4b: Incineroar burn + Garchomp/Volcarona). SINGLE era morto (removido 0b0bb54b).
- Burn no **defensor**: 1/16 chip/turno no texto e checkSurvival; não altera dano recebido.

---

## Receitas de Cenário Prontas (validadas, valores reais)

- **Conflito de orçamento th2**: Iron Valiant CB atk180 (480) + Flutter Mane tera Fairy spa60 (496) vs Ting-Lu → 244/236/0.
- **Refinement reduce+prioritize**: Ting-Lu@Leftovers th3 vs Ursaluna CB atk124 HR + FM spa0 MB → 172/228/0.
- **Impossível único + possível (política B)**: Ting-Lu th3 vs Ursaluna CB atk252 (impossível) + FM spa0 → 180/0/236.

---

## Regras de Trabalho (resumo operacional)

- Testes públicos via `optimize()`, Given/When/Then sem comentários, **valores REAIS** (não "maior que 0").
- Mudança de expectativa: apresentar uma a uma antes.
- Bug encontrado: reportar em negócio, teste primeiro (red), depois fix. Nunca congelar bugado.
- Commits: só título, sem co-author, nunca desfazer. `.md` NUNCA entra.
- `npm run test` sempre. Prettier só nos arquivos tocados. Probes zz-* deletados antes de commitar.
- **SEMPRE português pt-BR.**

---

## Bugs Corrigidos (não regredir)

1. `807aabe9` — dano zero (imune) tratado como morte; fix SurvivalChecker.
2. `020c414b` — política proteger-o-possível: impossível não aborta mais (desfez `3a4a0f38`).
3. **2026-07-14** — `refineForSingleAttacker` poda o SpD do especial (bug acima); fixed.

---

## Próximos Passos Recomendados

1. **T2 continuar** (98 branches): espelho especial do list-blocker (técnica validada). Depois T2b (reestruturação).
2. **Quando terminar T2b**: T3 (unificar optimizers) com você por perto para divergências.
