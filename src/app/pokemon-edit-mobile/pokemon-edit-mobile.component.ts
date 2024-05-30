import { Component, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, Output } from '@angular/core';
import { ITEMS, MOVES, NATURES, TYPE_CHART } from '@smogon/calc';
import { AllPokemon } from 'src/data/all-pokemon';
import { SETDEX_SV } from 'src/data/movesets';
import { DamageResult } from 'src/lib/damage-result';
import { Move } from 'src/lib/move';
import { Pokemon } from 'src/lib/pokemon';
import { TeamMember } from 'src/lib/team-member';

@Component({
  selector: 'app-pokemon-edit-mobile',
  templateUrl: './pokemon-edit-mobile.component.html',
  styleUrls: ['./pokemon-edit-mobile.component.scss']
})
export class PokemonEditMobileComponent {

  attacker: Pokemon

  allPokemon = new AllPokemon()
  allPokemonNames = this.allPokemon.allPokemonNames()
  allItemsNames = Object.values(ITEMS[9]).sort()
  allMoveNames = Object.keys(MOVES[9]).splice(1).sort()
  allNatureNames = Object.keys(NATURES)
  allTeraTypes = Object.keys(TYPE_CHART[9]).splice(1).sort()
  availableAbilities: string[]
  commanderActivated = false
  
  MAX_EVS = 508
  editAttacks: boolean = false
  copyMessageEnabled = false

  statusConditions = [
    "Healthy", "Sleep", "Poison", "Burn", "Freeze", "Paralysis"
  ]

  private differ: KeyValueDiffer<string, any>
  private differStatusModifiers: KeyValueDiffer<string, any>

  @Input()
  leftTeamMember: TeamMember

  @Input()
  rightTeamMember: TeamMember

  @Output() 
  pokemonChangedEvent = new EventEmitter<Pokemon>()

  @Output() 
  attackerChangedEvent = new EventEmitter<boolean>()

  constructor(
    private differs: KeyValueDiffers,
    private differsStatusModifiers: KeyValueDiffers
  ) { }

  ngOnInit() {
    this.attacker = this.leftTeamMember.pokemon
    this.differ = this.differs.find(this.attacker).create()
    this.differStatusModifiers = this.differsStatusModifiers.find(this.attacker.boosts).create()
  }

  ngDoCheck() {
    const pokemonChanged = this.differ.diff(this.attacker)
    const boostsChanged = this.differStatusModifiers.diff(this.attacker.boosts) 
    
    if (pokemonChanged || boostsChanged) {
      this.pokemonChangedEvent.emit(this.attacker)
    }
  }

  activateMove(move: Move) {
    this.attacker.moveSet.activeMove = move
    this.pokemonChangedEvent.emit(this.attacker)
  }

  beforeChangeEvValue() {
    if (this.attacker.totalEvs() <= this.MAX_EVS) {
      this.attacker.evs = this.attacker.evs
    }
  }

  onChangeEvValue() {
    if (this.attacker.totalEvs() <= this.MAX_EVS) {
      this.attacker.evs = this.attacker.evs
    } else {
      this.attacker.evs = this.attacker.evsStorage
    }    
  }

  onChangeIvValue() {
    this.attacker.ivs = this.attacker.ivs
  }

  editMoves() {
    this.editAttacks = true
  }

  saveMoves() {
    this.editAttacks = false
  }

  onHitsSelected() {
    this.pokemonChangedEvent.emit(this.attacker)
  }

  activatePokemon(teamMember: TeamMember) {
    teamMember.active = true
    const isLeftPokemon = teamMember == this.leftTeamMember

    this.attacker = teamMember.pokemon

    this.attackerChangedEvent.emit(isLeftPokemon)
    this.pokemonChangedEvent.emit(teamMember.pokemon)    

    teamMember.active = true
  }

  terastalyzePokemon(event: Event) {
    event.stopPropagation()
    if (this.attacker.isTerapagos()) return 

    const teraActived = !this.attacker.teraTypeActive
    this.attacker.changeTeraStatus(teraActived)

    this.pokemonChangedEvent.emit(this.attacker)
  }

  onPokemonSelected(pokemonName: string) {
    this.availableAbilities = this.allPokemon.abilitiesByName(pokemonName)        
  }

  onValueManuallySelected(pokemonName: string) {
    this.availableAbilities = this.allPokemon.abilitiesByName(pokemonName)
    this.attacker.ability = this.availableAbilities[0]

    const poke = SETDEX_SV[pokemonName]

    if(poke) {
      this.attacker.nature = poke.nature
      this.attacker.item = poke.item
      this.attacker.ability = poke.ability
      this.attacker.teraType = poke.teraType
      this.attacker.evs = poke.evs
      this.attacker.moveSet.move1 = new Move(poke.moves[0])
      this.attacker.moveSet.move2 = new Move(poke.moves[1])
      this.attacker.moveSet.move3 = new Move(poke.moves[2])
      this.attacker.moveSet.move4 = new Move(poke.moves[3])
      this.attacker.moveSet.activeMove = new Move(poke.moves[0])
      this.attacker.changeTeraStatus(false)      
    } else {
      this.attacker.nature = "Docile"
      this.attacker.item = "Leftovers"
      this.attacker.teraType = "Normal"
      this.attacker.moveSet.move1 = new Move("Tackle")
      this.attacker.moveSet.move2 = new Move("")
      this.attacker.moveSet.move3 = new Move("")
      this.attacker.moveSet.move4 = new Move("")
      this.attacker.moveSet.activeMove = new Move("Tackle")
    }
  }

  toogleCommanderAbility() {
    this.attacker.commanderActivated = !this.commanderActivated
    this.commanderActivated = !this.commanderActivated
  }

  toogleParadoxAbility() {
    this.attacker.paradoxAbilityActivated = !this.attacker.paradoxAbilityActivated
  }

  copyDamageResult(damageResult: DamageResult) {
    this.copyMessageEnabled = true
    navigator.clipboard.writeText(damageResult.description)

    setTimeout(() => {
      this.copyMessageEnabled = false
    }, 2000)
  }

  leftIsAttacker() {
    return this.attacker == this.leftTeamMember.pokemon
  }

  rightIsAttacker() {
    return this.attacker == this.rightTeamMember.pokemon
  }

}
