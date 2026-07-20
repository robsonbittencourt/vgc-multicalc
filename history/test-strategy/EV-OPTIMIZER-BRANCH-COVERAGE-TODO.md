# EV Optimizer — Branches sem cobertura (TODO)

Levantamento feito rodando toda a suite de `ev-optimizer/**/*.spec.ts` (151 testes, estado após o commit `7ed924a7` + os testes soltos de `combineSolutions` ainda não commitados) e lendo `coverage/vgc-multicalc/lcov.info` por arquivo.

Como gerar esse relatório de novo, a qualquer momento:

```bash
npx ng test --include='**/ev-optimizer/**/*.spec.ts' --watch=false
awk '/^SF:/{file=$0; sub("SF:","",file)} /^BRDA:/{print file, $0}' coverage/vgc-multicalc/lcov.info \
  | grep "ev-optimizer" \
  | awk -F'[ :,]' '{ if ($NF=="0") print $1, "line", $3, "branch", $4 }' \
  | sort -u
```

Cada item abaixo tem: arquivo, linha(s), o que falta (true/false do branch) e um cenário de negócio (pokémon/EVs/threshold) que deveria estressá-lo. "Método de caça sugerido" segue a estratégia vencedora: reproduzir via unit test direto da classe (mais rápido para calibrar o cenário) e, se fizer sentido, também via API pública (`DefensiveEvOptimizer.optimize`).

---

## CONCLUSÃO DA VARREDURA (2026-07-16)

Todo o doc foi varrido pela API pública (`optimize()`), com lcov como bússola e sweeps de confirmação para cada item. Regra do dono do projeto: **cobrir só pela API pública; nunca teste interno; se um branch não é atingível por cenário real, anotar e pular.**

**Coberto pela API (3 cenários reais adicionados a `defensive-ev-optimizer.spec.ts`):**
1. `prioritizeHp` 232-false/236-true/237-false — Snorlax/Sitrus + Rillaboom + Chi-Yu (fallback físico+especial).
2. `optimizeForSingleAttackers` overflow 209 (fluxo double) — Snorlax ofensivo + keepOffensiveEvs + double.
3. `optimizeForSingleAttackers` overflow ~363 (fluxo single) — idem com singles.

**Padrão estrutural dominante (resto dos branches):** o `findOptimal`/`combine` **sempre entregam spreads já minimizados e protegidos**. Por isso, todos os laços de refinamento, poda, fallback, desempate e os guards de tipo a jusante são **defensivos** — existem no código mas o fluxo real os curto-circuita. **Não são código morto** (não provado exaustivamente, e não se deve deletar sem prova), mas são **inalcançáveis pela API com entradas válidas**. Cada um foi confirmado com sweep instrumentado (contagens registradas item a item abaixo). Candidatos a *simplificação de código* numa rodada futura (não de cobertura de teste).

---

## ADENDO (2026-07-18) — `refinement-stage.spec.ts` interno removido

O spec interno de `RefinementStage` foi removido. Verificação por lcov (suite completa SEM o spec interno): a API pública já cobre todas as linhas de `refinement-stage.ts` que o spec interno cobria, EXCETO `reduceEvs` linhas 95-97 (hp−4 bem-sucedido) e 105-107 (def−4 bem-sucedido) — **inalcançáveis pela API no código atual**:

1. **Estrutural**: todos os produtores de spread do fallback minimizam hp/def com scans lineares/ordenados por total (`optimizeForAttacker` grid ordenado, `findMinDefForPhysicalAttacker` linear). Um −4 off-grid equivale ao breakpoint de stat inferior, que é um combo de total menor já testado e reprovado. A folga de spd (única redução que ocorre, 7 hits) vem do `min(spd_s, remaining)` do combine, calculado num hp menor que o combinado — não existe análogo para hp/def.
2. **Janela de não-monotonicidade (Sitrus) testada**: a única brecha teórica era overshoot das buscas binárias (`findMinStatIndexForDouble`). Instrumentado binsearch vs scan linear em 2032 chamadas reais via `optimize()` (4 defensores Sitrus × 3 físicos × 3 especiais × 3 doubles × EVs × thr 3/4, Sand): **0 overshoots**.
3. **Histórico**: os call sites que entregavam spread com folga em hp/def (`increaseEvs`, `prioritizeHp` — itens 1.2-1.4 abaixo) foram removidos do código; o veredito do item 1.3 ("bloqueados a montante") virou definitivo.

Também sem cobertura (e igualmente inalcançáveis pela API): branches de parâmetros default do construtor e dos métodos públicos (o optimizer sempre passa tudo explícito).

> As seções 1.x abaixo descrevem a VERSÃO ANTIGA do arquivo (com `increaseEvs`/`prioritizeHp`) e ficam como registro histórico.

---

## 1. `internal/refinement-stage.ts` (66 branches — maior pendência)

### 1.1 `refineForDoubleAttackers` (linhas 62, 67, 70)

O fluxo é sequencial: `shouldRefine` (linha 53) já filtra que o KO chance tem residual ("after X damage" ou "after X recovery"). Dentro disso:

