import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CALC_ADJUSTERS, CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { SPECIFIC_DAMAGE_CALCULATORS, SpecificDamageCalculator } from "@lib/damage-calculator/specific-damage-calculator/specific-damage-calculator"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { Ability } from "@lib/model/ability"
import { Field } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { DefensiveEvOptimizerService } from "./defensive-ev-optimizer.service"

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
    it("should optimize EVs for single physical attacker", () => {
      const defender = new Pokemon("Flutter Mane", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const field = new Field()

      const targets = [new Target(attacker)]
      const result = service.optimize(defender, targets, field)

      expect(result.evs.hp).toBe(140)
      expect(result.evs.def).toBe(236)
      expect(result.evs.spd).toBe(0)
    })

    it("should optimize EVs for single physical attacker againt Ting-Lu", () => {
      const defender = new Pokemon("Ting-Lu", {
        nature: "Bold",
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        teraType: "Water",
        teraTypeActive: true,
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const field = new Field()

      const targets = [new Target(attacker)]
      const result = service.optimize(defender, targets, field)

      expect(result.evs.hp).toBe(0)
      expect(result.evs.def).toBe(180)
      expect(result.evs.spd).toBe(0)
    })

    it("should optimize EVs for single special attacker", () => {
      const defender = new Pokemon("Vaporeon", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Raging Bolt", {
        nature: "Modest",
        moveSet: new MoveSet(new Move("Thunderbolt"), new Move("Thunderclap"), new Move("Draco Meteor"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const field = new Field()

      const targets = [new Target(attacker)]
      const result = service.optimize(defender, targets, field)

      expect(result.evs.hp).toBe(12)
      expect(result.evs.def).toBe(0)
      expect(result.evs.spd).toBe(44)
    })

    it("should optimize EVs prioritizing hp when possible", () => {
      const defender = new Pokemon("Whimsicott", {
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Tornadus", {
        nature: "Timid",
        moveSet: new MoveSet(new Move("Bleakwind Storm"), new Move("Tailwind"), new Move("Protect"), new Move("Rain Dance")),
        evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const field = new Field()

      const targets = [new Target(attacker)]
      const result = service.optimize(defender, targets, field)

      expect(result.evs.hp).toBe(92)
      expect(result.evs.def).toBe(0)
      expect(result.evs.spd).toBe(196)
    })

    it("should optimize EVs for multiple attackers", () => {
      const defender = new Pokemon("Scream Tail", {
        nature: "Timid",
        item: "Booster Energy",
        ability: new Ability("Protosynthesis"),
        teraType: "Grass",
        moveSet: new MoveSet(new Move("Thunder Wave"), new Move("Protect"), new Move("Disable"), new Move("Encore")),
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const calyrexShadow = new Pokemon("Calyrex-Shadow", {
        nature: "Modest",
        item: "Focus Sash",
        ability: new Ability("As One (Spectrier)"),
        teraType: "Ghost",
        moveSet: new MoveSet(new Move("Astral Barrage"), new Move("Psychic"), new Move("Protect"), new Move("Encore")),
        evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const urshifuRapidStrike = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Jolly",
        item: "Choice Scarf",
        ability: new Ability("Unseen Fist"),
        teraType: "Water",
        teraTypeActive: true,
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("U-turn"), new Move("Aqua Jet"), new Move("Close Combat")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const field = new Field({ weather: "Rain" })

      const targets = [new Target(calyrexShadow), new Target(urshifuRapidStrike)]
      const result = service.optimize(defender, targets, field)

      expect(result.evs.hp).toBe(212)
      expect(result.evs.def).toBe(116)
      expect(result.evs.spd).toBe(0)
    })

    it("should optimize EVs for multiple attackers with Whimsicott", () => {
      const defender = new Pokemon("Whimsicott", {
        nature: "Bold",
        item: "Covert Cloak",
        ability: new Ability("Prankster"),
        teraType: "Water",
        moveSet: new MoveSet(new Move("Tailwind"), new Move("Moonblast"), new Move("Sunny Day"), new Move("Encore")),
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const calyrexShadow = new Pokemon("Calyrex-Shadow", {
        nature: "Timid",
        item: "Life Orb",
        ability: new Ability("As One (Spectrier)"),
        teraType: "Ghost",
        moveSet: new MoveSet(new Move("Astral Barrage"), new Move("Psychic"), new Move("Protect"), new Move("Encore")),
        evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const zamazentaCrowned = new Pokemon("Zamazenta-Crowned", {
        nature: "Impish",
        item: "Rusted Shield",
        ability: new Ability("Dauntless Shield"),
        teraType: "Dragon",
        moveSet: new MoveSet(new Move("Heavy Slam"), new Move("Protect"), new Move("Wide Guard"), new Move("Body Press")),
        evs: { hp: 252, atk: 20, def: 164, spa: 0, spd: 4, spe: 68 }
      })

      const field = new Field()

      const targets = [new Target(calyrexShadow), new Target(zamazentaCrowned)]
      const result = service.optimize(defender, targets, field)

      expect(result.evs.hp).toBe(244)
      expect(result.evs.def).toBe(180)
      expect(result.evs.spd).toBe(52)
    })

    it("should optimize EVs for multiple attackers with Gholdengo", () => {
      const defender = new Pokemon("Gholdengo", {
        nature: "Modest",
        item: "Choice Specs",
        ability: new Ability("Good as Gold"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Make It Rain"), new Move("Shadow Ball"), new Move("Protect"), new Move("Nasty Plot")),
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const miraidon = new Pokemon("Miraidon", {
        nature: "Modest",
        item: "Choice Specs",
        ability: new Ability("Hadron Engine"),
        teraType: "Electric",
        moveSet: new MoveSet(new Move("Electro Drift"), new Move("Rest"), new Move("Dazzling Gleam"), new Move("Volt Switch")),
        evs: { hp: 4, atk: 0, def: 0, spa: 244, spd: 0, spe: 252 }
      })

      const incineroar = new Pokemon("Incineroar", {
        nature: "Impish",
        item: "Safety Goggles",
        ability: new Ability("Intimidate"),
        teraType: "Ghost",
        moveSet: new MoveSet(new Move("Flare Blitz"), new Move("Knock Off"), new Move("Fake Out"), new Move("Parting Shot")),
        evs: { hp: 244, atk: 0, def: 188, spa: 0, spd: 76, spe: 0 }
      })

      const field = new Field()

      const targets = [new Target(miraidon), new Target(incineroar)]
      const result = service.optimize(defender, targets, field)

      expect(result.evs.hp).toBe(164)
      expect(result.evs.def).toBe(28)
      expect(result.evs.spd).toBe(12)
    })

    it("should prioritize special attackers when there are more chances to survive special attacks", () => {
      const defender = new Pokemon("Gholdengo", {
        nature: "Modest",
        item: "Choice Specs",
        ability: new Ability("Good as Gold"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Make It Rain"), new Move("Shadow Ball"), new Move("Protect"), new Move("Nasty Plot")),
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const chiYu = new Pokemon("Chi-Yu", {
        nature: "Bold",
        item: "Choice Specs",
        ability: new Ability("Beads of Ruin"),
        teraType: "Ghost",
        moveSet: new MoveSet(new Move("Overheat"), new Move("Heat Wave"), new Move("Dark Pulse"), new Move("Snarl")),
        evs: { hp: 252, atk: 0, def: 164, spa: 28, spd: 4, spe: 60 }
      })

      const tingLu = new Pokemon("Ting-Lu", {
        nature: "Adamant",
        item: "Clear Amulet",
        ability: new Ability("Vessel of Ruin"),
        teraType: "Poison",
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Throat Chop"), new Move("Tera Blast"), new Move("Protect")),
        evs: { hp: 140, atk: 252, def: 12, spa: 0, spd: 100, spe: 4 }
      })

      const landorusTherian = new Pokemon("Landorus-Therian", {
        nature: "Adamant",
        item: "Choice Band",
        ability: new Ability("Intimidate"),
        teraType: "Steel",
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Stomping Tantrum"), new Move("Rock Slide"), new Move("U-turn")),
        evs: { hp: 148, atk: 116, def: 4, spa: 0, spd: 124, spe: 116 }
      })

      const torkoal = new Pokemon("Torkoal", {
        nature: "Quiet",
        item: "Choice Specs",
        ability: new Ability("Drought"),
        teraType: "Fire",
        moveSet: new MoveSet(new Move("Eruption"), new Move("Heat Wave"), new Move("Weather Ball"), new Move("Helping Hand")),
        evs: { hp: 252, atk: 0, def: 0, spa: 252, spd: 4, spe: 0 }
      })

      const heatran = new Pokemon("Heatran", {
        nature: "Modest",
        item: "Leftovers",
        ability: new Ability("Flash Fire"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Magma Storm"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
        evs: { hp: 244, atk: 0, def: 140, spa: 124, spd: 0, spe: 0 }
      })

      const moltresGalar = new Pokemon("Moltres-Galar", {
        nature: "Modest",
        item: "Choice Specs",
        ability: new Ability("Berserk"),
        teraType: "Ghost",
        moveSet: new MoveSet(new Move("Fiery Wrath"), new Move("Air Slash"), new Move("Snarl"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 0 }
      })

      const archaludon = new Pokemon("Archaludon", {
        nature: "Modest",
        item: "Assault Vest",
        ability: new Ability("Stamina"),
        teraType: "Grass",
        moveSet: new MoveSet(new Move("Electro Shot"), new Move("Draco Meteor"), new Move("Body Press"), new Move("Flash Cannon")),
        evs: { hp: 60, atk: 0, def: 12, spa: 252, spd: 132, spe: 12 }
      })

      const kingambit = new Pokemon("Kingambit", {
        nature: "Adamant",
        item: "Black Glasses",
        ability: new Ability("Defiant"),
        teraType: "Dragon",
        moveSet: new MoveSet(new Move("Kowtow Cleave"), new Move("Iron Head"), new Move("Sucker Punch"), new Move("Protect")),
        evs: { hp: 252, atk: 252, def: 28, spa: 0, spd: 100, spe: 0 }
      })

      const dondozo = new Pokemon("Dondozo", {
        nature: "Adamant",
        item: "Leftovers",
        ability: new Ability("Oblivious"),
        teraType: "Grass",
        moveSet: new MoveSet(new Move("Wave Crash"), new Move("Earthquake"), new Move("Order Up"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const field = new Field()

      const targets = [new Target(chiYu), new Target(tingLu), new Target(landorusTherian), new Target(torkoal), new Target(heatran), new Target(moltresGalar), new Target(archaludon), new Target(kingambit), new Target(dondozo)]
      const result = service.optimize(defender, targets, field)

      expect(result.evs.hp).toBe(116)
      expect(result.evs.def).toBe(0)
      expect(result.evs.spd).toBe(220)
    })

    it("should prioritize physical attackers when there are more chances to survive physical attacks", () => {
      const defender = new Pokemon("Gholdengo", {
        nature: "Modest",
        item: "Choice Specs",
        ability: new Ability("Good as Gold"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Make It Rain"), new Move("Shadow Ball"), new Move("Protect"), new Move("Nasty Plot")),
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const chiYu = new Pokemon("Chi-Yu", {
        nature: "Bold",
        item: "Choice Specs",
        ability: new Ability("Beads of Ruin"),
        teraType: "Ghost",
        moveSet: new MoveSet(new Move("Overheat"), new Move("Heat Wave"), new Move("Dark Pulse"), new Move("Snarl")),
        evs: { hp: 252, atk: 0, def: 164, spa: 28, spd: 4, spe: 60 }
      })

      const tingLu = new Pokemon("Ting-Lu", {
        nature: "Adamant",
        item: "Clear Amulet",
        ability: new Ability("Vessel of Ruin"),
        teraType: "Poison",
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Throat Chop"), new Move("Tera Blast"), new Move("Protect")),
        evs: { hp: 140, atk: 252, def: 12, spa: 0, spd: 100, spe: 4 }
      })

      const landorusTherian = new Pokemon("Landorus-Therian", {
        nature: "Adamant",
        item: "Choice Band",
        ability: new Ability("Intimidate"),
        teraType: "Steel",
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Stomping Tantrum"), new Move("Rock Slide"), new Move("U-turn")),
        evs: { hp: 148, atk: 116, def: 4, spa: 0, spd: 124, spe: 116 }
      })

      const torkoal = new Pokemon("Torkoal", {
        nature: "Quiet",
        item: "Choice Specs",
        ability: new Ability("Drought"),
        teraType: "Fire",
        moveSet: new MoveSet(new Move("Eruption"), new Move("Heat Wave"), new Move("Weather Ball"), new Move("Helping Hand")),
        evs: { hp: 252, atk: 0, def: 0, spa: 252, spd: 4, spe: 0 }
      })

      const heatran = new Pokemon("Heatran", {
        nature: "Modest",
        item: "Leftovers",
        ability: new Ability("Flash Fire"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Magma Storm"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
        evs: { hp: 244, atk: 0, def: 140, spa: 124, spd: 0, spe: 0 }
      })

      const archaludon = new Pokemon("Archaludon", {
        nature: "Modest",
        item: "Assault Vest",
        ability: new Ability("Stamina"),
        teraType: "Grass",
        moveSet: new MoveSet(new Move("Electro Shot"), new Move("Draco Meteor"), new Move("Body Press"), new Move("Flash Cannon")),
        evs: { hp: 60, atk: 0, def: 12, spa: 252, spd: 132, spe: 12 }
      })

      const kingambit = new Pokemon("Kingambit", {
        nature: "Adamant",
        item: "Black Glasses",
        ability: new Ability("Defiant"),
        teraType: "Dragon",
        moveSet: new MoveSet(new Move("Kowtow Cleave"), new Move("Iron Head"), new Move("Sucker Punch"), new Move("Protect")),
        evs: { hp: 252, atk: 252, def: 28, spa: 0, spd: 100, spe: 0 }
      })

      const dondozo = new Pokemon("Dondozo", {
        nature: "Adamant",
        item: "Leftovers",
        ability: new Ability("Oblivious"),
        teraType: "Grass",
        moveSet: new MoveSet(new Move("Wave Crash"), new Move("Earthquake"), new Move("Order Up"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const roaringMoon = new Pokemon("Roaring Moon", {
        nature: "Jolly",
        item: "Booster Energy",
        ability: new Ability("Protosynthesis"),
        teraType: "Flying",
        moveSet: new MoveSet(new Move("Knock Off"), new Move("Acrobatics"), new Move("Protect"), new Move("Dragon Dance")),
        evs: { hp: 52, atk: 252, def: 4, spa: 0, spd: 4, spe: 196 }
      })

      const field = new Field()

      const targets = [new Target(chiYu), new Target(tingLu), new Target(landorusTherian), new Target(torkoal), new Target(heatran), new Target(archaludon), new Target(kingambit), new Target(dondozo), new Target(roaringMoon)]
      const result = service.optimize(defender, targets, field)

      expect(result.evs.hp).toBe(244)
      expect(result.evs.def).toBe(252)
      expect(result.evs.spd).toBe(0)
    })

    it("should optimize EVs for two simultaneous attackers (Urshifu-Rapid-Strike + Flutter Mane vs Gholdengo)", () => {
      const defender = new Pokemon("Gholdengo", {
        nature: "Modest",
        item: "Choice Specs",
        ability: new Ability("Good as Gold"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Make It Rain"), new Move("Shadow Ball"), new Move("Protect"), new Move("Nasty Plot")),
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const urshifu = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        item: "Choice Scarf",
        ability: new Ability("Unseen Fist"),
        teraType: "Water",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("U-turn"), new Move("Aqua Jet"), new Move("Acrobatics")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 12 }
      })

      const flutterMane = new Pokemon("Flutter Mane", {
        nature: "Modest",
        item: "Choice Specs",
        ability: new Ability("Protosynthesis"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Dazzling Gleam"), new Move("Icy Wind"), new Move("Protect"), new Move("Taunt")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 44 }
      })

      const target = new Target(urshifu, flutterMane)
      const field = new Field()

      const result = service.optimize(defender, [target], field)

      expect(result.evs.hp).toBe(148)
      expect(result.evs.def).toBe(60)
      expect(result.evs.spd).toBe(4)
    })

    it("should optimize EVs for Ting-Lu with double attackers and single attackers", () => {
      const defender = new Pokemon("Ting-Lu", {
        nature: "Bold",
        item: "Clear Amulet",
        ability: new Ability("Vessel of Ruin"),
        teraType: "Fairy",
        teraTypeActive: true,
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Throat Chop"), new Move("Tera Blast"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const urshifuRapidStrike = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        item: "Choice Scarf",
        ability: new Ability("Unseen Fist"),
        teraType: "Water",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("U-turn"), new Move("Aqua Jet"), new Move("Surging Strikes")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const landorus = new Pokemon("Landorus", {
        nature: "Timid",
        item: "Life Orb",
        ability: new Ability("Sheer Force"),
        teraType: "Poison",
        moveSet: new MoveSet(new Move("Sludge Bomb"), new Move("Earth Power"), new Move("Protect"), new Move("Substitute")),
        evs: { hp: 116, atk: 0, def: 12, spa: 116, spd: 12, spe: 252 }
      })

      const gholdengo = new Pokemon("Gholdengo", {
        nature: "Modest",
        item: "Choice Specs",
        ability: new Ability("Good as Gold"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Make It Rain"), new Move("Shadow Ball"), new Move("Protect"), new Move("Nasty Plot")),
        evs: { hp: 244, atk: 0, def: 44, spa: 212, spd: 4, spe: 4 }
      })

      const chiYu = new Pokemon("Chi-Yu", {
        nature: "Bold",
        item: "Choice Specs",
        ability: new Ability("Beads of Ruin"),
        teraType: "Ghost",
        moveSet: new MoveSet(new Move("Overheat"), new Move("Heat Wave"), new Move("Dark Pulse"), new Move("Snarl")),
        evs: { hp: 252, atk: 0, def: 164, spa: 28, spd: 4, spe: 60 }
      })

      const field = new Field()

      const targets = [new Target(urshifuRapidStrike, landorus), new Target(gholdengo), new Target(chiYu)]
      const result = service.optimize(defender, targets, field)

      expect(result.evs.hp).toBe(0)
      expect(result.evs.def).toBe(0)
      expect(result.evs.spd).toBe(140)
    })

    it("should optimize EVs for Ting-Lu in it's limit", () => {
      const defender = new Pokemon("Ting-Lu", {
        nature: "Bold",
        item: "Clear Amulet",
        ability: new Ability("Vessel of Ruin"),
        teraType: "Fairy",
        teraTypeActive: true,
        moveSet: new MoveSet(new Move("Earthquake"), new Move("Throat Chop"), new Move("Tera Blast"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const urshifuRapidStrike = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        item: "Choice Scarf",
        ability: new Ability("Unseen Fist"),
        teraType: "Water",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("U-turn"), new Move("Aqua Jet"), new Move("Surging Strikes")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const landorus = new Pokemon("Landorus", {
        nature: "Modest",
        item: "Life Orb",
        ability: new Ability("Sheer Force"),
        teraType: "Poison",
        moveSet: new MoveSet(new Move("Sludge Bomb"), new Move("Earth Power"), new Move("Protect"), new Move("Substitute")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const okidogi = new Pokemon("Okidogi", {
        nature: "Adamant",
        item: "Choice Band",
        ability: new Ability("Guard Dog"),
        teraType: "Water",
        moveSet: new MoveSet(new Move("Gunk Shot"), new Move("Drain Punch"), new Move("Upper Hand"), new Move("Knock Off")),
        evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const field = new Field()

      const targets = [new Target(urshifuRapidStrike, landorus), new Target(okidogi)]
      const result = service.optimize(defender, targets, field)

      expect(result.evs.hp).toBe(148)
      expect(result.evs.def).toBe(236)
      expect(result.evs.spd).toBe(108)
    })

    it("should optimize EVs for Gholdengo with multiple attackers including second special strongest optimization", () => {
      const defender = new Pokemon("Gholdengo", {
        nature: "Calm",
        item: "Choice Specs",
        ability: new Ability("Good as Gold"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Make It Rain"), new Move("Shadow Ball"), new Move("Protect"), new Move("Nasty Plot")),
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const gholdengoAttacker = new Pokemon("Gholdengo", {
        nature: "Modest",
        item: "Choice Specs",
        ability: new Ability("Good as Gold"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Make It Rain"), new Move("Shadow Ball"), new Move("Protect"), new Move("Nasty Plot")),
        evs: { hp: 244, atk: 0, def: 44, spa: 212, spd: 4, spe: 4 }
      })

      const chiYu = new Pokemon("Chi-Yu", {
        nature: "Bold",
        item: "Choice Specs",
        ability: new Ability("Beads of Ruin"),
        teraType: "Ghost",
        moveSet: new MoveSet(new Move("Heat Wave"), new Move("Burning Jealousy"), new Move("Dark Pulse"), new Move("Snarl")),
        evs: { hp: 252, atk: 0, def: 164, spa: 28, spd: 4, spe: 60 }
      })

      const landorus1 = new Pokemon("Landorus", {
        nature: "Timid",
        item: "Ability Shield",
        ability: new Ability("Sheer Force"),
        teraType: "Poison",
        moveSet: new MoveSet(new Move("Earth Power"), new Move("Body Slam"), new Move("Protect"), new Move("Substitute")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 0 }
      })

      const urshifu = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        item: "Choice Scarf",
        ability: new Ability("Unseen Fist"),
        teraType: "Water",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("U-turn"), new Move("Aqua Jet"), new Move("Surging Strikes")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const arcanine = new Pokemon("Arcanine", {
        nature: "Jolly",
        item: "Mirror Herb",
        ability: new Ability("Intimidate"),
        teraType: "Normal",
        moveSet: new MoveSet(new Move("Flare Blitz"), new Move("Extreme Speed"), new Move("Will-O-Wisp"), new Move("Protect")),
        evs: { hp: 4, atk: 236, def: 4, spa: 0, spd: 44, spe: 220 }
      })

      const rillaboom1 = new Pokemon("Rillaboom", {
        nature: "Adamant",
        item: "Choice Band",
        ability: new Ability("Grassy Surge"),
        teraType: "Fire",
        moveSet: new MoveSet(new Move("High Horsepower"), new Move("U-turn"), new Move("Grassy Glide"), new Move("Fake Out")),
        evs: { hp: 0, atk: 252, def: 4, spa: 0, spd: 60, spe: 76 }
      })

      const landorus2 = new Pokemon("Landorus", {
        nature: "Timid",
        item: "Ability Shield",
        ability: new Ability("Sheer Force"),
        teraType: "Poison",
        moveSet: new MoveSet(new Move("Earth Power"), new Move("Body Slam"), new Move("Protect"), new Move("Substitute")),
        evs: { hp: 116, atk: 0, def: 0, spa: 196, spd: 12, spe: 0 }
      })

      const rillaboom2 = new Pokemon("Rillaboom", {
        nature: "Adamant",
        item: "Choice Band",
        ability: new Ability("Grassy Surge"),
        teraType: "Fire",
        moveSet: new MoveSet(new Move("High Horsepower"), new Move("U-turn"), new Move("Grassy Glide"), new Move("Fake Out")),
        evs: { hp: 0, atk: 252, def: 4, spa: 0, spd: 60, spe: 76 }
      })

      const field = new Field()

      const targets = [new Target(gholdengoAttacker), new Target(chiYu), new Target(landorus1), new Target(urshifu), new Target(arcanine), new Target(rillaboom1), new Target(landorus2), new Target(rillaboom2)]

      const result = service.optimize(defender, targets, field)

      expect(result.evs.hp).toBe(116)
      expect(result.evs.def).toBe(244)
      expect(result.evs.spd).toBe(148)
    })

    it("should optimize EVs for Gholdengo with multiple attackers including second physical strongest optimization", () => {
      const defender = new Pokemon("Gholdengo", {
        nature: "Calm",
        item: "Choice Specs",
        ability: new Ability("Good as Gold"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Make It Rain"), new Move("Shadow Ball"), new Move("Protect"), new Move("Nasty Plot")),
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const arcanineHisuiAdamant = new Pokemon("Arcanine-Hisui", {
        nature: "Adamant",
        item: "Ability Shield",
        ability: new Ability("Intimidate"),
        teraType: "Ghost",
        moveSet: new MoveSet(new Move("Flare Blitz"), new Move("Aerial Ace"), new Move("Extreme Speed"), new Move("Rock Slide")),
        evs: { hp: 52, atk: 212, def: 4, spa: 0, spd: 4, spe: 236 }
      })

      const arcanineHisuiModest = new Pokemon("Arcanine-Hisui", {
        nature: "Modest",
        item: "Ability Shield",
        ability: new Ability("Intimidate"),
        teraType: "Ghost",
        moveSet: new MoveSet(new Move("Flare Blitz"), new Move("Aerial Ace"), new Move("Extreme Speed"), new Move("Rock Slide")),
        evs: { hp: 52, atk: 212, def: 4, spa: 0, spd: 4, spe: 236 }
      })

      const charizard = new Pokemon("Charizard", {
        nature: "Timid",
        item: "Ability Shield",
        ability: new Ability("Solar Power"),
        teraType: "Ghost",
        moveSet: new MoveSet(new Move("Overheat"), new Move("Heat Wave"), new Move("Air Slash"), new Move("Weather Ball")),
        evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
      })

      const heatran = new Pokemon("Heatran", {
        nature: "Modest",
        item: "Leftovers",
        ability: new Ability("Flash Fire"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Magma Storm"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
        evs: { hp: 244, atk: 0, def: 140, spa: 124, spd: 0, spe: 0 }
      })

      const field = new Field()

      const targets = [new Target(arcanineHisuiAdamant), new Target(arcanineHisuiModest), new Target(charizard), new Target(heatran)]

      const result = service.optimize(defender, targets, field)

      expect(result.evs.hp).toBe(212)
      expect(result.evs.def).toBe(68)
      expect(result.evs.spd).toBe(196)
    })

    it("should optimize EVs for Gholdengo without updating nature (keeping Bold)", () => {
      const defender = new Pokemon("Gholdengo", {
        nature: "Bold",
        item: "Choice Specs",
        ability: new Ability("Good as Gold"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Make It Rain"), new Move("Shadow Ball"), new Move("Protect"), new Move("Nasty Plot")),
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const charizard = new Pokemon("Charizard", {
        nature: "Modest",
        item: "Ability Shield",
        ability: new Ability("Solar Power"),
        teraType: "Ghost",
        moveSet: new MoveSet(new Move("Overheat"), new Move("Heat Wave"), new Move("Air Slash"), new Move("Weather Ball")),
        evs: { hp: 0, atk: 0, def: 0, spa: 220, spd: 0, spe: 252 }
      })

      const arcanineHisui = new Pokemon("Arcanine-Hisui", {
        nature: "Adamant",
        item: "Ability Shield",
        ability: new Ability("Intimidate"),
        teraType: "Ghost",
        moveSet: new MoveSet(new Move("Flare Blitz"), new Move("Aerial Ace"), new Move("Extreme Speed"), new Move("Rock Slide")),
        evs: { hp: 0, atk: 204, def: 4, spa: 0, spd: 4, spe: 236 }
      })

      const heatran = new Pokemon("Heatran", {
        nature: "Bold",
        item: "Leftovers",
        ability: new Ability("Flash Fire"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Overheat"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 172, spd: 0, spe: 0 }
      })

      const field = new Field()

      const targets = [new Target(charizard), new Target(arcanineHisui), new Target(heatran)]

      const result = service.optimize(defender, targets, field, false)

      expect(result.evs.hp).toBe(164)
      expect(result.evs.def).toBe(212)
      expect(result.evs.spd).toBe(0)
      expect(result.nature).toBeNull()
    })

    it("should optimize EVs for Gholdengo with update nature enabled (switching to Calm)", () => {
      const defender = new Pokemon("Gholdengo", {
        nature: "Bold",
        item: "Choice Specs",
        ability: new Ability("Good as Gold"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Make It Rain"), new Move("Shadow Ball"), new Move("Protect"), new Move("Nasty Plot")),
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const charizard = new Pokemon("Charizard", {
        nature: "Modest",
        item: "Ability Shield",
        ability: new Ability("Solar Power"),
        teraType: "Ghost",
        moveSet: new MoveSet(new Move("Overheat"), new Move("Heat Wave"), new Move("Air Slash"), new Move("Weather Ball")),
        evs: { hp: 0, atk: 0, def: 0, spa: 220, spd: 0, spe: 252 }
      })

      const arcanineHisui = new Pokemon("Arcanine-Hisui", {
        nature: "Adamant",
        item: "Ability Shield",
        ability: new Ability("Intimidate"),
        teraType: "Ghost",
        moveSet: new MoveSet(new Move("Flare Blitz"), new Move("Aerial Ace"), new Move("Extreme Speed"), new Move("Rock Slide")),
        evs: { hp: 0, atk: 204, def: 4, spa: 0, spd: 4, spe: 236 }
      })

      const heatran = new Pokemon("Heatran", {
        nature: "Bold",
        item: "Leftovers",
        ability: new Ability("Flash Fire"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Overheat"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 172, spd: 0, spe: 0 }
      })

      const field = new Field()

      const targets = [new Target(charizard), new Target(arcanineHisui), new Target(heatran)]

      const result = service.optimize(defender, targets, field, true)

      expect(result.evs.hp).toBe(244)
      expect(result.evs.def).toBe(0)
      expect(result.evs.spd).toBe(252)
      expect(result.nature).toBe("Calm")
    })

    it("should optimize EVs for Gholdengo when not surviving double attackers but surviving special attacker", () => {
      const defender = new Pokemon("Gholdengo", {
        nature: "Jolly",
        item: "Choice Specs",
        ability: new Ability("Good as Gold"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Make It Rain"), new Move("Confuse Ray"), new Move("Protect"), new Move("Nasty Plot")),
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const charizard = new Pokemon("Charizard", {
        nature: "Modest",
        item: "Ability Shield",
        ability: new Ability("Solar Power"),
        teraType: "Ghost",
        moveSet: new MoveSet(new Move("Overheat"), new Move("Heat Wave"), new Move("Air Slash"), new Move("Weather Ball")),
        evs: { hp: 0, atk: 0, def: 0, spa: 220, spd: 0, spe: 252 }
      })

      const arcanine = new Pokemon("Arcanine", {
        nature: "Jolly",
        item: "Mirror Herb",
        ability: new Ability("Intimidate"),
        teraType: "Normal",
        moveSet: new MoveSet(new Move("Flare Blitz"), new Move("Extreme Speed"), new Move("Will-O-Wisp"), new Move("Protect")),
        evs: { hp: 4, atk: 236, def: 4, spa: 0, spd: 44, spe: 220 }
      })

      const heatran = new Pokemon("Heatran", {
        nature: "Modest",
        item: "Leftovers",
        ability: new Ability("Flash Fire"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Magma Storm"), new Move("Heat Wave"), new Move("Earth Power"), new Move("Protect")),
        evs: { hp: 244, atk: 0, def: 140, spa: 124, spd: 0, spe: 0 }
      })

      const field = new Field()

      const targets = [new Target(arcanine, charizard), new Target(heatran)]

      const result = service.optimize(defender, targets, field)

      expect(result.evs.hp).toBe(116)
      expect(result.evs.def).toBe(0)
      expect(result.evs.spd).toBe(220)
    })

    it("should optimize EVs for Gholdengo when not surviving double attackers but surviving physical attacker", () => {
      const defender = new Pokemon("Gholdengo", {
        nature: "Jolly",
        item: "Choice Specs",
        ability: new Ability("Good as Gold"),
        teraType: "Fairy",
        moveSet: new MoveSet(new Move("Make It Rain"), new Move("Confuse Ray"), new Move("Protect"), new Move("Nasty Plot")),
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const charizard = new Pokemon("Charizard", {
        nature: "Modest",
        item: "Ability Shield",
        ability: new Ability("Solar Power"),
        teraType: "Ghost",
        moveSet: new MoveSet(new Move("Overheat"), new Move("Heat Wave"), new Move("Air Slash"), new Move("Weather Ball")),
        evs: { hp: 0, atk: 0, def: 0, spa: 220, spd: 0, spe: 252 }
      })

      const arcanine = new Pokemon("Arcanine", {
        nature: "Jolly",
        item: "Mirror Herb",
        ability: new Ability("Intimidate"),
        teraType: "Normal",
        moveSet: new MoveSet(new Move("Flare Blitz"), new Move("Extreme Speed"), new Move("Will-O-Wisp"), new Move("Protect")),
        evs: { hp: 4, atk: 236, def: 4, spa: 0, spd: 44, spe: 220 }
      })

      const field = new Field()

      const targets = [new Target(arcanine, charizard), new Target(arcanine)]

      const result = service.optimize(defender, targets, field)

      expect(result.evs.hp).toBe(116)
      expect(result.evs.def).toBe(244)
      expect(result.evs.spd).toBe(0)
    })

    it("should return no solution when optimized EVs exceed budget with keepOffensiveEvs", () => {
      const defender = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
      })

      const attacker = new Pokemon("Flutter Mane", {
        nature: "Timid",
        moveSet: new MoveSet(new Move("Moonblast"), new Move("Shadow Ball"), new Move("Icy Wind"), new Move("Protect")),
        evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 252 }
      })

      const field = new Field()
      const targets = [new Target(attacker)]
      const result = service.optimize(defender, targets, field, false, true)

      expect(result.evs.hp).toBe(0)
      expect(result.evs.atk).toBe(252)
      expect(result.evs.def).toBe(0)
      expect(result.evs.spa).toBe(0)
      expect(result.evs.spd).toBe(0)
      expect(result.evs.spe).toBe(252)
      expect(result.nature).toBeNull()
    })

    it("should return no solution with zero offensive EVs when keepOffensiveEvs is false", () => {
      const defender = new Pokemon("Ting-Lu", {
        nature: "Bold",
        evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const attacker = new Pokemon("Urshifu-Rapid-Strike", {
        nature: "Adamant",
        teraType: "Water",
        teraTypeActive: true,
        ability: new Ability("Unseen Fist"),
        item: "Choice Band",
        moveSet: new MoveSet(new Move("Surging Strikes"), new Move("Close Combat"), new Move("Aqua Jet"), new Move("Detect")),
        evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 },
        boosts: { hp: 0, atk: 6, def: 0, spa: 0, spd: 0, spe: 0 }
      })

      const field = new Field()
      const targets = [new Target(attacker)]
      const result = service.optimize(defender, targets, field, false, false)

      expect(result.evs.hp).toBe(0)
      expect(result.evs.atk).toBe(0)
      expect(result.evs.def).toBe(0)
      expect(result.evs.spa).toBe(0)
      expect(result.evs.spd).toBe(0)
      expect(result.evs.spe).toBe(0)
      expect(result.nature).toBeNull()
    })
  })
})
