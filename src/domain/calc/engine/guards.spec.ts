import { applyEarlyReturnGuards, applyTypeGuards, applyFixedDamageGuards, computeMoveType, computeTypeEffectiveness, CombatContext } from "@calc/engine/guards"
import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { computeFinalStats } from "@calc/engine/stats"
import { RawDesc } from "@data/types"

function makeCtx(
  attackerName: string,
  attackerOptions: Record<string, unknown>,
  defenderName: string,
  defenderOptions: Record<string, unknown>,
  moveName: string,
  moveOptions: Record<string, unknown> = {},
  fieldOptions: Record<string, unknown> = {}
): CombatContext {
  const attacker = new Pokemon(attackerName, attackerOptions as never)
  const defender = new Pokemon(defenderName, defenderOptions as never)
  const move = new Move(moveName, moveOptions as never)
  const field = new Field(fieldOptions as never)

  computeFinalStats(attacker, defender, field, "spe", "atk", "spa", "def", "spd")

  const description = { attackerName, defenderName, moveName } as RawDesc

  return { attacker, defender, move, field, description }
}

describe("applyEarlyReturnGuards", () => {
  it("returns immune for Status moves", () => {
    const ctx = makeCtx("Pelipper", {}, "Garchomp", {}, "Tailwind")
    expect(applyEarlyReturnGuards(ctx)?.type).toBe("immune")
  })

  it("Pain Split is a Status move and returns immune", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", {}, "Pain Split")
    expect(applyEarlyReturnGuards(ctx)?.type).toBe("immune")
  })

  it("returns null for damaging moves", () => {
    const ctx = makeCtx("Pelipper", {}, "Garchomp", {}, "Surf")
    expect(applyEarlyReturnGuards(ctx)).toBeNull()
  })

  it("returns immune when defender is protected and move does not break protect", () => {
    const ctx = makeCtx("Pelipper", {}, "Garchomp", {}, "Surf", {}, { defenderSide: { isProtected: true } })

    const result = applyEarlyReturnGuards(ctx)

    expect(result?.type).toBe("immune")
    expect(ctx.description.isProtected).toBe(true)
  })

  it("passes through when Unseen Fist attacker uses contact move into protect", () => {
    const ctx = makeCtx("Garchomp", { ability: "Unseen Fist" }, "Pelipper", {}, "Outrage", {}, { defenderSide: { isProtected: true } })
    expect(applyEarlyReturnGuards(ctx)).toBeNull()
  })

  it("clears defender ability when Mold Breaker attacker faces ignorable ability", () => {
    const ctx = makeCtx("Garchomp", { ability: "Mold Breaker" }, "Chimecho", { ability: "Levitate" }, "Earthquake")

    applyEarlyReturnGuards(ctx)

    expect(ctx.defender.ability).toBeUndefined()
    expect(ctx.description.attackerAbility).toBe("Mold Breaker")
  })

  it("does not clear defender ability when Mold Breaker faces non-ignorable ability", () => {
    const ctx = makeCtx("Garchomp", { ability: "Mold Breaker" }, "Garchomp", { ability: "Rough Skin" }, "Earthquake")

    applyEarlyReturnGuards(ctx)

    expect(ctx.defender.ability).toBe("Rough Skin")
  })

  it("flips Tera Blast to Physical when attacker's Attack exceeds Special Attack, given a Tera Type", () => {
    const ctx = makeCtx("Garchomp", { teraType: "Dragon", evs: { atk: 252 } }, "Pelipper", {}, "Tera Blast")

    applyEarlyReturnGuards(ctx)

    expect(ctx.move.category).toBe("Physical")
  })

  it("keeps Tera Blast Special when no Tera Type is set", () => {
    const ctx = makeCtx("Garchomp", { evs: { atk: 252 } }, "Pelipper", {}, "Tera Blast")

    applyEarlyReturnGuards(ctx)

    expect(ctx.move.category).toBe("Special")
  })

  it("keeps Tera Blast Special when the attacker's Special Attack exceeds its Attack, given a Tera Type", () => {
    const ctx = makeCtx("Alakazam", { teraType: "Dragon", evs: { spa: 252 } }, "Pelipper", {}, "Tera Blast")

    applyEarlyReturnGuards(ctx)

    expect(ctx.move.category).toBe("Special")
  })

  it("flips Tera Starstorm to Physical for Terapagos-Stellar with a Tera Type and higher Attack", () => {
    const ctx = makeCtx("Terapagos-Stellar", { teraType: "Stellar", evs: { atk: 252 } }, "Pelipper", {}, "Tera Starstorm")

    applyEarlyReturnGuards(ctx)

    expect(ctx.move.category).toBe("Physical")
  })

  it("does not flip Tera Starstorm's category for a non-Terapagos-Stellar user", () => {
    const ctx = makeCtx("Garchomp", { teraType: "Stellar", evs: { atk: 252 } }, "Pelipper", {}, "Tera Starstorm")

    applyEarlyReturnGuards(ctx)

    expect(ctx.move.category).toBe("Special")
  })

  it("keeps Shell Side Arm Special when it deals more damage that way", () => {
    const ctx = makeCtx("Slowking-Galar", { evs: { spa: 252 } }, "Garchomp", { evs: { def: 252 } }, "Shell Side Arm")

    applyEarlyReturnGuards(ctx)

    expect(ctx.move.category).toBe("Special")
  })

  it("uses Wonder Room's swapped Def/SpD stats to pick Shell Side Arm's category", () => {
    const ctx = makeCtx("Slowking-Galar", { evs: { atk: 252 } }, "Blissey", { evs: { def: 252, spd: 4 } }, "Shell Side Arm", {}, { isWonderRoom: true })

    applyEarlyReturnGuards(ctx)

    expect(ctx.move.category).toBe("Special")
  })
})