- **Linha 62** (`if (survives)` — o spread bruto vindo do combine já sobrevive ao double, mesmo com o residual): só o lado **true** está coberto hoje (o teste atual usa um double fraco o bastante para já sobreviver de primeira). Falta o lado **false** — precondição para tudo abaixo.
- **Linha 67** (`/after .+ damage/i.test(koChanceText)`, só avaliada quando a 62 deu false): falta **os dois lados**, porque hoje a 62-false nunca ocorre. Lado **true** = a mensagem menciona "damage" (ainda toma dano residual depois do KO, ex. Stealth Rock/Sandstorm no atacante — não confundir com o item do defensor); lado **false** = a mensagem é só "after X recovery" (o atacante só se cura, sem dano residual) — nesse caso pula `increaseEvs` e vai direto pro `return null` da linha 76.
- **Linha 70** (`if (increasedSolution)`, só avaliada quando a 67 deu true): falta **os dois lados**. Lado **true** = `increaseEvs` (item 1.2) acha um spread que cabe em 508 e resolve. Lado **false** = `increaseEvs` esgota o orçamento (508 EVs) sem conseguir proteger, retorna `null`, e `refineForDoubleAttackers` também retorna `null` (linha 76) — esse é justamente o caminho que alimenta a linha 101 do `combineSolutions` (ver seção 2, seria bom cobrir os dois ao mesmo tempo).

**Cenário de negócio sugerido (cenário-base, cobre 62-false e 67-true)**: double moderado (não maxado, não trivial) contra um defensor com item de dano residual no PRÓPRIO atacante (ex. Rocky Helmet no defensor, ou o atacante holding Life Orb — o que gera "after X damage" no texto do KO chance) tal que o spread bruto do combine sobreviva ao hit direto mas morra no residual seguinte. Esse mesmo cenário, se calibrado para o double ser fraco o bastante para caber mais 4-8 EVs em Def/SpD dentro de 508, cobre a linha 70-true. Para cobrir a linha 70-false, usar o MESMO tipo de cenário mas com o double mais forte (mais perto do limite de "seria impossível maxado") — o ponto de referência numérico é: se o spread bruto já usa a maior parte dos 508 EVs (ex. `hp+def+spd > 480`), sobra pouco espaço para o `increaseEvs` (que anda de 4 em 4) conseguir fechar a diferença antes de estourar o teto.
**Cenário de negócio sugerido (67-false)**: double fraco cujo único residual seja recuperação do próprio atacante (ex. Leftovers/Sitrus Berry no atacante, sem nenhuma fonte de dano residual) — o texto do `koChanceForTwoAttackers` deve conter "after X recovery" sem conter "damage".

### 1.2 `increaseEvs` (linhas 93-154) — **método inteiro nunca exercitado**

Isso é o núcleo do problema acima: nenhuma chamada de `refineForDoubleAttackers` no fluxo atual dispara "survives=false + hasResidualDamage=true", então `increaseEvs` nunca roda. Precisa nascer do item 1.1 acima.

Branches internos relevantes, uma vez que o método for alcançado:
- **Linha 99/100** (`needDef`/`needSpd` calculados via `category === "Physical"/"Special"` ou `physicalStrongest`/`specialStrongest` não-nulos): variar para cobrir os 3 operandos de cada `||`.
- **Linha 110** (`totalEvs + 4 > MAX_TOTAL_EVS`): cenário onde o loop já começa no teto (508) e deve `break` na primeira iteração.
- **Linhas 114-150** (`step 0/1/2`, cada um com o `if` de tentativa e o `checkSurvival`): precisa de cenário onde aumentar HP sozinho não resolve (precisa também Def ou SpD), forçando o `step` a girar pelas 3 opções.
- **Linha 154** (`if (!increased) break`): cenário onde nenhuma das 3 stats consegue mais aumentar (todas em 252 ou o orçamento não permite).

**Cenário de negócio sugerido**: double moderado (não maxado) contra um defensor cujo spread inicial do combine (`{hp, def:0, spd:0}` ou similar) morre por pouco — precisa de +4/+8 em Def OU SpD para sobreviver. Ideal usar `threshold: 3` com um double onde falta *pouco* HP residual (não o hit direto).

### 1.3 `reduceEvs` (linhas 183, 193, 203)

- **Linha 203-true**: ✅ **COBERTO** (2026-07-16) — de graça, pelo teste do Rillaboom (item 1.5/linha 295). Confirma que esses branches NÃO eram inatingíveis: era falta de um cenário que fizesse o refine iterar.
- **Linhas 183-true / 193-true**: **NÃO COBERTO — dependência encadeada identificada (revisado com a técnica do 295)**.

  **Diagnóstico por instrumentação** (contando chamadas + rastreando o call site de origem via stack): o `reduceEvs` tem **4 call sites** (linhas 35, 63, 71, 277). Na suíte inteira, as 15 chamadas vêm SÓ das linhas 35 e 63:
  ```
  14 line 35   (refineForSingleAttacker)
   1 line 63   (refineForDoubleAttackers, ramo survives)
  ```
  Esses dois recebem o `solution` **direto do finder/combine** — que já o minimizaram. Por isso 0 folgas em 15 chamadas (`ok=true: 0`).

  **Os 2 call sites que PODERIAM entregar spread com folga nunca são alcançados:**
  - **Linha 71** — recebe `increasedSolution` do `increaseEvs` (que sobe de 4 em 4 até sobreviver, podendo passar do ponto → folga). Depende de **70-true**.
  - **Linha 277** — recebe `candidateEvs` do `prioritizeHp` (redistribui HP → pode sobrar). Depende do **corpo do prioritizeHp** (item 1.4).

  **Veredito:** 183/193-true não são inatingíveis por natureza — estão **bloqueados a montante**. Destravar 70-true OU o corpo do `prioritizeHp` provavelmente destrava estes de graça (foi exatamente o que aconteceu com o 203-true via Rillaboom). **Não perseguir isoladamente**; atacar os bloqueadores.

### 1.4 `prioritizeHp` (linhas 232, 236, 237, 241, 247, 251, 258, 259, 264)

