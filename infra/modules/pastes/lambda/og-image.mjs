import { escapeHtml } from "./core.mjs"

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

const COLUMNS = 3
const PADDING = 24
const GAP = 16
const HEADER_TOP = 14
const HEADER_HEIGHT = 36
const BRAND_ICON_SIZE = 36
const CARDS_TOP = HEADER_TOP + HEADER_HEIGHT + 14
const CARD_WIDTH = (OG_WIDTH - PADDING * 2 - GAP * (COLUMNS - 1)) / COLUMNS
const CARD_HEIGHT = (OG_HEIGHT - CARDS_TOP - PADDING - GAP) / 2
const INNER = 14
const SPRITE_SIZE = 116
const ITEM_SIZE = 44
const MOVE_ICON_SIZE = 22
const MOVE_LINE = 26
const CHAR_WIDTH_RATIO = 0.56

const COLORS = {
  background: "#15151f",
  card: "#23233a",
  spriteBox: "#2f2f4d",
  accent: "#6d6dc0",
  itemBadge: "#f2f2f7",
  text: "#ffffff",
  muted: "#b9b9d3",
  placeholder: "#3a3a5c"
}

export function buildOgSvg(sets, assets) {
  const cards = sets.slice(0, 6).map((set, index) => card(set, index, assets))

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">`,
    `<rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="${COLORS.background}"/>`,
    header(assets.brand()),
    ...cards,
    "</svg>"
  ].join("")
}

function header(brand) {
  const textX = brand ? PADDING + BRAND_ICON_SIZE + 12 : PADDING

  const label = `<text x="${OG_WIDTH - PADDING}" y="${HEADER_TOP + 27}" text-anchor="end" font-family="Outfit" font-size="24" font-weight="500" fill="${COLORS.muted}">Paste</text>`

  return (brand ? image(brand, PADDING, HEADER_TOP, BRAND_ICON_SIZE) : "") + text("VGC Multi Calc", textX, HEADER_TOP + 28, 28, 700, COLORS.text, OG_WIDTH - PADDING - textX) + label
}

function card(set, index, assets) {
  const x = PADDING + (index % COLUMNS) * (CARD_WIDTH + GAP)
  const y = CARDS_TOP + Math.floor(index / COLUMNS) * (CARD_HEIGHT + GAP)
  const spriteX = x + INNER
  const spriteY = y + INNER
  const textX = spriteX + SPRITE_SIZE + INNER
  const textWidth = x + CARD_WIDTH - INNER - textX
  const sprite = assets.sprite(set.species)
  const item = set.item ? assets.item(set.item) : null

  return [
    `<rect x="${x}" y="${y}" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" rx="16" fill="${COLORS.card}"/>`,
    `<rect x="${x + INNER}" y="${y}" width="${CARD_WIDTH - INNER * 2}" height="4" rx="2" fill="${COLORS.accent}"/>`,
    `<rect x="${spriteX}" y="${spriteY}" width="${SPRITE_SIZE}" height="${SPRITE_SIZE}" rx="12" fill="${COLORS.spriteBox}"/>`,
    sprite ? image(sprite, spriteX, spriteY, SPRITE_SIZE) : "",
    item ? itemBadge(item, spriteX + SPRITE_SIZE - ITEM_SIZE + 8, spriteY + SPRITE_SIZE - ITEM_SIZE + 8) : "",
    text(set.species, textX, spriteY + 36, 30, 700, COLORS.text, textWidth),
    set.item ? text(set.item, textX, spriteY + 70, 22, 500, COLORS.muted, textWidth) : "",
    set.ability ? text(set.ability, textX, spriteY + 100, 22, 500, COLORS.muted, textWidth) : "",
    ...set.moves.map((move, line) => moveLine(move, x + INNER, spriteY + SPRITE_SIZE + 12 + line * MOVE_LINE, CARD_WIDTH - INNER * 2, assets))
  ].join("")
}

function itemBadge(href, x, y) {
  const radius = ITEM_SIZE / 2

  return `<circle cx="${x + radius}" cy="${y + radius}" r="${radius}" fill="${COLORS.itemBadge}"/>${image(href, x + 4, y + 4, ITEM_SIZE - 8)}`
}

function moveLine(move, x, y, width, assets) {
  const icon = assets.moveTypeIcon(move)
  const iconMarkup = icon ? image(icon, x, y, MOVE_ICON_SIZE) : `<rect x="${x}" y="${y}" width="${MOVE_ICON_SIZE}" height="${MOVE_ICON_SIZE}" rx="4" fill="${COLORS.placeholder}"/>`
  const textX = x + MOVE_ICON_SIZE + 10

  return iconMarkup + text(move, textX, y + 18, 22, 500, COLORS.text, x + width - textX)
}

function image(href, x, y, size) {
  return `<image href="${href}" x="${x}" y="${y}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet"/>`
}

function text(value, x, y, size, weight, color, maxWidth) {
  const estimated = value.length * size * CHAR_WIDTH_RATIO
  const fit = estimated > maxWidth ? ` textLength="${maxWidth}" lengthAdjust="spacingAndGlyphs"` : ""

  return `<text x="${x}" y="${y}" font-family="Outfit" font-size="${size}" font-weight="${weight}" fill="${color}"${fit}>${escapeHtml(value)}</text>`
}
