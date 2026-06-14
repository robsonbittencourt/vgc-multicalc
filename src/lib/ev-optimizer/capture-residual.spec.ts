import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { CALC_ADJUSTERS, CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { CalculatorStore } from "@data/store/calculator-store"
import { Ability } from "@lib/model/ability"
import { Field, FieldSide } from "@lib/model/field"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { DefensiveEvOptimizerService } from "./defensive-ev-optimizer.service"
import { Status } from "@lib/model/status"
import { MockOf } from "@lib/test-utils"
import * as fs from "fs"

describe("Capture Residual", () => {
  let service: DefensiveEvOptimizerService
  let adjusterSpy: MockOf<CalcAdjuster>
  const results: Record<string, any> = {}

  beforeEach(() => {
    adjusterSpy = { adjust: vi.fn() } as unknown as MockOf<CalcAdjuster>
    TestBed.configureTestingModule({
      providers: [
        DefensiveEvOptimizerService,
        DamageCalculatorService,
        { provide: CALC_ADJUSTERS, useValue: adjusterSpy, multi: true },
        { provide: CalculatorStore, useValue: { useSpsMode: () => false, isChampions: () => false } },
        provideZonelessChangeDetection()
      ]
    })
    service = TestBed.inject(DefensiveEvOptimizerService)
  })

  afterAll(() => { fs.writeFileSync("/tmp/residual-values.json", JSON.stringify(results, null, 2)) })

  it("T20 gardevoir vs torkoal 2HKO", () => {
    const defender = new Pokemon("Gardevoir-Mega", { evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })
    const attacker = new Pokemon("Torkoal", { nature: "Modest", item: "Choice Specs", ability: new Ability("Drought"), moveSet: new MoveSet(new Move("Eruption"), new Move("Heat Wave"), new Move("Solar Beam"), new Move("Protect")), evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } })
    const result = service.optimize(defender, [new Target(attacker)], new Field())
    results["T20"] = result.evs
    expect(true).toBe(true)
  })

  it("T21 dragonite vs torkoal adamant 3HKO", () => {
    const defender = new Pokemon("Dragonite-Mega", { evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })
    const attacker = new Pokemon("Torkoal", { nature: "Adamant", ability: new Ability("Drought"), moveSet: new MoveSet(new Move("Eruption"), new Move("Heat Wave"), new Move("Solar Beam"), new Move("Protect")), evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 252 } })
    const result = service.optimize(defender, [new Target(attacker)], new Field(), false, false, 3)
    results["T21"] = result.evs
    expect(true).toBe(true)
  })

  it("T22 dragonite vs torkoal -2spa 4HKO", () => {
    const defender = new Pokemon("Dragonite-Mega", { evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })
    const attacker = new Pokemon("Torkoal", { nature: "Adamant", boosts: { hp: 0, atk: 0, def: 0, spa: -2, spd: 0, spe: 0 }, ability: new Ability("Drought"), moveSet: new MoveSet(new Move("Eruption"), new Move("Heat Wave"), new Move("Solar Beam"), new Move("Protect")), evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 252 } })
    const result = service.optimize(defender, [new Target(attacker)], new Field(), false, false, 4)
    results["T22"] = result.evs
    expect(true).toBe(true)
  })

  it("T23 tyranitar burn leftovers 3HKO", () => {
    const defender = new Pokemon("Tyranitar-Mega", { evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, nature: "Bold", status: Status.BURN, item: "Leftovers", teraType: "Fairy", teraTypeActive: true })
    const attacker = new Pokemon("Garchomp-Mega", { nature: "Adamant", item: "Life Orb", moveSet: new MoveSet(new Move("Stomping Tantrum"), new Move("Rock Slide"), new Move("Earthquake"), new Move("Protect")), evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 } })
    const result = service.optimize(defender, [new Target(attacker)], new Field(), false, false, 3)
    results["T23"] = result.evs
    expect(true).toBe(true)
  })

  it("T24 gardevoir vs torkoal 2HKO updateNature", () => {
    const defender = new Pokemon("Gardevoir-Mega", { evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })
    const attacker = new Pokemon("Torkoal", { nature: "Modest", item: "Choice Specs", ability: new Ability("Drought"), moveSet: new MoveSet(new Move("Eruption"), new Move("Heat Wave"), new Move("Solar Beam"), new Move("Protect")), evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 } })
    const result = service.optimize(defender, [new Target(attacker)], new Field(), true)
    results["T24"] = result.evs; results["T24_nature"] = result.nature
    expect(true).toBe(true)
  })

  it("T25 dragonite vs torkoal 3HKO updateNature", () => {
    const defender = new Pokemon("Dragonite-Mega", { evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })
    const attacker = new Pokemon("Torkoal", { nature: "Adamant", ability: new Ability("Drought"), moveSet: new MoveSet(new Move("Eruption"), new Move("Heat Wave"), new Move("Solar Beam"), new Move("Protect")), evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 252 } })
    const result = service.optimize(defender, [new Target(attacker)], new Field(), true, false, 3)
    results["T25"] = result.evs; results["T25_nature"] = result.nature
    expect(true).toBe(true)
  })

  it("T26 dragonite vs torkoal -2spa 4HKO updateNature", () => {
    const defender = new Pokemon("Dragonite-Mega", { evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })
    const attacker = new Pokemon("Torkoal", { nature: "Adamant", boosts: { hp: 0, atk: 0, def: 0, spa: -2, spd: 0, spe: 0 }, ability: new Ability("Drought"), moveSet: new MoveSet(new Move("Eruption"), new Move("Heat Wave"), new Move("Solar Beam"), new Move("Protect")), evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 252 } })
    const result = service.optimize(defender, [new Target(attacker)], new Field(), true, false, 4)
    results["T26"] = result.evs; results["T26_nature"] = result.nature
    expect(true).toBe(true)
  })

  it("T27 dragonite leftovers vs torkoal 3HKO", () => {
    const defender = new Pokemon("Dragonite-Mega", { item: "Leftovers" })
    const attacker = new Pokemon("Torkoal", { nature: "Adamant", ability: new Ability("Drought"), moveSet: new MoveSet(new Move("Eruption"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })
    const result = service.optimize(defender, [new Target(attacker)], new Field(), false, false, 3)
    results["T27"] = result.evs
    expect(true).toBe(true)
  })

  it("T28 gardevoir seeded vs lucario 3HKO", () => {
    const defender = new Pokemon("Gardevoir-Mega", { nature: "Bold" })
    const attacker = new Pokemon("Lucario-Mega", { nature: "Calm", moveSet: new MoveSet(new Move("Bullet Punch"), new Move("Close Combat"), new Move("Ice Punch"), new Move("Protect")), evs: { atk: 252 } })
    const result = service.optimize(defender, [new Target(attacker)], new Field({ defenderSide: new FieldSide({ isSeeded: true }) }), false, false, 3)
    results["T28"] = result.evs
    expect(true).toBe(true)
  })

  it("T29 dragonite leftovers vs torkoal 3HKO updateNature", () => {
    const defender = new Pokemon("Dragonite-Mega", { item: "Leftovers" })
    const attacker = new Pokemon("Torkoal", { nature: "Adamant", ability: new Ability("Drought"), moveSet: new MoveSet(new Move("Eruption"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })
    const result = service.optimize(defender, [new Target(attacker)], new Field(), true, false, 3)
    results["T29"] = result.evs; results["T29_nature"] = result.nature
    expect(true).toBe(true)
  })

  it("T30 gyarados leftovers grassy vs lucario 4HKO", () => {
    const defender = new Pokemon("Gyarados-Mega", { nature: "Bold", item: "Leftovers", ability: new Ability("Mold Breaker") })
    const attacker = new Pokemon("Lucario-Mega", { nature: "Adamant", moveSet: new MoveSet(new Move("Bullet Punch"), new Move("Close Combat"), new Move("Ice Punch"), new Move("Protect")), evs: { atk: 20 } })
    const result = service.optimize(defender, [new Target(attacker)], new Field({ terrain: "Grassy" }), false, false, 4)
    results["T30"] = result.evs
    expect(true).toBe(true)
  })

  it("T31 dragonite leftovers vs torkoal -2 4HKO", () => {
    const defender = new Pokemon("Dragonite-Mega", { item: "Leftovers" })
    const attacker = new Pokemon("Torkoal", { nature: "Adamant", boosts: { spa: -2 }, ability: new Ability("Drought"), moveSet: new MoveSet(new Move("Eruption"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })
    const result = service.optimize(defender, [new Target(attacker)], new Field(), false, false, 4)
    results["T31"] = result.evs
    expect(true).toBe(true)
  })

  it("T32 dragonite leftovers vs torkoal -1 4HKO updateNature", () => {
    const defender = new Pokemon("Dragonite-Mega", { item: "Leftovers" })
    const attacker = new Pokemon("Torkoal", { nature: "Adamant", boosts: { spa: -1 }, ability: new Ability("Drought"), moveSet: new MoveSet(new Move("Eruption"), new Move(""), new Move(""), new Move("")), evs: { spa: 0 } })
    const result = service.optimize(defender, [new Target(attacker)], new Field(), true, false, 4)
    results["T32"] = result.evs; results["T32_nature"] = result.nature
    expect(true).toBe(true)
  })
})
