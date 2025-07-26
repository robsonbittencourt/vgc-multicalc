import { Component, computed, inject, signal } from "@angular/core"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldComponent } from "@features/field/field.component"
import { TeamComponent } from "@features/team/team/team.component"
import { TeamsComponent } from "@features/team/teams/teams.component"
import { Pokemon } from "@lib/model/pokemon"
import { SpeedInsightsComponent } from "@pages/speed-calc/speed-insights/speed-insights.component"
import { SpeedListComponent } from "@pages/speed-calc/speed-list/speed-list.component"

@Component({
  selector: "app-speed-calculator",
  templateUrl: "./speed-calculator.component.html",
  styleUrls: ["./speed-calculator.component.scss"],
  imports: [TeamComponent, TeamsComponent, FieldComponent, SpeedListComponent, SpeedInsightsComponent]
})
export class SpeedCalculatorComponent {
  store = inject(CalculatorStore)

  selectedPokemon = signal<Pokemon>(this.store.team().activePokemon())

  pokemonId = computed(() => this.store.team().activePokemon().id)

  isPokemonDefault = computed(() => this.store.team().activePokemon().isDefault)
}
