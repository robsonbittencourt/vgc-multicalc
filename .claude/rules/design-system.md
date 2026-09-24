---

## alwaysApply: true

# Design System

Every visual value in a component stylesheet comes from a **design token** (a CSS custom property).
Components never invent their own spacing, radius, font size, shadow or color.
If no token fits, the design is wrong or a token is missing — add the token here first, then use it.

## Where the tokens live

| File                     | What it holds                                                                                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/themes.css`     | **Colors.** Theme-independent tokens on `body`, per-theme `--primary`/`--highlight`/`--highlight-border` on `.<name>-theme`. Light/dark via `light-dark()` |
| `src/app/styles.scss`    | **Dimensions** on `:root`: spacing, radius, font size, shadow, sprite size                                                                                 |
| `src/app/variables.scss` | SCSS-only base font size (`$font-size`, `$font-size-mobile`). Used by Material overrides and form controls, not by regular components                      |

## Why `em`

The body font size is responsive: `clamp(10px, 0.7vw, 14px)` on desktop, `14px` below 1280px (mobile/tablet).
Spacing and font-size tokens are in `em`, so every component scales with it. A `px` value does not scale and
breaks the proportion between text and whitespace across screen widths.

Tokens are **not** registered with `@property`, so an `em` token resolves against the element that uses it,
exactly like writing the literal value there.

## Spacing — `padding`, `margin`, `gap`

| Token         | Value   | Typical use                                   |
| ------------- | ------- | --------------------------------------------- |
| `--space-2xs` | 0.125em | Hairline gaps between tightly coupled items   |
| `--space-xs`  | 0.25em  | Label ↔ input, icon ↔ text, dense table cells |
| `--space-sm`  | 0.5em   | Default gap inside a control group            |
| `--space-md`  | 0.75em  | Gap between widgets, list items               |
| `--space-lg`  | 1em     | Widget padding, gap between sections          |
| `--space-xl`  | 1.5em   | Gap between large blocks                      |
| `--space-2xl` | 2em     | Page-level separation                         |
| `--space-3xl` | 3em     | Hero / empty-state breathing room             |

- `0` and `auto` stay literal.
- Negative margins (optical nudges) stay literal.
- Layout clearances that are not "spacing" (e.g. `padding-bottom: 6em` to clear the bottom nav) stay literal.
- Combining is fine: `padding: var(--space-sm) var(--space-md)`.

## Radius — `border-radius`

| Token            | Value | Use                                                     |
| ---------------- | ----- | ------------------------------------------------------- |
| `--radius-sm`    | 4px   | Inputs, buttons, chips, small badges                    |
| `--radius-md`    | 8px   | Cards, tabs, menus, popups                              |
| `--radius-lg`    | 12px  | Large cards, dialogs                                    |
| `--radius-xl`    | 16px  | Bottom sheets (`var(--radius-xl) var(--radius-xl) 0 0`) |
| `--radius-pill`  | 999px | Pill buttons, segmented toggles                         |
| `--radius-round` | 50%   | Circles (avatars, round icon buttons)                   |

Radius is in `px` on purpose: corners should not grow with the text.

## Typography — `font-size`

| Token               | Value                          | Use                                        |
| ------------------- | ------------------------------ | ------------------------------------------ |
| `--font-size-xs`    | 0.75em                         | Captions, chip labels, fine print          |
| `--font-size-sm`    | 0.875em                        | Secondary text, table meta                 |
| `--font-size-md`    | 1em                            | Body (usually just inherit — see below)    |
| `--font-size-lg`    | 1.125em                        | Emphasized values, mobile section titles   |
| `--font-size-xl`    | 1.25em                         | Sub-headings                               |
| `--font-size-2xl`   | 1.5em                          | Headings, large numbers                    |
| `--font-size-3xl`   | 1.75em                         | Display numbers, icon glyphs (`.mat-icon`) |
| `--font-size-title` | clamp(12px, 2vh, 18px)         | Widget / header titles                     |
| `--font-size-dense` | clamp(0.625em, 0.7vw, 0.875em) | Dense data grids (Type Calc tables)        |

- **Inherit by default.** Text that should look like body text declares no `font-size`.
- Form controls (`input`, `button`, `select`) do not inherit: use `font-size: inherit`, or `$font-size` / `$font-size-mobile` in the shared input components.
- `em` compounds: `--font-size-sm` inside `--font-size-sm` is 0.77em of the parent's parent. Put the size on the leaf.

## Elevation — `box-shadow`

| Token            | Use                                              |
| ---------------- | ------------------------------------------------ |
| `--shadow-xs`    | Resting widget/card (`app-widget` elevation)     |
| `--shadow-sm`    | Sticky headers, table headers, small floating UI |
| `--shadow-md`    | Tabs, drag previews, hover lift                  |
| `--shadow-lg`    | Dialogs, popovers, feature cards                 |
| `--shadow-sheet` | Bottom sheets (shadow cast upwards)              |

## Color

Always reference a token from `themes.css`. Never write `#hex`, `rgb()` or `rgba()` in a component.