- **Linha 232** (`if (attacker2)`): ✅ **COBERTO via API** (2026-07-16). O lado **false** (`attacker2=null`) só é atingível pelo fallback single-attacker, que por sua vez só nasce de um conflito físico+especial (o `findOptimal` falha porque def+spd juntos estouram 508, mas o `combineSolutions` resolve por lado). Cenário real: `Snorlax`/Sitrus + `Rillaboom` Wood Hammer 252 + `Chi-Yu` Overheat 252, threshold 3 → `{hp:0, def:132}`. Teste em `defensive-ev-optimizer.spec.ts` ("should refine a mixed physical and special pair through the single-attacker fallback").
- **Linha 236** (`if (isPhysical1)`): lado **true** ✅ coberto (BRDA branch 0 = 8 hits; probe confirma `a1=Ursaluna/Physical a2=NULL isP1=true`). Lado **false** — **PULADO** pela mesma razão da 237-true (é o mesmo cenário: um single especial).
- **Linha 237** (`if (isSpecial1)`): lado **false** ✅ coberto (BRDA branch 1 = 8 hits). Lado **true** — **PULADO: exclusão mútua provada por medição (2026-07-17)**.

  **Condições necessárias.** Para 237-true é preciso, simultaneamente:
  1. `physicalStrongest === null` (senão o `||` das linhas 251/333 do `defensive-ev-optimizer.ts` escolhe sempre o físico como `attacker1`);
  2. `specialStrongest !== null`;
  3. `findOptimal` retornar null (o refine single só é chamado dentro do `if (!evs)` da linha 302).

  **PROVA ARITMÉTICA (não amostral).** Lendo `optimal-spread-finder.ts`, o `findOptimal` retorna null em exatamente 1 situação: `findMinStatIndexForSingles` devolver `-1` (linha 100-102), i.e. algum atacante **não sobrevive nem no spread máximo**. Ele NÃO falha "por estourar 508" — o `if (totalEvs <= MAX_TOTAL_EVS)` da linha 47 apenas descarta candidatos.

  Quando a lista de físicos é **vazia**:
  - `findMinStatIndexForSingles([], ...)` retorna `0` (linha 90-92) → **`defEv = evIntervals[0] = 0`**
  - pior caso: `totalEvs = 252 (hp) + 0 (def) + 252 (spd) = ` **`504`** `≤ 508` ✅ **sempre cabe**
  - logo o único jeito de falhar seria `minSpdIndex === -1` → o especial não sobrevive a `{hp:252, spd:252}` → mas então `survivesWithMax=false` → **não é `strongestAttacker`** (`attacker-selector.ts:129`) e nem é passado ao finder (`withStrongest` só envia survivable+strongest)

  **∴ sem físico, (2) e (3) são logicamente incompatíveis — por aritmética (504 < 508), não por escassez de cenário.** Verificado por `scripts/prove-504.ts`.

  Com físico, o conflito existe (o `def` sai de 0), mas o físico que o cria é necessariamente sobrevivível → vira `physicalStrongest` → o `||` da linha 251 lhe entrega o `attacker1`.

  **Medições (2026-07-17), via derivação por espelhamento** (trocar cada poke por outro de stats/BP equivalentes na categoria oposta — método pedido pelo usuário):

  | Sweep | Combos | Resultado |
  |---|---|---|
  | Espelho do cenário Leftovers (especial principal + físico secundário) | 540 | `bothStrongest=381`, mas **`findNull=0`** — especiais fracos demais |
  | Espelho com pressão real dos dois lados | 768 | `bothStrongest=414`, **`bothAndFindNull=2`** ✅ — mas `specialMain=0`: o `||` deu o refine ao físico (`pStr=Mamoswine`) |
  | Dois especiais fortes, sem físico | 1200 | `sStrNoPhys=1003`, **`findNull=0`** em todos |
  | **Engenharia reversa dirigida**: 647 especiais que EXIGEM hp (sobrevivem `{252,0,252}` mas não `{0,0,252}`) × 12 físicos × item × atk | **2160** | **`bothStrongest+findNull=235`** ✅ (conflito é fácil!) — mas **`specialMainRefine=0`**: nos 235, `pStr` está SEMPRE preenchido |
  | **Confirmação da aritmética**: `findOptimal` chamado direto, só com especiais survivable (26×26 especiais × 14 defensores × 3 itens × 5 spa) | **135240** | **`findOptimal NULL = 0`** — zero falhas, como previsto por 504 ≤ 508 |

  Os 235 são a demonstração empírica da cadeia: sempre que o conflito existe, existe um físico sobrevivível — e ele captura o `||`. Zero exceções em 2160. E os 135240 fecham o outro lado: sem físico, o finder nunca falha.

  **Tentativa de furar a aritmética com Sitrus Berry (não-monotonicidade) — 3 hipóteses, todas falharam (2026-07-17):**

  | Hipótese | Combos | `findOptimal NULL` |
  |---|---|---|
  | H1: Sitrus + threshold 2 | 25600 | 0 |
  | H2: Sitrus + threshold 3 | 25600 | 0 |
  | H3: Sitrus + threshold 3/4 + 4 naturezas defensivas + 3 campos (Sun/Rain/none) | **374976** | **0** |

  H3 mediu também os casos "TIGHT" (solução usando ≥500 EVs): **124 casos** onde o defensor precisa de `{hp:252, def:0, spd:252} = 504` — o pior caso possível (ex.: Floette-Eternal Light of Ruin vs Dondozo Careful thr3; Kyogre Origin Pulse vs Cresselia thr4). Mesmo nesses, `def=0` e o total é 504. **A Sitrus muda QUAL spread sobrevive (não-monotônica), mas não o TETO de EVs de um especial** (que só usa HP+SpD): 504 < 508 por 4 EVs. Confirmado empiricamente que 504 é o máximo real alcançado, e nunca basta para o finder falhar.

  **Tentativa "list attacker" da doc (linha 64 do DEFENSIVE_EV_OPTIMIZER.md) — também falhou (2026-07-17):**

  A doc do autor diz que o finder pode falhar por causa de um *list attacker* mais caro de sobreviver (não-monotonicidade da Sitrus) "while the strongest pair itself remains coverable". Testado nas duas leituras:

  | Cenário | Combos | Resultado |
  |---|---|---|
  | 2 especiais singles + Sitrus (i×j×item×ev×def×nature×thr) | **1590300** | `finder NULL = 0` |
  | double pair especial + especial isolado + Sitrus, sem físico | **40320** | `special-single-refine = 0` e `findNull com sStr = 0` |

  **Por quê:** o gateway do fallback é *"genuine budget conflicts (each side fits 508 individually, but the joint requirement does not)"* (doc linha 53) — conflito **conjunto Def/SpD**. Sem físico ocupando o Def, esse conflito não existe; todos os especiais disputam só o SpD, teto 504. A Sitrus muda QUAL spread sobrevive, não o teto.

  **Total somado de TODOS os sweeps desta investigação: >2 milhões de medições, zero contra-exemplos.** Confirmado em 3 frentes convergentes: (1) leitura do código (`def` preso em 0 sem físico); (2) documentação do autor (`DEFENSIVE_EV_OPTIMIZER.md` linhas 53/64/73 — inclusive linha 73: "The single-attacker path has no increase ramp: its input spreads come from optimizers that already guarantee survival by construction"); (3) empírico. Inalcançável por aritmética, não por escassez de cenário.

  **Comparação lado a lado** (original vs espelho), que isola a causa:
  ```
  ORIGINAL: pStr=Ursaluna sStr=Flutter Mane  findOptimal -> NULL  → REFINE a1=Ursaluna/Physical
  ESPELHO:  pStr=Flutter Mane sStr=NULL      findOptimal -> {0,...} → sem refine (sImp=[Chandelure])
  ```

  **CORREÇÃO de veredito anterior:** uma versão prévia deste doc afirmava que `!evs` e `sStr≠null` eram *mutuamente exclusivos* ("a pressão que abre o `!evs` já zera o strongest"). **Isso é falso** — o próprio cenário original tem `pStr=Ursaluna sStr=Flutter Mane` **com** `findOptimal -> NULL`, e os sweeps acharam 2 e depois 235 casos. O bloqueio verdadeiro é o `||` da linha 251, não a seleção do strongest.

  **Não é código morto** — é inalcançável **pela API pública** enquanto o `||` da linha 251 priorizar incondicionalmente o físico. Um físico é necessário para tirar o `def` de 0 (única via para o conflito), e sua mera presença rouba o `attacker1`. Sem teste interno, conforme a regra.

  **Como cobrir, se um dia for desejado (mudança de PRODUÇÃO, não feita):** trocar o `||` das linhas 251/333 por uma escolha baseada em quem realmente pressiona (ex.: o lado com maior dano relativo, ou o lado cujo stat domina o spread), em vez de priorizar físico incondicionalmente. Isso é decisão de negócio — não tocar sem pedido explícito.
