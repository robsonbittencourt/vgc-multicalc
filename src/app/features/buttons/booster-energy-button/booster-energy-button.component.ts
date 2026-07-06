import { Component, computed, effect, HostBinding, inject, input } from "@angular/core"
import { MatTooltip } from "@angular/material/tooltip"
import { CalcStore } from "@store/calc-store"

@Component({
  selector: "app-booster-energy-button",
  imports: [MatTooltip],
  templateUrl: "./booster-energy-button.component.html",
  styleUrl: "./booster-energy-button.component.scss"
})
export class BoosterEnergyButtonComponent {
  pokemonId = input.required<string>()

  store = inject(CalcStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  @HostBinding("style.display")
  hostDisplay = "none"

  constructor() {
    effect(() => {
      this.hostDisplay = this.pokemon().isParadoxAbility ? "block" : "none"
    })
  }

  toggleBoosterEnergy(event: Event) {
    event.stopPropagation()
    this.store.abilityOn(this.pokemonId(), !this.pokemon().ability.on)
  }
}
