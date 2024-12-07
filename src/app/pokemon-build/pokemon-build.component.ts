import { NgStyle } from '@angular/common'
import { Component, computed, inject, input } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCheckbox } from '@angular/material/checkbox'
import { MatTooltip } from '@angular/material/tooltip'
import { RouterOutlet } from '@angular/router'
import { MOVES, TYPE_CHART } from '@smogon/calc'
import { TypeName } from '@smogon/calc/dist/data/interface'
import { AllPokemon } from 'src/data/all-pokemon'
import { DataStore } from 'src/data/data-store'
import { Items } from 'src/data/items'
import { Natures } from 'src/data/natures'
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
  
  pokemonId = input.required<string>()
  reverse = input<boolean>(false)

  data = inject(DataStore)

  pokemon = computed(() => this.data.findPokemonById(this.pokemonId()))

  MAX_EVS = 508

  allMoveNames = Object.keys(MOVES[9]).splice(1).sort()
  allNatureNames = Natures.instance.natures
  allItemsNames = Items.instance.allItems()
  allTeraTypes = Object.keys(TYPE_CHART[9]).splice(1).sort()
  allPokemonNames = AllPokemon.instance.allPokemonNames
  availableAbilities: string[]
  alliesFainted = ["0", "1", "2", "3", "4", "5", "6", "7"]

  statusConditions = [
    "Healthy", "Sleep", "Poison", "Burn", "Freeze", "Paralysis"
  ]

  moveSelectorDisabled(move: string): boolean {
    return !move || move == this.pokemon().activeMoveName
  }

  activateMove(position: number) {
    this.data.activateMoveByPosition(this.pokemonId(), position)
  }

  alliesFaintedChanged(event: string) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.data.alliesFainted(this.pokemonId(), event, activeMovePosition)
  }

  hitsChanged(event: string) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.data.hits(this.pokemonId(), event, activeMovePosition)
  }

  terastalyzePokemon() {
    if (!this.pokemon().isTerapagos()) {
      this.data.teraTypeActive(this.pokemonId(), !this.pokemon().teraTypeActive)

      if (this.pokemon().isOgerpon()) {
        this.pokemon().changeTeraStatus(this.pokemon().teraTypeActive)
        this.data.ability(this.pokemonId(), this.pokemon().ability)
      }
    }
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
