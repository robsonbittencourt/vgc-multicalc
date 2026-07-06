import { Component, computed, effect, inject, signal } from "@angular/core"
import { CalcStore } from "@store/calc-store"
import { FieldStore } from "@store/field-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { FieldComponent } from "@features/field/field.component"
import { TeamComponent } from "@features/team/team/team.component"
import { TeamsDesktopComponent } from "@features/team/teams-desktop/teams-desktop.component"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"
import { Pokemon } from "@multicalc/model"
import { SnackbarService } from "@core/services/snackbar.service"
import { SpeedInsightsComponent } from "@pages/speed-calc/speed-insights/speed-insights.component"
import { SpeedListComponent } from "@pages/speed-calc/speed-list/speed-list.component"
import { SpeedMatchService } from "@pages/speed-calc/speed-match.service"

@Component({
  selector: "app-speed-calc",
  templateUrl: "./speed-calc.component.html",
  styleUrls: ["./speed-calc.component.scss"],
  imports: [TeamComponent, TeamsDesktopComponent, FieldComponent, SpeedListComponent, SpeedInsightsComponent],
  providers: [FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "speed" }]
})
export class SpeedCalcComponent {
  store = inject(CalcStore)
  private automaticFieldService = inject(AutomaticFieldService)
  private fieldStore = inject(FieldStore)
  private speedMatch = inject(SpeedMatchService)
  private snackbar = inject(SnackbarService)

  selectedPokemon = signal<Pokemon | undefined>(this.store.team().activePokemon())

  pokemonId = computed(() => this.store.team().activePokemon()?.id)
  pokemonOnEdit = computed(() => this.store.findNullablePokemonById(this.pokemonId() ?? ""))

  isPokemonDefault = computed(() => {
    const pokemon = this.store.team().activePokemon()
    return pokemon == undefined
  })

  lastHandledPokemonName = "\0"
  lastHandledAbilityName = "\0"

  constructor() {
    effect(() => {
      const pokemon = this.pokemonOnEdit()

      if (pokemon == undefined) return

      const pokemonChanged = this.lastHandledPokemonName != pokemon.name || this.lastHandledAbilityName != pokemon.ability.name

      if (pokemonChanged) {
        this.lastHandledPokemonName = pokemon.name
        this.lastHandledAbilityName = pokemon.ability.name

        this.automaticFieldService.checkAutomaticField(pokemon)
      }
    })
  }

  onPokemonSelected(pokemon: Pokemon) {
    this.selectedPokemon.set(pokemon)

    const pokemonId = this.pokemonId()

    if (pokemonId == undefined) return

    const outcome = this.speedMatch.matchSpeed(pokemonId, pokemon, this.fieldStore.field())

    if (outcome.message) {
      this.snackbar.open(outcome.message)
    }
  }
}
