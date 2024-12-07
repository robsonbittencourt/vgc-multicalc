import { Component, computed, inject, input, output } from '@angular/core';
import { AllPokemon } from 'src/data/all-pokemon';
import { DataStore } from 'src/data/data-store';
import { SETDEX_SV } from 'src/data/movesets';
import { InputAutocompleteComponent } from '../input-autocomplete/input-autocomplete.component';

@Component({
  selector: 'app-pokemon-combo-box',
  templateUrl: './pokemon-combo-box.component.html',
  styleUrls: ['./pokemon-combo-box.component.scss'],
  standalone: true,
  imports: [InputAutocompleteComponent]
})
export class PokemonComboBoxComponent {

  data = inject(DataStore)
  
  pokemonId = input.required<string>()

  pokemonChanged = output()

  name = computed(() => this.data.findPokemonById(this.pokemonId()).name)

  allPokemonNames = AllPokemon.instance.allPokemonNames

  onValueManuallySelected(pokemonName: string) {
    const poke = SETDEX_SV[pokemonName]

    if(poke) {
      this.data.name(this.pokemonId(), pokemonName)
      this.data.nature(this.pokemonId(), poke.nature)
      this.data.item(this.pokemonId(), poke.item)
      this.data.ability(this.pokemonId(), poke.ability)
      this.data.teraType(this.pokemonId(), poke.teraType)
      this.data.teraTypeActive(this.pokemonId(), false)
      this.data.evs(this.pokemonId(), poke.evs)
      this.data.moveOne(this.pokemonId(), poke.moves[0])
      this.data.moveTwo(this.pokemonId(), poke.moves[1])
      this.data.moveThree(this.pokemonId(), poke.moves[2])
      this.data.moveFour(this.pokemonId(), poke.moves[3])
      this.data.activateMoveByPosition(this.pokemonId(), 1)
    } else {
      this.data.name(this.pokemonId(), pokemonName)
      this.data.nature(this.pokemonId(), "Docile")
      this.data.item(this.pokemonId(), "Leftovers")
      this.data.ability(this.pokemonId(), AllPokemon.instance.abilitiesByName(pokemonName)[0])
      this.data.teraType(this.pokemonId(), "Normal")
      this.data.evs(this.pokemonId(), { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      this.data.moveOne(this.pokemonId(), "Tackle")
      this.data.moveTwo(this.pokemonId(), "")
      this.data.moveThree(this.pokemonId(), "")
      this.data.moveFour(this.pokemonId(), "")
      this.data.activateMoveByPosition(this.pokemonId(), 1)
    }

    this.pokemonChanged.emit()
  }

}
