import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Status } from "@multicalc/model/status"
import { RefinementStage } from "./refinement-stage"

describe("RefinementStage", () => {
  let service: RefinementStage

  beforeEach(() => {
    service = new RefinementStage()
  })

  const burnAttacker = () =>
    new Pokemon("Iron Hands", {
      nature: "Adamant",
      moveSet: new MoveSet(new Move("Drain Punch"), new Move(""), new Move(""), new Move("")),
      evs: { atk: 252 }
    })

  describe("refineForSingleAttacker", () => {
    it("returns the solution unchanged when no residual damage is present", () => {
      const attacker = burnAttacker()
      const defender = new Pokemon("Amoonguss", { nature: "Bold", evs: { hp: 252, def: 4 } })
      const solution = { hp: 252, atk: 0, def: 4, spa: 0, spd: 0, spe: 0 }

      const result = service.refineForSingleAttacker(solution, defender, attacker, new Field(), 2)

      expect(result).toEqual(solution)
    })

    it("reduces the solution to zero when a resistant attacker deals no threatening damage despite residual burn", () => {
      const attacker = burnAttacker()
      const defender = new Pokemon("Amoonguss", { nature: "Bold", status: Status.BURN, evs: { hp: 252, def: 100 } })
      const solution = { hp: 252, atk: 0, def: 100, spa: 0, spd: 0, spe: 0 }

      const result = service.refineForSingleAttacker(solution, defender, attacker, new Field(), 2)

      expect(result).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    })
  })
})
