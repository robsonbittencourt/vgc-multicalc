const MAX_DECIMALS = 3
const PERCENT_CELL = /^(\d+)(?:\.(\d+))?%$/

export class ChanceCellFormatter {
  format(cell: string): string {
    const match = PERCENT_CELL.exec(cell)

    if (!match || (match[2] ?? "").length <= MAX_DECIMALS) return cell

    const rounded = Number(Number(cell.slice(0, -1)).toFixed(MAX_DECIMALS))

    if (rounded === 0) return `<${10 ** -MAX_DECIMALS}%`

    return `${rounded}%`
  }
}
