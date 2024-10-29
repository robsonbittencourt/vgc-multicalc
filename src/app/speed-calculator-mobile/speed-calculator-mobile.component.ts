import { Component, EventEmitter, KeyValueDiffer, KeyValueDiffers, Output, inject } from '@angular/core';
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MOVES, NATURES } from '@smogon/calc';
import { AllPokemon } from 'src/data/all-pokemon';
import { Items } from 'src/data/items';
import { SETDEX_SV } from 'src/data/movesets';
import { DataStore } from 'src/lib/data-store.service';
import { Pokemon } from 'src/lib/pokemon';
import { SpeedCalculatorOptions } from 'src/lib/speed-calculator/speed-calculator-options';
import { speedMeta } from 'src/lib/speed-calculator/speed-meta';
import { InputAutocompleteComponent } from '../input-autocomplete/input-autocomplete.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelect } from '@angular/material/select';
import { MatTooltip } from '@angular/material/tooltip';
import { EvSliderComponent } from '../ev-slider/ev-slider.component';
import { SpeedScaleComponent } from '../speed-scale/speed-scale.component';

@Component({
    selector: 'app-speed-calculator-mobile',
    templateUrl: './speed-calculator-mobile.component.html',
    styleUrls: ['./speed-calculator-mobile.component.scss'],
    standalone: true,
    imports: [InputAutocompleteComponent, MatCheckbox, ReactiveFormsModule, FormsModule, MatTooltip, EvSliderComponent, SpeedScaleComponent, MatFormField, MatSelect, MatOption, MatButtonToggleGroup, MatButtonToggle, MatIcon]
})
export class SpeedCalculatorMobileComponent {
  @Output() 
  dataChangedEvent = new EventEmitter<any>()
  
  data = inject(DataStore)
  private differs = inject(KeyValueDiffers)
  private differsStatusModifiers = inject(KeyValueDiffers)

  private differ: KeyValueDiffer<string, any>
  private differStatusModifiers: KeyValueDiffer<string, any>

  pokemon: Pokemon
  options: SpeedCalculatorOptions = new SpeedCalculatorOptions()

  allPokemonNames = AllPokemon.instance.allPokemonNames
  allItemsNames = Items.instance.allItems()
  allMoveNames = Object.keys(MOVES[9]).splice(1).sort()
  allNatureNames = Object.keys(NATURES)
  availableAbilities: string[]

  pokemonNamesByReg: string[]
  
  MAX_EVS = 508
  
  statusConditions = [
    "Healthy", "Paralysis"
  ]

  statsModifiers = [
    { value: 6, viewValue: "+6"}, { value: 5, viewValue: "+5"}, { value: 4, viewValue: "+4"},
    { value: 3, viewValue: "+3"}, { value: 2, viewValue: "+2"}, { value: 1, viewValue: "+1"},
    { value: 0, viewValue: "--"},
    { value: -1, viewValue: "-1"}, { value: -2, viewValue: "-2"}, { value: -3, viewValue: "-3"},
    { value: -4, viewValue: "-4"}, { value: -5, viewValue: "-5"}, { value: -6, viewValue: "-6"},
  ]

  ngOnInit() {
    this.pokemon = this.data.defaultLeftPokemon()
    this.differ = this.differs.find(this.pokemon).create()
    this.differStatusModifiers = this.differsStatusModifiers.find(this.pokemon.boosts).create()
    this.pokemonNamesByReg = speedMeta(this.options.regulation).map(s => s.name).sort()
  }

  ngDoCheck() {
    const pokemonChanged = this.differ.diff(this.pokemon)
    const boostsChanged = this.differStatusModifiers.diff(this.pokemon.boosts) 
    
    if (pokemonChanged || boostsChanged) {
      this.dataChangedEvent.emit(this.pokemon)
    }
  }
 
  beforeChangeEvValue() {
    if (this.pokemon.totalEvs() <= this.MAX_EVS) {
      this.pokemon.evs = this.pokemon.evs
    }
  }

  onChangeEvValue() {
    if (this.pokemon.totalEvs() <= this.MAX_EVS) {
      this.pokemon.evs = this.pokemon.evs
    } else {
      this.pokemon.evs = this.pokemon.evsStorage
    }    
  }

  onChangeIvValue() {
    this.pokemon.ivs = this.pokemon.ivs
  }

  onPokemonSelected(pokemonName: string) {
    this.availableAbilities = AllPokemon.instance.abilitiesByName(pokemonName)        
  }

  onValueManuallySelected(pokemonName: string) {
    this.availableAbilities = AllPokemon.instance.abilitiesByName(pokemonName)
    this.pokemon.ability = this.availableAbilities[0]
    this.pokemon.evs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }

    const poke = SETDEX_SV[pokemonName]

    if(poke) {
      this.pokemon.nature = poke.nature
      this.pokemon.item = poke.item
      this.pokemon.ability = poke.ability
    } else {
      this.pokemon.nature = "Docile"
      this.pokemon.item = "Leftovers"
    }   
  }

  toogleCommanderAbility() {
    this.pokemon.commanderActivated = !this.pokemon.commanderActivated
    
    if (this.pokemon.commanderActivated) {
      this.pokemon.boosts.spe = 2
    } else {
      this.pokemon.boosts.spe = 0
    }
  }

  toogleParadoxAbility() {
    this.pokemon.abilityOn = !this.pokemon.abilityOn
  }

  toggleChangeWeather(change: MatButtonToggleChange) {
    const toggle = change.source
    
    if(change.value.some((item: any) => item == toggle.value)) {
      toggle.buttonToggleGroup.value = [change.source.value]
    }
    
    this.data.field.weather = toggle.buttonToggleGroup.value[0]
  }

  toggleChangeTerrain(change: MatButtonToggleChange) {
    if(change.source.checked) {
      this.data.field.terrain = "Electric"  
    } else {
      this.data.field.terrain = undefined
    }
  }

  regulationChanged(regulation: string) {
    this.options.regulation = regulation
    this.clearPokemon()
    this.pokemonNamesByReg = speedMeta(this.options.regulation).map(s => s.name).sort()
  }

  clearPokemon() {
    this.options.targetName = ""
  }

}
