import { Ability } from "@multicalc/model/ability"
import { Field, FieldSide } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { DefensiveEvOptimizer } from "@multicalc/ev-optimizer/defensive-ev-optimizer"
import { Status } from "@multicalc/model/status"

describe("DefensiveEvOptimizer", () => {
  let service: DefensiveEvOptimizer

  beforeEach(() => {
    service = new DefensiveEvOptimizer()
  })

  describe("optimize", () => {
    describe("single attacker", () => {
      it("should optimize EVs for single physical attacker", () => {
        const defender = new Pokemon("Flutter Mane")

        const attacker = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Adamant",
          moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs!.hp).toBe(140)
        expect(result.evs!.def).toBe(236)
        expect(result.evs!.spd).toBe(0)
      })

      it("should optimize EVs for single physical attacker againt Ting-Lu", () => {
        const defender = new Pokemon("Ting-Lu", {
          nature: "Bold"
        })

        const attacker = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Adamant",
          teraType: "Water",
          teraTypeActive: true,
          moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(0)
        expect(result.evs!.def).toBe(180)
        expect(result.evs!.spd).toBe(0)
      })

      it("should optimize EVs for single special attacker", () => {
        const defender = new Pokemon("Vaporeon")

        const attacker = new Pokemon("Raging Bolt", {
          nature: "Modest",
          moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(12)
        expect(result.evs!.def).toBe(0)
        expect(result.evs!.spd).toBe(44)
      })

      it("should optimize EVs for Empoleon with Shuca Berry against Garchomp Earthquake", () => {
        const defender = new Pokemon("Empoleon", {
          nature: "Bold",
          item: "Shuca Berry"
        })

        const attacker = new Pokemon("Garchomp", {
          nature: "Jolly",
          item: "Choice Scarf",
          moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")),
          evs: { hp: 2, atk: 32, spe: 32 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 3)

        expect(result.evs!.hp).toBeGreaterThan(25)
        expect(result.evs!.def).toBeGreaterThan(28)
        expect(result.evs!.spd).toBe(0)
      })

      it("should optimize EVs for Incineroar with Sitrus Berry against Urshifu-Rapid-Strike Surging Strikes", () => {
        const defender = new Pokemon("Incineroar", {
          nature: "Impish",
          item: "Sitrus Berry"
        })

        const attacker = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Adamant",
          moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(68)
        expect(result.evs!.def).toBe(124)
        expect(result.evs!.spd).toBe(0)
      })
    })

    describe("stat priority", () => {
      it("should optimize EVs prioritizing hp when possible", () => {
        const defender = new Pokemon("Whimsicott")

        const attacker = new Pokemon("Tornadus", {
          nature: "Timid",
          moveSet: new MoveSet(new Move("Bleakwind Storm"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(92)
        expect(result.evs!.def).toBe(0)
        expect(result.evs!.spd).toBe(196)
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
          evs: { spa: 28 }
        })

        const tingLu = new Pokemon("Ting-Lu", {
          nature: "Adamant",
          item: "Clear Amulet",
          ability: new Ability("Vessel of Ruin"),
          moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const landorusTherian = new Pokemon("Landorus-Therian", {
          nature: "Adamant",
          item: "Choice Band",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 116 }
        })

        const torkoal = new Pokemon("Torkoal", {
          nature: "Quiet",
          item: "Choice Specs",
          ability: new Ability("Drought"),
          moveSet: new MoveSet(new Move("Eruption"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const heatran = new Pokemon("Heatran", {
          nature: "Modest",
          item: "Leftovers",
          ability: new Ability("Flash Fire"),
          moveSet: new MoveSet(new Move("Fire Blast"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 12 }
        })

        const moltresGalar = new Pokemon("Moltres-Galar", {
          nature: "Modest",
          item: "Choice Specs",
          ability: new Ability("Berserk"),
          moveSet: new MoveSet(new Move("Fiery Wrath"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const archaludon = new Pokemon("Archaludon", {
          nature: "Modest",
          item: "Assault Vest",
          ability: new Ability("Stamina"),
          moveSet: new MoveSet(new Move("Electro Shot"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const kingambit = new Pokemon("Kingambit", {
          nature: "Adamant",
          item: "Black Glasses",
          ability: new Ability("Defiant"),
          moveSet: new MoveSet(new Move("Kowtow Cleave"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const dondozo = new Pokemon("Dondozo", {
          nature: "Adamant",
          item: "Leftovers",
          ability: new Ability("Oblivious"),
          moveSet: new MoveSet(new Move("Wave Crash"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 0 }
        })

        const targets = [new Target(chiYu), new Target(tingLu), new Target(landorusTherian), new Target(torkoal), new Target(heatran), new Target(moltresGalar), new Target(archaludon), new Target(kingambit), new Target(dondozo)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(116)
        expect(result.evs!.def).toBe(0)
        expect(result.evs!.spd).toBe(228)
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
          evs: { spa: 28 }
        })

        const tingLu = new Pokemon("Ting-Lu", {
          nature: "Adamant",
          item: "Clear Amulet",
          ability: new Ability("Vessel of Ruin"),
          moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const landorusTherian = new Pokemon("Landorus-Therian", {
          nature: "Adamant",
          item: "Choice Band",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 116 }
        })

        const torkoal = new Pokemon("Torkoal", {
          nature: "Quiet",
          item: "Choice Specs",
          ability: new Ability("Drought"),
          moveSet: new MoveSet(new Move("Eruption"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const heatran = new Pokemon("Heatran", {
          nature: "Modest",
          item: "Leftovers",
          ability: new Ability("Flash Fire"),
          moveSet: new MoveSet(new Move("Magma Storm"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 124 }
        })

        const archaludon = new Pokemon("Archaludon", {
          nature: "Modest",
          item: "Assault Vest",
          ability: new Ability("Stamina"),
          moveSet: new MoveSet(new Move("Electro Shot"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const kingambit = new Pokemon("Kingambit", {
          nature: "Adamant",
          item: "Black Glasses",
          ability: new Ability("Defiant"),
          moveSet: new MoveSet(new Move("Kowtow Cleave"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const dondozo = new Pokemon("Dondozo", {
          nature: "Adamant",
          item: "Leftovers",
          ability: new Ability("Oblivious"),
          moveSet: new MoveSet(new Move("Wave Crash"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 0 }
        })

        const roaringMoon = new Pokemon("Roaring Moon", {
          nature: "Jolly",
          item: "Booster Energy",
          ability: new Ability("Protosynthesis"),
          moveSet: new MoveSet(new Move("Knock Off"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const targets = [new Target(chiYu), new Target(tingLu), new Target(landorusTherian), new Target(torkoal), new Target(heatran), new Target(archaludon), new Target(kingambit), new Target(dondozo), new Target(roaringMoon)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(244)
        expect(result.evs!.def).toBe(252)
        expect(result.evs!.spd).toBe(0)
      })
    })

    describe("multiple attackers", () => {
      it("should optimize EVs for multiple attackers", () => {
        const defender = new Pokemon("Scream Tail", {
          item: "Booster Energy",
          teraType: "Grass"
        })

        const calyrexShadow = new Pokemon("Calyrex-Shadow", {
          nature: "Modest",
          ability: new Ability("As One (Spectrier)"),
          moveSet: new MoveSet(new Move("Astral Barrage"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const urshifuRapidStrike = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Jolly",
          ability: new Ability("Unseen Fist"),
          teraType: "Water",
          teraTypeActive: true,
          moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const targets = [new Target(calyrexShadow), new Target(urshifuRapidStrike)]
        const field = new Field({ weather: "Rain" })

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(68)
        expect(result.evs!.def).toBe(196)
        expect(result.evs!.spd).toBe(0)
      })

      it("should optimize EVs for multiple attackers with Whimsicott", () => {
        const defender = new Pokemon("Whimsicott", {
          nature: "Bold"
        })

        const calyrexShadow = new Pokemon("Calyrex-Shadow", {
          nature: "Timid",
          item: "Life Orb",
          ability: new Ability("As One (Spectrier)"),
          moveSet: new MoveSet(new Move("Astral Barrage"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const zamazentaCrowned = new Pokemon("Zamazenta-Crowned", {
          nature: "Impish",
          item: "Rusted Shield",
          ability: new Ability("Dauntless Shield"),
          moveSet: new MoveSet(new Move("Heavy Slam"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 20 }
        })

        const targets = [new Target(calyrexShadow), new Target(zamazentaCrowned)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(236)
        expect(result.evs!.def).toBe(180)
        expect(result.evs!.spd).toBe(0)
      })

      it("should optimize EVs for multiple attackers with Gholdengo", () => {
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
          evs: { spa: 244 }
        })

        const incineroar = new Pokemon("Incineroar", {
          nature: "Impish",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Flare Blitz"), new Move(""), new Move(""), new Move("")),
          evs: { def: 188 }
        })

        const targets = [new Target(miraidon), new Target(incineroar)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(172)
        expect(result.evs!.def).toBe(28)
        expect(result.evs!.spd).toBe(4)
      })

      it("should optimize EVs for multiple attackers with 1 not survivable, 1 special attacker and 1 physical attacker", () => {
        const defender = new Pokemon("Calyrex-Shadow")

        const miraidon = new Pokemon("Miraidon", {
          nature: "Timid",
          item: "Choice Specs",
          ability: new Ability("Hadron Engine"),
          moveSet: new MoveSet(new Move("Draco Meteor"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const ragingBolt = new Pokemon("Raging Bolt", {
          nature: "Modest",
          item: "Booster Energy",
          ability: new Ability("Protosynthesis", true),
          teraType: "Electric",
          teraTypeActive: true,
          moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const chienPao = new Pokemon("Chien-Pao", {
          nature: "Adamant",
          item: "Life Orb",
          ability: new Ability("Sword of Ruin"),
          moveSet: new MoveSet(new Move("Ice Spinner"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const targets = [new Target(miraidon), new Target(ragingBolt), new Target(chienPao)]
        const field = new Field({ terrain: "Electric" })

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(108)
        expect(result.evs!.def).toBe(0)
        expect(result.evs!.spd).toBe(228)
      })

      it("should optimize EVs for two simultaneous attackers (Urshifu-Rapid-Strike + Flutter Mane vs Gholdengo)", () => {
        const defender = new Pokemon("Gholdengo")

        const urshifu = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Adamant",
          ability: new Ability("Unseen Fist"),
          teraType: "Water",
          moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const flutterMane = new Pokemon("Flutter Mane", {
          nature: "Modest",
          item: "Choice Specs",
          ability: new Ability("Protosynthesis"),
          moveSet: new MoveSet(new Move("Dazzling Gleam"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const target = new Target(urshifu, flutterMane)
        const field = new Field()

        const result = service.optimize(defender, [target], field)

        expect(result.evs!.hp).toBe(148)
        expect(result.evs!.def).toBe(60)
        expect(result.evs!.spd).toBe(4)
      })

      it("should optimize EVs for Ting-Lu with double attackers and single attackers", () => {
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
          evs: { atk: 252 }
        })

        const landorus = new Pokemon("Landorus", {
          nature: "Timid",
          item: "Life Orb",
          ability: new Ability("Sheer Force"),
          moveSet: new MoveSet(new Move("Sludge Bomb"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 116 }
        })

        const gholdengo = new Pokemon("Gholdengo", {
          nature: "Modest",
          item: "Choice Specs",
          moveSet: new MoveSet(new Move("Make It Rain"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 212 }
        })

        const chiYu = new Pokemon("Chi-Yu", {
          nature: "Bold",
          item: "Choice Specs",
          ability: new Ability("Beads of Ruin"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 28 }
        })

        const targets = [new Target(urshifuRapidStrike, landorus), new Target(gholdengo), new Target(chiYu)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(0)
        expect(result.evs!.def).toBe(0)
        expect(result.evs!.spd).toBe(140)
      })

      it("should optimize EVs for Flutter Mane against Landorus Earth Power/Moltres-Galar combined and Iron Hands/Rillaboom single", () => {
        const defender = new Pokemon("Flutter Mane", {
          nature: "Timid",
          item: "Booster Energy"
        })

        const landorus = new Pokemon("Landorus", {
          nature: "Modest",
          item: "Life Orb",
          ability: new Ability("Sheer Force"),
          moveSet: new MoveSet(new Move("Earth Power"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const moltresGalar = new Pokemon("Moltres-Galar", {
          nature: "Modest",
          ability: new Ability("Berserk"),
          moveSet: new MoveSet(new Move("Fiery Wrath"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 84 }
        })

        const ironHands = new Pokemon("Iron Hands", {
          nature: "Brave",
          item: "Assault Vest",
          moveSet: new MoveSet(new Move("Wild Charge"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 156 }
        })

        const rillaboom = new Pokemon("Rillaboom", {
          nature: "Adamant",
          item: "Assault Vest",
          ability: new Ability("Grassy Surge"),
          moveSet: new MoveSet(new Move("Wood Hammer"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 116 }
        })

        const targets = [new Target(landorus, moltresGalar), new Target(ironHands), new Target(rillaboom)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(244)
        expect(result.evs!.def).toBe(100)
        expect(result.evs!.spd).toBe(20)
      })

      it("should optimize EVs for Flutter Mane against Landorus Sludge Bomb/Moltres-Galar combined and Iron Hands/Rillaboom single", () => {
        const defender = new Pokemon("Flutter Mane", {
          nature: "Timid",
          item: "Booster Energy"
        })

        const landorus = new Pokemon("Landorus", {
          nature: "Modest",
          item: "Life Orb",
          ability: new Ability("Sheer Force"),
          moveSet: new MoveSet(new Move("Sludge Bomb"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const moltresGalar = new Pokemon("Moltres-Galar", {
          nature: "Modest",
          ability: new Ability("Berserk"),
          moveSet: new MoveSet(new Move("Fiery Wrath"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 84 }
        })

        const ironHands = new Pokemon("Iron Hands", {
          nature: "Brave",
          item: "Assault Vest",
          moveSet: new MoveSet(new Move("Wild Charge"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 156 }
        })

        const rillaboom = new Pokemon("Rillaboom", {
          nature: "Adamant",
          item: "Assault Vest",
          ability: new Ability("Grassy Surge"),
          moveSet: new MoveSet(new Move("Wood Hammer"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 116 }
        })

        const targets = [new Target(landorus, moltresGalar), new Target(ironHands), new Target(rillaboom)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(28)
        expect(result.evs!.def).toBe(244)
        expect(result.evs!.spd).toBe(0)
      })

      it("should optimize EVs for Flutter Mane against Landorus Sludge Bomb/Moltres-Galar combined and Iron Hands/Rillaboom single in Grassy Terrain", () => {
        const defender = new Pokemon("Flutter Mane", {
          nature: "Timid",
          item: "Booster Energy"
        })

        const landorus = new Pokemon("Landorus", {
          nature: "Modest",
          item: "Life Orb",
          ability: new Ability("Sheer Force"),
          moveSet: new MoveSet(new Move("Sludge Bomb"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const moltresGalar = new Pokemon("Moltres-Galar", {
          nature: "Modest",
          ability: new Ability("Berserk"),
          moveSet: new MoveSet(new Move("Fiery Wrath"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 84 }
        })

        const ironHands = new Pokemon("Iron Hands", {
          nature: "Brave",
          item: "Assault Vest",
          moveSet: new MoveSet(new Move("Wild Charge"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 156 }
        })

        const rillaboom = new Pokemon("Rillaboom", {
          nature: "Adamant",
          item: "Assault Vest",
          ability: new Ability("Grassy Surge"),
          moveSet: new MoveSet(new Move("Wood Hammer"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 116 }
        })

        const targets = [new Target(landorus, moltresGalar), new Target(ironHands), new Target(rillaboom)]
        const field = new Field({ terrain: "Grassy" })

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(4)
        expect(result.evs!.def).toBe(132)
        expect(result.evs!.spd).toBe(0)
      })

      it("should optimize EVs for Ting-Lu in it's limit", () => {
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
          evs: { atk: 252 }
        })

        const landorus = new Pokemon("Landorus", {
          nature: "Modest",
          item: "Life Orb",
          ability: new Ability("Sheer Force"),
          moveSet: new MoveSet(new Move("Sludge Bomb"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const okidogi = new Pokemon("Okidogi", {
          nature: "Adamant",
          item: "Choice Band",
          ability: new Ability("Guard Dog"),
          moveSet: new MoveSet(new Move("Gunk Shot"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const targets = [new Target(urshifuRapidStrike, landorus), new Target(okidogi)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(228)
        expect(result.evs!.def).toBe(188)
        expect(result.evs!.spd).toBe(52)
      })

      it("should optimize EVs for Gholdengo with multiple attackers including second special strongest optimization", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Calm",
          item: "Choice Specs",
          teraType: "Fairy"
        })

        const gholdengoAttacker = new Pokemon("Gholdengo", {
          nature: "Modest",
          item: "Choice Specs",
          moveSet: new MoveSet(new Move("Make It Rain"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 212 }
        })

        const chiYu = new Pokemon("Chi-Yu", {
          nature: "Bold",
          item: "Choice Specs",
          ability: new Ability("Beads of Ruin"),
          moveSet: new MoveSet(new Move("Heat Wave"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 28 }
        })

        const landorus1 = new Pokemon("Landorus", {
          nature: "Timid",
          ability: new Ability("Sheer Force"),
          moveSet: new MoveSet(new Move("Earth Power"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const urshifu = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Adamant",
          ability: new Ability("Unseen Fist"),
          moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const arcanine = new Pokemon("Arcanine", {
          nature: "Jolly",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Flare Blitz"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 236 }
        })

        const rillaboom1 = new Pokemon("Rillaboom", {
          nature: "Adamant",
          item: "Choice Band",
          ability: new Ability("Grassy Surge"),
          moveSet: new MoveSet(new Move("High Horsepower"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const landorus2 = new Pokemon("Landorus", {
          nature: "Timid",
          ability: new Ability("Sheer Force"),
          moveSet: new MoveSet(new Move("Earth Power"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 196 }
        })

        const rillaboom2 = new Pokemon("Rillaboom", {
          nature: "Adamant",
          item: "Choice Band",
          ability: new Ability("Grassy Surge"),
          moveSet: new MoveSet(new Move("High Horsepower"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const targets = [new Target(gholdengoAttacker), new Target(chiYu), new Target(landorus1), new Target(urshifu), new Target(arcanine), new Target(rillaboom1), new Target(landorus2), new Target(rillaboom2)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(116)
        expect(result.evs!.def).toBe(244)
        expect(result.evs!.spd).toBe(148)
      })

      it("should optimize EVs for Gholdengo with multiple attackers including second physical strongest optimization", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Calm",
          item: "Choice Specs",
          teraType: "Fairy"
        })

        const arcanineHisuiAdamant = new Pokemon("Arcanine-Hisui", {
          nature: "Adamant",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Flare Blitz"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 212 }
        })

        const arcanineHisuiModest = new Pokemon("Arcanine-Hisui", {
          nature: "Modest",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Flare Blitz"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 212 }
        })

        const charizard = new Pokemon("Charizard", {
          nature: "Timid",
          ability: new Ability("Solar Power"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const heatran = new Pokemon("Heatran", {
          nature: "Modest",
          item: "Leftovers",
          ability: new Ability("Flash Fire"),
          moveSet: new MoveSet(new Move("Magma Storm"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 124 }
        })

        const targets = [new Target(arcanineHisuiAdamant), new Target(arcanineHisuiModest), new Target(charizard), new Target(heatran)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(244)
        expect(result.evs!.def).toBe(52)
        expect(result.evs!.spd).toBe(180)
      })

      it("should optimize EVs for Gholdengo without updating nature (keeping Bold)", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Bold",
          item: "Choice Specs",
          teraType: "Fairy"
        })

        const charizard = new Pokemon("Charizard", {
          nature: "Modest",
          ability: new Ability("Solar Power"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 220 }
        })

        const arcanineHisui = new Pokemon("Arcanine-Hisui", {
          nature: "Adamant",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Flare Blitz"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 204 }
        })

        const heatran = new Pokemon("Heatran", {
          nature: "Bold",
          item: "Leftovers",
          ability: new Ability("Flash Fire"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 172 }
        })

        const targets = [new Target(charizard), new Target(arcanineHisui), new Target(heatran)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(164)
        expect(result.evs!.def).toBe(212)
        expect(result.evs!.spd).toBe(0)
        expect(result.nature).toBeNull()
      })

      it("should optimize EVs for Gholdengo when not surviving double attackers but surviving special attacker", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Jolly",
          item: "Choice Specs"
        })

        const charizard = new Pokemon("Charizard", {
          nature: "Modest",
          ability: new Ability("Solar Power"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 220 }
        })

        const arcanine = new Pokemon("Arcanine", {
          nature: "Jolly",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Flare Blitz"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 236 }
        })

        const heatran = new Pokemon("Heatran", {
          nature: "Modest",
          item: "Leftovers",
          ability: new Ability("Flash Fire"),
          moveSet: new MoveSet(new Move("Fire Blast"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 12 }
        })

        const targets = [new Target(arcanine, charizard), new Target(heatran)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(116)
        expect(result.evs!.def).toBe(0)
        expect(result.evs!.spd).toBe(228)
      })

      it("should optimize EVs for Gholdengo when not surviving double attackers but surviving physical attacker", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Jolly",
          item: "Choice Specs",
          teraType: "Fairy"
        })

        const charizard = new Pokemon("Charizard", {
          nature: "Modest",
          ability: new Ability("Solar Power"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 220 }
        })

        const arcanine = new Pokemon("Arcanine", {
          nature: "Jolly",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Flare Blitz"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 236 }
        })

        const targets = [new Target(arcanine, charizard), new Target(arcanine)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs!.hp).toBe(116)
        expect(result.evs!.def).toBe(244)
        expect(result.evs!.spd).toBe(0)
      })
    })

    describe("nature optimization", () => {
      it("should optimize EVs for Gholdengo with update nature enabled (switching to Calm)", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Bold",
          item: "Choice Specs",
          teraType: "Fairy"
        })

        const charizard = new Pokemon("Charizard", {
          nature: "Modest",
          ability: new Ability("Solar Power"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 220 }
        })

        const arcanineHisui = new Pokemon("Arcanine-Hisui", {
          nature: "Adamant",
          ability: new Ability("Intimidate"),
          moveSet: new MoveSet(new Move("Flare Blitz"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 204 }
        })

        const heatran = new Pokemon("Heatran", {
          nature: "Bold",
          item: "Leftovers",
          ability: new Ability("Flash Fire"),
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 172 }
        })

        const targets = [new Target(charizard), new Target(arcanineHisui), new Target(heatran)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true, false, 2)

        expect(result.evs!.hp).toBe(244)
        expect(result.evs!.def).toBe(0)
        expect(result.evs!.spd).toBe(252)
        expect(result.nature).toBe("Calm")
      })

      it("should return null when no solution is found with update nature enabled", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Modest"
        })

        const attacker = new Pokemon("Heatran", {
          nature: "Modest",
          teraType: "Fire",
          teraTypeActive: true,
          item: "Choice Specs",
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 12 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("no-solution")
        expect(result.evs).toBeNull()
        expect(result.nature).toBeNull()
      })

      it("should return null when it's not possible to find a solution even when the user pass evs as parameter", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Modest",
          evs: { hp: 252, spd: 252 }
        })

        const attacker = new Pokemon("Heatran", {
          nature: "Modest",
          teraType: "Fire",
          teraTypeActive: true,
          item: "Choice Specs",
          moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 12 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("no-solution")
        expect(result.evs).toBeNull()
        expect(result.nature).toBeNull()
      })
    })

    describe("budget conflict degradation via optimize", () => {
      const ivCB180 = () => new Pokemon("Iron Valiant", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")), evs: { atk: 180 } })
      const fmTera60 = () => new Pokemon("Flutter Mane", { nature: "Modest", item: "Choice Specs", teraType: "Fairy", teraTypeActive: true, moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), evs: { spa: 60 } })

      it("should protect the physical side when both categories cannot fit the EV budget", () => {
        const result = service.optimize(new Pokemon("Ting-Lu"), [new Target(ivCB180()), new Target(fmTera60())], new Field())

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 244, atk: 0, def: 236, spa: 0, spd: 0, spe: 0 })
      })

      it("should prioritize the special side when its partial solution carries more hp", () => {
        const ivLO = new Pokemon("Iron Valiant", { nature: "Adamant", item: "Life Orb", moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })

        const result = service.optimize(new Pokemon("Ting-Lu"), [new Target(ivLO), new Target(fmTera60())], new Field())

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 60, atk: 0, def: 252, spa: 0, spd: 0, spe: 0 })
      })

      it("should fall back to the second strongest special attacker when the strongest cannot fit", () => {
        const ragingBolt = new Pokemon("Raging Bolt", { nature: "Modest", moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })

        const result = service.optimize(new Pokemon("Ting-Lu"), [new Target(ivCB180()), new Target(fmTera60()), new Target(ragingBolt)], new Field())

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 244, atk: 0, def: 236, spa: 0, spd: 0, spe: 0 })
      })

      it("should combine a double target with conflicting singles", () => {
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const moltresGalar = new Pokemon("Moltres-Galar", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Fiery Wrath"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })

        const result = service.optimize(new Pokemon("Ting-Lu"), [new Target(ivCB180()), new Target(fmTera60()), new Target(chiYu, moltresGalar)], new Field())

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 252, atk: 0, def: 0, spa: 0, spd: 188, spe: 0 })
      })
    })

    describe("refinement with residual burn damage on a double target via optimize", () => {
      it("should protect the burned singles and abandon a double that only survives above the legal EV budget", () => {
        const ironValiant = new Pokemon("Iron Valiant", { nature: "Adamant", moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")), evs: { atk: 0 } })
        const flutterMane = new Pokemon("Flutter Mane", { nature: "Modest", moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })
        const garchomp = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const volcarona = new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Fiery Dance"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Incineroar", { status: Status.BURN })

        const result = service.optimize(defender, [new Target(ironValiant), new Target(flutterMane), new Target(garchomp, volcarona)], new Field(), false, false, 2)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 244, atk: 0, def: 244, spa: 0, spd: 0, spe: 0 })
      })
    })

    describe("refinement with residual recovery via optimize", () => {
      it("should trim and rebalance the spread when the KO chance involves Leftovers recovery", () => {
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 124 } })
        const flutterMane = new Pokemon("Flutter Mane", { nature: "Modest", moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })
        const defender = new Pokemon("Ting-Lu", { item: "Leftovers" })

        const result = service.optimize(defender, [new Target(ursaluna), new Target(flutterMane)], new Field(), false, false, 3)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 172, atk: 0, def: 228, spa: 0, spd: 0, spe: 0 })
      })
    })

    describe("impossible single attacker with survivable double target via optimize", () => {
      it("should protect the survivable double and treat the unsurvivable single attacker as a lost cause", () => {
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Dark Pulse"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const moltresGalar = new Pokemon("Moltres-Galar", { nature: "Modest", moveSet: new MoveSet(new Move("Fiery Wrath"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Ting-Lu", { status: Status.BURN })

        const result = service.optimize(defender, [new Target(ursaluna), new Target(chiYu, moltresGalar)], new Field(), false, false, 3)

        expect(result.status).toBe("not-needed")
        expect(result.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should invest for the survivable special attacker when the physical attacker is impossible", () => {
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const flutterMane = new Pokemon("Flutter Mane", { nature: "Modest", moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })

        const result = service.optimize(new Pokemon("Ting-Lu"), [new Target(ursaluna), new Target(flutterMane)], new Field(), false, false, 3)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 180, atk: 0, def: 0, spa: 0, spd: 236, spe: 0 })
      })
    })

    describe("immune attackers via optimize", () => {
      it("should return not-needed when the only attacker deals no damage", () => {
        const landorus = new Pokemon("Landorus-Therian", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const defender = new Pokemon("Rotom-Wash", { ability: new Ability("Levitate") })

        const result = service.optimize(defender, [new Target(landorus)], new Field())

        expect(result.status).toBe("not-needed")
        expect(result.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should ignore an immune attacker and optimize for the remaining ones", () => {
        const landorus = new Pokemon("Landorus-Therian", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const urshifu = new Pokemon("Urshifu-Rapid-Strike", { nature: "Adamant", moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const defender = new Pokemon("Rotom-Wash", { ability: new Ability("Levitate") })

        const result = service.optimize(defender, [new Target(landorus), new Target(urshifu)], new Field())

        expect(result.status).toBe("not-needed")
        expect(result.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })
    })

    describe("field side orientation via optimize", () => {
      it("should swap field sides when rightIsDefender is false", () => {
        const groudon = () => new Pokemon("Groudon", { nature: "Adamant", moveSet: new MoveSet(new Move("Precipice Blades"), new Move(""), new Move(""), new Move("")), evs: { atk: 252, spe: 252 } })
        const field = () => new Field({ attackerSide: new FieldSide({ isReflect: true }) })

        const resultRight = service.optimize(new Pokemon("Flutter Mane"), [new Target(groudon())], field(), false, false, 2, 15, true)
        const resultLeft = service.optimize(new Pokemon("Flutter Mane"), [new Target(groudon())], field(), false, false, 2, 15, false)

        expect(resultRight.status).toBe("success")
        expect(resultRight.evs).toEqual({ hp: 4, atk: 0, def: 212, spa: 0, spd: 0, spe: 0 })
        expect(resultLeft.status).toBe("not-needed")
        expect(resultLeft.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })
    })

    describe("constraints", () => {
      it("should return null when optimized EVs exceed budget with keepOffensiveEvs", () => {
        const defender = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Adamant",
          evs: { atk: 252, spe: 252 }
        })

        const attacker = new Pokemon("Flutter Mane", {
          nature: "Timid",
          moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, true, 2)

        expect(result.evs).toBeNull()
        expect(result.nature).toBeNull()
      })

      it("should return null with zero offensive EVs when keepOffensiveEvs is false", () => {
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
          evs: { atk: 252 },
          boosts: { atk: 6 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs).toBeNull()
        expect(result.nature).toBeNull()
      })

      it("should return null when cannot survive", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Bold",
          item: "Leftovers",
          teraType: "Fairy",
          teraTypeActive: true
        })

        const urshifu = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Jolly",
          moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const landorus = new Pokemon("Landorus-Therian", {
          nature: "Jolly",
          moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 116 }
        })

        const target = new Target(urshifu, landorus)
        const field = new Field()

        const result = service.optimize(defender, [target], field, false, false, 3)

        expect(result.evs).toBeNull()
        expect(result.nature).toBeNull()
      })
    })

    describe("multi-hit survival", () => {
      describe("fixed nature", () => {
        it("should optimize EVs when have residual damage and 2HKO configured", () => {
          const defender = new Pokemon("Flutter Mane", {
            evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Modest",
            item: "Choice Specs",
            moveSet: new MoveSet(new Move("Magma Storm"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
            evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()

          const result = service.optimize(defender, targets, field)

          expect(result.evs!.hp).toBe(92)
          expect(result.evs!.def).toBe(0)
          expect(result.evs!.spd).toBe(44)
        })

        it("should optimize EVs when have residual damage and 3HKO configured", () => {
          const defender = new Pokemon("Landorus", {
            evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Adamant",
            moveSet: new MoveSet(new Move("Magma Storm"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
            evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 252 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()

          const result = service.optimize(defender, targets, field, false, false, 3)

          expect(result.evs!.hp).toBe(180)
          expect(result.evs!.def).toBe(0)
          expect(result.evs!.spd).toBe(236)
        })

        it("should optimize EVs when have residual damage and 4HKO configured", () => {
          const defender = new Pokemon("Landorus", {
            evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Adamant",
            boosts: { hp: 0, atk: 0, def: 0, spa: -2, spd: 0, spe: 0 },
            moveSet: new MoveSet(new Move("Magma Storm"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
            evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 252 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()

          const result = service.optimize(defender, targets, field, false, false, 4)

          expect(result.evs!.hp).toBe(84)
          expect(result.evs!.def).toBe(0)
          expect(result.evs!.spd).toBe(180)
        })

        it("should optimize EVs when have residual damage and 3HKO configured but have recovery with precendence", () => {
          const defender = new Pokemon("Gholdengo", {
            evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
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
            evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()

          const result = service.optimize(defender, targets, field, false, false, 3)

          expect(result.evs!.hp).toBe(164)
          expect(result.evs!.def).toBe(204)
          expect(result.evs!.spd).toBe(0)
        })
      })

      describe("with nature update", () => {
        it("should optimize EVs when have residual damage and 2HKO configured and update nature", () => {
          const defender = new Pokemon("Flutter Mane", {
            evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Modest",
            item: "Choice Specs",
            moveSet: new MoveSet(new Move("Magma Storm"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
            evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()
          const updateNature = true

          const result = service.optimize(defender, targets, field, updateNature)

          expect(result.evs!.hp).toBe(36)
          expect(result.evs!.def).toBe(0)
          expect(result.evs!.spd).toBe(0)
        })

        it("should optimize EVs when have residual damage and 3HKO configured and update nature", () => {
          const defender = new Pokemon("Landorus", {
            evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Adamant",
            moveSet: new MoveSet(new Move("Magma Storm"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
            evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 252 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()
          const updateNature = true

          const result = service.optimize(defender, targets, field, updateNature, false, 3)

          expect(result.evs!.hp).toBe(20)
          expect(result.evs!.def).toBe(0)
          expect(result.evs!.spd).toBe(252)
        })

        it("should optimize EVs when have residual damage and 4HKO configured and update nature", () => {
          const defender = new Pokemon("Landorus", {
            evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Adamant",
            boosts: { hp: 0, atk: 0, def: 0, spa: -2, spd: 0, spe: 0 },
            moveSet: new MoveSet(new Move("Magma Storm"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
            evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 252 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()
          const updateNature = true

          const result = service.optimize(defender, targets, field, updateNature, false, 4)

          expect(result.evs!.hp).toBe(84)
          expect(result.evs!.def).toBe(0)
          expect(result.evs!.spd).toBe(92)
        })
      })
    })

    describe("recovery scenarios (leftovers)", () => {
      describe("3 hits", () => {
        it("should optimize EVs when have recovery and 3HKO configured", () => {
          const defender = new Pokemon("Landorus", {
            item: "Leftovers"
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Adamant",
            moveSet: new MoveSet(new Move("Magma Storm"), new Move(""), new Move(""), new Move("")),
            evs: { spa: 0 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()

          const result = service.optimize(defender, targets, field, false, false, 3)

          expect(result.evs!.hp).toBe(20)
          expect(result.evs!.def).toBe(0)
          expect(result.evs!.spd).toBe(188)
        })

        it("should optimize EVs when have Leech Seed in defender side and 3HKO configured", () => {
          const defender = new Pokemon("Flutter Mane", {
            nature: "Bold"
          })

          const attacker = new Pokemon("Urshifu-Rapid-Strike", {
            nature: "Calm",
            moveSet: new MoveSet(new Move("Aqua Jet"), new Move("Close Combat"), new Move("Surging Strikes"), new Move("Protect")),
            evs: { atk: 252 }
          })

          const targets = [new Target(attacker)]
          const field = new Field({ defenderSide: new FieldSide({ isSeeded: true }) })

          const result = service.optimize(defender, targets, field, false, false, 3)

          expect(result.evs!.hp).toBe(4)
          expect(result.evs!.def).toBe(52)
          expect(result.evs!.spd).toBe(0)
        })

        it("should optimize EVs when have recovery and 3HKO configured and update nature", () => {
          const defender = new Pokemon("Landorus", {
            item: "Leftovers"
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Adamant",
            moveSet: new MoveSet(new Move("Magma Storm"), new Move(""), new Move(""), new Move("")),
            evs: { spa: 0 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()
          const updateNature = true

          const result = service.optimize(defender, targets, field, updateNature, false, 3)

          expect(result.evs!.hp).toBe(20)
          expect(result.evs!.def).toBe(0)
          expect(result.evs!.spd).toBe(100)
        })

        it("should optimize EVs for single physical attacker against Rillaboom with recovery from Leftovers and Grass terrain", () => {
          const defender = new Pokemon("Rillaboom", {
            nature: "Bold",
            item: "Leftovers",
            ability: new Ability("Grassy Surge")
          })

          const attacker = new Pokemon("Urshifu-Rapid-Strike", {
            nature: "Adamant",
            moveSet: new MoveSet(new Move("U-turn"), new Move("Surging Strikes"), new Move("Aqua Jet"), new Move("Detect")),
            evs: { atk: 20 }
          })

          const targets = [new Target(attacker)]
          const field = new Field({ terrain: "Grassy" })

          const result = service.optimize(defender, targets, field, false, false, 4)

          expect(result.evs!.hp).toBe(28)
          expect(result.evs!.def).toBe(164)
          expect(result.evs!.spd).toBe(0)
        })
      })

      describe("4 hits", () => {
        it("should optimize EVs when have recovery and 4HKO configured", () => {
          const defender = new Pokemon("Landorus", {
            item: "Leftovers"
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Adamant",
            boosts: { spa: -2 },
            moveSet: new MoveSet(new Move("Magma Storm"), new Move(""), new Move(""), new Move("")),
            evs: { spa: 0 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()

          const result = service.optimize(defender, targets, field, false, false, 4)

          expect(result.evs!.hp).toBe(12)
          expect(result.evs!.def).toBe(0)
          expect(result.evs!.spd).toBe(12)
        })

        it("should optimize EVs when have recovery and 4HKO configured and update nature", () => {
          const defender = new Pokemon("Landorus", {
            item: "Leftovers"
          })

          const attacker = new Pokemon("Heatran", {
            nature: "Adamant",
            boosts: { spa: -1 },
            moveSet: new MoveSet(new Move("Magma Storm"), new Move(""), new Move(""), new Move("")),
            evs: { spa: 0 }
          })

          const targets = [new Target(attacker)]
          const field = new Field()
          const updateNature = true

          const result = service.optimize(defender, targets, field, updateNature, false, 4)

          expect(result.evs!.hp).toBe(12)
          expect(result.evs!.def).toBe(0)
          expect(result.evs!.spd).toBe(196)
        })
      })
    })

    describe("double attackers with residual and recovery", () => {
      it("should optimize EVs for physical attackers pair", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Modest",
          item: "Leftovers",
          teraType: "Fairy",
          teraTypeActive: true
        })

        const urshifu = new Pokemon("Urshifu-Rapid-Strike", {
          nature: "Adamant",
          moveSet: new MoveSet(new Move("Aqua Jet"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const landorus = new Pokemon("Landorus-Therian", {
          nature: "Adamant",
          item: "Choice Band",
          moveSet: new MoveSet(new Move("Rock Slide"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const target = new Target(urshifu, landorus)
        const field = new Field()

        const result = service.optimize(defender, [target], field, false, false, 3)

        expect(result.evs!.hp).toBe(100)
        expect(result.evs!.def).toBe(252)
        expect(result.evs!.spd).toBe(0)
      })

      it("should optimize EVs for special attackers pair", () => {
        const defender = new Pokemon("Gholdengo", {
          nature: "Modest",
          item: "Leftovers",
          teraType: "Fairy",
          teraTypeActive: true
        })

        const flutterMane = new Pokemon("Flutter Mane", {
          nature: "Timid",
          moveSet: new MoveSet(new Move("Dazzling Gleam"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 0 }
        })

        const landorus = new Pokemon("Landorus", {
          nature: "Timid",
          ability: new Ability("Sand Force"),
          moveSet: new MoveSet(new Move("Extrasensory"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 0 }
        })

        const target = new Target(flutterMane, landorus)
        const field = new Field()

        const result = service.optimize(defender, [target], field, false, false, 3)

        expect(result.evs!.hp).toBe(4)
        expect(result.evs!.def).toBe(0)
        expect(result.evs!.spd).toBe(148)
      })

      it("should optimize EVs for mixed attackers pair", () => {
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
          evs: { atk: 0 }
        })

        const flutterMane = new Pokemon("Flutter Mane", {
          nature: "Timid",
          ability: new Ability("Protosynthesis"),
          moveSet: new MoveSet(new Move("Dazzling Gleam"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 0 }
        })

        const target = new Target(urshifu, flutterMane)
        const field = new Field()

        const result = service.optimize(defender, [target], field, false, false, 3)

        expect(result.evs!.hp).toBe(244)
        expect(result.evs!.def).toBe(12)
        expect(result.evs!.spd).toBe(84)
      })
    })
    describe("optimization status", () => {
      it("should return null EVs when no solution is found", () => {
        const defender = new Pokemon("Sunkern")

        const attacker = new Pokemon("Deoxys-Attack", {
          nature: "Adamant",
          item: "Choice Band",
          moveSet: new MoveSet(new Move("Psycho Boost"), new Move(""), new Move(""), new Move("")),
          evs: { atk: 252 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs).toBeNull()
      })

      it("should return zeroed EVs when the only unprotected attacker is impossible and the others need no EVs", () => {
        const defender = new Pokemon("Tyranitar-Mega", {
          nature: "Bold",
          item: "Tyranitarite"
        })

        const sneasler = new Pokemon("Sneasler", {
          nature: "Adamant",
          item: "Electric Seed",
          ability: new Ability("Unburden"),
          moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")),
          evs: { hp: 228, atk: 156, def: 4, spd: 4, spe: 116 }
        })

        const basculegion = new Pokemon("Basculegion", {
          nature: "Adamant",
          item: "Sitrus Berry",
          ability: new Ability("Swift Swim"),
          moveSet: new MoveSet(new Move("Wave Crash"), new Move(""), new Move(""), new Move("")),
          evs: { hp: 100, atk: 252, def: 28, spd: 20, spe: 108 }
        })

        const rotomMow = new Pokemon("Rotom-Mow", {
          nature: "Timid",
          item: "Choice Scarf",
          ability: new Ability("Levitate"),
          moveSet: new MoveSet(new Move("Leaf Storm"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 252, spd: 4, spe: 252 }
        })

        const targets = [new Target(sneasler), new Target(basculegion), new Target(rotomMow)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("not-needed")
        expect(result.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should return zeroed EVs when no solution is needed (already survives)", () => {
        const defender = new Pokemon("Blissey")

        const attacker = new Pokemon("Pichu", {
          moveSet: new MoveSet(new Move("Thunder Shock"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 0 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("not-needed")
        expect(result.evs).not.toBeNull()
        if (result.evs) {
          expect(result.evs!.hp).toBe(0)
          expect(result.evs!.def).toBe(0)
          expect(result.evs!.spd).toBe(0)
        }
      })
    })

    describe("refinement stage via optimize", () => {
      it("should increase EVs to survive residual sandstorm damage", () => {
        const defender = new Pokemon("Blissey")
        const attacker = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const targets = [new Target(attacker)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 0, atk: 0, def: 20, spa: 0, spd: 0, spe: 0 })
      })

      it("should reduce EVs when Leftovers recovery over-satisfies survival", () => {
        const defender = new Pokemon("Blissey", { item: "Leftovers" })
        const attacker = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 0, atk: 0, def: 4, spa: 0, spd: 0, spe: 0 })
      })

      it("should return no-solution for a mixed double that only survives above the legal EV budget under sandstorm", () => {
        const physical = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const special = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(physical, special)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("no-solution")
        expect(result.evs).toBeNull()
      })

      it("should reduce a mixed double-attacker solution when Leftovers recovery applies", () => {
        const physical = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const special = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Snorlax", { item: "Leftovers" })
        const targets = [new Target(physical, special)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 156, atk: 0, def: 108, spa: 0, spd: 180, spe: 0 })
      })

      it("should return no-solution when even maxed refinement cannot survive under sandstorm", () => {
        const attacker = new Pokemon("Kartana", { nature: "Jolly", item: "Choice Band", moveSet: new MoveSet(new Move("Leaf Blade"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const defender = new Pokemon("Flutter Mane")
        const targets = [new Target(attacker)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("no-solution")
        expect(result.evs).toBeNull()
      })

      it("should keep the SpD that protects the strongest special attacker when refining a combined fallback solution", () => {
        const defender = new Pokemon("Ting-Lu", { item: "Sitrus Berry", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")) })
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 84 } })
        const rillaboom = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Wood Hammer"), new Move(""), new Move(""), new Move("")), evs: { atk: 124 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 164 } })
        const targets = [new Target(ursaluna), new Target(rillaboom), new Target(chiYu)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 3)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 20, atk: 0, def: 84, spa: 0, spd: 124, spe: 0 })
      })

      it("should combine the strongest special solution with the physical defense when the special side is prioritized", () => {
        const defender = new Pokemon("Ting-Lu", { item: "Sitrus Berry", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")) })
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 184 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", item: "Life Orb", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 124 } })
        const ironBundle = new Pokemon("Iron Bundle", { nature: "Modest", moveSet: new MoveSet(new Move("Hydro Pump"), new Move(""), new Move(""), new Move("")), evs: { spa: 220 } })
        const targets = [new Target(ursaluna), new Target(chiYu), new Target(ironBundle)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 3)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 236, atk: 0, def: 28, spa: 0, spd: 236, spe: 0 })
      })

      it("should keep a valid spread when the combined single solutions cannot absorb the double target", () => {
        const defender = new Pokemon("Ting-Lu", { item: "Sitrus Berry", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")) })
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 184 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", item: "Life Orb", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 124 } })
        const ironBundle = new Pokemon("Iron Bundle", { nature: "Modest", moveSet: new MoveSet(new Move("Hydro Pump"), new Move(""), new Move(""), new Move("")), evs: { spa: 220 } })
        const garchomp = new Pokemon("Garchomp", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 164 } })
        const chiYuPartner = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Flamethrower"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })
        const targets = [new Target(ursaluna), new Target(chiYu), new Target(ironBundle), new Target(garchomp, chiYuPartner)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 3)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 236, atk: 0, def: 28, spa: 0, spd: 236, spe: 0 })
      })

      it("should drop the physical solution when the double target solution already protects the strongest physical attacker", () => {
        const defender = new Pokemon("Ting-Lu", { item: "Sitrus Berry", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")) })
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 184 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", item: "Life Orb", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 124 } })
        const ironBundle = new Pokemon("Iron Bundle", { nature: "Modest", moveSet: new MoveSet(new Move("Hydro Pump"), new Move(""), new Move(""), new Move("")), evs: { spa: 220 } })
        const garchomp = new Pokemon("Garchomp", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 184 } })
        const dusclops = new Pokemon("Dusclops", { moveSet: new MoveSet(new Move("Body Press"), new Move(""), new Move(""), new Move("")), evs: { atk: 0 } })
        const targets = [new Target(ursaluna), new Target(chiYu), new Target(ironBundle), new Target(garchomp, dusclops)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 3)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 236, atk: 0, def: 28, spa: 0, spd: 236, spe: 0 })
      })

      it("should protect the physical attacker and abandon a double target that has no legal spread", () => {
        const defender = new Pokemon("Ting-Lu", { item: "Sitrus Berry", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")) })
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 84 } })
        const garchomp = new Pokemon("Garchomp", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 164 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Flamethrower"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })
        const targets = [new Target(ursaluna), new Target(garchomp, chiYu)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 3)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 20, atk: 0, def: 84, spa: 0, spd: 0, spe: 0 })
      })

      it("should re-check a double refinement against the strongest single attackers and reject a spread that fails one of them", () => {
        const defender = new Pokemon("Snorlax", { item: "Leftovers" })
        const physD = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), evs: { atk: 0 } })
        const specD = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })
        const strongPhys = new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const strongSpec = new Pokemon("Raging Bolt", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const targets = [new Target(physD, specD), new Target(strongPhys), new Target(strongSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 4, atk: 0, def: 132, spa: 0, spd: 0, spe: 0 })
      })

      it("should protect the strongest singles and abandon a double that only survives above the legal EV budget under sandstorm", () => {
        const defender = new Pokemon("Grimmsnarl")
        const physD = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), evs: { atk: 84 } })
        const specD = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), evs: { spa: 84 } })
        const strongPhys = new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const strongSpec = new Pokemon("Raging Bolt", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const targets = [new Target(physD, specD), new Target(strongPhys), new Target(strongSpec)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 4, atk: 0, def: 0, spa: 0, spd: 164, spe: 0 })
      })

      it("should keep the singles-only spread when a reversed mixed double has no legal spread under sandstorm", () => {
        const defender = new Pokemon("Grimmsnarl")
        const physD = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), evs: { atk: 0 } })
        const specD = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), evs: { spa: 168 } })
        const strongPhys = new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const strongSpec = new Pokemon("Raging Bolt", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const targets = [new Target(physD, specD), new Target(strongPhys), new Target(strongSpec)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 4, atk: 0, def: 0, spa: 0, spd: 164, spe: 0 })
      })

      it("should reduce a double solution down to zero while satisfying the strongest single physical attacker under Leftovers", () => {
        const defender = new Pokemon("Ting-Lu", { item: "Leftovers" })
        const physD = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), evs: { atk: 0 } })
        const specD = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })
        const strongPhys = new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const strongSpec = new Pokemon("Raging Bolt", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const targets = [new Target(physD, specD), new Target(strongPhys), new Target(strongSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("not-needed")
        expect(result.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })
    })

    describe("solution combiner via optimize", () => {
      it("should combine solutions across two mixed double-attacker targets", () => {
        const physStrong = new Pokemon("Garchomp", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const specStrong = new Pokemon("Chi-Yu", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const physWeak = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Wood Hammer"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const specWeak = new Pokemon("Gastrodon", { nature: "Modest", moveSet: new MoveSet(new Move("Muddy Water"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Incineroar")
        const targets = [new Target(physStrong, specStrong), new Target(physWeak, specWeak)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 180, atk: 0, def: 4, spa: 0, spd: 44, spe: 0 })
      })

      it("should combine a physical single with a weaker mixed double target", () => {
        const strongPhys = new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const dblPhys = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const dblSpec = new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Struggle Bug"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(strongPhys), new Target(dblPhys, dblSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 4, atk: 0, def: 132, spa: 0, spd: 0, spe: 0 })
      })

      it("should combine a special single with a weaker mixed double target", () => {
        const strongSpec = new Pokemon("Chi-Yu", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const dblPhys = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const dblSpec = new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Struggle Bug"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(strongSpec), new Target(dblPhys, dblSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 20, atk: 0, def: 0, spa: 0, spd: 148, spe: 0 })
      })

      it("should find an optimized combined solution for two strong singles plus a weaker double target", () => {
        const strongPhys = new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const strongSpec = new Pokemon("Chi-Yu", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const dblPhys = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const dblSpec = new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Struggle Bug"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(strongPhys), new Target(strongSpec), new Target(dblPhys, dblSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 124, atk: 0, def: 84, spa: 0, spd: 84, spe: 0 })
      })

      it("should protect the physical single when a special-pair double cannot also be covered", () => {
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", item: "Choice Specs", ability: new Ability("Beads of Ruin"), moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const moltresGalar = new Pokemon("Moltres-Galar", { nature: "Modest", item: "Choice Specs", ability: new Ability("Berserk"), moveSet: new MoveSet(new Move("Fiery Wrath"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const ironValiant = new Pokemon("Iron Valiant", { nature: "Adamant", item: "Life Orb", moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const defender = new Pokemon("Ting-Lu")
        const targets = [new Target(chiYu, moltresGalar), new Target(ironValiant)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 60, atk: 0, def: 252, spa: 0, spd: 0, spe: 0 })
      })

      it("should protect the special single when a physical-pair double cannot also be covered", () => {
        const kingambit = new Pokemon("Kingambit", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Kowtow Cleave"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const landorusTherian = new Pokemon("Landorus-Therian", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const tornadus = new Pokemon("Tornadus", { nature: "Timid", item: "Life Orb", moveSet: new MoveSet(new Move("Bleakwind Storm"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Rillaboom")
        const targets = [new Target(kingambit, landorusTherian), new Target(tornadus)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 124, atk: 0, def: 0, spa: 0, spd: 236, spe: 0 })
      })
    })

    describe("attacker selector nature scenarios via optimize", () => {
      it("should pick a Defense-boosting nature against two physical attackers when updateNature is on", () => {
        const strongPhys = new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const weakPhys = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const defender = new Pokemon("Grimmsnarl")
        const targets = [new Target(strongPhys), new Target(weakPhys)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 164, atk: 0, def: 244, spa: 0, spd: 0, spe: 0 })
      })

      it("should pick a Special-Defense-boosting nature against two special attackers when updateNature is on", () => {
        const strongSpec = new Pokemon("Miraidon", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const weakSpec = new Pokemon("Flutter Mane", { nature: "Modest", moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Grimmsnarl")
        const targets = [new Target(strongSpec), new Target(weakSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 148, atk: 0, def: 0, spa: 0, spd: 252, spe: 0 })
      })

      it("should break an exact damage tie between nature scenarios by survivable count when both categories attack", () => {
        const rillaboom = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Wood Hammer"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const ragingBolt = new Pokemon("Raging Bolt", { nature: "Modest", moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")), evs: { spa: 60 } })
        const defender = new Pokemon("Dondozo")
        const targets = [new Target(rillaboom), new Target(ragingBolt)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("success")
        expect(result.nature).toBe("Bold")
        expect(result.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 92, spe: 0 })
      })

      it("should resolve an exact damage tie toward the SpD nature when only special attackers are present", () => {
        const amoonguss = new Pokemon("Amoonguss", { nature: "Calm", moveSet: new MoveSet(new Move("Pollen Puff"), new Move(""), new Move(""), new Move("")), evs: { spa: 68 } })
        const defender = new Pokemon("Corviknight")
        const targets = [new Target(amoonguss)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("not-needed")
        expect(result.nature).toBe("Calm")
        expect(result.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should resolve an exact damage tie toward the Def nature when only physical attackers are present", () => {
        const clefairy = new Pokemon("Clefairy", { nature: "Bold", moveSet: new MoveSet(new Move("Knock Off"), new Move(""), new Move(""), new Move("")), evs: { atk: 0 } })
        const defender = new Pokemon("Ting-Lu")
        const targets = [new Target(clefairy)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("not-needed")
        expect(result.nature).toBe("Bold")
        expect(result.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should pick Impish as the Defense nature when the defender has more physical than special moves", () => {
        const strongPhys = new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const defender = new Pokemon("Grimmsnarl", { moveSet: new MoveSet(new Move("Play Rough"), new Move("Spirit Break"), new Move("Thunder Wave"), new Move("")) })
        const targets = [new Target(strongPhys)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("success")
        expect(result.nature).toBe("Impish")
        expect(result.evs).toEqual({ hp: 164, atk: 0, def: 244, spa: 0, spd: 0, spe: 0 })
      })

      it("should break a full-total tie between Def and SpD nature scenarios by comparing physical vs special survivable counts", () => {
        const defender = new Pokemon("Amoonguss", { moveSet: new MoveSet(new Move("Play Rough"), new Move("Moonblast"), new Move(""), new Move("")) })
        const weakPhys = new Pokemon("Great Tusk", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 4 } })
        const weakSpec = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), evs: { spa: 4 } })
        const strongPhys = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const strongSpec = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Dark Pulse"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const targets = [new Target(weakPhys), new Target(weakSpec), new Target(strongPhys), new Target(strongSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("not-needed")
        expect(result.nature).toBe("Bold")
        expect(result.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })
    })

    describe("double attacker categories via optimize", () => {
      it("should optimize HP and Def only against a double target of two physical attackers", () => {
        const attacker1 = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const attacker2 = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(attacker1, attacker2)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 0, atk: 0, def: 236, spa: 0, spd: 0, spe: 0 })
      })

      it("should optimize HP and SpD only against a double target of two special attackers", () => {
        const attacker1 = new Pokemon("Flutter Mane", { nature: "Modest", moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const attacker2 = new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Bug Buzz"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Incineroar")
        const targets = [new Target(attacker1, attacker2)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 100, atk: 0, def: 0, spa: 0, spd: 236, spe: 0 })
      })

      it("should keep the strongest pair when a second, weaker double target is present", () => {
        const garchomp = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const rillaboom = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), evs: { atk: 0 } })
        const incineroar = new Pokemon("Incineroar", { nature: "Adamant", moveSet: new MoveSet(new Move("Knock Off"), new Move(""), new Move(""), new Move("")), evs: { atk: 0 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(garchomp, ursaluna), new Target(rillaboom, incineroar)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 0, atk: 0, def: 236, spa: 0, spd: 0, spe: 0 })
      })

      it("should retry the mixed heuristic on the Def side when the minimal spread fails the combined check", () => {
        const phys = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), evs: { atk: 28 } })
        const spec = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(phys, spec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 12, atk: 0, def: 12, spa: 0, spd: 84, spe: 0 })
      })

      it("should retry the mixed heuristic on the SpD side when the minimal spread fails the combined check", () => {
        const phys = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), evs: { atk: 0 } })
        const spec = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 28 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(phys, spec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 12, atk: 0, def: 20, spa: 0, spd: 84, spe: 0 })
      })

      it("should retry the mixed heuristic on both Def and SpD together when single-side retries also fail", () => {
        const phys = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), evs: { atk: 84 } })
        const spec = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 112 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(phys, spec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 132, atk: 0, def: 20, spa: 0, spd: 84, spe: 0 })
      })

      it("should fall through to the full three-stat search when every mixed heuristic retry fails at the minimum HP", () => {
        const phys = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), evs: { atk: 0 } })
        const spec = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 196 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(phys, spec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 132, atk: 0, def: 20, spa: 0, spd: 116, spe: 0 })
      })
    })

    describe("reserved offensive EVs via optimize", () => {
      it("should merge the defensive solution with preserved offensive EVs", () => {
        const attacker = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const defender = new Pokemon("Incineroar", { evs: { atk: 252, spe: 4 } })
        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, true)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 4, atk: 252, def: 60, spa: 0, spd: 0, spe: 4 })
      })

      it("should return no-solution when defensive needs plus offensive EVs exceed 508", () => {
        const attacker = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const defender = new Pokemon("Incineroar", { evs: { atk: 252, spa: 200, spe: 52 } })
        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, true)

        expect(result.status).toBe("no-solution")
        expect(result.evs).toBeNull()
      })

      it("should keep offensive EVs when the defender already survives a single attacker with zero investment", () => {
        const attacker = new Pokemon("Sylveon", { nature: "Adamant", moveSet: new MoveSet(new Move("Quick Attack"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const defender = new Pokemon("Blissey", { evs: { spa: 252 } })
        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, true)

        expect(result.status).toBe("not-needed")
        expect(result.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 0 })
      })

      it("should keep offensive EVs when the defender already survives a double target with zero investment", () => {
        const attacker1 = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const attacker2 = new Pokemon("Flutter Mane", { nature: "Modest", moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Kingambit", { evs: { atk: 252, spe: 4 } })
        const targets = [new Target(attacker1, attacker2)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, true)

        expect(result.status).toBe("not-needed")
        expect(result.evs).toEqual({ hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 4 })
      })
    })

    describe("degenerate targets via optimize", () => {
      it("should return the current EVs when the only target has no damaging moves", () => {
        const statusOnly = new Pokemon("Amoonguss", { moveSet: new MoveSet(new Move("Spore"), new Move(""), new Move(""), new Move("")) })
        const defender = new Pokemon("Incineroar", { evs: { hp: 100 } })
        const targets = [new Target(statusOnly)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 100, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should treat an impossible attacker as a lost cause when another attacker is harmless", () => {
        const impossible = new Pokemon("Kartana", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Leaf Blade"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const harmless = new Pokemon("Sylveon", { nature: "Adamant", moveSet: new MoveSet(new Move("Quick Attack"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const defender = new Pokemon("Flutter Mane")
        const targets = [new Target(impossible), new Target(harmless)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("not-needed")
        expect(result.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should apply the selected nature when singles and a double target are optimized together", () => {
        const single = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const dblPhys = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const dblSpec = new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Struggle Bug"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Grimmsnarl")
        const targets = [new Target(single), new Target(dblPhys, dblSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, true)

        expect(result.status).toBe("not-needed")
        expect(result.nature).toBe("Bold")
        expect(result.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })
    })

    describe("second strongest fallback via optimize", () => {
      const ursaluna = () => new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
      const miraidon = () => new Pokemon("Miraidon", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })

      it("should fall back to the physical-priority spread when no combined spread survives both singles", () => {
        const defender = new Pokemon("Clefairy")
        const targets = [new Target(ursaluna()), new Target(miraidon())]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 196, atk: 0, def: 252, spa: 0, spd: 0, spe: 0 })
      })

      it("should fall back to the special-priority spread when a double target joins two tight singles", () => {
        const defender = new Pokemon("Clefairy")
        const targets = [new Target(ursaluna()), new Target(miraidon()), new Target(ursaluna(), miraidon())]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 244, atk: 0, def: 0, spa: 0, spd: 252, spe: 0 })
      })

      it("should order remaining special attackers by strength when the strongest cannot be covered", () => {
        const secondSpecial = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Clefairy")
        const targets = [new Target(ursaluna()), new Target(miraidon()), new Target(secondSpecial)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 196, atk: 0, def: 252, spa: 0, spd: 0, spe: 0 })
      })

      it("should walk the ordered survivable special attackers when the strongest special cannot be covered together with the physicals", () => {
        const garchomp = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const flutter = new Pokemon("Flutter Mane", { nature: "Modest", moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")), evs: { spa: 180 } })
        const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Dark Pulse"), new Move(""), new Move(""), new Move("")), evs: { spa: 180 } })
        const heatran = new Pokemon("Heatran", { nature: "Modest", moveSet: new MoveSet(new Move("Heat Wave"), new Move(""), new Move(""), new Move("")), evs: { spa: 140 } })
        const defender = new Pokemon("Clefairy")
        const targets = [new Target(ursaluna()), new Target(miraidon()), new Target(garchomp), new Target(flutter), new Target(chiYu), new Target(heatran)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 196, atk: 0, def: 252, spa: 0, spd: 0, spe: 0 })
      })

      it("should rebuild from the single-attacker solutions when the double refinement cannot secure the discarded special attacker", () => {
        const physDouble = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), evs: { atk: 144 } })
        const specDouble = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), evs: { spa: 144 } })
        const physSingle = new Pokemon("Iron Hands", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const specSingle = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 140 } })
        const defender = new Pokemon("Grimmsnarl", { item: "Leftovers" })
        const targets = [new Target(physDouble, specDouble), new Target(physSingle), new Target(specSingle)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 44, atk: 0, def: 0, spa: 0, spd: 236, spe: 0 })
      })
    })

    describe("three-solution combine and double-recombine via optimize", () => {
      const ursaluna = () => new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
      const miraidonCS = () => new Pokemon("Miraidon", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
      const greatTuskCB = () => new Pokemon("Great Tusk", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
      const chiYuCS = () => new Pokemon("Chi-Yu", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
      const rillaGlide = () => new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
      const volcaronaSB = () => new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Struggle Bug"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })

      it("should find an optimized combined solution that also covers the double target", () => {
        const defender = new Pokemon("Grimmsnarl")
        const targets = [new Target(ursaluna()), new Target(miraidonCS()), new Target(rillaGlide(), volcaronaSB())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 212, atk: 0, def: 4, spa: 0, spd: 68, spe: 0 })
      })

      it("should add the double solution on top of a two-solution spread", () => {
        const defender = new Pokemon("Clefairy")
        const targets = [new Target(ursaluna()), new Target(miraidonCS()), new Target(rillaGlide(), volcaronaSB())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 244, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should combine a physical solution with a double target that contributes nothing", () => {
        const defender = new Pokemon("Clefairy")
        const targets = [new Target(ursaluna()), new Target(chiYuCS()), new Target(rillaGlide(), volcaronaSB())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 196, atk: 0, def: 252, spa: 0, spd: 0, spe: 0 })
      })

      it("should combine a special solution with a double target that contributes nothing", () => {
        const defender = new Pokemon("Clefairy")
        const targets = [new Target(greatTuskCB()), new Target(miraidonCS()), new Target(rillaGlide(), volcaronaSB())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 244, atk: 0, def: 0, spa: 0, spd: 252, spe: 0 })
      })

      it("should search Def/SpD combinations when combining a special solution with a real double target", () => {
        const defender = new Pokemon("Pikachu")
        const targets = [new Target(ursaluna()), new Target(miraidonCS()), new Target(rillaGlide(), volcaronaSB())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 36, atk: 0, def: 0, spa: 0, spd: 148, spe: 0 })
      })
    })

    describe("solution combiner double-target fallbacks and search loops via optimize", () => {
      const rillaGlideWeak = () => new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), evs: { atk: 0 } })
      const volcaronaWeak = () => new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Bug Buzz"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })

      it("should search the Def/SpD window for a special-only single alongside a weak double target", () => {
        const defender = new Pokemon("Clefairy")
        const single1 = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Facade"), new Move(""), new Move(""), new Move("")), evs: { atk: 0 } })
        const single2 = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), evs: { spa: 168 } })
        const targets = [new Target(single1), new Target(single2), new Target(rillaGlideWeak(), volcaronaWeak())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 4, atk: 0, def: 0, spa: 0, spd: 28, spe: 0 })
      })

      it("should search the Def/SpD window for a physical-only single alongside a weak double target", () => {
        const defender = new Pokemon("Clefairy")
        const single1 = new Pokemon("Great Tusk", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 0 } })
        const single2 = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })
        const targets = [new Target(single1), new Target(single2), new Target(rillaGlideWeak(), volcaronaWeak())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 4, atk: 0, def: 188, spa: 0, spd: 0, spe: 0 })
      })

      it("should fall back to the physical-only spread when the double solution is entirely zero", () => {
        const defender = new Pokemon("Snorlax")
        const single1 = new Pokemon("Iron Hands", { nature: "Adamant", moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")), evs: { atk: 0 } })
        const single2 = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })
        const targets = [new Target(single1), new Target(single2), new Target(rillaGlideWeak(), volcaronaWeak())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 60, atk: 0, def: 252, spa: 0, spd: 0, spe: 0 })
      })

      it("should walk the tryAddDoubleSolution HP/Def search loop when two solutions already survive both singles", () => {
        const defender = new Pokemon("Clefairy")
        const single1 = new Pokemon("Great Tusk", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 0 } })
        const single2 = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })
        const targets = [new Target(single1), new Target(single2), new Target(rillaGlideWeak(), volcaronaWeak())]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 196, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      })

      it("should fall through to the tail branches when both solutions survive the double and tryAddDoubleSolution cannot extend them", () => {
        const defender = new Pokemon("Clefairy")
        const phys1 = new Pokemon("Great Tusk", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 0 } })
        const spec1 = new Pokemon("Miraidon", { nature: "Modest", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })
        const secondPhys = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 4 } })
        const secondSpec = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 4 } })
        const dPhys = new Pokemon("Iron Hands", { nature: "Adamant", moveSet: new MoveSet(new Move("Close Combat"), new Move(""), new Move(""), new Move("")), evs: { atk: 168 } })
        const dSpec = new Pokemon("Raging Bolt", { nature: "Modest", moveSet: new MoveSet(new Move("Thunderbolt"), new Move(""), new Move(""), new Move("")), evs: { spa: 168 } })
        const targets = [new Target(phys1), new Target(spec1), new Target(secondPhys), new Target(secondSpec), new Target(dPhys, dSpec)]

        const result = service.optimize(defender, targets, new Field())

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 196, atk: 0, def: 0, spa: 0, spd: 252, spe: 0 })
      })
    })

    describe("double-attacker refinement increase via optimize", () => {
      it("should return no-solution for a reversed mixed double that only survives above the legal EV budget under sandstorm", () => {
        const physical = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const special = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(special, physical)]
        const field = new Field({ weather: "Sand" })

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("no-solution")
        expect(result.evs).toBeNull()
      })
    })

    describe("prioritize HP and inner double-combination search via optimize", () => {
      it("should prioritize HP for an all-physical double target under Leftovers recovery", () => {
        const attacker1 = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const attacker2 = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const defender = new Pokemon("Snorlax", { item: "Leftovers" })
        const targets = [new Target(attacker1, attacker2)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 0, atk: 0, def: 236, spa: 0, spd: 0, spe: 0 })
      })

      it("should prioritize HP for an all-special double target under Leftovers recovery", () => {
        const attacker1 = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const attacker2 = new Pokemon("Volcarona", { nature: "Modest", moveSet: new MoveSet(new Move("Bug Buzz"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Snorlax", { item: "Leftovers" })
        const targets = [new Target(attacker1, attacker2)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 132, atk: 0, def: 0, spa: 0, spd: 236, spe: 0 })
      })

      it("should search Def/SpD combinations against a mixed double target while combining with a physical single", () => {
        const single = new Pokemon("Ursaluna", { nature: "Adamant", moveSet: new MoveSet(new Move("Headlong Rush"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const dblPhys = new Pokemon("Garchomp", { nature: "Adamant", moveSet: new MoveSet(new Move("Earthquake"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const dblSpec = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: new MoveSet(new Move("Overheat"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(single), new Target(dblPhys, dblSpec)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 156, atk: 0, def: 108, spa: 0, spd: 180, spe: 0 })
      })

      it("should fall back to the second-strongest search when a physical-priority spread fails the special side", () => {
        const physical = new Pokemon("Miraidon", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Electro Drift"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const weakA = new Pokemon("Rillaboom", { nature: "Adamant", moveSet: new MoveSet(new Move("Grassy Glide"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const weakB = new Pokemon("Meowscarada", { nature: "Adamant", moveSet: new MoveSet(new Move("Flower Trick"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const defender = new Pokemon("Clefairy")
        const targets = [new Target(physical), new Target(weakA), new Target(weakB)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.status).toBe("success")
        expect(result.evs).toEqual({ hp: 4, atk: 0, def: 140, spa: 0, spd: 0, spe: 0 })
      })

      it("should return no-solution when a single special attacker cannot be survived even at maximum investment", () => {
        const attacker = new Pokemon("Miraidon", { nature: "Modest", item: "Choice Specs", moveSet: new MoveSet(new Move("Draco Meteor"), new Move(""), new Move(""), new Move("")), evs: { spa: 252 } })
        const defender = new Pokemon("Chansey")
        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 4)

        expect(result.status).toBe("no-solution")
        expect(result.evs).toBeNull()
      })

      it("should return no-solution when a single physical attacker cannot be survived even at maximum investment", () => {
        const attacker = new Pokemon("Kartana", { nature: "Adamant", item: "Choice Band", moveSet: new MoveSet(new Move("Leaf Blade"), new Move(""), new Move(""), new Move("")), evs: { atk: 252 } })
        const defender = new Pokemon("Snorlax")
        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field, false, false, 3)

        expect(result.status).toBe("no-solution")
        expect(result.evs).toBeNull()
      })
    })
  })
})