describe("applyTypeGuards", () => {
  it("returns immune when typeEffectiveness is 0", () => {
    const ctx = makeCtx("Pelipper", {}, "Garchomp", {}, "Surf")
    expect(applyTypeGuards(ctx, 0)?.type).toBe("immune")
  })

  it("returns null for normal effectiveness", () => {
    const ctx = makeCtx("Pelipper", {}, "Garchomp", {}, "Surf")
    expect(applyTypeGuards(ctx, 1)).toBeNull()
  })

  it("returns immune for Steel Roller when no terrain", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", {}, "Steel Roller")
    expect(applyTypeGuards(ctx, 1)?.type).toBe("immune")
  })

  it("passes Steel Roller when terrain is active", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", {}, "Steel Roller", {}, { terrain: "Grassy" })
    expect(applyTypeGuards(ctx, 1)).toBeNull()
  })

  it("returns immune for Poltergeist when defender has no item", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", { item: "" }, "Poltergeist")
    expect(applyTypeGuards(ctx, 1)?.type).toBe("immune")
  })

  it("passes Poltergeist when defender holds an item", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", { item: "Rocky Helmet" }, "Poltergeist")
    expect(applyTypeGuards(ctx, 1)).toBeNull()
  })

  it("returns immune for Grass move vs Sap Sipper and sets description", () => {
    const ctx = makeCtx("Pelipper", {}, "Goodra", { ability: "Sap Sipper" }, "Energy Ball")

    const result = applyTypeGuards(ctx, 1)

    expect(result?.type).toBe("immune")
    expect(ctx.description.defenderAbility).toBe("Sap Sipper")
  })

  it("returns immune for Fire move vs Flash Fire", () => {
    const ctx = makeCtx("Pelipper", {}, "Arcanine", { ability: "Flash Fire" }, "Flamethrower")
    expect(applyTypeGuards(ctx, 1)?.type).toBe("immune")
  })

  it("returns immune for Water move vs Water Absorb", () => {
    const ctx = makeCtx("Pelipper", {}, "Vaporeon", { ability: "Water Absorb" }, "Surf")
    expect(applyTypeGuards(ctx, 1)?.type).toBe("immune")
  })

  it("returns immune for Electric move vs Volt Absorb", () => {
    const ctx = makeCtx("Pelipper", {}, "Jolteon", { ability: "Volt Absorb" }, "Thunderbolt")
    expect(applyTypeGuards(ctx, 1)?.type).toBe("immune")
  })

  it("returns immune for Ground move vs Levitate (not gravity, no Iron Ball)", () => {
    const ctx = makeCtx("Garchomp", {}, "Chimecho", { ability: "Levitate" }, "Earthquake")
    expect(applyTypeGuards(ctx, 1)?.type).toBe("immune")
  })

  it("Levitate does not block Ground move in Gravity", () => {
    const ctx = makeCtx("Garchomp", {}, "Chimecho", { ability: "Levitate" }, "Earthquake", {}, { isGravity: true })
    expect(applyTypeGuards(ctx, 1)).toBeNull()
  })

  it("returns immune for bullet move vs Bulletproof", () => {
    const ctx = makeCtx("Pelipper", {}, "Chesnaught", { ability: "Bulletproof" }, "Aura Sphere")
    expect(applyTypeGuards(ctx, 1)?.type).toBe("immune")
  })

  it("returns immune for sound move vs Soundproof", () => {
    const ctx = makeCtx("Pelipper", {}, "Orthworm", { ability: "Soundproof" }, "Hyper Voice")
    expect(applyTypeGuards(ctx, 1)?.type).toBe("immune")
  })

  it("Clangorous Soul is a sound move that bypasses Soundproof check (is Status anyway)", () => {
    const ctx = makeCtx("Pelipper", {}, "Orthworm", { ability: "Soundproof" }, "Clangorous Soul")
    expect(applyTypeGuards(ctx, 1)).toBeNull()
  })

  it("returns immune for priority move vs Queenly Majesty", () => {
    const ctx = makeCtx("Pelipper", {}, "Tsareena", { ability: "Queenly Majesty" }, "Quick Attack", { priority: 1 })
    expect(applyTypeGuards(ctx, 1)?.type).toBe("immune")
  })

  it("returns immune for priority move vs Armor Tail", () => {
    const ctx = makeCtx("Pelipper", {}, "Farigiraf", { ability: "Armor Tail" }, "Quick Attack", { priority: 1 })
    expect(applyTypeGuards(ctx, 1)?.type).toBe("immune")
  })

  it("returns immune for Ground move vs Earth Eater", () => {
    const ctx = makeCtx("Garchomp", {}, "Orthworm", { ability: "Earth Eater" }, "Earthquake")
    expect(applyTypeGuards(ctx, 1)?.type).toBe("immune")
  })

  it("returns immune for priority move in Psychic Terrain vs grounded defender", () => {
    const ctx = makeCtx("Pelipper", {}, "Garchomp", {}, "Quick Attack", { priority: 1 }, { terrain: "Psychic" })

    const result = applyTypeGuards(ctx, 1)

    expect(result?.type).toBe("immune")
    expect(ctx.description.terrain).toBe("Psychic")
  })

  it("does not block priority move in Psychic Terrain vs Flying defender", () => {
    const ctx = makeCtx("Pelipper", {}, "Pelipper", {}, "Quick Attack", { priority: 1 }, { terrain: "Psychic" })
    expect(applyTypeGuards(ctx, 1)).toBeNull()
  })
})

