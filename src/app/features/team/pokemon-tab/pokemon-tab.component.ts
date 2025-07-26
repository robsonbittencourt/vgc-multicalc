import { NgClass } from "@angular/common"
import { Component, computed, inject, input, output } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-pokemon-tab",
  templateUrl: "./pokemon-tab.component.html",
  styleUrls: ["./pokemon-tab.component.scss"],
  imports: [NgClass, MatIcon]
})
export class PokemonTabComponent {
  pokemonId = input.required<string>()
  active = input.required<boolean>()

  tabActivated = output<string>()
  secondTabActivated = output<string>()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  activateTab(event: MouseEvent) {
    if (event.ctrlKey || event.metaKey) {
      this.secondTabActivated.emit(this.pokemonId())
    } else {
      this.tabActivated.emit(this.pokemonId())
    }
  }
}
