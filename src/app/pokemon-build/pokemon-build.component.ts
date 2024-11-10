import { NgStyle } from '@angular/common'
import { Component, input, model, output } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCheckbox } from '@angular/material/checkbox'
import { MatTooltip } from '@angular/material/tooltip'
import { RouterOutlet } from '@angular/router'
import { MOVES, TYPE_CHART } from '@smogon/calc'
import { TypeName } from '@smogon/calc/dist/data/interface'
import { AllPokemon } from 'src/data/all-pokemon'
import { Items } from 'src/data/items'
import { Natures } from 'src/data/natures'
import { Move } from 'src/lib/move'
import { Pokemon } from 'src/lib/pokemon'
import { AbilityComboBoxComponent } from '../ability-combo-box/ability-combo-box.component'
import { EvSliderComponent } from '../ev-slider/ev-slider.component'
import { InputAutocompleteComponent } from '../input-autocomplete/input-autocomplete.component'
import { PokemonComboBoxComponent } from '../pokemon-combo-box/pokemon-combo-box.component'

@Component({
  selector: 'app-pokemon-build',
  templateUrl: './pokemon-build.component.html',
  styleUrls: ['./pokemon-build.component.scss'],
  standalone: true,
  imports: [PokemonComboBoxComponent, NgStyle, InputAutocompleteComponent, MatTooltip, MatCheckbox, ReactiveFormsModule, FormsModule, AbilityComboBoxComponent, EvSliderComponent, RouterOutlet]
})
export class PokemonBuildComponent {
  
  pokemon = model.required<Pokemon>()

  reverse = input<boolean>(false)

  pokemonChange = output<Pokemon>()

  MAX_EVS = 508

  allMoveNames = Object.keys(MOVES[9]).splice(1).sort()
  allNatureNames = Natures.instance.natures
  allItemsNames = Items.instance.allItems()
  allTeraTypes = Object.keys(TYPE_CHART[9]).splice(1).sort()
  allPokemonNames = AllPokemon.instance.allPokemonNames
  availableAbilities: string[]
  commanderActivated = false
  alliesFainted = ["0", "1", "2", "3", "4", "5", "6", "7"]

  statusConditions = [
    "Healthy", "Sleep", "Poison", "Burn", "Freeze", "Paralysis"
  ]

  beforeChangeEvValue() {
    if (this.pokemon().totalEvs() <= this.MAX_EVS) {
      this.pokemon().evs = this.pokemon().evs
    }

    this.pokemonChange.emit(this.pokemon())
  }

  onChangeEvValue() {
    if (this.pokemon().totalEvs() <= this.MAX_EVS) {
      this.pokemon().evs = this.pokemon().evs
    } else {
      this.pokemon().evs = this.pokemon().evsStorage
    }
    
    this.pokemonChange.emit(this.pokemon())
  }

  onChangeIvValue() {
    this.pokemon().ivs = this.pokemon().ivs
    this.pokemonChange.emit(this.pokemon())
  }

  moveSelectorDisabled(move: string): boolean {
    return !move || move == this.pokemon().activeMoveName
  }

  move1Selected(move: string) {
    this.pokemon().moveSet.move1 = new Move(move)
  }

  move2Selected(move: string) {
    this.pokemon().moveSet.move2 = new Move(move)
  }

  move3Selected(move: string) {
    this.pokemon().moveSet.move3 = new Move(move)
  }

  move4Selected(move: string) {
    this.pokemon().moveSet.move4 = new Move(move)
  }

  activateMove1() {
    this.activateMove(1)
  }

  activateMove2() {
    this.activateMove(2)
  }

  activateMove3() {
    this.activateMove(3)
  }

  activateMove4() {
    this.activateMove(4)
  }

  private activateMove(position: number) {
    this.pokemon().moveSet.activeMoveByPosition(position)
    this.pokemonChanged()
  }

  pokemonChanged() {
    this.pokemon.set(this.pokemon().clone())
    this.pokemonChange.emit(this.pokemon())
  }

  terastalyzePokemon() {
    if (this.pokemon().isTerapagos()) return 

    const teraActived = !this.pokemon().teraTypeActive
    this.pokemon().changeTeraStatus(teraActived)

    this.pokemonChanged()
  }

  toogleCommanderAbility() {
    this.pokemon().commanderActivated = !this.commanderActivated
    this.commanderActivated = !this.commanderActivated
    this.pokemonChange.emit(this.pokemon())
  }

  toogleParadoxAbility() {
    this.pokemon().abilityOn = !this.pokemon().abilityOn
    this.pokemonChange.emit(this.pokemon())
  }

  typeStyle(type?: TypeName): any {
    switch(type) { 
      case "Normal": { return { 'background-color': '#9FA19F' } }
      case "Fighting": { return { 'background-color': '#FF8000' } }
      case "Flying": { return { 'background-color': '#81B9EF' } }
      case "Poison": { return { 'background-color': '#9141CB' } }
      case "Ground": { return { 'background-color': '#915121' } }
      case "Rock": { return { 'background-color': '#AFA981' } }
      case "Bug": { return { 'background-color': '#91A119' } }
      case "Ghost": { return { 'background-color': '#704170' } }
      case "Steel": { return { 'background-color': '#60A1B8' } }
      case "Fire": { return { 'background-color': '#E62829' } }
      case "Water": { return { 'background-color': '#2980EF' } }
      case "Grass": { return { 'background-color': '#3FA129' } }
      case "Electric": { return { 'background-color': '#FAC000' } }
      case "Psychic": { return { 'background-color': '#EF4179' } }
      case "Ice": { return { 'background-color': '#3DCEF3' } }
      case "Dragon": { return { 'background-color': '#5060E1' } }
      case "Dark": { return { 'background-color': '#624D4E' } }
      case "Fairy": { return { 'background-color': '#EF70EF' } }
       
      default: { 
         break; 
      } 
    }
  }


}