describe("applyFixedDamageGuards", () => {
  it("Seismic Toss deals attacker level as damage", () => {
    const ctx = makeCtx("Pelipper", {}, "Garchomp", {}, "Seismic Toss")

    const result = applyFixedDamageGuards(ctx)

    expect(result?.type).toBe("damage")
    expect((result as { type: "damage"; value: number }).value).toBe(50)
  })

  it("Night Shade deals attacker level as damage", () => {
    const ctx = makeCtx("Gengar", {}, "Garchomp", {}, "Night Shade")

    const result = applyFixedDamageGuards(ctx)

    expect(result?.type).toBe("damage")
    expect((result as { type: "damage"; value: number }).value).toBe(50)
  })

  it("Dragon Rage always deals 40 damage", () => {
    const ctx = makeCtx("Dragonite", {}, "Garchomp", {}, "Dragon Rage")

    const result = applyFixedDamageGuards(ctx)

    expect(result?.type).toBe("damage")
    expect((result as { type: "damage"; value: number }).value).toBe(40)
  })

  it("Sonic Boom always deals 20 damage", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", {}, "Sonic Boom")

    const result = applyFixedDamageGuards(ctx)

    expect(result?.type).toBe("damage")
    expect((result as { type: "damage"; value: number }).value).toBe(20)
  })

  it("Seismic Toss with Parental Bond deals double fixed damage as array", () => {
    const ctx = makeCtx("Kangaskhan", { ability: "Parental Bond" }, "Garchomp", {}, "Seismic Toss")

    const result = applyFixedDamageGuards(ctx)

    expect(result?.type).toBe("damage")
    expect((result as { type: "damage"; value: number[] }).value).toEqual([50, 50])
  })

  it("Super Fang deals half defender curHP at full HP", () => {
    const ctx = makeCtx("Garchomp", {}, "Garchomp", {}, "Super Fang")
    const fullHP = ctx.defender.currrentHp()

    const result = applyFixedDamageGuards(ctx)

    expect(result?.type).toBe("damage")
    expect((result as { type: "damage"; value: number }).value).toBe(Math.floor(fullHP / 2))
  })

  it("Final Gambit deals attacker curHP at full HP", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", {}, "Final Gambit")
    const fullHP = ctx.attacker.currrentHp()

    const result = applyFixedDamageGuards(ctx)

    expect(result?.type).toBe("damage")
    expect((result as { type: "damage"; value: number }).value).toBe(fullHP)
  })

  it("Endeavor deals defender HP minus attacker HP when attacker is at lower HP", () => {
    const ctx = makeCtx("Garchomp", { curHP: 50 }, "Pelipper", {}, "Endeavor")
    const defHP = ctx.defender.currrentHp()
    const atkHP = ctx.attacker.currrentHp()

    const result = applyFixedDamageGuards(ctx)

    expect(result?.type).toBe("damage")
    expect((result as { type: "damage"; value: number }).value).toBe(defHP - atkHP)
  })

  it("returns null for ordinary moves", () => {
    const ctx = makeCtx("Pelipper", {}, "Garchomp", {}, "Surf")
    expect(applyFixedDamageGuards(ctx)).toBeNull()
  })
})

