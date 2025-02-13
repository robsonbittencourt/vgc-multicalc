import { Component, computed, effect, HostBinding, inject, input } from "@angular/core"
import { MatTooltip } from "@angular/material/tooltip"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-booster-energy-button",
  imports: [MatTooltip],
  templateUrl: "./booster-energy-button.component.html",
  styleUrl: "./booster-energy-button.component.scss"
})
export class BoosterEnergyButtonComponent {
  pokemonId = input.required<string>()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  @HostBinding("style.display")
  hostDisplay = "none"

  constructor() {
    effect(() => {
      this.hostDisplay = this.pokemon().isParadoxAbility ? "block" : "none"
    })
  }

  toogleBoosterEnergy(event: Event) {
    event.stopPropagation()
    this.store.abilityOn(this.pokemonId(), !this.pokemon().ability.on)
  }
}
