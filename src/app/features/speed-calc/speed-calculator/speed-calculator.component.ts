import { Component, computed, inject, signal } from "@angular/core"
import { SpeedInsightsComponent } from "@app/features/speed-calc/speed-insights/speed-insights.component"
import { SpeedListComponent } from "@app/features/speed-calc/speed-list/speed-list.component"
import { FieldComponent } from "@app/shared/field/field.component"
import { TeamComponent } from "@app/shared/team/team/team.component"
import { TeamsComponent } from "@app/shared/team/teams/teams.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { Pokemon } from "@lib/model/pokemon"

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
