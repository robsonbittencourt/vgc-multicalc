import { loadDomain } from "./bundle.mjs"

const RUNS = 5

const {
  DamageCalc,
  DefensiveEvOptimizer,
  Pokemon,
  Move,
  MoveSet,
  Field,
  Target,
  Ability
} = await loadDomain(`
export { DamageCalc } from "@multicalc/damage-calc/damage-calc"
export { DefensiveEvOptimizer } from "@multicalc/ev-optimizer/defensive-ev-optimizer"
export { Pokemon } from "@multicalc/model/pokemon"
export { Move } from "@multicalc/model/move"
export { MoveSet } from "@multicalc/model/moveset"
export { Field } from "@multicalc/model/field"
export { Target } from "@multicalc/model/target"
export { Ability } from "@multicalc/model/ability"
`)

const moves = (...names) => new MoveSet(...[0, 1, 2, 3].map(i => new Move(names[i] ?? "")))

const cases = []

function perfCase(name, maxDurationMs, setup) {
  cases.push({ name, maxDurationMs, setup })
}

perfCase("calcDamageAllAttacks — 100 attackers (400 calculations)", 60, () => {
  const service = new DamageCalc()
  const attackers = Array.from({ length: 100 }, (_, i) => new Pokemon("Raging Bolt", { id: `attacker-${i}`, moveSet: moves("Thunderbolt", "Thunderclap", "Draco Meteor", "Protect") }))
  const target = new Pokemon("Flutter Mane")
  const field = new Field()

  return () => attackers.forEach(attacker => service.calcDamage(attacker, target, field, true))
})

perfCase("calcDamageForTwoAttackers — 100 pairs", 60, () => {
  const service = new DamageCalc()
  const attacker1 = new Pokemon("Raging Bolt", { moveSet: moves("Thunderbolt", "Thunderclap", "Draco Meteor", "Protect") })
  const attacker2 = new Pokemon("Rillaboom", { moveSet: moves("Grassy Glide", "Fake Out", "Wood Hammer", "High Horsepower") })
  const targets = Array.from({ length: 100 }, (_, i) => new Pokemon("Flutter Mane", { id: `target-${i}`, evs: { hp: i % 252, def: (i * 2) % 252 } }))
  const field = new Field()

  return () => targets.forEach(target => service.calcDamageForTwoAttackers(attacker1, attacker2, target, field))
})

perfCase("EV optimization — Ting-Lu in it's limit", 120, () => {
  const service = new DefensiveEvOptimizer()
  const defender = new Pokemon("Ting-Lu", {
    nature: "Bold",
    item: "Clear Amulet",
    ability: new Ability("Vessel of Ruin"),
    teraType: "Fairy",
    teraTypeActive: true,
    moveSet: moves("Earthquake", "Throat Chop", "Tera Blast", "Protect"),
    evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
  })

  const urshifuRapidStrike = new Pokemon("Urshifu-Rapid-Strike", {
    nature: "Adamant",
    item: "Choice Scarf",
    ability: new Ability("Unseen Fist"),
    teraType: "Water",
    moveSet: moves("Surging Strikes", "U-turn", "Aqua Jet", "Surging Strikes"),
    evs: { hp: 4, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
  })

  const landorus = new Pokemon("Landorus", {
    nature: "Modest",
    item: "Life Orb",
    ability: new Ability("Sheer Force"),
    teraType: "Poison",
    moveSet: moves("Sludge Bomb", "Earth Power", "Protect", "Substitute"),
    evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }
  })

  const okidogi = new Pokemon("Okidogi", {
    nature: "Adamant",
    item: "Choice Band",
    ability: new Ability("Guard Dog"),
    teraType: "Water",
    moveSet: moves("Gunk Shot", "Drain Punch", "Upper Hand", "Knock Off"),
    evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }
  })

  const targets = [new Target(urshifuRapidStrike, landorus), new Target(okidogi)]
  const field = new Field()

  return () => service.optimize(defender, targets, field)
})

