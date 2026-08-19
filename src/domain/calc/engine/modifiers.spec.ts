import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { getAtMods, getBpMods, getDfMods, getFinalMods, ModifierContext } from "@calc/engine/modifiers"
import { calculate } from "@calc"
import { RawDesc } from "@data/types"

function makeCtx(overrides: Partial<ModifierContext> & { attacker: Pokemon; defender: Pokemon; move: Move }): ModifierContext {
  return {
    field: new Field(),
    description: {} as RawDesc,
    isCritical: false,
    turnOrder: "first",
    hasAteAbilityTypeChange: false,
    basePower: overrides.move.bp,
    typeEffectiveness: 1,
    hitCount: 0,
    hit: 1,
    hitsPhysical: overrides.move.category === "Physical",
    ...overrides
  }
}

describe("getBpMods", () => {
  it("Facade + status doubles BP", () => {
    const attacker = new Pokemon("Tauros", { status: "brn" })
    const defender = new Pokemon("Garchomp")
    const move = new Move("Facade")

    const ctx = makeCtx({ attacker, defender, move })

    expect(getBpMods(ctx)).toContain(8192)
  })

  it("Facade without status: no mod", () => {
    const attacker = new Pokemon("Tauros")
    const defender = new Pokemon("Garchomp")
    const move = new Move("Facade")

    const ctx = makeCtx({ attacker, defender, move })

    expect(getBpMods(ctx)).not.toContain(8192)
  })
})

describe("getBpMods — Knock Off", () => {
  it("boosts Knock Off against a defender holding a removable item", () => {
    const attacker = new Pokemon("Weavile")
    const defender = new Pokemon("Blissey", { item: "Leftovers" })
    const move = new Move("Knock Off")

    const ctx = makeCtx({ attacker, defender, move })

    expect(getBpMods(ctx)).toContain(6144)
  })

  it("does not boost Knock Off against an item-less defender", () => {
    const attacker = new Pokemon("Weavile")
    const defender = new Pokemon("Blissey")
    const move = new Move("Knock Off")

    const ctx = makeCtx({ attacker, defender, move })

    expect(getBpMods(ctx)).not.toContain(6144)
  })

  it("does not boost Knock Off after the first hit, once the item is gone", () => {
    const attacker = new Pokemon("Weavile")
    const defender = new Pokemon("Blissey", { item: "Leftovers" })
    const move = new Move("Knock Off")

    const ctx = makeCtx({ attacker, defender, move, hit: 2 })

    expect(getBpMods(ctx)).not.toContain(6144)
  })

  it("still boosts Knock Off on a later hit when the defender has Sticky Hold", () => {
    const attacker = new Pokemon("Weavile")
    const defender = new Pokemon("Gastrodon", { item: "Leftovers", ability: "Sticky Hold" })
    const move = new Move("Knock Off")

    const ctx = makeCtx({ attacker, defender, move, hit: 2 })

    expect(getBpMods(ctx)).toContain(6144)
  })
})

describe("getBpMods — aura abilities", () => {
  it("boosts a Dark move with Dark Aura", () => {
    const attacker = new Pokemon("Chi-Yu", { ability: "Dark Aura" })
    const defender = new Pokemon("Blissey")
    const move = new Move("Crunch")

    expect(getBpMods(makeCtx({ attacker, defender, move }))).toContain(5448)
  })

  it("inverts the aura boost when either side has Aura Break", () => {
    const attacker = new Pokemon("Chi-Yu", { ability: "Dark Aura" })
    const defender = new Pokemon("Zangoose", { ability: "Aura Break" })
    const move = new Move("Crunch")

    expect(getBpMods(makeCtx({ attacker, defender, move }))).toContain(3072)
  })

  it("does not boost Knock Off when the defender holds its own mega stone", () => {
    const attacker = new Pokemon("Weavile")
    const defender = new Pokemon("Kangaskhan", { item: "Kangaskhanite" })
    const move = new Move("Knock Off")

    expect(getBpMods(makeCtx({ attacker, defender, move }))).not.toContain(6144)
  })
})

