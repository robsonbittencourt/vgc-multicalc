import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokePasteParserService } from 'src/lib/poke-paste-parser.service';
import { Pokemon } from 'src/lib/pokemon';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {

  constructor(private pokePasteService: PokePasteParserService) {}

  @Input() 
  team: Pokemon[]

  @Output() 
  allTeamChanged = new EventEmitter<Pokemon[]>()

  pokePaste = ""
  errorMessagePokePaste: string = ""

  pokemonActivated(pokemon: Pokemon) {
    this.team.forEach(p => {
      if (!p.equals(pokemon)) {
        p.active = false
      }
    })
  }

  async addFromPokePaste() {
    try {
      this.errorMessagePokePaste = ""
      this.team = await this.pokePasteService.parseFromPokePaste(this.pokePaste)
      this.team[0].active = true
      this.allTeamChanged.emit(this.team)
    } catch(ex) {
      this.errorMessagePokePaste = "Invalid Poke paste. Check if it is the version with EVs"
    } finally {
      this.pokePaste = ""
    }
  }

  addPokemon() {

  }

  removeAll() {
    // this.team = []
  }

}
