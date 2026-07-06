import { Component, computed, inject, signal } from "@angular/core"
import { TeamComponent } from "@features/team/team/team.component"
import { TeamsDesktopComponent } from "@features/team/teams-desktop/teams-desktop.component"
import { CalcStore } from "@store/calc-store"
import { DefensiveCoverageComponent } from "@pages/type-calc/defensive-coverage/defensive-coverage.component"
import { OffensiveCoverageComponent } from "@pages/type-calc/offensive-coverage/offensive-coverage.component"
import { TypeCoverageInsightsComponent } from "@pages/type-calc/type-coverage-insights/type-coverage-insights.component"
import { Team } from "@multicalc/model"
import { FieldStore } from "@store/field-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"

@Component({
  selector: "app-type-calc",
  templateUrl: "./type-calc.component.html",
  styleUrl: "./type-calc.component.scss",
  imports: [TeamComponent, TeamsDesktopComponent, DefensiveCoverageComponent, OffensiveCoverageComponent, TypeCoverageInsightsComponent],
  providers: [FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "type" }]
})
export class TypeCalcComponent {
  store = inject(CalcStore)

  pokemonId = computed(() => this.store.team().activePokemon()?.id)
  isPokemonDefault = computed(() => {
    const pokemon = this.store.team().activePokemon()
    return pokemon == undefined
  })
  secondTeam = signal<Team | null>(null)

  onSecondTeamSelected(team: Team | null) {
    this.secondTeam.set(team ? team : null)
  }
}
