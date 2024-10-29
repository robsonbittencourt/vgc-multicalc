import { Injectable, inject } from '@angular/core';
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
  private deviceDetector = inject(DeviceDetectorService)

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

  defaultLeftPokemon(): Pokemon {
    return new Pokemon("Gholdengo", { ability: "Good as Gold", item: "Choice Specs", nature: "Timid", teraType: "Steel", evs: { hp: 4, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }, moveSet: new MoveSet("Make It Rain", "Shadow Ball", "Protect", "Nasty Plot") })
  }

  defaultRightPokemon(): Pokemon {
    return new Pokemon("Rillaboom", { ability: "Grassy Surge", nature: "Adamant", item: "Assault Vest", teraType: "Fire", evs: { hp: 252, atk: 116, def: 4, spd: 60, spe: 76 }, moveSet: new MoveSet("Grassy Glide", "Wood Hammer", "U-turn", "Fake Out") })
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
      new TeamMember(new Pokemon("Gholdengo", { ability: "Good as Gold", nature: "Timid", item: "Choice Specs", teraType: "Steel", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet("Make It Rain", "Shadow Ball", "Protect", "Nasty Plot") }), true),
      new TeamMember(new Pokemon("Rillaboom", { ability: "Grassy Surge", nature: "Adamant", item: "Assault Vest", teraType: "Fire", evs: { hp: 252, atk: 116, def: 4, spd: 60, spe: 76 }, moveSet: new MoveSet("Fake Out", "Grassy Glide", "Wood Hammer", "U-turn") }), false),
      new TeamMember(new Pokemon("Kingambit", { ability: "Defiant", nature: "Adamant", item: "Black Glasses", teraType: "Dark", evs: { hp: 252, atk: 252, spd: 4 }, moveSet: new MoveSet("Sucker Punch", "Kowtow Cleave", "Protect", "Swords Dance") }), false),
      new TeamMember(new Pokemon("Sneasler", { ability: "Poison Touch", nature: "Jolly", item: "Focus Sash", teraType: "Stellar", evs: { hp: 4, atk: 252, spe: 252 }, moveSet: new MoveSet("Close Combat", "Dire Claw", "Protect", "Fake Out") }), false),
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
      new TeamMember(new Pokemon("Gholdengo", { ability: "Good as Gold", nature: "Timid", item: "Choice Specs", teraType: "Steel", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet("Make It Rain", "Shadow Ball", "Protect", "Nasty Plot") }), true)
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
      new Target(new Pokemon("Kingambit", { ability: "Defiant", nature: "Adamant", item: "Black Glasses", teraType: "Dark", evs: { hp: 252, atk: 252, spd: 4 }, moveSet: new MoveSet("Sucker Punch", "Kowtow Cleave", "Protect", "Swords Dance") }), 0),
      new Target(new Pokemon("Gholdengo", { ability: "Good as Gold", nature: "Timid", item: "Choice Specs", teraType: "Steel", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet("Make It Rain", "Shadow Ball", "Protect", "Nasty Plot") }), 0),
      new Target(new Pokemon("Rillaboom", { ability: "Grassy Surge", nature: "Adamant", item: "Assault Vest", teraType: "Fire", evs: { hp: 252, atk: 116, def: 4, spd: 60, spe: 76 }, moveSet: new MoveSet("Fake Out", "Grassy Glide", "Wood Hammer", "U-turn") }), 0),
      new Target(new Pokemon("Incineroar", { ability: "Intimidate", nature: "Adamant", item: "Safety Goggles", teraType: "Ghost", evs: { hp: 228, atk: 36, def: 4, spd: 36, spe: 204 }, moveSet: new MoveSet("Fake Out", "Knock Off", "Flare Blitz", "Parting Shot") }), 0),
      new Target(new Pokemon("Primarina", { ability: "Liquid Voice", nature: "Modest", item: "Throat Spray", teraType: "Poison", evs: { hp: 172, def: 252, spa: 20, spd: 4, spe: 60 }, moveSet: new MoveSet("Moonblast", "Hyper Voice", "Haze", "Protect") }), 0),
      new Target(new Pokemon("Amoonguss", { ability: "Regenerator", nature: "Calm", item: "Sitrus Berry", teraType: "Water", evs: { hp: 236, def: 36, spd: 236 }, moveSet: new MoveSet("Spore", "Rage Powder", "Pollen Puff", "Protect") }), 0),
      new Target(new Pokemon("Sneasler", { ability: "Poison Touch", nature: "Jolly", item: "Focus Sash", teraType: "Stellar", evs: { hp: 4, atk: 252, spe: 252 }, moveSet: new MoveSet("Close Combat", "Dire Claw", "Protect", "Fake Out") }), 0),
      new Target(new Pokemon("Dragonite", { ability: "Inner Focus", nature: "Adamant", item: "Choice Band", teraType: "Flying", evs: { hp: 4, atk: 252, spe: 252 }, moveSet: new MoveSet("Extreme Speed", "Tera Blast", "Stomping Tantrum", "Ice Spinner") }), 0),
      new Target(new Pokemon("Garchomp", { ability: "Rough Skin", nature: "Jolly", item: "Life Orb", teraType: "Steel", evs: { hp: 4, atk: 252, spe: 252 }, moveSet: new MoveSet("Protect", "Dragon Claw", "Earthquake", "Stomping Tantrum") }), 0),
      new Target(new Pokemon("Archaludon", { ability: "Stamina", nature: "Timid", item: "Assault Vest", teraType: "Grass", evs: { spa: 252, spd: 4, spe: 252 }, moveSet: new MoveSet("Electro Shot", "Flash Cannon", "Draco Meteor", "Body Press") }), 0),
      new Target(new Pokemon("Porygon2", { ability: "Download", nature: "Quiet", item: "Eviolite", teraType: "Fighting", evs: { hp: 252, atk: 4, def: 124, spa: 92, spd: 36 }, moveSet: new MoveSet("Trick Room", "Recover", "Ice Beam", "Tera Blast") }), 0),
      new Target(new Pokemon("Electabuzz", { ability: "Vital Spirit", nature: "Bold", item: "Eviolite", teraType: "Ghost", evs: { hp: 228, def: 244, spa: 4, spd: 4, spe: 28 }, moveSet: new MoveSet("Follow Me", "Protect", "Electroweb", "Taunt") }), 0),
      new Target(new Pokemon("Volcarona", { ability: "Flame Body", nature: "Timid", item: "Leftovers", teraType: "Grass", evs: { hp: 188, def: 52, spa: 12, spd: 4, spe: 252 }, moveSet: new MoveSet("Protect", "Quiver Dance", "Giga Drain", "Heat Wave") }), 0),
      new Target(new Pokemon("Dondozo", { ability: "Unaware", nature: "Jolly", item: "Leftovers", teraType: "Grass", evs: { hp: 4, atk: 252, def: 4, spd: 36, spe: 212 }, moveSet: new MoveSet("Protect", "Wave Crash", "Order Up", "Earthquake") }), 0),
      new Target(new Pokemon("Basculegion", { ability: "Swift Swim", nature: "Adamant", item: "Choice Scarf", teraType: "Water", evs: { hp: 148, atk: 252, def: 4, spd: 4, spe: 100 }, moveSet: new MoveSet("Last Respects", "Wave Crash", "Aqua Jet", "Flip Turn") }), 0),
      new Target(new Pokemon("Pelipper", { ability: "Drizzle", nature: "Modest", item: "Focus Sash", teraType: "Stellar", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet("Hurricane", "Weather Ball", "Protect", "Tailwind") }), 0),
      new Target(new Pokemon("Dragapult", { ability: "Clear Body", nature: "Adamant", item: "Choice Band", teraType: "Dragon", evs: { hp: 4, atk: 252, spe: 252 }, moveSet: new MoveSet("U-turn", "Dragon Darts", "Phantom Force", "Outrage") }), 0),
      new Target(new Pokemon("Ursaluna", { ability: "Guts", nature: "Brave", item: "Flame Orb", teraType: "Ghost", evs: { hp: 252, atk: 252, spd: 4 }, moveSet: new MoveSet("Facade", "Headlong Rush", "Protect", "Earthquake") }), 0),
      new Target(new Pokemon("Tyranitar", { ability: "Sand Stream", nature: "Jolly", item: "Assault Vest", teraType: "Flying", evs: { hp: 4, atk: 252, spe: 252 }, moveSet: new MoveSet("Rock Slide", "Knock Off", "Low Kick", "Tera Blast") }), 0),
      new Target(new Pokemon("Talonflame", { ability: "Gale Wings", nature: "Jolly", item: "Covert Cloak", teraType: "Ghost", evs: { hp: 4, atk: 252, spe: 252 }, moveSet: new MoveSet("Tailwind", "Brave Bird", "Will-O-Wisp", "Taunt") }), 0),
      new Target(new Pokemon("Glimmora", { ability: "Toxic Debris", nature: "Timid", item: "Power Herb", teraType: "Grass", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet("Earth Power", "Sludge Bomb", "Spiky Shield", "Meteor Beam") }), 0),
      new Target(new Pokemon("Tatsugiri", { ability: "Commander", nature: "Timid", item: "Choice Scarf", teraType: "Steel", evs: { spa: 252, spd: 4, spe: 252 }, moveSet: new MoveSet("Draco Meteor", "Muddy Water", "Icy Wind", "Dragon Pulse") }), 0),
      new Target(new Pokemon("Annihilape", { ability: "Defiant", nature: "Jolly", item: "Choice Scarf", teraType: "Fire", evs: { hp: 252, atk: 4, spe: 252 }, moveSet: new MoveSet("Rage Fist", "Drain Punch", "Protect", "Bulk Up") }), 0),
      new Target(new Pokemon("Ursaluna-Bloodmoon", { ability: "Mind's Eye", nature: "Modest", item: "Life Orb", teraType: "Normal", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet("Blood Moon", "Earth Power", "Hyper Voice", "Protect") }), 0)
    ]
  }

  private defaultTargetsMobile(): Target[] {
    return [
      new Target(new Pokemon("Rillaboom", { ability: "Grassy Surge", nature: "Adamant", item: "Assault Vest", teraType: "Fire", evs: { hp: 252, atk: 116, def: 4, spd: 60, spe: 76 }, moveSet: new MoveSet("Fake Out", "Grassy Glide", "Wood Hammer", "U-turn") }), 0)
    ]
  } 

}
