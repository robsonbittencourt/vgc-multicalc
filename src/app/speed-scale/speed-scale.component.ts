import { Component, computed, effect, inject, input, signal, OnInit } from "@angular/core"
import { SpeedBoxComponent } from "@app/speed-box/speed-box.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"
import { ACTUAL } from "@lib/constants"
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

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  optionsStore = inject(SpeedCalcOptionsStore)

  private speedCalculatorService = inject(SpeedCalculatorService)

  inSpeedRange = signal<SpeedDefinition[]>([])

  previousSpeedDefinition: SpeedDefinition[] = []
  previousActualPokemonSpeed: number
  speedOrderChanged: boolean
  speedOrderIncrease: boolean

  timeoutId: any

  constructor() {
    effect(() => {
      this.calculateSpeedRange(this.pokemon(), this.optionsStore.options(), this.fieldStore.field())
    })
  }

  ngOnInit() {
    this.previousActualPokemonSpeed = this.pokemon().modifiedSpe()
  }

  calculateSpeedRange(pokemon: Pokemon, options: SpeedScaleOptions, field: Field) {
    clearTimeout(this.timeoutId)

    this.timeoutId = setTimeout(() => {
      const pokemonBySideActual = this.pokemonEachSide()
      const orderedPokemon = this.speedCalculatorService.orderedPokemon(pokemon, field, options)

      if (options.targetName == "") {
        const actualIndex = orderedPokemon.findIndex(this.isActual)
        const initIndex = actualIndex - pokemonBySideActual >= 0 ? actualIndex - pokemonBySideActual : 0
        const lastIndex = actualIndex + pokemonBySideActual + 1
        const inSpeedRange = orderedPokemon.slice(initIndex, lastIndex)

        const updatedActualIndex = inSpeedRange.findIndex(this.isActual)
        if (updatedActualIndex < this.pokemonEachSide()) {
          const diff = pokemonBySideActual - updatedActualIndex
          for (let i = 0; i < diff; i++) {
            inSpeedRange.unshift(new SpeedDefinition("", 0, ""))
          }
        }

        this.inSpeedRange.set(inSpeedRange)
      } else {
        const pokemon = new Pokemon(options.targetName)
        this.inSpeedRange.set(orderedPokemon.filter(s => s.pokemonName == pokemon.name || this.isActual(s)))
      }

      this.verifyChanges(this.inSpeedRange())
    }, 200)
  }

  verifyChanges(actualSpeedRange: SpeedDefinition[]) {
    const firstPokemonChange = !this.previousSpeedDefinition[0]?.equals(actualSpeedRange[0])
    const lastPokemonChange = !this.previousSpeedDefinition[this.previousSpeedDefinition.length - 1]?.equals(actualSpeedRange[actualSpeedRange.length - 1])

    const previousYoursDescription = this.previousSpeedDefinition.filter(s => this.isActual(s))[0]?.description
    const actualYoursDescription = actualSpeedRange.filter(s => this.isActual(s))[0]?.description
    const yoursDescriptionChange = previousYoursDescription != actualYoursDescription

    if (firstPokemonChange || lastPokemonChange || yoursDescriptionChange) {
      this.speedOrderChanged = true
    } else {
      this.speedOrderChanged = false
    }

    if (this.previousActualPokemonSpeed < this.pokemon().modifiedSpe()) {
      this.speedOrderIncrease = true
    } else {
      this.speedOrderIncrease = false
    }

    this.previousSpeedDefinition = actualSpeedRange
    this.previousActualPokemonSpeed = this.pokemon().modifiedSpe()
  }

  isActual(speedDefinition: SpeedDefinition): boolean {
    return speedDefinition.description.includes(ACTUAL)
  }
}