- **Linha 241** (`allSpecial = ... && !physicalStrongest`) e **corpo do método (247/251/258/259/264)**: **NÃO COBERTO — contradição estrutural identificada (2026-07-16, revisado com a técnica do 295)**.

  **Diagnóstico por instrumentação** (contando chamadas + estado de decisão, não só o alvo). As 9 chamadas ao `prioritizeHp` na suíte têm TODAS o mesmo estado:
  ```
  PRIO isP1=true isP2=true isS1=false isS2=false pStr=true sStr=true allP=false allS=false
  ```
  O grupo **já é todo físico** (`isP1/isP2=true`) — o único bloqueio para `allPhysical` é `sStr=true` (existe um `specialStrongest`). Parecia bastar remover o especial. **Testei: não basta.** Removendo o Rotom-Heat do cenário Rillaboom, o refine **para de rodar** (`PRIOcalls=0`) — o `findOptimal` resolve direto (`{hp:220,def:204}`) e o refinement nunca é acionado.

  **A contradição:** o refinement só dispara quando há **conflito físico+especial** (é o que faz o `findOptimal` falhar e cair no fallback). Mas `allPhysical`/`allSpecial` exigem a **ausência** da categoria oposta. Mutuamente exclusivos.

  **Verificado nos dois call sites e nos dois lados** (aprendendo com o erro do 295, onde generalizei de um call site só): `refineForSingleAttacker` (8 chamadas) e `refineForDoubleAttackers` (1 chamada) — ambos com o mesmo estado. Lado all-special testado à parte: times só-especiais (9600 + ~2500 combos) → `PRIO calls=0`, o refine também não dispara. Simétrico.

  **4 vias testadas para quebrar a contradição — todas com `PRIO calls=0` (refine não dispara):**
  | Via | Resultado |
  |---|---|
  | Time só-físico (avulso + double físico) | `PRIO=0` |
  | Time só-especial (2 especiais + double especial) | `PRIO=0` |
  | Mono-categoria + Sitrus (~11500 combos, 3 climas × 10 defensores × 8 atacantes × 4 itens × EVs) | `PRIO=0` |
  | Especial **impossível** (causa perdida → tentar zerar `specialStrongest` mantendo o refine vivo) | `PRIO=0` |

  A última via era a mais promissora (se o especial vira causa perdida, `specialStrongest` poderia ser null enquanto o conflito ainda faz o `findOptimal` falhar) — mas sem um especial **sobrevivível** o refine também não dispara.

  **Veredito:** mecanismo identificado (refine exige conflito físico+especial; allP/allS exige mono-categoria — mutuamente exclusivos), confirmado nos 2 call sites, nos 2 lados (allP/allS) e por 4 vias independentes de tentativa de quebra. **Ainda assim NÃO declaro morto** — não enumerei o espaço de entrada (ver o erro do 295: uma prova de um call site não vale pelo branch). O que tenho é: "não abre por nenhuma via que consegui construir, e há uma explicação estrutural de por quê". **Se for reaberto:** o alvo é fazer o `findOptimal` falhar SEM conflito de categorias — nenhuma das 4 vias conseguiu.

