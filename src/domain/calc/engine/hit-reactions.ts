import { DefensiveBoosts, dropTargetStat, initialDefensiveBoosts } from "@calc/engine/defensive-boost-ladder"
import { knocksOffItem } from "@calc/engine/modifiers"
import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { DamageDistribution } from "@calc/model/damage-distribution"
import { Pokemon } from "@calc/model/pokemon"
import { Damage } from "@calc/model/result"
import { AbilityName } from "@data/types"

export type AttackerReaction = { spe: number; ability: AbilityName | undefined }

export type HitReaction = { defender: DefensiveBoosts; attacker: AttackerReaction }

export function dealsDamage(damage: Damage): boolean {
  return new DamageDistribution(damage).max() > 0
}

export function defenderReactsToHit(attacker: Pokemon, defender: Pokemon, move: Move, damage: Damage): boolean {
  if (!dealsDamage(damage)) return false

  return (
    weakensArmor(defender, move) ||
    compactsWater(defender, move) ||
    eatenBerryStat(defender, move) !== undefined ||
    (defender.hasItem("Luminous Moss") && move.hasType("Water")) ||
    knocksOff(defender, move) ||
    defender.hasAbility("Seed Sower", "Sand Spit") ||
    swapsAbilityOnContact(defender, move) ||
    (slowsOnContact(attacker, defender, move) && move.named("Gyro Ball"))
  )
}

export function reactToHit(attacker: Pokemon, defender: Pokemon, move: Move, state: HitReaction, lands: boolean): HitReaction {
  if (!lands) return state

  const next = { ...state.defender, damaged: true }
  const nextAttacker = { ...state.attacker }
  const holdsItem = !next.itemLost

  if (weakensArmor(defender, move)) {
    next.def = dropTargetStat(defender, 1, next.def)
    next.spe = dropTargetStat(defender, -2, next.spe)
  }

  if (compactsWater(defender, move)) {
    next.def = dropTargetStat(defender, -2, next.def)
  }

  if (holdsItem && defender.hasItem("Luminous Moss") && move.hasType("Water")) {
    next.spd = dropTargetStat(defender, -1, next.spd)
    next.itemLost = true
  }

  if (holdsItem && knocksOff(defender, move)) {
    next.itemLost = true
  }

  if (defender.hasAbility("Seed Sower")) {
    next.terrain = "Grassy"
  }

  if (defender.hasAbility("Sand Spit")) {
    next.weather = "Sand"
  }

  if (swapsAbilityOnContact(defender, move)) {
    nextAttacker.ability = defender.ability

    if (defender.hasAbility("Wandering Spirit")) {
      next.ability = attacker.ability
    }
  }

  if (slowsOnContact(attacker, defender, move)) {
    nextAttacker.spe = dropTargetStat(attacker, 1, nextAttacker.spe)
  }

  return { defender: next, attacker: nextAttacker }
}

export function reactAfterMove(defender: Pokemon, move: Move, state: DefensiveBoosts, landed: boolean): DefensiveBoosts {
  const berryStat = eatenBerryStat(defender, move)

  if (!landed || state.itemLost || !berryStat) return state

  return { ...state, [berryStat]: dropTargetStat(defender, -1, state[berryStat]), itemLost: true }
}

export function afterHits(hits: { attacker: Pokemon; move: Move; damage: Damage }[], defender: Pokemon, field: Field): { defender: Pokemon; field: Field } {
  let currentDefender = defender
  let currentField = field

  for (const { attacker, move, damage } of hits) {
    const reaction = reactToHit(attacker, currentDefender, move, { defender: initialDefensiveBoosts(currentDefender), attacker: { spe: 0, ability: attacker.ability } }, dealsDamage(damage))

    currentDefender = withDefenderState(currentDefender, reactAfterMove(currentDefender, move, reaction.defender, dealsDamage(damage)))
    currentField = withFieldState(currentField, reaction.defender)
  }

  return { defender: currentDefender, field: currentField }
}

export function withDefenderState(defender: Pokemon, state: DefensiveBoosts): Pokemon {
  if (!state.itemLost && state.ability === undefined) return defender

  const next = defender.clone()

  if (state.itemLost) {
    next.item = undefined
  }

  if (state.ability !== undefined) {
    next.ability = state.ability
  }

  return next
}

export function withFieldState(field: Field, state: DefensiveBoosts): Field {
  if (state.terrain === undefined && state.weather === undefined) return field

  const next = field.clone()
  next.terrain = state.terrain ?? next.terrain
  next.weather = state.weather ?? next.weather

  return next
}

function weakensArmor(defender: Pokemon, move: Move): boolean {
  return defender.hasAbility("Weak Armor") && move.category === "Physical"
}

function compactsWater(defender: Pokemon, move: Move): boolean {
  return defender.hasAbility("Water Compaction") && move.hasType("Water")
}

function eatenBerryStat(defender: Pokemon, move: Move): "def" | "spd" | undefined {
  if (defender.hasItem("Kee Berry") && move.category === "Physical") return "def"
  if (defender.hasItem("Maranga Berry") && move.category === "Special") return "spd"

  return undefined
}

function knocksOff(defender: Pokemon, move: Move): boolean {
  return move.named("Knock Off") && knocksOffItem(defender)
}

function swapsAbilityOnContact(defender: Pokemon, move: Move): boolean {
  return !!move.flags.contact && defender.hasAbility("Mummy", "Lingering Aroma", "Wandering Spirit")
}

function slowsOnContact(attacker: Pokemon, defender: Pokemon, move: Move): boolean {
  return !!move.flags.contact && defender.hasAbility("Gooey", "Tangling Hair") && !attacker.hasAbility("Clear Body", "White Smoke", "Full Metal Body", "Mirror Armor") && !attacker.hasItem("Clear Amulet")
}
