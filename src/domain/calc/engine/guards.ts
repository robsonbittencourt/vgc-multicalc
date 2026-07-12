import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { isGrounded } from "@calc/engine/stats"
import { getMoveEffectiveness } from "@calc/engine/type-effectiveness"
import { MoveCategory, RawDesc, TypeName } from "@data/types"

export interface CombatContext {
  attacker: Pokemon
  defender: Pokemon
  move: Move
  field: Field
  description: RawDesc
}

export type GuardResult = { type: "damage"; value: number | number[] } | { type: "immune" } | { type: "continue"; moveType?: string; moveCategory?: MoveCategory }

export function applyEarlyReturnGuards(ctx: CombatContext): GuardResult | null {
  const { attacker, defender, move, field, description } = ctx

  if (move.named("Photon Geyser", "Light That Burns the Sky") || (move.named("Tera Blast") && attacker.teraType) || (move.named("Tera Starstorm") && attacker.teraType && attacker.named("Terapagos-Stellar"))) {
    move.category = attacker.stats.atk > attacker.stats.spa ? "Physical" : "Special"
  }

  if (move.category === "Status") {
    return { type: "immune" }
  }

  if (move.flags.punch && attacker.hasItem("Punching Glove")) {
    description.attackerItem = attacker.item
    move.flags.contact = 0
  }

  if (move.named("Shell Side Arm") && getShellSideArmCategory(attacker, defender, field.isWonderRoom) === "Physical") {
    move.category = "Physical"
    move.flags.contact = 1
  }

  const breaksProtect = move.breaksProtect || (attacker.hasAbility("Unseen Fist", "Piercing Drill") && !!move.flags.contact)

  if (field.defenderSide.isProtected && !breaksProtect) {
    description.isProtected = true
    return { type: "immune" }
  }

  if (move.named("Pain Split")) {
    const average = Math.floor((attacker.currrentHp() + defender.currrentHp()) / 2)
    const damage = Math.max(0, defender.currrentHp() - average)
    return { type: "damage", value: damage }
  }

  if (attacker.hasAbility("Mold Breaker") && isDefenderAbilityIgnored(defender)) {
    description.attackerAbility = attacker.ability
    defender.ability = undefined
  }

  return null
}

export function applyTypeGuards(ctx: CombatContext, typeEffectiveness: number): GuardResult | null {
  const { defender, move, field, description } = ctx

  if (typeEffectiveness === 0) {
    return { type: "immune" }
  }

  if ((move.named("Steel Roller") && !field.terrain) || (move.named("Poltergeist") && !defender.item)) {
    return { type: "immune" }
  }

  if (
    (defender.hasAbility("Wonder Guard") && typeEffectiveness <= 1) ||
    (move.hasType("Grass") && defender.hasAbility("Sap Sipper")) ||
    (move.hasType("Fire") && defender.hasAbility("Flash Fire", "Well-Baked Body")) ||
    (move.hasType("Water") && defender.hasAbility("Dry Skin", "Storm Drain", "Water Absorb")) ||
    (move.hasType("Electric") && defender.hasAbility("Lightning Rod", "Motor Drive", "Volt Absorb")) ||
    (move.hasType("Ground") && !field.isGravity && !defender.hasItem("Iron Ball") && defender.hasAbility("Levitate", "Eelevate")) ||
    (move.flags.bullet && defender.hasAbility("Bulletproof")) ||
    (move.flags.sound && !move.named("Clangorous Soul") && defender.hasAbility("Soundproof")) ||
    (move.priority > 0 && defender.hasAbility("Queenly Majesty", "Dazzling", "Armor Tail")) ||
    (move.hasType("Ground") && defender.hasAbility("Earth Eater")) ||
    (move.flags.wind && defender.hasAbility("Wind Rider"))
  ) {
    description.defenderAbility = defender.ability
    return { type: "immune" }
  }

  if (move.priority > 0 && field.hasTerrain("Psychic") && isGrounded(defender, field)) {
    description.terrain = field.terrain
    return { type: "immune" }
  }

  return null
}

