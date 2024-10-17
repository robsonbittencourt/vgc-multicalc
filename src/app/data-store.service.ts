import { Injectable } from '@angular/core';
import { Field } from '@smogon/calc';
import { defaultPokemon } from 'src/lib/default-pokemon';
import { DeviceDetectorService } from 'src/lib/device-detector.service';
import { Move } from 'src/lib/move';
import { MoveSet } from 'src/lib/moveset';
import { Pokemon } from 'src/lib/pokemon';
import { RollLevelConfig } from 'src/lib/roll-level-config';
import { Target } from 'src/lib/target';
import { Team } from 'src/lib/team';
import { TeamMember } from 'src/lib/team-member';

@Injectable({ providedIn: 'root' })
export class DataStore {

  constructor(private deviceDetector: DeviceDetectorService) {}

  oneVsOneActivated: boolean = true
  oneVsManyActivated: boolean = false
  manyVsOneActivated: boolean = false
  speedCalculatorActivated: boolean = false

  field: Field = new Field({
    gameType: 'Doubles'
  })

  extraFieldOptions = {
    trickRoom: false,
    criticalHit: false
  }

  leftRollLevelConfig: RollLevelConfig
  rightRollLevelConfig: RollLevelConfig
  
  leftPokemon: Pokemon
  rightPokemon: Pokemon
  teams: Team[]
  targets: Target[] = []

  activePokemon(): Pokemon {
    return this.activeTeam().activePokemon()
  }

  activeTeam(): Team {
    return this.teams.find(t => t.active)!
  }

  order() {
    if (this.deviceDetector.isDesktop()) {
      this.targets.sort((a, b) => {
        if (a.pokemon.isDefault()) return 1
        
        return b.damageResult?.damage - a.damageResult?.damage
      })
    }    
  }

  buildInitialData(userData: any) { 
    if (userData) {
      this.extraFieldOptions.criticalHit = userData.criticalHit
      this.extraFieldOptions.trickRoom = userData.trickRoom
      this.field = this.buildFieldFromUserData(userData)
      this.leftRollLevelConfig = this.buildRollLevelConfigFromUserData(userData.leftRollLevelConfig)
      this.rightRollLevelConfig = this.buildRollLevelConfigFromUserData(userData.rightRollLevelConfig)
      this.leftPokemon = this.buildLeftPokemonFromUserData(userData)
      this.rightPokemon = this.buildRightPokemonFromUserData(userData)
      this.teams = this.buildTeamsFromUserData(userData)
      this.targets = this.buildTargetsFromUserData(userData)
    } else {
      this.leftRollLevelConfig = RollLevelConfig.high()
      this.rightRollLevelConfig = RollLevelConfig.high()
      this.leftPokemon = this.defaultLeftPokemon()
      this.rightPokemon = this.defaultRightPokemon()
      this.teams = this.defaultTeams()
      this.targets = this.defaultTargets()
    }    
  }

  private buildFieldFromUserData(userData: any): Field {
    return new Field({ ...userData.field })
  }

  private buildRollLevelConfigFromUserData(rollLevelConfig: any): RollLevelConfig {
    if (!rollLevelConfig) {
      return RollLevelConfig.high()
    }

    if (rollLevelConfig.high) {
      return RollLevelConfig.high()
    }

    if (rollLevelConfig.medium) {
      return RollLevelConfig.medium()
    }

    if (rollLevelConfig.low) {
      return RollLevelConfig.low()
    }

    return RollLevelConfig.high()
  }

  private buildLeftPokemonFromUserData(userData: any): Pokemon {
    if (userData.leftPokemon) {
      return this.buildPokemonFromUserData(userData.leftPokemon)
    } else {
      return this.defaultLeftPokemon()
    }    
  }

  private buildRightPokemonFromUserData(userData: any): Pokemon {
    if (userData.rightPokemon) {
      return this.buildPokemonFromUserData(userData.rightPokemon)
    } else {
      return this.defaultRightPokemon()
    }    
  }