### 1.5 `checkSurvival` privado (linhas 284, 290, 294, 295, 300, 301)

- **Linha 284** (`if (attacker2)`): parcialmente coberto (~1 hit no true). Reforçar com mais cenários de single-attacker puro.
- **Linha 290** (`if (!survives) return false`): ambos os lados têm hits, mas confirmar que o `false` vem de cenários variados (não só double).
- **Linha 295** (`physicalStrongest` presente mas não sobrevive → `return false`): ✅ **COBERTO via API (2026-07-16)** — 295-true saiu de 0 para **17 hits**. **NÃO era código morto** (eu havia concluído errado que era "redundante por construção").

  **Cenário real:** `Umbreon`/Sitrus + `Rillaboom` Wood Hammer/Life Orb/atk 196 (avulso) + `Rotom-Heat` Overheat 252 (avulso) + double `Sneasel`+`Mamoswine` atk 196, Sand, threshold 3 → `{hp:124, def:244}`. Teste: "should reject candidate spreads that stop protecting the strongest physical attacker outside the double". O refine itera 29× e o Rillaboom morre em 17 dos spreads candidatos (ex. `hp:220/def:204`).

  **Por que era difícil (a assimetria com o 301):** `defensive-ev-optimizer.ts:251` faz `strongestAttacker = physicalStrongest || specialStrongest`. O `||` faz o físico virar `attacker1` sempre que existe — então em `refineForSingleAttacker` o guard 295 só re-checa um Pokémon que a linha 285 já validou (nunca falha), enquanto o 301 checa um avulso distinto (pode falhar). **Mas isso vale só para aquele call site.** Em `refineForDoubleAttackers` o `a1/a2` vêm do double, independentes do `physicalStrongest` — ali basta um físico avulso distinto do par, calibrado na faixa "sobrevive ao spread inicial, morre ao reduzido". Chave do achado: instrumentar contando **chamadas** e **falhas** (não só falhas), e varrer item×EV do avulso (Life Orb/Muscle Band/Choice Band × 0-252). Sweep vencedor: 3456 combos → 6 cenários (o Rillaboom foi o mais rico).

  **Lição registrada:** prova de impossibilidade vale por **call site**, nunca pelo branch inteiro. Ver [[feedback-derive-reachability-not-brute-force]].
- **Linha 301**: ✅ **coberto** nos dois lados (ramo 0=11, ramo 1=8).
- **Linha 301** (idem para `specialStrongest`): ✅ **já coberto** nos dois lados (BRDA 301: ramo 0=6, ramo 1=1).
- **Linhas 284, 290, 294, 300**: ✅ **já cobertas** nos dois lados pela suíte atual.

---

## 2. `internal/solution-combiner.ts` (31 branches restantes fora do que já cobrimos)

> Os métodos `combineThreeSolutions` e `combineSolutions` já foram fechados 100% (commits anteriores). O que falta é nos métodos auxiliares: `tryOptimizeForSecondStrongest`, `tryAddDoubleSolution`, `tryCombineSingleWithDouble`.

### 2.1 `tryOptimizeForSecondStrongest` (linhas 153, 160, 162, 166)

- **Linha 153/160/162/166** — **PULADO: corpo não reproduzido via API (2026-07-16)**. Instrumentei a entrada do método (`TOSENTRY`): ele **roda** no fluxo real, mas sempre com `orderedAttackers.length === 0` (retorna cedo na linha 147), então o corpo (153+) nunca executa. `findAllAttackersOrderedByStrength` retorna vazio quando a lista de atacantes do lado tem ≤1 sobrevivível, ou quando os não-strongest são causa perdida (matam o defensor maxado). Sweeps: 720 combos (2 físicos + 1 especial), 720 (2+2 mesma força), 720 (strong+weak pairs) → todos `entryOrdered>0=0`. No fluxo real, quando o combine chega aqui, a lista já foi reduzida ao strongest. Não reproduzido pelo uso real; sem teste interno.

### 2.2 `tryAddDoubleSolution` (linhas 245, 246, 280)

- **Linha 245-true / 246 (ambos)** — **PULADO: remainingEvs<=0 não ocorre (2026-07-16)**. Instrumentei os dois returns dentro do `if (remainingEvs <= 0)`: sweep de 1296 combos (físico+especial pesados com Life Orb + double, 12 defensores × thresholds 2/3) → 0 hits em ambos (`ADD245_246TRUE=0`, `ADD245_246FALSE=0`). O `currentSolution` que vem do combine físico+especial nunca chega a 508 EVs antes de tentar encaixar o double, então `remainingEvs` é sempre > 0 e o bloco 245-250 nunca executa. Padrão estrutural (combine minimiza). Sem teste interno.
- **Linha 280-false**: mesmo bloco, `if (bestSolution)` — o lado false (nenhum `bestSolution` encontrado no loop) não isolado; provavelmente também raro pelo mesmo motivo. Não perseguido.
- **Linha 280** (`if (bestSolution) return {...}`): falta o lado **false** — nenhuma combinação hp/def/spd ≤508 protege o double simultaneamente aos singles já combinados, retornando `null` (linha 284).

