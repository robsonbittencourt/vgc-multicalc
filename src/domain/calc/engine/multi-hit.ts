import { getStabMod, getStellarStabMod } from "@calc/engine/stats"
import { applyAfterMove, checkMultihitBoost } from "@calc/engine/pre-damage-effects"
import { HitContext, computeHitDamage } from "@calc/engine/hit-damage"
import { statsChangeBetweenUses } from "@calc/engine/self-stat-change"
import { naturalTypeEffectiveness, teraShellEffectiveness } from "@calc/engine/guards"
import { FIRST_HIT_ONLY_ABILITIES } from "@calc/engine/target-hp"

export function computeMultiHitDamage(ctx: HitContext, firstHitDamage: number[], stabMod: number, hasAteAbilityTypeChange: boolean, hitsTwicePerUse: boolean, fullHpRows: (number[] | undefined)[]): number[][] {
  const { attacker, defender, move, field, description } = ctx

  const origDefBoost = description.defenseBoost
  const origAtkBoost = description.attackBoost

  const overTurns = move.timesUsed > 1
  const hitsPerUse = hitsTwicePerUse ? 2 : 1
  const numAttacks = (overTurns ? move.timesUsed : move.hits) * hitsPerUse
  const childCtx = hitsTwicePerUse ? { ...ctx, move: move.parentalBondChild() } : ctx
  if (overTurns) description.moveTurns = `over ${move.timesUsed} turns${statsChangeBetweenUses(attacker, defender, move, field) ? " (stat changes considered)" : ""}`
  if (hitsTwicePerUse) description.attackerAbility = attacker.ability

  const metronomeUses = move.timesUsedWithMetronome
  const countsMetronomeUses = overTurns && attacker.hasItem("Metronome")
  let usedItems = [false, false]
  const damageMatrix = [firstHitDamage]
  const tracksFullHp = overTurns && defender.hasAbility(...FIRST_HIT_ONLY_ABILITIES)
  const laterEffectiveness = tracksFullHp ? naturalTypeEffectiveness(ctx) : ctx.typeEffectiveness
  const fullHpEffectiveness = teraShellEffectiveness(defender, move, laterEffectiveness) ?? laterEffectiveness
  const laterCtx = { ...ctx, typeEffectiveness: laterEffectiveness }
  const laterChildCtx = { ...childCtx, typeEffectiveness: laterEffectiveness }

  for (let times = 1; times < numAttacks; times++) {
    usedItems = checkMultihitBoost(attacker, defender, move, field, description, usedItems[0], usedItems[1])

    if (overTurns && times % hitsPerUse === 0) {
      usedItems = applyAfterMove(attacker, defender, move, field, description, usedItems[0], usedItems[1])
    }

    const use = Math.floor(times / hitsPerUse)
    const ateStillActive = hasAteAbilityTypeChange && attacker.hasAbility("Aerilate", "Dragonize", "Galvanize", "Pixilate", "Refrigerate")
    const newStabMod = overTurns ? getStellarStabMod(attacker, move, getStabMod(attacker, move, description), use) : stabMod
    const isChild = times % hitsPerUse === 1
    const hitCtx = isChild ? (use === 0 ? childCtx : laterChildCtx) : laterCtx

    if (countsMetronomeUses) hitCtx.move.timesUsedWithMetronome = use

    const hitState = { hit: times + 1, hitCount: times, hasAteAbilityTypeChange: ateStillActive, stabMod: newStabMod }

    damageMatrix[times] = computeHitDamage(hitCtx, hitState)

    if (tracksFullHp) {
      fullHpRows[times] = computeHitDamage({ ...hitCtx, typeEffectiveness: fullHpEffectiveness }, { ...hitState, atFullHp: true })
    }
  }

  description.defenseBoost = origDefBoost
  description.attackBoost = origAtkBoost
  move.timesUsedWithMetronome = metronomeUses

  return damageMatrix
}