describe("getAtMods — ally-provided field boosts", () => {
  it("boosts a Physical move when an ally has Flower Gift in Sun", () => {
    const attacker = new Pokemon("Garchomp")
    const defender = new Pokemon("Blissey")
    const move = new Move("Earthquake")
    const field = new Field({ weather: "Sun", attackerSide: { isFlowerGift: true } })

    expect(getAtMods(makeCtx({ attacker, defender, move, field }))).toContain(6144)
  })

  it("boosts a Steel move when an ally has Steely Spirit", () => {
    const attacker = new Pokemon("Metagross")
    const defender = new Pokemon("Blissey")
    const move = new Move("Meteor Mash")
    const field = new Field({ attackerSide: { isSteelySpirit: true } })

    expect(getAtMods(makeCtx({ attacker, defender, move, field }))).toContain(6144)
  })

  it("stacks an ally's Flower Gift with the attacker's own Huge Power", () => {
    const attacker = new Pokemon("Azumarill", { ability: "Huge Power" })
    const defender = new Pokemon("Blissey")
    const move = new Move("Play Rough")
    const field = new Field({ weather: "Sun", attackerSide: { isFlowerGift: true } })

    const mods = getAtMods(makeCtx({ attacker, defender, move, field }))

    expect(mods).toContain(6144)
    expect(mods).toContain(8192)
  })

  it("stacks an ally's Steely Spirit with the attacker's own Huge Power", () => {
    const attacker = new Pokemon("Azumarill", { ability: "Huge Power" })
    const defender = new Pokemon("Blissey")
    const move = new Move("Iron Head")
    const field = new Field({ attackerSide: { isSteelySpirit: true } })

    const mods = getAtMods(makeCtx({ attacker, defender, move, field }))

    expect(mods).toContain(6144)
    expect(mods).toContain(8192)
  })
})

describe("getDfMods — Quark Drive on the defender", () => {
  it("boosts the defence when Quark Drive raises Defense in Electric Terrain", () => {
    const attacker = new Pokemon("Garchomp")
    const defender = new Pokemon("Iron Hands", { ability: "Quark Drive", boostedStat: "def" })
    const move = new Move("Earthquake")
    const field = new Field({ terrain: "Electric" })

    expect(getDfMods(makeCtx({ attacker, defender, move, field }))).toContain(5325)
  })
})

describe("getFinalMods — screens in Singles", () => {
  it("halves Special damage behind Light Screen in Singles", () => {
    const attacker = new Pokemon("Gengar")
    const defender = new Pokemon("Blissey")
    const move = new Move("Shadow Ball")
    const field = new Field({ gameType: "Singles", defenderSide: { isLightScreen: true } })

    const ctx = makeCtx({ attacker, defender, move, field, hitsPhysical: false })

    expect(getFinalMods(ctx)).toContain(2048)
  })

  it("applies the doubles reduction behind Light Screen outside Singles", () => {
    const attacker = new Pokemon("Gengar")
    const defender = new Pokemon("Blissey")
    const move = new Move("Shadow Ball")
    const field = new Field({ gameType: "Doubles", defenderSide: { isLightScreen: true } })

    const ctx = makeCtx({ attacker, defender, move, field, hitsPhysical: false })

    expect(getFinalMods(ctx)).toContain(2732)
  })

  it("halves damage behind Aurora Veil in Singles", () => {
    const attacker = new Pokemon("Garchomp")
    const defender = new Pokemon("Blissey")
    const move = new Move("Earthquake")
    const field = new Field({ gameType: "Singles", defenderSide: { isAuroraVeil: true } })

    const ctx = makeCtx({ attacker, defender, move, field })

    expect(getFinalMods(ctx)).toContain(2048)
  })

  it("does not apply Aurora Veil on a critical hit", () => {
    const attacker = new Pokemon("Garchomp")
    const defender = new Pokemon("Blissey")
    const move = new Move("Earthquake")
    const field = new Field({ gameType: "Singles", defenderSide: { isAuroraVeil: true } })

    const ctx = makeCtx({ attacker, defender, move, field, isCritical: true })

    expect(getFinalMods(ctx)).not.toContain(2048)
  })
})

