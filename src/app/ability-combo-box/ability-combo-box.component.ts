import { Component, Input } from '@angular/core';
import { AllPokemon } from 'src/data/all-pokemon';
import { Pokemon } from 'src/lib/pokemon';

@Component({
  selector: 'app-ability-combo-box',
  templateUrl: './ability-combo-box.component.html',
  styleUrls: ['./ability-combo-box.component.scss']
})
export class AbilityComboBoxComponent {

  actualPokemonName: String
  availableAbilities: string[]

  @Input()
  pokemon: Pokemon

  ngOnInit() {
    this.actualPokemonName = this.pokemon.name
    this.availableAbilities = AllPokemon.instance.abilitiesByName(this.pokemon.name)
  }

  ngDoCheck() {
    if (this.actualPokemonName != this.pokemon.name) {
      this.actualPokemonName = this.pokemon.name
      this.availableAbilities = AllPokemon.instance.abilitiesByName(this.pokemon.name)
      
      if (!this.availableAbilities.find(ability => this.pokemon.ability == ability)) {
        this.pokemon.ability = this.availableAbilities[0]
      }
    }
  }

}
