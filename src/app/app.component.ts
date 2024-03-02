import { Component } from '@angular/core';
import { Field } from '@smogon/calc';
import { DamageCalculatorService } from 'src/lib/damage-calculator.service';
import { Pokemon } from 'src/lib/pokemon';
import { Target } from 'src/lib/target';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private damageCalculator: DamageCalculatorService) { }

  pokemon: Pokemon
  team: Pokemon[]
  field: Field
  
  targets: Target[] = [
    new Target(new Pokemon('Raging Bolt', "Modest", "Booster Energy", "Protosynthesis", "Fairy", true, { hp: 244, spa: 252, spd: 12 })),
    new Target(new Pokemon('Walking Wake', "Timid", "Life Orb", "Protosynthesis", "Poison", true, { hp: 4, spa: 252, spe: 252 })),
    new Target(new Pokemon('Gouging Fire', "Adamant", "Clear Amulet", "Protosynthesis", "Water", false, { hp: 4, atk: 252, spe: 252 })),
    new Target(new Pokemon('Entei', "Adamant", "Sitrus Berry", "Inner Focus", "Grass", false, { atk: 252, def: 4, spd: 252 })),
    new Target(new Pokemon('Incineroar', "Careful", "Assault Vest", "Intimidate", "Water", false, { hp: 252, atk: 4, spd: 252 })),
    new Target(new Pokemon('Urshifu-Rapid-Strike', "Jolly", "Choice Scarf", "Unseen Fist", "Water", true, { atk: 252, spd: 4, spe: 252 })),
    new Target(new Pokemon('Landorus', "Timid", "Life Orb", "Sheer Force", "Flying", false, { spa: 252, spd: 4, spe: 252 })),
    new Target(new Pokemon('Ogerpon-Wellspring', "Adamant", "Wellspring Mask", "Water Absorb", "Water", false, { hp: 252, atk: 76, def: 148, spd: 28, spe: 4 }))
  ]

  ngOnInit() {
    this.team = [
      new Pokemon("Flutter Mane", "Timid", "Choice Specs", "Protosynthesis", "Fairy", true, { spa: 252 }, "Moon Blast", undefined, undefined, true),
      new Pokemon("Tyranitar", "Timid", "Choice Specs", "Protosynthesis", "Fairy", true, { spa: 252 }, "Moon Blast")
    ]
  }

  activePokemon(): Pokemon {
    return this.team.find(t => t.active)!
  }

  allTeamChanged(team: Pokemon[]) {
    this.team = team
    console.log(team)
    this.calculateDamageForAll()
    this.order()
  }

  pokemonChanged(pokemon: Pokemon) {
    this.pokemon = pokemon
    this.calculateDamageForAll()
    this.order()
  }

  pokemonAdded() {
    if (!this.alreadyExists(this.pokemon)) {
      const target = new Target(this.pokemon.clone())
      this.targets.push(target)

      this.calculateDamage(target)
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
    this.pokemon.status = status
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

  private alreadyExists(pokemon: Pokemon): boolean {
    return this.targets.some(target => {
      return target.pokemon.equals(pokemon)
    })
  }

  private calculateDamage(target: Target, criticalHit: boolean = false) {
    const damageResult = this.damageCalculator.calcDamage(this.pokemon, target.pokemon, this.pokemon.move, this.field, criticalHit)
    target.setDamageResult(damageResult)
  }
  
  private calculateDamageForAll(criticalHit: boolean = false) {
    if (this.pokemon) {
      this.targets.forEach(target => this.calculateDamage(target, criticalHit))
    }
  }

  private order() {
    this.targets.sort((a, b) => b.damageResult?.damage - a.damageResult?.damage)
  }
  
}