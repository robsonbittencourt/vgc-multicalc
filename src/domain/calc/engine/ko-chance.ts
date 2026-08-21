import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { Damage, DEFAULT_ROLL_INDEX } from "@calc/model/result"
import { RawDesc } from "@data/types"
import { computeDamageWithoutBerry, consumeBerryIfTriggered, getBerryRecovery } from "@calc/engine/berry"
import { getEndOfTurn, getHazards } from "@calc/engine/end-of-turn"
import { error, roundChance, serializeEndOfTurnTexts, serializeText } from "@calc/engine/description-text"

type KOChanceResult = { chance: number; berryConsumed: boolean; anyBerryConsumed: boolean; firstBerryTurn?: number }

type ComputeKOChanceParams = {
  damage: number[]
  hp: number
  eot: number
  hits: number
  timesUsed: number
  maxHP: number
  toxicCounter: number
  berryRecovery: number
  berryThreshold: number
  berryConsumed?: boolean
  damageWithoutBerry?: number[]
  damageAfterFirstHit?: number[]
}

type KOChanceTextContext = {
  hazardsTexts: string[]
  eotTexts: string[]
  berryText: string
  qualifier: string
}

type KOChanceTextParams = {
  chanceWithoutEot: number | undefined
  chanceWithEot: number | undefined
  n: number
  multipleTurns?: boolean
  berryRelevant?: boolean
  firstBerryTurn?: number
  anyBerryConsumed?: boolean
}

function formatKOChanceText(ctx: KOChanceTextContext, params: KOChanceTextParams) {
  const { hazardsTexts, eotTexts, berryText, qualifier } = ctx
  const { chanceWithoutEot, chanceWithEot, n, multipleTurns = false, berryRelevant = false, firstBerryTurn, anyBerryConsumed = false } = params

  const combinedTexts = hazardsTexts.concat(eotTexts)

  if (berryRelevant && berryText) {
    combinedTexts.push(berryText)
  }

  const hazardsText = hazardsTexts.length > 0 ? " after " + serializeText(hazardsTexts) : ""
  const afterText = combinedTexts.length > 0 ? " after " + serializeEndOfTurnTexts(combinedTexts) : ""
  const afterTextNoHazards = eotTexts.length > 0 || (berryRelevant && berryText) ? " after " + serializeEndOfTurnTexts(berryRelevant && berryText ? eotTexts.concat([berryText]) : eotTexts) : ""
  const KOTurnText = n === 1 ? "OHKO" : multipleTurns ? `KO in ${n} turns` : `${n}HKO`

  let text = qualifier
  let chance = undefined

  if (chanceWithoutEot === undefined || chanceWithEot === undefined) {
    text += `possible ${KOTurnText}${afterText}`
  } else if (chanceWithoutEot + chanceWithEot === 0) {
    chance = 0
    text += "not a KO"
  } else if (chanceWithoutEot === 1) {
    chance = chanceWithoutEot
    text = "guaranteed "
    text += `OHKO${hazardsText}`
  } else if (chanceWithoutEot > 0) {
    chance = chanceWithEot

    if (chanceWithEot === 1) {
      text += `${roundChance(chanceWithoutEot)}% chance to ${KOTurnText}${hazardsText} ` + `(guaranteed ${KOTurnText}${afterTextNoHazards})`
    } else if (chanceWithEot > chanceWithoutEot) {
      text += `${roundChance(chanceWithoutEot)}% chance to ${KOTurnText}${hazardsText} ` + `(${qualifier}${roundChance(chanceWithEot)}% chance to ` + `${KOTurnText}${afterTextNoHazards})`
    } else {
      text += `${roundChance(chanceWithoutEot)}% chance to ${KOTurnText}${hazardsText}`
    }
  } else {
    chance = chanceWithEot

    if (chanceWithEot === 1) {
      text = "guaranteed "
      text += `${KOTurnText}${afterText}`
    } else {
      text += `${roundChance(chanceWithEot)}% chance to ${KOTurnText}${afterText}`
    }
  }

  return { chance, n, text, berryConsumed: berryRelevant, anyBerryConsumed, firstBerryTurn }
}

