import { Component } from '@angular/core';
import { calculate, Generations, Field, Move } from '@smogon/calc';
import { DamageCalculatorService } from 'src/lib/damage-calculator.service';
import { Pokemon } from 'src/lib/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'poke-multi-calc';

  gen = Generations.get(9);

  public pokemon: Pokemon

  constructor(private damageCalculator: DamageCalculatorService) {}
  
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

  calcDamageToAll() {
    if (this.pokemon) {
      const move = new Move(this.gen, this.pokemon.move)

      this.targets.forEach((target) => {
        this.damageCalculator.calcDamage(this.pokemon, target, move, this.field.beadsOfRuinActive, this.field.tabletsOfRuinActive, this.field.swordOfRuinActive, this.field.vesselOfRuinActive)
      })

      this.targets
        .sort((a, b) => b.damage - a.damage)
    }    
  }
}