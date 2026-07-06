import { Component, computed, effect, HostBinding, inject, input } from "@angular/core"
import { MatTooltip } from "@angular/material/tooltip"
import { CalcStore } from "@store/calc-store"

@Component({
  selector: "app-tatsugiri-button",
  imports: [MatTooltip],
  templateUrl: "./tatsugiri-button.component.html",
  styleUrl: "./tatsugiri-button.component.scss"
})
export class TatsugiriButtonComponent {
  pokemonId = input.required<string>()

  store = inject(CalcStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  isDondozo = computed(() => this.pokemon().name === "Dondozo")

  @HostBinding("style.display")
  hostDisplay = "none"

  constructor() {
    effect(() => {
      this.hostDisplay = this.isDondozo() ? "block" : "none"
    })
  }

  toggleCommanderAbility(event: Event) {
    event.stopPropagation()
    this.store.toggleCommanderActive(this.pokemonId())
  }
}
