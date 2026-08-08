import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { DefensiveEvOptimizer } from "@multicalc/ev-optimizer/defensive-ev-optimizer"

describe("DefensiveEvOptimizer — edge and fallback paths", () => {
  let service: DefensiveEvOptimizer

  beforeEach(() => {
    service = new DefensiveEvOptimizer()
  })

  it("returns the defender's existing EVs when there are no targets", () => {
    const defender = new Pokemon("Flutter Mane", { evs: { hp: 100, def: 20 } })

    const result = service.optimize(defender, [], new Field())

    expect(result.evs).toEqual(defender.evs)
    expect(result.status).toEqual("success")
  })

  it("returns zeroed EVs when the defender already survives without investment", () => {
    const defender = new Pokemon("Blissey")
    const attacker = new Pokemon("Pichu", {
      nature: "Modest",
      moveSet: new MoveSet(new Move("Thunder Shock"), new Move(""), new Move(""), new Move("")),
      evs: { spa: 0 }
    })

    const result = service.optimize(defender, [new Target(attacker)], new Field())

    expect(result.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    expect(result.status).toEqual("not-needed")
  })

  it("invests only in HP to survive a fixed damage move, since defences do not reduce it", () => {
    const defender = new Pokemon("Iron Bundle", { evs: { hp: 0, def: 0, spd: 0 } })
    const attacker = new Pokemon("Blissey", {
      moveSet: new MoveSet(new Move("Seismic Toss"), new Move(""), new Move(""), new Move("")),
      evs: { atk: 0 }
    })

    const result = service.optimize(defender, [new Target(attacker)], new Field(), false, false, 4, 15, true)

    expect(result.status).toEqual("success")
    expect(result.evs).toEqual({ hp: 156, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  })

  it("returns no solution when the attack cannot be survived at any spread", () => {
    const defender = new Pokemon("Flutter Mane")
    const attacker = new Pokemon("Rayquaza", {
      nature: "Adamant",
      teraType: "Flying",
      teraTypeActive: true,
      moveSet: new MoveSet(new Move("Dragon Ascent"), new Move(""), new Move(""), new Move("")),
      evs: { atk: 252 }
    })

    const result = service.optimize(defender, [new Target(attacker)], new Field())

    expect(result.evs).toBeNull()
    expect(result.status).toEqual("no-solution")
  })

  it("optimizes a mix of a double-attacker target and single-attacker targets", () => {
    const defender = new Pokemon("Gholdengo", { nature: "Bold" })

    const a1 = new Pokemon("Urshifu-Rapid-Strike", {
      nature: "Adamant",
      moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
      evs: { atk: 252 }
    })
    const a2 = new Pokemon("Flutter Mane", {
      nature: "Modest",
      moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")),
      evs: { spa: 252 }
    })
    const single = new Pokemon("Iron Hands", {
      nature: "Adamant",
      moveSet: new MoveSet(new Move("Drain Punch"), new Move(""), new Move(""), new Move("")),
      evs: { atk: 252 }
    })

    const targets = [new Target(a1, a2), new Target(single)]

    const result = service.optimize(defender, targets, new Field())

    expect(result.status).toEqual("success")
  })
  it("stops enriching once the grown plan covers every threat", () => {
    const attacker = (name: string, moveName: string) => new Pokemon(name, { moveSet: new MoveSet(new Move(moveName), new Move(""), new Move(""), new Move("")), evs: { atk: 252, spa: 252 } })
    const defender = new Pokemon("Garchomp", { item: "Sitrus Berry", evs: { atk: 252, spe: 252 } })
    const targets = [new Target(attacker("Urshifu", "Surging Strikes")), new Target(attacker("Koraidon", "Collision Course")), new Target(attacker("Rillaboom", "Wood Hammer"))]

    const result = service.optimize(defender, targets, new Field(), false, false, 3)

    expect(result).toEqual({ evs: { hp: 68, atk: 0, def: 252, spa: 0, spd: 0, spe: 0 }, nature: null, status: "success" })
  })

  it("breaks the nature tie toward the Def-boosting nature when it protects at least as many attackers", () => {
    const attacker = (name: string, moveName: string) => new Pokemon(name, { moveSet: new MoveSet(new Move(moveName), new Move(""), new Move(""), new Move("")), evs: { atk: 252, spa: 252 } })
    const defender = new Pokemon("Incineroar", { item: "Sitrus Berry" })
    const targets = [new Target(attacker("Landorus", "Earthquake")), new Target(attacker("Chi-Yu", "Overheat"))]

    const result = service.optimize(defender, targets, new Field(), true, false, 2)

    expect(result).toEqual({ evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, nature: "Bold", status: "not-needed" })
  })

  it("breaks the nature tie toward the SpD-boosting nature when it protects more attackers", () => {
    const attacker = (name: string, moveName: string) => new Pokemon(name, { moveSet: new MoveSet(new Move(moveName), new Move(""), new Move(""), new Move("")), evs: { atk: 252, spa: 252 } })
    const defender = new Pokemon("Garchomp", { item: "Assault Vest" })
    const targets = [new Target(attacker("Koraidon", "Collision Course")), new Target(attacker("Miraidon", "Electro Drift"))]

    const result = service.optimize(defender, targets, new Field(), true, false, 4)

    expect(result).toEqual({ evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, nature: "Calm", status: "not-needed" })
  })

  describe("nature recommendations", () => {
    const attacker = (name: string, moveName: string) => new Pokemon(name, { moveSet: new MoveSet(new Move(moveName), new Move(""), new Move(""), new Move("")), evs: { atk: 252, spa: 252 } })
    const physicalMoves = () => new MoveSet(new Move("Earthquake"), new Move("Rock Slide"), new Move(""), new Move(""))
    const specialMoves = () => new MoveSet(new Move("Surf"), new Move("Ice Beam"), new Move(""), new Move(""))

    it("recommends Impish for a physical attacker when the defender's own moves are physical", () => {
      const defender = new Pokemon("Incineroar", { item: "Leftovers", moveSet: physicalMoves() })
      const targets = [new Target(attacker("Urshifu", "Surging Strikes")), new Target(attacker("Urshifu", "Surging Strikes"))]

      const result = service.optimize(defender, targets, new Field(), true, false, 2)

      expect(result.nature).toBe("Impish")
    })

    it("recommends Careful for a special attacker when the defender's own moves are physical", () => {
      const defender = new Pokemon("Incineroar", { item: "Leftovers", moveSet: physicalMoves() })
      const targets = [new Target(attacker("Koraidon", "Collision Course")), new Target(attacker("Flutter Mane", "Moonblast"))]

      const result = service.optimize(defender, targets, new Field(), true, false, 2)

      expect(result.nature).toBe("Careful")
    })

    it("recommends Bold for a physical attacker when the defender's own moves are special", () => {
      const defender = new Pokemon("Incineroar", { item: "Leftovers", moveSet: specialMoves() })
      const targets = [new Target(attacker("Urshifu", "Surging Strikes")), new Target(attacker("Urshifu", "Surging Strikes"))]

      const result = service.optimize(defender, targets, new Field(), true, false, 2)

      expect(result.nature).toBe("Bold")
    })

    it("recommends Calm for a special attacker when the defender's own moves are special", () => {
      const defender = new Pokemon("Incineroar", { item: "Leftovers", moveSet: specialMoves() })
      const targets = [new Target(attacker("Koraidon", "Collision Course")), new Target(attacker("Flutter Mane", "Moonblast"))]

      const result = service.optimize(defender, targets, new Field(), true, false, 2)

      expect(result.nature).toBe("Calm")
    })

    it("never recommends a nature that raises one defence without lowering the other", () => {
      const defender = new Pokemon("Incineroar", { item: "Leftovers", moveSet: physicalMoves() })
      const targets = [new Target(attacker("Koraidon", "Collision Course")), new Target(attacker("Flutter Mane", "Moonblast"))]

      const result = service.optimize(defender, targets, new Field(), true, false, 2)

      expect(["Impish", "Bold", "Careful", "Calm"]).toContain(result.nature)
    })
  })

  it("returns no-solution when the reserved offensive EVs leave no budget", () => {
    const defender = new Pokemon("Flutter Mane", { evs: { atk: 252, spa: 252, spe: 252 } })
    const attacker = new Pokemon("Urshifu-Rapid-Strike", {
      nature: "Adamant",
      moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
      evs: { atk: 252 }
    })

    const result = service.optimize(defender, [new Target(attacker)], new Field(), false, true)

    expect(result).toEqual({ evs: null, nature: null, status: "no-solution" })
  })
})
