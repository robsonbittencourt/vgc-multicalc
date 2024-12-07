import { Injectable, inject } from '@angular/core';
import { defaultPokemon } from 'src/lib/default-pokemon';
import { DeviceDetectorService } from 'src/lib/device-detector.service';
import { MoveSet } from 'src/lib/moveset';
import { Pokemon } from 'src/lib/pokemon';
import { RollLevelConfig } from 'src/lib/roll-level-config';
import { Target } from 'src/lib/target';
import { Team } from 'src/lib/team';
import { TeamMember } from 'src/lib/team-member';
import { Move } from './move';
import { MovePosition } from './types';

@Injectable({ providedIn: 'root' })
export class DataStore {
  private deviceDetector = inject(DeviceDetectorService)

  oneVsOneActivated: boolean = true
  oneVsManyActivated: boolean = false
  manyVsOneActivated: boolean = false
  speedCalculatorActivated: boolean = false
  
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
    if (userData.leftPokemon) {
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
    return userData.targets.map((target: any) => {
      const pokemon = this.buildPokemonFromUserData(target.pokemon)
      const newTarget = new Target(pokemon)
      
      return newTarget
    })
  }

  buildPokemonFromUserData(pokemon: any) {
    const activeMovePosition = (pokemon.moveSet.findIndex((moveName: string) => moveName == pokemon.activeMove) + 1) as MovePosition
    const moveSet = new MoveSet(new Move(pokemon.moveSet[0]), new Move(pokemon.moveSet[1]), new Move(pokemon.moveSet[2]), new Move(pokemon.moveSet[3]), activeMovePosition)

    return new Pokemon(pokemon.name, { ability: pokemon.ability, nature: pokemon.nature, item: pokemon.item, teraType: pokemon.teraType, teraTypeActive: pokemon.teraTypeActive, evs: pokemon.evs, moveSet: moveSet, boosts: pokemon.boosts, status: pokemon.status, ivs: pokemon.ivs })
  }

