import { Component, computed, effect, inject, input, linkedSignal, OnInit, output, PLATFORM_ID, signal } from "@angular/core"
import { isPlatformBrowser } from "@angular/common"
import { CalculatorStore } from "@store/calculator-store"
import { FieldStore } from "@store/field-store"
import { SpeedCalcOptionsStore } from "@store/speed-calc-options-store"
import { Field, Pokemon } from "@multicalc/model"
import { getFinalSpeed } from "@multicalc/stats"
import { SpeedCalculatorOptions as SpeedScaleOptions, SpeedCalculatorService, SpeedTeamPokemon, SpeedDefinition } from "@multicalc/speed-calculator"
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

  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  optionsStore = inject(SpeedCalcOptionsStore)
  private speedCalculatorService = new SpeedCalculatorService()

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
      const range = this.speedCalculatorService.orderedPokemon(pokemon, field, this.pokemonEachSide(), this.teamPokemon(options), options, this.opponentsNoPaddingThreshold())
      this.inSpeedRange.set(range)

      this.verifyChanges(range)
      this.setPokemonSelected(this.pokemon())
    }, 200)
  }

  private teamPokemon(options: SpeedScaleOptions): SpeedTeamPokemon {
    const opponents = this.store
      .targets()
      .flatMap(t => [t.pokemon, t.secondPokemon])
      .filter((p): p is Pokemon => p != null && !p.isDefault)

    const selectedTeam = this.store.teams().find(t => t.id === options.teamId)
    const team = selectedTeam ? selectedTeam.teamMembers.map(m => m.pokemon).filter(p => !p.isDefault) : []

    const myTeam = this.store
      .team()
      .teamMembers.map(m => m.pokemon)
      .filter(p => !p.isDefault)

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
