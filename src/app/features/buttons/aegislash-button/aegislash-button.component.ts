import { Component, computed, effect, HostBinding, inject, input } from "@angular/core"
import { MatTooltip } from "@angular/material/tooltip"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-aegislash-button",
  imports: [MatTooltip],
  templateUrl: "./aegislash-button.component.html",
  styleUrl: "./aegislash-button.component.scss"
})
export class AegislashButtonComponent {
  pokemonId = input.required<string>()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  isAegislash = computed(() => this.pokemon().name === "Aegislash-Shield" || this.pokemon().name === "Aegislash-Blade")
  isBladeForm = computed(() => this.pokemon().name === "Aegislash-Blade")

  @HostBinding("style.display")
  hostDisplay = "none"

  constructor() {
    effect(() => {
      this.hostDisplay = this.isAegislash() ? "block" : "none"
    })
  }

  toggleForm(event: Event) {
    event.stopPropagation()
    const newName = this.isBladeForm() ? "Aegislash-Shield" : "Aegislash-Blade"
    this.store.name(this.pokemonId(), newName)
  }
}
