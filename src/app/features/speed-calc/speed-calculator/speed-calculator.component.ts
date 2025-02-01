import { Component, computed, inject } from "@angular/core"
import { FieldComponent } from "@app/shared/field/field.component"
import { TeamComponent } from "@app/shared/team/team/team.component"
import { TeamsComponent } from "@app/shared/team/teams/teams.component"
import { SpeedListComponent } from "@app/speed-list/speed-list.component"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-speed-calculator",
  templateUrl: "./speed-calculator.component.html",
  styleUrls: ["./speed-calculator.component.scss"],
  imports: [TeamComponent, TeamsComponent, FieldComponent, SpeedListComponent]
})
export class SpeedCalculatorComponent {
  store = inject(CalculatorStore)

  pokemonId = computed(() => this.store.team().activePokemon().id)

  isPokemonDefault = computed(() => this.store.team().activePokemon().isDefault)
}
