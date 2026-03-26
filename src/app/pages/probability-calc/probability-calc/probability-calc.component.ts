import { Component, computed, inject, signal } from "@angular/core"
import { TeamComponent } from "@app/features/team/team/team.component"
import { TeamsDesktopComponent } from "@features/team/teams-desktop/teams-desktop.component"
import { CombinedProbabilityComponent } from "@app/pages/probability-calc/combined-probability/combined-probability.component"
import { GeneralProbabilityComponent } from "@app/pages/probability-calc/general-probability/general-probability.component"
import { PokemonProbabilityComponent } from "@app/pages/probability-calc/pokemon-probability/pokemon-probability.component"
import { TeamProbabilityComponent } from "@app/pages/probability-calc/team-probability/team-probability.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { FIELD_CONTEXT } from "@data/store/tokens/field-context.token"
import { AutomaticFieldService } from "@lib/automatic-field-service"
import { Pokemon } from "@lib/model/pokemon"

@Component({
  selector: "app-probability-calc",
  templateUrl: "./probability-calc.component.html",
  styleUrl: "./probability-calc.component.scss",
  imports: [TeamComponent, TeamsDesktopComponent, GeneralProbabilityComponent, CombinedProbabilityComponent, PokemonProbabilityComponent, TeamProbabilityComponent],
  providers: [FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "probability" }]
})
export class ProbabilityCalcComponent {
  store = inject(CalculatorStore)

  selectedPokemon = signal<Pokemon>(this.store.team().activePokemon())

  pokemonId = computed(() => this.store.team().activePokemon().id)
  pokemonOnEdit = computed(() => this.store.findPokemonById(this.pokemonId()))

  isPokemonDefault = computed(() => this.store.team().activePokemon().isDefault)
}
