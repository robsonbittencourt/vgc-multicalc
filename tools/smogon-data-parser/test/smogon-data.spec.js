import { expect } from "chai"
import fs from "fs"
import { parseSmogonData } from "../src/smogon-data.js"

describe("SmogonDataParser", () => {
  it("should parse one Pokémon from Smogon moveset data", () => {
    const data = fs.readFileSync("test/smogon-data-1.txt", "utf8")

    const pokemon = parseSmogonData(data)

    expect(pokemon[0].name).equal("Urshifu-Rapid-Strike")
    expect(pokemon[0].teraType).equal("Stellar")
    expect(pokemon[0].ability).equal("Unseen Fist")
    expect(pokemon[0].items).to.deep.equal(["Focus Sash", "Choice Scarf", "Mystic Water", "Choice Band", "Safety Goggles"])
    expect(pokemon[0].nature).equal("Adamant")
    expect(pokemon[0].evs).to.deep.equal({ hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 })
    expect(pokemon[0].moves).to.deep.equal(["Close Combat", "U-turn", "Aqua Jet", "Surging Strikes"])
  })

  it("should parse three Pokémon from Smogon moveset data", () => {
    const data = fs.readFileSync("test/smogon-data-2.txt", "utf8")

    const pokemon = parseSmogonData(data)

    expect(pokemon[0].name).equal("Urshifu-Rapid-Strike")
    expect(pokemon[0].teraType).equal("Stellar")
    expect(pokemon[0].ability).equal("Unseen Fist")
    expect(pokemon[0].items).to.deep.equal(["Focus Sash", "Choice Scarf", "Mystic Water", "Choice Band", "Safety Goggles"])
    expect(pokemon[0].nature).equal("Adamant")
    expect(pokemon[0].evs).to.deep.equal({ hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 })
    expect(pokemon[0].moves).to.deep.equal(["Close Combat", "U-turn", "Aqua Jet", "Surging Strikes"])

    expect(pokemon[1].name).equal("Rillaboom")
    expect(pokemon[1].teraType).equal("Fire")
    expect(pokemon[1].ability).equal("Grassy Surge")
    expect(pokemon[1].items).to.deep.equal(["Assault Vest", "Miracle Seed"])
    expect(pokemon[1].nature).equal("Adamant")
    expect(pokemon[1].evs).to.deep.equal({ hp: 236, atk: 116, def: 4, spa: 0, spd: 76, spe: 76 })
    expect(pokemon[1].moves).to.deep.equal(["Wood Hammer", "U-turn", "Grassy Glide", "Fake Out"])

    expect(pokemon[2].name).equal("Incineroar")
    expect(pokemon[2].teraType).equal("Ghost")
    expect(pokemon[2].ability).equal("Intimidate")
    expect(pokemon[2].items).to.deep.equal(["Safety Goggles", "Rocky Helmet", "Assault Vest", "Covert Cloak"])
    expect(pokemon[2].nature).equal("Impish")
    expect(pokemon[2].evs).to.deep.equal({ hp: 252, atk: 4, def: 188, spa: 0, spd: 60, spe: 4 })
    expect(pokemon[2].moves).to.deep.equal(["Knock Off", "Fake Out", "Parting Shot", "Will-O-Wisp"])
  })
})
