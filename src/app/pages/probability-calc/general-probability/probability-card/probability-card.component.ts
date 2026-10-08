import { Component, computed, input } from "@angular/core"
import { ChanceCellFormatter } from "@app/pages/probability-calc/general-probability/probability-card/chance-cell-formatter"

@Component({
  selector: "app-probability-card",
  templateUrl: "./probability-card.component.html",
  styleUrl: "./probability-card.component.scss",
  standalone: true
})
export class ProbabilityCardComponent {
  title = input.required<string>()
  headers = input.required<string[]>()
  rows = input.required<string[][]>()
  cellWidths = input<number[]>([])

  private formatter = new ChanceCellFormatter()

  formattedRows = computed(() => this.rows().map(row => row.map(cell => this.formatter.format(cell))))

  getCellFlex(index: number): string {
    const widths = this.cellWidths()
    if (widths && widths[index] !== undefined) {
      return `${widths[index]}`
    }
    return "1"
  }
}
