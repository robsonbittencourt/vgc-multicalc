# Plano — Migração da Estratégia de Testes (pós-hexagonal)

Status: Draft · 2026-07-09
Relacionado: ADR 0002 (arquitetura hexagonal)

## Contexto

A arquitetura agora é hexagonal (`app → multicalc → calc`) e a UI está bem
definida. A suíte Cypress atual (31 specs) ficou lenta porque testa **variações
de regra de negócio** (mecânicas, abilities, items) através da UI — algo que
deveria ser unit test de domínio.

## Princípio central — cada camada, um tipo de teste

| Camada | Ferramenta | Escopo |
|---|---|---|
| `domain/calc` + `domain/multicalc` | Vitest (unit) | **100% e exaustivo.** Toda bifurcação de regra de negócio. |
| `app` — application services | Vitest (unit) | Somente services de aplicação (orquestração). Nunca componentes. |
| `app` — componentes (UI) | Cypress | Comportamento da UI: cases básicos + cada bifurcação **do componente** (não do domínio). Inclui mobile. |

Regra de ouro para decidir onde um teste vive: **se a variação muda o número/resultado
do cálculo → domínio (unit). Se muda o que aparece/como o usuário interage → UI (Cypress).**

## Norte: qualidade, não cobertura

O objetivo **não é a cobertura em si** — é garantir a qualidade/o comportamento
correto do domínio. Cobertura de branches é um termômetro, não a meta. Não escrever
teste artificial só para fechar linha. Variações extras (mesmo teste com Pokémon
diferentes) só quando **agregam garantia real**; na dúvida, perguntar.

## Convenções dos specs de domínio (calc/multicalc)

- **Testar pela fronteira pública** (`@calc`, `@multicalc/...`): construir
  `Pokemon`/`Move`/`Field` reais e chamar `calculate`/`calculateMulti`. Sem mocks
  de internals, sem teste 1:1 por arquivo — os testes simulam fluxos reais.
- **Valores reais capturados do motor**, nunca inventados. Escrever com placeholder,
  rodar, colar o output real. Assertar a `description()` completa (dano, %, KO chance).
- **Variar os Pokémon sempre que possível** — attacker e defender, **inclusive
  entre arquivos** (não só dentro de cada um). Não deixar Incineroar/Gardevoir/
  Garchomp virarem muleta recorrente em toda a suíte. Quando a ability/item não
  amarra a espécie, alternar espécies/tipos/stats dá **cobertura indireta maior**
  (mais tipos, mais interações de stat, mais caminhos de type-effectiveness).
  Quando a mecânica exige uma espécie específica (Flower Gift→Cherrim), tudo bem fixar.
  Objetivo: ao longo da suíte, cobrir um leque amplo de espécies/tipos do metagame VGC.
- **Cuidado com matchup de dano 0**: o motor lança erro ao descrever KO chance com
  dano 0 (imunidade). Escolher defenders que recebam dano no caso testado.

## Migração — segurança primeiro

- Os 31 specs Cypress atuais vão para `cypress/e2e/history/` e continuam rodando
  como rede de segurança.
- **Os specs em `history/` são congelados: referência, nunca tocados.**
- Novos specs nascem em `cypress/e2e/` (estrutura nova).
- Remoção dos antigos fica fora de escopo (decisão futura, não neste trabalho).

---

## Histórias

Ordem sugerida de execução. Cada história é refinada em tasks ao ser iniciada.

### H0 — Fundação e decisão de organização ✅ CONCLUÍDA (2026-07-09)
- Decisão: organização **híbrida** — por tela (eixo primário) + `features/` para transversais.
- 31 specs movidos para `cypress/e2e/history/` (congelado).
- Estrutura criada: `simple-calc/ multi-calc/ probability-calc/ speed-calc/ type-calc/ features/`.
- Convenção documentada em `cypress/e2e/CONVENTIONS.md`.
- Config Cypress usa `**/*.ts` e path aliases → subpastas funcionam sem ajuste.

### H1 — Blindar o domínio: calc engine 100%
Cobrir exaustivamente `src/domain/calc` com unit tests diretos (hoje `calculate.ts`
e `hit-damage.ts` só têm cobertura indireta).
- Testes unitários isolados do motor: dano, multi-hit, parental bond, multi-target,
  pre-damage effects, resolução de rolls.
- Meta: 100% de branches em `domain/calc`.

### H2 — Blindar o domínio: multicalc 100%
Cobrir exaustivamente `src/domain/multicalc` — o ponto mais fraco hoje é branches (75%).
- Stat-calc: todas as strategies de ability/item (atk-spa, spe, def-spd).
- Damage-calc: todos os calc-adjusters.
- EV optimizer, speed-calc, probability-calc, type-calc, import-validation.
- Meta: 100% de branches em `domain/multicalc`. Isso remove a maior parte da
  lentidão do Cypress, pois hoje essas variações são testadas via UI.

### H3 — Application services (app)
Unit tests para os services de orquestração da app.
- Candidatos: `teams.service`, `speed-match.service`, `damage-result-order.service`,
  `export-poke.service`, `poke-paste-parser.service`, `table-data-filter.service`,
  `mega-stone.service`, `active-field.service`, stores relevantes.
- Excluir services puramente browser (pwa, network-status, sprite, snackbar) salvo
  lógica testável.

### H4 — Cypress UI: telas desktop (núcleo)
Reescrever a cobertura de UI desktop com foco em comportamento, não em números.
- Uma "vertical slice" por tela: simple-calc, multi-calc, probability-calc,
  speed-calc, type-calc.
- Cases básicos + bifurcações **de UI** de cada componente (estados vazios,
  toggles, seleção, filtros, ordenação, badges, modais).
  (os specs antigos em `history/` seguem intocados como rede de segurança.)

### H5 — Cypress UI: mobile
Specs dedicados para os componentes mobile (não existem hoje de forma dedicada).
- Alvos: `*-mobile` de cada tela + `pokemon-build-mobile`, `pokemon-moves-mobile`,
  `teams-mobile`, `team-tabs-mobile`, `mobile-table-overlay`, `header-mobile`.
- Cobrir interações exclusivas de mobile (overlays, tabs, long-press-to-combine,
  delete na aba, switch de layout no breakpoint 1280px).

### H6 — Componentes/fluxos transversais
Features que cruzam telas: import/export, custom sets, field options, coach marks,
troca de regulation/modo.

### H7 — Consolidação
- Medir e comparar tempo de suíte antes/depois.
- Atualizar CLAUDE.md / rules com a nova política de testes.
- (`cypress/e2e/history/` permanece congelado — remoção é decisão futura, fora deste trabalho.)

---

## Decisão de organização (resolvida em H0)

**Híbrido:** por tela como eixo primário (H4/H5), `features/` para transversais
(H6). Detalhes em `cypress/e2e/CONVENTIONS.md`.
