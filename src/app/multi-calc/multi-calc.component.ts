import { Component, computed, effect, inject, signal } from '@angular/core'
import { CalculatorStore } from 'src/data/store/calculator-store'
import { FieldStore } from 'src/data/store/field-store'
import { MenuStore } from 'src/data/store/menu-store'
import { DamageCalculatorService } from 'src/lib/damage-calculator.service'
import { Field } from 'src/lib/field'
import { Pokemon } from 'src/lib/pokemon'
import { Target } from 'src/lib/target'
import { FieldComponent } from '../field/field.component'
import { TargetPokemonComponent } from '../target-pokemon/target-pokemon.component'
import { TeamComponent } from '../team/team.component'
import { TeamsComponent } from '../teams/teams.component'

@Component({
  selector: 'app-multi-calc',
  templateUrl: './multi-calc.component.html',
  styleUrls: ['./multi-calc.component.scss'],
  standalone: true,
  imports: [TeamComponent, TeamsComponent, FieldComponent, TargetPokemonComponent]
})
export class MultiCalcComponent {
  
  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageCalculatorService)

  pokemonId = signal<string>(this.store.team().activePokemon().id)

  isAttacker = computed(() => this.store.attackerId() === this.pokemonId())
  activeAttacker = computed(() => this.store.findPokemonById(this.store.attackerId()))
  activeSecondAttacker = computed(() => this.store.findPokemonById(this.store.secondAttackerId()))

  constructor() {
    effect(() => {
      if(this.activeSecondAttacker().isDefault()) {
        this.calculateDamageForAll(this.activeAttacker(), this.store.targets(), this.fieldStore.field())
      } else {
        this.calculateDamageForAll(this.activeAttacker(), this.store.targets(), this.fieldStore.field(), this.activeSecondAttacker())
      }      
    })
  }

  targetsImported() {
    if (this.store.findPokemonById(this.pokemonId()).isDefault()) {
      this.pokemonId.set(this.store.team().activePokemon().id)
    }
  }
 
  calculateDamageForAll(attacker: Pokemon, targets: Target[], field: Field, secondAttacker?: Pokemon) {
    targets.forEach(target => {
      if(this.menuStore.oneVsManyActivated()) {
        this.calculateDamageOneVsMany(attacker, target, field, secondAttacker)
      } else {
        this.calculateDamageManyVsOne(attacker, target, targets, field)      
      }
    })

    this.order()
  }

  private calculateDamageOneVsMany(attacker: Pokemon, target: Target, field: Field, secondAttacker?: Pokemon) {
    if(secondAttacker && attacker != secondAttacker) {
      const damageResult = this.damageCalculator.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)
      target.setDamageResult(damageResult)
    } else {
      const damageResult = this.damageCalculator.calcDamage(attacker, target.pokemon, field)
      target.setDamageResult(damageResult)
    }
  }

  private calculateDamageManyVsOne(activeTeamMember: Pokemon, target: Target, targets: Target[], field: Field) {
    const activeTargets = targets.filter(t => t.active)
    
    if(activeTargets.length > 1 && target.active) {
      const damageResult = this.damageCalculator.calcDamageForTwoAttackers(activeTargets[0].pokemon, activeTargets[1].pokemon, activeTeamMember, field)
      activeTargets[0].setDamageResult(damageResult)
      activeTargets[1].setDamageResult(damageResult)
    } else {
      const damageResult = this.damageCalculator.calcDamage(target.pokemon, activeTeamMember, field)
      target.setDamageResult(damageResult)
    }
  }

  private order() {
    this.store.targets().sort((a, b) => {
      if (a.pokemon.isDefault()) return 1
      
      return b.damageResult?.damage - a.damageResult?.damage
    })
  }

}