export function getKOChance(attacker: Pokemon, defender: Pokemon, move: Move, field: Field, damageObj: Damage, rawDesc: RawDesc, damageObjAfterFirstHit?: Damage) {
  const [damage, approximate] = combine(damageObj)
  const damageAfterFirstHit = damageObjAfterFirstHit ? combine(damageObjAfterFirstHit)[0] : undefined

  if (isNaN(damage[0])) {
    error("damage[0] must be a number.")
  }

  if (damage[damage.length - 1] === 0) {
    error("damage[damage.length - 1] === 0.")
  }

  if (move.timesUsedWithMetronome === undefined) {
    move.timesUsedWithMetronome = 1
  }

  if (damage[0] >= defender.maxHp() && move.timesUsed === 1 && move.timesUsedWithMetronome === 1 && move.hits === 1) {
    return { chance: 1, n: 1, text: "guaranteed OHKO", berryConsumed: false }
  }

  const hazards = getHazards(defender, field.defenderSide)
  const eot = getEndOfTurn(attacker, defender, move, field)
  const toxicCounter = defender.hasStatus("tox") && !defender.hasAbility("Magic Guard", "Poison Heal") ? defender.toxicCounter : 0

  const qualifier = approximate ? "approx. " : ""

  const { recovery: berryRecovery, threshold: berryThreshold } = getBerryRecovery(attacker, defender, move, field)

  let berryText = ""

  if (berryRecovery > 0) {
    berryText = defender.item + " recovery"
  }

  const damageWithoutBerry = computeDamageWithoutBerry(damageObj, rawDesc, move, defender)

  const textContext: KOChanceTextContext = { hazardsTexts: hazards.texts, eotTexts: eot.texts, berryText, qualifier }
  const KOChance = (params: KOChanceTextParams) => formatKOChanceText(textContext, params)

  if (move.timesUsed === 1 && move.timesUsedWithMetronome === 1) {
    const hits = move.timesUsed
    let hasOHKOChance = false

    if (move.hits > 1 && hits === 1 && damageObj && Array.isArray(damageObj) && Array.isArray(damageObj[0])) {
      const damageMatrix = damageObj as number[][]

      if (damageMatrix.length > 1) {
        const res = computeMultiHitKOChance(damageMatrix, defender.currentHp() - hazards.damage, 0, defender.maxHp(), berryRecovery, berryThreshold)
        const resWithEot = computeMultiHitKOChance(damageMatrix, defender.currentHp() - hazards.damage, eot.damage, defender.maxHp(), berryRecovery, berryThreshold)

        if (res.chance + resWithEot.chance > 0) {
          return KOChance({
            chanceWithoutEot: res.chance,
            chanceWithEot: resWithEot.chance,
            n: 1,
            berryRelevant: res.berryConsumed || resWithEot.berryConsumed,
            firstBerryTurn: res.firstBerryTurn || resWithEot.firstBerryTurn,
            anyBerryConsumed: res.anyBerryConsumed || resWithEot.anyBerryConsumed
          })
        }

        hasOHKOChance = true
      }
    }

    if (!hasOHKOChance) {
      const res = computeKOChance({ damage, hp: defender.currentHp() - hazards.damage, eot: 0, hits, timesUsed: 1, maxHP: defender.maxHp(), toxicCounter: 0, berryRecovery, berryThreshold, damageWithoutBerry })
      const resWithEot = computeKOChance({ damage, hp: defender.currentHp() - hazards.damage, eot: eot.damage, hits, timesUsed: 1, maxHP: defender.maxHp(), toxicCounter, berryRecovery, berryThreshold, damageWithoutBerry })

      if (res.chance + resWithEot.chance > 0) {
        return KOChance({
          chanceWithoutEot: res.chance,
          chanceWithEot: resWithEot.chance,
          n: 1,
          berryRelevant: res.berryConsumed || resWithEot.berryConsumed,
          firstBerryTurn: res.firstBerryTurn || resWithEot.firstBerryTurn,
          anyBerryConsumed: res.anyBerryConsumed || resWithEot.anyBerryConsumed
        })
      }
    }

    for (let i = 2; i <= 4; i++) {
      const res = computeKOChance({ damage, hp: defender.currentHp() - hazards.damage, eot: eot.damage, hits: i, timesUsed: 1, maxHP: defender.maxHp(), toxicCounter, berryRecovery, berryThreshold, damageWithoutBerry, damageAfterFirstHit })

      if (res.chance > 0) {
        return KOChance({
          chanceWithoutEot: 0,
          chanceWithEot: res.chance,
          n: i,
          berryRelevant: res.berryConsumed,
          firstBerryTurn: res.firstBerryTurn,
          anyBerryConsumed: res.anyBerryConsumed
        })
      }
    }

    for (let i = 5; i <= 9; i++) {
      const totalMin = predictTotal(damage[0], eot.damage, i, 1, toxicCounter, defender.maxHp(), damageAfterFirstHit?.[0])
      const requiredHP = defender.currentHp() - hazards.damage

      if (totalMin >= requiredHP + berryRecovery) {
        return KOChance({ chanceWithoutEot: 0, chanceWithEot: 1, n: i, berryRelevant: berryRecovery > 0 })
      } else if (predictTotal(damage[damage.length - 1], eot.damage, i, 1, toxicCounter, defender.maxHp(), damageAfterFirstHit?.[damageAfterFirstHit.length - 1]) >= requiredHP + berryRecovery) {
        return KOChance({ chanceWithoutEot: undefined, chanceWithEot: undefined, n: i, berryRelevant: berryRecovery > 0 })
      }
    }
  } else {
    const hits = move.hits
    const timesUsed = move.timesUsed
    const res = computeKOChance({ damage, hp: defender.maxHp() - hazards.damage, eot: eot.damage, hits, timesUsed, maxHP: defender.maxHp(), toxicCounter, berryRecovery, berryThreshold })

    if (res.chance > 0) {
      return KOChance({ chanceWithoutEot: 0, chanceWithEot: res.chance, n: timesUsed, multipleTurns: res.chance === 1, berryRelevant: res.berryConsumed, firstBerryTurn: res.firstBerryTurn, anyBerryConsumed: res.anyBerryConsumed })
    }

    const totalMin = predictTotal(damage[0], eot.damage, 1, timesUsed, toxicCounter, defender.maxHp())
    const requiredHP = defender.currentHp() - hazards.damage

    if (totalMin >= requiredHP + berryRecovery) {
      return KOChance({ chanceWithoutEot: 0, chanceWithEot: 1, n: timesUsed, multipleTurns: true, berryRelevant: berryRecovery > 0 })
    } else if (predictTotal(damage[damage.length - 1], eot.damage, 1, timesUsed, toxicCounter, defender.maxHp()) >= requiredHP + berryRecovery) {
      return KOChance({ chanceWithoutEot: undefined, chanceWithEot: undefined, n: timesUsed, multipleTurns: true, berryRelevant: berryRecovery > 0 })
    }

    return KOChance({ chanceWithoutEot: 0, chanceWithEot: 0, n: timesUsed })
  }

  return { chance: 0, n: 0, text: "", berryConsumed: false, anyBerryConsumed: false, firstBerryTurn: undefined }
}

