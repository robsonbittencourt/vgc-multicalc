import { describe, expect, it } from "vitest"
import fs from "fs"
import { parseSmogonData } from "../src/smogon-data.js"

describe("SmogonDataParser", () => {
  it("should parse one Pokémon from Smogon moveset data", () => {
    const data = fs.readFileSync("test/smogon-data-1.txt", "utf8")

    const pokemon = parseSmogonData(data)

    expect(pokemon[0].name).toBe("Rillaboom")
    expect(pokemon[0].teraType).toBeUndefined()
    expect(pokemon[0].ability).toBe("Grassy Surge")
    expect(pokemon[0].items).toEqual(["Miracle Seed", "Eject Button", "Sitrus Berry", "Occa Berry", "Life Orb"])
    expect(pokemon[0].nature).toBe("Sassy")
    expect(pokemon[0].sps).toEqual({ hp: 32, atk: 0, def: 4, spa: 0, spd: 30, spe: 0 })
    expect(pokemon[0].moves).toEqual(["Wood Hammer", "High Horsepower", "Grassy Glide", "Fake Out"])
  })

  it("should parse three Pokémon from Smogon moveset data", () => {
    const data = fs.readFileSync("test/smogon-data-2.txt", "utf8")

    const pokemon = parseSmogonData(data)

    expect(pokemon[0].name).toBe("Rillaboom")
    expect(pokemon[0].teraType).toBeUndefined()
    expect(pokemon[0].ability).toBe("Grassy Surge")
    expect(pokemon[0].items).toEqual(["Miracle Seed", "Eject Button", "Sitrus Berry", "Occa Berry", "Life Orb"])
    expect(pokemon[0].nature).toBe("Sassy")
    expect(pokemon[0].sps).toEqual({ hp: 32, atk: 0, def: 4, spa: 0, spd: 30, spe: 0 })
    expect(pokemon[0].moves).toEqual(["Wood Hammer", "High Horsepower", "Grassy Glide", "Fake Out"])

    expect(pokemon[1].name).toBe("Sneasler")
    expect(pokemon[1].teraType).toBeUndefined()
    expect(pokemon[1].ability).toBe("Unburden")
    expect(pokemon[1].items).toEqual(["White Herb", "Grassy Seed", "Focus Sash", "Psychic Seed"])
    expect(pokemon[1].nature).toBe("Adamant")
    expect(pokemon[1].sps).toEqual({ hp: 2, atk: 32, def: 0, spa: 0, spd: 0, spe: 32 })
    expect(pokemon[1].moves).toEqual(["Close Combat", "Dire Claw", "Fake Out", "Protect"])

    expect(pokemon[2].name).toBe("Incineroar")
    expect(pokemon[2].teraType).toBeUndefined()
    expect(pokemon[2].ability).toBe("Intimidate")
    expect(pokemon[2].items).toEqual(["Sitrus Berry", "Passho Berry", "Chople Berry", "Rocky Helmet", "White Herb"])
    expect(pokemon[2].nature).toBe("Sassy")
    expect(pokemon[2].sps).toEqual({ hp: 32, atk: 0, def: 4, spa: 0, spd: 30, spe: 0 })
    expect(pokemon[2].moves).toEqual(["Flare Blitz", "Throat Chop", "Fake Out", "Parting Shot"])
  })
})
