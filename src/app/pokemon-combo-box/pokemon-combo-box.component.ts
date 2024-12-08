import { Component, computed, inject, input, output } from '@angular/core';
import { AllPokemon } from 'src/data/all-pokemon';
import { SETDEX_SV } from 'src/data/movesets';
import { CalculatorStore } from 'src/data/store/calculator-store';
import { InputAutocompleteComponent } from '../input-autocomplete/input-autocomplete.component';

@Component({
  selector: 'app-pokemon-combo-box',
  templateUrl: './pokemon-combo-box.component.html',
  styleUrls: ['./pokemon-combo-box.component.scss'],
  standalone: true,
  imports: [InputAutocompleteComponent]
})
export class PokemonComboBoxComponent {

  store = inject(CalculatorStore)
  
  pokemonId = input.required<string>()

  pokemonChanged = output()

  name = computed(() => this.store.findPokemonById(this.pokemonId()).name)

  allPokemonNames = AllPokemon.instance.allPokemonNames

  onValueManuallySelected(pokemonName: string) {
    const poke = SETDEX_SV[pokemonName]

    if(poke) {
      this.store.name(this.pokemonId(), pokemonName)
      this.store.nature(this.pokemonId(), poke.nature)
      this.store.item(this.pokemonId(), poke.item)
      this.store.ability(this.pokemonId(), poke.ability)
      this.store.teraType(this.pokemonId(), poke.teraType)
      this.store.teraTypeActive(this.pokemonId(), false)
      this.store.evs(this.pokemonId(), poke.evs)
      this.store.moveOne(this.pokemonId(), poke.moves[0])
      this.store.moveTwo(this.pokemonId(), poke.moves[1])
      this.store.moveThree(this.pokemonId(), poke.moves[2])
      this.store.moveFour(this.pokemonId(), poke.moves[3])
      this.store.activateMoveByPosition(this.pokemonId(), 1)
    } else {
      this.store.name(this.pokemonId(), pokemonName)
      this.store.nature(this.pokemonId(), "Docile")
      this.store.item(this.pokemonId(), "Leftovers")
      this.store.ability(this.pokemonId(), AllPokemon.instance.abilitiesByName(pokemonName)[0])
      this.store.teraType(this.pokemonId(), "Normal")
      this.store.evs(this.pokemonId(), { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      this.store.moveOne(this.pokemonId(), "Tackle")
      this.store.moveTwo(this.pokemonId(), "")
      this.store.moveThree(this.pokemonId(), "")
      this.store.moveFour(this.pokemonId(), "")
      this.store.activateMoveByPosition(this.pokemonId(), 1)
    }

    this.pokemonChanged.emit()
  }

}
