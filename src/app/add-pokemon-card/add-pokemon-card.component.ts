import { Component, EventEmitter, Output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-add-pokemon-card',
    templateUrl: './add-pokemon-card.component.html',
    styleUrls: ['./add-pokemon-card.component.scss'],
    standalone: true,
    imports: [MatCard, MatIcon]
})
export class AddPokemonCardComponent {

  @Output()
  pokemonAddedToTeam = new EventEmitter<any>()

  addPokemon() {
    this.pokemonAddedToTeam.emit()
  }

}
