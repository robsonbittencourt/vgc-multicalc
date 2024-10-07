import { Component, Input } from '@angular/core';
import { AllPokemon } from 'src/data/all-pokemon';
import { SETDEX_SV } from 'src/data/movesets';
import { Move } from 'src/lib/move';
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
      this.pokemon.moveSet.move1 = new Move(poke.moves[0])
      this.pokemon.moveSet.move2 = new Move(poke.moves[1])
      this.pokemon.moveSet.move3 = new Move(poke.moves[2])
      this.pokemon.moveSet.move4 = new Move(poke.moves[3])
      this.pokemon.moveSet.activeMoveByPosition(1, new Move(poke.moves[0]))
      this.pokemon.changeTeraStatus(false)      
    } else {
      this.pokemon.nature = "Docile"
      this.pokemon.item = "Leftovers"
      this.pokemon.teraType = "Normal"
      this.pokemon.moveSet.move1 = new Move("Tackle")
      this.pokemon.moveSet.move2 = new Move("")
      this.pokemon.moveSet.move3 = new Move("")
      this.pokemon.moveSet.move4 = new Move("")
      this.pokemon.moveSet.activeMoveByPosition(1, new Move("Tackle"))
    }
  }

}
