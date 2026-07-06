import { Component, computed, effect, inject, input, linkedSignal, OnInit, output, PLATFORM_ID, signal } from "@angular/core"
import { isPlatformBrowser } from "@angular/common"
import { CalcStore } from "@store/calc-store"
import { FieldStore } from "@store/field-store"
import { SpeedCalcOptionsStore } from "@store/speed-calc-options-store"
import { Field, Pokemon } from "@multicalc/model"
import { getFinalSpeed } from "@multicalc/stat-calc"
import { SpeedCalcOptions as SpeedScaleOptions, SpeedCalc, SpeedTeamPokemon, SpeedDefinition } from "@multicalc/speed-calc"
import { SpeedBoxComponent } from "@pages/speed-calc/speed-box/speed-box.component"

@Component({
  selector: "app-speed-scale",
  templateUrl: "./speed-scale.component.html",
  styleUrls: ["./speed-scale.component.scss"],
  imports: [SpeedBoxComponent]
})
export class SpeedScaleComponent implements OnInit {
  pokemonId = input.required<string>()
  pokemonEachSide = input.required<number>()
  opponentsNoPaddingThreshold = input<number>(0)

  pokemonSelected = output<Pokemon>()

  store = inject(CalcStore)
  fieldStore = inject(FieldStore)
  optionsStore = inject(SpeedCalcOptionsStore)
  private speedCalcService = new SpeedCalc()

  hideActualDescription = computed(() => this.optionsStore.filterType() === "opponents" || this.optionsStore.filterType() === "team")
  highlightMyTeam = computed(() => this.optionsStore.showMyTeam())

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  inSpeedRange = signal<SpeedDefinition[]>([])
  selectedPokemon = linkedSignal<Pokemon>(() => this.store.findPokemonById(this.pokemonId()))

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
    this.actualPokemonSpeed = getFinalSpeed(this.pokemon(), this.fieldStore.field())
  }

  calculateSpeedRange(pokemon: Pokemon, options: SpeedScaleOptions, field: Field) {
    clearTimeout(this.timeoutId)

    this.timeoutId = setTimeout(() => {
      const range = this.speedCalcService.orderedPokemon(pokemon, field, this.pokemonEachSide(), this.teamPokemon(options), options, this.opponentsNoPaddingThreshold())
      this.inSpeedRange.set(range)

      this.verifyChanges(range)
      this.setPokemonSelected(this.pokemon())
    }, 200)
  }

  private teamPokemon(options: SpeedScaleOptions): SpeedTeamPokemon {
    const opponents = this.store.targets().flatMap(t => t.pokemons())

    const selectedTeam = this.store.teams().find(t => t.id === options.teamId)
    const team = selectedTeam ? selectedTeam.teamMembers.map(m => m.pokemon) : []

    const myTeam = this.store.team().teamMembers.map(m => m.pokemon)

    return { opponents, team, myTeam }
  }

  setPokemonSelected(pokemon: Pokemon) {
    this.selectedPokemon.set(pokemon)
    this.pokemonSelected.emit(pokemon)
  }

  private verifyChanges(newSpeedDefinitions: SpeedDefinition[]) {
    this.speedOrderChanged = this.verifyIfOrderChanged(newSpeedDefinitions)
    this.speedOrderIncrease = this.actualPokemonSpeed < getFinalSpeed(this.pokemon(), this.fieldStore.field())

    this.actualSpeedDefinitions = newSpeedDefinitions
    this.actualPokemonSpeed = getFinalSpeed(this.pokemon(), this.fieldStore.field())
  }

  private verifyIfOrderChanged(newSpeedDefinitions: SpeedDefinition[]): boolean {
    const firstPokemonChange = !this.actualSpeedDefinitions[0]?.equals(newSpeedDefinitions[0])
    const lastPokemonChange = !this.actualSpeedDefinitions[this.actualSpeedDefinitions.length - 1]?.equals(newSpeedDefinitions[newSpeedDefinitions.length - 1])

    return firstPokemonChange || lastPokemonChange
  }
}
