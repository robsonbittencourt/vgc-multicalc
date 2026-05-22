import { Component, computed, effect, inject, signal } from "@angular/core"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { FIELD_CONTEXT } from "@data/store/tokens/field-context.token"
import { FieldComponent } from "@features/field/field.component"
import { TeamComponent } from "@features/team/team/team.component"
import { TeamsDesktopComponent } from "@features/team/teams-desktop/teams-desktop.component"
import { AutomaticFieldService } from "@lib/automatic-field-service"
import { Pokemon } from "@lib/model/pokemon"
import { SpeedInsightsComponent } from "@pages/speed-calc/speed-insights/speed-insights.component"
import { SpeedListComponent } from "@pages/speed-calc/speed-list/speed-list.component"

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

  selectedPokemon = signal<Pokemon>(this.store.team().activePokemon())

  pokemonId = computed(() => this.store.team().activePokemon().id)
  pokemonOnEdit = computed(() => this.store.findPokemonById(this.pokemonId()))

  isPokemonDefault = computed(() => this.store.team().activePokemon().isDefault)
  isChampions = computed(() => this.store.game() === "champions")

  lastHandledPokemonName = "\0"
  lastHandledAbilityName = "\0"
  lastHandledGame = ""

  constructor() {
    effect(() => {
      const pokemonChanged = this.lastHandledPokemonName != this.pokemonOnEdit().name || this.lastHandledAbilityName != this.pokemonOnEdit().ability.name

      if (pokemonChanged) {
        this.lastHandledPokemonName = this.pokemonOnEdit().name
        this.lastHandledAbilityName = this.pokemonOnEdit().ability.name

        this.automaticFieldService.checkAutomaticField(this.pokemonOnEdit())
      }
    })

    effect(() => {
      const game = this.store.game()

      if (game !== this.lastHandledGame) {
        this.lastHandledGame = game
        this.selectedPokemon.set(this.store.team().activePokemon())
      }
    })
  }
}