export function truncateToRoll(damage: number[], rollIndex: number): number[] {
  if (rollIndex >= DEFAULT_ROLL_INDEX) {
    return damage
  }

  const keep = Math.max(1, Math.ceil((damage.length * (rollIndex + 1)) / (DEFAULT_ROLL_INDEX + 1)))

  return damage.slice(0, keep)
}

export function getSurvivesHits(attacker: Pokemon, defender: Pokemon, move: Move, field: Field, damageObj: Damage, rawDesc: RawDesc, hits: number, rollIndex: number, damageObjAfterFirstHit?: Damage): boolean {
  const [combined] = combine(damageObj)
  const damage = truncateToRoll(combined, rollIndex)
  const damageAfterFirstHit = damageObjAfterFirstHit ? truncateToRoll(combine(damageObjAfterFirstHit)[0], rollIndex) : undefined

  if (damage[damage.length - 1] === 0) {
    return true
  }

  if (move.timesUsedWithMetronome === undefined) {
    move.timesUsedWithMetronome = 1
  }

  if (hits < 1 || hits > 4 || move.timesUsed !== 1 || move.timesUsedWithMetronome !== 1) {
    const koChance = getKOChance(attacker, defender, move, field, damageObj, rawDesc, damageObjAfterFirstHit)

    return koChance.n === undefined || koChance.n > hits || (koChance.chance ?? 0) === 0
  }

  if (damage[0] >= defender.maxHp() && move.hits === 1) {
    return false
  }

  const hazards = getHazards(defender, field.defenderSide)
  const eot = getEndOfTurn(attacker, defender, move, field)
  const toxicCounter = defender.hasStatus("tox") && !defender.hasAbility("Magic Guard", "Poison Heal") ? defender.toxicCounter : 0

  const { recovery: berryRecovery, threshold: berryThreshold } = getBerryRecovery(attacker, defender, move, field)
  const rawDamageWithoutBerry = computeDamageWithoutBerry(damageObj, rawDesc, move, defender)
  const damageWithoutBerry = rawDamageWithoutBerry ? truncateToRoll(rawDamageWithoutBerry, rollIndex) : rawDamageWithoutBerry

  const maxHP = defender.maxHp()
  const hp = defender.currentHp() - hazards.damage

  let hasOHKOChance = false

  if (move.hits > 1 && damageObj && Array.isArray(damageObj) && Array.isArray(damageObj[0])) {
    const damageMatrix = (damageObj as number[][]).map(row => truncateToRoll(row, rollIndex))

    if (damageMatrix.length > 1) {
      const res = computeMultiHitKOChance(damageMatrix, hp, 0, maxHP, berryRecovery, berryThreshold)
      const resWithEot = computeMultiHitKOChance(damageMatrix, hp, eot.damage, maxHP, berryRecovery, berryThreshold)

      if (res.chance + resWithEot.chance > 0) {
        return false
      }

      hasOHKOChance = true
    }
  }

  if (!hasOHKOChance) {
    const res = computeKOChance({ damage, hp, eot: 0, hits: 1, timesUsed: 1, maxHP, toxicCounter: 0, berryRecovery, berryThreshold, damageWithoutBerry })
    const resWithEot = computeKOChance({ damage, hp, eot: eot.damage, hits: 1, timesUsed: 1, maxHP, toxicCounter, berryRecovery, berryThreshold, damageWithoutBerry })

    if (res.chance + resWithEot.chance > 0) {
      return false
    }
  }

  for (let i = 2; i <= hits; i++) {
    const res = computeKOChance({ damage, hp, eot: eot.damage, hits: i, timesUsed: 1, maxHP, toxicCounter, berryRecovery, berryThreshold, damageWithoutBerry, damageAfterFirstHit })

    if (res.chance > 0) {
      return false
    }
  }

  return true
}

