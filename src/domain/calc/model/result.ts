import { consumeBerryIfTriggered, getBerryRecovery, getDamageWithoutBerry, getEndOfTurn, formatResultDescription, formatDamageSummary, getKOChance, getSurvivesHits, getRecovery, getRecoil } from "@calc/engine/desc"
import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { RawDesc } from "@data/types"

export type Damage = number | number[] | [number, number] | number[][]

export interface AfterTurnData {
  turn: number
  residualDelta: number
  hp: number
}

export class AfterTurnResult {
  afterTurnData: AfterTurnData[]

  constructor(afterTurnData: AfterTurnData[]) {
    this.afterTurnData = afterTurnData
  }

  totalResidualHpUntilKO(): number {
    return this.afterTurnData.reduce((sum, turn) => sum + turn.residualDelta, 0)
  }

  residualHpInTurn(turn: number): number {
    return this.afterTurnData[turn - 1]?.residualDelta ?? 0
  }

  remainingHpUntilTurn(turn: number): number {
    return this.afterTurnData[turn - 1]?.hp ?? 0
  }
}

export const DEFAULT_ROLL_INDEX = 15

export interface TurnBerry {
  recovery: number
  threshold: number
}

export interface TurnDamageResult {
  hp: number
  recovered: number
  berryConsumed: boolean
}

export function applyTurnDamage(currentHP: number, damages: number[], maxHp: number, berry: TurnBerry, berryConsumed: boolean): TurnDamageResult {
  let hp = currentHP
  let recovered = 0
  let consumed = berryConsumed

  for (const damage of damages) {
    hp -= damage

    if (!consumed) {
      const result = consumeBerryIfTriggered(hp, maxHp, berry.recovery, berry.threshold)

      if (result.consumed) {
        recovered += berry.recovery
        hp = result.hp
        consumed = true
      }
    }
  }

  return { hp, recovered, berryConsumed: consumed }
}

export class Result {
  attacker: Pokemon
  defender: Pokemon
  move: Move
  field: Field
  damage: number | number[] | number[][]
  rawDesc: RawDesc
  damageAfterFirstHit?: Damage

  private _turnEot?: number
  private _berryHP?: number

  constructor(attacker: Pokemon, defender: Pokemon, move: Move, field: Field, damage: Damage, rawDesc: RawDesc, berryHP?: number) {
    this.attacker = attacker
    this.defender = defender
    this.move = move
    this.field = field
    this.damage = damage as number | number[] | number[][]
    this.rawDesc = rawDesc
    this._berryHP = berryHP
  }

  afterTurn(rollIndex = DEFAULT_ROLL_INDEX): AfterTurnResult {
    const hitsAtIndex = rollsAtIndex(this.damage, rollIndex)
    const minDamageTotal = damageRange(this.damage)[0]
    const hp = this.defender.currentHp()

    if (this._turnEot === undefined) {
      this._turnEot = getEndOfTurn(this.attacker, this.defender, this.move, this.field).damage
    }

    const eot = this._turnEot
    const berry = getBerryRecovery(this.attacker, this.defender, this.move, this.field)
    const berryHP = this._berryHP ?? berry.recovery

    const damageWithoutBerry = getDamageWithoutBerry(this.damage, this.rawDesc, this.move, this.defender)
    const hitsWithoutBerryAtIndex = damageWithoutBerry !== undefined ? this.getHitsAtIndex(damageWithoutBerry, rollIndex) : null

    const data: AfterTurnData[] = []
    let currentHP = hp
    let berryConsumed = false

    if (hitsAtIndex.some(h => h > 0)) {
      for (let i = 1; i <= 10; i++) {
        const turnHits = i === 1 || !hitsWithoutBerryAtIndex ? hitsAtIndex : hitsWithoutBerryAtIndex

        const turn = applyTurnDamage(currentHP, turnHits, this.defender.maxHp(), { recovery: berryHP, threshold: berry.threshold }, berryConsumed)
        currentHP = turn.hp
        berryConsumed = turn.berryConsumed
        let turnValue = turn.recovered

        if (currentHP <= 0) {
          data.push({ turn: i, residualDelta: turnValue, hp: 0 })
          break
        }

        const minHPAfterMove = hp - minDamageTotal * i + (eot > 0 ? eot : 0) * (i - 1)

        if (minHPAfterMove <= 0) {
          data.push({ turn: i, residualDelta: turnValue, hp: Math.max(0, currentHP) })
          break
        }

        currentHP += eot
        turnValue += eot

        if (currentHP > this.defender.maxHp()) {
          currentHP = this.defender.maxHp()
        }

        data.push({ turn: i, residualDelta: turnValue, hp: Math.max(0, currentHP) })

        if (currentHP <= 0 || minHPAfterMove + eot <= 0) {
          break
        }
      }
    }

    return new AfterTurnResult(data)
  }

