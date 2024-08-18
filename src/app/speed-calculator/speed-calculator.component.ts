import { Component, Input, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { Field } from '@smogon/calc';
import { Pokemon } from 'src/lib/pokemon';
import { SpeedCalculatorOptions } from 'src/lib/speed-calculator/speed-calculator-options';
import { SpeedCalculatorService } from 'src/lib/speed-calculator/speed-calculator-service';
import { SpeedDefinition } from 'src/lib/speed-calculator/speed-definition';

@Component({
  selector: 'app-speed-calculator',
  templateUrl: './speed-calculator.component.html',
  styleUrls: ['./speed-calculator.component.scss']
})
export class SpeedCalculatorComponent {

  @Input()
  pokemon: Pokemon

  @Input()
  field: Field

  @Input()
  isTrickRoom: boolean
  
  inSpeedRange: SpeedDefinition[]
  options: SpeedCalculatorOptions = new SpeedCalculatorOptions()

  previousSpeedDefinition: SpeedDefinition[] = []
  previousActualPokemonSpeed: number
  speedOrderChanged: boolean
  speedOrderIncrease: boolean

  evsSpeed: number
  item: string
  status: string
  nature: string

  private differStatusModifiers: KeyValueDiffer<string, any>
  private differField: KeyValueDiffer<string, any>
  private differFieldAttacker: KeyValueDiffer<string, any>
  private differFieldDefender: KeyValueDiffer<string, any>

  private actualTrickRoomState: boolean
  
  constructor(
    private differsStatusModifiers: KeyValueDiffers,
    private differsField: KeyValueDiffers,
    private differsFieldAttacker: KeyValueDiffers,
    private differsFieldDefender: KeyValueDiffers,
    private speedCalculatorService: SpeedCalculatorService
  ) {}

  ngOnInit() {
    this.differStatusModifiers = this.differsStatusModifiers.find(this.pokemon.boosts).create()
    this.differField = this.differsField.find(this.field).create()
    this.differFieldAttacker = this.differsFieldAttacker.find(this.field.attackerSide).create()
    this.differFieldDefender = this.differsFieldDefender.find(this.field.defenderSide).create()

    this.previousActualPokemonSpeed = this.pokemon.modifiedSpe()
    this.actualTrickRoomState = this.isTrickRoom
    this.evsSpeed = this.pokemon.evs.spe!
    this.item = this.pokemon.item
    this.status = this.pokemon.status
  }

  ngDoCheck() {
    const pokemonChanged = this.evsSpeed != this.pokemon.evs.spe || this.item != this.pokemon.item || this.status != this.pokemon.status || this.nature != this.pokemon.nature
    const boostsChanged = this.differStatusModifiers.diff(this.pokemon.boosts)
    const fieldChanged = this.differField.diff(this.field) ||
      this.differFieldAttacker.diff(this.field.attackerSide) ||
      this.differFieldDefender.diff(this.field.defenderSide)
    const isTrickRoomChanged = this.isTrickRoom != this.actualTrickRoomState

    if (pokemonChanged || boostsChanged || fieldChanged || isTrickRoomChanged) {
      this.actualTrickRoomState = this.isTrickRoom
      this.calculateSpeedRange()
    }

    this.evsSpeed = this.pokemon.evs.spe!
    this.item = this.pokemon.item
    this.status = this.pokemon.status
    this.nature = this.pokemon.nature
  }

  calculateSpeedRange() {
    const orderedPokemon = this.speedCalculatorService.orderedPokemon(this.pokemon, this.field, this.isTrickRoom, this.options)
    const actualIndex = orderedPokemon.findIndex(this.isActual)
    const initIndex = actualIndex - 37 >= 0 ? actualIndex - 37 : 0
    const lastIndex = actualIndex + 38
    const inSpeedRange = orderedPokemon.slice(initIndex, lastIndex)
    
    const updatedActualIndex = inSpeedRange.findIndex(this.isActual)
    if (updatedActualIndex < 37) {
      const diff = 37 - updatedActualIndex
      for (let i = 0; i < diff; i++) {
        inSpeedRange.unshift(new SpeedDefinition("", 0, ""))        
      }
    }
    
    this.inSpeedRange = inSpeedRange
    this.verifyChanges(this.inSpeedRange)
  }

  verifyChanges(actualSpeedRange: SpeedDefinition[]) {
    if (this.previousSpeedDefinition[0]?.pokemonName != actualSpeedRange[0].pokemonName) {
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

  isActual(speedDefinition: SpeedDefinition) {
    return speedDefinition.description.includes("Actual")
  }

  toggleSpeedDropMoveActive(speedDropActive: boolean) {
    this.options.speedDropMoveActive = speedDropActive
    this.calculateSpeedRange()
  }

  toggleParalyzedActive(paralyzedActive: boolean) {
    this.options.paralyzedActive = paralyzedActive
    this.calculateSpeedRange()
  }

  toggleChoiceScarfActive(choiceScarfActive: boolean) {
    this.options.choiceScarfActive = choiceScarfActive
    this.calculateSpeedRange()
  }

}

