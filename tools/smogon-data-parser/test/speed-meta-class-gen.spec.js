import { expect } from "chai"
import fs from 'fs'
import { parseSmogonData } from "../speed-meta-class-gen.js"

describe('SmogonDataParser', () => {
  it("should parse one Pokémon from Smogon moveset data", () => {
    const data = fs.readFileSync("test/smogon-data-1.txt", "utf8")
    
    const pokemon = parseSmogonData(data)
    
    expect(pokemon[0]).equal(`new Pokemon("Urshifu-Rapid-Strike", { teraType: "Stellar", ability: "Unseen Fist", nature: "Adamant", item: "Choice Scarf", evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }, moves: ["Surging Strikes", "Close Combat", "Aqua Jet", "U-turn"]}),`)
  })

  // it("should parse three Pokémon from Smogon moveset data", () => {
  //   const data = fs.readFileSync("test/smogon-data-2.txt", "utf8")
    
  //   const pokemon = parseSmogonData(data)

  //   expect(pokemon[0]).equal(`new Pokemon("Urshifu-Rapid-Strike", { teraType: "Stellar", ability: "Unseen Fist", nature: "Adamant", item: "Choice Scarf", evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }}),`)
  //   expect(pokemon[1]).equal(`new Pokemon("Rillaboom", { teraType: "Fire", ability: "Grassy Surge", nature: "Adamant", item: "Assault Vest", evs: { hp: 236, atk: 116, def: 4, spa: 0, spd: 76, spe: 76 }}),`)
  //   expect(pokemon[2]).equal(`new Pokemon("Incineroar", { teraType: "Ghost", ability: "Intimidate", nature: "Impish", item: "Safety Goggles", evs: { hp: 252, atk: 4, def: 188, spa: 0, spd: 60, spe: 4 }}),`)
  // })
})