**Cenário de negócio sugerido**: reaproveitar os testes de `combineThreeSolutions` (linha 78-86 do combiner) que já chamam `tryAddDoubleSolution` — criar uma variante onde o `twoSolutionResult` (physical+special combinados) já usa quase todo o orçamento (remainingEvs baixo) e o double é forte o bastante para precisar de mais do que sobra.

### 2.3 `tryCombineSingleWithDouble` (linhas 349, 354, 356, 368, 375, 376, 384, 385, 386, 393)

- **Linha 349** (`if (!singleAttacker || !doubleAttacker1 || !doubleAttacker2) return doubleSolution`): falta qualquer um dos 3 ser null — cenário artificial (via unit test direto, dificilmente ocorre via API pública já que o `combineThreeSolutions` só chama isso com os 3 presentes).
- **Linha 354/356** (`isDoubleSolutionInvalid` = double é `{0,0,0}` → `return singleSpread`): falta esse caso — double totalmente trivial (já sobrevive sem EVs) combinado com um single não-trivial.
- **Linha 368** (`if (bestSolution && hpEv >= bestSolution.totalEvs) break`): falta o lado **true** isolado (precisa de um `bestSolution` já achado early para os hpEv seguintes serem podados).
- **Linha 375/376** (`if (hpEv + primaryEv > MAX_TOTAL_EVS) break` / `if (bestSolution && ...) break`): faltam ambos — cenários de poda por orçamento dentro do loop de `primaryIndex`.
- **Linha 384/385/386** (o `if (totalEvs <= MAX_TOTAL_EVS)` e a atualização condicional de `bestSolution`, incluindo o desempate por `hpEv` maior): faltam variações — precisa de 2+ candidatos com o mesmo `totalEvs` mas HP diferente para exercitar o desempate (`totalEvs === bestSolution.totalEvs && hpEv > bestSolution.hp`).
- **Linha 393** (`if (bestSolution) return {...}`): o lado **true** provavelmente falta de forma limpa (sem cair no fallback `singleSpread` da linha 397).

- **Todas as linhas 349/354/356/368/375/376/384/385/386/393** — **PULADO: método não roda via API (2026-07-16)**. Instrumentei a entrada do `tryCombineSingleWithDouble` (`TCSD`): sweep de 1176 combos (single físico OU especial + double, 14 defensores × EVs variados × thresholds 2/3) → 0 hits. O método só é chamado por `combineThreeSolutions` no fluxo de fallback (quando `findOptimal` falha E sobra `physicalSolution` XOR `specialSolution` após absorção pelo double) — combinação que os cenários single+double não disparam porque o `findOptimal` resolve direto. Mesma janela de fallback difícil dos itens 1.1/2.1. Sem teste interno.

---

## 3. `defensive-ev-optimizer.ts` (16 branches)

### 3.1 Bloco final de "no-solution / not-needed" com double (linhas 188, 193, 197, 198)

- **Linha 188-false / 193 / 197** — **PULADO: bloco só alcançado com hasSurvivableDouble=false (2026-07-16)**. Instrumentei a entrada do bloco 181 (`BLOCK181`): ele roda (72 amostras no sweep), mas **sempre** com `possibleSingles=0 hasDouble=false` → sempre cai no 188-true (`return null`). Razão estrutural: o bloco 181 só é atingido quando `evs === null` (todo o fluxo de otimização falhou); se o double fosse sobrevivível, o fluxo teria achado `evs` (zero ou spread) antes e nunca entraria aqui. Logo `hasSurvivableDouble` é sempre false neste ponto, e 188-false/193/197 são inalcançáveis. Cenários `not-needed` com double trivial existem, mas saem por OUTRO caminho (não o bloco 181). Sem teste interno.

### 3.2 Reserva de EVs ofensivos (linhas 209, 251, 270)

- **Linha 209** (fluxo COM double) e **linha ~363** (antigo 270, fluxo single) — `if (totalEvs > 508) return no-solution` no bloco `reservedEvs`: ✅ **COBERTO via API (2026-07-16)**, ambos os lados de ambos os blocos. Cenário real: `Snorlax` com `evs: { atk: 252, spa: 252, spe: 4 }` + `keepOffensiveEvs: true` + atacantes que exigem spread defensivo grande (Chien-Pao Ice Spinner + Chi-Yu Overheat), threshold 3 → os 504 EVs ofensivos reservados + qualquer def/spd estouram 508 → `no-solution`. Dois testes em `defensive-ev-optimizer.spec.ts` ("reserved offensive EVs overflow the budget via optimize"): um com double target (bloco 209), um com singles (bloco 363).
- **Linha 251** (`combineAndRefineSingleSolutions`, `if (strongestAttacker)` false): ver item 3.4 abaixo — mesmo padrão de guard "nem physical nem special strongest", provavelmente inalcançável (attackers.length>0 garante ao menos um).

### 3.3 Guards de otimização com double impossível (linhas 305, 311)

- **Linha 305/311** (`if (physicalStrongest && !physicalOptimized) return no-solution`): lado **true** — **PULADO: janela não abre via API (2026-07-16)**. Requer que o atacante seja `survivable` no `determinePriority` (senão `physicalStrongest`/`specialStrongest` vira null e o no-solution sai por outro caminho) MAS que o `optimizeForAttacker` (hp+def) falhe DEPOIS de o `findOptimal` (hp+def+spd) já ter falhado. Na prática: se um atacante é forte o bastante para o finder falhar, o priority já o marca impossível; se sobrevive no priority, o `optimizeForAttacker` acha. Sweep de 5400 combos (15 defensores × 5 atacantes fortes × 4 itens × 3 EVs × 3 thresholds × tera on/off) → 0 hits em `OPT305TRUE`. Nota: cenários realistas de no-solution para atacante impossível (ex. Gastly vs Chien-Pao Band tera Ice) existem e passam, mas o no-solution deles sai por OUTRO `return` (não o 305/311), então não fecham este branch. Sem teste interno.

