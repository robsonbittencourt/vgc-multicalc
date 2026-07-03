import { Component, computed, effect, HostBinding, inject, input } from "@angular/core"
import { MatTooltip } from "@angular/material/tooltip"
import { CalculatorStore } from "@store/calculator-store"

@Component({
  selector: "app-palafin-button",
  imports: [MatTooltip],
  templateUrl: "./palafin-button.component.html",
  styleUrl: "./palafin-button.component.scss"
})
export class PalafinButtonComponent {
  pokemonId = input.required<string>()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  isPalafin = computed(() => this.pokemon().name === "Palafin" || this.pokemon().name === "Palafin-Hero")
  isHeroForm = computed(() => this.pokemon().name === "Palafin-Hero")

  @HostBinding("style.display")
  hostDisplay = "none"

  constructor() {
    effect(() => {
      this.hostDisplay = this.isPalafin() ? "block" : "none"
    })
  }

  toggleForm(event: Event) {
    event.stopPropagation()
    const newName = this.isHeroForm() ? "Palafin" : "Palafin-Hero"
    this.store.name(this.pokemonId(), newName)
  }
}
