import { Component, computed, effect, inject, signal } from "@angular/core"
import { CalculatorStore } from "@store/calculator-store"
import { FieldStore } from "@store/field-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { FieldComponent } from "@features/field/field.component"
import { TeamComponent } from "@features/team/team/team.component"
import { TeamsDesktopComponent } from "@features/team/teams-desktop/teams-desktop.component"
import { AutomaticFieldService } from "@lib/automatic-field-service"
import { Pokemon } from "@lib/model/pokemon"
import { SnackbarService } from "@lib/snackbar.service"
import { SpeedInsightsComponent } from "@pages/speed-calc/speed-insights/speed-insights.component"
import { SpeedListComponent } from "@pages/speed-calc/speed-list/speed-list.component"
import { SpeedMatchService } from "@pages/speed-calc/speed-match.service"

@Component({
  selector: "app-speed-calculator",
  templateUrl: "./speed-calculator.component.html",
  styleUrls: ["./speed-calculator.component.scss"],
  imports: [TeamComponent, TeamsDesktopComponent, FieldComponent, SpeedListComponent, SpeedInsightsComponent],
  providers: [FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "speed" }]
})
export class SpeedCalculatorComponent {
  store = inject(CalculatorStore)
  private automaticFieldService = inject(AutomaticFieldService)
  private fieldStore = inject(FieldStore)
  private speedMatch = inject(SpeedMatchService)
  private snackbar = inject(SnackbarService)

  selectedPokemon = signal<Pokemon>(this.store.team().activePokemon())

  pokemonId = computed(() => this.store.team().activePokemon().id)
  pokemonOnEdit = computed(() => this.store.findPokemonById(this.pokemonId()))

  isPokemonDefault = computed(() => this.store.team().activePokemon().isDefault)

  lastHandledPokemonName = "\0"
  lastHandledAbilityName = "\0"

  constructor() {
    effect(() => {
      const pokemonChanged = this.lastHandledPokemonName != this.pokemonOnEdit().name || this.lastHandledAbilityName != this.pokemonOnEdit().ability.name

      if (pokemonChanged) {
        this.lastHandledPokemonName = this.pokemonOnEdit().name
        this.lastHandledAbilityName = this.pokemonOnEdit().ability.name

        this.automaticFieldService.checkAutomaticField(this.pokemonOnEdit())
      }
    })
  }

  onPokemonSelected(pokemon: Pokemon) {
    this.selectedPokemon.set(pokemon)

    const outcome = this.speedMatch.matchSpeed(this.pokemonId(), pokemon, this.fieldStore.field())

    if (outcome.message) {
      this.snackbar.open(outcome.message)
    }
  }
}