export function applyFixedDamageGuards(ctx: CombatContext): GuardResult | null {
  const { attacker, defender, move, description } = ctx

  const fixedDamage = getFixedDamage(attacker, move)

  if (fixedDamage) {
    if (attacker.hasAbility("Parental Bond")) {
      description.attackerAbility = attacker.ability
      return { type: "damage", value: [fixedDamage, fixedDamage] }
    }

    return { type: "damage", value: fixedDamage }
  }

  if (move.named("Super Fang", "Ruination")) {
    return { type: "damage", value: Math.max(1, Math.floor(defender.currrentHp() / 2)) }
  }

  if (move.named("Final Gambit")) {
    return { type: "damage", value: attacker.currrentHp() }
  }

  if (move.named("Endeavor")) {
    return { type: "damage", value: Math.max(0, defender.currrentHp() - attacker.currrentHp()) }
  }

  return null
}

export function computeMoveType(ctx: CombatContext): { type: string; hasAteAbilityTypeChange: boolean } {
  const { attacker, defender, move, field, description } = ctx
  let type = move.type
  let hasAteAbilityTypeChange = false

  if (move.originalName === "Weather Ball") {
    const isMegaSol = attacker.hasAbility("Mega Sol")
    type = field.hasWeather("Sun", "Harsh Sunshine") || isMegaSol ? "Fire" : field.hasWeather("Rain", "Heavy Rain") ? "Water" : field.hasWeather("Sand") ? "Rock" : field.hasWeather("Hail", "Snow") ? "Ice" : "Normal"
    if (isMegaSol) {
      description.attackerAbility = attacker.ability
    } else {
      description.weather = field.weather
    }
    description.moveType = type as TypeName
  } else if (move.originalName === "Terrain Pulse" && isGrounded(attacker, field)) {
    type = field.hasTerrain("Electric") ? "Electric" : field.hasTerrain("Grassy") ? "Grass" : field.hasTerrain("Misty") ? "Fairy" : field.hasTerrain("Psychic") ? "Psychic" : "Normal"
    description.terrain = field.terrain

    if (!(move.named("Nature Power") && attacker.hasAbility("Prankster")) && (defender.types.includes("Dark" as TypeName) || (field.hasTerrain("Psychic") && isGrounded(defender, field)))) {
      description.moveType = type as TypeName
    }
  } else if (move.named("Aura Wheel")) {
    if (attacker.named("Morpeko")) type = "Electric"
    else if (attacker.named("Morpeko-Hangry")) type = "Dark"
  } else if (move.named("Raging Bull")) {
    if (attacker.named("Tauros-Paldea-Combat")) type = "Fighting"
    else if (attacker.named("Tauros-Paldea-Blaze")) type = "Fire"
    else if (attacker.named("Tauros-Paldea-Aqua")) type = "Water"
    field.defenderSide.isReflect = false
    field.defenderSide.isLightScreen = false
    field.defenderSide.isAuroraVeil = false
  } else if (move.named("Ivy Cudgel")) {
    if (attacker.named("Ogerpon") || attacker.name.includes("Ogerpon-Teal")) type = "Grass"
    else if (attacker.name.includes("Ogerpon-Cornerstone")) type = "Rock"
    else if (attacker.name.includes("Ogerpon-Hearthflame")) type = "Fire"
    else if (attacker.name.includes("Ogerpon-Wellspring")) type = "Water"
  } else if (move.named("Brick Break", "Psychic Fangs")) {
    field.defenderSide.isReflect = false
    field.defenderSide.isLightScreen = false
    field.defenderSide.isAuroraVeil = false
  }

  const noTypeChange = move.named("Revelation Dance", "Judgment", "Nature Power", "Techno Blast", "Multi-Attack", "Natural Gift", "Weather Ball", "Terrain Pulse", "Struggle") || (move.named("Tera Blast") && attacker.teraType)

  if (!noTypeChange) {
    const normal = type === "Normal"
    let isAteTypeChange = false

    if (attacker.hasAbility("Aerilate") && normal) {
      type = "Flying"
      isAteTypeChange = true
    } else if (attacker.hasAbility("Galvanize") && normal) {
      type = "Electric"
      isAteTypeChange = true
    } else if (attacker.hasAbility("Liquid Voice") && !!move.flags.sound) {
      type = "Water"
      description.attackerAbility = attacker.ability
    } else if (attacker.hasAbility("Pixilate") && normal) {
      type = "Fairy"
      isAteTypeChange = true
    } else if (attacker.hasAbility("Refrigerate") && normal) {
      type = "Ice"
      isAteTypeChange = true
    } else if (attacker.hasAbility("Normalize")) {
      type = "Normal"
      isAteTypeChange = true
    } else if (attacker.hasAbility("Dragonize") && normal) {
      type = "Dragon"
      isAteTypeChange = true
    }

    if (isAteTypeChange) {
      description.attackerAbility = attacker.ability
      hasAteAbilityTypeChange = true
    }
  }

  if (move.named("Tera Blast") && attacker.teraType) {
    type = attacker.teraType
  }

  move.type = type as TypeName

  return { type, hasAteAbilityTypeChange }
}

