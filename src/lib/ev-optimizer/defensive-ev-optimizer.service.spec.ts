import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CALC_ADJUSTERS, CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { SPECIFIC_DAMAGE_CALCULATORS, SpecificDamageCalculator } from "@lib/damage-calculator/specific-damage-calculator/specific-damage-calculator"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { Ability } from "@lib/model/ability"
import { Field, FieldSide } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { DefensiveEvOptimizerService } from "./defensive-ev-optimizer.service"
import { Status } from "@lib/model/status"

describe("DefensiveEvOptimizerService", () => {
  let service: DefensiveEvOptimizerService
  let adjusterSpy: jasmine.SpyObj<CalcAdjuster>
  let specificCalculatorSpy: jasmine.SpyObj<SpecificDamageCalculator>

  beforeEach(() => {
    adjusterSpy = jasmine.createSpyObj("Adjuster", ["adjust"])
    specificCalculatorSpy = jasmine.createSpyObj("SpecificCalculator", ["isApplicable", "calculate"])

    TestBed.configureTestingModule({
      providers: [
        DefensiveEvOptimizerService,
        DamageCalculatorService,
        { provide: CALC_ADJUSTERS, useValue: adjusterSpy, multi: true },
        { provide: SPECIFIC_DAMAGE_CALCULATORS, useValue: specificCalculatorSpy, multi: true },
        provideZonelessChangeDetection()
      ]
    })

    service = TestBed.inject(DefensiveEvOptimizerService)
    specificCalculatorSpy.isApplicable.and.returnValue(false)
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

        expect(result.evs!.hp).toBe(212)
        expect(result.evs!.def).toBe(116)
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

        expect(result.evs!.hp).toBe(244)
        expect(result.evs!.def).toBe(180)
        expect(result.evs!.spd).toBe(52)
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

        expect(result.evs).toBeNull()
        expect(result.nature).toBeNull()
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

      it("should return zeroed EVs when no solution is needed (already survives)", () => {
        const defender = new Pokemon("Blissey")

        const attacker = new Pokemon("Pichu", {
          moveSet: new MoveSet(new Move("Thunder Shock"), new Move(""), new Move(""), new Move("")),
          evs: { spa: 0 }
        })

        const targets = [new Target(attacker)]
        const field = new Field()

        const result = service.optimize(defender, targets, field)

        expect(result.evs).not.toBeNull()
        if (result.evs) {
          expect(result.evs!.hp).toBe(0)
          expect(result.evs!.def).toBe(0)
          expect(result.evs!.spd).toBe(0)
        }
      })
    })
  })
})
