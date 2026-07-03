import { getStatDescriptionText } from "@lib/calc/engine/desc"
import { chainMods, getBaseDamage, getFinalDamage, overflow16, overflow32, pokeRound } from "@lib/calc/engine/math"
import { Field } from "@lib/calc/model/field"
import { Move } from "@lib/calc/model/move"
import { Pokemon } from "@lib/calc/model/pokemon"
import { getBasePower } from "@lib/calc/engine/base-power"
import { getBpMods, getAtMods, getDfMods, getFinalMods } from "@lib/calc/engine/modifiers"
import { getModifiedStat } from "@lib/calc/engine/math"
import { RawDesc } from "@vgc-types/calc-types"

export interface HitContext {
  attacker: Pokemon
  defender: Pokemon
  move: Move
  field: Field
  description: RawDesc
  isCritical: boolean
  turnOrder: "first" | "last"
  hitsPhysical: boolean
  typeEffectiveness: number
  applyBurn: boolean
  protect: boolean
}

export interface HitState {
  hit: number
  hitCount: number
  hasAteAbilityTypeChange: boolean
  stabMod: number
}

export function computeHitDamage(ctx: HitContext, state: HitState): number[] {
  const { attacker, defender, move, field, description, isCritical, turnOrder, hitsPhysical, typeEffectiveness, applyBurn, protect } = ctx
  const { hit, hitCount, hasAteAbilityTypeChange, stabMod } = state

  const rawBasePower = getBasePower({ attacker, defender, move, field, description, turnOrder, hit })

  const attack = computeAttack(attacker, defender, move, field, description, isCritical)
  const defense = computeDefense(attacker, defender, move, field, description, isCritical, hitsPhysical)

  const modCtx = { attacker, defender, move, field, description, isCritical, turnOrder, hasAteAbilityTypeChange, basePower: rawBasePower, typeEffectiveness, hitCount, hit, hitsPhysical }

  const basePower = applyChain(rawBasePower, getBpMods(modCtx), 41, 2097152)
  const finalAttack = applyChain(attack, getAtMods(modCtx), 410, 131072)
  const finalDefense = applyChain(defense, getDfMods(modCtx), 410, 131072)

  const baseDamage = computeBaseDamage(attacker, defender, basePower, finalAttack, finalDefense, move, field, description, isCritical)
  const finalMod = chainMods(getFinalMods(modCtx), 41, 131072)

  const damage: number[] = []
  for (let i = 0; i < 16; i++) {
    damage[i] = getFinalDamage(baseDamage, i, typeEffectiveness, applyBurn, stabMod, finalMod, protect)
  }

  return damage
}

function applyChain(value: number, mods: number[], lowerBound: number, upperBound: number): number {
  return overflow16(Math.max(1, pokeRound((value * chainMods(mods, lowerBound, upperBound)) / 4096)))
}

function computeAttack(attacker: Pokemon, defender: Pokemon, move: Move, field: Field, description: RawDesc, isCritical: boolean): number {
  const attackSource = move.named("Foul Play") ? defender : attacker
  const attackStat = move.named("Body Press") ? (field.isWonderRoom ? "spd" : "def") : move.category === "Special" ? "spa" : "atk"

  description.attackEVs = move.named("Foul Play") ? getStatDescriptionText(attackSource, attackStat, field.defenderSide.isPowerTrick) : getStatDescriptionText(attackSource, attackStat, field.attackerSide.isPowerTrick, field.isWonderRoom)

  if (field.attackerSide.isPowerTrick) {
    if ((move.category === "Physical" && !move.named("Foul Play")) || move.named("Body Press")) {
      description.isPowerTrickAttacker = true
    }
  }

  const boosts = attackSource.boosts[attackStat]
  let attack: number

  if (boosts === 0 || (isCritical && boosts < 0)) {
    attack = attackSource.rawStats[attackStat]
  } else if (defender.hasAbility("Unaware")) {
    attack = attackSource.rawStats[attackStat]
    description.defenderAbility = defender.ability
  } else {
    attack = getModifiedStat(attackSource.rawStats[attackStat]!, boosts)
    description.attackBoost = boosts
  }

  if (attacker.hasAbility("Hustle") && move.category === "Physical") {
    attack = pokeRound((attack * 3) / 2)
    description.attackerAbility = attacker.ability
  }

  return attack
}

