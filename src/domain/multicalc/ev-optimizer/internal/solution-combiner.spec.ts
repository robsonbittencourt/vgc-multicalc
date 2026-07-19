import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { SolutionCombiner } from "@multicalc/ev-optimizer/internal/solution-combiner"

describe("SolutionCombiner", () => {
  describe("combineThreeSolutions", () => {
    it("should drop both single solutions and return the double solution when its spread already protects both attackers", () => {
      const combiner = new SolutionCombiner()
      const field = new Field()

      const defender = new Pokemon("Snorlax", { moveSet: new MoveSet(new Move("Body Slam"), new Move(""), new Move(""), new Move("")) })
      const physicalAttacker = new Pokemon("Sinistcha", { nature: "Modest", moveSet: new MoveSet(new Move("Matcha Gotcha"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })
      const specialAttacker = new Pokemon("Sinistcha", { nature: "Modest", moveSet: new MoveSet(new Move("Matcha Gotcha"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })
      const doubleAttacker1 = new Pokemon("Iron Bundle", { nature: "Modest", moveSet: new MoveSet(new Move("Hydro Pump"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
      const doubleAttacker2 = new Pokemon("Sinistcha", { nature: "Modest", moveSet: new MoveSet(new Move("Matcha Gotcha"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })

      const physicalSolution = { hp: 100, atk: 0, def: 100, spa: 0, spd: 0, spe: 0 }
      const specialSolution = { hp: 100, atk: 0, def: 0, spa: 0, spd: 60, spe: 0 }
      const doubleSolution = { hp: 156, atk: 0, def: 252, spa: 0, spd: 252, spe: 0 }

      const result = combiner.combineThreeSolutions(
        { physicalSolution, specialSolution, doubleSolution },
        { defender, field, threshold: 3, rollIndex: 15, rightIsDefender: true },
        { physicalAttacker, specialAttacker, physicalAttackers: [physicalAttacker], specialAttackers: [specialAttacker] },
        { attacker1: doubleAttacker1, attacker2: doubleAttacker2 }
      )

      expect(result).toEqual(doubleSolution)
    })

    it("should combine both single solutions with the double when neither attacker is protected by the double spread", () => {
      const combiner = new SolutionCombiner()
      const field = new Field()

      const defender = new Pokemon("Snorlax", { moveSet: new MoveSet(new Move("Body Slam"), new Move(""), new Move(""), new Move("")) })
      const physicalAttacker = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
      const specialAttacker = new Pokemon("Chi-Yu", { nature: "Modest", item: "Life Orb", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
      const doubleAttacker1 = new Pokemon("Iron Bundle", { nature: "Modest", moveSet: new MoveSet(new Move("Hydro Pump"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
      const doubleAttacker2 = new Pokemon("Sinistcha", { nature: "Modest", moveSet: new MoveSet(new Move("Matcha Gotcha"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })

      const physicalSolution = { hp: 4, atk: 0, def: 252, spa: 0, spd: 0, spe: 0 }
      const specialSolution = { hp: 4, atk: 0, def: 0, spa: 0, spd: 252, spe: 0 }
      const doubleSolution = { hp: 4, atk: 0, def: 4, spa: 0, spd: 4, spe: 0 }

      const result = combiner.combineThreeSolutions(
        { physicalSolution, specialSolution, doubleSolution },
        { defender, field, threshold: 3, rollIndex: 15, rightIsDefender: true },
        { physicalAttacker, specialAttacker, physicalAttackers: [physicalAttacker], specialAttackers: [specialAttacker] },
        { attacker1: doubleAttacker1, attacker2: doubleAttacker2 }
      )

      expect(result).toEqual({ hp: 156, atk: 0, def: 0, spa: 0, spd: 252, spe: 0 })
    })

    it("should combine the physical single with the double when there is no special solution", () => {
      const combiner = new SolutionCombiner()
      const field = new Field()

      const defender = new Pokemon("Snorlax", { moveSet: new MoveSet(new Move("Body Slam"), new Move(""), new Move(""), new Move("")) })
      const physicalAttacker = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
      const doubleAttacker1 = new Pokemon("Iron Bundle", { nature: "Modest", moveSet: new MoveSet(new Move("Hydro Pump"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
      const doubleAttacker2 = new Pokemon("Sinistcha", { nature: "Modest", moveSet: new MoveSet(new Move("Matcha Gotcha"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })

      const physicalSolution = { hp: 4, atk: 0, def: 252, spa: 0, spd: 0, spe: 0 }
      const doubleSolution = { hp: 156, atk: 0, def: 0, spa: 0, spd: 252, spe: 0 }

      const result = combiner.combineThreeSolutions(
        { physicalSolution, specialSolution: null, doubleSolution },
        { defender, field, threshold: 3, rollIndex: 15, rightIsDefender: true },
        { physicalAttacker, specialAttacker: null, physicalAttackers: [physicalAttacker], specialAttackers: [] },
        { attacker1: doubleAttacker1, attacker2: doubleAttacker2 }
      )

      expect(result).toEqual({ hp: 4, atk: 0, def: 252, spa: 0, spd: 0, spe: 0 })
    })

    it("should combine the special single with the double when there is no physical solution", () => {
      const combiner = new SolutionCombiner()
      const field = new Field()

      const defender = new Pokemon("Snorlax", { moveSet: new MoveSet(new Move("Body Slam"), new Move(""), new Move(""), new Move("")) })
      const specialAttacker = new Pokemon("Chi-Yu", { nature: "Modest", item: "Life Orb", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
      const doubleAttacker1 = new Pokemon("Iron Bundle", { nature: "Modest", moveSet: new MoveSet(new Move("Hydro Pump"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
      const doubleAttacker2 = new Pokemon("Sinistcha", { nature: "Modest", moveSet: new MoveSet(new Move("Matcha Gotcha"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })

      const specialSolution = { hp: 4, atk: 0, def: 0, spa: 0, spd: 252, spe: 0 }
      const doubleSolution = { hp: 4, atk: 0, def: 4, spa: 0, spd: 4, spe: 0 }

      const result = combiner.combineThreeSolutions(
        { physicalSolution: null, specialSolution, doubleSolution },
        { defender, field, threshold: 3, rollIndex: 15, rightIsDefender: true },
        { physicalAttacker: null, specialAttacker, physicalAttackers: [], specialAttackers: [specialAttacker] },
        { attacker1: doubleAttacker1, attacker2: doubleAttacker2 }
      )

      expect(result).toEqual({ hp: 4, atk: 0, def: 0, spa: 0, spd: 252, spe: 0 })
    })

    it("should delegate to the two-solution combine path when there is no double solution", () => {
      const combiner = new SolutionCombiner()
      const field = new Field()

      const defender = new Pokemon("Snorlax", { moveSet: new MoveSet(new Move("Body Slam"), new Move(""), new Move(""), new Move("")) })
      const physicalAttacker = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
      const specialAttacker = new Pokemon("Chi-Yu", { nature: "Modest", item: "Life Orb", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })

      const physicalSolution = { hp: 100, atk: 0, def: 100, spa: 0, spd: 0, spe: 0 }
      const specialSolution = { hp: 100, atk: 0, def: 0, spa: 0, spd: 100, spe: 0 }

      const result = combiner.combineThreeSolutions(
        { physicalSolution, specialSolution, doubleSolution: null },
        { defender, field, threshold: 3, rollIndex: 15, rightIsDefender: true },
        { physicalAttacker, specialAttacker, physicalAttackers: [physicalAttacker], specialAttackers: [specialAttacker] },
        { attacker1: null, attacker2: null }
      )

      expect(result).toEqual({ hp: 100, atk: 0, def: 100, spa: 0, spd: 0, spe: 0 })
    })

    it("should delegate to the single special combine path when there is no double solution and no physical solution", () => {
      const combiner = new SolutionCombiner()
      const field = new Field()

      const defender = new Pokemon("Snorlax", { moveSet: new MoveSet(new Move("Body Slam"), new Move(""), new Move(""), new Move("")) })
      const specialAttacker = new Pokemon("Chi-Yu", { nature: "Modest", item: "Life Orb", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })

      const specialSolution = { hp: 100, atk: 0, def: 0, spa: 0, spd: 100, spe: 0 }

      const result = combiner.combineThreeSolutions(
        { physicalSolution: null, specialSolution, doubleSolution: null },
        { defender, field, threshold: 3, rollIndex: 15, rightIsDefender: true },
        { physicalAttacker: null, specialAttacker, physicalAttackers: [], specialAttackers: [specialAttacker] },
        { attacker1: null, attacker2: null }
      )

      expect(result).toEqual({ hp: 100, atk: 0, def: 0, spa: 0, spd: 100, spe: 0 })
    })

    it("should fall back to combining the physical single with the double when the two-solution result cannot absorb the double", () => {
      const combiner = new SolutionCombiner()
      const field = new Field()

      const defender = new Pokemon("Snorlax", { moveSet: new MoveSet(new Move("Body Slam"), new Move(""), new Move(""), new Move("")) })
      const physicalAttacker = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
      const specialAttacker = new Pokemon("Chi-Yu", { nature: "Modest", item: "Life Orb", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })

      const physicalSolution = { hp: 4, atk: 0, def: 252, spa: 0, spd: 0, spe: 0 }
      const specialSolution = { hp: 4, atk: 0, def: 0, spa: 0, spd: 252, spe: 0 }
      const doubleSolution = { hp: 4, atk: 0, def: 4, spa: 0, spd: 4, spe: 0 }

      const result = combiner.combineThreeSolutions(
        { physicalSolution, specialSolution, doubleSolution },
        { defender, field, threshold: 3, rollIndex: 15, rightIsDefender: true },
        { physicalAttacker, specialAttacker, physicalAttackers: [physicalAttacker], specialAttackers: [specialAttacker] },
        { attacker1: null, attacker2: null }
      )

      expect(result).not.toBeNull()
    })
  })
})
