import { Component, computed, inject, signal } from "@angular/core"
import { TeamComponent } from "@app/features/team/team/team.component"
import { TeamsDesktopComponent } from "@features/team/teams-desktop/teams-desktop.component"
import { CombinedProbabilityComponent } from "@app/pages/probability-calc/combined-probability/combined-probability.component"
import { GeneralProbabilityComponent } from "@app/pages/probability-calc/general-probability/general-probability.component"
import { PokemonProbabilityComponent } from "@app/pages/probability-calc/pokemon-probability/pokemon-probability.component"
import { ProbabilityFieldComponent } from "@app/pages/probability-calc/probability-field/probability-field.component"
import { TeamProbabilityComponent } from "@app/pages/probability-calc/team-probability/team-probability.component"
import { CalcStore } from "@store/calc-store"
import { FieldStore } from "@store/field-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"
import { Pokemon } from "@multicalc/model"

@Component({
  selector: "app-probability-calc",
  templateUrl: "./probability-calc.component.html",
  styleUrl: "./probability-calc.component.scss",
  imports: [TeamComponent, TeamsDesktopComponent, GeneralProbabilityComponent, CombinedProbabilityComponent, PokemonProbabilityComponent, ProbabilityFieldComponent, TeamProbabilityComponent],
  providers: [FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "probability" }]
})
export class ProbabilityCalcComponent {
  store = inject(CalcStore)

  selectedPokemon = signal<Pokemon | undefined>(this.store.team().activePokemon())

  addingPokemon = signal(false)

  pokemonId = computed(() => this.store.team().activePokemon()?.id)
  pokemonOnEdit = computed(() => this.store.findNullablePokemonById(this.pokemonId() ?? ""))

  probabilityPokemon = computed(() => (this.addingPokemon() ? null : (this.store.team().activePokemon() ?? null)))

  isPokemonDefault = computed(() => {
    const pokemon = this.store.team().activePokemon()
    return pokemon == undefined
  })
}
