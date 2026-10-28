import { Ability } from "@multicalc/model/ability"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { Pokemon } from "@multicalc/model/pokemon"
import { getFinalAttack, getFinalSpecialAttack } from "@multicalc/stat-calc/atk-spa/modified-atk-spa"
import { getFinalSpeed } from "@multicalc/stat-calc/spe/modified-spe"

describe("Stats in strong weathers", () => {
  it("should double the speed of Basculegion with Swift Swim in Heavy Rain", () => {
    const pokemon = new Pokemon("Basculegion", { ability: new Ability("Swift Swim"), nature: "Jolly", sps: { spe: 32 } })
    const field = new Field({ weather: "Heavy Rain" })

    const finalSpeed = getFinalSpeed(pokemon, field)

    expect(finalSpeed).toEqual(286)
  })

  it("should double the speed of Jumpluff with Chlorophyll in Harsh Sunshine", () => {
    const pokemon = new Pokemon("Jumpluff", { ability: new Ability("Chlorophyll"), nature: "Timid", sps: { spe: 32 } })
    const field = new Field({ weather: "Harsh Sunshine" })

    const finalSpeed = getFinalSpeed(pokemon, field)

    expect(finalSpeed).toEqual(356)
  })

  it("should boost the attack of Koraidon with Orichalcum Pulse in Harsh Sunshine", () => {
    const pokemon = new Pokemon("Koraidon", { nature: "Adamant", sps: { atk: 27 } })
    const field = new Field({ weather: "Harsh Sunshine" })

    const atk = getFinalAttack(pokemon, new Move("Protect"), field)

    expect(atk).toBe(267)
  })

  it("should boost the special attack of Charizard with Solar Power in Harsh Sunshine", () => {
    const pokemon = new Pokemon("Charizard", { nature: "Timid", sps: { spa: 31 }, ability: new Ability("Solar Power") })
    const field = new Field({ weather: "Harsh Sunshine" })

    const spa = getFinalSpecialAttack(pokemon, new Move("Protect"), field)

    expect(spa).toBe(240)
  })

  it("should not double the speed of Basculegion with Swift Swim in Strong Winds", () => {
    const pokemon = new Pokemon("Basculegion", { ability: new Ability("Swift Swim"), nature: "Jolly", sps: { spe: 32 } })
    const field = new Field({ weather: "Strong Winds" })

    const finalSpeed = getFinalSpeed(pokemon, field)

    expect(finalSpeed).toEqual(143)
  })
})
