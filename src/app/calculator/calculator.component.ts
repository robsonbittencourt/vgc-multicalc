import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Field } from '@smogon/calc';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { DamageCalculatorService } from 'src/lib/damage-calculator.service';
import { MoveSet } from 'src/lib/moveset';
import { Pokemon } from 'src/lib/pokemon';
import { Target } from 'src/lib/target';
import { TeamMember } from 'src/lib/team-member';
import { DeviceDetectorService } from 'src/lib/device-detector.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { defaultPokemon } from 'src/lib/default-pokemon';
import { Move } from 'src/lib/move';
import { Team } from 'src/lib/team';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {

  constructor(
    private activatedRoute: ActivatedRoute, private damageCalculator: DamageCalculatorService,
    private deviceDetectorService: DeviceDetectorService, private _snackBar: MatSnackBar
  ) {}

  teams: Team[]
  field: Field = new Field({
    gameType: 'Doubles'
  })
  criticalHit: boolean = false
  activeOnEditPokemon: Pokemon
  activeAttackerPokemon: Pokemon
  activeSecondAttacker?: Pokemon
  oneVsManyActivated: boolean = true
  manyVsOneActivated: boolean = false
  
  targets: Target[] = []

  userDataLink: string
  useUserData: boolean = false
  
  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userData }) => {
      this.useUserData = this.activatedRoute.routeConfig?.path == "data/:userDataId"

      if (this.useUserData) {
        this.buildInitialData(userData?.data)      
      } else {
        const userData = JSON.parse(localStorage.getItem('userData')!)
        this.buildInitialData(userData)
      }      
    })    

    this.activeOnEditPokemon = this.activePokemon()
    this.activeAttackerPokemon = this.activeOnEditPokemon
  }

  isDesktopDevice(): boolean {
    return this.deviceDetectorService.isDesktopDevice()
  }

  uploadData() {
    const id = uuidv4()
    const userData = this.buildUserDataToUpload()
    axios.put(`https://l7enx1vgm7.execute-api.us-east-1.amazonaws.com/v1/vgc-multi-calc/${id}`, userData)
    this.userDataLink = `https://vgcmulticalc.com/data/${id}`
    this._snackBar.open("Your calc link has been created!", "", { duration: 4000 });
  }

  copyUserDataLink() {
    navigator.clipboard.writeText(this.userDataLink)
  }

  teamMemberActivated(pokemon: Pokemon) {
    this.activeOnEditPokemon = pokemon
    this.activeAttackerPokemon = this.activeOnEditPokemon
  }

  secondTeamMemberDeactivated() {
    this.activeOnEditPokemon = this.activePokemon()
    this.activeAttackerPokemon = this.activeOnEditPokemon
    this.calculateDamageForAll()
    this.order()
  }

  targetActivated(target: Target) {
    this.activeOnEditPokemon = target.pokemon
  }

  secondTargetDeactivated() {
    this.activeOnEditPokemon = this.targets.find(t => t.active)?.pokemon!
    this.activeAttackerPokemon = this.activeOnEditPokemon
    this.calculateDamageForAll()
  }

  activePokemon(): Pokemon {
    return this.activeTeam().activePokemon()
  }

  activeTeam(): Team {
    return this.teams.find(t => t.active)!
  }

  teamChanged(team: Team) {
    this.teams.forEach(t => t.active = false)
    team.active = true
    this.activeOnEditPokemon = team.activePokemon()
    this.calculateDamageForAll()
    this.order()
  }

  pokemonAddedToTeam() {
    const activePokemon = this.activeTeam().activeTeamMember()

    const pokemon = defaultPokemon()
    const teamMember = new TeamMember(pokemon)
    
    teamMember.active = true

    if (activePokemon) {
      activePokemon.active = false
    }    

    this.activeTeam().addTeamMember(teamMember)

    this.activeOnEditPokemon = pokemon
    this.activeAttackerPokemon = pokemon
  }

  pokemonAddedToTargets() {
    this.deactivateTargets()
    const pokemon = defaultPokemon()
    const position = this.targets.length + 1
    const target = new Target(pokemon, position)
    target.active = true
    this.targets.push(target)
    this.targetActivated(target)

    this.calculateDamage(target)
  }

  pokemonOnEditChanged(pokemon: Pokemon) {
    this.activeOnEditPokemon = pokemon
    const activeTargets = this.targets.filter(t => t.active)
    
    if (pokemon != activeTargets[0]?.pokemon && pokemon != activeTargets[1]?.pokemon) {
      this.activeAttackerPokemon = pokemon
      this.calculateDamageForAll()
      this.order()
    } else {
      this.calculateDamageForAll()
    }

    this.updateLocalStorage()
  }

  targetsAdded(targets: Target[]) {
    const newTargets = targets.filter(target => {
      return !this.alreadyExists(target.pokemon)
    })

    this.targets = this.targets.concat(newTargets)
    targets.forEach(target => this.calculateDamage(target))
    this.order()
    this.updateLocalStorage()
  }

  targetChanged(target: Target) {
    if (target.active) {
      this.activeOnEditPokemon = target.pokemon
    }
    
    this.calculateDamage(target)
    this.updateLocalStorage()
  }

  targetRemoved() {
    this.updateLocalStorage()
  }

  removeAllTargets() {
    this.targets = []
    this.updateLocalStorage()
  }

  fieldChanged(field: Field) {
    this.field = field
    this.calculateDamageForAll()
    this.order()
    this.updateLocalStorage()
  }

  criticalHitChanged(criticalHit: boolean) {
    this.criticalHit = criticalHit
    this.calculateDamageForAll()
    this.order()
    this.updateLocalStorage()
  }

  enableOneVsMany() {
    this.oneVsManyActivated = true
    this.manyVsOneActivated = false
    this.activateOnlyFirstTeamMember()
    this.deactivateTargets()
    this.calculateDamageForAll()
    this.order()
  }

  enableManyVsOne() {
    this.manyVsOneActivated = true
    this.oneVsManyActivated = false
    this.activeSecondAttacker = undefined
    this.activateOnlyFirstTeamMember()
    this.deactivateTargets()    
    this.calculateDamageForAll()
    this.order()
  }

  private alreadyExists(pokemon: Pokemon): boolean {
    return this.targets.some(target => {
      return target.pokemon.equals(pokemon)
    })
  }

  private calculateDamage(target: Target) {
    if(this.oneVsManyActivated) {
      this.calculateDamageOneVsMany(target, this.criticalHit)
    } else {
      this.calculateDamageManyVsOne(target, this.criticalHit)      
    }
  }

  private calculateDamageOneVsMany(target: Target, criticalHit: boolean) {
    if(this.activeSecondAttacker && this.activeAttackerPokemon != this.activeSecondAttacker) {
      const damageResult = this.damageCalculator.calcDamageForTwoAttackers(this.activeAttackerPokemon, this.activeSecondAttacker, target.pokemon, this.field, criticalHit)
      target.setDamageResult(damageResult)  
    } else {
      const damageResult = this.damageCalculator.calcDamage(this.activeAttackerPokemon, target.pokemon, this.field, criticalHit)
      target.setDamageResult(damageResult)
    }
  }

  private calculateDamageManyVsOne(target: Target, criticalHit: boolean) {
    const activeTargets = this.targets.filter(t => t.active)
    const activeTeamMember = this.activePokemon()

    if(activeTargets.length > 1 && target.active) {
      const damageResult = this.damageCalculator.calcDamageForTwoAttackers(activeTargets[0].pokemon, activeTargets[1].pokemon, activeTeamMember, this.field, criticalHit)
      activeTargets[0].setDamageResult(damageResult)
      activeTargets[1].setDamageResult(damageResult)  
    } else {
      const damageResult = this.damageCalculator.calcDamage(target.pokemon, activeTeamMember, this.field, criticalHit)
      target.setDamageResult(damageResult)
    }
  }
  
  private calculateDamageForAll() {
    if (this.activeAttackerPokemon) {
      this.targets.forEach(target => this.calculateDamage(target))
    }
  }

  private order() {
    this.targets.sort((a, b) => {
      if (a.pokemon.isDefault()) return 1
      
      return b.damageResult?.damage - a.damageResult?.damage
    })
  }

  private defaultTeams(): Team[] {
    if(this.isDesktopDevice()) {
      return this.defaultTeamsDesktop()
    } else {
      return this.defaultTeamsMobile()
    }
  }

  private defaultTeamsDesktop(): Team[] {
    const teamMembers = [
      new TeamMember(new Pokemon("Miraidon", "Timid", "Choice Specs", "Hadron Engine", "Electric", false, { hp: 4, spa: 252, spe: 252 }, new MoveSet("Electro Drift", "Parabolic Charge", "Volt Switch", "Draco Meteor"), undefined, undefined), true),
      new TeamMember(new Pokemon('Koraidon', "Adamant", "Clear Amulet", "Orichalcum Pulse", "Fire", false, { hp: 36, atk: 220, spe: 252 }, new MoveSet("Flame Charge", "Collision Course", "Flare Blitz", "Protect")), false),
      new TeamMember(defaultPokemon(), false)
    ]
    const team1 = new Team(true, "Team 1", teamMembers)

    return [
      team1,
      new Team(false, "Team 2", [new TeamMember(defaultPokemon(), true)]),
      new Team(false, "Team 3", [new TeamMember(defaultPokemon(), true)]),
      new Team(false, "Team 4", [new TeamMember(defaultPokemon(), true)])
    ]
  }

  private defaultTeamsMobile(): Team[] {
    const teamMembers = [
      new TeamMember(new Pokemon("Miraidon", "Timid", "Choice Specs", "Hadron Engine", "Electric", false, { hp: 4, spa: 252, spe: 252 }, new MoveSet("Electro Drift", "Parabolic Charge", "Volt Switch", "Draco Meteor"), undefined, undefined), true)
    ]
    return [new Team(true, "Team 1", teamMembers)]
  }

  private defaultTargets(): Target[] {
    if(this.isDesktopDevice()) {
      return this.defaultTargetsDesktop()
    } else {
      return this.defaultTargetsMobile()
    }
  }

  private defaultTargetsDesktop(): Target[] {
    return [
      new Target(new Pokemon("Calyrex-Shadow", "Timid", "Focus Sash", "As One (Spectrier)", "Fighting", false, { hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 252 }, new MoveSet("Astral Barrage", "Expanding Force", "Tera Blast", "Protect")), 0),
      new Target(new Pokemon("Urshifu-Rapid-Strike", "Jolly", "Choice Scarf", "Unseen Fist", "Water", true, { hp: 0, atk: 252, def: 0, spa: 0, spd: 4, spe: 252 }, new MoveSet("Surging Strikes", "Close Combat", "Ice Spinner", "U-turn")), 0),
      new Target(new Pokemon("Calyrex-Ice", "Brave", "Clear Amulet", "As One (Glastrier)", "Fire", false, { hp: 252, atk: 252, def: 0, spa: 0, spd: 4, spe: 0 }, new MoveSet("Glacial Lance", "Protect", "High Horsepower", "Trick Room")), 0),
      new Target(new Pokemon("Ogerpon-Wellspring", "Adamant", "Wellspring Mask", "Water Absorb", "Water", false, { hp: 252, atk: 76, def: 148, spa: 0, spd: 28, spe: 4 }, new MoveSet("Ivy Cudgel", "Horn Leech", "Spiky Shield", "Follow Me")), 0),
      new Target(new Pokemon("Amoonguss", "Relaxed", "Rocky Helmet", "Regenerator", "Water", false, { hp: 236, atk: 0, def: 236, spa: 0, spd: 36, spe: 0 }, new MoveSet("Pollen Puff", "Spore", "Rage Powder", "Protect")), 0),
      new Target(new Pokemon("Raging Bolt", "Modest", "Booster Energy", "Protosynthesis", "Fairy", true, { hp: 244, atk: 0, def: 0, spa: 252, spd: 12, spe: 0 }, new MoveSet("Thunderclap", "Dragon Pulse", "Calm Mind", "Protect")), 0),
      new Target(new Pokemon("Rillaboom", "Adamant", "Assault Vest", "Grassy Surge", "Water", false, { hp: 172, atk: 252, def: 4, spa: 0, spd: 4, spe: 76 }, new MoveSet("Grassy Glide", "Wood Hammer", "U-turn", "Fake Out")), 0),
      new Target(new Pokemon("Zamazenta-Crowned", "Impish", "Rusted Shield", "Dauntless Shield", "Water", false, { hp: 196, atk: 0, def: 156, spa: 0, spd: 0, spe: 156 }, new MoveSet("Body Press", "Heavy Slam", "Substitute", "Protect")), 0),
      new Target(new Pokemon("Incineroar", "Impish", "Sitrus Berry", "Intimidate", "Grass", false, { hp: 244, atk: 12, def: 76, spa: 0, spd: 100, spe: 76 }, new MoveSet("Knock Off", "Fake Out", "Parting Shot", "Will-O-Wisp")), 0),
      new Target(new Pokemon("Terapagos-Terastal", "Modest", "Leftovers", "Tera Shell", "Stellar", false, { hp: 252, atk: 0, def: 180, spa: 76, spd: 0, spe: 0 }, new MoveSet("Tera Starstorm", "Earth Power", "Calm Mind", "Protect")), 0)
    ]
  }

  private defaultTargetsMobile(): Target[] {
    return [
      new Target(new Pokemon('Koraidon', "Adamant", "Clear Amulet", "Orichalcum Pulse", "Fire", false, { hp: 36, atk: 220, spe: 252 }, new MoveSet("Flame Charge", "Collision Course", "Flare Blitz", "Protect")), 0)
    ]
  }

  private activateOnlyFirstTeamMember() {
    this.activeTeam().deactivateAll()
    const firstTeamMember = this.activeTeam().first()
    
    firstTeamMember.active =true
    this.activeOnEditPokemon = firstTeamMember.pokemon
    this.activeAttackerPokemon = firstTeamMember.pokemon
  }

  private deactivateTargets() {
    this.targets.forEach(t => t.active = false)
  }

  private buildInitialData(userData: any) {
    if (userData) {
      this.criticalHit = userData.criticalHit
      this.field = this.buildFieldFromUserData(userData)
      this.teams = this.buildTeamsFromUserData(userData)
      this.targets = this.buildTargetsFromUserData(userData)
    } else {
      this.teams = this.defaultTeams()
      this.targets = this.defaultTargets()
    }    
  }

  private buildFieldFromUserData(userData: any): Field {
    return new Field({ ...userData.field })
  }

  private buildTeamsFromUserData(userData: any): Team[] {
    const importedTeams = userData.teams.map((team: any, index: Number) => {
      const teamMembers = team.teamMembers.map((teamMember: any, index: Number) => {
        const pokemon = teamMember.pokemon as Pokemon
        const moveSet = new MoveSet(teamMember.pokemon.moveSet[0], teamMember.pokemon.moveSet[1], teamMember.pokemon.moveSet[2], teamMember.pokemon.moveSet[3])
        moveSet.activeMoveStorage = new Move(teamMember.pokemon.moveSet[0])
        return new TeamMember(new Pokemon(pokemon.name, pokemon.nature, pokemon.item, pokemon.ability, pokemon.teraType, pokemon.teraTypeActive, pokemon.evs, moveSet, pokemon.boosts, pokemon.status, pokemon.ivs, pokemon.paradoxAbilityActivated), index == 0)
      })

      if (teamMembers.length == 0) {
        teamMembers.push(new TeamMember(defaultPokemon(), true))
      } else if (teamMembers.length < 6) { 
        teamMembers.push(new TeamMember(defaultPokemon(), false))
      }
  
      return new Team(index == 0, team.name, teamMembers)      
    })

    return importedTeams
  }

  private buildTargetsFromUserData(userData: any): Target[] {
    let position = 0
    return userData.targets.map((target: any) => {
      const pokemon = target.pokemon as Pokemon
      const moveSet = new MoveSet(target.pokemon.moveSet[0], target.pokemon.moveSet[1], target.pokemon.moveSet[2], target.pokemon.moveSet[3])
      moveSet.activeMoveStorage = new Move(target.pokemon.activeMove)
      const newTarget = new Target(new Pokemon(pokemon.name, pokemon.nature, pokemon.item, pokemon.ability, pokemon.teraType, pokemon.teraTypeActive, pokemon.evs, moveSet, pokemon.boosts, pokemon.status, pokemon.ivs), position)
      position++
      
      return newTarget
    })
  }

  private buildUserDataToUpload(): any {
    return {
      field: this.field,
      criticalHit: this.criticalHit,
      teams: this.teams.map(team => {
        return {
          "active": team.active,
          "name": team.name,
          "teamMembers": team.teamMembers()
            .filter(t => !t.pokemon.isDefault())
            .map(t => {
              const pokemon = this.buildPokemonToUserData(t.pokemon)
              
              return {
                "pokemon": pokemon,
                "active": t.active
              }
            })          
        }    
      }),
      targets: this.targets
        .filter(t => !t.pokemon.isDefault())  
        .map(t => {
          const pokemon = this.buildPokemonToUserData(t.pokemon)

          return {
            "pokemon": pokemon
          }
        }
      )
    }
  }

  private buildPokemonToUserData(pokemon: Pokemon): any {
    return {
      "name": pokemon.name,
      "nature": pokemon.nature,
      "item": pokemon.item,
      "ability": pokemon.ability,
      "teraType": pokemon.teraType,
      "teraTypeActive": pokemon.teraTypeActive,
      "evs": pokemon.evs,
      "status": pokemon.status,
      "boosts": pokemon.boosts,
      "activeMove": pokemon.moveSet.activeMove.name,
      "paradoxAbilityActivated": pokemon.paradoxAbilityActivated,
      "ivs": pokemon.ivs,
      "moveSet": [
        pokemon.moveSet.move1.name,
        pokemon.moveSet.move2.name,
        pokemon.moveSet.move3.name,
        pokemon.moveSet.move4.name
      ]      
    }
  }

  secondAttackerSelected() {
    if (this.activeSecondAttacker == this.activeTeam().activePokemon()) {
      this.activeSecondAttacker = undefined
    } else {
      this.activeSecondAttacker = this.activeTeam().activePokemon()
    }
  }

  mobileAttackerChanged(isLeftAttacker: boolean) {
    if (isLeftAttacker) {
      this.oneVsManyActivated = true
      this.manyVsOneActivated = false
    } else {
      this.oneVsManyActivated = false
      this.manyVsOneActivated = true
    }
  }

  updateLocalStorage() {
    if(!this.useUserData) {
      localStorage.setItem('userData', JSON.stringify(this.buildUserDataToUpload()))
    }    
  }

}
