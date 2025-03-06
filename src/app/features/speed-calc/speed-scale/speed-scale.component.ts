import { Component, computed, effect, inject, input, linkedSignal, OnInit, output, signal } from "@angular/core"
import { SpeedBoxComponent } from "@app/features/speed-calc/speed-box/speed-box.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { SpeedCalculatorOptions as SpeedScaleOptions } from "@lib/speed-calculator/speed-calculator-options"
import { SpeedCalculatorService } from "@lib/speed-calculator/speed-calculator-service"
import { SpeedDefinition } from "@lib/speed-calculator/speed-definition"

@Component({
  selector: "app-speed-scale",
  templateUrl: "./speed-scale.component.html",
  styleUrls: ["./speed-scale.component.scss"],
  imports: [SpeedBoxComponent]
})
export class SpeedScaleComponent implements OnInit {
  pokemonId = input.required<string>()
  pokemonEachSide = input.required<number>()

  pokemonSelected = output<Pokemon>()

  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  optionsStore = inject(SpeedCalcOptionsStore)
  private speedCalculatorService = inject(SpeedCalculatorService)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  inSpeedRange = signal<SpeedDefinition[]>([])
  selectedPokemon = linkedSignal<Pokemon>(() => this.store.findPokemonById(this.pokemonId()))

  actualSpeedDefinitions: SpeedDefinition[] = []
  actualPokemonSpeed: number
  speedOrderChanged: boolean
  speedOrderIncrease: boolean

  timeoutId: any

  constructor() {
    effect(() => {
      this.calculateSpeedRange(this.pokemon(), this.optionsStore.options(), this.fieldStore.field())
    })
  }

  ngOnInit() {
    this.actualPokemonSpeed = this.pokemon().modifiedSpe
  }

  calculateSpeedRange(pokemon: Pokemon, options: SpeedScaleOptions, field: Field) {
    clearTimeout(this.timeoutId)

    this.timeoutId = setTimeout(() => {
      const range = this.speedCalculatorService.orderedPokemon(pokemon, field, this.pokemonEachSide(), options)
      this.inSpeedRange.set(range)

      this.verifyChanges(range)
      this.setPokemonSelected(this.pokemon())
    }, 200)
  }

  setPokemonSelected(pokemon: Pokemon) {
    this.selectedPokemon.set(pokemon)
    this.pokemonSelected.emit(pokemon)
  }

  private verifyChanges(newSpeedDefinitions: SpeedDefinition[]) {
    this.speedOrderChanged = this.verifyIfOrderChanged(newSpeedDefinitions)
    this.speedOrderIncrease = this.actualPokemonSpeed < this.pokemon().modifiedSpe

    this.actualSpeedDefinitions = newSpeedDefinitions
    this.actualPokemonSpeed = this.pokemon().modifiedSpe
  }

  private verifyIfOrderChanged(newSpeedDefinitions: SpeedDefinition[]): boolean {
    const firstPokemonChange = !this.actualSpeedDefinitions[0]?.equals(newSpeedDefinitions[0])
    const lastPokemonChange = !this.actualSpeedDefinitions[this.actualSpeedDefinitions.length - 1]?.equals(newSpeedDefinitions[newSpeedDefinitions.length - 1])

    return firstPokemonChange || lastPokemonChange
  }
}
