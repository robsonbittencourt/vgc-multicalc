import assert from "node:assert/strict"
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { describe, it } from "node:test"
import { parseSets } from "../lambda/core.mjs"
import { fileAssets, toId } from "../lambda/og-assets.mjs"
import { buildOgSvg, OG_HEIGHT, OG_WIDTH } from "../lambda/og-image.mjs"
import { measureText, renderPng } from "../lambda/og-render.mjs"

const SAMPLE = readFileSync(new URL("./fixtures/sample-team.txt", import.meta.url), "utf8")

const fakeAssets = {
  brand: () => "brand:icon",
  sprite: species => `sprite:${species}`,
  item: name => `item:${name}`,
  isMegaStone: name => name === "Floettite",
  moveTypeIcon: move => (move === "Unknown Move" ? null : `type:${move}`)
}

const fakeMeasure = (value, size) => value.length * size * 0.5

const cardCount = svg => svg.match(/<rect x="[\d.]+" y="[\d.]+" width="[\d.]+" height="[\d.]+" fill="#45445f"\/>/g).length

describe("parseSets", () => {
  it("reads species, item and up to four moves of each set", () => {
    const sets = parseSets(SAMPLE)

    assert.equal(sets.length, 6)
    assert.deepEqual(sets[0], { species: "Incineroar", item: "Sitrus Berry", ability: "Intimidate", moves: ["Fake Out", "Knock Off", "Flare Blitz", "Parting Shot"] })
    assert.deepEqual(sets[5], { species: "Floette-Eternal", item: "Floettite", ability: "Flower Veil", moves: ["Light of Ruin", "Moonblast", "Dazzling Gleam", "Protect"] })
  })

  it("handles nicknames, genders, missing items and extra moves", () => {
    const sets = parseSets("=== Team ===\n\nBuddy (Pikachu) (M)\n- Thunderbolt\n~ Protect\n- Fake Out\n- Volt Switch\n- Surf")

    assert.deepEqual(sets, [{ species: "Pikachu", item: "", ability: "", moves: ["Thunderbolt", "Protect", "Fake Out", "Volt Switch"] }])
  })
})

