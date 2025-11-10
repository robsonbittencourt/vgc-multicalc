import { Component, computed, inject } from "@angular/core"
import { WidgetComponent } from "@app/basic/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-pokemon-probability",
  imports: [WidgetComponent],
  templateUrl: "./pokemon-probability.component.html",
  styleUrl: "./pokemon-probability.component.scss"
})
export class PokemonProbabilityComponent {
  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.team().activePokemon())

  secondary = computed(() => JSON.stringify(this.pokemon().moveSet.activeMove.secondary))
}
