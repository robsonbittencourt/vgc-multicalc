import { Component, computed, inject, input } from '@angular/core';
import { AllPokemon } from 'src/data/all-pokemon';
import { DataStore } from 'src/data/data-store';
import { InputAutocompleteComponent } from '../input-autocomplete/input-autocomplete.component';

@Component({
  selector: 'app-ability-combo-box',
  templateUrl: './ability-combo-box.component.html',
  styleUrls: ['./ability-combo-box.component.scss'],
  standalone: true,
  imports: [InputAutocompleteComponent]
})
export class AbilityComboBoxComponent {

  data = inject(DataStore)

  pokemonId = input.required<string>()

  pokemon = computed(() => this.data.findPokemonById(this.pokemonId()))

  availableAbilities = computed(() => AllPokemon.instance.abilitiesByName(this.pokemon().name))

}
