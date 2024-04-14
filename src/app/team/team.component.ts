import { Component, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MoveSet } from 'src/lib/moveset';
import { PokePasteParserService } from 'src/lib/poke-paste-parser.service';
import { Pokemon } from 'src/lib/pokemon';
import { TeamMember } from 'src/lib/team-member';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {

  pokePaste = ""
  errorMessagePokePaste: string = ""

  @Input() 
  team: TeamMember[]

  @Input()
  isAttacker: boolean

  @Output()
  teamMemberActivatedEvent = new EventEmitter<Pokemon>()

  @Output()
  secondTeamMemberDeactivatedEvent = new EventEmitter<any>()

  @Output() 
  teamChanged = new EventEmitter<TeamMember[]>()

  @Output()
  pokemonAddedToTeamEvent = new EventEmitter<any>()

  constructor(private pokePasteService: PokePasteParserService, private _snackBar: MatSnackBar) {}

  teamMemberActivated(position: number) {
    this.team[position].active = true

    this.team.forEach(teamMember => {
      if (teamMember.position != position) {
        teamMember.active = false
      }
    })

    this.teamMemberActivatedEvent.emit(this.team[position].pokemon)
  }

  secondTeamMemberActivated(position: number) {
    const teamMember = this.team[position]
    
    if(teamMember.active && this.canSelectSecondPokemon()) return

    if(teamMember.active) {
      teamMember.active = false
      this.secondTeamMemberDeactivatedEvent.emit()
    } else {
      teamMember.active = true
      this.teamMemberActivatedEvent.emit(teamMember.pokemon)
    }    
  }

  canSelectSecondPokemon(): boolean {
    const onlyOneActive = this.team.filter(t => t.active).length == 1
    return this.isAttacker && onlyOneActive
  }

  pokemonRemoved(position: number) {
    const removedTeamMember = this.team.find(teamMember => teamMember.position == position)!
    this.team = this.team.filter(teamMember => teamMember.position != position)    
    
    if (removedTeamMember.active) {
      if (this.team.length > 0) {
        this.team[0].active = true
        this.teamMemberActivatedEvent.emit(this.team[0].pokemon)
      } else {
        const pokemon = new Pokemon("Togepi", "Relaxed", "Leftovers", "Hustle", "Normal", false, {}, new MoveSet(""))
        this.team = [new TeamMember(pokemon, 0)]
        this.team[0].active = true
        this.teamMemberActivatedEvent.emit(pokemon)
      }
    }
    
    this.updatePositions()
    this.teamChanged.emit(this.team)
  }

  async addFromPokePaste() {
    try {
      this.errorMessagePokePaste = ""
      const pokemonList = await this.pokePasteService.parseFromPokePaste(this.pokePaste)
      this.team = []

      for (let index = 0; index < pokemonList.length; index++) {
        const pokemon = pokemonList[index]
        this.team.push(new TeamMember(pokemon, index))        
      }

      this.team[0].active = true
      this.teamChanged.emit(this.team)
      this.teamMemberActivatedEvent.emit(this.team[0].pokemon)

      this._snackBar.open("Pokémon from PokePaste added!", "", { duration: 4000 });
    } catch(ex) {
      this.errorMessagePokePaste = "Invalid Poke paste. Check if it is the version with EVs"
    } finally {
      this.pokePaste = ""
    }
  }

  removeAll() {
    const pokemon = new Pokemon("Togepi", "Relaxed", "Leftovers", "Hustle", "Normal", false, {}, new MoveSet(""))
    this.team = [new TeamMember(pokemon, 0)]
    this.teamChanged.emit(this.team)
    this.teamMemberActivatedEvent.emit(pokemon)
  }

  pokemonAddedToTeam() {
    this.updatePositions()
    this.pokemonAddedToTeamEvent.emit()
    this.teamMemberActivatedEvent.emit(this.team[this.team.length - 1].pokemon)
  }

  private updatePositions() {
    for (let index = 0; index < this.team.length; index++) {
      this.team[index].position = index      
    }
  }

  selectPokemonActive(): boolean {
    return this.team.find(t => t.pokemon.isDefault()) != null
  }

  pokemonChanged() {
    this.teamChanged.emit(this.team)
  }

}