type HPState = Map<number, number>

type MultiHitAccumulator = { koChance: number; berryConsumedInKO: boolean; anyBerryConsumed: boolean; firstBerryTurn?: number }

function addToState(state: HPState, hp: number, prob: number) {
  state.set(hp, (state.get(hp) || 0) + prob)
}

function applyDamageRow(state: HPState, stateBerry: HPState, damageRow: number[], maxHP: number, recovery: number, threshold: number, turn: number, acc: MultiHitAccumulator): { nextState: HPState; nextStateBerry: HPState } {
  const nextState = new Map<number, number>()
  const nextStateBerry = new Map<number, number>()
  const rowProb = 1 / damageRow.length

  for (const [currentHP, currentProb] of state) {
    for (const dmg of damageRow) {
      let nextHP = currentHP - dmg
      const prob = currentProb * rowProb

      const berry = consumeBerryIfTriggered(nextHP, maxHP, recovery, threshold)

      if (berry.consumed) {
        nextHP = berry.hp

        addToState(nextStateBerry, nextHP, prob)
        acc.anyBerryConsumed = true

        if (acc.firstBerryTurn === undefined) {
          acc.firstBerryTurn = turn
        }
      } else if (nextHP <= 0) {
        acc.koChance += prob
      } else {
        addToState(nextState, nextHP, prob)
      }
    }
  }

  for (const [currentHP, currentProb] of stateBerry) {
    for (const dmg of damageRow) {
      const nextHP = currentHP - dmg
      const prob = currentProb * rowProb

      if (nextHP <= 0) {
        acc.koChance += prob
        acc.berryConsumedInKO = true
      } else {
        addToState(nextStateBerry, nextHP, prob)
      }
    }
  }

  return { nextState, nextStateBerry }
}

