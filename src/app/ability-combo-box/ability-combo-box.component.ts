import { Component, computed, inject, input } from '@angular/core';
import { AllPokemon } from 'src/data/all-pokemon';
import { CalculatorStore } from 'src/data/store/calculator-store';
import { InputAutocompleteComponent } from '../input-autocomplete/input-autocomplete.component';

@Component({
    selector: 'app-ability-combo-box',
    templateUrl: './ability-combo-box.component.html',
    styleUrls: ['./ability-combo-box.component.scss'],
    imports: [InputAutocompleteComponent]
})
export class AbilityComboBoxComponent {

  store = inject(CalculatorStore)

  pokemonId = input.required<string>()

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  availableAbilities = computed(() => AllPokemon.instance.abilitiesByName(this.pokemon().name))

}