describe("getFinalMods", () => {
  it("Life Orb boosts final mods", () => {
    const attacker = new Pokemon("Garchomp", { item: "Life Orb" })
    const defender = new Pokemon("Starmie")
    const move = new Move("Earthquake")

    const ctx = makeCtx({ attacker, defender, move })

    expect(getFinalMods(ctx)).toContain(5324)
  })

  it("scales the Metronome boost with the number of consecutive uses", () => {
    const attacker = new Pokemon("Garchomp", { item: "Metronome" })
    const defender = new Pokemon("Starmie")
    const move = new Move("Earthquake", { timesUsedWithMetronome: 3 })

    const ctx = makeCtx({ attacker, defender, move })

    expect(getFinalMods(ctx)).toContain(4096 + 3 * 819)
  })

  it("caps the Metronome boost after five consecutive uses", () => {
    const attacker = new Pokemon("Garchomp", { item: "Metronome" })
    const defender = new Pokemon("Starmie")
    const move = new Move("Earthquake", { timesUsedWithMetronome: 5 })

    const ctx = makeCtx({ attacker, defender, move })

    expect(getFinalMods(ctx)).toContain(8192)
  })
})

describe("getAtMods", () => {
  it("Choice Band boosts Physical", () => {
    const attacker = new Pokemon("Garchomp", { item: "Choice Band" })
    const defender = new Pokemon("Starmie")
    const move = new Move("Earthquake")

    const ctx = makeCtx({ attacker, defender, move })

    expect(getAtMods(ctx)).toContain(6144)
  })

  it("Choice Specs boosts Special", () => {
    const attacker = new Pokemon("Gengar", { item: "Choice Specs" })
    const defender = new Pokemon("Starmie")
    const move = new Move("Shadow Ball")

    const ctx = makeCtx({ attacker, defender, move, hitsPhysical: false })

    expect(getAtMods(ctx)).toContain(6144)
  })
})

describe("getDfMods", () => {
  it("Fur Coat halves Physical damage", () => {
    const attacker = new Pokemon("Garchomp")
    const defender = new Pokemon("Furfrou", { ability: "Fur Coat" })
    const move = new Move("Earthquake")

    const ctx = makeCtx({ attacker, defender, move })

    expect(getDfMods(ctx)).toContain(8192)
  })

  it("Fur Coat no mod on Special", () => {
    const attacker = new Pokemon("Gengar")
    const defender = new Pokemon("Furfrou", { ability: "Fur Coat" })
    const move = new Move("Shadow Ball")

    const ctx = makeCtx({ attacker, defender, move, hitsPhysical: false })

    expect(getDfMods(ctx)).not.toContain(8192)
  })
})

describe("Aura abilities", () => {
  const blissey = (options: Record<string, unknown> = {}) => new Pokemon("Blissey", { evs: { hp: 252 }, ...options } as never)

  it("boosts a Fairy move when Fairy Aura is active on the field", () => {
    const attacker = new Pokemon("Sylveon", { evs: { spa: 252 }, nature: "Modest" })

    const result = calculate(attacker, blissey(), new Move("Moonblast"), new Field({ isFairyAura: true } as never))

    expect(result.description()).toEqual("252+ SpA Sylveon Fairy Aura Moonblast vs. 252 HP / 0 SpD Blissey: 82-97 (22.6 - 26.7%) -- 31.1% chance to 4HKO")
  })

  it("boosts a Dark move when Dark Aura is active on the field", () => {
    const attacker = new Pokemon("Hydreigon", { evs: { spa: 252 }, nature: "Modest" })

    const result = calculate(attacker, blissey(), new Move("Dark Pulse"), new Field({ isDarkAura: true } as never))

    expect(result.description()).toEqual("252+ SpA Hydreigon Dark Pulse vs. 252 HP / 0 SpD Blissey: 76-90 (20.9 - 24.8%) -- guaranteed 5HKO")
  })

  it("weakens the aura boost when the defender has Aura Break", () => {
    const attacker = new Pokemon("Sylveon", { evs: { spa: 252 }, nature: "Modest" })

    const result = calculate(attacker, blissey({ ability: "Aura Break" }), new Move("Moonblast"), new Field({ isFairyAura: true } as never))

    expect(result.description()).toEqual("252+ SpA Sylveon Moonblast vs. 252 HP / 0 SpD Blissey: 46-55 (12.7 - 15.1%) -- possible 7HKO")
  })
})

