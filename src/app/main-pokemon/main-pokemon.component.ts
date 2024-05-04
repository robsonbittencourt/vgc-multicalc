import { Component, Output, EventEmitter, Input } from '@angular/core';
import { KeyValueDiffers, KeyValueDiffer } from '@angular/core';
import { MOVES, ITEMS, NATURES, TYPE_CHART } from '@smogon/calc';
import { Pokemon } from '../../lib/pokemon';
import { AllPokemon } from 'src/data/all-pokemon';
import { SETDEX_SV } from 'src/data/movesets';
import { Move } from 'src/lib/move';
import { TeamMember } from 'src/lib/team-member';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { defaultPokemon } from 'src/lib/default-pokemon';
import { PokePasteParserService } from 'src/lib/poke-paste-parser.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-pokemon',
  templateUrl: './main-pokemon.component.html',
  styleUrls: ['./main-pokemon.component.scss']
})
export class MainPokemonComponent {

  allPokemon = new AllPokemon()
  allMoveNames = Object.keys(MOVES[9]).splice(1).sort()
  allNatureNames = Object.keys(NATURES)
  allItemsNames = Object.values(ITEMS[9]).sort()
  allTeraTypes = Object.keys(TYPE_CHART[9]).splice(1).sort()
  allPokemonNames = this.allPokemon.allPokemonNames()
  availableAbilities: string[]
  activatedMovePosition = 1

  pokePaste = ""
  errorMessagePokePaste: string = ""

  statusConditions = [
    "Healthy", "Sleep", "Poison", "Burn", "Freeze", "Paralysis"
  ]

  MAX_EVS = 508

  private differ: KeyValueDiffer<string, any>
  private differStatusModifiers: KeyValueDiffer<string, any>
  
  @Input()
  pokemon: Pokemon

  @Output() 
  pokemonChangedEvent = new EventEmitter<Pokemon>()

  @Input() 
  team: TeamMember[]

  @Output() 
  teamChanged = new EventEmitter<TeamMember[]>()
  
  @Output() 
  secondAttackerSelected = new EventEmitter<Pokemon>()

  @Input()
  secondSelection?: Pokemon

  @Input()
  isAttacker: boolean

  constructor(private differs: KeyValueDiffers, private differsStatusModifiers: KeyValueDiffers, private pokePasteService: PokePasteParserService, private _snackBar: MatSnackBar) { }
  
  ngOnInit() {
    this.differ = this.differs.find(this.pokemon).create()
    this.differStatusModifiers = this.differsStatusModifiers.find(this.pokemon.boosts).create()
  }

  ngDoCheck() {
    const pokemonChanged = this.differ.diff(this.pokemon)
    const boostsChanged = this.differStatusModifiers.diff(this.pokemon.boosts) 

    if (pokemonChanged || boostsChanged) {
      this.pokemonChangedEvent.emit(this.pokemon)
    }
  }

  onPokemonSelected(pokemonName: string) {
    if(!this.pokemon.isDefault()) {
      this.availableAbilities = this.allPokemon.abilitiesByName(pokemonName)
    }    
  }

  onValueManuallySelected(pokemonName: string) {
    this.availableAbilities = this.allPokemon.abilitiesByName(pokemonName)
    this.pokemon.ability = this.availableAbilities[0]

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
      this.pokemon.moveSet.activeMove = new Move(poke.moves[0])
      this.pokemon.changeTeraStatus(false)      
    } else {
      this.pokemon.nature = "Docile"
      this.pokemon.item = "Leftovers"
      this.pokemon.teraType = "Normal"
      this.pokemon.moveSet.move1 = new Move("Tackle")
      this.pokemon.moveSet.move2 = new Move("")
      this.pokemon.moveSet.move3 = new Move("")
      this.pokemon.moveSet.move4 = new Move("")
      this.pokemon.moveSet.activeMove = new Move("Tackle")
    }   

    if(!this.teamHaveDefaultPokemon() && this.team.length < 6) {
      this.team.push(new TeamMember(defaultPokemon(), this.team.length - 1, false))
    }
  }

  teamHaveDefaultPokemon(): boolean {
    return this.team.find(t => t.pokemon.isDefault()) != null
  }

  canShowDeleteButton(): boolean {
    return !this.pokemon.isDefault()
  }

  onChangeEvValue() {
    if (this.pokemon.totalEvs() <= this.MAX_EVS) {
      this.pokemon.evs = this.pokemon.evs
    } else {
      this.pokemon.evs = this.pokemon.evsStorage
    }    
  }

  onChangeIvValue() {
    this.pokemon.ivs = this.pokemon.ivs
  }

  beforeChangeEvValue() {
    if (this.pokemon.totalEvs() <= this.MAX_EVS) {
      this.pokemon.evs = this.pokemon.evs
    }
  }

  activatePokemon(teamMember: TeamMember) {
    this.team.forEach(t => t.active = false)
    teamMember.active = true

    this.pokemon = teamMember.pokemon
    this.pokemonChangedEvent.emit(teamMember.pokemon)
  }

  activateMove(move: Move) {
    this.pokemon.moveSet.activeMove = move
    this.pokemonChangedEvent.emit(this.pokemon)
  }

  onHitsSelected() {
    this.pokemonChangedEvent.emit(this.pokemon)
  }

  terastalyzePokemon(event: Event) {
    event.stopPropagation()
    if (this.pokemon.isTerapagosStellar()) return 

    const teraActived = !this.pokemon.teraTypeActive
    this.pokemon.changeTeraStatus(teraActived)

    this.pokemonChangedEvent.emit(this.pokemon)
  }

  removePokemon() {
    const removedTeamMember = this.team.find(teamMember => teamMember.active)!
    this.team = this.team.filter(teamMember => !teamMember.active)

    if (this.team.length > 0) {
      this.team[0].active = true
      this.pokemon = this.team[0].pokemon
    } else {
      this.pokemon = defaultPokemon()
      this.team = [new TeamMember(this.pokemon, 0)]
      this.team[0].active = true
      
    }

    if (removedTeamMember.pokemon == this.secondSelection) {
      this.secondAttackerSelected.emit(removedTeamMember.pokemon)
    }

    this.pokemonChangedEvent.emit(this.pokemon)
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
      
      this.pokemon = this.team[0].pokemon
      this.pokemonChangedEvent.emit(this.pokemon)
      this._snackBar.open("Pokémon from PokePaste added!", "", { duration: 4000 });
    } catch(ex) {
      this.errorMessagePokePaste = "Invalid Poke paste. Check if it is the version with EVs"
    } finally {
      this.pokePaste = ""
    }
  }

  selectSecondAttacker() {
    this.secondAttackerSelected.emit(this.pokemon)
  }

  isSecondSelection(teamMember: TeamMember) {
    return teamMember.pokemon == this.secondSelection
  }

  secondSelectionActive() {
    return this.pokemon == this.secondSelection
  }

  canShowCombineButton() {
    return this.isAttacker && !this.pokemon.isDefault() && (!this.secondSelection || this.pokemon == this.secondSelection)
  }
  
}
