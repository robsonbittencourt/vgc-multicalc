import { NgStyle } from "@angular/common"
import { Component, computed, inject, input, output } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-pokemon-tab",
  templateUrl: "./pokemon-tab.component.html",
  styleUrls: ["./pokemon-tab.component.scss"],
  imports: [NgStyle, MatIcon]
})
export class PokemonTabComponent {

  pokemonId = input.required<string>()
  active = input.required<boolean>()

  tabActivated = output<string>()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  activateTab() {
    this.tabActivated.emit(this.pokemonId())
  }

  tabStyle(): any {
    const activeTabStyle = { "border-bottom": "solid 2px", "border-color": "#673ab7", "background-color": "#f9f7fc" }

    if (this.active() == true) {
      return activeTabStyle
    } else {
      return null
    }
  }

}
