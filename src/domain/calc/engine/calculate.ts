import { getStatDescriptionText } from "@calc/engine/desc"
import { Result } from "@calc/model/result"
import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { applyEarlyReturnGuards, applyFixedDamageGuards, applyTypeGuards, computeMoveType, computeTypeEffectiveness, GuardResult } from "@calc/engine/guards"
import { getBasePower } from "@calc/engine/base-power"
import { getStabMod, getStellarStabMod } from "@calc/engine/stats"
import { RawDesc } from "@data/types"
import { HitContext } from "@calc/engine/hit-damage"
import { prepareCombatants } from "@calc/engine/prepare-combatants"
import { resolveDamage } from "@calc/engine/resolve-damage"

export function calculateDamage(originalAttacker: Pokemon, originalDefender: Pokemon, originalMove: Move, originalField: Field): Result {
  const { attacker, defender, move, field } = prepareCombatants(originalAttacker, originalDefender, originalMove, originalField)

  const result = buildInitialResult(attacker, defender, move, field)
  const description = result.rawDesc
  const combatContext = { attacker, defender, move, field, description }

  if (applyGuardToResult(result, applyEarlyReturnGuards(combatContext))) return result

  const { hasAteAbilityTypeChange } = computeMoveType(combatContext)
  const typeEffectiveness = computeTypeEffectiveness(combatContext)

  if (applyGuardToResult(result, applyTypeGuards(combatContext, typeEffectiveness))) return result

  description.hpEVs = getStatDescriptionText(defender, "hp")

  if (applyGuardToResult(result, applyFixedDamageGuards(combatContext))) return result

  if (move.hits > 1) {
    description.hits = move.hits
  }

  const turnOrder = attacker.stats.spe > defender.stats.spe ? "first" : "last"
  const basePower = getBasePower({ attacker, defender, move, field, description, turnOrder, hit: 1 })

  if (basePower === 0) return result

  applyGaleWings(attacker, move, description)

  if (attacker.teraType === "Stellar" && (move.named("Tera Blast") || move.isStellarFirstUse)) {
    description.isStellarFirstUse = attacker.name !== "Terapagos-Stellar" && move.named("Tera Blast") && move.isStellarFirstUse
    description.attackerTera = attacker.teraType
  }

  const stabMod = getStellarStabMod(attacker, move, getStabMod(attacker, move, description))
  const hitContext = buildHitContext({ attacker, defender, move, field, description }, typeEffectiveness, turnOrder)
  result.damage = resolveDamage(hitContext, hasAteAbilityTypeChange, stabMod)

  attachDamageAfterFirstHit(result, originalAttacker, originalDefender, originalMove, originalField)

  return result
}

const FIRST_HIT_ONLY_ABILITIES = ["Multiscale", "Shadow Shield", "Tera Shell"]

function attachDamageAfterFirstHit(result: Result, attacker: Pokemon, defender: Pokemon, move: Move, field: Field): void {
  if (!defender.hasAbility(...FIRST_HIT_ONLY_ABILITIES) || defender.currentHp() !== defender.maxHp()) return

  const weakenedDefender = defender.clone()
  weakenedDefender.originalCurrentHp = defender.maxHp() - 1

  result.damageAfterFirstHit = calculateDamage(attacker, weakenedDefender, move, field).damage
}

function applyGuardToResult(result: Result, guard: GuardResult | null): boolean {
  if (guard?.type === "immune") {
    return true
  }

  if (guard?.type === "damage") {
    result.damage = guard.value as number | number[]

    return true
  }

  return false
}

function buildInitialResult(attacker: Pokemon, defender: Pokemon, move: Move, field: Field): Result {
  const description: RawDesc = {
    attackerName: attacker.name,
    moveName: move.name,
    defenderName: defender.name,
    isWonderRoom: field.isWonderRoom
  }

  if (defender.teraType && defender.teraType !== "Stellar") {
    description.defenderTera = defender.teraType
  }

  return new Result(attacker, defender, move, field, 0, description)
}

function buildHitContext(combatants: { attacker: Pokemon; defender: Pokemon; move: Move; field: Field; description: RawDesc }, typeEffectiveness: number, turnOrder: "first" | "last"): HitContext {
  const { attacker, defender, move, field, description } = combatants

  const isCritical = isCriticalHit(attacker, defender, move)
  const hitsPhysical = moveHitsPhysical(move)
  const applyBurn = shouldApplyBurn(attacker, move)
  const protect = breaksProtect(attacker, move, field)

  description.isBurned = applyBurn

  if (protect) {
    description.isProtected = true
  }

  return { attacker, defender, move, field, description, isCritical, turnOrder, hitsPhysical, typeEffectiveness, applyBurn, protect }
}

function applyGaleWings(attacker: Pokemon, move: Move, description: RawDesc): void {
  if (attacker.hasAbility("Gale Wings") && move.hasType("Flying") && attacker.currentHp() === attacker.maxHp()) {
    move.priority = 1
    description.attackerAbility = attacker.ability
  }
}

function isCriticalHit(attacker: Pokemon, defender: Pokemon, move: Move): boolean {
  return !defender.hasAbility("Battle Armor", "Shell Armor") && (move.isCrit || (attacker.hasAbility("Merciless") && defender.hasStatus("psn", "tox"))) && move.timesUsed === 1
}

function moveHitsPhysical(move: Move): boolean {
  return move.overrideDefensiveStat === "def" || move.category === "Physical"
}

function shouldApplyBurn(attacker: Pokemon, move: Move): boolean {
  return attacker.hasStatus("brn") && move.category === "Physical" && !attacker.hasAbility("Guts") && !move.named("Facade")
}

function breaksProtect(attacker: Pokemon, move: Move, field: Field): boolean {
  return field.defenderSide.isProtected && attacker.hasAbility("Unseen Fist", "Piercing Drill") && !!move.flags.contact
}
