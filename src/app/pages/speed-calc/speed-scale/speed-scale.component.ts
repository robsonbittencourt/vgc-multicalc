import { Component, computed, effect, inject, input, OnInit, output, PLATFORM_ID, signal } from "@angular/core"
import { isPlatformBrowser } from "@angular/common"
import { CalcStore } from "@store/calc-store"
import { FieldStore } from "@store/field-store"
import { SpeedCalcOptionsStore } from "@store/speed-calc-options-store"
import { Field, Pokemon } from "@multicalc/model"
import { SpeedCalcOptions as SpeedScaleOptions, SpeedTeamPokemon, SpeedDefinition } from "@multicalc/speed-calc"
import { MatButtonModule } from "@angular/material/button"
import { SpeedBoxComponent } from "@pages/speed-calc/speed-box/speed-box.component"
import { SpeedCalcService } from "@pages/speed-calc/speed-calc.service"

@Component({
  selector: "app-speed-scale",
  templateUrl: "./speed-scale.component.html",
  styleUrls: ["./speed-scale.component.scss"],
  imports: [SpeedBoxComponent, MatButtonModule]
})
export class SpeedScaleComponent implements OnInit {
  pokemonId = input.required<string>()
  pokemonEachSide = input.required<number>()
  opponentsNoPaddingThreshold = input<number>(0)

  pokemonSelected = output<Pokemon | undefined>()
  selectionChanged = output<Pokemon | undefined>()
  outspeedRequested = output<Pokemon>()

  store = inject(CalcStore)
  fieldStore = inject(FieldStore)
  optionsStore = inject(SpeedCalcOptionsStore)
  private speedCalcService = inject(SpeedCalcService)

  highlightMyTeam = computed(() => this.optionsStore.showMyTeam())

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  inSpeedRange = signal<SpeedDefinition[]>([])
  selectedPokemon = signal<Pokemon | undefined>(undefined)

  actualSpeedDefinitions: SpeedDefinition[] = []
  actualPokemonSpeed: number
  speedOrderChanged: boolean
  speedOrderIncrease: boolean

  timeoutId: any
  private platformId = inject(PLATFORM_ID)

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return
      this.calculateSpeedRange(this.pokemon(), this.optionsStore.options(), this.fieldStore.field())
    })
  }

  ngOnInit() {
    this.actualPokemonSpeed = this.speedCalcService.modifiedSpeed(this.pokemon(), this.fieldStore.field())
  }

  calculateSpeedRange(pokemon: Pokemon, options: SpeedScaleOptions, field: Field) {
    clearTimeout(this.timeoutId)

    this.timeoutId = setTimeout(() => {
      const range = this.speedCalcService.orderedSpeeds(pokemon, field, this.pokemonEachSide(), this.teamPokemon(options), options, this.opponentsNoPaddingThreshold())
      this.inSpeedRange.set(range)

      this.verifyChanges(range)

      this.clearSelection()
    }, 200)
  }

  private teamPokemon(options: SpeedScaleOptions): SpeedTeamPokemon {
    const opponents = this.store.targets().flatMap(t => t.pokemons())

    const selectedTeam = this.store.teams().find(t => t.id === options.teamId)
    const team = selectedTeam ? selectedTeam.teamMembers.map(m => m.pokemon) : []

    const myTeam = this.store.team().teamMembers.map(m => m.pokemon)

    return { opponents, team, myTeam }
  }

  isSelected(speedDefinition: SpeedDefinition): boolean {
    const selected = this.selectedPokemon()

    if (selected == undefined) return false

    return selected.id === speedDefinition.pokemon?.id
  }

  clearSelection() {
    this.selectedPokemon.set(undefined)
    this.selectionChanged.emit(undefined)
  }

  setPokemonSelected(pokemon: Pokemon) {
    if (pokemon.id === this.pokemonId()) {
      this.clearSelection()

      return
    }

    this.selectedPokemon.set(pokemon)
    this.pokemonSelected.emit(pokemon)
  }

  requestOutspeed() {
    const pokemon = this.selectedPokemon()

    if (pokemon == undefined) return

    this.outspeedRequested.emit(pokemon)
  }

  private verifyChanges(newSpeedDefinitions: SpeedDefinition[]) {
    this.speedOrderChanged = this.verifyIfOrderChanged(newSpeedDefinitions)
    this.speedOrderIncrease = this.actualPokemonSpeed < this.speedCalcService.modifiedSpeed(this.pokemon(), this.fieldStore.field())

    this.actualSpeedDefinitions = newSpeedDefinitions
    this.actualPokemonSpeed = this.speedCalcService.modifiedSpeed(this.pokemon(), this.fieldStore.field())
  }

  private verifyIfOrderChanged(newSpeedDefinitions: SpeedDefinition[]): boolean {
    const firstPokemonChange = !this.actualSpeedDefinitions[0]?.equals(newSpeedDefinitions[0])
    const lastPokemonChange = !this.actualSpeedDefinitions[this.actualSpeedDefinitions.length - 1]?.equals(newSpeedDefinitions[newSpeedDefinitions.length - 1])

    return firstPokemonChange || lastPokemonChange
  }
}