describe("Attack-boosting abilities and items", () => {
  const blissey = () => new Pokemon("Blissey", { evs: { hp: 252 } })

  it("applies Sheer Force to Electro Shot, which has no secondary effect entry", () => {
    const attacker = new Pokemon("Raging Bolt", { evs: { spa: 252 }, ability: "Sheer Force" })

    const result = calculate(attacker, blissey(), new Move("Electro Shot"), new Field())

    expect(result.description()).toEqual("+1 252 SpA Sheer Force Raging Bolt Electro Shot vs. 252 HP / 0 SpD Blissey: 174-205 (48 - 56.6%) -- 87.5% chance to 2HKO")
  })

  it("applies Sheer Force to Order Up", () => {
    const attacker = new Pokemon("Dondozo", { evs: { atk: 252 }, ability: "Sheer Force" })

    const result = calculate(attacker, blissey(), new Move("Order Up"), new Field())

    expect(result.description()).toEqual("252 Atk Sheer Force Dondozo Order Up vs. 252 HP / 0 Def Blissey: 198-233 (54.6 - 64.3%) -- guaranteed 2HKO")
  })

  it("applies Reckless to a move with crash damage rather than recoil", () => {
    const attacker = new Pokemon("Hitmonlee", { evs: { atk: 252 }, ability: "Reckless" })

    const result = calculate(attacker, blissey(), new Move("High Jump Kick"), new Field())

    expect(result.description()).toEqual("252 Atk Reckless Hitmonlee High Jump Kick vs. 252 HP / 0 Def Blissey: 1004-1184 (277.3 - 327%) -- guaranteed OHKO")
  })

  it("applies Iron Fist to a punching move", () => {
    const attacker = new Pokemon("Ursaluna", { evs: { atk: 252 }, ability: "Iron Fist" })

    const result = calculate(attacker, blissey(), new Move("Drain Punch"), new Field())

    expect(result.description()).toEqual("252 Atk Iron Fist Ursaluna Drain Punch vs. 252 HP / 0 Def Blissey: 432-510 (119.3 - 140.8%) -- guaranteed OHKO")
  })

  it("stacks the Metronome item boost with the number of consecutive uses", () => {
    const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, item: "Metronome" })

    const result = calculate(attacker, blissey(), new Move("Earthquake", { timesUsedWithMetronome: 3 } as never), new Field())

    expect(result.description()).toEqual("252 Atk Metronome Garchomp Earthquake vs. 252 HP / 0 Def Blissey: 544-643 (150.2 - 177.6%) -- guaranteed OHKO")
  })

  it("does not apply the Metronome boost when the move has no usage count", () => {
    const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, item: "Metronome" })

    const result = calculate(attacker, blissey(), new Move("Earthquake"), new Field())

    expect(result.description()).toEqual("252 Atk Garchomp Earthquake vs. 252 HP / 0 Def Blissey: 340-402 (93.9 - 111%) -- 62.5% chance to OHKO")
  })

  it("does not apply the Metronome boost on the first use", () => {
    const attacker = new Pokemon("Garchomp", { evs: { atk: 252 }, item: "Metronome" })

    const result = calculate(attacker, blissey(), new Move("Earthquake", { timesUsedWithMetronome: 0 } as never), new Field())

    expect(result.description()).toEqual("252 Atk Garchomp Earthquake vs. 252 HP / 0 Def Blissey: 340-402 (93.9 - 111%) -- 62.5% chance to OHKO")
  })
})

describe("Defensive Quark Drive and Multiscale", () => {
  const ironTreads = (boostedStat: string) => new Pokemon("Iron Treads", { evs: { hp: 252 }, ability: "Quark Drive", boostedStat } as never)
  const electricTerrain = () => new Field({ terrain: "Electric" } as never)

  it("boosts Def against a physical move when Quark Drive picked Def", () => {
    const attacker = new Pokemon("Garchomp", { evs: { atk: 252 } })

    const result = calculate(attacker, ironTreads("def"), new Move("Earthquake"), electricTerrain())

    expect(result.description()).toEqual("252 Atk Garchomp Earthquake vs. 252 HP / 0 Def Quark Drive Iron Treads: 116-138 (58.8 - 70%) -- guaranteed 2HKO")
  })

  it("boosts SpD against a special move when Quark Drive picked SpD", () => {
    const attacker = new Pokemon("Hydreigon", { evs: { spa: 252 } })

    const result = calculate(attacker, ironTreads("spd"), new Move("Dark Pulse"), electricTerrain())

    expect(result.description()).toEqual("252 SpA Hydreigon Dark Pulse vs. 252 HP / 0 SpD Quark Drive Iron Treads: 69-82 (35 - 41.6%) -- guaranteed 3HKO")
  })

  it("does not boost SpD against a special move when Quark Drive picked Def", () => {
    const attacker = new Pokemon("Hydreigon", { evs: { spa: 252 } })

    const result = calculate(attacker, ironTreads("def"), new Move("Dark Pulse"), electricTerrain())

    expect(result.description()).toEqual("252 SpA Hydreigon Dark Pulse vs. 252 HP / 0 SpD Iron Treads: 90-106 (45.6 - 53.8%) -- 41.4% chance to 2HKO")
  })

  it("halves the damage taken by a Shadow Shield holder at full HP", () => {
    const attacker = new Pokemon("Garchomp", { evs: { atk: 252 } })
    const defender = new Pokemon("Lunala", { evs: { hp: 252 }, ability: "Shadow Shield" })

    const result = calculate(attacker, defender, new Move("Earthquake"), new Field())

    expect(result.description()).toEqual("252 Atk Garchomp Earthquake vs. 252 HP / 0 Def Shadow Shield Lunala: 47-56 (19.2 - 22.9%) -- possible 5HKO")
  })
})