export function computeTypeEffectiveness(ctx: CombatContext): number {
  const { attacker, defender, move, field } = ctx
  const isGhostRevealed = attacker.hasAbility("Scrappy")

  const types = defender.teraType && defender.teraType !== "Stellar" ? [defender.teraType] : defender.types

  const isRingTarget = defender.hasItem("Ring Target") && !defender.hasAbility("Klutz")

  const e1 = getMoveEffectiveness(move, types[0], isGhostRevealed, field.isGravity, isRingTarget)
  const e2 = types[1] ? getMoveEffectiveness(move, types[1], isGhostRevealed, field.isGravity, isRingTarget) : 1

  let typeEffectiveness = e1 * e2

  if (typeEffectiveness === 0 && move.hasType("Ground") && defender.hasItem("Iron Ball") && !defender.hasAbility("Klutz")) {
    typeEffectiveness = 1
  }

  if (move.type === "Stellar") {
    typeEffectiveness = defender.teraType ? 2 : 1
  }

  if (defender.hasAbility("Tera Shell") && defender.currrentHp() === defender.maxHp() && ((!field.defenderSide.isSR && (!field.defenderSide.spikes || defender.hasType("Flying"))) || defender.hasItem("Heavy-Duty Boots"))) {
    ctx.description.defenderAbility = defender.ability
    return 0.5
  }

  return typeEffectiveness
}

function getShellSideArmCategory(attacker: Pokemon, defender: Pokemon, wonderRoom?: boolean): MoveCategory {
  let physicalDamage = attacker.stats.atk / defender.stats.def
  let specialDamage = attacker.stats.spa / defender.stats.spd

  if (wonderRoom) {
    physicalDamage = attacker.stats.atk / defender.stats.spd
    specialDamage = attacker.stats.spa / defender.stats.def
  }

  return physicalDamage > specialDamage ? "Physical" : "Special"
}

function getFixedDamage(attacker: Pokemon, move: Move): number {
  if (move.named("Seismic Toss", "Night Shade")) return attacker.level
  if (move.named("Dragon Rage")) return 40
  if (move.named("Sonic Boom")) return 20
  return 0
}

const MOLD_BREAKABLE_ABILITIES = new Set([
  "Armor Tail",
  "Aroma Veil",
  "Battle Armor",
  "Big Pecks",
  "Bulletproof",
  "Clear Body",
  "Contrary",
  "Damp",
  "Disguise",
  "Dry Skin",
  "Earth Eater",
  "Filter",
  "Flash Fire",
  "Flower Veil",
  "Friend Guard",
  "Fur Coat",
  "Heatproof",
  "Heavy Metal",
  "Hyper Cutter",
  "Illuminate",
  "Immunity",
  "Inner Focus",
  "Insomnia",
  "Keen Eye",
  "Leaf Guard",
  "Levitate",
  "Light Metal",
  "Lightning Rod",
  "Limber",
  "Magic Bounce",
  "Magma Armor",
  "Marvel Scale",
  "Mirror Armor",
  "Motor Drive",
  "Multiscale",
  "Oblivious",
  "Overcoat",
  "Own Tempo",
  "Purifying Salt",
  "Queenly Majesty",
  "Sand Veil",
  "Sap Sipper",
  "Shell Armor",
  "Shield Dust",
  "Snow Cloak",
  "Solid Rock",
  "Soundproof",
  "Sticky Hold",
  "Storm Drain",
  "Sturdy",
  "Sweet Veil",
  "Tangled Feet",
  "Telepathy",
  "Thick Fat",
  "Unaware",
  "Vital Spirit",
  "Volt Absorb",
  "Water Absorb",
  "Water Bubble",
  "Water Veil",
  "White Smoke"
])

function isDefenderAbilityIgnored(defender: Pokemon): boolean {
  return !!defender.ability && MOLD_BREAKABLE_ABILITIES.has(defender.ability)
}
