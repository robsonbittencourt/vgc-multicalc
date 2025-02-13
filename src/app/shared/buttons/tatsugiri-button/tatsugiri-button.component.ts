import { Component, computed, effect, HostBinding, inject, input } from "@angular/core"
import { MatTooltip } from "@angular/material/tooltip"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-tatsugiri-button",
  imports: [MatTooltip],
  templateUrl: "./tatsugiri-button.component.html",
  styleUrl: "./tatsugiri-button.component.scss"
})
export class TatsugiriButtonComponent {
  pokemonId = input.required<string>()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  isDondozo = computed(() => this.pokemon().name === "Dondozo")

  @HostBinding("style.display")
  hostDisplay = "none"

  constructor() {
    effect(() => {
      this.hostDisplay = this.isDondozo() ? "block" : "none"
    })
  }

  toogleCommanderAbility(event: Event) {
    event.stopPropagation()
    this.store.toogleCommanderActive(this.pokemonId())
  }
}