  private buildTeamsFromUserData(userData: any): Team[] {
    const importedTeams = userData.teams.map((team: any, index: Number) => {
      const teamMembers = team.teamMembers.map((teamMember: any, index: Number) => {
        const pokemon = this.buildPokemonFromUserData(teamMember.pokemon)
        return new TeamMember(pokemon , index == 0)
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
      const pokemon = this.buildPokemonFromUserData(target.pokemon)
      const newTarget = new Target(pokemon, position)
      position++
      
      return newTarget
    })
  }

  buildPokemonFromUserData(pokemon: any) {
    const moveSet = new MoveSet(pokemon.moveSet[0], pokemon.moveSet[1], pokemon.moveSet[2], pokemon.moveSet[3])
    moveSet.activeMoveStorage = new Move(pokemon.activeMove)
    return new Pokemon(pokemon.name, { ability: pokemon.ability, nature: pokemon.nature, item: pokemon.item, teraType: pokemon.teraType, teraTypeActive: pokemon.teraTypeActive, evs: pokemon.evs, moveSet: moveSet, boosts: pokemon.boosts, status: pokemon.status, ivs: pokemon.ivs })
  }

  buildUserData(): any {
    return {
      oneVsManyActivated: this.oneVsManyActivated,
      manyVsOneActivated: this.manyVsOneActivated,
      speedCalculatorActivated: this.speedCalculatorActivated,
      field: this.field,
      criticalHit: this.extraFieldOptions.criticalHit,
      trickRoom: this.extraFieldOptions.trickRoom,
      leftRollLevelConfig: this.leftRollLevelConfig,
      rightRollLevelConfig: this.rightRollLevelConfig,
      leftPokemon: this.buildPokemonToUserData(this.leftPokemon),
      rightPokemon: this.buildPokemonToUserData(this.rightPokemon),
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
      "abilityOn": pokemon.abilityOn,
      "ivs": pokemon.ivs,
      "moveSet": [
        pokemon.moveSet.move1.name,
        pokemon.moveSet.move2.name,
        pokemon.moveSet.move3.name,
        pokemon.moveSet.move4.name
      ]      
    }
  }

  private defaultLeftPokemon(): Pokemon {
    return new Pokemon('Koraidon', { nature: "Adamant", item: "Clear Amulet", teraType: "Fire", evs: { hp: 36, atk: 220, spe: 252 }, moveSet: new MoveSet("Flame Charge", "Collision Course", "Flare Blitz", "Protect") })
  }

  private defaultRightPokemon(): Pokemon {
    return new Pokemon("Miraidon", { nature: "Timid", item: "Choice Specs", teraType: "Electric", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet("Electro Drift", "Thunder", "Volt Switch", "Draco Meteor") })
  }

  private defaultTeams(): Team[] {
    if(this.deviceDetector.isDesktop()) {
      return this.defaultTeamsDesktop()
    } else {
      return this.defaultTeamsMobile()
    }
  }

  private defaultTeamsDesktop(): Team[] {
    const teamMembers = [
      new TeamMember(new Pokemon("Miraidon", { nature: "Timid", item: "Choice Specs", teraType: "Electric", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet("Electro Drift", "Parabolic Charge", "Volt Switch", "Draco Meteor") }), true),
      new TeamMember(new Pokemon('Koraidon', { nature: "Adamant", item: "Clear Amulet", teraType: "Fire", evs: { hp: 36, atk: 220, spe: 252 }, moveSet: new MoveSet("Flame Charge", "Collision Course", "Flare Blitz", "Protect") }), false),
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
      new TeamMember(new Pokemon("Miraidon", { nature: "Timid", item: "Choice Specs", teraType: "Electric", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet("Electro Drift", "Parabolic Charge", "Volt Switch", "Draco Meteor") }), true)
    ]
    return [new Team(true, "Team 1", teamMembers)]
  }

  private defaultTargets(): Target[] {
    if(this.deviceDetector.isDesktop()) {
      return this.defaultTargetsDesktop()
    } else {
      return this.defaultTargetsMobile()
    }
  }

  private defaultTargetsDesktop(): Target[] {
    return [
      new Target(new Pokemon("Calyrex-Shadow", { nature: "Timid", item: "Focus Sash", teraType: "Fighting", evs: { spa: 252, spd: 4, spe: 252 }, moveSet: new MoveSet("Astral Barrage", "Expanding Force", "Tera Blast", "Protect") }), 0),
      new Target(new Pokemon("Urshifu-Rapid-Strike", { nature: "Jolly", item: "Choice Scarf", teraType: "Water", teraTypeActive: true, evs: { atk: 252, spd: 4, spe: 252 }, moveSet: new MoveSet("Surging Strikes", "Close Combat", "Ice Spinner", "U-turn") }), 0),
      new Target(new Pokemon("Calyrex-Ice", { nature: "Brave", item: "Clear Amulet", teraType: "Fire", evs: { hp: 252, atk: 252, spd: 4 }, moveSet: new MoveSet("Glacial Lance", "Protect", "High Horsepower", "Trick Room") }), 0),
      new Target(new Pokemon("Ogerpon-Wellspring", { nature: "Adamant", item: "Wellspring Mask", teraType: "Water", evs: { hp: 252, atk: 76, def: 148, spd: 28, spe: 4 }, moveSet: new MoveSet("Ivy Cudgel", "Horn Leech", "Spiky Shield", "Follow Me") }), 0),
      new Target(new Pokemon("Amoonguss", { ability: "Regenerator", nature: "Relaxed", item: "Rocky Helmet", teraType: "Water", evs: { hp: 236, def: 236, spd: 36 }, moveSet: new MoveSet("Pollen Puff", "Spore", "Rage Powder", "Protect") }), 0),
      new Target(new Pokemon("Raging Bolt", { nature: "Modest", item: "Booster Energy", teraType: "Fairy", teraTypeActive: true, evs: { hp: 244, spa: 252, spd: 12 }, moveSet: new MoveSet("Thunderclap", "Dragon Pulse", "Calm Mind", "Protect") }), 0),
      new Target(new Pokemon("Rillaboom", { ability: "Grassy Surge", nature: "Adamant", item: "Assault Vest", teraType: "Water", evs: { hp: 172, atk: 252, def: 4, spd: 4, spe: 76 }, moveSet: new MoveSet("Grassy Glide", "Wood Hammer", "U-turn", "Fake Out") }), 0),
      new Target(new Pokemon("Zamazenta-Crowned", { nature: "Impish", item: "Rusted Shield", teraType: "Water", evs: { hp: 196, def: 156, spe: 156 }, moveSet: new MoveSet("Body Press", "Heavy Slam", "Substitute", "Protect") }), 0),
      new Target(new Pokemon("Incineroar", { ability: "Intimidate", nature: "Impish", item: "Sitrus Berry", teraType: "Grass", evs: { hp: 244, atk: 12, def: 76, spd: 100, spe: 76 }, moveSet: new MoveSet("Knock Off", "Fake Out", "Parting Shot", "Will-O-Wisp") }), 0),
      new Target(new Pokemon("Terapagos-Terastal", { nature: "Modest", item: "Leftovers", teraType: "Stellar", evs: { hp: 252, def: 180, spa: 76 }, moveSet: new MoveSet("Tera Starstorm", "Earth Power", "Calm Mind", "Protect") }), 0)
    ]
  }

  private defaultTargetsMobile(): Target[] {
    return [
      new Target(new Pokemon('Koraidon', { nature: "Adamant", item: "Clear Amulet", teraType: "Fire", evs: { hp: 36, atk: 220, spe: 252 }, moveSet: new MoveSet("Flame Charge", "Collision Course", "Flare Blitz", "Protect") }), 0)
    ]
  } 

}
