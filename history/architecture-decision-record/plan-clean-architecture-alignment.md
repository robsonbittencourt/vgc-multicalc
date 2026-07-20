# Análise Clean Architecture — projeto inteiro

Data: 2026-07-19. Régua: regra de dependência da clean architecture (dependências apontam sempre para dentro, domínio no centro), camadas com responsabilidade única e ports & adapters nas bordas. Baseline: ADR 0002 (hexagonal `app → multicalc → calc`), que já anteciparia parte dos achados como "Open / deferred".

Rede de segurança: fronteiras ESLint por camada + suíte unit (~2.8k testes). Todas as fases abaixo são refactors estruturais **sem mudança de comportamento**.

---

## 1. O que já está aderente (não mexer)

- **Direção única de dependência com enforcement real**: [eslint.config.js](eslint.config.js) tem regra de `no-restricted-imports` por camada — calc não vê ninguém acima, multicalc não vê o app, data não vê ninguém. Não é convenção de boa vontade; é lint que quebra o build.
- **Domínio 100% livre de framework**: zero imports de `@angular` em `src/domain` (produção). O ADR 0002 até permitia DI do Angular no domínio; a prática ficou mais estrita que a regra — classes puras instanciadas com `new`.
- **Motor encapsulado**: o app não importa `@calc` em nenhum arquivo; todo acesso ao motor passa pelo domínio. Deep imports em `@calc/*` são bloqueados para todo mundo.
- **Sem vazamento de browser API**: nenhum `localStorage`/`window` fora de `src/app`.
- **Impurezas de formatação na borda**: probabilidades retornam números crus; pipes formatam na UI (ADR 0002).
- **Decisões registradas em ADR** e barrels públicos por módulo do domínio, com lint bloqueando deep import (parcial — ver item 2.5).

---

## 2. Não aderências

Legenda: 🔴 viola a regra de dependência hoje · 🟠 responsabilidade no lugar errado · 🟡 fronteira frouxa / decisão pendente

### 2.1 🔴 Ciclo domínio ↔ infraestrutura via `@adapters`

O domínio importa `@adapters` em 5 arquivos, e `@adapters` importa `@multicalc` — ciclo entre camadas, com o domínio dependendo de infraestrutura:

- [damage-calc.ts:15](src/domain/multicalc/damage-calc/damage-calc.ts#L15) — `FieldMapper, fromExisting`
- [model/pokemon.ts:11](src/domain/multicalc/model/pokemon.ts#L11) — `fromScratch`
- [speed-calc.ts:2](src/domain/multicalc/speed-calc/speed-calc.ts#L2) — `pokemonByRegulation`
- [import-validation.ts:4](src/domain/multicalc/import-validation.ts#L4) — `toPokemon`
- [cached-damage-calc.ts:2](src/domain/multicalc/ev-optimizer/internal/cached-damage-calc.ts#L2) — `fromExisting`

O ESLint permite: a regra do multicalc bloqueia só os aliases do app, não `@adapters`.

**Diagnóstico**: o conteúdo de `infrastructure/adapters` não é infraestrutura no sentido clean — nada ali fala com mundo externo (HTTP, storage, device). São dois grupos:

1. `calc-pokemon-builder` + `field-mapper` — tradução Pokemon/Field do domínio → modelo do motor. É uma anti-corruption layer **entre dois círculos internos** (multicalc e calc). Pertence ao domínio.
2. `pokemon-by-regulation` (`pokemonByRegulation`, `toPokemon`) + `pokemon-name-normalizer` — factories que constroem Pokemon do domínio a partir dos dados estáticos de `@data`. Papel de repositório de leitura; também pertence ao domínio (dado que `@data` é reference data, ver 2.2).

**Direção**: mover a pasta para dentro do domínio (ex.: `src/domain/multicalc/calc-bridge/` para o grupo 1 e um módulo de repositório para o grupo 2, ou uma única pasta `src/domain/adapters` se preferir mínimo movimento). Reapontar o alias `@adapters`, e então **proibir** qualquer import ascendente que sobre. `infrastructure/` fica só com `data/` — o que alimenta o item 2.2.

### 2.2 🟠 `infrastructure/data` é conhecimento de domínio rotulado de infra

34 arquivos do domínio importam `@data`. Pela regra de dependência, domínio → infraestrutura é violação — mas aqui o problema é o **rótulo**, não o import: `pokemon-data`, `move-data`, `nature-data`, `moveset-data` são reference data do jogo, puros, sem I/O, e [types.ts](src/infrastructure/data/types.ts) define o vocabulário (`TypeName`, `AbilityName`, `ItemName`, …) usado por todas as camadas — isso é o círculo mais interno (entidades/tipos de empresa), não a borda.

O próprio ESLint já trata `data` como camada base ("depends on nothing but itself"), que é semântica de núcleo, não de infra.

**Direção (decisão do dono)**: reclassificar como base do domínio — ex.: mover para `src/domain/data` mantendo o alias `@data` e a regra "não importa ninguém". Ports/interfaces aqui seriam cerimônia sem benefício (dado estático compilado, sem segunda implementação concebível). Registrar num ADR curto (0003) que reference data é camada base do domínio. Após 2.1 + 2.2, o diretório `src/infrastructure` deixa de existir e a arquitetura física volta a dizer a verdade: `app → domain (multicalc → calc → data)`.

### 2.3 🟠 Serialização/persistência sem porta (item aberto do ADR 0002)

`src/app/store/user-data/` e `src/app/store/utils/` misturam três coisas diferentes:

- [poke-paste-parser.service.ts](src/app/store/user-data/poke-paste-parser.service.ts) — parsing do formato Showdown/pokepaste → `Pokemon` de domínio. Conhecimento de formato de serialização é regra de negócio, não estado de UI; hoje é `@Injectable` no app enquanto sua contraparte `import-validation` está no domínio.
- [export-poke.service.ts](src/app/store/user-data/export-poke.service.ts) — duas responsabilidades numa classe: serializa o time para texto **e** abre `MatDialog` para exibir.
- [user-data-mapper.ts](src/app/store/utils/user-data-mapper.ts), [migrate-user-data.ts](src/app/store/utils/migrate-user-data.ts), [user-data-storage.ts](src/app/store/utils/user-data-storage.ts) — schema de persistência + migração de versão convivendo com utils de estado inicial de store.

**Direção**: separar o puro do efeitoso. A parte pura (texto ↔ Pokemon; mapeamento e migração de schema do user data) vira um módulo de serialização coeso — driven adapter de verdade, testável sem Angular. O app fica com o que é dele: `localStorage`, resolver, modais. Interface/porta formal no domínio só se um segundo backend de persistência entrar no horizonte; antes disso, módulo puro bem localizado basta.

### 2.4 🟠 Falta a camada de aplicação — páginas orquestram casos de uso (item aberto do ADR 0002)

Evidência:

- `new DefensiveEvOptimizer()` dentro de 4 componentes ([multi-calc](src/app/pages/multi-calc/multi-calc/multi-calc.component.ts#L30), [multi-calc-mobile](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts#L91), [simple-calc](src/app/pages/simple-calc/simple-calc/simple-calc.component.ts#L30), [simple-calc-mobile](src/app/pages/simple-calc/simple-calc-mobile/simple-calc-mobile.component.ts#L55)); `new SpeedCalc()` em 2 componentes + 1 store.
- [multi-calc-mobile.component.ts](src/app/pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component.ts) tem 949 linhas e importa `MOVESETS` (`@data`) e `pokemonByRegulation` (`@adapters`) — a UI enxergando duas camadas abaixo e montando `MultiCalc` + otimizador por conta própria.
- O wiring é **duplicado** entre as variantes desktop e mobile de cada página (multi-calc ×2, simple-calc ×2, speed-calc ×2): a mesma orquestração escrita duas vezes.

**Direção**: um application service por página/caso de uso — o componente lê o store, entrega dados ao serviço, o serviço monta os inputs e chama o domínio. Isso resolve três coisas de uma vez: componentes viram apresentação pura, o par desktop/mobile passa a compartilhar a orquestração, e nasce a costura natural de teste unitário da camada app (a estratégia de testes do projeto já prevê exatamente "app testa application services"). É o maior refactor do plano — fazer **por página**, nunca big bang.

### 2.5 🟡 API pública do domínio é vazada

A regra de barrel do app cobre 7 módulos (`model`, `damage-calc`, `speed-calc`, `type-calc`, `probability-calc`, `ev-optimizer`, `stat-calc`) — mas:

- `@multicalc/utils/*` não tem barrel nem está na regra: o app importa `ev-sp-converter` e `uuid` direto em 10+ arquivos.
- Os módulos soltos na raiz (`multi-calc.ts`, `types.ts`, `import-validation.ts`, `hp-calc.ts`, `target-list.ts`, `pokemon-table-data.ts`) só são acessíveis por deep import.

**Direção**: barrel para `utils` (ou promover os conversores para `model`, onde `evToSp`/`spToEv` são vocabulário do domínio) e incluir na regra ESLint; para os arquivos de raiz, ou um barrel raiz do multicalc ou aceitar deep import de raiz como convenção — decidir e uniformizar. Mecânico.

### 2.6 🟡 `pokemon-table-data.ts`: shaping de apresentação dentro do domínio

[pokemon-table-data.ts](src/domain/multicalc/pokemon-table-data.ts) agrupa Pokemon em `"Meta" / "Low usage" / "Regular"` com `GROUP_ORDER` — estrutura de grupos e ordem de exibição são preocupação da tabela da UI. O princípio já foi firmado no projeto em caso análogo (ordenação de resultados é apresentação, não domínio). O conceito de domínio real embutido — tier de disponibilidade por uso — é o que merece ficar.

**Direção**: mover o agrupamento/ordenação para a feature de tabela no app; o domínio expõe só a classificação (usage/tier). Pequeno.

### 2.7 🟡 `configuration` sem dono definido (item aberto do ADR 0002)

Hoje só o app consome `@configuration`. [available-items.ts](src/app/configuration/available-items.ts) mistura dois mundos: deriva a lista de `ITEM_DETAILS` (`@data`) — regra de **disponibilidade** de itens, que é domínio — e filtra por `FEATURES` (feature flags) — que é configuração de app/deploy.

**Direção (decisão do dono)**: separar — regra de disponibilidade desce para o domínio (junto da camada "Disponibilidade" já conceituada no modo remove-sv); flags ficam no app. Fechar o item do ADR com a decisão.

### 2.8 🟡 UI lê `@data` direto (21 arquivos)

Pragmático para listas estáticas (autocomplete, tabelas), mas formalmente a UI pula o domínio. **Recomendação**: aceitar leitura direta de reference data pelo app (é estático, imutável e sem regra embutida) e **documentar a exceção no ADR 0003** — facade no domínio para repassar constante seria cerimônia sem ganho. O que não pode é regra de negócio se esconder nesses usos (o caso do `available-items`, item 2.7, é exatamente isso).

### 2.9 🟡 Documentação de arquitetura desatualizada (deriva)

- [CLAUDE.md](CLAUDE.md) e [.claude/rules/general.md](.claude/rules/general.md) descrevem a estrutura **antiga**: `src/lib`, `src/data/store`, aliases `@basic`, `@core`, "stores em `src/data/store/`" — nada disso existe mais.
- [eslint.config.js](eslint.config.js) bloqueia aliases `@core/*` e `@basic/*` que nem constam no tsconfig.

Num repo que usa essas regras como guard rail de agente, doc errada induz erro ativamente.

**Direção**: atualizar CLAUDE.md + rules para a estrutura real (`app / domain / infrastructure`, aliases atuais) e limpar aliases mortos das regras ESLint.

---

## 3. Plano de ação em fases

Cada fase fecha verde (`npm run lint` + `npm run test`) antes da próxima; um refactor por commit. Fases 1–4 são mecânicas; 5–7 pedem mais cuidado. Nenhuma fase toca algoritmo — sem impacto no hot path do EV optimizer (se alguma extração encostar em `damage-calc`/`cached-damage-calc`, rodar o benchmark de `history/performance` por garantia).

| Fase | Itens | Conteúdo | Risco |
|------|-------|----------|-------|
| 1 | 2.9 | Atualizar CLAUDE.md e `.claude/rules` para a estrutura real; remover aliases mortos do ESLint | zero |
| 2 | 2.1 | Mover `infrastructure/adapters` para o domínio (calc-bridge + repositório); reapontar `@adapters`; ESLint passa a proibir import ascendente residual | baixo (move-only + alias) |
| 3 | 2.2 | Reclassificar `infrastructure/data` → `src/domain/data` (alias `@data` mantido); escrever ADR 0003 registrando: reference data é camada base do domínio + exceção 2.8 | baixo (move-only + alias) |
| 4 | 2.5, 2.6 | Fechar a API pública do multicalc (barrel/regra p/ utils e raiz); mover shaping de `pokemon-table-data` para a feature de tabela | baixo |
| 5 | 2.3 | Extrair serialização pura (pokepaste parse, export de texto, mapper/migração de user data) para módulo próprio; app retém storage, resolver e modais; separar as 2 responsabilidades do `export-poke` | médio |
| 6 | 2.7 | Separar `available-items`: disponibilidade → domínio, flags → app; fechar item do ADR 0002 | baixo |
| 7 | 2.4 | Camada de aplicação por página. Piloto: **speed-calc** (menor, `SpeedCalc` já é quase serviço); depois simple-calc; multi-calc por último (maior, wiring desktop/mobile duplicado = maior ganho) | médio-alto, incremental |

### Decisões que precisam do dono antes de executar

1. **Fase 2**: destino físico dos adapters — pasta única `domain/adapters` (menor movimento) vs. split calc-bridge/repositório (mais expressivo)?
2. **Fase 3**: confirmar `src/domain/data` (elimina `src/infrastructure`) — ou manter pasta e só re-rotular via ADR?
3. **Fase 5**: módulo de serialização vive onde — `domain/multicalc/serialization` (formato pokepaste como conhecimento de domínio) ou camada própria fora do domínio?
4. **Fase 7**: application services moram em `src/app/pages/<page>/` (co-locados) ou numa pasta `src/app/application/`?

### Relação com outros trabalhos em andamento

- [BRANCH_REVIEW_NOTES.md](BRANCH_REVIEW_NOTES.md) (bugs da branch remove-sv) tem prioridade sobre qualquer fase deste plano.
- [CALC_REFACTOR_NOTES.md](CALC_REFACTOR_NOTES.md) (clean code interno do motor) é ortogonal — pode intercalar; só não misturar no mesmo commit.
- O agregado MultiCalc em discussão (dono do time + oponentes com cálculo como método) é a evolução natural **depois** da fase 7 — os application services criados aqui viram os call sites do agregado.