function applyEndOfTurn(state: HPState, stateBerry: HPState, turnEot: number, maxHP: number, acc: MultiHitAccumulator): { nextState: HPState; nextStateBerry: HPState } {
  const nextState = new Map<number, number>()
  const nextStateBerry = new Map<number, number>()

  for (const [currentHP, currentProb] of state) {
    const nextHP = currentHP + turnEot

    if (nextHP <= 0) {
      acc.koChance += currentProb
    } else {
      addToState(nextState, Math.min(nextHP, maxHP), currentProb)
    }
  }

  for (const [currentHP, currentProb] of stateBerry) {
    const nextHP = currentHP + turnEot

    if (nextHP <= 0) {
      acc.koChance += currentProb
      acc.berryConsumedInKO = true
    } else {
      addToState(nextStateBerry, Math.min(nextHP, maxHP), currentProb)
    }
  }

  return { nextState, nextStateBerry }
}

export function computeMultiHitKOChance(damageMatrix: number[][], hp: number, eot: number, maxHP: number, berryRecovery: number | number[], berryThreshold: number | number[], rowsPerTurn?: number, toxicCounter = 0): KOChanceResult {
  let state: HPState = new Map<number, number>()
  let stateBerry: HPState = new Map<number, number>()

  const startHP = Math.min(maxHP, Math.max(0, hp))

  if (startHP <= 0) {
    return { chance: 1, berryConsumed: false, anyBerryConsumed: false }
  }

  state.set(startHP, 1)

  const recoveryByRow = Array.isArray(berryRecovery) ? berryRecovery : damageMatrix.map(() => berryRecovery)
  const thresholdByRow = Array.isArray(berryThreshold) ? berryThreshold : damageMatrix.map(() => berryThreshold)

  const acc: MultiHitAccumulator = { koChance: 0, berryConsumedInKO: false, anyBerryConsumed: false, firstBerryTurn: undefined }

  for (let i = 0; i < damageMatrix.length; i++) {
    const damageRow = damageMatrix[i]

    ;({ nextState: state, nextStateBerry: stateBerry } = applyDamageRow(state, stateBerry, damageRow, maxHP, recoveryByRow[i], thresholdByRow[i], i + 1, acc))

    if (rowsPerTurn && (i + 1) % rowsPerTurn === 0) {
      let toxicDamage = 0

      if (toxicCounter > 0) {
        toxicDamage = Math.floor((toxicCounter * maxHP) / 16)
        toxicCounter++
      }

      let turnEot = eot

      if (turnEot - toxicDamage <= 0) {
        turnEot -= toxicDamage
      }

      if (turnEot !== 0) {
        ;({ nextState: state, nextStateBerry: stateBerry } = applyEndOfTurn(state, stateBerry, turnEot, maxHP, acc))
      }
    }
  }

  if (!rowsPerTurn && eot !== 0) {
    const finalState = new Map<number, number>()
    const finalStateBerry = new Map<number, number>()

    for (const [currentHP, currentProb] of state) {
      const nextHP = currentHP + eot
      const berry = consumeBerryIfTriggered(nextHP, maxHP, recoveryByRow[0], thresholdByRow[0])

      if (nextHP <= 0) {
        acc.koChance += currentProb
      } else if (berry.consumed) {
        acc.anyBerryConsumed = true

        if (acc.firstBerryTurn === undefined) {
          acc.firstBerryTurn = 1
        }

        addToState(finalStateBerry, berry.hp, currentProb)
      } else {
        addToState(finalState, Math.min(nextHP, maxHP), currentProb)
      }
    }

    for (const [currentHP, currentProb] of stateBerry) {
      const nextHP = currentHP + eot

      if (nextHP <= 0) {
        acc.koChance += currentProb
        acc.berryConsumedInKO = true
      } else {
        addToState(finalStateBerry, Math.min(maxHP, nextHP), currentProb)
      }
    }
  }

  return { chance: acc.koChance, berryConsumed: acc.berryConsumedInKO, anyBerryConsumed: acc.anyBerryConsumed, firstBerryTurn: acc.firstBerryTurn }
}

