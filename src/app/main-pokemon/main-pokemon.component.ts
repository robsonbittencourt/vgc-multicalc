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

  constructor(private differs: KeyValueDiffers, private differsStatusModifiers: KeyValueDiffers) { }

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
    console.log(this.pokemon)
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

      if(this.team.length < 6) {
        this.team.push(new TeamMember(defaultPokemon(), this.team.length - 1, false))
      }      
    }    
  }

  onChangeEvValue() {
    if (this.pokemon.totalEvs() <= this.MAX_EVS) {
      this.pokemon.evs = this.pokemon.evs
    } else {
      this.pokemon.evs = this.pokemon.evsStorage
    }    
  }

  beforeChangeEvValue() {
    if (this.pokemon.totalEvs() <= this.MAX_EVS) {
      this.pokemon.evs = this.pokemon.evs
    }
  }

  activatePokemon(event: MatTabChangeEvent) {
    this.pokemon = this.team[event.index].pokemon
    this.pokemonChangedEvent.emit(this.pokemon)
  }

  activateMove(move: Move) {
    this.pokemon.moveSet.activeMove = move
    this.pokemonChangedEvent.emit(this.pokemon)
  }

  onHitsSelected() {
    this.pokemonChangedEvent.emit(this.pokemon)
  }

}
