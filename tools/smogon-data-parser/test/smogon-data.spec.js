import { describe, expect, it } from "vitest"
import fs from "fs"
import { parseSmogonData } from "../src/smogon-data.js"

describe("SmogonDataParser", () => {
  it("should parse one Pokémon from Smogon moveset data", () => {
    const data = fs.readFileSync("test/smogon-data-1.txt", "utf8")

    const pokemon = parseSmogonData(data)

    expect(pokemon[0].name).toBe("Urshifu-Rapid-Strike")
    expect(pokemon[0].teraType).toBe("")
    expect(pokemon[0].ability).toBe("Unseen Fist")
    expect(pokemon[0].items).toEqual(["Focus Sash", "Choice Scarf", "Mystic Water", "Choice Band", "Safety Goggles"])
    expect(pokemon[0].nature).toBe("Adamant")
    expect(pokemon[0].evs).toEqual({ hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 })
    expect(pokemon[0].moves).toEqual(["Close Combat", "U-turn", "Aqua Jet", "Surging Strikes"])
  })

  it("should parse three Pokémon from Smogon moveset data", () => {
    const data = fs.readFileSync("test/smogon-data-2.txt", "utf8")

    const pokemon = parseSmogonData(data)

    expect(pokemon[0].name).toBe("Urshifu-Rapid-Strike")
    expect(pokemon[0].teraType).toBe("")
    expect(pokemon[0].ability).toBe("Unseen Fist")
    expect(pokemon[0].items).toEqual(["Focus Sash", "Choice Scarf", "Mystic Water", "Choice Band", "Safety Goggles"])
    expect(pokemon[0].nature).toBe("Adamant")
    expect(pokemon[0].evs).toEqual({ hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 })
    expect(pokemon[0].moves).toEqual(["Close Combat", "U-turn", "Aqua Jet", "Surging Strikes"])

    expect(pokemon[1].name).toBe("Rillaboom")
    expect(pokemon[1].teraType).toBe("")
    expect(pokemon[1].ability).toBe("Grassy Surge")
    expect(pokemon[1].items).toEqual(["Assault Vest", "Miracle Seed"])
    expect(pokemon[1].nature).toBe("Adamant")
    expect(pokemon[1].evs).toEqual({ hp: 236, atk: 116, def: 4, spa: 0, spd: 76, spe: 76 })
    expect(pokemon[1].moves).toEqual(["Wood Hammer", "U-turn", "Grassy Glide", "Fake Out"])

    expect(pokemon[2].name).toBe("Incineroar")
    expect(pokemon[2].teraType).toBe("")
    expect(pokemon[2].ability).toBe("Intimidate")
    expect(pokemon[2].items).toEqual(["Safety Goggles", "Rocky Helmet", "Assault Vest", "Covert Cloak"])
    expect(pokemon[2].nature).toBe("Impish")
    expect(pokemon[2].evs).toEqual({ hp: 252, atk: 4, def: 188, spa: 0, spd: 60, spe: 4 })
    expect(pokemon[2].moves).toEqual(["Knock Off", "Fake Out", "Parting Shot", "Will-O-Wisp"])
  })
})