**Surfaces & text**

| Token                  | Use                                         |
| ---------------------- | ------------------------------------------- |
| `--background`         | Page background                             |
| `--widget-background`  | Widget / card / panel background            |
| `--highlight`          | Selected / emphasized surface (theme color) |
| `--primary`            | Primary actions, active state (theme color) |
| `--text`               | Default text                                |
| `--text-muted`         | Secondary text, hints, captions             |
| `--text-strong`        | Maximum-contrast text                       |
| `--primary-contrast`   | Text on `--primary`                         |
| `--highlight-contrast` | Text on `--highlight`                       |
| `--surface-hover`      | Hover / header tint on top of any surface   |
| `--surface-stripe`     | Zebra rows, sub-rows                        |
| `--scrim`              | Backdrop behind overlays, sheets and popups |

**Lines**

| Token             | Use                                   |
| ----------------- | ------------------------------------- |
| `--widget-border` | Widget outline                        |
| `--border-subtle` | Dividers and outlines inside a widget |
| `--input-border`  | Custom input outlines (`app-input*`)  |
| `--grid-line`     | Table grid lines                      |
| `--table-border`  | Outer border of data tables           |

**Status**

| Token                                                       | Use                                                               |
| ----------------------------------------------------------- | ----------------------------------------------------------------- |
| `--positive-value` / `--negative-value` / `--neutral-value` | Text of good / bad / neutral numbers (stat boosts, damage deltas) |
| `--hp-reduced-value`                                        | HP that was manually lowered                                      |
| `--warning` + `--warning-surface`                           | Non-blocking warnings (duplicate item, unreleased Pokémon)        |
| `--error`                                                   | Validation errors, destructive badges                             |
| `--warn`                                                    | Destructive **buttons** (Material `.warn`)                        |

**Heat scale** (Type Calc coverage, insight chips). Fixed hues, tinted with `color-mix`:

```scss
background-color: color-mix(in srgb, var(--heat-good) 25%, transparent);
border-color: color-mix(in srgb, var(--heat-bad) 60%, transparent);
```

`--heat-good` (resist) → `--heat-mild` → `--heat-warn` → `--heat-bad` (weak), plus `--heat-immune`.
Use higher percentages for stronger intensity, never a new hue.

## Rules

1. **No literal values** for spacing, radius, font size, shadow or color in component stylesheets. Use a token.
2. **Never reference a variable that does not exist.** `var(--foo)` with an undefined `--foo` silently drops the whole declaration (a `border` disappears, a `color` falls back to inherited). Grep `themes.css` / `styles.scss` before using a name.
3. **No fallbacks** like `var(--error, #d32f2f)`. The fallback hides a missing token. Define the token instead.
4. **Round to the scale.** Designs that ask for 0.3em or 10px take the nearest token. Do not add a token for one element.
5. **New token = new role**, not a new value. Name it by what it is for (`--grid-line`), not how it looks (`--gray-20`). Add it to the right file and to this document in the same change.
6. **Theme-dependent colors** go on `body` in `themes.css` using `light-dark(<light>, <dark>)`. Only `--primary`, `--highlight`, `--highlight-border` vary per theme class.

## Shared components

Before building a UI piece, check `src/app/shared/`. If the pattern exists there, use it; if a pattern is copied
into a second component, extract it to `shared/` instead of pasting it again.

