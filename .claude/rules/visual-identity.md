---
paths:
  - "src/**/*.scss"
  - "src/**/*.css"
  - "src/**/*.html"
---

# Visual Identity

The look of this site was built by hand, screen by screen, before any AI help. `design-system.md` says **which values** a stylesheet may use.
This document says **which character** a screen must have. Both apply: a screen can use only tokens and still be off-identity.

The counter-example is the Paste feature (2026-09): fully token-compliant, yet it reads as a generic SaaS page. That generic look (dark canvas, hairlines,
tinted chips, gray tiers, uppercase micro-labels, monospace numbers, explanatory copy) is the statistical average of "modern web" and is what an
assistant produces when nothing pulls it elsewhere. This document is the pull.

## The test

> **Would this element exist in the game's UI or in Showdown?**

If it does, it belongs. If it looks like an analytics dashboard, a settings page or a landing page, it does not.

## What the identity is

1. **Decoration comes from Pokémon, not from web UI.** The signature pieces are quotes of the games:
   - the HP nameplate of `pokemon-card` (italic bold name, colored HP bar, item icon in the corner) and the `vs-icon`;
   - type badges of `type-combo-box`: solid rectangles, uppercase type name, fixed `--type-*` hue;
   - large sprites placed directly on the surface, never boxed in a tile;
   - team tabs made of sprites;
   - the slanted type segment of the move chips (`damage-result`).

   New decoration must come from the same source: game menus, battle UI, Showdown.

2. **Emphasis is a solid color block.** The editing area, a selected team, a highlighted row are `--highlight` surfaces. Hierarchy is built with
   blocks and bold labels, not with lines, tints or shadows.

3. **Square shapes.** Widgets have no radius. Buttons are rectangles (`--radius-sm`). Option grids (`mat-button-toggle-group`) have full borders,
   like the Field widget and Roll Level.

4. **Color always means something, and it is saturated.** `--primary` buttons are actions, `--warn` is destructive, `--positive-value` /
   `--negative-value` are good / bad numbers, HP bars go green → yellow → red. Color is never a decorative accent.

5. **Dense and full width.** Everything the user needs is visible at once. Widgets fill their columns. Desktop screens never collapse into a
   narrow centered column; only reading pages (How to use, FAQ) do.

6. **Raw text.** Labels are short nouns in Title Case: "Roll Level", "Remaining", "Nature". Buttons are a verb, or a verb and a noun: "Import",
   "Clear SPs", "Add Meta", "Delete all". The controls explain themselves.

7. **One type family.** Roboto everywhere, bold for titles and labels. The only exception is the Showdown text area, which may be monospace.

Light and dark themes share the same identity. Only the color values change.

## Defaults to avoid

These are the patterns an assistant reaches for by default. Each one needs an explicit request from the user before it appears.

| Pattern                                                                                     | Do instead                                                                      |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Accent stripe on a card or callout (`border-top` / `border-left` of 2–4px, a colored rail)  | A `--highlight` block, or nothing. A warning is a `--warning-surface` block     |
| Tinted surfaces (`color-mix` as background of panels and chips)                             | Solid `--highlight`. `color-mix` stays in the heat scale and theme-color shades |
| Hierarchy by gray tiers (`--text-muted`, opacity) and hairlines between rows in a card      | Bold label + value, grouped by blocks and spacing                               |
| Sprite inside a rounded tile with an overlapping round badge                                | Sprite free on the surface, item icon beside it                                 |
| Settings list: bold title, helper sentence below, control on the right, hairline between    | Label and control inline or stacked, as in the build widget ("Name [ ]")        |
| Page title followed by an explanatory paragraph; helper sentence under each field           | Title only                                                                      |
| Narrow centered column on desktop                                                           | The widget layout of the calc screens                                           |
| Uppercase letter-spaced micro-labels                                                        | Title Case labels. Uppercase belongs only to type badges                        |
| Monospace for numbers or metadata                                                           | Roboto                                                                          |
| Stat tiles (big number + tiny caption), thin progress bars, dot bullets, delta chips (▲ +4) | Values in the existing table, nameplate or list styles                          |
| Pill-shaped buttons                                                                         | Rectangles. Pills are only the move chips and `app-segmented-control`           |
| Cards inside cards, each with its own 1px border                                            | One surface level                                                               |
| Glow, blur, decorative gradients and transitions                                            | Only what quotes the game (HP bar, nameplate, mega glow)                        |
| Celebratory states with large icons ("✓ Your link is ready")                                | Show the result in place: the link and its copy button                          |
| `·`, `→`, `—` as separators in UI text                                                      | Commas, "vs", plain words                                                       |

## Voice

Text follows the same rule as the visuals: plain and specific, never marketing.

- **No helper text by default.** Add one short sentence only when the user asks, or when a mistake would lose data ("A lost password cannot be recovered").
- **Announcements** state what changed and where to find it, in short factual sentences. Never "Introducing…", "Welcome to…", "Best of all", "seamless",
  "clean", "with a single click", lists of three adjectives or em dashes.
- **Errors and empty states** say what happened and what to do, in one line.

## Canonical screens

Every new screen derives from one of these. Name it before building, and reuse its components.

| Screen                 | What to take from it                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| Team vs Many (desktop) | Build widget (purple block, inline labels, stat grid), Teams tiles, Field grid, opponent cards with nameplate |
| One vs One (desktop)   | Nameplates, move chips with damage, rolls line, calc description                                              |
| Speed Calc (desktop)   | Sprite list with values under each sprite                                                                     |
| Team vs Many (mobile)  | Sprite tab strip, purple block, bottom nav                                                                    |
| Team List modal        | Forms: labels above inputs on the widget surface, rectangular action buttons                                  |

## Workflow

1. Before writing UI, state the canonical screen it derives from and which signatures it carries (nameplate, type badges, purple block, sprites).
2. Reuse what exists before creating: `app-widget`, `type-combo-box`, the `pokemon-card` nameplate, `mat-button-toggle-group` grids.
3. Compare the result side by side with the canonical screen, at 1920px and at 412px.
4. Grep the changed files. Every hit needs a reason, or it goes:

```bash
grep -nE "border-(left|top): *[0-9.]+(px|em) solid|color-mix|letter-spacing|text-transform|monospace|radius-pill|text-muted|opacity: *0\.|·|→|—" <changed files>
```