### 3.4 Threshold/roll combinados com nature update (linhas 331, 333, 351, 352)

- **Linha 331/333** (`if (strongestAttacker)` em `optimizeForSingleAttackers`, ramo false = nem physical nem special strongest): **PULADO: guard defensivo (2026-07-16)**. Só ocorreria se `attackers.length > 0` mas nenhum atacante fosse classificado físico nem especial — impossível pela classificação (todo atacante é uma das duas categorias). Guard de tipo. Sem teste interno.
- **Linha 351/352** (`alreadySurvivesAll` sem double, lado false isolado): **PULADO: mesmo padrão estrutural (2026-07-16)**. Não perseguido com sweep dedicado — cai na mesma família de branches defensivos do fluxo single que os sweeps das seções 1.x e 3.x já mostraram inalcançáveis pelo uso real.

---

## 4. `internal/attacker-selector.ts` (5 branches)

### 4.1 `selectBestScenario` (linhas 166, 170)

Contexto: esta função decide, entre `current` (nature original), `def` (Impish/Bold) e `spd` (Careful/Calm), qual proteger. A decisão acontece em cascata: primeiro por **quantidade de atacantes sobreviventes** (linha 144-147, `maxSurviving`); se `def` e `spd` empatam nisso (linha 148), desempata por **dano recebido** (linha 149-156, quem toma menos dano vence); se dano também empata (linha 156 em diante), desempata de novo por **quantidade de atacantes por categoria** (linhas 157-166).

- **Linha 166** (desempate final `spd.special.survivableAttackers.length > def.physical...`): um lado do ternário falta — **PULADO: empate triplo raríssimo (2026-07-16)**. Exige `updateNature:true` E empate simultâneo em (a) contagem de sobreviventes, (b) dano recebido, (c) presença de ambas categorias, entre as natures `def` e `spd`. Não perseguido com sweep dedicado (custo alto, cenário artificial); mesmo veredito estrutural dos demais desempates.
- **Linha 170-false** (`return current` final — nature original já é a melhor): **PULADO: não reproduzido (2026-07-16)**. Sweep de 1944 combos com `updateNature:true` (12 defensores de natures variadas × físico+especial × EVs × thresholds) → 0 hits em `SEL170FALSE`. Sempre que `selectBestScenario` roda, uma das natures (current/def/spd) bate `maxSurviving` e retorna antes da linha 174. Sem teste interno.

### 4.2 `findAllAttackersOrderedByStrength` (linhas 200, 208)

- **Linha 200 (ramo isPhysical=false) / 208-false** — **PULADO: não reproduzido via API (2026-07-16)**. Ambos dependem de `findAllAttackersOrderedByStrength` ser chamado com `isPhysical=false` (grupo especial) e/ou com um atacante do grupo que é causa perdida. Único caller é `tryOptimizeForSecondStrongest` (item 2.1), que já provei rodar sempre com `orderedAttackers=0`. Sweep dirigido de 2 especiais (força lado especial) + atacante impossível → 0 hits em `FAAOBS208FALSE` (isPhysical false e true). Consequência direta do item 2.1 não abrir. Sem teste interno.

---

## 5. `internal/single-attacker-optimizer.ts` (2 branches)

- **Linha 39** (`findMinDefForPhysicalAttacker`, `if (!physicalAttacker) return null`): lado **true** — **PULADO: guard defensivo (2026-07-16)**. Único call site é `solution-combiner.ts:121`, no ramo `else` de `prioritizePhysical` onde `physicalSolution && specialSolution` são ambos não-null. `physicalAttacker` acompanha `physicalSolution` no fluxo, então nunca é null nesse ponto. O `if (!physicalAttacker)` existe apenas por causa da assinatura `Pokemon | null` (guard de tipo). Inalcançável via API por construção. Sem teste interno.
- **Linha 48** (`optimizeForAttacker`, `if (hpEv + defEv > MAX_TOTAL_EVS) continue`): lado **true** — **PULADO: provavelmente redundante (2026-07-16)**. O grid vem de `generateOrderedTwoStatGrid`, que já filtra `hp+secondary > 508` na origem, tornando a checagem interna redundante. Mesmo caso do `combineSolutions:101` da sessão anterior. Não caçado via API; candidato a simplificação de código (fora de escopo desta rodada de cobertura).

---

## 6. `internal/optimal-spread-finder.ts` (2 branches)

- **Linha 161/178** — **PULADO: janela não abre via API (2026-07-16)**. O `polish` só chega ao `return true` da linha 165 (161-false) se `survivesAll(test)` for chamado com um spread reduzido que ainda sobrevive — mas o `findOptimal` já entrega o spread mínimo, então qualquer redução de 4 EVs no polish quebra a sobrevivência e para na linha 158 (`!singlesSurvive`), sem chegar à 161. Idem para 178-true (reduzir com sucesso). Sweep de 1536 combos de single-attacker → 0 hits em `POLISH161FALSE`. Padrão estrutural recorrente: o finder/combine produzem spreads já minimizados, então os laços de "refinamento/poda" a jusante nunca encontram gordura para cortar. Sem teste interno.

**Cenário de negócio sugerido**: qualquer cenário só-singles (sem double) que passe pelo caminho rápido do finder (`findOptimal` com `doublePair=null`) — deve cobrir 161 false. Para 178 false, precisa de um spread onde o `best` bruto do finder já é o mínimo possível (não hp, não def, não spd tem folga de 4 EVs para cortar).

---

## 7. `internal/ev-optimizer-utils.ts` (2 branches)