  private getHitsAtIndex(damage: Damage, rollIndex: number): number[] {
    return rollsAtIndex(damage, rollIndex)
  }

  description(notation = "%") {
    return formatResultDescription(this.attacker, this.defender, this.move, this.field, this.damage, this.rawDesc, notation, this.damageAfterFirstHit)
  }

  range(): [number, number] {
    const [min, max] = damageRange(this.damage)

    return [min, max]
  }

  moveDesc(notation = "%") {
    return formatDamageSummary(this.attacker, this.defender, this.move, this.damage, notation)
  }

  recovery(notation = "%") {
    return getRecovery(this.attacker, this.defender, this.move, this.damage, notation)
  }

  recoil(notation = "%") {
    return getRecoil(this.attacker, this.defender, this.move, this.damage, notation)
  }

  koChance() {
    return getKOChance(this.attacker, this.defender, this.move, this.field, this.damage, this.rawDesc, this.damageAfterFirstHit)
  }

  survivesHits(hits: number, rollIndex = DEFAULT_ROLL_INDEX): boolean {
    return getSurvivesHits(this.attacker, this.defender, this.move, this.field, this.damage, this.rawDesc, hits, rollIndex, this.damageAfterFirstHit)
  }

  maxDamage() {
    return this.range()[1]
  }

  damageWithRemainingUntilTurn(turn: number, rollIndex = DEFAULT_ROLL_INDEX): number {
    const hp = this.defender.currentHp()
    const remainingHp = this.afterTurn(rollIndex).remainingHpUntilTurn(turn)

    return hp - remainingHp
  }
}

export function extractDamageSubArrays(damage: Damage): number[][] {
  if (typeof damage === "number") {
    return [[damage]]
  }

  if (Array.isArray(damage)) {
    if (damage.length === 0) {
      return []
    }

    if (Array.isArray(damage[0])) {
      return damage as number[][]
    }

    return [damage as number[]]
  }

  return []
}

export function rollsAtIndex(damage: Damage, rollIndex: number): number[] {
  const subArrays = extractDamageSubArrays(damage)

  if (subArrays.length === 0) {
    return []
  }

  return subArrays.map(arr => arr[Math.min(rollIndex, arr.length - 1)])
}

export function damageRange(damage: Damage): [number, number] {
  const range = multiDamageRange(damage)

  if (typeof range[0] === "number") {
    return range as [number, number]
  }

  const d = range as [number[], number[]]
  const summedRange: [number, number] = [0, 0]

  for (let i = 0; i < d[0].length; i++) {
    summedRange[0] += d[0][i]
    summedRange[1] += d[1][i]
  }

  return summedRange
}

export function multiDamageRange(damage: Damage): [number, number] | [number[], number[]] {
  if (typeof damage === "number") {
    return [damage, damage]
  }

  if (typeof damage[0] !== "number") {
    damage = damage as number[][]
    const ranges: [number[], number[]] = [[], []]

    for (const damageList of damage) {
      ranges[0].push(damageList[0])
      ranges[1].push(damageList[damageList.length - 1])
    }

    return ranges
  }

  const d = damage as number[]

  if (d.length < 16) {
    return [d, d]
  }

  return [d[0], d[d.length - 1]]
}