describe("Aura abilities on the defending side", () => {
  const sylveon = (options: Record<string, unknown> = {}) => new Pokemon("Sylveon", { evs: { spa: 252 }, nature: "Modest", ...options } as never)
  const xerneas = () => new Pokemon("Xerneas", { evs: { hp: 252 }, ability: "Fairy Aura" })

  it("boosts the move when the defender is the one holding Fairy Aura", () => {
    const result = calculate(sylveon(), xerneas(), new Move("Moonblast"), new Field())

    expect(result.description()).toEqual("252+ SpA Sylveon Moonblast vs. 252 HP / 0 SpD Fairy Aura Xerneas: 108-127 (46.3 - 54.5%) -- 55.9% chance to 2HKO")
  })

  it("weakens the defender's aura when the attacker has Aura Break", () => {
    const result = calculate(sylveon({ ability: "Aura Break" }), xerneas(), new Move("Moonblast"), new Field())

    expect(result.description()).toEqual("252+ SpA Sylveon Moonblast vs. 252 HP / 0 SpD Fairy Aura Xerneas: 61-73 (26.1 - 31.3%) -- guaranteed 4HKO")
  })
})

describe("Pinch and teamwork abilities", () => {
  const blissey = () => new Pokemon("Blissey", { evs: { hp: 252 } })
  const inPinch = (name: string, ability: string) => new Pokemon(name, { evs: { spa: 252 }, ability, curHP: 1 } as never)

  it("boosts a Grass move with Overgrow at low HP", () => {
    const result = calculate(inPinch("Venusaur", "Overgrow"), blissey(), new Move("Giga Drain"), new Field())

    expect(result.description()).toEqual("252 SpA Overgrow Venusaur Giga Drain vs. 252 HP / 0 SpD Blissey: 63-75 (17.4 - 20.7%) -- possible 5HKO")
  })

  it("boosts a Fire move with Blaze at low HP", () => {
    const result = calculate(inPinch("Charizard", "Blaze"), blissey(), new Move("Flamethrower"), new Field())

    expect(result.description()).toEqual("252 SpA Blaze Charizard Flamethrower vs. 252 HP / 0 SpD Blissey: 79-94 (21.8 - 25.9%) -- 3.8% chance to 4HKO")
  })

  it("boosts a Water move with Torrent at low HP", () => {
    const result = calculate(inPinch("Blastoise", "Torrent"), blissey(), new Move("Surf"), new Field())

    expect(result.description()).toEqual("252 SpA Torrent Blastoise Surf vs. 252 HP / 0 SpD Blissey: 67-81 (18.5 - 22.3%) -- possible 5HKO")
  })

  it("boosts a Bug move with Swarm at low HP", () => {
    const result = calculate(inPinch("Volcarona", "Swarm"), blissey(), new Move("Bug Buzz"), new Field())

    expect(result.description()).toEqual("252 SpA Swarm Volcarona Bug Buzz vs. 252 HP / 0 SpD Blissey: 93-109 (25.6 - 30.1%) -- guaranteed 4HKO")
  })

  it("boosts a special move when Plus is active", () => {
    const attacker = new Pokemon("Plusle", { evs: { spa: 252 }, ability: "Plus", abilityOn: true } as never)

    const result = calculate(attacker, blissey(), new Move("Thunderbolt"), new Field())

    expect(result.description()).toEqual("252 SpA Plus Plusle Thunderbolt vs. 252 HP / 0 SpD Blissey: 67-81 (18.5 - 22.3%) -- possible 5HKO")
  })

  it("boosts a special move when Minus is active", () => {
    const attacker = new Pokemon("Minun", { evs: { spa: 252 }, ability: "Minus", abilityOn: true } as never)

    const result = calculate(attacker, blissey(), new Move("Thunderbolt"), new Field())

    expect(result.description()).toEqual("252 SpA Minus Minun Thunderbolt vs. 252 HP / 0 SpD Blissey: 63-75 (17.4 - 20.7%) -- possible 5HKO")
  })
})

