import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { Damage } from "@calc/model/result"
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
    } else if (chanceWithoutEot > 0) {
      text += `${roundChance(chanceWithoutEot)}% chance to ${KOTurnText}${hazardsText}`
    }
  } else if (chanceWithoutEot === 0) {
    chance = chanceWithEot

    if (chanceWithEot === 1) {
      text = "guaranteed "
      text += `${KOTurnText}${afterText}`
    } else if (chanceWithEot > 0) {
      text += `${roundChance(chanceWithEot)}% chance to ${KOTurnText}${afterText}`
    }
  }

  return { chance, n, text, berryConsumed: berryRelevant, anyBerryConsumed, firstBerryTurn }
}

export function getKOChance(attacker: Pokemon, defender: Pokemon, move: Move, field: Field, damageObj: Damage, rawDesc: RawDesc, err = true) {
  const [damage, approximate] = combine(damageObj)

  if (isNaN(damage[0])) {
    error(err, "damage[0] must be a number.")

    return { chance: 0, n: 0, text: "", berryConsumed: false }
  }

  if (damage[damage.length - 1] === 0) {
    error(err, "damage[damage.length - 1] === 0.")

    return { chance: 0, n: 0, text: "", berryConsumed: false }
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
    berryText = (defender.item || "Berry") + " recovery"
  }

  const damageWithoutBerry = computeDamageWithoutBerry(damageObj, rawDesc, move, defender)

  const textContext: KOChanceTextContext = { hazardsTexts: hazards.texts, eotTexts: eot.texts, berryText, qualifier }
  const KOChance = (params: KOChanceTextParams) => formatKOChanceText(textContext, params)

  if (move.timesUsed === 1 && move.timesUsedWithMetronome === 1) {
    const hits = move.timesUsed
    let hasOHKOChance = false
    let berryConsumed = false

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

        if (res.berryConsumed || resWithEot.berryConsumed) {
          berryConsumed = true
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
      const res = computeKOChance({ damage, hp: defender.currentHp() - hazards.damage, eot: eot.damage, hits: i, timesUsed: 1, maxHP: defender.maxHp(), toxicCounter, berryRecovery, berryThreshold, damageWithoutBerry })

      if (res.chance > 0) {
        return KOChance({
          chanceWithoutEot: 0,
          chanceWithEot: res.chance,
          n: i,
          berryRelevant: res.berryConsumed || berryConsumed,
          firstBerryTurn: res.firstBerryTurn || (berryConsumed ? 1 : undefined),
          anyBerryConsumed: res.anyBerryConsumed || berryConsumed
        })
      }
    }

    for (let i = 5; i <= 9; i++) {
      const totalMin = predictTotal(damage[0], eot.damage, i, 1, toxicCounter, defender.maxHp())
      const requiredHP = defender.currentHp() - hazards.damage

      if (totalMin >= requiredHP + berryRecovery) {
        return KOChance({ chanceWithoutEot: 0, chanceWithEot: 1, n: i, berryRelevant: berryRecovery > 0 || berryConsumed })
      } else if (predictTotal(damage[damage.length - 1], eot.damage, i, 1, toxicCounter, defender.maxHp()) >= requiredHP + berryRecovery) {
        return KOChance({ chanceWithoutEot: undefined, chanceWithEot: undefined, n: i, berryRelevant: berryRecovery > 0 || berryConsumed })
      }
    }
  } else {
    const hits = move.hits || 1
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

export function computeMultiHitKOChance(
  damageMatrix: number[][],
  hp: number,
  eot: number,
  maxHP: number,
  berryRecovery: number | number[],
  berryThreshold: number | number[],
  rowsPerTurn?: number,
  toxicCounter = 0
): { chance: number; berryConsumed: boolean; anyBerryConsumed: boolean; firstBerryTurn?: number } {
  let state = new Map<number, number>()
  let stateBerry = new Map<number, number>()

  const startHP = Math.min(maxHP, Math.max(0, hp))

  if (startHP <= 0) {
    return { chance: 1, berryConsumed: false, anyBerryConsumed: false }
  }

  state.set(startHP, 1)

  let koChance = 0
  let firstBerryTurn: number | undefined
  let berryConsumedInKO = false
  let anyBerryConsumed = false

  for (let i = 0; i < damageMatrix.length; i++) {
    const damageRow = damageMatrix[i]
    const nextState = new Map<number, number>()
    const nextStateBerry = new Map<number, number>()
    const rowProb = 1 / damageRow.length

    const currentRecovery = Array.isArray(berryRecovery) ? berryRecovery[i] : berryRecovery
    const currentThreshold = Array.isArray(berryThreshold) ? berryThreshold[i] : berryThreshold

    for (const [currentHP, currentProb] of state) {
      for (const dmg of damageRow) {
        let nextHP = currentHP - dmg
        const prob = currentProb * rowProb

        const berry = consumeBerryIfTriggered(nextHP, maxHP, currentRecovery, currentThreshold)

        if (berry.consumed) {
          nextHP = berry.hp

          nextStateBerry.set(nextHP, (nextStateBerry.get(nextHP) || 0) + prob)
          anyBerryConsumed = true

          if (firstBerryTurn === undefined) {
            firstBerryTurn = i + 1
          }
        } else if (nextHP <= 0) {
          koChance += prob
        } else {
          nextState.set(nextHP, (nextState.get(nextHP) || 0) + prob)
        }
      }
    }

    for (const [currentHP, currentProb] of stateBerry) {
      for (const dmg of damageRow) {
        const nextHP = currentHP - dmg
        const prob = currentProb * rowProb

        if (nextHP <= 0) {
          koChance += prob
          berryConsumedInKO = true
        } else {
          nextStateBerry.set(nextHP, (nextStateBerry.get(nextHP) || 0) + prob)
        }
      }
    }

    state = nextState
    stateBerry = nextStateBerry

    if (anyBerryConsumed && firstBerryTurn === undefined) {
      firstBerryTurn = i + 1
    }

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
        const nextStateEot = new Map<number, number>()
        const nextStateBerryEot = new Map<number, number>()

        for (const [currentHP, currentProb] of state) {
          let nextHP = currentHP + turnEot

          if (nextHP <= 0) {
            koChance += currentProb
          } else {
            if (nextHP > maxHP) {
              nextHP = maxHP
            }

            nextStateEot.set(nextHP, (nextStateEot.get(nextHP) || 0) + currentProb)
          }
        }

        for (const [currentHP, currentProb] of stateBerry) {
          let nextHP = currentHP + turnEot

          if (nextHP <= 0) {
            koChance += currentProb
            berryConsumedInKO = true
          } else {
            if (nextHP > maxHP) {
              nextHP = maxHP
            }

            nextStateBerryEot.set(nextHP, (nextStateBerryEot.get(nextHP) || 0) + currentProb)
          }
        }

        state = nextStateEot
        stateBerry = nextStateBerryEot
      }
    }
  }

  if (!rowsPerTurn && eot !== 0) {
    const finalState = new Map<number, number>()
    const finalStateBerry = new Map<number, number>()

    for (const [currentHP, currentProb] of state) {
      const nextHP = currentHP + eot
      const finalRecovery = Array.isArray(berryRecovery) ? berryRecovery[0] : berryRecovery
      const finalThreshold = Array.isArray(berryThreshold) ? berryThreshold[0] : berryThreshold
      const berry = consumeBerryIfTriggered(nextHP, maxHP, finalRecovery, finalThreshold)

      if (nextHP <= 0) {
        koChance += currentProb
      } else if (berry.consumed) {
        anyBerryConsumed = true

        if (firstBerryTurn === undefined) {
          firstBerryTurn = 1
        }

        finalStateBerry.set(berry.hp, (finalStateBerry.get(berry.hp) || 0) + currentProb)
      } else {
        const clampedHP = Math.min(nextHP, maxHP)

        finalState.set(clampedHP, (finalState.get(clampedHP) || 0) + currentProb)
      }
    }

    for (const [currentHP, currentProb] of stateBerry) {
      const nextHP = currentHP + eot

      if (nextHP <= 0) {
        koChance += currentProb
        berryConsumedInKO = true
      } else {
        const h = Math.min(maxHP, nextHP)
        finalStateBerry.set(h, (finalStateBerry.get(h) || 0) + currentProb)
      }
    }
  }

  if (anyBerryConsumed && firstBerryTurn === undefined) {
    firstBerryTurn = 1
  }

  return { chance: koChance, berryConsumed: berryConsumedInKO, anyBerryConsumed, firstBerryTurn }
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

export function combine(damage: Damage): [number[], boolean] {
  if (typeof damage === "number") {
    return [[damage], false]
  }

  const damageArray = damage as number[] | number[][]

  if (damageArray.length >= 16 && typeof damageArray[0] === "number") {
    return [damageArray as number[], false]
  }

  if (typeof damageArray[0] === "number" && typeof damageArray[1] === "number") {
    return [[(damageArray[0] as number) + (damageArray[1] as number)], false]
  }

  return combineDistributions(damageArray as number[][])
}

function computeKOChance(params: ComputeKOChanceParams): KOChanceResult {
  const { damage, hp, hits, timesUsed, maxHP, berryRecovery, berryThreshold, berryConsumed = false, damageWithoutBerry } = params
  let { eot, toxicCounter } = params

  let toxicDamage = 0

  if (toxicCounter > 0) {
    toxicDamage = Math.floor((toxicCounter * maxHP) / 16)
    toxicCounter++
  }

  const n = damage.length

  if (hits === 1) {
    if (eot - toxicDamage > 0) {
      eot = 0
      toxicDamage = 0
    }

    let totalChance = 0
    let anyBerryConsumed = false
    let berryConsumedInKO = false
    let firstBerryTurn: number | undefined

    for (let i = 0; i < n; i++) {
      let hpAfterDamage = hp - damage[i]
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
        totalChance += 1

        if (consumedNow) {
          berryConsumedInKO = true
        }
      }
    }

    return { chance: totalChance / n, berryConsumed: berryConsumedInKO, anyBerryConsumed, firstBerryTurn }
  }

  let sum = 0
  let lastc = 0
  let lastBerry = false
  let lastTurn: number | undefined
  let anyBerryConsumed = false
  let berryConsumedInKO = false
  let firstBerryTurn: number | undefined

  for (let i = 0; i < n; i++) {
    let c
    let berry
    let turn: number | undefined

    if (i === 0 || damage[i] !== damage[i - 1]) {
      let hpAfterDamage = hp - damage[i]
      let consumed = berryConsumed

      if (!consumed) {
        const berry = consumeBerryIfTriggered(hpAfterDamage, maxHP, berryRecovery, berryThreshold)
        hpAfterDamage = berry.hp
        consumed = berry.consumed
      }

      const result = computeKOChance({
        damage: damageWithoutBerry || damage,
        hp: hpAfterDamage + eot - toxicDamage,
        eot,
        hits: hits - 1,
        timesUsed,
        maxHP,
        toxicCounter,
        berryRecovery,
        berryThreshold,
        berryConsumed: damageWithoutBerry ? true : consumed,
        damageWithoutBerry
      })
      c = result.chance
      berry = result.berryConsumed
      const anyBerry = result.anyBerryConsumed

      if (hp - damage[i] <= berryThreshold) {
        turn = 1
      } else if (result.firstBerryTurn !== undefined) {
        turn = result.firstBerryTurn + 1
      }

      if (anyBerry) {
        anyBerryConsumed = true

        if (turn !== undefined && (firstBerryTurn === undefined || turn < firstBerryTurn)) {
          firstBerryTurn = turn
        }
      }

      if (berry) {
        berryConsumedInKO = true
      }
    } else {
      c = lastc
      berry = lastBerry
      turn = lastTurn
    }

    sum += c
    lastc = c
    lastBerry = berry
    lastTurn = turn
  }

  return { chance: sum / n, berryConsumed: berryConsumedInKO, anyBerryConsumed, firstBerryTurn }
}

function predictTotal(damage: number, eot: number, hits: number, timesUsed: number, toxicCounter: number, maxHP: number) {
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
    total = damage * hits - eot * (hits - 1) + toxicDamage
  } else {
    total = damage - eot * (hits - 1) + toxicDamage
  }

  if (lastTurnEot < 0) {
    total -= lastTurnEot
  }

  return total
}
