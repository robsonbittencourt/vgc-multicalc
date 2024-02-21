import { Component } from '@angular/core';
import { KeyValueDiffers, KeyValueDiffer } from '@angular/core';
import { calculate, Generations, Field, Move } from '@smogon/calc';
import { Pokemon } from 'src/lib/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'poke-multi-calc';

  EV_ZERO = 0
  FIRST_EV = 4
  MAX_EVS = 508

  gen = Generations.get(9);

  public pokemon: Pokemon
  
  ragingBolt = new Pokemon('Raging Bolt', "Modest", "Booster Energy", "Protosynthesis", "Fairy", true, { hp: 244, spa: 252, spd: 12 })
  walkingWake = new Pokemon('Walking Wake', "Timid", "Life Orb", "Protosynthesis", "Poison", true, { hp: 4, spa: 252, spe: 252 })
  gougingFire = new Pokemon('Gouging Fire', "Adamant", "Clear Amulet", "Protosynthesis", "Water", false, { hp: 4, atk: 252, spe: 252 })
  entei = new Pokemon('Entei', "Adamant", "Sitrus Berry", "Inner Focus", "Grass", false, { atk: 252, def: 4, spd: 252 })
  incineroar = new Pokemon('Incineroar', "Careful", "Assault Vest", "Intimidate", "Water", false, { hp: 252, atk: 4, spd: 252 })
  urshifu = new Pokemon('Urshifu', "Jolly", "Choice Scarf", "Unseen Fist", "Water", true, { atk: 252, spd: 4, spe: 252 })
  landorus = new Pokemon('Landorus', "Timid", "Life Orb", "Sheer Force", "Flying", false, { spa: 252, spd: 4, spe: 252 })
  ogerponWellspring = new Pokemon('Ogerpon-Wellspring', "Adamant", "Wellspring Mask", "Water Absorb", "Water", false, { hp: 252, atk: 76, def: 148, spd: 28, spe: 4 })

  targets: Pokemon[] = [
    this.ragingBolt,
    this.walkingWake,
    this.gougingFire,
    this.entei,
    this.incineroar,
    this.urshifu,
    this.landorus,
    this.ogerponWellspring
  ]

  field = {
    tabletsOfRuinActive: false,
    vesselOfRuinActive: false,
    swordOfRuinActive: false,
    beadsOfRuinActive: false
  }

  pokemonChanged(pokemon: Pokemon) {
    this.pokemon = pokemon
    this.calcDamageToAll()
  }

  pokemonAdded(pokemon: Pokemon) {
    this.targets.push(pokemon)
    this.calcDamageToAll()
  }

  targetChanged(targets: Pokemon[]) {
    this.targets = targets
    this.calcDamageToAll()
  }

  fieldChanged(field: any) {
    this.field = field
    this.calcDamageToAll()
  }

  calcDamage(attackerPoke: Pokemon, target: Pokemon, move: Move) {
    const gen = Generations.get(9);
    const result = calculate(
      gen,
      attackerPoke.pokemonSmogon,
      target.pokemonSmogon,
      move,
      new Field({ gameType: 'Doubles' })
    );

    //TODO refactory
    if ((result.move.category == 'Special' && this.field.vesselOfRuinActive && !this.field.beadsOfRuinActive) || (result.move.category == 'Physical' && this.field.tabletsOfRuinActive && !this.field.swordOfRuinActive)) {
      (result.damage as Array<number>)[0] = Math.ceil((result.damage as Array<number>)[0] * 0.75);
      (result.damage as Array<number>)[1] = Math.ceil((result.damage as Array<number>)[1] * 0.75);
      (result.damage as Array<number>)[2] = Math.ceil((result.damage as Array<number>)[2] * 0.75);
      (result.damage as Array<number>)[3] = Math.ceil((result.damage as Array<number>)[3] * 0.75);
      (result.damage as Array<number>)[4] = Math.ceil((result.damage as Array<number>)[4] * 0.75);
      (result.damage as Array<number>)[5] = Math.ceil((result.damage as Array<number>)[5] * 0.75);
      (result.damage as Array<number>)[6] = Math.ceil((result.damage as Array<number>)[6] * 0.75);
      (result.damage as Array<number>)[7] = Math.ceil((result.damage as Array<number>)[7] * 0.75);
      (result.damage as Array<number>)[8] = Math.ceil((result.damage as Array<number>)[8] * 0.75);
      (result.damage as Array<number>)[9] = Math.ceil((result.damage as Array<number>)[9] * 0.75);
      (result.damage as Array<number>)[10] = Math.ceil((result.damage as Array<number>)[10] * 0.75);
      (result.damage as Array<number>)[11] = Math.ceil((result.damage as Array<number>)[11] * 0.75);
      (result.damage as Array<number>)[12] = Math.ceil((result.damage as Array<number>)[12] * 0.75);
      (result.damage as Array<number>)[13] = Math.ceil((result.damage as Array<number>)[13] * 0.75);
      (result.damage as Array<number>)[14] = Math.ceil((result.damage as Array<number>)[14] * 0.75);
      (result.damage as Array<number>)[15] = Math.ceil((result.damage as Array<number>)[15] * 0.75);
    }

    if ((result.move.category == 'Special' && this.field.beadsOfRuinActive && !this.field.vesselOfRuinActive) || (result.move.category == 'Physical' && this.field.swordOfRuinActive && !this.field.tabletsOfRuinActive)) {
      (result.damage as Array<number>)[0] = Math.ceil((result.damage as Array<number>)[0] * 1.33);
      (result.damage as Array<number>)[1] = Math.ceil((result.damage as Array<number>)[1] * 1.33);
      (result.damage as Array<number>)[2] = Math.ceil((result.damage as Array<number>)[2] * 1.33);
      (result.damage as Array<number>)[3] = Math.ceil((result.damage as Array<number>)[3] * 1.33);
      (result.damage as Array<number>)[4] = Math.ceil((result.damage as Array<number>)[4] * 1.33);
      (result.damage as Array<number>)[5] = Math.ceil((result.damage as Array<number>)[5] * 1.33);
      (result.damage as Array<number>)[6] = Math.ceil((result.damage as Array<number>)[6] * 1.33);
      (result.damage as Array<number>)[7] = Math.ceil((result.damage as Array<number>)[7] * 1.33);
      (result.damage as Array<number>)[8] = Math.ceil((result.damage as Array<number>)[8] * 1.33);
      (result.damage as Array<number>)[9] = Math.ceil((result.damage as Array<number>)[9] * 1.33);
      (result.damage as Array<number>)[10] = Math.ceil((result.damage as Array<number>)[10] * 1.33);
      (result.damage as Array<number>)[11] = Math.ceil((result.damage as Array<number>)[11] * 1.33);
      (result.damage as Array<number>)[12] = Math.ceil((result.damage as Array<number>)[12] * 1.33);
      (result.damage as Array<number>)[13] = Math.ceil((result.damage as Array<number>)[13] * 1.33);
      (result.damage as Array<number>)[14] = Math.ceil((result.damage as Array<number>)[14] * 1.33);
      (result.damage as Array<number>)[15] = Math.ceil((result.damage as Array<number>)[15] * 1.33);
    }

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

    target.result = result.moveDesc()
    target.koChance = this.capitalizeFirstLetter(koChance)
  }

  calcDamageToAll() {
    if (this.pokemon) {
      const move = new Move(this.gen, this.pokemon.move)

      this.targets.forEach((target) => {
        this.calcDamage(this.pokemon, target, move)
      })

      this.targets
        .sort((a, b) => b.damage - a.damage)
    }    
  }

  capitalizeFirstLetter(string: String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}