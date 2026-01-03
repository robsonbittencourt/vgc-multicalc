import { Component, computed, inject, signal } from "@angular/core"
import { TeamComponent } from "@features/team/team/team.component"
import { TeamsComponent } from "@features/team/teams/teams.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { DefensiveCoverageComponent } from "@pages/type-calc/defensive-coverage/defensive-coverage.component"
import { OffensiveCoverageComponent } from "@pages/type-calc/offensive-coverage/offensive-coverage.component"
import { TypeCoverageInsightsComponent } from "@pages/type-calc/type-coverage-insights/type-coverage-insights.component"
import { Team } from "@lib/model/team"

@Component({
  selector: "app-type-calculator",
  templateUrl: "./type-calculator.component.html",
  styleUrl: "./type-calculator.component.scss",
  imports: [TeamComponent, TeamsComponent, DefensiveCoverageComponent, OffensiveCoverageComponent, TypeCoverageInsightsComponent]
})
export class TypeCalculatorComponent {
  store = inject(CalculatorStore)

  pokemonId = computed(() => this.store.team().activePokemon().id)
  isPokemonDefault = computed(() => this.store.team().activePokemon().isDefault)
  secondTeam = signal<Team | null>(null)

  onSecondTeamSelected(team: Team | null) {
    this.secondTeam.set(team)
  }
}