function reduceDistribution(dist: number[], scaleValue: number): number[] {
  const newLength = dist.length / scaleValue
  const reduced = []
  reduced[0] = dist[0]
  reduced[newLength - 1] = dist[dist.length - 1]

  for (let i = 1; i < newLength - 1; i++) {
    reduced[i] = dist[Math.round(i * scaleValue + scaleValue / 2)]
  }

  return reduced
}

function combineTwo(dist1: number[], dist2: number[]): number[] {
  return dist1.flatMap(val1 => dist2.map(val2 => val1 + val2)).sort((a, b) => a - b)
}

function combineDistributions(dists: number[][]): [number[], boolean] {
  let combined = [0]
  const numRolls = dists[0].length
  const numAccuracy = numRolls === 16 && dists.length === 3 ? 3 : 2
  let approximate = false

  for (let i = 0; i < dists.length; i++) {
    const distribution = dists[i]
    combined = combineTwo(combined, distribution)

    if (i >= numAccuracy) {
      combined = reduceDistribution(combined, distribution.length)
      approximate = true
    }
  }

  return [combined, approximate]
}

const combineCache = new WeakMap<object, [number[], boolean]>()

export function combine(damage: Damage): [number[], boolean] {
  if (typeof damage === "number") {
    return [[damage], false]
  }

  const cached = combineCache.get(damage)

  if (cached) {
    return cached
  }

  const computed = computeCombine(damage)
  combineCache.set(damage, computed)

  return computed
}

function computeCombine(damage: Damage): [number[], boolean] {
  const damageArray = damage as number[] | number[][]

  if (damageArray.length >= 16 && typeof damageArray[0] === "number") {
    return [damageArray as number[], false]
  }

  if (typeof damageArray[0] === "number" && typeof damageArray[1] === "number") {
    return [[(damageArray[0] as number) + (damageArray[1] as number)], false]
  }

  return combineDistributions(damageArray as number[][])
}

type WeightedDamage = { values: number[]; counts: number[]; total: number }

const weightedCache = new WeakMap<number[], WeightedDamage>()

function toWeighted(damage: number[]): WeightedDamage {
  const cached = weightedCache.get(damage)

  if (cached) {
    return cached
  }

  const values: number[] = []
  const counts: number[] = []

  for (let i = 0; i < damage.length; i++) {
    if (i === 0 || damage[i] !== damage[i - 1]) {
      values.push(damage[i])
      counts.push(1)
    } else {
      counts[counts.length - 1]++
    }
  }

  const computed = { values, counts, total: damage.length }
  weightedCache.set(damage, computed)

  return computed
}

