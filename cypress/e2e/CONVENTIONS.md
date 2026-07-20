# Convenção — Cypress E2E (estratégia pós-hexagonal)

Ver plano completo em `history/test-strategy/PLAN.md`.

## Estrutura (híbrida)

```
cypress/e2e/
  simple-calc/      # por tela (eixo primário)
  multi-calc/
  probability-calc/
  speed-calc/
  type-calc/
  features/         # fluxos transversais (import, export, custom-sets, field, regulation)
  history/          # CONGELADO — specs antigos, rede de segurança, nunca tocar
```

- **Por tela**: cada rota tem sua pasta. Dentro dela, um spec por perfil quando
  o comportamento diverge: `desktop.cy.ts` e `mobile.cy.ts`. Se um único spec
  cobre ambos, um arquivo só.
- **Por feature** (`features/`): fluxos que cruzam telas (import/export, custom
  sets, field options, troca de regulation/modo).

## O que testar aqui (e o que NÃO)

- **SIM:** comportamento da UI — estados vazios, toggles, seleção, filtros,
  ordenação, badges, modais, overlays mobile, navegação.
- **NÃO:** variação de regra que muda o número do cálculo (abilities, items,
  mecânicas). Isso é unit test de domínio (`src/domain/**`).

Regra de ouro: *muda o número → domínio (unit); muda o que aparece/interação → UI (Cypress).*

## Padrões

- Acesso à tela sempre via **page object** (`@page-object/*`). Nada de `cy.get`
  direto no spec.
- Seletores por `data-cy`.
- `history/` é imutável. Não editar, não mover, não apagar.