perfCase("EV optimization — Dondozo against two mixed pairs sharing attackers with the singles", 150, () => {
  const service = new DefensiveEvOptimizer()
  const defender = new Pokemon("Dondozo", { nature: "Impish", item: "Sitrus Berry", moveSet: moves("Wave Crash", "Body Press", "Protect", "Rest"), evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } })

  const ursaluna = () => new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: moves("Headlong Rush"), evs: { atk: 180 } })
  const landorus = () => new Pokemon("Landorus-Therian", { nature: "Adamant", item: "Choice Band", moveSet: moves("Earthquake"), evs: { atk: 252 } })
  const sneasel = new Pokemon("Sneasel", { nature: "Adamant", moveSet: moves("Ice Punch"), evs: { atk: 252 } })
  const garchomp = new Pokemon("Garchomp", { nature: "Adamant", moveSet: moves("Earthquake"), evs: { atk: 252 } })

  const targets = [new Target(ursaluna()), new Target(landorus()), new Target(landorus(), sneasel), new Target(garchomp, ursaluna())]
  const field = new Field({ weather: "Sand" })

  return {
    run: () => service.optimize(defender, targets, field, false, false, 3, 15, false),
    expect: result => {
      assertEqual(result.status, "success", "status")
      assertEqual(JSON.stringify(result.evs), JSON.stringify({ hp: 0, atk: 0, def: 92, spa: 0, spd: 0, spe: 0 }), "evs")
    }
  }
})

perfCase("EV optimization — Ting-Lu with a Berry against a mixed pair that shares no attacker with the singles", 250, () => {
  const service = new DefensiveEvOptimizer()
  const defender = new Pokemon("Ting-Lu", { item: "Sitrus Berry", moveSet: moves("Earthquake") })

  const ursaluna = new Pokemon("Ursaluna", { nature: "Adamant", item: "Choice Band", moveSet: moves("Headlong Rush"), evs: { atk: 184 } })
  const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", item: "Life Orb", moveSet: moves("Overheat"), evs: { spa: 124 } })
  const ironBundle = new Pokemon("Iron Bundle", { nature: "Modest", moveSet: moves("Hydro Pump"), evs: { spa: 220 } })
  const garchomp = new Pokemon("Garchomp", { nature: "Adamant", item: "Choice Band", moveSet: moves("Earthquake"), evs: { atk: 164 } })
  const chiYuPartner = new Pokemon("Chi-Yu", { nature: "Modest", moveSet: moves("Flamethrower"), evs: { spa: 0 } })

  const targets = [new Target(ursaluna), new Target(chiYu), new Target(ironBundle), new Target(garchomp, chiYuPartner)]
  const field = new Field()

  return {
    run: () => service.optimize(defender, targets, field, false, false, 3),
    expect: result => {
      assertEqual(result.status, "success", "status")
      assertEqual(JSON.stringify(result.evs), JSON.stringify({ hp: 236, atk: 0, def: 0, spa: 0, spd: 252, spe: 0 }), "evs")
    }
  }
})

function assertEqual(actual, expected, label) {
  if (actual !== expected) throw new Error(`expected ${label} to be ${expected}, got ${actual}`)
}

const failures = []

console.log(`\nPerformance suite — median of ${RUNS} runs\n`)

for (const { name, maxDurationMs, setup } of cases) {
  const times = []
  let assertionError = null

  for (let i = 0; i < RUNS; i++) {
    const prepared = setup()
    const run = typeof prepared === "function" ? prepared : prepared.run
    const check = typeof prepared === "function" ? null : prepared.expect

    const start = performance.now()
    const result = run()
    times.push(performance.now() - start)

    if (check && !assertionError) {
      try {
        check(result)
      } catch (error) {
        assertionError = error
      }
    }
  }

  times.sort((a, b) => a - b)
  const median = times[Math.floor(times.length / 2)]
  const slowest = times[times.length - 1]
  const overThreshold = median >= maxDurationMs

  const status = assertionError ? "✗ WRONG" : overThreshold ? "✗ SLOW " : "✓ ok   "
  console.log(`${status} ${median.toFixed(1)}ms / ${maxDurationMs}ms (max ${slowest.toFixed(1)}ms)  ${name}`)

  if (assertionError) failures.push(`${name}: ${assertionError.message}`)
  else if (overThreshold) failures.push(`${name}: median ${median.toFixed(1)}ms exceeded threshold ${maxDurationMs}ms`)
}

if (failures.length > 0) {
  console.log(`\n${failures.length} failure(s):`)
  for (const failure of failures) console.log(`  - ${failure}`)
  console.log()
  process.exit(1)
}

console.log(`\nAll ${cases.length} performance checks passed.\n`)
