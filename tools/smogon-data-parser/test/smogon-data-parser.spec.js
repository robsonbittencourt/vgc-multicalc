import fs from "fs"
import { expect } from "chai"
import { parseSmogonData } from "../smogon-data-parser.js"

describe("SmogonDataParser", () => {
  it("should parse one Pokémon from Smogon moveset data", () => {
    const data = fs.readFileSync("test/smogon-data-1.txt", "utf8")

    const pokemon = parseSmogonData(data)

    expect(pokemon[0]).equal(`new Pokemon("Urshifu-Rapid-Strike", { ability: "Unseen Fist", nature: "Adamant", item: "Choice Scarf", evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }}),`)
  })

  it("should parse three Pokémon from Smogon moveset data", () => {
    const data = fs.readFileSync("test/smogon-data-2.txt", "utf8")

    const pokemon = parseSmogonData(data)

    expect(pokemon[0]).equal(`new Pokemon("Urshifu-Rapid-Strike", { ability: "Unseen Fist", nature: "Adamant", item: "Choice Scarf", evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }}),`)
    expect(pokemon[1]).equal(`new Pokemon("Rillaboom", { ability: "Grassy Surge", nature: "Adamant", item: "Assault Vest", evs: { hp: 236, atk: 116, def: 4, spa: 0, spd: 76, spe: 76 }}),`)
    expect(pokemon[2]).equal(`new Pokemon("Lycanroc", { ability: "Sand Rush", nature: "Jolly", item: "Focus Sash", evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }}),`)
  })
})
