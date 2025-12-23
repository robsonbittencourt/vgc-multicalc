import { Component, input } from "@angular/core"

@Component({
  selector: "app-donut-graphic",
  imports: [],
  templateUrl: "./donut-graphic.component.html",
  styleUrl: "./donut-graphic.component.scss"
})
export class DonutGraphicComponent {
  score = input<number>(0)

  radius = 45
  circumference = 2 * Math.PI * this.radius

  get strokeDashoffset() {
    const percent = Math.min(Math.max(this.score(), 0), 100)
    return this.circumference - (percent / 100) * this.circumference
  }

  get color() {
    if (this.score() < 80) return "#d9534f"
    if (this.score() < 100) return "#f0ad4e"
    return "#5cb85c"
  }
}
