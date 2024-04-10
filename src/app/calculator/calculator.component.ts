import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Field, StatsTable } from '@smogon/calc';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { DamageCalculatorService } from 'src/lib/damage-calculator.service';
import { MoveSet } from 'src/lib/moveset';
import { Pokemon } from 'src/lib/pokemon';
import { Target } from 'src/lib/target';
import { TeamMember } from 'src/lib/team-member';
import { DeviceDetectorService } from 'src/lib/device-detector.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  team: TeamMember[]
  field: Field
  activeOnEditPokemon: Pokemon
  activeAttackerPokemon: Pokemon
  canShowTargetAsActivated: boolean
  oneVsManyActivated: boolean = true
  manyVsOneActivated: boolean = false
  
  targets: Target[] = []

  userDataLink: string
  showAdvancedOptions = false

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userData }) => {
      this.buildInitialData(userData)      
    })

    this.activeOnEditPokemon = this.team.find(t => t.active)!.pokemon
    this.activeAttackerPokemon = this.activeOnEditPokemon
    this.canShowTargetAsActivated = false
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
    this.calculateDamageForAll()
    this.order()
    
    this.canShowTargetAsActivated = false
    this.targets.forEach(t => t.active = false)
  }

  targetActivated(target: Target) {
    this.targets.forEach(t => t.active = false)
    target.active = true

    this.activeOnEditPokemon = target.pokemon
    this.canShowTargetAsActivated = true
  }

  teamChanged(team: TeamMember[]) {
    this.team = team
    this.calculateDamageForAll()
    this.order()
  }

  pokemonAddedToTeam() {
    const activePokemon = this.team.find(t => t.active)

    const pokemon = new Pokemon("Togepi", "Relaxed", "Leftovers", "Hustle", "Normal", false, {}, new MoveSet(""))
    const teamMember = new TeamMember(pokemon, this.team.length)
    
    teamMember.active = true

    if (activePokemon) {
      activePokemon.active = false
    }    

    this.team.push(teamMember)

    this.activeOnEditPokemon = pokemon
    this.activeAttackerPokemon = pokemon
  }

  pokemonAddedToTargets() {
    const pokemon = new Pokemon("Togepi", "Relaxed", "Leftovers", "Hustle", "Normal", false, {}, new MoveSet(""))
    const target = new Target(pokemon)
    this.targets.push(target)
    this.targetActivated(target)

    this.calculateDamage(target)
  }

  pokemonChanged(pokemon: Pokemon) {
    this.activeOnEditPokemon = pokemon
    this.activeAttackerPokemon = pokemon
    this.calculateDamageForAll()
    this.order()
  }

  pokemonOnEditChanged() {
    this.calculateDamageForAll()
      
    if (this.activeOnEditPokemon == this.activeAttackerPokemon) {
      this.order()
    }
  }

  targetsAdded(targets: Target[]) {
    const newTargets = targets.filter(target => {
      return !this.alreadyExists(target.pokemon)
    })

    this.targets = this.targets.concat(newTargets)
    targets.forEach(target => this.calculateDamage(target))
    this.order()
  }

  targetChanged(target: Target) {
    if (target.active) {
      this.activeOnEditPokemon = target.pokemon
    }
    
    this.calculateDamage(target)
  }

  removeAllTargets() {
    this.targets = []
  }

  fieldChanged(field: Field) {
    this.field = field
    this.calculateDamageForAll()
    this.order()
  }

  criticalHitChanged(criticalHit: boolean) {
    this.calculateDamageForAll(criticalHit)
    this.order()
  }

  attackerStatusChanged(status: string) {
    this.activeAttackerPokemon.status = status
    this.calculateDamageForAll()
    this.order()
  }

  defenderStatusChanged(status: string) {
    this.targets.forEach(target => {
      target.pokemon.status = status
    })

    this.calculateDamageForAll()
    this.order()
  }

  statsModifiersChanged(statsModifiers: StatsTable) {
    this.targets.forEach(target => {
      target.pokemon.pokemonSmogon.boosts = statsModifiers
    })

    this.calculateDamageForAll()
    this.order()
  }

  manageAdvancedOptions(showAdvancedOptions: boolean) {
    this.showAdvancedOptions = showAdvancedOptions
  }

  enableOneVsMany() {
    this.oneVsManyActivated = true
    this.manyVsOneActivated = false
    this.calculateDamageForAll()
    this.order()
  }

  enableManyVsOne() {
    this.manyVsOneActivated = true
    this.oneVsManyActivated = false
    this.calculateDamageForAll()
    this.order()
  }

  private alreadyExists(pokemon: Pokemon): boolean {
    return this.targets.some(target => {
      return target.pokemon.equals(pokemon)
    })
  }

  private calculateDamage(target: Target, criticalHit: boolean = false) {
    if(this.oneVsManyActivated) {
      const damageResult = this.damageCalculator.calcDamage(this.activeAttackerPokemon, target.pokemon, this.activeAttackerPokemon.move, this.field, criticalHit)
      target.setDamageResult(damageResult)
    } else {
      const damageResult = this.damageCalculator.calcDamage(target.pokemon, this.activeAttackerPokemon, target.pokemon.move, this.field, criticalHit)
      target.setDamageResult(damageResult)    
    }
  }
  
  private calculateDamageForAll(criticalHit: boolean = false) {
    if (this.activeAttackerPokemon) {
      this.targets.forEach(target => this.calculateDamage(target, criticalHit))
    }
  }

  private order() {
    this.targets.sort((a, b) => {
      if (a.pokemon.isDefault()) return 1
      
      return b.damageResult?.damage - a.damageResult?.damage
    })
  }

  private buildInitialData(userData: any) {
    if (userData) {
      this.team = this.buildTeamFromUserData(userData)
      this.targets = this.buildTargetsFromUserData(userData)
    } else {
      this.team = this.defaultTeam()
      this.targets = this.defaultTargets()
    }   
  }

  private buildTeamFromUserData(userData: any): TeamMember[] {
    return userData.data.team.map((teamMember: any) => {
      const pokemon = teamMember.pokemon as Pokemon
      const moveSet = new MoveSet(teamMember.pokemon.moveSet[0], teamMember.pokemon.moveSet[1], teamMember.pokemon.moveSet[2], teamMember.pokemon.moveSet[3])
      return new TeamMember(new Pokemon(pokemon.name, pokemon.nature, pokemon.item, pokemon.ability, pokemon.teraType, pokemon.teraTypeActive, pokemon.evs, moveSet), teamMember.position, teamMember.active)
    })
  }

  private defaultTeam(): TeamMember[] {
    const moveSet = new MoveSet("Moonblast", "Dazzling Gleam", "Shadow Ball", "Thunderbolt")

    return [
      new TeamMember(new Pokemon("Flutter Mane", "Timid", "Choice Specs", "Protosynthesis", "Fairy", true, { spa: 252 }, moveSet, undefined, undefined), 0, true)
    ]
  }

  private defaultTargets(): Target[] {
    return [
      new Target(new Pokemon('Raging Bolt', "Modest", "Booster Energy", "Protosynthesis", "Fairy", true, { hp: 244, spa: 252, spd: 12 }, new MoveSet("Thunderclap", "Dragon Pulse", "Calm Mind", "Protect"))),
      new Target(new Pokemon('Walking Wake', "Timid", "Life Orb", "Protosynthesis", "Poison", true, { hp: 4, spa: 252, spe: 252 }, new MoveSet("Hydro Steam", "Draco Meteor", "Flamethrower", "Dragon Pulse"))),
      new Target(new Pokemon('Gouging Fire', "Adamant", "Clear Amulet", "Protosynthesis", "Water", false, { hp: 4, atk: 252, spe: 252 }, new MoveSet("Breaking Swipe", "Heat Crash", "Howl", "Burning Bulwark"))),
      new Target(new Pokemon('Entei', "Adamant", "Sitrus Berry", "Inner Focus", "Grass", false, { atk: 252, def: 4, spd: 252 }, new MoveSet("Sacred Fire", "Extreme Speed", "Stomping Tantrum", "Snarl"))),
      new Target(new Pokemon('Incineroar', "Careful", "Assault Vest", "Intimidate", "Water", false, { hp: 252, atk: 4, spd: 252 }, new MoveSet("Fake Out", "Flare Blitz", "Parting Shot", "Knock Off"))),
      new Target(new Pokemon('Urshifu-Rapid-Strike', "Jolly", "Choice Scarf", "Unseen Fist", "Water", true, { atk: 252, spd: 4, spe: 252 }, new MoveSet("Surging Strikes", "Close Combat", "Ice Spinner", "U-turn"))),
      new Target(new Pokemon('Landorus', "Timid", "Life Orb", "Sheer Force", "Flying", false, { spa: 252, spd: 4, spe: 252 }, new MoveSet("Earth Power", "Sludge Bomb", "Substitute", "Protect"))),
      new Target(new Pokemon('Ogerpon-Wellspring', "Adamant", "Wellspring Mask", "Water Absorb", "Water", false, { hp: 252, atk: 76, def: 148, spd: 28, spe: 4 }, new MoveSet("Ivy Cudgel", "Horn Leech", "Spiky Shield", "Follow Me")))
    ]
  }

  private buildTargetsFromUserData(userData: any): Target[] {
    return userData.data.targets.map((target: Target) => {
      const pokemon = target.pokemon
      return new Target(new Pokemon(pokemon.name, pokemon.nature, pokemon.item, pokemon.ability, pokemon.teraType, pokemon.teraTypeActive, pokemon.evs))
    })
  }

  private buildUserDataToUpload(): any {
    return {
      team: this.team.map(t => {
        const pokemon = this.buildPokemonToUserData(t.pokemon)
        
        return {
          "pokemon": pokemon,
          "position": t.position,
          "active": t.active,
        }
      }),
      targets: this.targets.map(t => {
        const pokemon = this.buildPokemonToUserData(t.pokemon)

        return {
          "pokemon": pokemon
        }
      })
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
      "moveSet": [
        pokemon.moveSet.move1,
        pokemon.moveSet.move2,
        pokemon.moveSet.move3,
        pokemon.moveSet.move4
      ]      
    }
  }

}
