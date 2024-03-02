import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-pokemon-card',
  templateUrl: './add-pokemon-card.component.html',
  styleUrls: ['./add-pokemon-card.component.scss']
})
export class AddPokemonCardComponent {

  @Output()
  pokemonAddedToTeam = new EventEmitter<any>()

  addPokemon() {
    this.pokemonAddedToTeam.emit()
  }

}
