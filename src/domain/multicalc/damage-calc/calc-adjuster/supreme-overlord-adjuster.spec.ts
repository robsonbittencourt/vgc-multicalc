import { SupremeOverlordAdjuster } from "./supreme-overlord-adjuster"
import { Move } from "@multicalc/model/move"
import { Move as MoveCalc, Pokemon as CalcPokemon, Field as FieldCalc } from "@calc"

describe("Supreme Overlord Adjuster", () => {
  it("should set alliesFainted from move when attacker has Supreme Overlord", () => {
    const move = new Move("Kowtow Cleave", { alliesFainted: "3" })
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Kingambit", { ability: "Supreme Overlord" })
    const target = new CalcPokemon("Flutter Mane")
    const calcField = new FieldCalc()

    new SupremeOverlordAdjuster().adjust(attacker, target, move, moveCalc, calcField)

    expect(attacker.alliesFainted).toBe(3)
  })

  it("should not set alliesFainted when attacker does not have Supreme Overlord", () => {
    const move = new Move("Kowtow Cleave", { alliesFainted: "3" })
    const moveCalc = new MoveCalc(move.name)
    const attacker = new CalcPokemon("Kingambit", { ability: "Defiant" })
    const target = new CalcPokemon("Flutter Mane")
    const calcField = new FieldCalc()

    new SupremeOverlordAdjuster().adjust(attacker, target, move, moveCalc, calcField)

    expect(attacker.alliesFainted).toBeUndefined()
  })
})
