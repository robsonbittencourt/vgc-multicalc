import { getFlingPower } from "@calc/model/items"
import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { countBoosts, effectiveWeather, getWeight, isGrounded, isQPActive } from "@calc/engine/stats"
import { RawDesc } from "@data/types"

export interface BasePowerContext {
  attacker: Pokemon
  defender: Pokemon
  move: Move
  field: Field
  description: RawDesc
  turnOrder: "first" | "last"
  hit: number
}

type BasePowerStrategy = (ctx: BasePowerContext) => number

function describedBp(description: RawDesc, basePower: number): number {
  description.moveBP = basePower

  return basePower
}

const weightBasedBp: BasePowerStrategy = ({ defender, description }) => describedBp(description, weightToBasePower(getWeight(defender, description, "defender")))

const weightRatioBp: BasePowerStrategy = ({ attacker, defender, description }) => describedBp(description, weightRatioToBasePower(getWeight(attacker, description, "attacker") / getWeight(defender, description, "defender")))

const statusDoublesBp: BasePowerStrategy = ({ move, defender, description }) => describedBp(description, move.bp * (defender.status ? 2 : 1))

const boostScaledBp: BasePowerStrategy = ({ attacker, description }) => describedBp(description, 20 + 20 * countBoosts(attacker.boosts))

const currentHpBp: BasePowerStrategy = ({ attacker, description }) => describedBp(description, currentHpBasePower(attacker))

const lowHpBp: BasePowerStrategy = ({ attacker, description }) => describedBp(description, lowHpBasePower(attacker))

const BASE_POWER_STRATEGIES = new Map<string, BasePowerStrategy>([
  ["Payback", ({ move, description, turnOrder }) => describedBp(description, move.bp * (turnOrder === "last" ? 2 : 1))],
  [
    "Electro Ball",
    ({ attacker, defender, description }) => {
      const ratio = Math.floor(attacker.stats.spe / defender.stats.spe)
      const basePower = defender.stats.spe === 0 ? 40 : ratio >= 4 ? 150 : ratio >= 3 ? 120 : ratio >= 2 ? 80 : ratio >= 1 ? 60 : 40

      return describedBp(description, basePower)
    }
  ],
  [
    "Gyro Ball",
    ({ attacker, defender, description }) => {
      const basePower = attacker.stats.spe === 0 ? 1 : Math.min(150, Math.floor((25 * defender.stats.spe) / attacker.stats.spe) + 1)

      return describedBp(description, basePower)
    }
  ],
  ["Punishment", ({ defender, description }) => describedBp(description, Math.min(200, 60 + 20 * countBoosts(defender.boosts)))],
  ["Low Kick", weightBasedBp],
  ["Grass Knot", weightBasedBp],
  ["Hex", statusDoublesBp],
  ["Infernal Parade", statusDoublesBp],
  ["Heavy Slam", weightRatioBp],
  ["Heat Crash", weightRatioBp],
  ["Stored Power", boostScaledBp],
  ["Power Trip", boostScaledBp],
  ["Acrobatics", ({ move, attacker, field, description }) => describedBp(description, move.bp * (attacker.hasItem("Flying Gem") || !attacker.item || (isQPActive(attacker, field) && attacker.hasItem("Booster Energy")) ? 2 : 1))],
  ["Assurance", ({ move }) => move.bp * (move.isParentalBondChild ? 2 : 1)],
  ["Smelling Salts", ({ move, defender, description }) => describedBp(description, move.bp * (defender.hasStatus("par") ? 2 : 1))],
  [
    "Weather Ball",
    ({ move, attacker, field, description }) => {
      const weather = effectiveWeather(attacker, field)
      const boosted = weather === "Sun" || weather === "Rain" || weather === "Sand" || weather === "Hail" || weather === "Snow"

      return describedBp(description, move.bp * (boosted ? 2 : 1))
    }
  ],
  ["Terrain Pulse", ({ move, attacker, field, description }) => describedBp(description, move.bp * (isGrounded(attacker, field) && field.terrain ? 2 : 1))],
  ["Rising Voltage", ({ move, defender, field, description }) => describedBp(description, move.bp * (isGrounded(defender, field) && field.hasTerrain("Electric") ? 2 : 1))],
  [
    "Fling",
    ({ attacker, description }) => {
      description.attackerItem = attacker.item

      return describedBp(description, getFlingPower(attacker.item))
    }
  ],
  ["Eruption", currentHpBp],
  ["Water Spout", currentHpBp],
  ["Dragon Energy", currentHpBp],
  ["Barb Barrage", ({ move, defender, description }) => describedBp(description, move.bp * (defender.hasStatus("psn", "tox") ? 2 : 1))],
  [
    "Psyblade",
    ({ move, field, description }) => {
      const basePower = move.bp * (field.hasTerrain("Electric") ? 1.5 : 1)

      if (field.hasTerrain("Electric")) {
        description.moveBP = basePower
        description.terrain = field.terrain
      }

      return basePower
    }
  ],
  ["Tera Blast", ({ attacker, description }) => describedBp(description, attacker.teraType === "Stellar" ? 100 : 80)],
  ["Flail", lowHpBp],
  ["Reversal", lowHpBp],
  [
    "Triple Axel",
    ({ move, description, hit }) => {
      const basePower = hit * 20
      description.moveBP = move.hits === 2 ? 60 : move.hits === 3 ? 120 : 20

      return basePower
    }
  ],
  [
    "Hard Press",
    ({ defender, description }) => {
      let basePower = 100 * Math.floor((defender.currentHp() * 4096) / defender.maxHp())
      basePower = Math.floor(Math.floor((100 * basePower + 2048 - 1) / 4096) / 100) || 1

      return describedBp(description, basePower)
    }
  ]
])

export function getBasePower(ctx: BasePowerContext): number {
  const strategy = BASE_POWER_STRATEGIES.get(ctx.move.name)

  return strategy ? strategy(ctx) : ctx.move.bp
}

export function applyTeraBasePowerFloor(ctx: BasePowerContext, basePower: number): number {
  const { attacker, move, description } = ctx
  const teraType = attacker.teraType

  if (!teraType || basePower >= 60) return basePower

  const teraStab = teraType === "Stellar" ? move.isStellarFirstUse : move.type === teraType && attacker.hasType(teraType)

  if (teraStab && !move.moveData.multihit && move.priority <= 0 && !hasVariableBasePower(move)) {
    description.moveBP = 60

    return 60
  }

  return basePower
}

function hasVariableBasePower(move: Move): boolean {
  return (move.bp === 0 || move.bp === 150) && BASE_POWER_STRATEGIES.has(move.name)
}

function weightToBasePower(weight: number): number {
  return weight >= 200 ? 120 : weight >= 100 ? 100 : weight >= 50 ? 80 : weight >= 25 ? 60 : weight >= 10 ? 40 : 20
}

function weightRatioToBasePower(ratio: number): number {
  return ratio >= 5 ? 120 : ratio >= 4 ? 100 : ratio >= 3 ? 80 : ratio >= 2 ? 60 : 40
}

function currentHpBasePower(attacker: Pokemon): number {
  return Math.max(1, Math.floor((150 * attacker.currentHp()) / attacker.maxHp()))
}

function lowHpBasePower(attacker: Pokemon): number {
  const ratio = Math.floor((48 * attacker.currentHp()) / attacker.maxHp())

  return ratio <= 1 ? 200 : ratio <= 4 ? 150 : ratio <= 9 ? 100 : ratio <= 16 ? 80 : ratio <= 32 ? 40 : 20
}