function computeDefense(attacker: Pokemon, defender: Pokemon, move: Move, field: Field, description: RawDesc, isCritical: boolean, hitsPhysical: boolean): number {
  const defenseStat = hitsPhysical ? "def" : "spd"
  description.defenseEVs = getStatDescriptionText(defender, defenseStat, field.defenderSide.isPowerTrick, field.isWonderRoom)

  if (field.defenderSide.isPowerTrick && field.isWonderRoom !== hitsPhysical) {
    description.isPowerTrickDefender = true
  }

  const boosts = defender.boosts[defenseStat]
  let defense: number

  if (boosts === 0 || (isCritical && boosts > 0) || move.ignoreDefensive) {
    defense = defender.rawStats[defenseStat]
  } else if (attacker.hasAbility("Unaware")) {
    defense = defender.rawStats[defenseStat]
    description.attackerAbility = attacker.ability
  } else {
    defense = getModifiedStat(defender.rawStats[defenseStat]!, boosts)
    description.defenseBoost = boosts
  }

  const isMegaSol = attacker.hasAbility("Mega Sol")
  if (!isMegaSol) {
    if (field.hasWeather("Sand") && defender.hasType("Rock") && !hitsPhysical) {
      defense = pokeRound((defense * 3) / 2)
      description.weather = field.weather
    }

    if (field.hasWeather("Snow") && defender.hasType("Ice") && hitsPhysical) {
      defense = pokeRound((defense * 3) / 2)
      description.weather = field.weather
    }
  }

  return defense
}

function computeBaseDamage(attacker: Pokemon, defender: Pokemon, basePower: number, attack: number, defense: number, move: Move, field: Field, description: RawDesc, isCritical: boolean): number {
  let baseDamage = getBaseDamage(attacker.level, basePower, attack, defense)
  const isSpread = field.gameType !== "Singles" && ["allAdjacent", "allAdjacentFoes"].includes(move.target)

  if (isSpread) {
    baseDamage = pokeRound(overflow32(baseDamage * 3072) / 4096)
  }

  if (move.isParentalBondChild) {
    baseDamage = pokeRound(overflow32(baseDamage * 1024) / 4096)
  }

  const isMegaSol = attacker.hasAbility("Mega Sol")

  if ((field.hasWeather("Sun") || isMegaSol) && move.named("Hydro Steam") && !attacker.hasItem("Utility Umbrella")) {
    baseDamage = pokeRound(overflow32(baseDamage * 6144) / 4096)
    if (isMegaSol) {
      description.attackerAbility = attacker.ability
    } else {
      description.weather = field.weather
    }
  } else if (!defender.hasItem("Utility Umbrella")) {
    if ((field.hasWeather("Sun") || isMegaSol) && move.hasType("Fire")) {
      baseDamage = pokeRound(overflow32(baseDamage * 6144) / 4096)
      if (isMegaSol) {
        description.attackerAbility = attacker.ability
      } else {
        description.weather = field.weather
      }
    } else if (field.hasWeather("Rain") && !isMegaSol && move.hasType("Water")) {
      baseDamage = pokeRound(overflow32(baseDamage * 6144) / 4096)
      description.weather = field.weather
    } else if ((field.hasWeather("Sun") || isMegaSol) && move.hasType("Water")) {
      baseDamage = pokeRound(overflow32(baseDamage * 2048) / 4096)
      if (isMegaSol) {
        description.attackerAbility = attacker.ability
      } else {
        description.weather = field.weather
      }
    } else if (field.hasWeather("Rain") && move.hasType("Fire")) {
      baseDamage = pokeRound(overflow32(baseDamage * 2048) / 4096)
      description.weather = field.weather
    }
  }

  if (isCritical) {
    baseDamage = Math.floor(overflow32(baseDamage * 1.5))
    description.isCritical = isCritical
  }

  return baseDamage
}
