# Análise de SEO — VGC Multi Calc

Análise estática do código (sem execução de audits). Data: 2026-07-19.

## Resumo executivo

A base de SEO do projeto é madura — muito acima do típico para uma SPA Angular: prerender (SSG) por rota, title/description/canonical/OG únicos por página, JSON-LD, robots.txt, sitemap e noindex nos lugares certos. O problema central é outro e é grave: **o HTML que os crawlers enxergam não contém nenhum link interno `<a href>`**. O prerender roda sem `window`, então todas as páginas são geradas com o layout mobile, cuja navegação é feita por `<button (click)>` + `router.navigate()`. Como o Googlebot smartphone também renderiza com viewport mobile, nem depois do JS existem links. A descoberta de páginas depende 100% do sitemap — e as 10 subpáginas de `/how-to-use` nem estão nele: são páginas órfãs.

## O que já está bem (não mexer)

- Prerender SSG configurado ([angular.json](angular.json) + [prerender-routes.txt](prerender-routes.txt)); todas as rotas principais e as subpáginas de how-to-use saem como HTML estático no `dist/browser`.
- Title, meta description, canonical, OG e Twitter cards **únicos por rota** (ex.: [one-vs-one-route.component.ts](src/app/routes/one-vs-one-route.component.ts), [how-to-use-subpage-seo.ts](src/app/pages/how-to-use/how-to-use-subpage/how-to-use-subpage-seo.ts)).
- JSON-LD: `WebSite` + `SoftwareApplication` no [index.html](src/app/index.html), `BreadcrumbList` por rota via [json-ld.service.ts](src/app/services/json-ld.service.ts).
- [robots.txt](src/app/robots.txt) liberando tudo + referência ao sitemap; Search Console verificado (`google-site-verification`).
- `noindex, follow` na página 404 e em `/data/:userDataId` (conteúdo de usuário) — correto.
- Fallback SPA no GitHub Pages via `404.html` copiado do `/404` prerenderizado (com noindex) — correto para 404s reais.
- Sitemap com `lastmod` automatizado no build ([scripts/update-sitemap.mjs](scripts/update-sitemap.mjs)).
- Imagens com `width`/`height`, `loading="lazy"` e `alt` na maioria dos casos; fonte crítica com `preload`; PWA manifest e theme-color.

---

## Achados

### 🔴 1. Zero links internos crawláveis em todo o site

**Evidência:** no `dist/browser/index.html` prerenderizado, os únicos `href` internos são `href="/"`. Nenhum `href="/one-vs-one"`, `/speed-calc`, etc.

**Causa em cadeia:**

1. [device-detector.service.ts](src/app/services/device-detector.service.ts) retorna `isDesktop() === false` quando `window === undefined` → o prerender gera o **layout mobile** para todas as páginas.
2. O menu mobile ([header-mobile.component.html](src/app/layout/header-mobile/header-mobile.component.html)) usa `<button (click)="enableX()">` + `router.navigate()` — sem `<a>`. Além disso o painel só existe no DOM quando `menuOpen()` é true, ou seja, nunca no HTML prerenderizado.
3. O hub [how-to-use.component.html](src/app/pages/how-to-use/how-to-use.component.html) usa `routerLink` em `<mat-card>` — `routerLink` fora de `<a>`/`<area>` não gera atributo `href`, só handler de clique.

**Impacto:** crawlers não conseguem navegar o site por links; PageRank interno não flui; as subpáginas de how-to-use ficam órfãs (ver achado 2). O header desktop ([header.component.html](src/app/layout/header/header.component.html)) já usa `<a routerLink>` corretamente, mas nunca aparece no HTML servido.

**Correções propostas (nesta ordem):**

- **Hub how-to-use:** trocar `<mat-card routerLink="...">` por `<a [routerLink]="...">` envolvendo o card (ou `mat-card` dentro de `<a>`), estilizando para remover sublinhado/cor. Ganho imediato: 10 páginas deixam de ser órfãs.
- **Menu mobile:** trocar os `<button class="menu-item-button">` por `<a routerLink>` com a mesma aparência, mantendo os handlers de feedback (`(click)` continua funcionando em `<a>`). Navegação por link real também melhora acessibilidade e "abrir em nova aba".
- **Garantia no prerender:** avaliar renderizar o header desktop no servidor (ex.: `isDesktop()` default true quando `window === undefined`) **ou** adicionar um `<nav>`/footer com os links principais presente nos dois layouts. Um footer simples com links para as 7 páginas + how-to-use resolve sem tocar na lógica de device.

### 🔴 2. Subpáginas de /how-to-use fora do sitemap (páginas órfãs)

O [sitemap.xml](src/app/sitemap.xml) tem 8 URLs; `dist/browser/how-to-use/` contém 10 subpáginas prerenderizadas com title/canonical próprios (`video`, `one-vs-one`, `team-vs-many`, `many-vs-team`, `import-data`, `export-data`, `ev-optimization`, `speed-calc`, `probability-calc`, `type-calc`). Combinado com o achado 1, essas páginas são invisíveis para o Google hoje — e são justamente as páginas com mais texto indexável do site.

**Correção:** adicionar as 10 URLs ao sitemap (prioridade ~0.5) e as entradas correspondentes em [update-sitemap.mjs](scripts/update-sitemap.mjs). Opcional: listá-las também em [prerender-routes.txt](prerender-routes.txt) para não depender do route discovery implícito.

### 🟡 3. `<h1>` idêntico em todas as páginas