  buildUserData(): any {
    return {
      oneVsManyActivated: this.oneVsManyActivated,
      manyVsOneActivated: this.manyVsOneActivated,
      speedCalculatorActivated: this.speedCalculatorActivated,
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

  defaultLeftPokemon(): Pokemon {
    return new Pokemon("Gholdengo", { ability: "Good as Gold", item: "Choice Specs", nature: "Timid", teraType: "Steel", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }, moveSet: new MoveSet(new Move("Make It Rain"), new Move("Shadow Ball"), new Move("Protect"), new Move("Nasty Plot")) })
  }

  defaultRightPokemon(): Pokemon {
    return new Pokemon("Rillaboom", { ability: "Grassy Surge", nature: "Adamant", item: "Assault Vest", teraType: "Fire", evs: { hp: 252, atk: 116, def: 4, spd: 60, spe: 76 }, moveSet: new MoveSet(new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("U-turn"), new Move("Fake Out")) })
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
      new TeamMember(new Pokemon("Gholdengo", { ability: "Good as Gold", nature: "Timid", item: "Choice Specs", teraType: "Steel", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet(new Move("Make It Rain"), new Move("Shadow Ball"), new Move("Protect"), new Move("Nasty Plot")) }), true),
      new TeamMember(new Pokemon("Rillaboom", { ability: "Grassy Surge", nature: "Adamant", item: "Assault Vest", teraType: "Fire", evs: { hp: 252, atk: 116, def: 4, spd: 60, spe: 76 }, moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("U-turn")) }), false),
      new TeamMember(new Pokemon("Kingambit", { ability: "Defiant", nature: "Adamant", item: "Black Glasses", teraType: "Dark", evs: { hp: 252, atk: 252, spd: 4 }, moveSet: new MoveSet(new Move("Sucker Punch"), new Move("Kowtow Cleave"), new Move("Protect"), new Move("Swords Dance")) }), false),
      new TeamMember(new Pokemon("Sneasler", { ability: "Poison Touch", nature: "Jolly", item: "Focus Sash", teraType: "Stellar", evs: { hp: 4, atk: 252, spe: 252 }, moveSet: new MoveSet(new Move("Close Combat"), new Move("Dire Claw"), new Move("Protect"), new Move("Fake Out")) }), false),
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
      new TeamMember(new Pokemon("Gholdengo", { ability: "Good as Gold", nature: "Timid", item: "Choice Specs", teraType: "Steel", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet(new Move("Make It Rain"), new Move("Shadow Ball"), new Move("Protect"), new Move("Nasty Plot")) }), true)
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
      new Target(new Pokemon("Kingambit", { ability: "Defiant", nature: "Adamant", item: "Black Glasses", teraType: "Dark", evs: { hp: 252, atk: 252, spd: 4 }, moveSet: new MoveSet(new Move("Sucker Punch"), new Move("Kowtow Cleave"), new Move("Protect"), new Move("Swords Dance")) })),
      new Target(new Pokemon("Gholdengo", { ability: "Good as Gold", nature: "Timid", item: "Choice Specs", teraType: "Steel", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet(new Move("Make It Rain"), new Move("Shadow Ball"), new Move("Protect"), new Move("Nasty Plot")) })),
      new Target(new Pokemon("Rillaboom", { ability: "Grassy Surge", nature: "Adamant", item: "Assault Vest", teraType: "Fire", evs: { hp: 252, atk: 116, def: 4, spd: 60, spe: 76 }, moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("U-turn")) })),
      new Target(new Pokemon("Incineroar", { ability: "Intimidate", nature: "Adamant", item: "Safety Goggles", teraType: "Ghost", evs: { hp: 228, atk: 36, def: 4, spd: 36, spe: 204 }, moveSet: new MoveSet(new Move("Fake Out"), new Move("Knock Off"), new Move("Flare Blitz"), new Move("Parting Shot")) })),
      new Target(new Pokemon("Primarina", { ability: "Liquid Voice", nature: "Modest", item: "Throat Spray", teraType: "Poison", evs: { hp: 172, def: 252, spa: 20, spd: 4, spe: 60 }, moveSet: new MoveSet(new Move("Moonblast"), new Move("Hyper Voice"), new Move("Haze"), new Move("Protect")) })),
      new Target(new Pokemon("Amoonguss", { ability: "Regenerator", nature: "Calm", item: "Sitrus Berry", teraType: "Water", evs: { hp: 236, def: 36, spd: 236 }, moveSet: new MoveSet(new Move("Spore"), new Move("Rage Powder"), new Move("Pollen Puff"), new Move("Protect")) })),
      new Target(new Pokemon("Sneasler", { ability: "Poison Touch", nature: "Jolly", item: "Focus Sash", teraType: "Stellar", evs: { hp: 4, atk: 252, spe: 252 }, moveSet: new MoveSet(new Move("Close Combat"), new Move("Dire Claw"), new Move("Protect"), new Move("Fake Out")) })),
      new Target(new Pokemon("Dragonite", { ability: "Inner Focus", nature: "Adamant", item: "Choice Band", teraType: "Flying", evs: { hp: 4, atk: 252, spe: 252 }, moveSet: new MoveSet(new Move("Extreme Speed"), new Move("Tera Blast"), new Move("Stomping Tantrum"), new Move("Ice Spinner")) })),
      new Target(new Pokemon("Garchomp", { ability: "Rough Skin", nature: "Jolly", item: "Life Orb", teraType: "Steel", evs: { hp: 4, atk: 252, spe: 252 }, moveSet: new MoveSet(new Move("Protect"), new Move("Dragon Claw"), new Move("Earthquake"), new Move("Stomping Tantrum")) })),
      new Target(new Pokemon("Archaludon", { ability: "Stamina", nature: "Timid", item: "Assault Vest", teraType: "Grass", evs: { spa: 252, spd: 4, spe: 252 }, moveSet: new MoveSet(new Move("Electro Shot"), new Move("Flash Cannon"), new Move("Draco Meteor"), new Move("Body Press")) })),
      new Target(new Pokemon("Porygon2", { ability: "Download", nature: "Quiet", item: "Eviolite", teraType: "Fighting", evs: { hp: 252, atk: 4, def: 124, spa: 92, spd: 36 }, moveSet: new MoveSet(new Move("Trick Room"), new Move("Recover"), new Move("Ice Beam"), new Move("Tera Blast")) })),
      new Target(new Pokemon("Electabuzz", { ability: "Vital Spirit", nature: "Bold", item: "Eviolite", teraType: "Ghost", evs: { hp: 228, def: 244, spa: 4, spd: 4, spe: 28 }, moveSet: new MoveSet(new Move("Follow Me"), new Move("Protect"), new Move("Electroweb"), new Move("Taunt")) })),
      new Target(new Pokemon("Volcarona", { ability: "Flame Body", nature: "Timid", item: "Leftovers", teraType: "Grass", evs: { hp: 188, def: 52, spa: 12, spd: 4, spe: 252 }, moveSet: new MoveSet(new Move("Protect"), new Move("Quiver Dance"), new Move("Giga Drain"), new Move("Heat Wave")) })),
      new Target(new Pokemon("Dondozo", { ability: "Unaware", nature: "Jolly", item: "Leftovers", teraType: "Grass", evs: { hp: 4, atk: 252, def: 4, spd: 36, spe: 212 }, moveSet: new MoveSet(new Move("Protect"), new Move("Wave Crash"), new Move("Order Up"), new Move("Earthquake")) })),
      new Target(new Pokemon("Basculegion", { ability: "Swift Swim", nature: "Adamant", item: "Choice Scarf", teraType: "Water", evs: { hp: 148, atk: 252, def: 4, spd: 4, spe: 100 }, moveSet: new MoveSet(new Move("Last Respects"), new Move("Wave Crash"), new Move("Aqua Jet"), new Move("Flip Turn")) })),
      new Target(new Pokemon("Pelipper", { ability: "Drizzle", nature: "Modest", item: "Focus Sash", teraType: "Stellar", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet(new Move("Hurricane"), new Move("Weather Ball"), new Move("Protect"), new Move("Tailwind")) })),
      new Target(new Pokemon("Dragapult", { ability: "Clear Body", nature: "Adamant", item: "Choice Band", teraType: "Dragon", evs: { hp: 4, atk: 252, spe: 252 }, moveSet: new MoveSet(new Move("U-turn"), new Move("Dragon Darts"), new Move("Phantom Force"), new Move("Outrage")) })),
      new Target(new Pokemon("Ursaluna", { ability: "Guts", nature: "Brave", item: "Flame Orb", teraType: "Ghost", evs: { hp: 252, atk: 252, spd: 4 }, moveSet: new MoveSet(new Move("Facade"), new Move("Headlong Rush"), new Move("Protect"), new Move("Earthquake")) })),
      new Target(new Pokemon("Tyranitar", { ability: "Sand Stream", nature: "Jolly", item: "Assault Vest", teraType: "Flying", evs: { hp: 4, atk: 252, spe: 252 }, moveSet: new MoveSet(new Move("Rock Slide"), new Move("Knock Off"), new Move("Low Kick"), new Move("Tera Blast")) })),
      new Target(new Pokemon("Talonflame", { ability: "Gale Wings", nature: "Jolly", item: "Covert Cloak", teraType: "Ghost", evs: { hp: 4, atk: 252, spe: 252 }, moveSet: new MoveSet(new Move("Tailwind"), new Move("Brave Bird"), new Move("Will-O-Wisp"), new Move("Taunt")) })),
      new Target(new Pokemon("Glimmora", { ability: "Toxic Debris", nature: "Timid", item: "Power Herb", teraType: "Grass", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet(new Move("Earth Power"), new Move("Sludge Bomb"), new Move("Spiky Shield"), new Move("Meteor Beam")) })),
      new Target(new Pokemon("Tatsugiri", { ability: "Commander", nature: "Timid", item: "Choice Scarf", teraType: "Steel", evs: { spa: 252, spd: 4, spe: 252 }, moveSet: new MoveSet(new Move("Draco Meteor"), new Move("Muddy Water"), new Move("Icy Wind"), new Move("Dragon Pulse")) })),
      new Target(new Pokemon("Annihilape", { ability: "Defiant", nature: "Jolly", item: "Choice Scarf", teraType: "Fire", evs: { hp: 252, atk: 4, spe: 252 }, moveSet: new MoveSet(new Move("Rage Fist"), new Move("Drain Punch"), new Move("Protect"), new Move("Bulk Up")) })),
      new Target(new Pokemon("Ursaluna-Bloodmoon", { ability: "Mind's Eye", nature: "Modest", item: "Life Orb", teraType: "Normal", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet(new Move("Blood Moon"), new Move("Earth Power"), new Move("Hyper Voice"), new Move("Protect")) }))
    ]
  }

  private defaultTargetsMobile(): Target[] {
    return [
      new Target(new Pokemon("Rillaboom", { ability: "Grassy Surge", nature: "Adamant", item: "Assault Vest", teraType: "Fire", evs: { hp: 252, atk: 116, def: 4, spd: 60, spe: 76 }, moveSet: new MoveSet(new Move("Fake Out"), new Move("Grassy Glide"), new Move("Wood Hammer"), new Move("U-turn")) }))
    ]
  } 

}
