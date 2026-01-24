import { NgClass } from "@angular/common"
import { Component, computed, input, output } from "@angular/core"
import { ACTUAL } from "@lib/constants"
import { Pokemon } from "@lib/model/pokemon"
import { SpeedDefinition } from "@lib/speed-calculator/speed-definition"

@Component({
  selector: "app-speed-box",
  templateUrl: "./speed-box.component.html",
  styleUrls: ["./speed-box.component.scss"],
  imports: [NgClass]
})
export class SpeedBoxComponent {
  speedDefinition = input.required<SpeedDefinition>()
  speedChanged = input.required<boolean>()
  speedIncreasing = input.required<boolean>()
  selected = input.required<boolean>()

  pokemonSelected = output<Pokemon>()

  isActual = computed(() => this.speedDefinition().description.includes(ACTUAL))

  animation = computed(() => {
    if (!this.speedChanged()) {
      return ""
    }

    if (this.speedIncreasing()) {
      return "slide-in-right"
    } else {
      return "slide-in-left"
    }
  })
}
