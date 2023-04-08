import { Component } from '@angular/core';
import { calculate, Generations, Field, Pokemon, Move, MOVES, NATURES, SPECIES } from '@ajhyndman/smogon-calc';
import { TargetPokemon } from './target-pokemon';

@Component({
  selector: 'app-pokemon-main',
  templateUrl: './pokemon-main.component.html',
  styleUrls: ['./pokemon-main.component.css']
})
export class PokemonMainComponent {

  gen = Generations.get(9);
  field = new Field({ gameType: 'Doubles' });

  ironBundle = new Pokemon(this.gen, 'Iron Bundle', {
    item: 'Booster Energy',
    nature: 'Timid',
    evs: { hp: 4, spa: 252, spe: 252 },
    level: 50
  })

  ironHands = new Pokemon(this.gen, 'Iron Hands', {
    item: 'Leftovers',
    nature: 'Adamant',
    evs: { hp: 84, atk: 236, spd: 188, spe: 0 },
    level: 50
  })

  greatTusk = new Pokemon(this.gen, 'Great Tusk', {
    item: 'Focus Sash',
    nature: 'Jolly',
    evs: { hp: 4, atk: 252, spe: 252 },
    level: 50
  })

  palafin = new Pokemon(this.gen, 'Palafin-Hero', {
    item: 'Mystic Water',
    nature: 'Adamant',
    evs: { hp: 204, atk: 252, def: 4, spd: 4, spe: 44 },
    level: 50,
    teraType: 'Water'
  })

  gholdengo = new Pokemon(this.gen, 'Gholdengo', {
    item: 'Choice Specs',
    nature: 'Modest',
    evs: { hp: 244, def: 4, spa: 252, spd: 4, spe: 4 },
    level: 50
  })

  targets: TargetPokemon[] = [
    new TargetPokemon(this.ironBundle),
    new TargetPokemon(this.ironHands),
    new TargetPokemon(this.greatTusk),
    new TargetPokemon(this.palafin),
    new TargetPokemon(this.gholdengo)
  ]

  public pokemonName = ""
  public nature = ""
  public hp = 0
  public atk = 0
  public def = 0
  public spa = 0
  public spd = 0
  public spe = 0

  public mainPokemonName = ""
  public mainNature = ""
  public mainHp = 0
  public mainAtk = 0
  public mainDef = 0
  public mainSpa = 0
  public mainSpd = 0
  public mainSpe = 0
  public mainMove = ""

  move = new Move(this.gen, 'Moonblast')
  
  mainPokemon = new Pokemon(this.gen, 'Flutter Mane', {
    item: 'Focus Sash',
    nature: 'Timid',
    evs: { hp: 4, spa: 252, spd: 252 },
    level: 50
  })

  allMoveNames = Object.keys(MOVES[9])
  allNatureNames = Object.keys(NATURES)
  allPokemonNames = Object.keys(SPECIES[9])

  changeMove(value: string) {
    this.mainMove = value
  }

  changeMainNature(value: string) {
    this.mainNature = value
  }

  changeMainPokemon(value: string) {
    this.mainPokemonName = value
  }

  changeNature(value: string) {
    this.nature = value
  }

  changePokemon(value: string) {
    this.pokemonName = value
  }

  choosePokemon() {
    this.mainPokemon = new Pokemon(this.gen, this.mainPokemonName, {
      nature: this.mainNature,
      evs: { hp: this.mainHp, atk: this.mainAtk, def: this.mainDef, spa: this.mainSpa, spd: this.mainSpd, spe: this.mainSpe }, 
      level: 50
    })

    this.move = new Move(this.gen, this.mainMove)
  }

  addPokemon() {
    this.targets.push(
      new TargetPokemon(new Pokemon(this.gen, this.pokemonName, {
        nature: this.nature,
        evs: { hp: this.hp, atk: this.atk, def: this.def, spa: this.spa, spd: this.spd, spe: this.spe },
        level: 50
      })
    ))
  }

  removePokemon(index: number) {
    this.targets.splice(index, 1);
  }

  calcDamage(attackerPoke: Pokemon, target: TargetPokemon, move: Move) {
    const gen = Generations.get(9);
    const result = calculate(
      gen,
      attackerPoke,
      target.pokemon,
      move,
      this.field
    );

    const damage = (result.damage as Array<number>)[15]
    const finalDamage = damage ? damage : 0
    const finalDamagePercentage = +((finalDamage / result.defender.stats.hp) * 100).toFixed(1)

    target.damage = finalDamagePercentage

    let koChance
    try {
      koChance = result.kochance().text
    } catch (ex) {
      koChance = "Does not cause any damage"
    }

    target.result = "Damage: " + result.moveDesc() + " - " + koChance
  }

  calcDamageToAll() {
    this.targets.forEach((target) => {
      this.calcDamage(this.mainPokemon, target, this.move)
    })

    this.targets
      .sort((a, b) => b.damage - a.damage)
  }
}
