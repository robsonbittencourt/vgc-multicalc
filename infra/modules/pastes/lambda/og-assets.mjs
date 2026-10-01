import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

const SPRITE_FILE_OVERRIDES = { "Type: Null": "Type-Null", Aegislash: "Aegislash-Shield" }

export function toId(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "")
}

export function fileAssets(dir) {
  const moveTypes = JSON.parse(readFileSync(join(dir, "moves.json"), "utf8"))
  const itemSprites = JSON.parse(readFileSync(join(dir, "items.json"), "utf8"))
  const spriteFiles = new Set(readdirSync(join(dir, "sprites")))
  const cache = new Map()

  const png = path => {
    if (!cache.has(path)) {
      try {
        cache.set(path, `data:image/png;base64,${readFileSync(join(dir, path)).toString("base64")}`)
      } catch {
        cache.set(path, null)
      }
    }

    return cache.get(path)
  }

  const spriteFile = species => `${SPRITE_FILE_OVERRIDES[species] ?? species}.png`
  const hasSprite = species => spriteFiles.has(spriteFile(species))

  return {
    brand: () => png("brand.png"),
    hasSprite,
    sprite: species => (hasSprite(species) ? png(`sprites/${spriteFile(species)}`) : null),
    item: name => (itemSprites[toId(name)] ? png(`items/${itemSprites[toId(name)]}.png`) : null),
    moveTypeIcon: move => (moveTypes[toId(move)] ? png(`types/${moveTypes[toId(move)]}.png`) : null)
  }
}
