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

  private differ: KeyValueDiffer<string, any>
  private activePokemon: Pokemon
  pokePaste = ""
  errorMessagePokePaste: string = ""

  @Input() 
  team: TeamMember[]

  @Output()
  teamMemberActivatedEvent = new EventEmitter<Pokemon>()

  @Output()
  pokemonChangedEvent = new EventEmitter<Pokemon>()

  @Output() 
  teamChanged = new EventEmitter<TeamMember[]>()

  @Output()
  pokemonAddedToTeamEvent = new EventEmitter<any>()

  constructor(private pokePasteService: PokePasteParserService, private differs: KeyValueDiffers, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.activePokemon = this.team.find(t => t.active)!.pokemon
    this.differ = this.differs.find(this.activePokemon).create()
  }

  ngDoCheck() {
    const changed = this.differ.diff(this.activePokemon)
    
    if (changed) {
      this.pokemonChangedEvent.emit(this.activePokemon)
    }
  }
  
  teamMemberActivated(position: number) {
    this.team.forEach(teamMember => {
      if (teamMember.position != position) {
        teamMember.active = false
      }
    })

    this.teamMemberActivatedEvent.emit(this.team[position].pokemon)
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

}