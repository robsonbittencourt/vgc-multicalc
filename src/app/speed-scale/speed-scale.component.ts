import { Component, Input, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { Pokemon } from 'src/lib/pokemon';
import { SpeedCalculatorOptions as SpeedScaleOptions } from 'src/lib/speed-calculator/speed-calculator-options';
import { SpeedCalculatorService } from 'src/lib/speed-calculator/speed-calculator-service';
import { SpeedDefinition } from 'src/lib/speed-calculator/speed-definition';
import { DataStore } from '../../lib/data-store.service';

@Component({
  selector: 'app-speed-scale',
  templateUrl: './speed-scale.component.html',
  styleUrls: ['./speed-scale.component.scss']
})
export class SpeedScaleComponent {

  statsModifierValue: number = 0
  statsModifiers = [
    { value: 6, viewValue: "+6"}, { value: 5, viewValue: "+5"}, { value: 4, viewValue: "+4"},
    { value: 3, viewValue: "+3"}, { value: 2, viewValue: "+2"}, { value: 1, viewValue: "+1"},
    { value: 0, viewValue: "--"},
    { value: -1, viewValue: "-1"}, { value: -2, viewValue: "-2"}, { value: -3, viewValue: "-3"},
    { value: -4, viewValue: "-4"}, { value: -5, viewValue: "-5"}, { value: -6, viewValue: "-6"},
  ]
  speedDropMoveActive: boolean = false

  @Input()
  pokemon: Pokemon

  @Input()
  options: SpeedScaleOptions = new SpeedScaleOptions()

  @Input()
  pokemonEachSide: number

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

  private differStatusModifiers: KeyValueDiffer<string, any>
  private differField: KeyValueDiffer<string, any>
  private differFieldAttacker: KeyValueDiffer<string, any>
  private differFieldDefender: KeyValueDiffer<string, any>
  private differOptions: KeyValueDiffer<string, any>
  
  constructor(
    public data: DataStore,
    private differsStatusModifiers: KeyValueDiffers,
    private differsField: KeyValueDiffers,
    private differsFieldAttacker: KeyValueDiffers,
    private differsFieldDefender: KeyValueDiffers,
    private differsOptions: KeyValueDiffers,
    private speedCalculatorService: SpeedCalculatorService
  ) {}

  ngOnInit() {
    this.differStatusModifiers = this.differsStatusModifiers.find(this.pokemon.boosts).create()
    this.differField = this.differsField.find(this.data.field).create()
    this.differFieldAttacker = this.differsFieldAttacker.find(this.data.field.attackerSide).create()
    this.differFieldDefender = this.differsFieldDefender.find(this.data.field.defenderSide).create()
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
    const fieldChanged = this.differField.diff(this.data.field) ||
      this.differFieldAttacker.diff(this.data.field.attackerSide) ||
      this.differFieldDefender.diff(this.data.field.defenderSide)
    
    if (pokemonChanged || boostsChanged || optionsChanged || fieldChanged) {
      this.calculateSpeedRange()
    }

    this.evsSpeed = this.pokemon.evs.spe!
    this.ivsSpeed = this.pokemon.ivs.spe!
    this.item = this.pokemon.item
    this.status = this.pokemon.status
    this.nature = this.pokemon.nature
    this.ability = this.pokemon.ability
    this.abilityOn = this.pokemon.abilityOn
  }

  calculateSpeedRange() {
    clearTimeout(this.timeoutId)

    this.timeoutId = setTimeout(() => {
      const pokemonBySideActual = this.pokemonEachSide
      const orderedPokemon = this.speedCalculatorService.orderedPokemon(this.pokemon, this.data.field, this.options.trickRoomActive, this.options)
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
      this.verifyChanges(this.inSpeedRange)
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

