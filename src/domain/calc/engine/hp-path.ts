import { consumeBerryIfTriggered } from "@calc/engine/berry"

export type HpPathInput = {
  rows: number[][]
  fullHpRows: (number[] | undefined)[]
  continuesUse: boolean[]
  rowsPerTurn: number
  hp: number
  maxHp: number
  eot: number
  toxicDamageForTurn: (turn: number) => number
  berryRecovery: number
  berryThreshold: number
  itemLoss?: { row: number; rowWithoutItem: number[] }
}

export type HpPathTurn = { hp: number; recovered: number }

export type HpPath = { hits: number[]; turns: HpPathTurn[] }

export function walkHpPath(input: HpPathInput, rollIndex: number): HpPath {
  const hits: number[] = []
  const turns: HpPathTurn[] = []
  let hp = input.hp
  let berryAvailable = input.berryRecovery > 0
  let berryEaten = false
  let recovered = 0
  let useAtFullHp = false

  input.rows.forEach((row, index) => {
    if (!input.continuesUse[index]) useAtFullHp = hp === input.maxHp

    const fullHpRow = input.fullHpRows[index]
    const losesItem = input.itemLoss?.row === index
    const source = useAtFullHp && fullHpRow ? fullHpRow : losesItem && berryEaten ? input.itemLoss!.rowWithoutItem : row
    const damage = source[Math.min(rollIndex, source.length - 1)]

    hits.push(damage)
    hp -= damage

    if (losesItem) berryAvailable = false

    if (berryAvailable && hp > 0) {
      const berry = consumeBerryIfTriggered(hp, input.maxHp, input.berryRecovery, input.berryThreshold)

      if (berry.consumed) {
        recovered += berry.hp - hp
        hp = berry.hp
        berryAvailable = false
        berryEaten = true
      }
    }

    if ((index + 1) % input.rowsPerTurn === 0) {
      if (hp <= 0) {
        turns.push({ hp: 0, recovered })
      } else {
        const turnEot = input.eot - input.toxicDamageForTurn(turns.length + 1)

        hp = Math.min(input.maxHp, hp + turnEot)
        turns.push({ hp, recovered: recovered + turnEot })
      }

      recovered = 0
    }
  })

  return { hits, turns }
}

export function rowsAlongPath(input: HpPathInput): number[][] {
  const columns = Array.from({ length: 16 }, (_, rollIndex) => walkHpPath(input, rollIndex).hits)

  return input.rows.map((_, index) => columns.map(column => column[index]))
}

export function turnsUntilKO(turns: HpPathTurn[]): { turn: number; residualDelta: number; hp: number }[] {
  const knockedOut = turns.findIndex(turn => turn.hp <= 0)
  const lastTurn = knockedOut === -1 ? turns.length : knockedOut + 1

  return turns.slice(0, lastTurn).map((turn, index) => ({ turn: index + 1, residualDelta: turn.recovered, hp: turn.hp }))
}
