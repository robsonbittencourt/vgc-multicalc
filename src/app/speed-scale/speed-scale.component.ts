import { Component, Input, KeyValueDiffer, KeyValueDiffers, effect, inject } from '@angular/core';
import { Pokemon } from 'src/lib/pokemon';
import { SpeedCalculatorOptions as SpeedScaleOptions } from 'src/lib/speed-calculator/speed-calculator-options';
import { SpeedCalculatorService } from 'src/lib/speed-calculator/speed-calculator-service';
import { SpeedDefinition } from 'src/lib/speed-calculator/speed-definition';
import { DataStore } from '../../lib/data-store.service';

import { FieldStore } from 'src/data/field-store';
import { Field } from 'src/lib/field';
import { SpeedBoxComponent } from '../speed-box/speed-box.component';

@Component({
    selector: 'app-speed-scale',
    templateUrl: './speed-scale.component.html',
    styleUrls: ['./speed-scale.component.scss'],
    standalone: true,
    imports: [SpeedBoxComponent]
})
export class SpeedScaleComponent {
  @Input()
  pokemon: Pokemon

  @Input()
  options: SpeedScaleOptions = new SpeedScaleOptions()

  @Input()
  pokemonEachSide: number

  data = inject(DataStore)
  fieldStore = inject(FieldStore)
  private differsStatusModifiers = inject(KeyValueDiffers)
  private differsOptions = inject(KeyValueDiffers)
  private speedCalculatorService = inject(SpeedCalculatorService)

  private differStatusModifiers: KeyValueDiffer<string, any>
  private differOptions: KeyValueDiffer<string, any>

  statsModifierValue: number = 0
  statsModifiers = [
    { value: 6, viewValue: "+6"}, { value: 5, viewValue: "+5"}, { value: 4, viewValue: "+4"},
    { value: 3, viewValue: "+3"}, { value: 2, viewValue: "+2"}, { value: 1, viewValue: "+1"},
    { value: 0, viewValue: "--"},
    { value: -1, viewValue: "-1"}, { value: -2, viewValue: "-2"}, { value: -3, viewValue: "-3"},
    { value: -4, viewValue: "-4"}, { value: -5, viewValue: "-5"}, { value: -6, viewValue: "-6"},
  ]
  speedDropMoveActive: boolean = false

  get statsModifier(): number {
    return this.statsModifierValue
  }

  set statsModifier(statsModifier: number) {
    this.statsModifierValue = statsModifier
    this.options.speedModifier = statsModifier

    if(statsModifier != 1) {
      this.speedDropMoveActive = false
    }
  }
  
  inSpeedRange: SpeedDefinition[]

  previousSpeedDefinition: SpeedDefinition[] = []
  previousActualPokemonSpeed: number
  speedOrderChanged: boolean
  speedOrderIncrease: boolean

  evsSpeed: number
  ivsSpeed: number
  item: string
  status: string
  nature: string
  ability: string
  abilityOn: boolean

  timeoutId: any

  constructor() {
    effect(() => {
      this.calculateSpeedRange(this.fieldStore.field())
    })
  }

  ngOnInit() {
    this.differStatusModifiers = this.differsStatusModifiers.find(this.pokemon.boosts).create()
    this.differOptions = this.differsOptions.find(this.options).create()

    this.previousActualPokemonSpeed = this.pokemon.modifiedSpe()
    this.evsSpeed = this.pokemon.evs.spe!
    this.ivsSpeed = this.pokemon.ivs.spe!
    this.item = this.pokemon.item
    this.status = this.pokemon.status
  }

  ngDoCheck() {
    const pokemonChanged = this.evsSpeed != this.pokemon.evs.spe || this.ivsSpeed != this.pokemon.ivs.spe || this.item != this.pokemon.item || this.status != this.pokemon.status || this.nature != this.pokemon.nature || this.ability != this.pokemon.ability || this.abilityOn != this.pokemon.abilityOn
    const boostsChanged = this.differStatusModifiers.diff(this.pokemon.boosts)
    const optionsChanged = this.differOptions.diff(this.options)
    
    if (pokemonChanged || boostsChanged || optionsChanged) {
      this.calculateSpeedRange(this.fieldStore.field())
    }

    this.evsSpeed = this.pokemon.evs.spe!
    this.ivsSpeed = this.pokemon.ivs.spe!
    this.item = this.pokemon.item
    this.status = this.pokemon.status
    this.nature = this.pokemon.nature
    this.ability = this.pokemon.ability
    this.abilityOn = this.pokemon.abilityOn
  }

  calculateSpeedRange(field: Field) {
    clearTimeout(this.timeoutId)

    this.timeoutId = setTimeout(() => {
      const pokemonBySideActual = this.pokemonEachSide
      const orderedPokemon = this.speedCalculatorService.orderedPokemon(this.pokemon, field, this.options)
      
      if (this.options.targetName == "") {
        const actualIndex = orderedPokemon.findIndex(this.isActual)
        const initIndex = actualIndex - pokemonBySideActual >= 0 ? actualIndex - pokemonBySideActual : 0
        const lastIndex = actualIndex + pokemonBySideActual + 1
        const inSpeedRange = orderedPokemon.slice(initIndex, lastIndex)
        
        const updatedActualIndex = inSpeedRange.findIndex(this.isActual)
        if (updatedActualIndex < this.pokemonEachSide) {
          const diff = pokemonBySideActual - updatedActualIndex
          for (let i = 0; i < diff; i++) {
            inSpeedRange.unshift(new SpeedDefinition("", 0, ""))        
          }
        }
        
        this.inSpeedRange = inSpeedRange
      } else {
        const pokemon = new Pokemon(this.options.targetName)
        this.inSpeedRange = orderedPokemon.filter(s => s.pokemonName == pokemon.name || this.isActual(s))
      }

      this.verifyChanges(this.inSpeedRange)
    }, 100)    
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

    if (this.previousActualPokemonSpeed < this.pokemon.modifiedSpe()) {
      this.speedOrderIncrease = true
    } else {
      this.speedOrderIncrease = false
    }

    this.previousSpeedDefinition = actualSpeedRange
    this.previousActualPokemonSpeed = this.pokemon.modifiedSpe()
  }

  isActual(speedDefinition: SpeedDefinition): boolean {
    return speedDefinition.description.includes("Actual")
  }

}

