import { copyFileSync, mkdirSync, readdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import sharp from "sharp"
import { ITEM_DETAILS } from "@data/item-data"
import { MOVES } from "@data/move-data"

const OUT_DIR = "infra/modules/pastes/lambda/og-assets"
const SPRITES_DIR = "src/app/assets/sprites"
const POKEMON_SIZE = 160
const ITEM_SIZE = 64

const toId = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "")

main()

async function main() {
  for (const dir of ["sprites", "items", "types"]) {
    mkdirSync(join(OUT_DIR, dir), { recursive: true })
  }

  const moveTypes = Object.fromEntries(Object.values(MOVES).map(move => [toId(move.name), move.type.toLowerCase()]))
  writeFileSync(join(OUT_DIR, "moves.json"), JSON.stringify(moveTypes))

  const itemSprites = Object.fromEntries(Object.values(ITEM_DETAILS).map(item => [toId(item.name), item.sprite]))
  writeFileSync(join(OUT_DIR, "items.json"), JSON.stringify(itemSprites))

  const megaStones = Object.values(ITEM_DETAILS)
    .filter(item => item.isMegaStone)
    .map(item => toId(item.name))
  writeFileSync(join(OUT_DIR, "mega-stones.json"), JSON.stringify(megaStones))

  console.log(`moves: ${Object.keys(moveTypes).length}, items: ${Object.keys(itemSprites).length}, mega stones: ${megaStones.length}`)

  await convertAll("pokemon-home", "sprites", POKEMON_SIZE)
  await convertAll("items", "items", ITEM_SIZE)

  copyFileSync("src/app/assets/icons/calc-72x72.png", join(OUT_DIR, "brand.png"))

  for (const file of readdirSync(join(SPRITES_DIR, "types"))) {
    copyFileSync(join(SPRITES_DIR, "types", file), join(OUT_DIR, "types", file))
  }

  console.log(`done: ${OUT_DIR}`)
}

async function convertAll(source: string, target: string, size: number) {
  const files = readdirSync(join(SPRITES_DIR, source)).filter(file => file.endsWith(".webp"))

  for (const [index, file] of files.entries()) {
    await sharp(join(SPRITES_DIR, source, file))
      .resize(size, size, { fit: "fill" })
      .png()
      .toFile(join(OUT_DIR, target, file.replace(/\.webp$/, ".png")))

    if ((index + 1) % 250 === 0 || index + 1 === files.length) console.log(`${target}: ${index + 1}/${files.length}`)
  }
}
