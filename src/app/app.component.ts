import { Component } from '@angular/core';
import { Field } from '@smogon/calc';
import { DamageCalculatorService } from 'src/lib/damage-calculator.service';
import { Pokemon } from 'src/lib/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private damageCalculator: DamageCalculatorService) { }

  title = 'poke-multi-calc';
  pokemon: Pokemon
  field: Field
  
  targets: Pokemon[] = [
    new Pokemon('Raging Bolt', "Modest", "Booster Energy", "Protosynthesis", "Fairy", true, { hp: 244, spa: 252, spd: 12 }),
    new Pokemon('Walking Wake', "Timid", "Life Orb", "Protosynthesis", "Poison", true, { hp: 4, spa: 252, spe: 252 }),
    new Pokemon('Gouging Fire', "Adamant", "Clear Amulet", "Protosynthesis", "Water", false, { hp: 4, atk: 252, spe: 252 }),
    new Pokemon('Entei', "Adamant", "Sitrus Berry", "Inner Focus", "Grass", false, { atk: 252, def: 4, spd: 252 }),
    new Pokemon('Incineroar', "Careful", "Assault Vest", "Intimidate", "Water", false, { hp: 252, atk: 4, spd: 252 }),
    new Pokemon('Urshifu', "Jolly", "Choice Scarf", "Unseen Fist", "Water", true, { atk: 252, spd: 4, spe: 252 }),
    new Pokemon('Landorus', "Timid", "Life Orb", "Sheer Force", "Flying", false, { spa: 252, spd: 4, spe: 252 }),
    new Pokemon('Ogerpon-Wellspring', "Adamant", "Wellspring Mask", "Water Absorb", "Water", false, { hp: 252, atk: 76, def: 148, spd: 28, spe: 4 })
  ]

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
      this.targets.forEach((target) => {
        this.damageCalculator.calcDamage(this.pokemon, target, this.pokemon.move, this.field)
      })

      this.targets.sort((a, b) => b.damage - a.damage)
    }
  }
}