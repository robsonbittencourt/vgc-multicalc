import { escapeHtml } from "./core.mjs"

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

const COLUMNS = 3
const PADDING = 24
const BOTTOM_SAFE_AREA = 84
const GAP = 16
const HEADER_TOP = 14
const HEADER_HEIGHT = 36
const BRAND_ICON_SIZE = 36
const CARDS_TOP = HEADER_TOP + HEADER_HEIGHT + 14
const CARD_WIDTH = (OG_WIDTH - PADDING * 2 - GAP * (COLUMNS - 1)) / COLUMNS
const CARD_HEIGHT = (OG_HEIGHT - CARDS_TOP - BOTTOM_SAFE_AREA - GAP) / 2
const INNER = 14
const CONTENT_TOP = 1
const SPRITE_SIZE = 100
const MOVES_GAP = 20
const ITEM_BADGE_SIZE = 32
const ITEM_ICON_SIZE = 24
const MEGA_STONE_ICON_SIZE = 30
const ITEM_BADGE_GAP = 8
const MOVE_ICON_SIZE = 22
const MOVE_LINE = 26

const COLORS = {
  background: "#121212",
  card: "#45445f",
  itemBadge: "#f2f2f7",
  text: "#ffffff",
  placeholder: "#35344c"
}

export function buildOgSvg(sets, assets, measure) {
  const text = textWith(measure)
  const cards = sets.slice(0, 6).map((set, index) => card(set, index, assets, text))

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">`,
    `<rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="${COLORS.background}"/>`,
    header(assets.brand(), text),
    ...cards,
    "</svg>"
  ].join("")
}

function header(brand, text) {
  const textX = brand ? PADDING + BRAND_ICON_SIZE + 12 : PADDING

  const label = `<text x="${OG_WIDTH - PADDING}" y="${HEADER_TOP + 27}" text-anchor="end" font-family="Roboto" font-size="24" font-weight="500" fill="${COLORS.text}">Paste</text>`

  return (brand ? image(brand, PADDING, HEADER_TOP, BRAND_ICON_SIZE) : "") + text("VGC Multi Calc", textX, HEADER_TOP + 28, 28, 700, OG_WIDTH - PADDING - textX).markup + label
}

function card(set, index, assets, text) {
  const x = PADDING + (index % COLUMNS) * (CARD_WIDTH + GAP)
  const y = CARDS_TOP + Math.floor(index / COLUMNS) * (CARD_HEIGHT + GAP)
  const spriteX = x + INNER
  const spriteY = y + CONTENT_TOP
  const textX = spriteX + SPRITE_SIZE + INNER
  const textWidth = x + CARD_WIDTH - INNER - textX
  const sprite = assets.sprite(set.species)

  return [
    `<rect x="${x}" y="${y}" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="${COLORS.card}"/>`,
    sprite ? image(sprite, spriteX, spriteY, SPRITE_SIZE) : "",
    text(set.species, textX, spriteY + 36, 30, 700, textWidth).markup,
    set.item ? itemLine(set.item, assets, textX, spriteY + 70, textWidth, text) : "",
    set.ability ? text(set.ability, textX, spriteY + 100, 22, 500, textWidth).markup : "",
    ...set.moves.map((move, line) => moveLine(move, x + INNER, spriteY + SPRITE_SIZE + MOVES_GAP + line * MOVE_LINE, CARD_WIDTH - INNER * 2, assets, text))
  ].join("")
}

function itemLine(name, assets, x, y, width, text) {
  const icon = assets.item(name)

  if (!icon) return text(name, x, y, 22, 500, width).markup

  const label = text(name, x, y, 22, 500, width - ITEM_BADGE_SIZE - ITEM_BADGE_GAP)

  return label.markup + itemBadge(icon, assets.isMegaStone(name), x + label.width + ITEM_BADGE_GAP, y - 8)
}

function itemBadge(href, megaStone, x, centerY) {
  const radius = ITEM_BADGE_SIZE / 2
  const iconSize = megaStone ? MEGA_STONE_ICON_SIZE : ITEM_ICON_SIZE
  const centerX = x + radius

  return `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="${COLORS.itemBadge}"/>${image(href, centerX - iconSize / 2, centerY - iconSize / 2, iconSize)}`
}

function moveLine(move, x, y, width, assets, text) {
  const icon = assets.moveTypeIcon(move)
  const iconMarkup = icon ? image(icon, x, y, MOVE_ICON_SIZE) : `<rect x="${x}" y="${y}" width="${MOVE_ICON_SIZE}" height="${MOVE_ICON_SIZE}" rx="4" fill="${COLORS.placeholder}"/>`
  const textX = x + MOVE_ICON_SIZE + 10

  return iconMarkup + text(move, textX, y + 18, 22, 500, x + width - textX).markup
}

function image(href, x, y, size) {
  return `<image href="${href}" x="${x}" y="${y}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet"/>`
}

function textWith(measure) {
  return (value, x, y, size, weight, maxWidth) => {
    const measured = measure(value, size, weight)
    const fit = measured > maxWidth ? ` textLength="${maxWidth}" lengthAdjust="spacingAndGlyphs"` : ""

    return {
      width: Math.min(measured, maxWidth),
      markup: `<text x="${x}" y="${y}" font-family="Roboto" font-size="${size}" font-weight="${weight}" fill="${COLORS.text}"${fit}>${escapeHtml(value)}</text>`
    }
  }
}