describe("Multiscale and entry hazards", () => {
  const garchomp = () => new Pokemon("Garchomp", { evs: { atk: 252 } })
  const dragonite = (options: Record<string, unknown> = {}) => new Pokemon("Dragonite", { evs: { hp: 252 }, ability: "Multiscale", ...options } as never)
  const stealthRock = () => new Field({ defenderSide: { isSR: true } } as never)

  it("does not apply Multiscale when Stealth Rock has chipped the defender", () => {
    const result = calculate(garchomp(), dragonite(), new Move("Ice Beam"), stealthRock())

    expect(result.description()).toEqual("0 SpA Garchomp Ice Beam vs. 252 HP / 0 SpD Dragonite: 116-140 (58.5 - 70.7%) -- guaranteed 2HKO after Stealth Rock")
  })

  it("applies Multiscale against Spikes when the defender is Flying and stays ungrounded", () => {
    const result = calculate(garchomp(), dragonite(), new Move("Ice Beam"), new Field({ defenderSide: { spikes: 2 } } as never))

    expect(result.description()).toEqual("0 SpA Garchomp Ice Beam vs. 252 HP / 0 SpD Multiscale Dragonite: 58-70 (29.2 - 35.3%) -- 16.3% chance to 3HKO")
  })

  it("does not apply Shadow Shield when Spikes chip a grounded defender", () => {
    const defender = new Pokemon("Lunala", { evs: { hp: 252 }, ability: "Shadow Shield" })

    const result = calculate(garchomp(), defender, new Move("Shadow Ball"), new Field({ defenderSide: { spikes: 2 } } as never))

    expect(result.description()).toEqual("0 SpA Garchomp Shadow Ball vs. 252 HP / 0 SpD Lunala: 96-116 (39.3 - 47.5%) -- 84% chance to 2HKO after 2 layers of Spikes")
  })

  it("applies Multiscale when Heavy-Duty Boots prevent the Stealth Rock chip", () => {
    const result = calculate(garchomp(), dragonite({ item: "Heavy-Duty Boots" }), new Move("Ice Beam"), stealthRock())

    expect(result.description()).toEqual("0 SpA Garchomp Ice Beam vs. 252 HP / 0 SpD Multiscale Dragonite: 58-70 (29.2 - 35.3%) -- 16.3% chance to 3HKO")
  })
})

describe("Knock Off against an unremovable item", () => {
  const garchomp = () => new Pokemon("Garchomp", { evs: { atk: 252 } })

  it("does not boost Knock Off when the defender holds its own mega stone", () => {
    const defender = new Pokemon("Garchomp", { evs: { hp: 252 }, item: "Garchompite" } as never)

    const result = calculate(garchomp(), defender, new Move("Knock Off"), new Field())

    expect(result.description()).toEqual("252 Atk Garchomp Knock Off vs. 252 HP / 0 Def Garchomp: 39-47 (18.1 - 21.8%) -- possible 5HKO")
  })

  it("does not boost Knock Off when the already-mega defender holds the stone that created it", () => {
    const defender = new Pokemon("Garchomp-Mega", { evs: { hp: 252 }, item: "Garchompite" } as never)

    const result = calculate(garchomp(), defender, new Move("Knock Off"), new Field())

    expect(result.description()).toEqual("252 Atk Garchomp Knock Off vs. 252 HP / 0 Def Garchomp-Mega: 34-40 (15.8 - 18.6%) -- possible 6HKO")
  })

  it("boosts Knock Off when the defender holds a removable item", () => {
    const defender = new Pokemon("Garchomp", { evs: { hp: 252 }, item: "Leftovers" } as never)

    const result = calculate(garchomp(), defender, new Move("Knock Off"), new Field())

    expect(result.description()).toEqual("252 Atk Garchomp Knock Off (97.5 BP) vs. 252 HP / 0 Def Garchomp: 58-69 (26.9 - 32%) -- guaranteed 4HKO")
  })
})