- **Linha 20** (`generateOrderedTwoStatGrid`, `if (hpEv + secondaryEv > MAX_TOTAL_EVS) continue`): falta o lado **true**. Isso é implicitamente exercitado sempre que qualquer grid é gerado (a função sempre teria combinações hp+secondary>508 nos EVs altos) — **suspeito de já estar coberto na prática e ser um falso negativo do lcov, ou os testes atuais nunca geram o grid completo (podem usar early-return antes)**. Conferir com um teste de unidade direto de `EvOptimizerUtils`.
- **Linha 45** (idem em `generateOrderedThreeStatGrid`, o guard de `hpEv + defEv`): mesmo padrão/suspeita.

**Cenário de negócio sugerido**: teste de unidade direto (`ev-optimizer-utils.spec.ts`, hoje inexistente) chamando `generateOrderedTwoStatGrid`/`generateOrderedThreeStatGrid` com `evIntervals` cobrindo os extremos (0 a 252) e conferindo que combinações >508 são de fato filtradas — mais fácil e direto que via API pública.

---

## 8. `internal/cached-damage-calc.ts` (2 branches)

- **Linha 40** (`calculateResult`, cache hit: `if (cached) return new Result(...)`): falta o lado **true** — precisa de 2 chamadas com a MESMA chave (`attacker|move|secondAttacker|rightIsDefender|target.def|target.spd`) para acionar o cache. Isso deveria ocorrer naturalmente durante qualquer `optimize()` real (o motivo de a classe existir é cachear chamadas repetidas) — **suspeito de já ocorrer na prática mas talvez o teste rode um único `optimize()` isolado por vez sem repetir o defensor**.
- **Linha 54** (`if (typeof result.damage === "number")` — normalização de dano escalar pra array de rolls): falta o lado **true** — depende do motor de cálculo (`@calc`) devolver `damage` como número único em vez de array, o que ocorre em certas mecânicas (ex. dano fixo, OHKO). **Não é fácil de forçar via mock; melhor via um move de dano fixo real** (ex. Seismic Toss, Dragon Rage) se o motor devolver número escalar para esses casos.

**Cenário de negócio sugerido**: para a linha 40 (cache hit), um teste de unidade direto de `CachedDamageCalc` chamando `calculateResult` duas vezes com os mesmos argumentos e conferindo que o resultado é idêntico (bônus: instrumentar/spy para confirmar que o motor `calculate()` só roda uma vez). Para a linha 54, testar `optimize()` com um defensor atacado por Seismic Toss ou similar (dano fixo) e ver se o `CachedDamageCalc` é exercitado nesse caminho.

---

## 9. `internal/ev-intervals-calc.ts` (1 branch)

- **Linha 11** (`if (current <= MAX_SINGLE_STAT_EVS) evIntervals.push(current)`): falta o lado **false** — o loop incrementa `current` além de 252 na útlima iteração (256) e não deveria adicionar. Isso é uma característica **interna e determinística** do algoritmo (não depende de nenhum cenário de negócio, só chamar `getEvIntervals()` uma vez já deveria cobrir os dois lados, a menos que o teste atual nunca chame esse método diretamente e sempre through outro cache).

**Cenário de negócio sugerido**: não é sobre pokémon/negócio — é puramente algorítmico. Teste de unidade direto: `new EvIntervalsCalc().getEvIntervals()` e `expect(result).not.toContain(256)` / `expect(result[result.length-1]).toBe(252)`. Provavelmente o teste mais rápido de todo este documento.

---

## Observações gerais para quem for atacar esta lista

1. **Método vencedor validado nesta sessão**: teste de unidade direto na classe (rápido, controla o estado exato) → depois, se fizer sentido pro caso, tentar achar o cenário equivalente via API pública (`DefensiveEvOptimizer.optimize`). Nem todo branch precisa/consegue ser espelhado na API pública — alguns são genuinamente só alcançáveis via chamada direta ao método interno (isso é válido e não é "trapaça", é testar uma unidade menor quando a classe é complexa o bastante para merecer).

2. **Cuidado com "dead code" precipitado**: nesta sessão, uma tentativa de declarar duas guard clauses do `combineSolutions` (linhas 97/101) como "dead code" foi **corrigida a tempo** — na real elas eram alcançáveis por um caminho (`combineAndRefineSingleSolutions`) que eu não tinha rastreado direito. Antes de escrever "provavelmente dead code" em qualquer item acima, rastreie TODOS os call sites do método/linha, não só os óbvios. Usar `throw new Error("PROBE_X")` temporário na linha suspeita + rodar a suite pública inteira é uma forma rápida de confirmar empiricamente (se nada disparar em toda a suite, é forte evidência, mas raciocinar sobre o "porquê" estrutural continua sendo necessário antes de concluir).

3. **lcov é a bússola, não teoria**: sempre re-gerar o relatório (comando no topo do arquivo) depois de qualquer novo teste, para confirmar que o branch realmente fechou e não sobrou nenhum efeito colateral.

4. **Specs temporários (`zz-*.spec.ts`)** usados para diagnosticar via `expect(x).toBe("DIAG")`/`FORCE_FAIL` são scratch — sempre deletar antes de qualquer commit.

5. **Threshold e defensor importam mais do que parece**: doubles mistos contra defensores com SpD/Def muito altas (Snorlax, Ting-Lu) tendem a saturar rápido entre "trivial" (0 EVs) e "impossível" (nem maxado sobrevive), com pouquíssima margem no meio. Ao calibrar cenários "na fronteira", varrer EVs em passos pequenos (ideal usar a tabela de dano-por-EV, calculando com `DamageCalc`/`SurvivalChecker` direto antes de montar o cenário completo) é bem mais rápido que tentativa e erro via `optimize()`.