describe("computeMoveType", () => {
  it("returns original type for ordinary moves", () => {
    const ctx = makeCtx("Pelipper", {}, "Garchomp", {}, "Surf")

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Water")
  })

  it("Weather Ball becomes Fire in Sun", () => {
    const ctx = makeCtx("Pelipper", {}, "Garchomp", {}, "Weather Ball", {}, { weather: "Sun" })

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Fire")
  })

  it("Weather Ball becomes Water in Rain", () => {
    const ctx = makeCtx("Pelipper", {}, "Garchomp", {}, "Weather Ball", {}, { weather: "Rain" })

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Water")
  })

  it("Weather Ball stays Normal with no weather", () => {
    const ctx = makeCtx("Pelipper", {}, "Garchomp", {}, "Weather Ball")

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Normal")
  })

  it("Weather Ball becomes Rock in Sand", () => {
    const ctx = makeCtx("Pelipper", {}, "Garchomp", {}, "Weather Ball", {}, { weather: "Sand" })

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Rock")
  })

  it("Weather Ball becomes Ice in Hail", () => {
    const ctx = makeCtx("Pelipper", {}, "Garchomp", {}, "Weather Ball", {}, { weather: "Hail" })

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Ice")
  })

  it("Weather Ball becomes Ice in Snow", () => {
    const ctx = makeCtx("Pelipper", {}, "Garchomp", {}, "Weather Ball", {}, { weather: "Snow" })

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Ice")
  })

  it("Weather Ball becomes Fire for a Mega Sol attacker even without weather, crediting the ability", () => {
    const ctx = makeCtx("Torkoal", { ability: "Mega Sol" }, "Garchomp", {}, "Weather Ball")

    computeMoveType(ctx)

    expect(ctx.description.attackerAbility).toBe("Mega Sol")
    expect(ctx.description.weather).toBeUndefined()
  })

  it("records the weather in the description for a non-Mega Sol Weather Ball user", () => {
    const ctx = makeCtx("Pelipper", {}, "Garchomp", {}, "Weather Ball", {}, { weather: "Sun" })

    computeMoveType(ctx)

    expect(ctx.description.weather).toBe("Sun")
    expect(ctx.description.attackerAbility).toBeUndefined()
  })

  it("Aerilate changes Normal move to Flying", () => {
    const ctx = makeCtx("Sylveon", { ability: "Aerilate" }, "Garchomp", {}, "Body Slam")

    const { type, hasAteAbilityTypeChange } = computeMoveType(ctx)

    expect(type).toBe("Flying")
    expect(hasAteAbilityTypeChange).toBe(true)
  })

  it("Pixilate changes Normal move to Fairy", () => {
    const ctx = makeCtx("Sylveon", { ability: "Pixilate" }, "Garchomp", {}, "Hyper Voice")

    const { type, hasAteAbilityTypeChange } = computeMoveType(ctx)

    expect(type).toBe("Fairy")
    expect(hasAteAbilityTypeChange).toBe(true)
  })

  it("Liquid Voice changes sound move to Water", () => {
    const ctx = makeCtx("Sylveon", { ability: "Liquid Voice" }, "Garchomp", {}, "Hyper Voice")

    const { type, hasAteAbilityTypeChange } = computeMoveType(ctx)

    expect(type).toBe("Water")
    expect(hasAteAbilityTypeChange).toBe(false)
  })

  it("Refrigerate changes Normal move to Ice", () => {
    const ctx = makeCtx("Sylveon", { ability: "Refrigerate" }, "Garchomp", {}, "Body Slam")

    const { type, hasAteAbilityTypeChange } = computeMoveType(ctx)

    expect(type).toBe("Ice")
    expect(hasAteAbilityTypeChange).toBe(true)
  })

  it("Galvanize changes Normal move to Electric", () => {
    const ctx = makeCtx("Sylveon", { ability: "Galvanize" }, "Garchomp", {}, "Body Slam")

    const { type, hasAteAbilityTypeChange } = computeMoveType(ctx)

    expect(type).toBe("Electric")
    expect(hasAteAbilityTypeChange).toBe(true)
  })

  it("Normalize changes any move's type to Normal regardless of its original type", () => {
    const ctx = makeCtx("Sylveon", { ability: "Normalize" as never }, "Garchomp", {}, "Surf")

    const { type, hasAteAbilityTypeChange } = computeMoveType(ctx)

    expect(type).toBe("Normal")
    expect(hasAteAbilityTypeChange).toBe(true)
  })

  it("Dragonize changes Normal move to Dragon", () => {
    const ctx = makeCtx("Feraligatr-Mega", {}, "Garchomp", {}, "Body Slam")

    const { type, hasAteAbilityTypeChange } = computeMoveType(ctx)

    expect(type).toBe("Dragon")
    expect(hasAteAbilityTypeChange).toBe(true)
  })

  it("does not change the type for an Ate ability when the move is not already Normal-type", () => {
    const ctx = makeCtx("Sylveon", { ability: "Aerilate" }, "Garchomp", {}, "Surf")

    const { type, hasAteAbilityTypeChange } = computeMoveType(ctx)

    expect(type).toBe("Water")
    expect(hasAteAbilityTypeChange).toBe(false)
  })

  it("Terrain Pulse becomes Electric on Electric Terrain when grounded", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", {}, "Terrain Pulse", {}, { terrain: "Electric" })

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Electric")
  })

  it("Terrain Pulse becomes Grass on Grassy Terrain when grounded", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", {}, "Terrain Pulse", {}, { terrain: "Grassy" })

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Grass")
  })

  it("Terrain Pulse becomes Fairy on Misty Terrain when grounded", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", {}, "Terrain Pulse", {}, { terrain: "Misty" })

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Fairy")
  })

  it("Terrain Pulse becomes Psychic on Psychic Terrain when grounded", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", {}, "Terrain Pulse", {}, { terrain: "Psychic" })

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Psychic")
  })

  it("Terrain Pulse stays Normal when grounded with no terrain", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", {}, "Terrain Pulse")

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Normal")
  })

  it("Terrain Pulse keeps its original type when the attacker is airborne", () => {
    const ctx = makeCtx("Corviknight", {}, "Pelipper", {}, "Terrain Pulse", {}, { terrain: "Electric" })

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Normal")
  })

  it("records the moveType in the description when the defender is Dark-type", () => {
    const ctx = makeCtx("Garchomp", {}, "Umbreon", {}, "Terrain Pulse", {}, { terrain: "Electric" })

    computeMoveType(ctx)

    expect(ctx.description.moveType).toBe("Electric")
  })

  it("records the moveType in the description when the defender is grounded on Psychic Terrain", () => {
    const ctx = makeCtx("Garchomp", {}, "Blastoise", {}, "Terrain Pulse", {}, { terrain: "Psychic" })

    computeMoveType(ctx)

    expect(ctx.description.moveType).toBe("Psychic")
  })

  it("does not record the moveType in the description for a non-Dark defender off Psychic Terrain", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", {}, "Terrain Pulse", {}, { terrain: "Electric" })

    computeMoveType(ctx)

    expect(ctx.description.moveType).toBeUndefined()
  })

  it("Aura Wheel becomes Electric for Morpeko", () => {
    const ctx = makeCtx("Morpeko", {}, "Pelipper", {}, "Aura Wheel")

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Electric")
  })

  it("Aura Wheel becomes Dark for Morpeko-Hangry", () => {
    const ctx = makeCtx("Morpeko-Hangry", {}, "Pelipper", {}, "Aura Wheel")

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Dark")
  })

  it("Aura Wheel keeps its original type for a non-Morpeko user", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", {}, "Aura Wheel")

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Electric")
  })

  it("Raging Bull becomes Fighting for Tauros-Paldea-Combat", () => {
    const ctx = makeCtx("Tauros-Paldea-Combat", {}, "Pelipper", {}, "Raging Bull")

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Fighting")
  })

  it("Raging Bull becomes Fire for Tauros-Paldea-Blaze", () => {
    const ctx = makeCtx("Tauros-Paldea-Blaze", {}, "Pelipper", {}, "Raging Bull")

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Fire")
  })

  it("Raging Bull becomes Water for Tauros-Paldea-Aqua", () => {
    const ctx = makeCtx("Tauros-Paldea-Aqua", {}, "Pelipper", {}, "Raging Bull")

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Water")
  })

  it("Raging Bull keeps its original type for a non-Tauros-Paldea user", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", {}, "Raging Bull")

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Normal")
  })

  it("Ivy Cudgel becomes Grass for base Ogerpon", () => {
    const ctx = makeCtx("Ogerpon", {}, "Pelipper", {}, "Ivy Cudgel")

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Grass")
  })

  it("Ivy Cudgel becomes Grass for Ogerpon-Teal-Tera", () => {
    const ctx = makeCtx("Ogerpon-Teal-Tera", {}, "Pelipper", {}, "Ivy Cudgel")

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Grass")
  })

  it("Ivy Cudgel becomes Rock for Ogerpon-Cornerstone", () => {
    const ctx = makeCtx("Ogerpon-Cornerstone", {}, "Pelipper", {}, "Ivy Cudgel")

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Rock")
  })

  it("Ivy Cudgel becomes Fire for Ogerpon-Hearthflame", () => {
    const ctx = makeCtx("Ogerpon-Hearthflame", {}, "Pelipper", {}, "Ivy Cudgel")

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Fire")
  })

  it("Ivy Cudgel becomes Water for Ogerpon-Wellspring", () => {
    const ctx = makeCtx("Ogerpon-Wellspring", {}, "Pelipper", {}, "Ivy Cudgel")

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Water")
  })

  it("Ivy Cudgel keeps its original type for a non-Ogerpon user", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", {}, "Ivy Cudgel")

    const { type } = computeMoveType(ctx)

    expect(type).toBe("Grass")
  })

  it("Raging Bull clears screens on the defender side", () => {
    const ctx = makeCtx("Garchomp", { name: "Tauros-Paldea-Combat" } as never, "Pelipper", {}, "Raging Bull", {}, { defenderSide: { isReflect: true, isLightScreen: true } })

    computeMoveType(ctx)

    expect(ctx.field.defenderSide.isReflect).toBe(false)
    expect(ctx.field.defenderSide.isLightScreen).toBe(false)
  })

  it("Psychic Fangs clears screens on the defender side", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", {}, "Psychic Fangs", {}, { defenderSide: { isReflect: true, isAuroraVeil: true } })

    computeMoveType(ctx)

    expect(ctx.field.defenderSide.isReflect).toBe(false)
    expect(ctx.field.defenderSide.isAuroraVeil).toBe(false)
  })
})