Os dois headers ([header.component.html](src/app/layout/header/header.component.html), [header-mobile.component.html](src/app/layout/header-mobile/header-mobile.component.html)) trazem `<h1 class="title">VGC Multi Calc</h1>`. Todas as páginas compartilham o mesmo h1 genérico, desalinhado do title/keyword de cada rota.

**Correção:** rebaixar o nome do site para `<p>`/`<div>` estilizado e dar a cada página um `<h1>` próprio (pode ser visualmente discreto ou `visually-hidden` nas telas de ferramenta): "Pokémon Damage Calculator — One vs One", "Pokémon Speed Calculator", etc. As páginas de how-to-use já têm conteúdo textual e são as candidatas mais naturais a h1 visível.

### 🟡 4. Conteúdo textual fino nas páginas de ferramenta

O body prerenderizado da home tem ~155 palavras, todas de UI (labels, botões, stats). Não há texto descritivo indexável explicando o que a ferramenta faz — o Google só vê isso na meta description, que não é conteúdo.

**Correção:** adicionar em cada página de ferramenta uma seção curta de conteúdo real (1–2 parágrafos abaixo da dobra ou em um bloco expansível: o que a calculadora faz, para quem, diferenciais — multi-target, EV optimization, Champions). Importante: precisa estar no DOM do HTML servido (não atrás de clique). Isso também cria onde ancorar o h1 do achado 3.

### 🟡 5. Script do sitemap com paths mortos

[update-sitemap.mjs](scripts/update-sitemap.mjs) referencia `src/app/core/main` e `src/index.html`, que não existem mais (hoje é `src/app/layout` e `src/app/index.html`). O `git log` ignora paths inexistentes quando há outro válido na lista, então o `lastmod` sai de apenas parte das fontes reais — mudanças no layout/shell não atualizam mais o lastmod.

**Correção:** atualizar os paths para a estrutura atual e incluir as novas entradas de how-to-use (achado 2).

### 🟡 6. og:image quadrada 512×512 com `summary_large_image`

Todas as rotas usam `assets/icons/calc-512x512.png` (ícone quadrado) como og/twitter image, mas declaram `twitter:card = summary_large_image`, que espera ~2:1 (recomendado 1200×630). Compartilhamentos em redes sociais saem com corte/moldura ruim.

**Correção:** criar uma imagem social 1200×630 (screenshot estilizado da calculadora + logo) e usá-la como og:image/twitter:image em todas as rotas. Opcional: uma variação por seção (calc, speed, type). Adicionar também `og:site_name` e `og:image:width`/`og:image:height`.

### 🟢 7. Consistência de trailing slash

GitHub Pages serve rotas prerenderizadas como diretórios e redireciona `/one-vs-one` → `/one-vs-one/` (301). Canonical e sitemap apontam para a versão **sem** barra. O Google consolida via canonical, então não é erro, mas toda entrada do sitemap passa por um redirect.

**Correção (baixo custo):** decidir a forma canônica e alinhar canonical + sitemap + og:url com o que o servidor efetivamente responde 200 (provavelmente a versão com barra). Vale confirmar com `curl -I` nas URLs de produção antes de mudar.

### 🟢 8. Viewport bloqueia zoom

`maximum-scale=1.0, user-scalable=0` no [index.html](src/app/index.html) é penalizado em auditorias de acessibilidade (que influenciam a percepção de qualidade da página). Se o bloqueio de zoom não for requisito de UX do app, remover as duas restrições.

### 🟢 9. Detalhes menores

- `og:locale` e `og:site_name` ausentes no [index.html](src/app/index.html) e nas rotas.
- Âncora com `href=""` vazio no HTML prerenderizado (o link "Link" de user data no header) — envolver com `@if` para não renderizar sem URL.
- Auditar `alt` nas imagens restantes (a maioria já tem; sprites usam `[alt]="name()"` corretamente).
- `SoftwareApplication` no JSON-LD poderia ganhar `aggregateRating` apenas se houver fonte real de reviews — não inventar.

---

## Plano de ação sugerido

### Fase 1 — Descoberta e crawlabilidade (maior impacto, ~1 dia)

1. Trocar `mat-card routerLink` por `<a routerLink>` no hub how-to-use (achado 1).
2. Trocar buttons do menu mobile por `<a routerLink>` estilizados (achado 1).
3. Adicionar as 10 subpáginas de how-to-use ao sitemap + script de lastmod (achados 2 e 5).
4. Decidir estratégia para links no HTML prerenderizado: header desktop no SSR **ou** footer de links compartilhado (achado 1).
5. Validar: `grep 'href="/' dist/browser/index.html` após build deve listar todas as rotas.

### Fase 2 — Relevância on-page (~1–2 dias)

6. h1 único por página; site name deixa de ser h1 (achado 3).
7. Bloco de texto descritivo indexável por página de ferramenta (achado 4).

### Fase 3 — Social e polimento (~meio dia)

8. Imagem social 1200×630 + `og:site_name`/`og:locale` (achados 6 e 9).
9. Verificar trailing slash em produção e alinhar canonical/sitemap (achado 7).
10. Remover bloqueio de zoom do viewport, se aceitável para UX (achado 8).

### Pós-deploy (validação, sem código)

- Search Console: submeter sitemap atualizado e inspecionar 2–3 subpáginas de how-to-use (antes órfãs) para confirmar indexação.
- Conferir cobertura: as 18 URLs (8 atuais + 10 how-to-use) indexadas, `/data/*` e `/404` fora do índice.
