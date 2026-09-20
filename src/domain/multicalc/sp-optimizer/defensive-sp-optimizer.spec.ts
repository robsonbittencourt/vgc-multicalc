import { Ability } from "@multicalc/model/ability"
import { Field, FieldSide } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { DamageCalc } from "@multicalc/damage-calc/damage-calc"
import { RollLevelConfig } from "@multicalc/damage-calc/roll-level-config"
import { DefensiveSpOptimizer } from "@multicalc/sp-optimizer/defensive-sp-optimizer"
import { Status } from "@multicalc/model/status"

describe("DefensiveSpOptimizer", () => {
  let service: DefensiveSpOptimizer

  beforeEach(() => {
    service = new DefensiveSpOptimizer()
  })

  describe("optimize", () => {
    describe("single attacker", () => {
      it("should optimize SPs for single physical attacker", () => {
        const defender = new Pokemon("Flutter Mane")

        const attacker = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Adamant",
          moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps!.hp).toBe(18)
        expect(result.sps!.def).toBe(30)
        expect(result.sps!.spd).toBe(0)
      })

      it("should optimize SPs for single physical attacker againt Ting-Lu", () => {
        const defender = new Pokemon("Ting-Lu", {
          nature: "Bold"
        })

        const attacker = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Adamant",
          teraType: "Water",
          teraTypeActive: true,
          moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(0)
        expect(result.sps!.def).toBe(23)
        expect(result.sps!.spd).toBe(0)
      })

      it("should optimize SPs for single special attacker", () => {
        const defender = new Pokemon("Vaporeon")

        const attacker = new Pokemon("Raging Bolt", {
          nature: "Modest",
          moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(2)
        expect(result.sps!.def).toBe(0)
        expect(result.sps!.spd).toBe(6)
      })

      it("should optimize SPs for Empoleon with Shuca Berry against Garchomp Earthquake", () => {
        const defender = new Pokemon("Empoleon", {
          nature: "Bold",
          item: "Shuca Berry"
        })

        const attacker = new Pokemon("Garchomp", {
          nature: "Jolly",
          item: "Choice Scarf",
          moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")),
          sps: { hp: 0, atk: 4, spe: 4 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 3)

        expect(result.sps!.hp).toBeGreaterThan(3)
        expect(result.sps!.def).toBeGreaterThan(4)
        expect(result.sps!.spd).toBe(0)
      })

      it("should optimize SPs for Incineroar with Sitrus Berry against Urshifu-Rapid-Strike Surging Strikes", () => {
        const defender = new Pokemon("Incineroar", {
          nature: "Impish",
          item: "Sitrus Berry"
        })

        const attacker = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Adamant",
          moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(9)
        expect(result.sps!.def).toBe(16)
        expect(result.sps!.spd).toBe(0)
      })
    })

    describe("stat priority", () => {
      it("should optimize SPs prioritizing hp when possible", () => {
        const defender = new Pokemon("Whimsicott")

        const attacker = new Pokemon("Tornadus", {
          nature: "Timid",
          moveSet: new MoveSet(new Move("Bleakwind Storm"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(12)
        expect(result.sps!.def).toBe(0)
        expect(result.sps!.spd).toBe(25)
      })

      it("should prioritize special attackers when there are more chances to survive special attacks", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Modest",
          item: "Choice Specs",
          teraType: "Fairy"
        })

        const chiYu = new Pokemon("Chi-Yu", {
          nature: "Bold",
          item: "Choice Specs",
          ability: new Ability("Beads of Ruin"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 4 }
        })

        const tingLu = new Pokemon("Ting-Lu", {
          nature: "Adamant",
          item: "Clear Amulet",
          ability: new Ability("Vessel of Ruin"),
          moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const landorusTherian = new Pokemon("Landorus-Therian", {
          nature: "Adamant",
          item: "Choice Band",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 15 }
        })

        const torkoal = new Pokemon("Torkoal", {
          nature: "Quiet",
          item: "Choice Specs",
          ability: new Ability("Drought"),
          moveSet: new MoveSet(new Move("Eruption"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const heatran = new Pokemon("Heatran", {
          nature: "Modest",
          item: "Leftovers",
          ability: new Ability("Flash Fire"),
          moveSet: new MoveSet(new Move("Fire Blast"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 2 }
        })

        const moltresGalar = new Pokemon("Moltres-Galar", {
          nature: "Modest",
          item: "Choice Specs",
          ability: new Ability("Berserk"),
          moveSet: new MoveSet(new Move("Fiery Wrath"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const archaludon = new Pokemon("Archaludon", {
          nature: "Modest",
          item: "Assault Vest",
          ability: new Ability("Stamina"),
          moveSet: new MoveSet(new Move("Electro Shot"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const kingambit = new Pokemon("Kingambit", {
          nature: "Adamant",
          item: "Black Glasses",
          ability: new Ability("Defiant"),
          moveSet: new MoveSet(new Move("Kowtow Cleave"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const dondozo = new Pokemon("Dondozo", {
          nature: "Adamant",
          item: "Leftovers",
          ability: new Ability("Oblivious"),
          moveSet: new MoveSet(new Move("Wave Crash"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 0 }
        })

        const targets = [new Target(chiYu), new Target(tingLu), new Target(landorusTherian), new Target(torkoal), new Target(heatran), new Target(moltresGalar), new Target(archaludon), new Target(kingambit), new Target(dondozo)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(15)
        expect(result.sps!.def).toBe(0)
        expect(result.sps!.spd).toBe(29)
      })

      it("should prioritize physical attackers when there are more chances to survive physical attacks", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Modest",
          item: "Choice Specs",
          teraType: "Fairy"
        })

        const chiYu = new Pokemon("Chi-Yu", {
          nature: "Bold",
          item: "Choice Specs",
          ability: new Ability("Beads of Ruin"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 4 }
        })

        const tingLu = new Pokemon("Ting-Lu", {
          nature: "Adamant",
          item: "Clear Amulet",
          ability: new Ability("Vessel of Ruin"),
          moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const landorusTherian = new Pokemon("Landorus-Therian", {
          nature: "Adamant",
          item: "Choice Band",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 15 }
        })

        const torkoal = new Pokemon("Torkoal", {
          nature: "Quiet",
          item: "Choice Specs",
          ability: new Ability("Drought"),
          moveSet: new MoveSet(new Move("Eruption"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const heatran = new Pokemon("Heatran", {
          nature: "Modest",
          item: "Leftovers",
          ability: new Ability("Flash Fire"),
          moveSet: new MoveSet(new Move("Magma Storm"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 16 }
        })

        const archaludon = new Pokemon("Archaludon", {
          nature: "Modest",
          item: "Assault Vest",
          ability: new Ability("Stamina"),
          moveSet: new MoveSet(new Move("Electro Shot"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const kingambit = new Pokemon("Kingambit", {
          nature: "Adamant",
          item: "Black Glasses",
          ability: new Ability("Defiant"),
          moveSet: new MoveSet(new Move("Kowtow Cleave"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const dondozo = new Pokemon("Dondozo", {
          nature: "Adamant",
          item: "Leftovers",
          ability: new Ability("Oblivious"),
          moveSet: new MoveSet(new Move("Wave Crash"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 0 }
        })

        const roaringMoon = new Pokemon("Roaring Moon", {
          nature: "Jolly",
          item: "Booster Energy",
          ability: new Ability("Protosynthesis"),
          moveSet: new MoveSet(new Move("Knock Off"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const targets = [new Target(chiYu), new Target(tingLu), new Target(landorusTherian), new Target(torkoal), new Target(heatran), new Target(archaludon), new Target(kingambit), new Target(dondozo), new Target(roaringMoon)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(31)
        expect(result.sps!.def).toBe(32)
        expect(result.sps!.spd).toBe(0)
      })
    })

    describe("multiple attackers", () => {
      it("should optimize SPs for multiple attackers", () => {
        const defender = new Pokemon("Scream Tail", {
          item: "Booster Energy",
          teraType: "Grass"
        })

        const calyrexShadow = new Pokemon("Calyrex-Shadow", {
          nature: "Modest",
          ability: new Ability("As One (Spectrier)"),
          moveSet: new MoveSet(new Move("Astral Barrage"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const urshifuRapidStrike = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Jolly",
          ability: new Ability("Unseen Fist"),
          teraType: "Water",
          teraTypeActive: true,
          moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const targets = [new Target(calyrexShadow), new Target(urshifuRapidStrike)]
        const field = new Field({ weather: "Rain" })

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(9)
        expect(result.sps!.def).toBe(25)
        expect(result.sps!.spd).toBe(0)
      })

      it("should protect the physical attacker of a mixed pair when the special one is unprotectable", () => {
        const defender = new Pokemon("Snorlax", { nature: "Bold", item: "Sitrus Berry" })

        const rillaboom = new Pokemon("Rillaboom", {
          nature: "Adamant",
          moveSet: new MoveSet(new Move("Wood Hammer"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const chiYu = new Pokemon("Chi-Yu", {
          nature: "Modest",
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const targets = [new Target(rillaboom), new Target(chiYu)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field, false, false, 3, 15, true)

        expect(result.status).toBe("success")
        expect(result.sps!.hp).toBe(30)
        expect(result.sps!.def).toBe(29)
        expect(result.sps!.spd).toBe(0)
      })

      it("should optimize SPs for multiple attackers with Whimsicott", () => {
        const defender = new Pokemon("Whimsicott", {
          nature: "Bold"
        })

        const calyrexShadow = new Pokemon("Calyrex-Shadow", {
          nature: "Timid",
          item: "Life Orb",
          ability: new Ability("As One (Spectrier)"),
          moveSet: new MoveSet(new Move("Astral Barrage"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const zamazentaCrowned = new Pokemon("Zamazenta-Crowned", {
          nature: "Impish",
          item: "Rusted Shield",
          ability: new Ability("Dauntless Shield"),
          moveSet: new MoveSet(new Move("Heavy Slam"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 3 }
        })

        const targets = [new Target(calyrexShadow), new Target(zamazentaCrowned)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(30)
        expect(result.sps!.def).toBe(23)
        expect(result.sps!.spd).toBe(0)
      })

      it("should optimize SPs for multiple attackers with Gholdengo", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Modest",
          item: "Choice Specs",
          teraType: "Fairy"
        })

        const miraidon = new Pokemon("Miraidon", {
          nature: "Modest",
          item: "Choice Specs",
          ability: new Ability("Hadron Engine"),
          moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 31 }
        })

        const incineroar = new Pokemon("Incineroar", {
          nature: "Impish",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Flare Blitz"), new Move(""), new Move(""), new Move("")),
          sps: { def: 24 }
        })

        const targets = [new Target(miraidon), new Target(incineroar)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(27)
        expect(result.sps!.def).toBe(0)
        expect(result.sps!.spd).toBe(0)
      })

      it("should optimize SPs for multiple attackers with 1 not survivable, 1 special attacker and 1 physical attacker", () => {
        const defender = new Pokemon("Calyrex-Shadow")

        const miraidon = new Pokemon("Miraidon", {
          nature: "Timid",
          item: "Choice Specs",
          ability: new Ability("Hadron Engine"),
          moveSet: new MoveSet(new Move("Draco Meteor"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const ragingBolt = new Pokemon("Raging Bolt", {
          nature: "Modest",
          item: "Booster Energy",
          ability: new Ability("Protosynthesis", true),
          teraType: "Electric",
          teraTypeActive: true,
          moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const chienPao = new Pokemon("Chien-Pao", {
          nature: "Adamant",
          item: "Life Orb",
          ability: new Ability("Sword of Ruin"),
          moveSet: new MoveSet(new Move("Ice Spinner"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const targets = [new Target(miraidon), new Target(ragingBolt), new Target(chienPao)]
        const field = new Field({ terrain: "Electric" })

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(14)
        expect(result.sps!.def).toBe(0)
        expect(result.sps!.spd).toBe(29)
      })

      it("should optimize SPs for two simultaneous attackers (Urshifu-Rapid-Strike + Flutter Mane vs Gholdengo)", () => {
        const defender = new Pokemon("Gholdengo")

        const urshifu = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Adamant",
          ability: new Ability("Unseen Fist"),
          teraType: "Water",
          moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const flutterMane = new Pokemon("Flutter Mane", {
          nature: "Modest",
          item: "Choice Specs",
          ability: new Ability("Protosynthesis"),
          moveSet: new MoveSet(new Move("Dazzling Gleam"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const target = new Target(urshifu, flutterMane)
        const field = new Field()

        const result = service.optimize(defender, [target], field)

        expect(result.sps!.hp).toBe(20)
        expect(result.sps!.def).toBe(8)
        expect(result.sps!.spd).toBe(0)
      })

      it("should optimize SPs for Farigiraf with Colbur Berry against Incineroar + Kingambit combined", () => {
        const defender = new Pokemon("Farigiraf", {
          nature: "Bold",
          item: "Colbur Berry"
        })

        const incineroar = new Pokemon("Incineroar", {
          nature: "Hardy",
          moveSet: new MoveSet(new Move("Throat Chop"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const kingambit = new Pokemon("Kingambit", {
          nature: "Hardy",
          item: "Chople Berry",
          moveSet: new MoveSet(new Move("Kowtow Cleave"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 0 }
        })

        const target = new Target(incineroar, kingambit)
        const field = new Field()

        const result = service.optimize(defender, [target], field)

        expect(result.sps!.hp).toBe(9)
        expect(result.sps!.def).toBe(30)
      })

      it("should optimize SPs for Ting-Lu with double attackers and single attackers", () => {
        const defender = new Pokemon("Ting-Lu", {
          nature: "Bold",
          item: "Clear Amulet",
          teraType: "Fairy",
          teraTypeActive: true
        })

        const urshifuRapidStrike = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Adamant",
          ability: new Ability("Unseen Fist"),
          moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const landorus = new Pokemon("Landorus", {
          nature: "Timid",
          item: "Life Orb",
          ability: new Ability("Sheer Force"),
          moveSet: new MoveSet(new Move("Sludge Bomb"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 15 }
        })

        const gholdengo = new Pokemon("Gholdengo", {
          nature: "Modest",
          item: "Choice Specs",
          moveSet: new MoveSet(new Move("Make It Rain"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 27 }
        })

        const chiYu = new Pokemon("Chi-Yu", {
          nature: "Bold",
          item: "Choice Specs",
          ability: new Ability("Beads of Ruin"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 4 }
        })

        const targets = [new Target(urshifuRapidStrike, landorus), new Target(gholdengo), new Target(chiYu)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(0)
        expect(result.sps!.def).toBe(0)
        expect(result.sps!.spd).toBe(18)
      })

      it("should optimize SPs for Flutter Mane against Landorus Earth Power/Moltres-Galar combined and Iron Hands/Rillaboom single", () => {
        const defender = new Pokemon("Flutter Mane", {
          nature: "Timid",
          item: "Booster Energy"
        })

        const landorus = new Pokemon("Landorus", {
          nature: "Modest",
          item: "Life Orb",
          ability: new Ability("Sheer Force"),
          moveSet: new MoveSet(new Move("Earth Power"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const moltresGalar = new Pokemon("Moltres-Galar", {
          nature: "Modest",
          ability: new Ability("Berserk"),
          moveSet: new MoveSet(new Move("Fiery Wrath"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 11 }
        })

        const ironHands = new Pokemon("Iron Hands", {
          nature: "Brave",
          item: "Assault Vest",
          moveSet: new MoveSet(new Move("Wild Charge"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 20 }
        })

        const rillaboom = new Pokemon("Rillaboom", {
          nature: "Adamant",
          item: "Assault Vest",
          ability: new Ability("Grassy Surge"),
          moveSet: new MoveSet(new Move("Wood Hammer"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 15 }
        })

        const targets = [new Target(landorus, moltresGalar), new Target(ironHands), new Target(rillaboom)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(31)
        expect(result.sps!.def).toBe(13)
        expect(result.sps!.spd).toBe(3)
      })

      it("should optimize SPs for Flutter Mane against Landorus Sludge Bomb/Moltres-Galar combined and Iron Hands/Rillaboom single", () => {
        const defender = new Pokemon("Flutter Mane", {
          nature: "Timid",
          item: "Booster Energy"
        })

        const landorus = new Pokemon("Landorus", {
          nature: "Modest",
          item: "Life Orb",
          ability: new Ability("Sheer Force"),
          moveSet: new MoveSet(new Move("Sludge Bomb"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const moltresGalar = new Pokemon("Moltres-Galar", {
          nature: "Modest",
          ability: new Ability("Berserk"),
          moveSet: new MoveSet(new Move("Fiery Wrath"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 11 }
        })

        const ironHands = new Pokemon("Iron Hands", {
          nature: "Brave",
          item: "Assault Vest",
          moveSet: new MoveSet(new Move("Wild Charge"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 20 }
        })

        const rillaboom = new Pokemon("Rillaboom", {
          nature: "Adamant",
          item: "Assault Vest",
          ability: new Ability("Grassy Surge"),
          moveSet: new MoveSet(new Move("Wood Hammer"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 15 }
        })

        const targets = [new Target(landorus, moltresGalar), new Target(ironHands), new Target(rillaboom)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(4)
        expect(result.sps!.def).toBe(31)
        expect(result.sps!.spd).toBe(0)
      })

      it("should optimize SPs for Flutter Mane against Landorus Sludge Bomb/Moltres-Galar combined and Iron Hands/Rillaboom single in Grassy Terrain", () => {
        const defender = new Pokemon("Flutter Mane", {
          nature: "Timid",
          item: "Booster Energy"
        })

        const landorus = new Pokemon("Landorus", {
          nature: "Modest",
          item: "Life Orb",
          ability: new Ability("Sheer Force"),
          moveSet: new MoveSet(new Move("Sludge Bomb"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const moltresGalar = new Pokemon("Moltres-Galar", {
          nature: "Modest",
          ability: new Ability("Berserk"),
          moveSet: new MoveSet(new Move("Fiery Wrath"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 11 }
        })

        const ironHands = new Pokemon("Iron Hands", {
          nature: "Brave",
          item: "Assault Vest",
          moveSet: new MoveSet(new Move("Wild Charge"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 20 }
        })

        const rillaboom = new Pokemon("Rillaboom", {
          nature: "Adamant",
          item: "Assault Vest",
          ability: new Ability("Grassy Surge"),
          moveSet: new MoveSet(new Move("Wood Hammer"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 15 }
        })

        const targets = [new Target(landorus, moltresGalar), new Target(ironHands), new Target(rillaboom)]
        const field = new Field({ terrain: "Grassy" })

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(1)
        expect(result.sps!.def).toBe(17)
        expect(result.sps!.spd).toBe(0)
      })

      it("should optimize SPs for Ting-Lu in it's limit", () => {
        const defender = new Pokemon("Ting-Lu", {
          nature: "Bold",
          item: "Clear Amulet",
          teraType: "Fairy",
          teraTypeActive: true
        })

        const urshifuRapidStrike = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Adamant",
          ability: new Ability("Unseen Fist"),
          moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const landorus = new Pokemon("Landorus", {
          nature: "Modest",
          item: "Life Orb",
          ability: new Ability("Sheer Force"),
          moveSet: new MoveSet(new Move("Sludge Bomb"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const okidogi = new Pokemon("Okidogi", {
          nature: "Adamant",
          item: "Choice Band",
          ability: new Ability("Guard Dog"),
          moveSet: new MoveSet(new Move("Gunk Shot"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const targets = [new Target(urshifuRapidStrike, landorus), new Target(okidogi)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(29)
        expect(result.sps!.def).toBe(24)
        expect(result.sps!.spd).toBe(7)
      })

      it("should optimize SPs for Gholdengo with multiple attackers including second special strongest optimization", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Calm",
          item: "Choice Specs",
          teraType: "Fairy"
        })

        const gholdengoAttacker = new Pokemon("Gholdengo", {
          nature: "Modest",
          item: "Choice Specs",
          moveSet: new MoveSet(new Move("Make It Rain"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 27 }
        })

        const chiYu = new Pokemon("Chi-Yu", {
          nature: "Bold",
          item: "Choice Specs",
          ability: new Ability("Beads of Ruin"),
          moveSet: new MoveSet(new Move("Heat Wave"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 4 }
        })

        const landorus1 = new Pokemon("Landorus", {
          nature: "Timid",
          ability: new Ability("Sheer Force"),
          moveSet: new MoveSet(new Move("Earth Power"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const urshifu = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Adamant",
          ability: new Ability("Unseen Fist"),
          moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const arcanine = new Pokemon("Arcanine", {
          nature: "Jolly",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Flare Blitz"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 30 }
        })

        const rillaboom1 = new Pokemon("Rillaboom", {
          nature: "Adamant",
          item: "Choice Band",
          ability: new Ability("Grassy Surge"),
          moveSet: new MoveSet(new Move("High Horsepower"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const landorus2 = new Pokemon("Landorus", {
          nature: "Timid",
          ability: new Ability("Sheer Force"),
          moveSet: new MoveSet(new Move("Earth Power"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 25 }
        })

        const rillaboom2 = new Pokemon("Rillaboom", {
          nature: "Adamant",
          item: "Choice Band",
          ability: new Ability("Grassy Surge"),
          moveSet: new MoveSet(new Move("High Horsepower"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const targets = [new Target(gholdengoAttacker), new Target(chiYu), new Target(landorus1), new Target(urshifu), new Target(arcanine), new Target(rillaboom1), new Target(landorus2), new Target(rillaboom2)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(31)
        expect(result.sps!.def).toBe(20)
        expect(result.sps!.spd).toBe(14)
      })

      it("should optimize SPs for Gholdengo with multiple attackers including second physical strongest optimization", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Calm",
          item: "Choice Specs",
          teraType: "Fairy"
        })

        const arcanineHisuiAdamant = new Pokemon("Arcanine-Hisui", {
          nature: "Adamant",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Flare Blitz"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 27 }
        })

        const arcanineHisuiModest = new Pokemon("Arcanine-Hisui", {
          nature: "Modest",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Flare Blitz"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 27 }
        })

        const charizard = new Pokemon("Charizard", {
          nature: "Timid",
          ability: new Ability("Solar Power"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const heatran = new Pokemon("Heatran", {
          nature: "Modest",
          item: "Leftovers",
          ability: new Ability("Flash Fire"),
          moveSet: new MoveSet(new Move("Magma Storm"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 16 }
        })

        const targets = [new Target(arcanineHisuiAdamant), new Target(arcanineHisuiModest), new Target(charizard), new Target(heatran)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(31)
        expect(result.sps!.def).toBe(7)
        expect(result.sps!.spd).toBe(23)
      })

      it("should optimize SPs for Gholdengo without updating nature (keeping Bold)", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Bold",
          item: "Choice Specs",
          teraType: "Fairy"
        })

        const charizard = new Pokemon("Charizard", {
          nature: "Modest",
          ability: new Ability("Solar Power"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 28 }
        })

        const arcanineHisui = new Pokemon("Arcanine-Hisui", {
          nature: "Adamant",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Flare Blitz"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 26 }
        })

        const heatran = new Pokemon("Heatran", {
          nature: "Bold",
          item: "Leftovers",
          ability: new Ability("Flash Fire"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 22 }
        })

        const targets = [new Target(charizard), new Target(arcanineHisui), new Target(heatran)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(21)
        expect(result.sps!.def).toBe(27)
        expect(result.sps!.spd).toBe(0)
        expect(result.nature).toBeNull()
      })

      it("should optimize SPs for Gholdengo when not surviving double attackers but surviving special attacker", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Jolly",
          item: "Choice Specs"
        })

        const charizard = new Pokemon("Charizard", {
          nature: "Modest",
          ability: new Ability("Solar Power"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 28 }
        })

        const arcanine = new Pokemon("Arcanine", {
          nature: "Jolly",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Flare Blitz"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 30 }
        })

        const heatran = new Pokemon("Heatran", {
          nature: "Modest",
          item: "Leftovers",
          ability: new Ability("Flash Fire"),
          moveSet: new MoveSet(new Move("Fire Blast"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 2 }
        })

        const targets = [new Target(arcanine, charizard), new Target(heatran)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(15)
        expect(result.sps!.def).toBe(0)
        expect(result.sps!.spd).toBe(29)
      })

      it("should optimize SPs for Gholdengo when not surviving double attackers but surviving physical attacker", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Jolly",
          item: "Choice Specs",
          teraType: "Fairy"
        })

        const charizard = new Pokemon("Charizard", {
          nature: "Modest",
          ability: new Ability("Solar Power"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 28 }
        })

        const arcanine = new Pokemon("Arcanine", {
          nature: "Jolly",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Flare Blitz"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 30 }
        })

        const targets = [new Target(arcanine, charizard), new Target(arcanine)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.sps!.hp).toBe(15)
        expect(result.sps!.def).toBe(31)
        expect(result.sps!.spd).toBe(0)
      })

      it("should protect against a combined Assurance doubled by the faster ally", () => {
        const defender = new Pokemon("Amoonguss", { nature: "Bold" })

        const flutterMane = new Pokemon("Flutter Mane", {
          nature: "Timid",
          moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32, spe: 32 }
        })

        const kingambit = new Pokemon("Kingambit", {
          nature: "Adamant",
          moveSet: new MoveSet(new Move("Assurance"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const targets = [new Target(flutterMane, kingambit)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).not.toBeNull()

        const optimized = defender.clone({ sps: result.sps!, nature: result.nature ?? defender.nature })
        const combined = new DamageCalc().calcDamageForTwoAttackers(flutterMane, kingambit, optimized, field)

        expect(combined.description).toContain("Assurance (120 BP)")
        expect(combined.koChance).toEqual("guaranteed 2HKO")
      })
    })

    describe("trick room", () => {
      const slowAttacker = () =>
        new Pokemon("Torkoal", {
          nature: "Modest",
          moveSet: new MoveSet(new Move("Lava Plume"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

      const fastAttacker = () =>
        new Pokemon("Chi-Yu", {
          nature: "Timid",
          moveSet: new MoveSet(new Move("Incinerate"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32, spe: 32 }
        })

      it("should require a different spread under Trick Room because the resist berry absorbs the other attacker", () => {
        const defender = new Pokemon("Amoonguss", { nature: "Bold", item: "Occa Berry" })
        const targets = [new Target(slowAttacker(), fastAttacker())]

        const outsideTrickRoom = service.optimize(defender, targets, new Field())
        const insideTrickRoom = service.optimize(defender, targets, new Field({ isTrickRoom: true }))

        expect(outsideTrickRoom.status).toBe("success")
        expect(outsideTrickRoom.sps!.hp).toBe(1)
        expect(outsideTrickRoom.sps!.spd).toBe(24)

        expect(insideTrickRoom.status).toBe("success")
        expect(insideTrickRoom.sps!.hp).toBe(0)
        expect(insideTrickRoom.sps!.spd).toBe(23)
      })

      it("should optimize against the slower attacker hitting first under Trick Room", () => {
        const defender = new Pokemon("Amoonguss", { nature: "Bold", item: "Occa Berry" })
        const field = new Field({ isTrickRoom: true })
        const targets = [new Target(slowAttacker(), fastAttacker())]

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).not.toBeNull()

        const optimized = defender.clone({ sps: result.sps!, nature: result.nature ?? defender.nature })
        const combined = new DamageCalc().calcDamageForTwoAttackers(slowAttacker(), fastAttacker(), optimized, field)

        expect(combined.attacker.name).toEqual("Torkoal")
        expect(combined.secondAttacker!.name).toEqual("Chi-Yu")
        expect(combined.result).toEqual("83 - 99.4%")
        expect(combined.koChance).toEqual("guaranteed 2HKO")
      })

      it("should only reduce the KO chance without the resist berry regardless of Trick Room", () => {
        const defender = new Pokemon("Amoonguss", { nature: "Bold", item: "Leftovers" })
        const targets = [new Target(slowAttacker(), fastAttacker())]

        const outsideTrickRoom = service.optimize(defender, targets, new Field())
        const insideTrickRoom = service.optimize(defender, targets, new Field({ isTrickRoom: true }))

        expect(outsideTrickRoom).toEqual({
          sps: { hp: 32, atk: 0, def: 0, spa: 0, spd: 32, spe: 0 },
          nature: null,
          status: "best-effort",
          koChance: 0.265625,
          coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Torkoal + Chi-Yu", bestTargetKoChance: 0.265625 }
        })
        expect(insideTrickRoom).toEqual({
          sps: { hp: 32, atk: 0, def: 0, spa: 0, spd: 32, spe: 0 },
          nature: null,
          status: "best-effort",
          koChance: 0.265625,
          coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Torkoal + Chi-Yu", bestTargetKoChance: 0.265625 }
        })
      })
    })

    describe("nature optimization", () => {
      it("should optimize SPs for Gholdengo with update nature enabled (switching to Calm)", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Bold",
          item: "Choice Specs",
          teraType: "Fairy"
        })

        const charizard = new Pokemon("Charizard", {
          nature: "Modest",
          ability: new Ability("Solar Power"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 28 }
        })

        const arcanineHisui = new Pokemon("Arcanine-Hisui", {
          nature: "Adamant",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Flare Blitz"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 26 }
        })

        const heatran = new Pokemon("Heatran", {
          nature: "Bold",
          item: "Leftovers",
          ability: new Ability("Flash Fire"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 22 }
        })

        const targets = [new Target(charizard), new Target(arcanineHisui), new Target(heatran)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true, false, 2)

        expect(result.sps!.hp).toBe(31)
        expect(result.sps!.def).toBe(0)
        expect(result.sps!.spd).toBe(32)
        expect(result.nature).toBe("Calm")
      })

      it("should propose no investment without changing the nature when no spread avoids the KO with update nature enabled", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Modest"
        })

        const attacker = new Pokemon("Heatran", {
          nature: "Modest",
          teraType: "Fire",
          teraTypeActive: true,
          item: "Choice Specs",
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 2 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result).toEqual({ sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, nature: null, status: "impossible", coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Heatran", bestTargetKoChance: 1 } })
      })

      it("should propose no investment when no spread avoids the KO even when the user pass sps as parameter", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Modest",
          sps: { hp: 32, spd: 32 }
        })

        const attacker = new Pokemon("Heatran", {
          nature: "Modest",
          teraType: "Fire",
          teraTypeActive: true,
          item: "Choice Specs",
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 2 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result).toEqual({ sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, nature: null, status: "impossible", coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Heatran", bestTargetKoChance: 1 } })
      })
    })

    describe("reserved offensive SPs shrink the search budget", () => {
      it("should treat a threat the remaining budget cannot protect as a lost cause instead of failing", () => {
        const defender = new Pokemon("Porygon2", { nature: "Calm", item: "Leftovers", sps: { hp: 0, atk: 0, def: 0, spa: 20, spd: 0, spe: 0 } })
        const miraidon = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", item: "Life Orb", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 16 } })

        const result = service.optimize(defender, [new Target(miraidon), new Target(chiYu)], new Field(), false, true, 2, 15, true)

        expect(result.status).toBe("not-needed")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 20, spd: 0, spe: 0 })
      })

      it("should protect the threats that fit in the remaining budget when the full spread does not", () => {
        const defender = new Pokemon("Umbreon", { nature: "Bold", item: "Assault Vest", sps: { hp: 0, atk: 0, def: 0, spa: 32, spd: 0, spe: 0 } })
        const greatTusk = new Pokemon("Great Tusk", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const kingambit = new Pokemon("Kingambit", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Kowtow Cleave"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const chienPao = new Pokemon("Chien-Pao", { nature: "Jolly", moveSet: new MoveSet(new Move("Ice Spinner"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const targets = [new Target(greatTusk), new Target(kingambit), new Target(chienPao)]

        const result = service.optimize(defender, targets, new Field(), false, true, 3, 15, true)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 1, atk: 0, def: 2, spa: 32, spd: 0, spe: 0 })
        expect(result.sps!.hp + result.sps!.def + result.sps!.spd + result.sps!.spa).toBeLessThanOrEqual(66)
      })
    })

    describe("reserved offensive SPs overflow the budget via optimize", () => {
      it("should keep only the reserved offensive SPs when they exceed the SP budget with a double target", () => {
        const defender = new Pokemon("Snorlax", { nature: "Bold", sps: { atk: 32, spa: 32, spe: 1 } })

        const chienPao = new Pokemon("Chien-Pao", { nature: "Adamant", moveSet: new MoveSet(new Move("Ice Spinner"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Adamant", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const weavile = new Pokemon("Weavile", { nature: "Adamant", moveSet: new MoveSet(new Move("Ice Punch"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const rotomHeat = new Pokemon("Rotom-Heat", { nature: "Adamant", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })

        const result = service.optimize(defender, [new Target(chienPao), new Target(chiYu), new Target(weavile, rotomHeat)], new Field(), false, true, 3, 15, true)

        expect(result).toEqual({ sps: { hp: 0, atk: 32, def: 0, spa: 32, spd: 0, spe: 1 }, nature: null, status: "impossible", coverage: { covered: 0, total: 3, outOfReach: 3, bestTargetName: "Chien-Pao", bestTargetKoChance: 1 } })
      })

      it("should keep only the reserved offensive SPs when they exceed the SP budget with single targets", () => {
        const defender = new Pokemon("Snorlax", { nature: "Bold", sps: { atk: 32, spa: 32, spe: 1 } })

        const chienPao = new Pokemon("Chien-Pao", { nature: "Adamant", moveSet: new MoveSet(new Move("Ice Spinner"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Adamant", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })

        const result = service.optimize(defender, [new Target(chienPao), new Target(chiYu)], new Field(), false, true, 3, 15, true)

        expect(result).toEqual({ sps: { hp: 0, atk: 32, def: 0, spa: 32, spd: 0, spe: 1 }, nature: null, status: "impossible", coverage: { covered: 0, total: 2, outOfReach: 2, bestTargetName: "Chien-Pao", bestTargetKoChance: 1 } })
      })
    })

    describe("budget conflict degradation via optimize", () => {
      const ivCB180 = () => new Pokemon("Iron Valiant", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")), sps: { atk: 23 } })
      const fmTera60 = () => new Pokemon("Flutter Mane", { nature: "Modest", item: "Choice Specs", teraType: "Fairy", teraTypeActive: true, moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), sps: { spa: 8 } })

      it("should protect the physical side when both categories cannot fit the SP budget", () => {
        const result = service.optimize(new Pokemon("Ting-Lu"), [new Target(ivCB180()), new Target(fmTera60())], new Field())

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 31, atk: 0, def: 30, spa: 0, spd: 0, spe: 0 })
      })

      it("should prioritize the special side when its partial solution carries more hp", () => {
        const ivLO = new Pokemon("Iron Valiant", { nature: "Adamant", item: "Life Orb", moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })

        const result = service.optimize(new Pokemon("Ting-Lu"), [new Target(ivLO), new Target(fmTera60())], new Field())

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 8, atk: 0, def: 32, spa: 0, spd: 0, spe: 0 })
      })

      it("should fall back to the second strongest special attacker when the strongest cannot fit", () => {
        const ragingBolt = new Pokemon("Raging Bolt", { nature: "Modest", moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })

        const result = service.optimize(new Pokemon("Ting-Lu"), [new Target(ivCB180()), new Target(fmTera60()), new Target(ragingBolt)], new Field())

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 31, atk: 0, def: 30, spa: 0, spd: 0, spe: 0 })
      })

      it("should combine a double target with conflicting singles", () => {
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const moltresGalar = new Pokemon("Moltres-Galar", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Fiery Wrath"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })

        const result = service.optimize(new Pokemon("Ting-Lu"), [new Target(ivCB180()), new Target(fmTera60()), new Target(chiYu, moltresGalar)], new Field())

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 31, atk: 0, def: 0, spa: 0, spd: 32, spe: 0 })
      })
    })

    describe("refinement with residual burn damage on a double target via optimize", () => {
      it("should protect the burned singles and abandon a double that only survives above the legal SP budget", () => {
        const ironValiant = new Pokemon("Iron Valiant", { nature: "Adamant", moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")), sps: { atk: 0 } })
        const flutterMane = new Pokemon("Flutter Mane", { nature: "Modest", moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), sps: { spa: 0 } })
        const garchomp = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const volcarona = new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Fiery Dance"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Incineroar", { status: Status.BURN })

        const result = service.optimize(defender, [new Target(ironValiant), new Target(flutterMane), new Target(garchomp, volcarona)], new Field(), false, false, 2)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 32, atk: 0, def: 32, spa: 0, spd: 2, spe: 0 })
      })
    })

    describe("residual badly poison damage growing between turns", () => {
      const scaldMilotic = () => new Pokemon("Milotic", { nature: "Modest", moveSet: new MoveSet(new Move("Scald"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
      const grassyGlideRillaboom = () => new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })

      it("should spend nearly the whole budget to survive three hits once the toxic damage ramps up", () => {
        const healthy = service.optimize(new Pokemon("Ting-Lu"), [new Target(scaldMilotic())], new Field(), false, false, 3)
        const badlyPoisoned = service.optimize(new Pokemon("Ting-Lu", { status: Status.BADLY_POISON }), [new Target(scaldMilotic())], new Field(), false, false, 3)

        expect(healthy.status).toBe("success")
        expect(healthy.sps).toEqual({ hp: 3, atk: 0, def: 0, spa: 0, spd: 16, spe: 0 })

        expect(badlyPoisoned.status).toBe("success")
        expect(badlyPoisoned.sps).toEqual({ hp: 24, atk: 0, def: 0, spa: 0, spd: 30, spe: 0 })
      })

      it("should stay free of investment while the toxic counter is still small", () => {
        const badlyPoisoned = service.optimize(new Pokemon("Snorlax", { status: Status.BADLY_POISON }), [new Target(grassyGlideRillaboom())], new Field(), false, false, 3)

        expect(badlyPoisoned.status).toBe("not-needed")
      })

      it("should cost less than a flat poison over two turns and more over three", () => {
        const suckerPunchChienPao = () => new Pokemon("Chien-Pao", { nature: "Jolly", moveSet: new MoveSet(new Move("Sucker Punch"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })

        const poisoned = service.optimize(new Pokemon("Snorlax", { status: Status.POISON }), [new Target(suckerPunchChienPao())], new Field(), false, false, 3)
        const badlyPoisoned = service.optimize(new Pokemon("Snorlax", { status: Status.BADLY_POISON }), [new Target(suckerPunchChienPao())], new Field(), false, false, 3)

        expect(poisoned.sps).toEqual({ hp: 12, atk: 0, def: 31, spa: 0, spd: 0, spe: 0 })
        expect(badlyPoisoned.sps).toEqual({ hp: 2, atk: 0, def: 26, spa: 0, spd: 0, spe: 0 })
      })
    })

    describe("refinement with residual recovery via optimize", () => {
      it("should trim and rebalance the spread when the KO chance involves Leftovers recovery", () => {
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 16 } })
        const flutterMane = new Pokemon("Flutter Mane", { nature: "Modest", moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), sps: { spa: 0 } })
        const defender = new Pokemon("Ting-Lu", { item: "Leftovers" })

        const result = service.optimize(defender, [new Target(ursaluna), new Target(flutterMane)], new Field(), false, false, 3)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 12, atk: 0, def: 0, spa: 0, spd: 27, spe: 0 })
      })
    })

    describe("impossible single attacker with survivable double target via optimize", () => {
      it("should protect the survivable double and treat the unsurvivable single attacker as a lost cause", () => {
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Dark Pulse"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const moltresGalar = new Pokemon("Moltres-Galar", { nature: "Modest", moveSet: new MoveSet(new Move("Fiery Wrath"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Ting-Lu", { status: Status.BURN })

        const result = service.optimize(defender, [new Target(ursaluna), new Target(chiYu, moltresGalar)], new Field(), false, false, 3)

        expect(result.status).toBe("not-needed")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should invest for the survivable special attacker when the physical attacker is impossible", () => {
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const flutterMane = new Pokemon("Flutter Mane", { nature: "Modest", moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), sps: { spa: 0 } })

        const result = service.optimize(new Pokemon("Ting-Lu"), [new Target(ursaluna), new Target(flutterMane)], new Field(), false, false, 3)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 23, atk: 0, def: 0, spa: 0, spd: 30, spe: 0 })
      })

      it("should protect a survivable attacker even when a second attacker is impossible only by the KO-chance criterion", () => {
        const urshifu = new Pokemon("Urshifu-Rapid-Strike", { nature: "Adamant", item: "Choice Scarf", moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const garchomp = new Pokemon("Garchomp", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const defender = new Pokemon("Ting-Lu", { item: "Figy Berry", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")) })
        const field = new Field({ weather: "Sun" })

        const alone = service.optimize(defender, [new Target(garchomp)], field, false, false, 4, 15, true)

        expect(alone.status).toBe("success")

        const result = service.optimize(defender, [new Target(urshifu), new Target(garchomp)], field, false, false, 4, 15, true)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual(alone.sps)
      })
    })

    describe("nothing to protect against", () => {
      const zeroSps = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      const investedSps = { hp: 32, atk: 0, def: 1, spa: 0, spd: 32, spe: 0 }
      const statusOnlyAttacker = () => new Pokemon("Amoonguss", { moveSet: new MoveSet(new Move("Spore"), new Move(""), new Move(""), new Move("")) })

      it("should report not-needed when there are no targets and no defensive SPs are invested", () => {
        const result = service.optimize(new Pokemon("Ting-Lu", { sps: zeroSps }), [], new Field())

        expect(result.status).toBe("not-needed")
        expect(result.sps).toEqual(zeroSps)
      })

      it("should report not-needed when the only attacker cannot deal damage", () => {
        const result = service.optimize(new Pokemon("Ting-Lu", { sps: zeroSps }), [new Target(statusOnlyAttacker())], new Field())

        expect(result.status).toBe("not-needed")
        expect(result.sps).toEqual(zeroSps)
      })

      it("should keep the invested defensive SPs untouched when there is nothing to protect against", () => {
        const result = service.optimize(new Pokemon("Ting-Lu", { sps: investedSps }), [new Target(statusOnlyAttacker())], new Field())

        expect(result.status).toBe("success")
        expect(result.sps).toEqual(investedSps)
      })
    })

    describe("immune attackers via optimize", () => {
      it("should return not-needed when the only attacker deals no damage", () => {
        const landorus = new Pokemon("Landorus-Therian", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const defender = new Pokemon("Rotom-Wash", { ability: new Ability("Levitate") })

        const result = service.optimize(defender, [new Target(landorus)], new Field())

        expect(result.status).toBe("not-needed")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should ignore an immune attacker and optimize for the remaining ones", () => {
        const landorus = new Pokemon("Landorus-Therian", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const urshifu = new Pokemon("Urshifu-Rapid-Strike", { nature: "Adamant", moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const defender = new Pokemon("Rotom-Wash", { ability: new Ability("Levitate") })

        const result = service.optimize(defender, [new Target(landorus), new Target(urshifu)], new Field())

        expect(result.status).toBe("not-needed")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })
    })

    describe("field side orientation via optimize", () => {
      it("should swap field sides when rightIsDefender is false", () => {
        const groudon = () => new Pokemon("Groudon", { nature: "Adamant", moveSet: new MoveSet(new Move("Precipice Blades"), new Move(""), new Move(""), new Move("")), sps: { atk: 32, spe: 32 } })
        const field = () => new Field({ attackerSide: new FieldSide({ isReflect: true }) })

        const resultRight = service.optimize(new Pokemon("Flutter Mane"), [new Target(groudon())], field(), false, false, 2, 15, true)
        const resultLeft = service.optimize(new Pokemon("Flutter Mane"), [new Target(groudon())], field(), false, false, 2, 15, false)

        expect(resultRight.status).toBe("success")
        expect(resultRight.sps).toEqual({ hp: 1, atk: 0, def: 27, spa: 0, spd: 0, spe: 0 })
        expect(resultLeft.status).toBe("not-needed")
        expect(resultLeft.sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })
    })

    describe("constraints", () => {
      it("should propose only the reserved offensive SPs when the remaining budget cannot help with keepOffensiveSps", () => {
        const defender = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Adamant",
          sps: { atk: 32, spe: 32 }
        })

        const attacker = new Pokemon("Flutter Mane", {
          nature: "Timid",
          moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, true, 2)

        expect(result).toEqual({ sps: { hp: 0, atk: 32, def: 0, spa: 0, spd: 0, spe: 32 }, nature: null, status: "impossible", coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Flutter Mane", bestTargetKoChance: 1 } })
      })

      it("should propose no investment with zero offensive SPs when keepOffensiveSps is false", () => {
        const defender = new Pokemon("Ting-Lu", {
          nature: "Bold"
        })

        const attacker = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Adamant",
          teraType: "Water",
          teraTypeActive: true,
          ability: new Ability("Unseen Fist"),
          item: "Choice Band",
          moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 },
          boosts: { atk: 6 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result).toEqual({ sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, nature: null, status: "impossible", coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Urshifu-Rapid-Strike", bestTargetKoChance: 1 } })
      })

      it("should propose no investment when cannot survive", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Bold",
          item: "Leftovers",
          teraType: "Fairy",
          teraTypeActive: true
        })

        const urshifu = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Jolly",
          moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const landorus = new Pokemon("Landorus-Therian", {
          nature: "Jolly",
          moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 15 }
        })

        const target = new Target(urshifu, landorus)
        const field = new Field()

        const result = service.optimize(defender, [target], field, false, false, 3)

        expect(result).toEqual({
          sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
          nature: null,
          status: "impossible",
          coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Urshifu-Rapid-Strike + Landorus-Therian", bestTargetKoChance: 1 }
        })
      })
    })

    describe("multi-hit survival", () => {
      describe("fixed nature", () => {
        it("should optimize SPs when have residual damage and 2HKO configured", () => {
          const defender = new Pokemon("Flutter Mane", {
            sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Modest",
            item: "Choice Specs",
            moveSet: new MoveSet(new Move("Magma Storm"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
            sps: { hp: 0, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()

          const result = service.optimize(defender, targets, field)

          expect(result.sps!.hp).toBe(12)
          expect(result.sps!.def).toBe(0)
          expect(result.sps!.spd).toBe(6)
        })

        it("should optimize SPs when have residual damage and 3HKO configured", () => {
          const defender = new Pokemon("Landorus", {
            sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Adamant",
            moveSet: new MoveSet(new Move("Magma Storm"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
            sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 32 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()

          const result = service.optimize(defender, targets, field, false, false, 3)

          expect(result.sps!.hp).toBe(23)
          expect(result.sps!.def).toBe(0)
          expect(result.sps!.spd).toBe(30)
        })

        it("should optimize SPs when have residual damage and 4HKO configured", () => {
          const defender = new Pokemon("Landorus", {
            sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Adamant",
            boosts: { hp: 0, atk: 0, def: 0, spa: -2, spd: 0, spe: 0 },
            moveSet: new MoveSet(new Move("Magma Storm"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
            sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 32 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()

          const result = service.optimize(defender, targets, field, false, false, 4)

          expect(result.sps!.hp).toBe(11)
          expect(result.sps!.def).toBe(0)
          expect(result.sps!.spd).toBe(23)
        })

        it("should optimize SPs when have residual damage and 3HKO configured but have recovery with precendence", () => {
          const defender = new Pokemon("Gholdengo", {
            sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
            nature: "Bold",
            status: Status.BURN,
            item: "Leftovers",
            teraType: "Fairy",
            teraTypeActive: true
          })

          const attacker = new Pokemon("Landorus-Therian", {
            nature: "Adamant",
            item: "Life Orb",
            moveSet: new MoveSet(new Move("Stomping Tantrum"), new Move("Rock Slide"), new Move("Earthquake"), new Move("Protect")),
            sps: { hp: 0, atk: 32, def: 0, spa: 0, spd: 0, spe: 32 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()

          const result = service.optimize(defender, targets, field, false, false, 3)

          expect(result.sps!.hp).toBe(21)
          expect(result.sps!.def).toBe(26)
          expect(result.sps!.spd).toBe(0)
        })
      })

      describe("with nature update", () => {
        it("should optimize SPs when have residual damage and 2HKO configured and update nature", () => {
          const defender = new Pokemon("Flutter Mane", {
            sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Modest",
            item: "Choice Specs",
            moveSet: new MoveSet(new Move("Magma Storm"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
            sps: { hp: 0, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()
          const updateNature = true

          const result = service.optimize(defender, targets, field, updateNature)

          expect(result.sps!.hp).toBe(5)
          expect(result.sps!.def).toBe(0)
          expect(result.sps!.spd).toBe(0)
        })

        it("should optimize SPs when have residual damage and 3HKO configured and update nature", () => {
          const defender = new Pokemon("Landorus", {
            sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Adamant",
            moveSet: new MoveSet(new Move("Magma Storm"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
            sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 32 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()
          const updateNature = true

          const result = service.optimize(defender, targets, field, updateNature, false, 3)

          expect(result.sps!.hp).toBe(3)
          expect(result.sps!.def).toBe(0)
          expect(result.sps!.spd).toBe(32)
        })

        it("should optimize SPs when have residual damage and 4HKO configured and update nature", () => {
          const defender = new Pokemon("Landorus", {
            sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Adamant",
            boosts: { hp: 0, atk: 0, def: 0, spa: -2, spd: 0, spe: 0 },
            moveSet: new MoveSet(new Move("Magma Storm"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
            sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 32 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()
          const updateNature = true

          const result = service.optimize(defender, targets, field, updateNature, false, 4)

          expect(result.sps!.hp).toBe(11)
          expect(result.sps!.def).toBe(0)
          expect(result.sps!.spd).toBe(12)
        })
      })
    })

    describe("recovery scenarios (leftovers)", () => {
      describe("3 hits", () => {
        it("should optimize SPs when have recovery and 3HKO configured", () => {
          const defender = new Pokemon("Landorus", {
            item: "Leftovers"
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Adamant",
            moveSet: new MoveSet(new Move("Magma Storm"), new Move(""), new Move(""), new Move("")),
            sps: { spa: 0 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()

          const result = service.optimize(defender, targets, field, false, false, 3)

          expect(result.sps!.hp).toBe(3)
          expect(result.sps!.def).toBe(0)
          expect(result.sps!.spd).toBe(24)
        })

        it("should optimize SPs when have Leech Seed in defender side and 3HKO configured", () => {
          const defender = new Pokemon("Flutter Mane", {
            nature: "Bold"
          })

          const attacker = new Pokemon("Urshifu-Rapid-Strike", {
            nature: "Calm",
            moveSet: new MoveSet(new Move("Aqua Jet"), new Move("Close Combat"), new Move("Surging Strikes"), new Move("Protect")),
            sps: { atk: 32 }
          })

          const targets = [new Target(attacker)]
          const field = new Field({ defenderSide: new FieldSide({ isSeeded: true }) })

          const result = service.optimize(defender, targets, field, false, false, 3)

          expect(result.sps!.hp).toBe(1)
          expect(result.sps!.def).toBe(7)
          expect(result.sps!.spd).toBe(0)
        })

        it("should optimize SPs when have recovery and 3HKO configured and update nature", () => {
          const defender = new Pokemon("Landorus", {
            item: "Leftovers"
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Adamant",
            moveSet: new MoveSet(new Move("Magma Storm"), new Move(""), new Move(""), new Move("")),
            sps: { spa: 0 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()
          const updateNature = true

          const result = service.optimize(defender, targets, field, updateNature, false, 3)

          expect(result.sps!.hp).toBe(3)
          expect(result.sps!.def).toBe(0)
          expect(result.sps!.spd).toBe(13)
        })

        it("should optimize SPs for single physical attacker against Rillaboom with recovery from Leftovers and Grass terrain", () => {
          const defender = new Pokemon("Rillaboom", {
            nature: "Bold",
            item: "Leftovers",
            ability: new Ability("Grassy Surge")
          })

          const attacker = new Pokemon("Urshifu-Rapid-Strike", {
            nature: "Adamant",
            moveSet: new MoveSet(new Move("U-turn"), new Move("Surging Strikes"), new Move("Aqua Jet"), new Move("Detect")),
            sps: { atk: 3 }
          })

          const targets = [new Target(attacker)]
          const field = new Field({ terrain: "Grassy" })

          const result = service.optimize(defender, targets, field, false, false, 4)

          expect(result.sps!.hp).toBe(4)
          expect(result.sps!.def).toBe(21)
          expect(result.sps!.spd).toBe(0)
        })
      })

      describe("4 hits", () => {
        it("should optimize SPs when have recovery and 4HKO configured", () => {
          const defender = new Pokemon("Landorus", {
            item: "Leftovers"
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Adamant",
            boosts: { spa: -2 },
            moveSet: new MoveSet(new Move("Magma Storm"), new Move(""), new Move(""), new Move("")),
            sps: { spa: 0 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()

          const result = service.optimize(defender, targets, field, false, false, 4)

          expect(result.sps!.hp).toBe(2)
          expect(result.sps!.def).toBe(0)
          expect(result.sps!.spd).toBe(2)
        })

        it("should optimize SPs when have recovery and 4HKO configured and update nature", () => {
          const defender = new Pokemon("Landorus", {
            item: "Leftovers"
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Adamant",
            boosts: { spa: -1 },
            moveSet: new MoveSet(new Move("Magma Storm"), new Move(""), new Move(""), new Move("")),
            sps: { spa: 0 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()
          const updateNature = true

          const result = service.optimize(defender, targets, field, updateNature, false, 4)

          expect(result.sps!.hp).toBe(2)
          expect(result.sps!.def).toBe(0)
          expect(result.sps!.spd).toBe(25)
        })
      })
    })

    describe("double attackers with residual and recovery", () => {
      it("should optimize SPs for physical attackers pair", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Modest",
          item: "Leftovers",
          teraType: "Fairy",
          teraTypeActive: true
        })

        const urshifu = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Adamant",
          moveSet: new MoveSet(new Move("Aqua Jet"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const landorus = new Pokemon("Landorus-Therian", {
          nature: "Adamant",
          item: "Choice Band",
          moveSet: new MoveSet(new Move("Rock Slide"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const target = new Target(urshifu, landorus)
        const field = new Field()

        const result = service.optimize(defender, [target], field, false, false, 3)

        expect(result.sps!.hp).toBe(13)
        expect(result.sps!.def).toBe(32)
        expect(result.sps!.spd).toBe(0)
      })

      it("should optimize SPs for special attackers pair", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Modest",
          item: "Leftovers",
          teraType: "Fairy",
          teraTypeActive: true
        })

        const flutterMane = new Pokemon("Flutter Mane", {
          nature: "Timid",
          moveSet: new MoveSet(new Move("Dazzling Gleam"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 0 }
        })

        const landorus = new Pokemon("Landorus", {
          nature: "Timid",
          ability: new Ability("Sand Force"),
          moveSet: new MoveSet(new Move("Extrasensory"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 0 }
        })

        const target = new Target(flutterMane, landorus)
        const field = new Field()

        const result = service.optimize(defender, [target], field, false, false, 3)

        expect(result.sps!.hp).toBe(1)
        expect(result.sps!.def).toBe(0)
        expect(result.sps!.spd).toBe(19)
      })

      it("should optimize SPs for mixed attackers pair", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Modest",
          item: "Leftovers",
          teraType: "Fairy",
          teraTypeActive: true
        })

        const urshifu = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Jolly",
          ability: new Ability("Unseen Fist"),
          moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 0 }
        })

        const flutterMane = new Pokemon("Flutter Mane", {
          nature: "Timid",
          ability: new Ability("Protosynthesis"),
          moveSet: new MoveSet(new Move("Dazzling Gleam"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 0 }
        })

        const target = new Target(urshifu, flutterMane)
        const field = new Field()

        const result = service.optimize(defender, [target], field, false, false, 3)

        expect(result.sps!.hp).toBe(31)
        expect(result.sps!.def).toBe(2)
        expect(result.sps!.spd).toBe(11)
      })
    })
    describe("optimization status", () => {
      it("should propose no investment when no spread avoids the KO", () => {
        const defender = new Pokemon("Sunkern")

        const attacker = new Pokemon("Deoxys-Attack", {
          nature: "Adamant",
          item: "Choice Band",
          moveSet: new MoveSet(new Move("Psycho Boost"), new Move(""), new Move(""), new Move("")),
          sps: { atk: 32 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result).toEqual({ sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, nature: null, status: "impossible", coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Deoxys-Attack", bestTargetKoChance: 1 } })
      })

      it("should return zeroed SPs when the only unprotected attacker is impossible and the others need no SPs", () => {
        const defender = new Pokemon("Tyranitar-Mega", {
          nature: "Bold",
          item: "Tyranitarite"
        })

        const sneasler = new Pokemon("Sneasler", {
          nature: "Adamant",
          item: "Electric Seed",
          ability: new Ability("Unburden"),
          moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")),
          sps: { hp: 29, atk: 20, def: 1, spd: 1, spe: 15 }
        })

        const basculegion = new Pokemon("Basculegion", {
          nature: "Adamant",
          item: "Sitrus Berry",
          ability: new Ability("Swift Swim"),
          moveSet: new MoveSet(new Move("Wave Crash"), new Move(""), new Move(""), new Move("")),
          sps: { hp: 13, atk: 32, def: 4, spd: 3, spe: 14 }
        })

        const rotomMow = new Pokemon("Rotom-Mow", {
          nature: "Timid",
          item: "Choice Scarf",
          ability: new Ability("Levitate"),
          moveSet: new MoveSet(new Move("Leaf Storm"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32, spd: 1, spe: 32 }
        })

        const targets = [new Target(sneasler), new Target(basculegion), new Target(rotomMow)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("not-needed")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should return zeroed SPs when no solution is needed (already survives)", () => {
        const defender = new Pokemon("Blissey")

        const attacker = new Pokemon("Pichu", {
          moveSet: new MoveSet(new Move("Thunder Shock"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 0 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("not-needed")
        expect(result.sps).not.toBeNull()
        if (result.sps) {
          expect(result.sps!.hp).toBe(0)
          expect(result.sps!.def).toBe(0)
          expect(result.sps!.spd).toBe(0)
        }
      })
    })

    describe("refinement stage via optimize", () => {
      it("should increase SPs to survive residual sandstorm damage", () => {
        const defender = new Pokemon("Blissey")
        const attacker = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const targets = [new Target(attacker)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 3, spa: 0, spd: 0, spe: 0 })
      })

      it("should reduce SPs when Leftovers recovery over-satisfies survival", () => {
        const defender = new Pokemon("Blissey", { item: "Leftovers" })
        const attacker = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 1, spa: 0, spd: 0, spe: 0 })
      })

      it("should lower the KO chance of a mixed double that only survives above the legal SP budget under sandstorm", () => {
        const physical = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const special = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(physical, special)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field)

        expect(result).toEqual({
          sps: { hp: 29, atk: 0, def: 14, spa: 0, spd: 23, spe: 0 },
          nature: null,
          status: "best-effort",
          koChance: 0.046875,
          coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Garchomp + Chi-Yu", bestTargetKoChance: 0.046875 }
        })
      })

      it("should reduce a mixed double-attacker solution when Leftovers recovery applies", () => {
        const physical = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const special = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Snorlax", { item: "Leftovers" })
        const targets = [new Target(physical, special)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 20, atk: 0, def: 14, spa: 0, spd: 23, spe: 0 })
      })

      it("should propose no investment when even maxed refinement cannot survive under sandstorm", () => {
        const attacker = new Pokemon("Kartana", { nature: "Jolly", item: "Choice Band", moveSet: new MoveSet(new Move("Leaf Blade"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const defender = new Pokemon("Flutter Mane")
        const targets = [new Target(attacker)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field)

        expect(result).toEqual({ sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, nature: null, status: "impossible", coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Kartana", bestTargetKoChance: 1 } })
      })

      it("should keep the SpD that protects the strongest special attacker when refining a combined fallback solution", () => {
        const defender = new Pokemon("Ting-Lu", { item: "Sitrus Berry", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")) })
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 11 } })
        const rillaboom = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Wood Hammer"), new Move(""), new Move(""), new Move("")), sps: { atk: 16 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 21 } })
        const targets = [new Target(ursaluna), new Target(rillaboom), new Target(chiYu)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 3)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 30, atk: 0, def: 32, spa: 0, spd: 4, spe: 0 })
      })

      it("should protect both special attackers with an SpD-only spread when that beats protecting the physical attacker", () => {
        const defender = new Pokemon("Ting-Lu", { item: "Sitrus Berry", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")) })
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 23 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", item: "Life Orb", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 16 } })
        const ironBundle = new Pokemon("Iron Bundle", { nature: "Modest", moveSet: new MoveSet(new Move("Hydro Pump"), new Move(""), new Move(""), new Move("")), sps: { spa: 28 } })
        const targets = [new Target(ursaluna), new Target(chiYu), new Target(ironBundle)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 3)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 30, atk: 0, def: 0, spa: 0, spd: 32, spe: 0 })
      })

      it("should protect both special singles with an SpD-only spread, leaving the physical single and the double uncovered", () => {
        const defender = new Pokemon("Ting-Lu", { item: "Sitrus Berry", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")) })
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 23 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", item: "Life Orb", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 16 } })
        const ironBundle = new Pokemon("Iron Bundle", { nature: "Modest", moveSet: new MoveSet(new Move("Hydro Pump"), new Move(""), new Move(""), new Move("")), sps: { spa: 28 } })
        const garchomp = new Pokemon("Garchomp", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 21 } })
        const chiYuPartner = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Flamethrower"), new Move(""), new Move(""), new Move("")), sps: { spa: 0 } })
        const targets = [new Target(ursaluna), new Target(chiYu), new Target(ironBundle), new Target(garchomp, chiYuPartner)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 3)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 30, atk: 0, def: 0, spa: 0, spd: 32, spe: 0 })
      })

      it("should protect both special singles with an SpD-only spread instead of the physical single and the double", () => {
        const defender = new Pokemon("Ting-Lu", { item: "Sitrus Berry", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")) })
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 23 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", item: "Life Orb", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 16 } })
        const ironBundle = new Pokemon("Iron Bundle", { nature: "Modest", moveSet: new MoveSet(new Move("Hydro Pump"), new Move(""), new Move(""), new Move("")), sps: { spa: 28 } })
        const garchomp = new Pokemon("Garchomp", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 23 } })
        const dusclops = new Pokemon("Dusclops", { moveSet: new MoveSet(new Move("Body Press"), new Move(""), new Move(""), new Move("")), sps: { atk: 0 } })
        const targets = [new Target(ursaluna), new Target(chiYu), new Target(ironBundle), new Target(garchomp, dusclops)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 3)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 30, atk: 0, def: 0, spa: 0, spd: 32, spe: 0 })
      })

      it("should drop the special solution when the double target solution already protects the strongest special attacker", () => {
        const defender = new Pokemon("Snorlax", { moveSet: new MoveSet(new Move("Body Slam"), new Move(""), new Move(""), new Move("")) })
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const sinistcha = new Pokemon("Sinistcha", { nature: "Modest", moveSet: new MoveSet(new Move("Matcha Gotcha"), new Move(""), new Move(""), new Move("")), sps: { spa: 0 } })
        const ironBundle = new Pokemon("Iron Bundle", { nature: "Modest", moveSet: new MoveSet(new Move("Hydro Pump"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const sinistchaPartner = new Pokemon("Sinistcha", { nature: "Modest", moveSet: new MoveSet(new Move("Matcha Gotcha"), new Move(""), new Move(""), new Move("")), sps: { spa: 0 } })
        const targets = [new Target(ursaluna), new Target(sinistcha), new Target(ironBundle, sinistchaPartner)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 3)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 20, atk: 0, def: 0, spa: 0, spd: 32, spe: 0 })
      })

      it("should protect the physical attacker and abandon a double target that has no legal spread", () => {
        const defender = new Pokemon("Ting-Lu", { item: "Sitrus Berry", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")) })
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 11 } })
        const garchomp = new Pokemon("Garchomp", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 21 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Flamethrower"), new Move(""), new Move(""), new Move("")), sps: { spa: 0 } })
        const targets = [new Target(ursaluna), new Target(garchomp, chiYu)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 3)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 3, atk: 0, def: 11, spa: 0, spd: 0, spe: 0 })
      })

      it("should re-check a double refinement against the strongest single attackers and reject a spread that fails one of them", () => {
        const defender = new Pokemon("Snorlax", { item: "Leftovers" })
        const physD = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), sps: { atk: 0 } })
        const specD = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), sps: { spa: 0 } })
        const strongPhys = new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const strongSpec = new Pokemon("Raging Bolt", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const targets = [new Target(physD, specD), new Target(strongPhys), new Target(strongSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 1, atk: 0, def: 17, spa: 0, spd: 0, spe: 0 })
      })

      it("should protect the strongest singles and abandon a double that only survives above the legal SP budget under sandstorm", () => {
        const defender = new Pokemon("Grimmsnarl")
        const physD = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), sps: { atk: 11 } })
        const specD = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), sps: { spa: 11 } })
        const strongPhys = new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const strongSpec = new Pokemon("Raging Bolt", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const targets = [new Target(physD, specD), new Target(strongPhys), new Target(strongSpec)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 1, atk: 0, def: 0, spa: 0, spd: 21, spe: 0 })
      })

      it("should keep the singles-only spread when a reversed mixed double has no legal spread under sandstorm", () => {
        const defender = new Pokemon("Grimmsnarl")
        const physD = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), sps: { atk: 0 } })
        const specD = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), sps: { spa: 21 } })
        const strongPhys = new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const strongSpec = new Pokemon("Raging Bolt", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const targets = [new Target(physD, specD), new Target(strongPhys), new Target(strongSpec)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 1, atk: 0, def: 0, spa: 0, spd: 21, spe: 0 })
      })

      it("should reduce a double solution down to zero while satisfying the strongest single physical attacker under Leftovers", () => {
        const defender = new Pokemon("Ting-Lu", { item: "Leftovers" })
        const physD = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), sps: { atk: 0 } })
        const specD = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), sps: { spa: 0 } })
        const strongPhys = new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const strongSpec = new Pokemon("Raging Bolt", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const targets = [new Target(physD, specD), new Target(strongPhys), new Target(strongSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("not-needed")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })
    })

    describe("solution combiner via optimize", () => {
      it("should combine solutions across two mixed double-attacker targets", () => {
        const physStrong = new Pokemon("Garchomp", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const specStrong = new Pokemon("Chi-Yu", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const physWeak = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Wood Hammer"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const specWeak = new Pokemon("Gastrodon", { nature: "Modest", moveSet: new MoveSet(new Move("Muddy Water"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Incineroar")
        const targets = [new Target(physStrong, specStrong), new Target(physWeak, specWeak)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 30, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should combine a physical single with a weaker mixed double target", () => {
        const strongPhys = new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const dblPhys = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const dblSpec = new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Struggle Bug"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(strongPhys), new Target(dblPhys, dblSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 1, atk: 0, def: 17, spa: 0, spd: 0, spe: 0 })
      })

      it("should combine a special single with a weaker mixed double target", () => {
        const strongSpec = new Pokemon("Chi-Yu", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const dblPhys = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const dblSpec = new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Struggle Bug"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(strongSpec), new Target(dblPhys, dblSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 3, atk: 0, def: 0, spa: 0, spd: 19, spe: 0 })
      })

      it("should find an optimized combined solution for two strong singles plus a weaker double target", () => {
        const strongPhys = new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const strongSpec = new Pokemon("Chi-Yu", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const dblPhys = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const dblSpec = new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Struggle Bug"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(strongPhys), new Target(strongSpec), new Target(dblPhys, dblSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 16, atk: 0, def: 11, spa: 0, spd: 11, spe: 0 })
      })

      it("should protect the physical single when a special-pair double cannot also be covered", () => {
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", item: "Choice Specs", ability: new Ability("Beads of Ruin"), moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const moltresGalar = new Pokemon("Moltres-Galar", { nature: "Modest", item: "Choice Specs", ability: new Ability("Berserk"), moveSet: new MoveSet(new Move("Fiery Wrath"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const ironValiant = new Pokemon("Iron Valiant", { nature: "Adamant", item: "Life Orb", moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const defender = new Pokemon("Ting-Lu")
        const targets = [new Target(chiYu, moltresGalar), new Target(ironValiant)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 8, atk: 0, def: 32, spa: 0, spd: 0, spe: 0 })
      })

      it("should protect the physical pair when the special single cannot also be covered", () => {
        const kingambit = new Pokemon("Kingambit", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Kowtow Cleave"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const landorusTherian = new Pokemon("Landorus-Therian", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const tornadus = new Pokemon("Tornadus", { nature: "Timid", item: "Life Orb", moveSet: new MoveSet(new Move("Bleakwind Storm"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Rillaboom")
        const targets = [new Target(kingambit, landorusTherian), new Target(tornadus)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 7, atk: 0, def: 31, spa: 0, spd: 0, spe: 0 })
      })
    })

    describe("attacker selector nature scenarios via optimize", () => {
      it("should pick a Defense-boosting nature against two physical attackers when updateNature is on", () => {
        const strongPhys = new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const weakPhys = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const defender = new Pokemon("Grimmsnarl")
        const targets = [new Target(strongPhys), new Target(weakPhys)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 21, atk: 0, def: 31, spa: 0, spd: 0, spe: 0 })
      })

      it("should pick a Special-Defense-boosting nature against two special attackers when updateNature is on", () => {
        const strongSpec = new Pokemon("Miraidon", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const weakSpec = new Pokemon("Flutter Mane", { nature: "Modest", moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Grimmsnarl")
        const targets = [new Target(strongSpec), new Target(weakSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 19, atk: 0, def: 0, spa: 0, spd: 32, spe: 0 })
      })

      it("should break an exact damage tie between nature scenarios by survivable count when both categories attack", () => {
        const rillaboom = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Wood Hammer"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const ragingBolt = new Pokemon("Raging Bolt", { nature: "Modest", moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")), sps: { spa: 8 } })
        const defender = new Pokemon("Dondozo")
        const targets = [new Target(rillaboom), new Target(ragingBolt)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("success")
        expect(result.nature).toBe("Bold")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 12, spe: 0 })
      })

      it("should resolve an exact damage tie toward the SpD nature when only special attackers are present", () => {
        const amoonguss = new Pokemon("Amoonguss", { nature: "Calm", moveSet: new MoveSet(new Move("Pollen Puff"), new Move(""), new Move(""), new Move("")), sps: { spa: 9 } })
        const defender = new Pokemon("Corviknight")
        const targets = [new Target(amoonguss)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("not-needed")
        expect(result.nature).toBe("Calm")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should resolve an exact damage tie toward the Def nature when only physical attackers are present", () => {
        const clefairy = new Pokemon("Clefairy", { nature: "Bold", moveSet: new MoveSet(new Move("Knock Off"), new Move(""), new Move(""), new Move("")), sps: { atk: 0 } })
        const defender = new Pokemon("Ting-Lu")
        const targets = [new Target(clefairy)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("not-needed")
        expect(result.nature).toBe("Bold")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should pick Impish as the Defense nature when the defender has more physical than special moves", () => {
        const strongPhys = new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const defender = new Pokemon("Grimmsnarl", { moveSet: new MoveSet(new Move("Play Rough"), new Move("Spirit Break"), new Move("Thunder Wave"), new Move("")) })
        const targets = [new Target(strongPhys)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("success")
        expect(result.nature).toBe("Impish")
        expect(result.sps).toEqual({ hp: 21, atk: 0, def: 31, spa: 0, spd: 0, spe: 0 })
      })

      it("should break a full-total tie between Def and SpD nature scenarios by comparing physical vs special survivable counts", () => {
        const defender = new Pokemon("Amoonguss", { moveSet: new MoveSet(new Move("Play Rough"), new Move("Moonblast"), new Move(""), new Move("")) })
        const weakPhys = new Pokemon("Great Tusk", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 1 } })
        const weakSpec = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), sps: { spa: 1 } })
        const strongPhys = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const strongSpec = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Dark Pulse"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const targets = [new Target(weakPhys), new Target(weakSpec), new Target(strongPhys), new Target(strongSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("not-needed")
        expect(result.nature).toBe("Bold")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })
    })

    describe("double attacker categories via optimize", () => {
      it("should optimize HP and Def only against a double target of two physical attackers", () => {
        const attacker1 = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const attacker2 = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(attacker1, attacker2)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 30, spa: 0, spd: 0, spe: 0 })
      })

      it("should optimize HP and SpD only against a double target of two special attackers", () => {
        const attacker1 = new Pokemon("Flutter Mane", { nature: "Modest", moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const attacker2 = new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Bug Buzz"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Incineroar")
        const targets = [new Target(attacker1, attacker2)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 13, atk: 0, def: 0, spa: 0, spd: 30, spe: 0 })
      })

      it("should keep the strongest pair when a second, weaker double target is present", () => {
        const garchomp = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const rillaboom = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), sps: { atk: 0 } })
        const incineroar = new Pokemon("Incineroar", { nature: "Adamant", moveSet: new MoveSet(new Move("Knock Off"), new Move(""), new Move(""), new Move("")), sps: { atk: 0 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(garchomp, ursaluna), new Target(rillaboom, incineroar)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 30, spa: 0, spd: 0, spe: 0 })
      })

      it("should retry the mixed heuristic on the Def side when the minimal spread fails the combined check", () => {
        const phys = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), sps: { atk: 4 } })
        const spec = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 0 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(phys, spec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 2, atk: 0, def: 2, spa: 0, spd: 11, spe: 0 })
      })

      it("should retry the mixed heuristic on the SpD side when the minimal spread fails the combined check", () => {
        const phys = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), sps: { atk: 0 } })
        const spec = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 4 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(phys, spec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 5, atk: 0, def: 0, spa: 0, spd: 11, spe: 0 })
      })

      it("should retry the mixed heuristic on both Def and SpD together when single-side retries also fail", () => {
        const phys = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), sps: { atk: 11 } })
        const spec = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 14 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(phys, spec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 17, atk: 0, def: 3, spa: 0, spd: 11, spe: 0 })
      })

      it("should fall through to the full three-stat search when every mixed heuristic retry fails at the minimum HP", () => {
        const phys = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), sps: { atk: 0 } })
        const spec = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 25 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(phys, spec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 20, atk: 0, def: 0, spa: 0, spd: 15, spe: 0 })
      })
    })

    describe("reserved offensive SPs via optimize", () => {
      it("should merge the defensive solution with preserved offensive SPs", () => {
        const attacker = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const defender = new Pokemon("Incineroar", { sps: { atk: 32, spe: 1 } })
        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, true)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 1, atk: 32, def: 8, spa: 0, spd: 0, spe: 1 })
      })

      it("should spend the remaining budget on the lowest KO chance when defensive needs plus offensive SPs exceed the SP budget", () => {
        const attacker = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const defender = new Pokemon("Incineroar", { sps: { atk: 32, spa: 25, spe: 7 } })
        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, true)

        expect(result).toEqual({
          sps: { hp: 1, atk: 32, def: 0, spa: 25, spd: 0, spe: 7 },
          nature: null,
          status: "best-effort",
          koChance: 0.3125,
          coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Garchomp", bestTargetKoChance: 0.3125 }
        })
      })

      it("should account for the reserved Attack SPs when Foul Play reads the defender Attack", () => {
        const attacker = new Pokemon("Grimmsnarl", { nature: "Adamant", moveSet: new MoveSet(new Move("Foul Play"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const defender = new Pokemon("Dragonite", { nature: "Adamant", sps: { atk: 16 } })
        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, true, 3)

        const proposed = defender.clone({ sps: result.sps })
        const survives = new DamageCalc().calculateResult(attacker, proposed, attacker.move, field, false).survivesHits(2, RollLevelConfig.HIGH_ROLL_INDEX)

        expect(survives).toBe(true)
      })

      it("should report coverage measured on the reserved Attack SPs it hands back", () => {
        const attacker = new Pokemon("Grimmsnarl", { nature: "Adamant", moveSet: new MoveSet(new Move("Foul Play"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const defender = new Pokemon("Dragonite", { nature: "Adamant", sps: { atk: 32 } })
        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, true, 3)

        const proposed = defender.clone({ sps: result.sps })
        const survives = new DamageCalc().calculateResult(attacker, proposed, attacker.move, field, false).survivesHits(2, RollLevelConfig.HIGH_ROLL_INDEX)

        expect(result.coverage.covered).toEqual(survives ? 1 : 0)
      })

      it("should keep offensive SPs when the defender already survives a single attacker with zero investment", () => {
        const attacker = new Pokemon("Sylveon", { nature: "Adamant", moveSet: new MoveSet(new Move("Quick Attack"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const defender = new Pokemon("Blissey", { sps: { spa: 32 } })
        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, true)

        expect(result.status).toBe("not-needed")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 32, spd: 0, spe: 0 })
      })

      it("should keep offensive SPs when the defender already survives a double target with zero investment", () => {
        const attacker1 = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const attacker2 = new Pokemon("Flutter Mane", { nature: "Modest", moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Kingambit", { sps: { atk: 32, spe: 1 } })
        const targets = [new Target(attacker1, attacker2)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, true)

        expect(result.status).toBe("not-needed")
        expect(result.sps).toEqual({ hp: 0, atk: 32, def: 0, spa: 0, spd: 0, spe: 1 })
      })
    })

    describe("degenerate targets via optimize", () => {
      it("should return the current SPs when the only target has no damaging moves", () => {
        const statusOnly = new Pokemon("Amoonguss", { moveSet: new MoveSet(new Move("Spore"), new Move(""), new Move(""), new Move("")) })
        const defender = new Pokemon("Incineroar", { sps: { hp: 13 } })
        const targets = [new Target(statusOnly)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 13, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should treat an impossible attacker as a lost cause when another attacker is harmless", () => {
        const impossible = new Pokemon("Kartana", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Leaf Blade"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const harmless = new Pokemon("Sylveon", { nature: "Adamant", moveSet: new MoveSet(new Move("Quick Attack"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const defender = new Pokemon("Flutter Mane")
        const targets = [new Target(impossible), new Target(harmless)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("not-needed")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should apply the selected nature when singles and a double target are optimized together", () => {
        const single = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const dblPhys = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const dblSpec = new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Struggle Bug"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Grimmsnarl")
        const targets = [new Target(single), new Target(dblPhys, dblSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("not-needed")
        expect(result.nature).toBe("Bold")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })
    })

    describe("second strongest fallback via optimize", () => {
      const ursaluna = () => new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
      const miraidon = () => new Pokemon("Miraidon", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })

      it("should fall back to the physical-priority spread when no combined spread survives both singles", () => {
        const defender = new Pokemon("Clefairy")
        const targets = [new Target(ursaluna()), new Target(miraidon())]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 25, atk: 0, def: 32, spa: 0, spd: 0, spe: 0 })
      })

      it("should fall back to the physical-priority spread when a double target joins two tight singles", () => {
        const defender = new Pokemon("Clefairy")
        const targets = [new Target(ursaluna()), new Target(miraidon()), new Target(ursaluna(), miraidon())]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 25, atk: 0, def: 32, spa: 0, spd: 0, spe: 0 })
      })

      it("should order remaining special attackers by strength when the strongest cannot be covered", () => {
        const secondSpecial = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Clefairy")
        const targets = [new Target(ursaluna()), new Target(miraidon()), new Target(secondSpecial)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 25, atk: 0, def: 32, spa: 0, spd: 0, spe: 0 })
      })

      it("should walk the ordered survivable special attackers when the strongest special cannot be covered together with the physicals", () => {
        const garchomp = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const flutter = new Pokemon("Flutter Mane", { nature: "Modest", moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), sps: { spa: 23 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Dark Pulse"), new Move(""), new Move(""), new Move("")), sps: { spa: 23 } })
        const heatran = new Pokemon("Heatran", { nature: "Modest", moveSet: new MoveSet(new Move("Heat Wave"), new Move(""), new Move(""), new Move("")), sps: { spa: 18 } })
        const defender = new Pokemon("Clefairy")
        const targets = [new Target(ursaluna()), new Target(miraidon()), new Target(garchomp), new Target(flutter), new Target(chiYu), new Target(heatran)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 25, atk: 0, def: 32, spa: 0, spd: 0, spe: 0 })
      })

      it("should rebuild from the single-attacker solutions when the double refinement cannot secure the discarded special attacker", () => {
        const physDouble = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), sps: { atk: 18 } })
        const specDouble = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), sps: { spa: 18 } })
        const physSingle = new Pokemon("Iron Hands", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const specSingle = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 18 } })
        const defender = new Pokemon("Grimmsnarl", { item: "Leftovers" })
        const targets = [new Target(physDouble, specDouble), new Target(physSingle), new Target(specSingle)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 6, atk: 0, def: 0, spa: 0, spd: 30, spe: 0 })
      })
    })

    describe("three-solution combine and double-recombine via optimize", () => {
      const ursaluna = () => new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
      const miraidonCS = () => new Pokemon("Miraidon", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
      const greatTuskCB = () => new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
      const chiYuCS = () => new Pokemon("Chi-Yu", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
      const rillaGlide = () => new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
      const volcaronaSB = () => new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Struggle Bug"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })

      it("should find an optimized combined solution that also covers the double target", () => {
        const defender = new Pokemon("Grimmsnarl")
        const targets = [new Target(ursaluna()), new Target(miraidonCS()), new Target(rillaGlide(), volcaronaSB())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 27, atk: 0, def: 1, spa: 0, spd: 9, spe: 0 })
      })

      it("should protect the physical single and the double target with a Defense-only spread", () => {
        const defender = new Pokemon("Clefairy")
        const targets = [new Target(ursaluna()), new Target(miraidonCS()), new Target(rillaGlide(), volcaronaSB())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 25, atk: 0, def: 32, spa: 0, spd: 0, spe: 0 })
      })

      it("should combine a physical solution with a double target that contributes nothing", () => {
        const defender = new Pokemon("Clefairy")
        const targets = [new Target(ursaluna()), new Target(chiYuCS()), new Target(rillaGlide(), volcaronaSB())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 25, atk: 0, def: 32, spa: 0, spd: 0, spe: 0 })
      })

      it("should combine a special solution with a double target that contributes nothing", () => {
        const defender = new Pokemon("Clefairy")
        const targets = [new Target(greatTuskCB()), new Target(miraidonCS()), new Target(rillaGlide(), volcaronaSB())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 31, atk: 0, def: 0, spa: 0, spd: 32, spe: 0 })
      })

      it("should search Def/SpD combinations when combining a special solution with a real double target", () => {
        const defender = new Pokemon("Pikachu")
        const targets = [new Target(ursaluna()), new Target(miraidonCS()), new Target(rillaGlide(), volcaronaSB())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 5, atk: 0, def: 0, spa: 0, spd: 19, spe: 0 })
      })
    })

    describe("solution combiner double-target fallbacks and search loops via optimize", () => {
      const rillaGlideWeak = () => new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), sps: { atk: 0 } })
      const volcaronaWeak = () => new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Bug Buzz"), new Move(""), new Move(""), new Move("")), sps: { spa: 0 } })

      it("should search the Def/SpD window for a special-only single alongside a weak double target", () => {
        const defender = new Pokemon("Clefairy")
        const single1 = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), sps: { atk: 0 } })
        const single2 = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), sps: { spa: 21 } })
        const targets = [new Target(single1), new Target(single2), new Target(rillaGlideWeak(), volcaronaWeak())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 1, atk: 0, def: 0, spa: 0, spd: 4, spe: 0 })
      })

      it("should search the Def/SpD window for a physical-only single alongside a weak double target", () => {
        const defender = new Pokemon("Clefairy")
        const single1 = new Pokemon("Great Tusk", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 0 } })
        const single2 = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), sps: { spa: 0 } })
        const targets = [new Target(single1), new Target(single2), new Target(rillaGlideWeak(), volcaronaWeak())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 1, atk: 0, def: 24, spa: 0, spd: 0, spe: 0 })
      })

      it("should fall back to the physical-only spread when the double solution is entirely zero", () => {
        const defender = new Pokemon("Snorlax")
        const single1 = new Pokemon("Iron Hands", { nature: "Adamant", moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")), sps: { atk: 0 } })
        const single2 = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), sps: { spa: 0 } })
        const targets = [new Target(single1), new Target(single2), new Target(rillaGlideWeak(), volcaronaWeak())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 8, atk: 0, def: 32, spa: 0, spd: 0, spe: 0 })
      })

      it("should protect the physical single and the weak double with a minimal Defense spread", () => {
        const defender = new Pokemon("Clefairy")
        const single1 = new Pokemon("Great Tusk", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 0 } })
        const single2 = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 0 } })
        const targets = [new Target(single1), new Target(single2), new Target(rillaGlideWeak(), volcaronaWeak())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 31, atk: 0, def: 8, spa: 0, spd: 27, spe: 0 })
      })

      it("should protect three of the five threats with a minimal Defense spread", () => {
        const defender = new Pokemon("Clefairy")
        const phys1 = new Pokemon("Great Tusk", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 0 } })
        const spec1 = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), sps: { spa: 0 } })
        const secondPhys = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 1 } })
        const secondSpec = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 1 } })
        const dPhys = new Pokemon("Iron Hands", { nature: "Adamant", moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")), sps: { atk: 21 } })
        const dSpec = new Pokemon("Raging Bolt", { nature: "Modest", moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")), sps: { spa: 21 } })
        const targets = [new Target(phys1), new Target(spec1), new Target(secondPhys), new Target(secondSpec), new Target(dPhys, dSpec)]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 1, atk: 0, def: 24, spa: 0, spd: 0, spe: 0 })
      })
    })

    describe("double-attacker refinement increase via optimize", () => {
      it("should lower the KO chance of a reversed mixed double that only survives above the legal SP budget under sandstorm", () => {
        const physical = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const special = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(special, physical)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field)

        expect(result).toEqual({
          sps: { hp: 29, atk: 0, def: 14, spa: 0, spd: 23, spe: 0 },
          nature: null,
          status: "best-effort",
          koChance: 0.046875,
          coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Chi-Yu + Garchomp", bestTargetKoChance: 0.046875 }
        })
      })
    })

    describe("prioritize HP and inner double-combination search via optimize", () => {
      it("should prioritize HP for an all-physical double target under Leftovers recovery", () => {
        const attacker1 = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const attacker2 = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const defender = new Pokemon("Snorlax", { item: "Leftovers" })
        const targets = [new Target(attacker1, attacker2)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 30, spa: 0, spd: 0, spe: 0 })
      })

      it("should prioritize HP for an all-special double target under Leftovers recovery", () => {
        const attacker1 = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const attacker2 = new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Bug Buzz"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Snorlax", { item: "Leftovers" })
        const targets = [new Target(attacker1, attacker2)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 17, atk: 0, def: 0, spa: 0, spd: 30, spe: 0 })
      })

      it("should search Def/SpD combinations against a mixed double target while combining with a physical single", () => {
        const single = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const dblPhys = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const dblSpec = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(single), new Target(dblPhys, dblSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 20, atk: 0, def: 14, spa: 0, spd: 23, spe: 0 })
      })

      it("should fall back to the second-strongest search when a physical-priority spread fails the special side", () => {
        const physical = new Pokemon("Miraidon", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const weakA = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const weakB = new Pokemon("Meowscarada", { nature: "Adamant", moveSet: new MoveSet(new Move("Flower Trick"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const defender = new Pokemon("Clefairy")
        const targets = [new Target(physical), new Target(weakA), new Target(weakB)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 1, atk: 0, def: 18, spa: 0, spd: 0, spe: 0 })
      })

      it("should propose no investment when a single special attacker cannot be survived even at maximum investment", () => {
        const attacker = new Pokemon("Miraidon", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Draco Meteor"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const defender = new Pokemon("Chansey")
        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 4)

        expect(result).toEqual({ sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, nature: null, status: "impossible", coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Miraidon", bestTargetKoChance: 1 } })
      })

      it("should propose no investment when a single physical attacker cannot be survived even at maximum investment", () => {
        const attacker = new Pokemon("Kartana", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Leaf Blade"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 3)

        expect(result).toEqual({ sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, nature: null, status: "impossible", coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Kartana", bestTargetKoChance: 1 } })
      })
    })

    describe("double refinement", () => {
      it("should protect the two singles instead of the double when that costs fewer SPs", () => {
        const defender = new Pokemon("Umbreon", { nature: "Bold", item: "Sitrus Berry" })

        const sneasel = new Pokemon("Sneasel", { nature: "Adamant", moveSet: new MoveSet(new Move("Ice Punch"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const mamoswine = new Pokemon("Mamoswine", { nature: "Adamant", moveSet: new MoveSet(new Move("Icicle Crash"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const rotom = new Pokemon("Rotom-Heat", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })

        const targets = [new Target(sneasel), new Target(rotom), new Target(sneasel, mamoswine)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field, false, false, 3, 15, true)

        expect(result.status).toBe("success")
        expect(result.sps!.hp).toBe(18)
        expect(result.sps!.def).toBe(0)
        expect(result.sps!.spd).toBe(20)
      })

      it("should protect the special single and the double in the Umbreon sandstorm scenario", () => {
        const defender = new Pokemon("Umbreon", { nature: "Bold", item: "Sitrus Berry" })

        const rillaboom = new Pokemon("Rillaboom", { nature: "Adamant", item: "Life Orb", moveSet: new MoveSet(new Move("Wood Hammer"), new Move(""), new Move(""), new Move("")), sps: { atk: 25 } })
        const rotom = new Pokemon("Rotom-Heat", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const sneasel = new Pokemon("Sneasel", { nature: "Adamant", moveSet: new MoveSet(new Move("Ice Punch"), new Move(""), new Move(""), new Move("")), sps: { atk: 25 } })
        const mamoswine = new Pokemon("Mamoswine", { nature: "Adamant", moveSet: new MoveSet(new Move("Icicle Crash"), new Move(""), new Move(""), new Move("")), sps: { atk: 25 } })

        const targets = [new Target(rillaboom), new Target(rotom), new Target(sneasel, mamoswine)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field, false, false, 3, 15, true)

        expect(result.status).toBe("success")
        expect(result.sps!.hp).toBe(31)
        expect(result.sps!.def).toBe(25)
        expect(result.sps!.spd).toBe(9)
      })

      it("should protect the physical single and the double with a minimal Defense spread", () => {
        const defender = new Pokemon("Porygon2", { nature: "Calm", item: "Leftovers" })

        const scizor = new Pokemon("Scizor", { nature: "Adamant", moveSet: new MoveSet(new Move("Bullet Punch"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const metagross = new Pokemon("Metagross", { nature: "Adamant", moveSet: new MoveSet(new Move("Bullet Punch"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const rotom = new Pokemon("Rotom-Heat", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })

        const targets = [new Target(scizor), new Target(rotom), new Target(scizor, metagross)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field, false, false, 3, 15, true)

        expect(result.status).toBe("success")
        expect(result.sps!.hp).toBe(1)
        expect(result.sps!.def).toBe(29)
        expect(result.sps!.spd).toBe(0)
      })
    })

    describe("roll level", () => {
      const amoonguss = () => new Pokemon("Amoonguss", { moveSet: new MoveSet(new Move("Tackle"), new Move(""), new Move(""), new Move("")) })
      const chienPao = () => new Pokemon("Chien-Pao", { nature: "Jolly", moveSet: new MoveSet(new Move("Ice Spinner"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })

      const optimizeAtRoll = (rollIndex: number) => service.optimize(amoonguss(), [new Target(chienPao())], new Field(), false, false, 2, rollIndex, true)

      it("should spend the fewest SPs on the low roll", () => {
        const result = optimizeAtRoll(0)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 19, spa: 0, spd: 0, spe: 0 })
      })

      it("should spend more SPs on the medium roll than on the low roll", () => {
        const result = optimizeAtRoll(7)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 0, atk: 0, def: 30, spa: 0, spd: 0, spe: 0 })
      })

      it("should spend the most SPs on the high roll", () => {
        const result = optimizeAtRoll(15)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 16, atk: 0, def: 31, spa: 0, spd: 0, spe: 0 })
      })

      it("should never cost more SPs as the roll level decreases", () => {
        const totalSps = (rollIndex: number) => {
          const sps = optimizeAtRoll(rollIndex).sps!

          return sps.hp + sps.def + sps.spd
        }

        const low = totalSps(0)
        const medium = totalSps(7)
        const high = totalSps(15)

        expect(low).toBeLessThanOrEqual(medium)
        expect(medium).toBeLessThanOrEqual(high)
      })
    })

    describe("survival decided by KO chance", () => {
      const umbreonSitrus = () => new Pokemon("Umbreon", { nature: "Bold", item: "Sitrus Berry" })
      const rotomHeat = () => new Pokemon("Rotom-Heat", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })

      it("should not report not-needed when the defender can still be 2HKOd at the 3HKO threshold", () => {
        const defender = umbreonSitrus()
        const rotom = rotomHeat()
        const field = new Field({ terrain: "Grassy" })

        const result = service.optimize(defender, [new Target(rotom)], field, false, false, 3, 15, true)

        expect(result.status).not.toBe("not-needed")
      })

      it("should return a spread with zero chance of being KOd before the third turn", () => {
        const defender = umbreonSitrus()
        const rotom = rotomHeat()
        const field = new Field({ terrain: "Grassy" })

        const result = service.optimize(defender, [new Target(rotom)], field, false, false, 3, 15, true)

        expect(result.sps).not.toBeNull()

        const optimized = defender.clone({ sps: result.sps! })
        const koChance = new DamageCalc().calculateResult(rotom, optimized, rotom.move, field, true).koChance()

        expect(koChance.n).toBeGreaterThanOrEqual(3)
      })

      it("should protect an attacker that no degradation plan includes because it survives at zero SPs", () => {
        const defender = umbreonSitrus()
        const chienPao = new Pokemon("Chien-Pao", { nature: "Jolly", moveSet: new MoveSet(new Move("Ice Spinner"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const basculegion = new Pokemon("Basculegion", { nature: "Adamant", moveSet: new MoveSet(new Move("Wave Crash"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const field = new Field()

        const result = service.optimize(defender, [new Target(chienPao), new Target(basculegion)], field, false, false, 3, 15, true)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 4, atk: 0, def: 20, spa: 0, spd: 0, spe: 0 })

        const optimized = defender.clone({ sps: result.sps! })
        const calc = new DamageCalc()

        expect(calc.calculateResult(chienPao, optimized, chienPao.move, field, true).koChance().n).toBe(3)
        expect(calc.calculateResult(basculegion, optimized, basculegion.move, field, true).koChance().n).toBe(3)
      })

      it("should keep protecting the Urshifu scenario that used to pass by a single HP", () => {
        const defender = umbreonSitrus()
        const urshifu = new Pokemon("Urshifu-Rapid-Strike", { nature: "Adamant", moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, [new Target(urshifu)], field, false, false, 3, 15, true)

        const optimized = defender.clone({ sps: result.sps })
        const koChance = new DamageCalc().calculateResult(urshifu, optimized, urshifu.move, field, true).koChance()

        expect(koChance.n).toBeGreaterThanOrEqual(3)
      })
    })

    describe("survival against attacker pairs decided by KO chance", () => {
      const dondozoFigy = () => new Pokemon("Dondozo", { nature: "Impish", item: "Figy Berry", sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })
      const greatTusk = () => new Pokemon("Great Tusk", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
      const ironBundle = () => new Pokemon("Iron Bundle", { nature: "Modest", moveSet: new MoveSet(new Move("Freeze-Dry"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })

      it("should not report success with a spread the pair can knock out on the first turn", () => {
        const defender = dondozoFigy()
        const tusk = greatTusk()
        const bundle = ironBundle()
        const field = new Field()

        const result = service.optimize(defender, [new Target(tusk, bundle)], field, false, false, 2, 15, true)

        expect(result.status).toBe("success")
        expect(result.sps).toEqual({ hp: 15, atk: 0, def: 4, spa: 0, spd: 0, spe: 0 })

        const optimized = defender.clone({ sps: result.sps! })
        const combined = new DamageCalc().calcDamageValueForTwoAttackers(tusk, bundle, optimized, field, true)

        expect(combined.getHKO()).toBe("guaranteed 2HKO after Figy Berry recovery")
        expect(combined.survivesHits(1)).toBe(true)
      })

      it("should reject the cheaper spread that the accumulated damage criterion used to approve", () => {
        const defender = dondozoFigy().clone({ sps: { hp: 3, atk: 0, def: 0, spa: 0, spd: 8, spe: 0 } })
        const tusk = greatTusk()
        const bundle = ironBundle()
        const field = new Field()

        const combined = new DamageCalc().calcDamageValueForTwoAttackers(tusk, bundle, defender, field, true)

        expect(defender.hp).toBe(228)
        expect(combined.damageWithRemainingUntilTurn(1, 15)).toBeLessThan(defender.hp)
        expect(combined.getHKO()).toBe("31.3% chance to OHKO")
        expect(combined.survivesHits(1)).toBe(false)
      })
    })

    describe("abilities that only reduce the first hit", () => {
      it("should not propose a spread that dies to the second hit once Multiscale wears off", () => {
        const defender = new Pokemon("Dragonite", { nature: "Bold", ability: new Ability("Multiscale") })

        const attacker = new Pokemon("Garchomp", {
          nature: "Modest",
          moveSet: new MoveSet(new Move("Ice Beam"), new Move(""), new Move(""), new Move("")),
          sps: { spa: 32 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 3)

        expect(result).toEqual({ sps: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, nature: null, status: "impossible", coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Garchomp", bestTargetKoChance: 1 } })
      })
    })

    describe("best effort when nothing can be protected", () => {
      it("should propose the spread with the lowest KO chance against a combined attack a Sitrus Berry holder cannot survive", () => {
        const defender = new Pokemon("Farigiraf", { nature: "Bold", item: "Sitrus Berry" })
        const sneasler = new Pokemon("Sneasler", { nature: "Adamant", moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const floette = new Pokemon("Floette-Mega", { nature: "Modest", moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), sps: { spa: 15 } })
        const field = new Field()

        const result = service.optimize(defender, [new Target(sneasler, floette)], field, false, false, 2, 15, true)

        expect(result).toEqual({
          sps: { hp: 25, atk: 0, def: 15, spa: 0, spd: 26, spe: 0 },
          nature: null,
          status: "best-effort",
          koChance: 0.21875,
          coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Sneasler + Floette-Mega", bestTargetKoChance: 0.21875 }
        })

        const calc = new DamageCalc()

        expect(calc.calcDamageValueForTwoAttackers(sneasler, floette, defender, field, true).getHKO()).toBe("guaranteed OHKO after Sitrus Berry recovery")
        expect(calc.calcDamageValueForTwoAttackers(sneasler, floette, defender.clone({ sps: result.sps }), field, true).getHKO()).toBe("21.9% chance to OHKO after Sitrus Berry recovery")
      })

      it("should lower the KO chance of a single attacker a Sitrus Berry holder cannot survive", () => {
        const defender = new Pokemon("Chansey", { item: "Sitrus Berry" })
        const miraidon = new Pokemon("Miraidon", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Draco Meteor"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })

        const result = service.optimize(defender, [new Target(miraidon)], new Field(), false, false, 4, 15, true)

        expect(result).toEqual({
          sps: { hp: 32, atk: 0, def: 0, spa: 0, spd: 32, spe: 0 },
          nature: null,
          status: "best-effort",
          koChance: 0.948486328125,
          coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Miraidon", bestTargetKoChance: 0.948486328125 }
        })
      })

      it("should optimize against the pair with the lowest KO chance when two pairs knock the defender out", () => {
        const defender = new Pokemon("Snorlax")
        const garchomp = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const kartana = new Pokemon("Kartana", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Leaf Blade"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })
        const miraidon = new Pokemon("Miraidon", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Draco Meteor"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const targets = [new Target(garchomp, chiYu), new Target(kartana, miraidon)]

        const result = service.optimize(defender, targets, new Field({ weather: "Sand" }), false, false, 2, 15, true)

        expect(result).toEqual({
          sps: { hp: 29, atk: 0, def: 14, spa: 0, spd: 23, spe: 0 },
          nature: null,
          status: "best-effort",
          koChance: 1,
          coverage: { covered: 0, total: 2, outOfReach: 2, bestTargetName: "Kartana + Miraidon", bestTargetKoChance: 1 }
        })
      })

      it("should account for the Stamina boosts of every turn while lowering the KO chance", () => {
        const defender = new Pokemon("Dondozo", { nature: "Impish", item: "Sitrus Berry", ability: new Ability("Stamina") })
        const miraidon = new Pokemon("Miraidon", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Draco Meteor"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const koraidon = new Pokemon("Koraidon", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Collision Course"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })

        const result = service.optimize(defender, [new Target(miraidon, koraidon)], new Field(), false, false, 2, 15, true)

        expect(result).toEqual({ sps: { hp: 32, atk: 0, def: 3, spa: 0, spd: 31, spe: 0 }, nature: null, status: "success", coverage: { covered: 1, total: 1, outOfReach: 0, bestTargetName: null, bestTargetKoChance: 0 } })
      })

      it("should bound the KO chance with the Stamina boosts when a Berry holder cannot survive the pair", () => {
        const defender = new Pokemon("Dondozo", { item: "Sitrus Berry", ability: new Ability("Stamina") })
        const miraidon = new Pokemon("Miraidon", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Draco Meteor"), new Move(""), new Move(""), new Move("")), sps: { spa: 32 } })
        const koraidon = new Pokemon("Koraidon", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Collision Course"), new Move(""), new Move(""), new Move("")), sps: { atk: 32 } })

        const result = service.optimize(defender, [new Target(miraidon, koraidon)], new Field(), false, false, 2, 15, true)

        expect(result).toEqual({
          sps: { hp: 32, atk: 0, def: 2, spa: 0, spd: 32, spe: 0 },
          nature: null,
          status: "best-effort",
          koChance: 0.05859375,
          coverage: { covered: 0, total: 1, outOfReach: 1, bestTargetName: "Miraidon + Koraidon", bestTargetKoChance: 0.05859375 }
        })
      })

      it("should report success when a Sitrus Berry holder survives a pair that dies against maximum bulk", () => {
        const defender = new Pokemon("Farigiraf", { nature: "Bold", item: "Sitrus Berry" })
        const sneasler = new Pokemon("Sneasler", { nature: "Adamant", moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")), sps: { atk: 12 } })
        const floette = new Pokemon("Floette-Mega", { nature: "Modest", moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), sps: { spa: 12 } })
        const field = new Field()

        const result = service.optimize(defender, [new Target(sneasler, floette)], field, false, false, 2, 15, true)

        expect(result).toEqual({ sps: { hp: 21, atk: 0, def: 12, spa: 0, spd: 31, spe: 0 }, nature: null, status: "success", coverage: { covered: 1, total: 1, outOfReach: 0, bestTargetName: null, bestTargetKoChance: 0 } })

        const calc = new DamageCalc()

        expect(calc.calcDamageValueForTwoAttackers(sneasler, floette, defender.clone({ sps: { hp: 32, def: 32, spd: 32 } }), field, true).getHKO()).toBe("63.3% chance to OHKO")
        expect(calc.calcDamageValueForTwoAttackers(sneasler, floette, defender.clone({ sps: result.sps }), field, true).getHKO()).toBe("guaranteed 2HKO after Sitrus Berry recovery")
      })
    })
  })
})