describe("computeTypeEffectiveness", () => {
  it("returns 2 for super-effective single type", () => {
    const ctx = makeCtx("Pelipper", {}, "Charizard", {}, "Surf")
    expect(computeTypeEffectiveness(ctx)).toBe(2)
  })

  it("returns 0.5 for not very effective", () => {
    const ctx = makeCtx("Pelipper", {}, "Blastoise", {}, "Surf")
    expect(computeTypeEffectiveness(ctx)).toBe(0.5)
  })

  it("returns 0 for type immune", () => {
    const ctx = makeCtx("Pelipper", {}, "Pelipper", {}, "Earthquake")
    expect(computeTypeEffectiveness(ctx)).toBe(0)
  })

  it("returns 4 for double super-effective (Water vs Fire/Rock)", () => {
    const ctx = makeCtx("Pelipper", {}, "Charizard", {}, "Hydro Pump")
    expect(computeTypeEffectiveness(ctx)).toBe(2)
  })

  it("Scrappy allows Normal to hit Ghost", () => {
    const ctx = makeCtx("Kangaskhan", { ability: "Scrappy" }, "Gengar", {}, "Body Slam")
    expect(computeTypeEffectiveness(ctx)).toBe(1)
  })

  it("Tera Shell halves a super-effective hit at full HP with no hazards", () => {
    const ctx = makeCtx("Garchomp", {}, "Terapagos-Terastal", { ability: "Tera Shell" }, "Close Combat")

    const effectiveness = computeTypeEffectiveness(ctx)

    expect(effectiveness).toBe(0.5)
    expect(ctx.description.defenderAbility).toBe("Tera Shell")
  })

  it("Tera Shell does not activate when the defender is not at full HP", () => {
    const ctx = makeCtx("Garchomp", {}, "Terapagos-Terastal", { ability: "Tera Shell", curHP: 1 }, "Close Combat")

    expect(computeTypeEffectiveness(ctx)).toBe(2)
  })

  it("Tera Shell does not activate when Stealth Rock is up and the defender has no Heavy-Duty Boots", () => {
    const ctx = makeCtx("Garchomp", {}, "Terapagos-Terastal", { ability: "Tera Shell" }, "Close Combat", {}, { defenderSide: { isSR: true } })

    expect(computeTypeEffectiveness(ctx)).toBe(2)
  })

  it("Tera Shell activates when Stealth Rock is up but the defender holds Heavy-Duty Boots", () => {
    const ctx = makeCtx("Garchomp", {}, "Terapagos-Terastal", { ability: "Tera Shell", item: "Heavy-Duty Boots" }, "Close Combat", {}, { defenderSide: { isSR: true } })

    expect(computeTypeEffectiveness(ctx)).toBe(0.5)
  })

  it("Tera Shell does not activate when Spikes are up and the defender is not Flying-type", () => {
    const ctx = makeCtx("Garchomp", {}, "Terapagos-Terastal", { ability: "Tera Shell" }, "Close Combat", {}, { defenderSide: { spikes: 1 } })

    expect(computeTypeEffectiveness(ctx)).toBe(2)
  })

  it("Tera Shell still activates under Spikes when the defender is Flying-type", () => {
    const ctx = makeCtx("Garchomp", {}, "Pelipper", { ability: "Tera Shell" }, "Thunderbolt", {}, { defenderSide: { spikes: 1 } })

    expect(computeTypeEffectiveness(ctx)).toBe(0.5)
  })
})