describe("buildOgSvg", () => {
  it("draws a card for each Pokémon with sprite, item and moves", () => {
    const svg = buildOgSvg(parseSets(SAMPLE), fakeAssets, fakeMeasure)

    assert.ok(svg.startsWith(`<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}"`))
    assert.equal(cardCount(svg), 6)
    assert.match(svg, /href="sprite:Kingambit"/)
    assert.match(svg, /href="item:Black Glasses"/)
    assert.match(svg, /href="type:Kowtow Cleave"/)
    assert.match(svg, />Stomping Tantrum<\/text>/)
    assert.match(svg, />Rough Skin<\/text>/)
  })

  it("puts the site name and icon at the top", () => {
    const svg = buildOgSvg([], fakeAssets, fakeMeasure)

    assert.match(svg, /<image href="brand:icon" x="24" y="14" width="36" height="36"/)
    assert.match(svg, /<text x="72" y="42"[^>]*>VGC Multi Calc<\/text>/)
    assert.match(svg, /<text x="1176" y="41" text-anchor="end"[^>]*>Paste<\/text>/)
  })

  it("keeps the site name at the margin without the icon", () => {
    const svg = buildOgSvg([], { ...fakeAssets, brand: () => null }, fakeMeasure)

    assert.match(svg, /<text x="24" y="42"[^>]*>VGC Multi Calc<\/text>/)
  })

  it("keeps the bottom band free for the link title that social networks draw over the image", () => {
    const svg = buildOgSvg(parseSets(SAMPLE), fakeAssets, fakeMeasure)

    const textBaselines = [...svg.matchAll(/<text x="[\d.]+" y="([\d.]+)"/g)].map(match => Number(match[1]))
    const imageBottoms = [...svg.matchAll(/<image href="[^"]+" x="[\d.]+" y="([\d.]+)" width="[\d.]+" height="([\d.]+)"/g)].map(match => Number(match[1]) + Number(match[2]))

    assert.ok(Math.max(...textBaselines) + 6 <= OG_HEIGHT - 84)
    assert.ok(Math.max(...imageBottoms) <= OG_HEIGHT - 84)
  })

  it("draws at most six cards", () => {
    const sets = Array.from({ length: 7 }, () => ({ species: "Pikachu", item: "", moves: [] }))

    assert.equal(cardCount(buildOgSvg(sets, fakeAssets, fakeMeasure)), 6)
  })

  it("leaves out missing images and uses a placeholder for moves without type", () => {
    const assets = { brand: () => null, sprite: () => null, item: () => null, moveTypeIcon: () => null }

    const svg = buildOgSvg([{ species: "Missingno", item: "Mystery Box", moves: ["Unknown Move"] }], assets, fakeMeasure)

    assert.equal(svg.includes("<image"), false)
    assert.equal(svg.includes("<circle"), false)
    assert.match(svg, /<rect x="\d+" y="\d+" width="22" height="22" rx="4" fill="#35344c"\/>/)
    assert.match(svg, />Mystery Box<\/text>/)
  })

  it("does not look up an item when the Pokémon holds none", () => {
    const assets = { ...fakeAssets, item: () => assert.fail("item must not be looked up") }

    const svg = buildOgSvg([{ species: "Pikachu", item: "", moves: [] }], assets, fakeMeasure)

    assert.match(svg, />Pikachu<\/text>/)
  })

  it("squeezes long text into the card and escapes it", () => {
    const svg = buildOgSvg([{ species: "Floette-Eternal", item: "<Very Long Item Name>", moves: [] }], fakeAssets, () => 1000)

    assert.match(svg, /textLength="\d+(\.\d+)?" lengthAdjust="spacingAndGlyphs">Floette-Eternal</)
    assert.match(svg, />&lt;Very Long Item Name&gt;<\/text>/)
  })
})

describe("item badge", () => {
  it("puts the item icon on a light disc right after the measured item name", () => {
    const svg = buildOgSvg([{ species: "Incineroar", item: "Sitrus Berry", moves: [] }], fakeAssets, () => 100)

    assert.match(svg, /<text x="152" y="135"[^>]*>Sitrus Berry<\/text><circle cx="276" cy="127" r="16" fill="#f2f2f7"\/><image href="item:Sitrus Berry" x="264" y="115" width="24" height="24"/)
  })

  it("draws mega stones bigger inside the disc", () => {
    const svg = buildOgSvg([{ species: "Floette-Eternal", item: "Floettite", moves: [] }], fakeAssets, () => 100)

    assert.match(svg, /<image href="item:Floettite" x="261" y="112" width="30" height="30"/)
  })

  it("keeps the disc inside the card when the item name is squeezed", () => {
    const svg = buildOgSvg([{ species: "Pikachu", item: "Some Very Long Item", moves: [] }], fakeAssets, () => 1000)

    const cardRight = Number(svg.match(/<rect x="24" y="64" width="([\d.]+)"/)[1]) + 24
    const discRight = Number(svg.match(/<circle cx="([\d.]+)" cy="127" r="16"/)[1]) + 16

    assert.match(svg, /lengthAdjust="spacingAndGlyphs">Some Very Long Item<\/text><circle/)
    assert.equal(Math.round(discRight * 100) / 100, Math.round((cardRight - 14) * 100) / 100)
  })
})

describe("fileAssets", () => {
  const dir = mkdtempSync(join(tmpdir(), "og-assets-"))
  mkdirSync(join(dir, "sprites"))
  mkdirSync(join(dir, "items"))
  mkdirSync(join(dir, "types"))
  writeFileSync(join(dir, "moves.json"), JSON.stringify({ fakeout: "normal" }))
  writeFileSync(join(dir, "items.json"), JSON.stringify({ sitrusberry: "sitrus-berry" }))
  writeFileSync(join(dir, "mega-stones.json"), JSON.stringify(["charizarditey"]))
  writeFileSync(join(dir, "sprites", "Type-Null.png"), "sprite")
  writeFileSync(join(dir, "sprites", "Aegislash-Shield.png"), "aegislash")
  writeFileSync(join(dir, "items", "sitrus-berry.png"), "item")
  writeFileSync(join(dir, "types", "normal.png"), "type")
  writeFileSync(join(dir, "brand.png"), "brand")

  const assets = fileAssets(dir)

  it("serves the prepared images as data URIs", () => {
    assert.equal(assets.brand(), `data:image/png;base64,${Buffer.from("brand").toString("base64")}`)
    assert.equal(assets.sprite("Type: Null"), `data:image/png;base64,${Buffer.from("sprite").toString("base64")}`)
    assert.equal(assets.item("Sitrus Berry"), `data:image/png;base64,${Buffer.from("item").toString("base64")}`)
    assert.equal(assets.moveTypeIcon("Fake Out"), `data:image/png;base64,${Buffer.from("type").toString("base64")}`)
  })

  it("knows which items are mega stones", () => {
    assert.equal(assets.isMegaStone("Charizardite Y"), true)
    assert.equal(assets.isMegaStone("Sitrus Berry"), false)
  })

  it("draws Aegislash in its Shield Forme", () => {
    assert.equal(assets.sprite("Aegislash"), `data:image/png;base64,${Buffer.from("aegislash").toString("base64")}`)
  })

  it("answers null for unknown or missing images", () => {
    assert.equal(assets.sprite("Missingno"), null)
    assert.equal(assets.item("Mystery Box"), null)
    assert.equal(assets.moveTypeIcon("Unknown Move"), null)
  })

  it("knows only the species that have a prepared sprite", () => {
    assert.equal(assets.hasSprite("Type: Null"), true)
    assert.equal(assets.hasSprite("Aegislash"), true)
    assert.equal(assets.hasSprite("Missingno"), false)
  })

  it("never reads a file outside the sprites", () => {
    assert.equal(assets.hasSprite("../brand"), false)
    assert.equal(assets.sprite("../brand"), null)
  })

  it("answers null for a listed image that cannot be read", () => {
    mkdirSync(join(dir, "sprites", "Broken.png"))
    const withBroken = fileAssets(dir)

    assert.equal(withBroken.sprite("Broken"), null)
    assert.equal(withBroken.sprite("Broken"), null)
  })
})

describe("measureText", () => {
  it("measures the rendered width of the text in the given size and weight", () => {
    const short = measureText("Life Orb", 22, 500)
    const long = measureText("Life Orb Life Orb", 22, 500)

    assert.ok(short > 60 && short < 90, `got ${short}`)
    assert.ok(long > short * 2)
    assert.ok(measureText("Life Orb", 22, 700) > short)
  })

  it("answers zero for empty text", () => {
    assert.equal(measureText("", 22, 500), 0)
  })
})

describe("toId", () => {
  it("keeps only lowercase letters and digits", () => {
    assert.equal(toId("King's Rock"), "kingsrock")
    assert.equal(toId("U-turn"), "uturn")
  })
})

describe("renderPng", () => {
  it("renders the svg as a png of the same size", () => {
    const png = renderPng(buildOgSvg([{ species: "Pikachu", item: "", moves: ["Thunderbolt"] }], { brand: () => null, sprite: () => null, item: () => null, moveTypeIcon: () => null }, measureText))

    assert.deepEqual([...png.subarray(1, 4)], [0x50, 0x4e, 0x47])
    assert.equal(png.readUInt32BE(16), OG_WIDTH)
    assert.equal(png.readUInt32BE(20), OG_HEIGHT)
  })
})