| Pattern                            | Use                                                                                                                          |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Card / panel with a title          | `<app-widget [title]>`                                                                                                       |
| Mobile screen skeleton             | `<app-mobile-calc-shell>` (see `general.md` → Mobile Screens)                                                                |
| Bottom-sheet menu of actions       | `<app-action-sheet [title] (closed)>` with `<app-action-sheet-item icon [hint] [dataCy] danger disabled (pressed)>` children |
| Text / select / autocomplete input | `<app-input>`, `<app-input-select>`, `<app-input-autocomplete>`                                                              |
| Pokémon name search                | `<app-pokemon-search-input>`                                                                                                 |
| Copy-to-clipboard                  | `<app-copy-button [value]>`                                                                                                  |
| Pick one of 2–3 modes              | `<app-segmented-control [options] [(value)]>` — see Choice controls below                                                    |

`app-action-sheet` example (render it under an `@if`, or attach it through a CDK overlay):

```html
@if (menuOpen()) {
<app-action-sheet title="Dragonite" (closed)="closeMenu()">
  <app-action-sheet-item icon="content_copy" dataCy="duplicate-x" [disabled]="!canDuplicate()" [hint]="canDuplicate() ? undefined : 'Team is full'" (pressed)="duplicate()">Duplicate</app-action-sheet-item>
  <app-action-sheet-item icon="delete" danger dataCy="delete-x" (pressed)="delete()">Delete</app-action-sheet-item>
</app-action-sheet>
}
```

The item renders a native `<button>` carrying `data-cy` and `disabled`, so Cypress assertions (`be.disabled`) target it directly.

## Choice controls

Three controls, one role each. Never use one in another's role, and never give the same setting a different control on desktop and mobile.

| Control                        | Role                                                                   | Examples                                  |
| ------------------------------ | ---------------------------------------------------------------------- | ----------------------------------------- |
| `app-segmented-control` (pill) | Switch between 2–3 **modes** that change what the screen or form means | SP/EV, Survive/KO, Champions/National Dex |
| `mat-button-toggle-group`      | Dense **grids** of options (field conditions, roll level, hit count)   | Field widget, Roll Level, multi-hit       |
| `mat-slide-toggle`             | A single **on/off** flag                                               | Order by Damage, Best Move, all abilities |

```html
<app-segmented-control ariaLabel="Stat point unit" data-cy="sps-evs-toggle" [options]="pointsModeOptions" [value]="store.useSpsMode()" (valueChange)="setSpsMode($event)" />
```

```ts
readonly pointsModeOptions: SegmentedOption<boolean>[] = [
  { value: true, label: "SP", dataCy: "points-mode-sp" },
  { value: false, label: "EV", dataCy: "points-mode-ev" }
]
```

- Each option button carries its `dataCy`, the `selected` class and `aria-pressed`. Put the group `data-cy` on the host.
- `surface="widget"` when the control sits directly on the page background (the default track is `--background`, invisible there).
- `dense` shrinks the option padding for tight rows (e.g. next to a button on mobile).
- A width-reserving copy (layout spacer) takes `inert` and options **without** `dataCy`, or Cypress finds two matches.
- `valueChange` fires only when the value actually changes.

## Allowed exceptions

- `px` for hairlines: `1px` / `2px` borders and 1–2px internal nudges in the shared inputs.
- `px` for icon glyph sizes (`.material-icons`, `mat-icon` overrides).
- `16px` on text inputs that must not trigger iOS zoom.
- `rem` in the `how-to-use` pages (content pages sized on the root font).
- Text-outline shadows on type badges (`type-combo-box`) and Material override maps in `styles.scss`.

## Known debt (not yet on tokens)

Converting these changes rendered size across viewport widths, so they need visual validation first:

- `px`/`rem` font sizes in desktop components: `field` (16px), `roll-config` (16px), `team-list-modal` (12px), `header` (1rem), `teams-desktop` (0.9rem), `speed-box` (rem), `team-probability` (rem), `nature-combo-box` / `pokemon-build-mobile` type badge (1rem — renders at 10px on mobile).
- Two input outline colors: Material form fields use `#a0a0a3` (`styles.scss`), custom inputs use `--input-border`.
- Material button-toggle selected background is fixed `#dfdfe2` in both light and dark mode.
- One-offs: `donut-graphic` track `#e6e6e6`, `not-found-page` border, `form-toggle-button` white overlays, `hp-badge` drop shadow.
