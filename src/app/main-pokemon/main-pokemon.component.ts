import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITEMS, MOVES, NATURES, TYPE_CHART } from '@smogon/calc';
import { TypeName } from '@smogon/calc/dist/data/interface';
import { AllPokemon } from 'src/data/all-pokemon';
import { SETDEX_SV } from 'src/data/movesets';
import { defaultPokemon } from 'src/lib/default-pokemon';
import { Move } from 'src/lib/move';
import { PokePasteParserService } from 'src/lib/poke-paste-parser.service';
import { Team } from 'src/lib/team';
import { TeamMember } from 'src/lib/team-member';
import { Pokemon } from '../../lib/pokemon';
import { TeamExportModalComponent } from '../team-export-modal/team-export-modal.component';
import { TeamImportModalComponent } from '../team-import-modal/team-import-modal.component';

@Component({
  selector: 'app-main-pokemon',
  templateUrl: './main-pokemon.component.html',
  styleUrls: ['./main-pokemon.component.scss']
})
export class MainPokemonComponent {

  allMoveNames = Object.keys(MOVES[9]).splice(1).sort()
  allNatureNames = Object.keys(NATURES)
  allItemsNames = Object.values(ITEMS[9]).sort()
  allTeraTypes = Object.keys(TYPE_CHART[9]).splice(1).sort()
  allPokemonNames = AllPokemon.instance.allPokemonNames
  availableAbilities: string[]
  commanderActivated = false

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
  team: Team

  @Output() 
  teamChanged = new EventEmitter<Team>()
  
  @Output() 
  secondAttackerSelected = new EventEmitter<Pokemon>()

  @Input()
  secondSelection?: Pokemon

  @Input()
  isAttacker: boolean

  constructor(
    private differs: KeyValueDiffers,
    private differsStatusModifiers: KeyValueDiffers,
    private dialog: MatDialog,
    private pokePasteService: PokePasteParserService
  ) { }
  
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
      this.availableAbilities = AllPokemon.instance.abilitiesByName(pokemonName)
    }    
  }

  onValueManuallySelected(pokemonName: string) {
    this.availableAbilities = AllPokemon.instance.abilitiesByName(pokemonName)
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
      this.pokemon.moveSet.activeMoveByPosition(1, new Move(poke.moves[0]))
      this.pokemon.changeTeraStatus(false)      
    } else {
      this.pokemon.nature = "Docile"
      this.pokemon.item = "Leftovers"
      this.pokemon.teraType = "Normal"
      this.pokemon.moveSet.move1 = new Move("Tackle")
      this.pokemon.moveSet.move2 = new Move("")
      this.pokemon.moveSet.move3 = new Move("")
      this.pokemon.moveSet.move4 = new Move("")
      this.pokemon.moveSet.activeMoveByPosition(1, new Move("Tackle"))
    }   

    if(!this.team.haveDefaultPokemon() && !this.team.isFull()) {
      this.team.addTeamMember(new TeamMember(defaultPokemon(), false))
    }
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
    this.team.deactivateAll()
    teamMember.active = true

    this.pokemon = teamMember.pokemon
    this.pokemonChangedEvent.emit(teamMember.pokemon)
  }

  moveSelected(position: number, move: string) {
    this.activateMove(position, new Move(move))
  }

  activateMove(position: number, move: Move) {
    this.pokemon.moveSet.activeMoveByPosition(position, move)
    this.pokemonChangedEvent.emit(this.pokemon)
  }

  onHitsSelected() {
    this.pokemonChangedEvent.emit(this.pokemon)
  }

  terastalyzePokemon(event: Event) {
    event.stopPropagation()
    if (this.pokemon.isTerapagos()) return 

    const teraActived = !this.pokemon.teraTypeActive
    this.pokemon.changeTeraStatus(teraActived)

    this.pokemonChangedEvent.emit(this.pokemon)
  }

  removePokemon() {
    const removedTeamMember = this.team.removeActiveTeamMember()

    if (this.team.isEmpty() || !this.team.haveDefaultPokemon()) {
      this.pokemon = defaultPokemon()
      this.team.addTeamMember(new TeamMember(this.pokemon, false))
      this.team.activateFirstTeamMember()  
    } else {
      this.team.activateFirstTeamMember()
      this.pokemon = this.team.activePokemon()
    }

    if (removedTeamMember.pokemon == this.secondSelection) {
      this.secondAttackerSelected.emit(removedTeamMember.pokemon)
    }

    this.pokemonChangedEvent.emit(this.pokemon)
    this.teamChanged.emit(this.team)
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
    return this.isAttacker && !this.pokemon.isDefault() && (!this.secondSelection || this.team.activePokemon() == this.secondSelection)
  }

  toogleCommanderAbility() {
    this.pokemon.commanderActivated = !this.commanderActivated
    this.commanderActivated = !this.commanderActivated
  }

  toogleParadoxAbility() {
    this.pokemon.abilityOn = !this.pokemon.abilityOn
  }
  
  typeStyle(type?: TypeName): any {
    switch(type) { 
      case "Normal": { return { 'background-color': '#9FA19F' } }
      case "Fighting": { return { 'background-color': '#FF8000' } }
      case "Flying": { return { 'background-color': '#81B9EF' } }
      case "Poison": { return { 'background-color': '#9141CB' } }
      case "Ground": { return { 'background-color': '#915121' } }
      case "Rock": { return { 'background-color': '#AFA981' } }
      case "Bug": { return { 'background-color': '#91A119' } }
      case "Ghost": { return { 'background-color': '#704170' } }
      case "Steel": { return { 'background-color': '#60A1B8' } }
      case "Fire": { return { 'background-color': '#E62829' } }
      case "Water": { return { 'background-color': '#2980EF' } }
      case "Grass": { return { 'background-color': '#3FA129' } }
      case "Electric": { return { 'background-color': '#FAC000' } }
      case "Psychic": { return { 'background-color': '#EF4179' } }
      case "Ice": { return { 'background-color': '#3DCEF3' } }
      case "Dragon": { return { 'background-color': '#5060E1' } }
      case "Dark": { return { 'background-color': '#624D4E' } }
      case "Fairy": { return { 'background-color': '#EF70EF' } }
       
      default: { 
         break; 
      } 
    }
  }

  importPokemon() {
    const dialogRef = this.dialog.open(TeamImportModalComponent, { 
      position: { top: "2em" },
      scrollStrategy: new NoopScrollStrategy()
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return

      const pokemonList = await this.pokePasteService.parse(result)
      const teamMember = new TeamMember(pokemonList[0], true)
      
      this.team.addTeamMember(teamMember)
      this.activatePokemon(teamMember)
    })
  }

  exportPokemon() {
    this.dialog.open(TeamExportModalComponent, { 
      data: { 
        title: this.pokemon.name,
        content: this.pokemon.showdownTextFormat()
      },
      width: "40em",
      position: { top: "2em" },
      scrollStrategy: new NoopScrollStrategy()
    })
  }

  canImportPokemon() {
    return !this.team.isFull()
  }

  canExportPokemon() {
    return !this.pokemon.isDefault()
  }

  teamMemberOnEdit(): boolean {
    return this.team.activePokemon() == this.pokemon
  }

}
