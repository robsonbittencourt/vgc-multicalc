import { Ability } from "@multicalc/model/ability"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { DefensiveEvOptimizer } from "@multicalc/ev-optimizer/defensive-ev-optimizer"

function expectPerformance<T>(fn: () => T, maxDurationMs: number, description?: string): T {
  const startTime = performance.now()
  const result = fn()
  const duration = performance.now() - startTime

  const msg = description ? `${description} took ${duration.toFixed(2)}ms (max: ${maxDurationMs}ms)` : `Operation took ${duration.toFixed(2)}ms (max: ${maxDurationMs}ms)`

  expect(duration, msg).toBeLessThan(maxDurationMs)

  return result
}

describe("DefensiveEvOptimizer - Performance", () => {
  let service: DefensiveEvOptimizer

  beforeEach(() => {
    service = new DefensiveEvOptimizer()
  })

  it("should optimize EVs for Ting-Lu in it's limit", () => {
    performance.now()
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

    expectPerformance(() => service.optimize(defender, targets, field), 2000, "EV optimization for Ting-Lu in it's limit")
  })
})