function computeKOChance(params: ComputeKOChanceParams): KOChanceResult {
  const { damage, hp, hits, timesUsed, maxHP, berryRecovery, berryThreshold, berryConsumed = false, damageWithoutBerry, damageAfterFirstHit } = params
  let { eot, toxicCounter } = params

  let toxicDamage = 0

  if (toxicCounter > 0) {
    toxicDamage = Math.floor((toxicCounter * maxHP) / 16)
    toxicCounter++
  }

  const { values, counts, total } = toWeighted(damage)

  if (hits === 1) {
    if (eot - toxicDamage > 0) {
      eot = 0
      toxicDamage = 0
    }

    let totalChance = 0
    let anyBerryConsumed = false
    let berryConsumedInKO = false
    let firstBerryTurn: number | undefined

    for (let i = 0; i < values.length; i++) {
      let hpAfterDamage = hp - values[i]
      let consumedNow = berryConsumed

      if (!consumedNow) {
        const berry = consumeBerryIfTriggered(hpAfterDamage, maxHP, berryRecovery, berryThreshold)
        hpAfterDamage = berry.hp
        consumedNow = berry.consumed
      }

      if (consumedNow) {
        anyBerryConsumed = true

        if (firstBerryTurn === undefined) {
          firstBerryTurn = 1
        }
      }

      if (hpAfterDamage + eot - toxicDamage <= 0) {
        totalChance += counts[i]

        if (consumedNow) {
          berryConsumedInKO = true
        }
      }
    }

    return { chance: totalChance / total, berryConsumed: berryConsumedInKO, anyBerryConsumed, firstBerryTurn }
  }

  let sum = 0
  let anyBerryConsumed = false
  let berryConsumedInKO = false
  let firstBerryTurn: number | undefined

  for (let i = 0; i < values.length; i++) {
    let hpAfterDamage = hp - values[i]
    let consumed = berryConsumed

    if (!consumed) {
      const berry = consumeBerryIfTriggered(hpAfterDamage, maxHP, berryRecovery, berryThreshold)
      hpAfterDamage = berry.hp
      consumed = berry.consumed
    }

    const result = computeKOChance({
      damage: damageAfterFirstHit || damageWithoutBerry || damage,
      hp: hpAfterDamage + eot - toxicDamage,
      eot,
      hits: hits - 1,
      timesUsed,
      maxHP,
      toxicCounter,
      berryRecovery,
      berryThreshold,
      berryConsumed: damageWithoutBerry ? true : consumed,
      damageWithoutBerry,
      damageAfterFirstHit
    })

    let turn: number | undefined

    if (hp - values[i] <= berryThreshold) {
      turn = 1
    } else if (result.firstBerryTurn !== undefined) {
      turn = result.firstBerryTurn + 1
    }

    if (result.anyBerryConsumed) {
      anyBerryConsumed = true

      if (turn !== undefined && (firstBerryTurn === undefined || turn < firstBerryTurn)) {
        firstBerryTurn = turn
      }
    }

    if (result.berryConsumed) {
      berryConsumedInKO = true
    }

    sum += result.chance * counts[i]
  }

  return { chance: sum / total, berryConsumed: berryConsumedInKO, anyBerryConsumed, firstBerryTurn }
}

function predictTotal(damage: number, eot: number, hits: number, timesUsed: number, toxicCounter: number, maxHP: number, damageAfterFirstHit?: number) {
  let toxicDamage = 0
  let lastTurnEot = eot

  if (toxicCounter > 0) {
    for (let i = 0; i < hits - 1; i++) {
      toxicDamage += Math.floor(((toxicCounter + i) * maxHP) / 16)
    }

    lastTurnEot -= Math.floor(((toxicCounter + (hits - 1)) * maxHP) / 16)
  }

  let total: number

  if (hits > 1 && timesUsed === 1) {
    total = damage + (damageAfterFirstHit ?? damage) * (hits - 1) - eot * (hits - 1) + toxicDamage
  } else {
    total = damage - eot * (hits - 1) + toxicDamage
  }

  if (lastTurnEot < 0) {
    total -= lastTurnEot
  }

  return total
}
