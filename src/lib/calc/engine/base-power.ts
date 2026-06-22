import { getFlingPower } from "@lib/calc/model/items"
import { Field } from "@lib/calc/model/field"
import { Move } from "@lib/calc/model/move"
import { Pokemon } from "@lib/calc/model/pokemon"
import { countBoosts, getWeight, isGrounded, isQPActive } from "@lib/calc/engine/stats"
import { RawDesc } from "@lib/calc/model/types"

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

const BASE_POWER_STRATEGIES = new Map<string, BasePowerStrategy>([
  [
    "Payback",
    ({ move, description, turnOrder }) => {
      const basePower = move.bp * (turnOrder === "last" ? 2 : 1)
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Electro Ball",
    ({ attacker, defender, description }) => {
      const ratio = Math.floor(attacker.stats.spe / defender.stats.spe)
      let basePower = ratio >= 4 ? 150 : ratio >= 3 ? 120 : ratio >= 2 ? 80 : ratio >= 1 ? 60 : 40

      if (defender.stats.spe === 0) {
        basePower = 40
      }

      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Gyro Ball",
    ({ attacker, defender, description }) => {
      let basePower = Math.min(150, Math.floor((25 * defender.stats.spe) / attacker.stats.spe) + 1)

      if (attacker.stats.spe === 0) {
        basePower = 1
      }

      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Punishment",
    ({ defender, description }) => {
      const basePower = Math.min(200, 60 + 20 * countBoosts(defender.boosts))
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Low Kick",
    ({ defender, description }) => {
      const basePower = weightToBasePower(getWeight(defender, description, "defender"))
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Grass Knot",
    ({ defender, description }) => {
      const basePower = weightToBasePower(getWeight(defender, description, "defender"))
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Hex",
    ({ move, defender, description }) => {
      const basePower = move.bp * (defender.status ? 2 : 1)
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Infernal Parade",
    ({ move, defender, description }) => {
      const basePower = move.bp * (defender.status ? 2 : 1)
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Heavy Slam",
    ({ attacker, defender, description }) => {
      const basePower = weightRatioToBasePower(getWeight(attacker, description, "attacker") / getWeight(defender, description, "defender"))
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Heat Crash",
    ({ attacker, defender, description }) => {
      const basePower = weightRatioToBasePower(getWeight(attacker, description, "attacker") / getWeight(defender, description, "defender"))
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Stored Power",
    ({ attacker, description }) => {
      const basePower = 20 + 20 * countBoosts(attacker.boosts)
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Power Trip",
    ({ attacker, description }) => {
      const basePower = 20 + 20 * countBoosts(attacker.boosts)
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Acrobatics",
    ({ move, attacker, field, description }) => {
      const basePower = move.bp * (attacker.hasItem("Flying Gem") || !attacker.item || (isQPActive(attacker, field) && attacker.hasItem("Booster Energy")) ? 2 : 1)
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Assurance",
    ({ move, defender }) => {
      return move.bp * (defender.hasAbility("Parental Bond (Child)") ? 2 : 1)
    }
  ],
  [
    "Smelling Salts",
    ({ move, defender, description }) => {
      const basePower = move.bp * (defender.hasStatus("par") ? 2 : 1)
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Weather Ball",
    ({ move, attacker, field, description }) => {
      const basePower = move.bp * (field.weather || attacker.hasAbility("Mega Sol") ? 2 : 1)
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Terrain Pulse",
    ({ move, attacker, field, description }) => {
      const basePower = move.bp * (isGrounded(attacker, field) && field.terrain ? 2 : 1)
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Rising Voltage",
    ({ move, defender, field, description }) => {
      const basePower = move.bp * (isGrounded(defender, field) && field.hasTerrain("Electric") ? 2 : 1)
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Fling",
    ({ attacker, description }) => {
      const basePower = getFlingPower(attacker.item)
      description.moveBP = basePower
      description.attackerItem = attacker.item

      return basePower
    }
  ],
  [
    "Eruption",
    ({ attacker, description }) => {
      const basePower = currentHpBasePower(attacker)
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Water Spout",
    ({ attacker, description }) => {
      const basePower = currentHpBasePower(attacker)
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Dragon Energy",
    ({ attacker, description }) => {
      const basePower = currentHpBasePower(attacker)
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Barb Barrage",
    ({ move, defender, description }) => {
      const basePower = move.bp * (defender.hasStatus("psn", "tox") ? 2 : 1)
      description.moveBP = basePower

      return basePower
    }
  ],
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
  [
    "Tera Blast",
    ({ attacker, description }) => {
      const basePower = attacker.teraType === "Stellar" ? 100 : 80
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Flail",
    ({ attacker, description }) => {
      const basePower = lowHpBasePower(attacker)
      description.moveBP = basePower

      return basePower
    }
  ],
  [
    "Reversal",
    ({ attacker, description }) => {
      const basePower = lowHpBasePower(attacker)
      description.moveBP = basePower

      return basePower
    }
  ],
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
      let basePower = 100 * Math.floor((defender.currrentHp() * 4096) / defender.maxHp())
      basePower = Math.floor(Math.floor((100 * basePower + 2048 - 1) / 4096) / 100) || 1
      description.moveBP = basePower

      return basePower
    }
  ]
])

export function getBasePower(ctx: BasePowerContext): number {
  const strategy = BASE_POWER_STRATEGIES.get(ctx.move.name)
  const basePower = strategy ? strategy(ctx) : ctx.move.bp

  return applyTeraBasePowerFloor(ctx, basePower)
}

function applyTeraBasePowerFloor(ctx: BasePowerContext, basePower: number): number {
  const { attacker, move, description } = ctx
  const teraType = attacker.teraType

  const teraStab = !!teraType && move.type === teraType && attacker.hasType(teraType)

  if (teraStab && move.hits === 1 && move.priority <= 0 && move.bp > 0 && !move.named("Dragon Energy", "Eruption", "Water Spout") && basePower < 60) {
    description.moveBP = 60
    return 60
  }

  return basePower
}

function weightToBasePower(weight: number): number {
  return weight >= 200 ? 120 : weight >= 100 ? 100 : weight >= 50 ? 80 : weight >= 25 ? 60 : weight >= 10 ? 40 : 20
}

function weightRatioToBasePower(ratio: number): number {
  return ratio >= 5 ? 120 : ratio >= 4 ? 100 : ratio >= 3 ? 80 : ratio >= 2 ? 60 : 40
}

function currentHpBasePower(attacker: Pokemon): number {
  return Math.max(1, Math.floor((150 * attacker.currrentHp()) / attacker.maxHp()))
}

function lowHpBasePower(attacker: Pokemon): number {
  const ratio = Math.floor((48 * attacker.currrentHp()) / attacker.maxHp())

  return ratio <= 1 ? 200 : ratio <= 4 ? 150 : ratio <= 9 ? 100 : ratio <= 16 ? 80 : ratio <= 32 ? 40 : 20
}
