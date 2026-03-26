import { Component, computed, inject, signal } from "@angular/core"
import { TeamComponent } from "@features/team/team/team.component"
import { TeamsDesktopComponent } from "@features/team/teams-desktop/teams-desktop.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { DefensiveCoverageComponent } from "@pages/type-calc/defensive-coverage/defensive-coverage.component"
import { OffensiveCoverageComponent } from "@pages/type-calc/offensive-coverage/offensive-coverage.component"
import { TypeCoverageInsightsComponent } from "@pages/type-calc/type-coverage-insights/type-coverage-insights.component"
import { Team } from "@lib/model/team"
import { FieldStore } from "@data/store/field-store"
import { FIELD_CONTEXT } from "@data/store/tokens/field-context.token"
import { AutomaticFieldService } from "@lib/automatic-field-service"

@Component({
  selector: "app-type-calculator",
  templateUrl: "./type-calculator.component.html",
  styleUrl: "./type-calculator.component.scss",
  imports: [TeamComponent, TeamsDesktopComponent, DefensiveCoverageComponent, OffensiveCoverageComponent, TypeCoverageInsightsComponent],
  providers: [FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "type" }]
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
