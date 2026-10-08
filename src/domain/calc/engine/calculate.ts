import { getStatDescriptionText } from "@calc/engine/desc"
import { isStaminaActive } from "@calc/engine/defensive-boost-ladder"
import { dealsDamage, defenderReactsToHit } from "@calc/engine/hit-reactions"
import { ProgressiveDefensiveDamage } from "@calc/engine/progressive-defensive-damage"
import { DamageDistribution } from "@calc/model/damage-distribution"
import { Damage, Result } from "@calc/model/result"
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
import { FIRST_HIT_ONLY_ABILITIES } from "@calc/engine/target-hp"

export function calculateDamage(originalAttacker: Pokemon, originalDefender: Pokemon, originalMove: Move, originalField: Field, skipProgressiveDamage = false): Result {
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

  const basePower = getBasePower({ attacker, defender, move, field, description, hit: 1 })

  if (basePower === 0) return result

  applyGaleWings(attacker, move, description)

  if (attacker.teraType === "Stellar" && (move.named("Tera Blast") || move.isStellarFirstUse)) {
    description.isStellarFirstUse = attacker.name !== "Terapagos-Stellar" && move.named("Tera Blast") && move.isStellarFirstUse
    description.attackerTera = attacker.teraType
  }

  const stabMod = getStellarStabMod(attacker, move, getStabMod(attacker, move, description))
  const hitContext = buildHitContext({ attacker, defender, move, field, description }, typeEffectiveness)
  const fullHpRows: (number[] | undefined)[] = []
  result.damage = resolveDamage(hitContext, hasAteAbilityTypeChange, stabMod, fullHpRows)

  if (fullHpRows.length > 0) {
    result.damageRowsAtFullHp = (result.damage as number[][]).map((row, index) => fullHpRows[index] ?? row)
  }

  if (!skipProgressiveDamage) {
    attachDamageAfterFirstHit(result, originalAttacker, originalDefender, originalMove, originalField)
    attachProgressiveDefensiveDamage(result, originalAttacker, originalDefender, originalMove, originalField)
  }

  return result
}

function attachDamageAfterFirstHit(result: Result, attacker: Pokemon, defender: Pokemon, move: Move, field: Field): void {
  if (!defender.hasAbility(...FIRST_HIT_ONLY_ABILITIES) || defender.currentHp() !== defender.maxHp()) return

  const weakenedDefender = defender.clone()
  weakenedDefender.originalCurrentHp = defender.maxHp() - 1

  result.damageAfterFirstHit = calculateDamage(attacker, weakenedDefender, move, field, true).damage
}

const PROGRESSIVE_TURNS = 8

function attachProgressiveDefensiveDamage(result: Result, attacker: Pokemon, defender: Pokemon, move: Move, field: Field): void {
  if (move.timesUsed > 1 || !changesBetweenHits(result)) return

  const simulator = new ProgressiveDefensiveDamage(defender, [result], 1, [{ attacker, defender, move, field }])
  const rows = simulator.hitDamages(PROGRESSIVE_TURNS + 1)
  const fullHpRows = simulator.fullHpRows(PROGRESSIVE_TURNS + 1)
  const rowsPerHit = new DamageDistribution(result.damage).subArrays().length
  const perHit = (source: number[][], hit: number): Damage => (rowsPerHit === 1 ? source[hit * rowsPerHit] : source.slice(hit * rowsPerHit, (hit + 1) * rowsPerHit))
  const hits = Array.from({ length: PROGRESSIVE_TURNS }, (_, index) => index + 1)

  result.damagePerHit = hits.map(hit => perHit(rows, hit))

  if (fullHpRows.some((row, index) => row !== rows[index])) {
    result.damagePerHitAtFullHp = hits.map(hit => perHit(fullHpRows, hit))
  }
}

function changesBetweenHits(result: Result): boolean {
  const { attacker, defender, move } = result

  return (isStaminaActive(defender) && !attacker.hasAbility("Unaware")) || defenderReactsToHit(attacker, defender, move, result.damage) || halvesAtFullHp(defender, result.damage)
}

function halvesAtFullHp(defender: Pokemon, damage: Damage): boolean {
  return defender.hasAbility(...FIRST_HIT_ONLY_ABILITIES) && dealsDamage(damage)
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

  description.attackerTypes = overriddenTypesText(attacker)
  description.defenderTypes = overriddenTypesText(defender)

  return new Result(attacker, defender, move, field, 0, description)
}

function overriddenTypesText(pokemon: Pokemon): string | undefined {
  if (!pokemon.hasOverriddenTypes || pokemon.teraType) return undefined

  return pokemon.types.join("/")
}

function buildHitContext(combatants: { attacker: Pokemon; defender: Pokemon; move: Move; field: Field; description: RawDesc }, typeEffectiveness: number): HitContext {
  const { attacker, defender, move, field, description } = combatants

  const isCritical = isCriticalHit(attacker, defender, move)
  const hitsPhysical = move.hitsPhysical()
  const applyBurn = shouldApplyBurn(attacker, move)
  const protect = breaksProtect(attacker, move, field)

  description.isBurned = applyBurn

  if (protect) {
    description.isProtected = true
  }

  return { attacker, defender, move, field, description, isCritical, hitsPhysical, typeEffectiveness, applyBurn, protect }
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

function shouldApplyBurn(attacker: Pokemon, move: Move): boolean {
  return attacker.hasStatus("brn") && move.category === "Physical" && !attacker.hasAbility("Guts") && !move.named("Facade")
}

function breaksProtect(attacker: Pokemon, move: Move, field: Field): boolean {
  return field.defenderSide.isProtected && attacker.hasAbility("Unseen Fist", "Piercing Drill") && !!move.flags.contact
}
