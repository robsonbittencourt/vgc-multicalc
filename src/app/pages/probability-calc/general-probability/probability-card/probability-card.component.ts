import { Component, input } from "@angular/core"

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

  getCellFlex(index: number): string {
    const widths = this.cellWidths()
    if (widths && widths[index] !== undefined) {
      return `${widths[index]}`
    }
    return "1"
  }
}
