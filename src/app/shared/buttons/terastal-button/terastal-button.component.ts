import { Component, computed, inject, input } from "@angular/core"
import { MatTooltip } from "@angular/material/tooltip"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-terastal-button",
  imports: [MatTooltip],
  templateUrl: "./terastal-button.component.html",
  styleUrl: "./terastal-button.component.scss"
})
export class TerastalButtonComponent {
  pokemonId = input.required<string>()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  terastalyzePokemon(event: Event) {
    event.stopPropagation()
    this.store.toogleTeraTypeActive(this.pokemonId())
  }
}
