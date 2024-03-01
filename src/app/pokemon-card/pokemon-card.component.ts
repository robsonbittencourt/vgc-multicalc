import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from 'src/lib/pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {

  @Input() 
  pokemon: Pokemon

  @Output() 
  pokemonActivated = new EventEmitter<Pokemon>()

  activate() {
    if (!this.pokemon.active) {
      this.pokemon.active = true
      this.pokemonActivated.emit(this.pokemon)
    }    
  }

}
