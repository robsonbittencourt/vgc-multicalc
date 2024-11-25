import { Component, computed, inject, model } from '@angular/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
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
import { FieldStore } from 'src/data/field-store';
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
  
  data = inject(DataStore)
  fieldStore = inject(FieldStore)
  
  pokemon: Pokemon

  regulation = model("Reg H")
  targetName = model("")
  speedModifier = model(0)
  speedDropActive = model(false)
  paralyzedActive = model(false)
  choiceScarfActive = model(false)
  
  options = computed(() => new SpeedCalculatorOptions({
    regulation: this.regulation(), targetName: this.targetName(), speedModifier: this.speedModifier(), speedDropActive: this.speedDropActive(), 
    paralyzedActive: this.paralyzedActive(), choiceScarfActive: this.choiceScarfActive()
  }))

  pokemonNamesByReg = computed(() => speedMeta(this.regulation()).map(s => s.name).sort())

  allPokemonNames = AllPokemon.instance.allPokemonNames
  allItemsNames = Items.instance.allItems()
  allMoveNames = Object.keys(MOVES[9]).splice(1).sort()
  allNatureNames = Object.keys(NATURES)
  availableAbilities: string[]
  
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
    this.availableAbilities = AllPokemon.instance.abilitiesByName(this.pokemon.name)
  }

  beforeChangeEvValue() {
    if (this.pokemon.totalEvs() <= this.MAX_EVS) {
      this.pokemon.evs = this.pokemon.evs
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

  toogleIceWind(enabled: boolean) {
    if (enabled) {
      this.speedModifier.set(-1)
    } else {
      this.speedModifier.set(0)
    }

    this.speedDropActive.set(enabled)
  }

  regulationChanged(regulation: string) {
    this.regulation.set(regulation)
    this.clearPokemon()
  }

  clearPokemon() {
    this.targetName.set("")
  }

}
