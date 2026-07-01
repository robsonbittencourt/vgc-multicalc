import { NgClass } from "@angular/common"
import { Component, computed, input, output } from "@angular/core"
import { PokemonSpriteComponent } from "@basic/pokemon-sprite/pokemon-sprite.component"
import { ACTUAL, YOUR_TEAM } from "@lib/constants"
import { Pokemon } from "@lib/model/pokemon"
import { SpeedDefinition } from "@lib/speed-calculator/speed-definition"

@Component({
  selector: "app-speed-box",
  templateUrl: "./speed-box.component.html",
  styleUrls: ["./speed-box.component.scss"],
  imports: [NgClass, PokemonSpriteComponent]
})
export class SpeedBoxComponent {
  speedDefinition = input.required<SpeedDefinition>()
  speedChanged = input.required<boolean>()
  speedIncreasing = input.required<boolean>()
  selected = input.required<boolean>()
  hideActualDescription = input<boolean>(false)
  highlightMyTeam = input<boolean>(false)

  pokemonSelected = output<Pokemon>()

  isActual = computed(() => this.speedDefinition().description.includes(ACTUAL))

  descriptions = computed(() => (this.hideActualDescription() ? this.speedDefinition().description.filter(d => d !== ACTUAL) : this.speedDefinition().description))

  highlighted = computed(() => this.selected() || (this.highlightMyTeam() && this.speedDefinition().description.includes(YOUR_TEAM)))

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
