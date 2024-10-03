import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Field } from '@smogon/calc';
import axios from 'axios';
import { DamageCalculatorService } from 'src/lib/damage-calculator.service';
import { defaultPokemon } from 'src/lib/default-pokemon';
import { DeviceDetectorService } from 'src/lib/device-detector.service';
import { Pokemon } from 'src/lib/pokemon';
import { Target } from 'src/lib/target';
import { Team } from 'src/lib/team';
import { TeamMember } from 'src/lib/team-member';
import { v4 as uuidv4 } from 'uuid';
import { DataStore } from '../data-store.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {

  constructor(
    public data: DataStore, private activatedRoute: ActivatedRoute, private damageCalculator: DamageCalculatorService,
    private deviceDetectorService: DeviceDetectorService, private _snackBar: MatSnackBar
  ) {}

  activeOnEditPokemon: Pokemon
  activeAttackerPokemon: Pokemon
  activeSecondAttacker?: Pokemon
  userDataLink: string
  useUserData: boolean = false
  
  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userData }) => {
      this.useUserData = this.activatedRoute.routeConfig?.path == "data/:userDataId"

      if (this.useUserData) {
        this.data.buildInitialData(userData?.data)      
      } else {
        const userData = JSON.parse(localStorage.getItem('userData')!)
        this.data.buildInitialData(userData)
      }      
    })

    this.activeOnEditPokemon = this.data.activePokemon()
    this.activeAttackerPokemon = this.activeOnEditPokemon
  }

  isDesktopDevice(): boolean {
    return this.deviceDetectorService.isDesktop()
  }

  teamMemberActivated(pokemon: Pokemon) {
    this.activeOnEditPokemon = pokemon
    this.activeAttackerPokemon = this.activeOnEditPokemon
  }

  secondTeamMemberDeactivated() {
    this.activeOnEditPokemon = this.data.activePokemon()
    this.activeAttackerPokemon = this.activeOnEditPokemon
    this.calculateDamageForAll()
  }

  targetActivated(target: Target) {
    this.activeOnEditPokemon = target.pokemon
  }

  secondTargetDeactivated() {
    this.activeOnEditPokemon = this.data.targets.find(t => t.active)?.pokemon!
    this.activeAttackerPokemon = this.activeOnEditPokemon
    this.calculateDamageForAll(false)
  }

  teamChanged(team: Team) {
    this.data.teams.forEach(t => t.active = false)
    team.active = true
    this.activeOnEditPokemon = team.activePokemon()
    this.calculateDamageForAll()
  }

  pokemonAddedToTeam() {
    const activePokemon = this.data.activeTeam().activeTeamMember()

    const pokemon = defaultPokemon()
    const teamMember = new TeamMember(pokemon)
    
    teamMember.active = true

    if (activePokemon) {
      activePokemon.active = false
    }    

    this.data.activeTeam().addTeamMember(teamMember)

    this.activeOnEditPokemon = pokemon
    this.activeAttackerPokemon = pokemon
  }

  pokemonAddedToTargets() {
    this.deactivateTargets()
    const pokemon = defaultPokemon()
    const position = this.data.targets.length + 1
    const target = new Target(pokemon, position)
    target.active = true
    this.data.targets.push(target)
    this.targetActivated(target)

    this.calculateDamage(target)
  }

  pokemonOnEditChanged(pokemon: Pokemon) {
    this.activeOnEditPokemon = pokemon
    const activeTargets = this.data.targets.filter(t => t.active)
    
    if (pokemon != activeTargets[0]?.pokemon && pokemon != activeTargets[1]?.pokemon) {
      this.activeAttackerPokemon = pokemon
      this.calculateDamageForAll()
    } else {
      this.calculateDamageForAll(false)
    }

    this.updateLocalStorage()
  }

  targetsAdded(targets: Target[]) {
    const newTargets = targets.filter(target => {
      return !this.alreadyExists(target.pokemon)
    })

    this.data.targets = this.data.targets.concat(newTargets)
    this.calculateDamageForAll()
    this.adjustDefaultPokemonOnTargets()
    this.updateLocalStorage()
  }

  private adjustDefaultPokemonOnTargets() {
    if (this.activeOnEditPokemon.isDefault()) {
      this.activeOnEditPokemon = this.data.activeTeam().first().pokemon
      this.deactivateTargets()
      this.data.targets = this.data.targets.filter(t => !t.pokemon.isDefault())
    }
  }

  targetChanged(target: Target) {
    if (target.active) {
      this.activeOnEditPokemon = target.pokemon
    }
    
    this.calculateDamage(target)
    this.updateLocalStorage()
  }

  targetRemoved() {
    this.activeOnEditPokemon = this.data.activePokemon()
    this.updateLocalStorage()
  }

  removeAllTargets() {
    this.data.targets = []
    this.updateLocalStorage()
  }

  fieldChanged(field: Field) {
    this.data.field = field
    this.calculateDamageForAll()
    this.updateLocalStorage()
  }

  criticalHitChanged(criticalHit: boolean) {
    this.data.criticalHit = criticalHit
    this.calculateDamageForAll()
    this.updateLocalStorage()
  }

  trickRoomChanged(isTrickRoom: boolean) {
    this.data.isTrickRoom = isTrickRoom
  }

  enableOneVsMany() {
    this.data.oneVsManyActivated = true
    this.data.manyVsOneActivated = false
    this.data.speedCalculatorActivated = false
    this.activateOnlyFirstTeamMember()
    this.deactivateTargets()
    this.calculateDamageForAll()
    this.updateLocalStorage()
  }

  enableManyVsOne() {
    this.data.manyVsOneActivated = true
    this.data.oneVsManyActivated = false
    this.data.speedCalculatorActivated = false
    this.activeSecondAttacker = undefined
    this.activateOnlyFirstTeamMember()
    this.deactivateTargets()    
    this.calculateDamageForAll()
    this.updateLocalStorage()
  }

  enableSpeedCalculator() {
    this.data.oneVsManyActivated = false
    this.data.manyVsOneActivated = false
    this.data.speedCalculatorActivated = true
    this.updateLocalStorage()
  }

  uploadData() {
    const id = uuidv4()
    const userData = this.data.buildUserData()
    axios.put(`https://l7enx1vgm7.execute-api.us-east-1.amazonaws.com/v1/vgc-multi-calc/${id}`, userData)
    this.userDataLink = `https://vgcmulticalc.com/data/${id}`
    this._snackBar.open("Your calc link has been created!", "", { duration: 4000 });
  }

  copyUserDataLink() {
    navigator.clipboard.writeText(this.userDataLink)
  }

  private alreadyExists(pokemon: Pokemon): boolean {
    return this.data.targets.some(target => {
      return target.pokemon.equals(pokemon)
    })
  }

  private calculateDamage(target: Target) {
    this.damageCalculator.calculateDamage(this.activeAttackerPokemon, target, this.activeSecondAttacker)
  }

  private calculateDamageForAll(order: boolean = true) {
    this.damageCalculator.calculateDamageForAll(this.activeAttackerPokemon, order, this.activeSecondAttacker)
  }

  private activateOnlyFirstTeamMember() {
    this.data.activeTeam().deactivateAll()
    const firstTeamMember = this.data.activeTeam().first()
    
    firstTeamMember.active =true
    this.activeOnEditPokemon = firstTeamMember.pokemon
    this.activeAttackerPokemon = firstTeamMember.pokemon
  }

  private deactivateTargets() {
    this.data.targets.forEach(t => t.active = false)
  }  

  secondAttackerSelected() {
    if (this.activeSecondAttacker == this.data.activeTeam().activePokemon()) {
      this.activeSecondAttacker = undefined
    } else {
      this.activeSecondAttacker = this.data.activeTeam().activePokemon()
    }
  }

  mobileAttackerChanged(isLeftAttacker: boolean) {
    if (isLeftAttacker) {
      this.data.oneVsManyActivated = true
      this.data.manyVsOneActivated = false
    } else {
      this.data.oneVsManyActivated = false
      this.data.manyVsOneActivated = true
    }
  }

  updateLocalStorage() {
    if(!this.useUserData) {
      localStorage.setItem('userData', JSON.stringify(this.data.buildUserData()))
    }    
  }

}
