import { Component, computed, input, output } from '@angular/core';
import { AllPokemon } from 'src/data/all-pokemon';
import { Pokemon } from 'src/lib/pokemon';
import { InputAutocompleteComponent } from '../input-autocomplete/input-autocomplete.component';

@Component({
  selector: 'app-ability-combo-box',
  templateUrl: './ability-combo-box.component.html',
  styleUrls: ['./ability-combo-box.component.scss'],
  standalone: true,
  imports: [InputAutocompleteComponent]
})
export class AbilityComboBoxComponent {

  pokemon = input.required<Pokemon>()

  abilityChange = output()

  actualPokemonName = computed(() => this.pokemon().name)
  availableAbilities = computed(() => AllPokemon.instance.abilitiesByName(this.actualPokemonName()))

  valueChange() {
    this.abilityChange.emit()
  }

}
