import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/lib/pokemon';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {

  @Input() 
  team: Pokemon[]

  pokePaste = ""

  pokemonActivated(pokemon: Pokemon) {
    this.team.forEach(p => {
      if (!p.equals(pokemon)) {
        p.active = false
      }
    })
  }

  addFromPokePaste() {

  }

  addPokemon() {

  }

  removeAll() {
    // this.team = []
  }

}
