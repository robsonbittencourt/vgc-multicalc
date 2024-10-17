import { Component, Input } from '@angular/core';
import { AllPokemon } from 'src/data/all-pokemon';
import { SETDEX_SV } from 'src/data/movesets';
import { MoveSet } from 'src/lib/moveset';
import { Pokemon } from 'src/lib/pokemon';

@Component({
  selector: 'app-pokemon-combo-box',
  templateUrl: './pokemon-combo-box.component.html',
  styleUrls: ['./pokemon-combo-box.component.scss']
})
export class PokemonComboBoxComponent {

  allPokemonNames = AllPokemon.instance.allPokemonNames

  @Input()
  pokemon: Pokemon

  onValueManuallySelected(pokemonName: string) {
    const poke = SETDEX_SV[pokemonName]

    if(poke) {
      this.pokemon.nature = poke.nature
      this.pokemon.item = poke.item
      this.pokemon.ability = poke.ability
      this.pokemon.teraType = poke.teraType
      this.pokemon.evs = poke.evs
      this.pokemon.moveSet = new MoveSet(poke.moves[0], poke.moves[1], poke.moves[2], poke.moves[3])
      this.pokemon.changeTeraStatus(false)      
    } else {
      this.pokemon.nature = "Docile"
      this.pokemon.item = "Leftovers"
      this.pokemon.teraType = "Normal"
      this.pokemon.moveSet = new MoveSet("Tackle", "", "", "")
    }
  }

}
