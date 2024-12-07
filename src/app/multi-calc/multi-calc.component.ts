import { Component, computed, effect, inject, signal } from '@angular/core'
import { DataStore as NewDataStore } from 'src/data/data-store'
import { FieldStore } from 'src/data/field-store'
import { DamageCalculatorService } from 'src/lib/damage-calculator.service'
import { DataStore } from 'src/lib/data-store.service'
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
  
  data = inject(DataStore)
  newData = inject(NewDataStore)
  fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageCalculatorService)

  pokemonId = signal<string>(this.newData.team().activePokemon().id)

  isAttacker = computed(() => this.newData.activeAttacker().equals(this.newData.findPokemonById(this.pokemonId())))

  constructor() {
    effect(() => {
      if(this.newData.activeSecondAttacker().isDefault()) {
        this.calculateDamageForAll(this.newData.activeAttacker(), this.newData.targets(), this.fieldStore.field())
      } else {
        this.calculateDamageForAll(this.newData.activeAttacker(), this.newData.targets(), this.fieldStore.field(), this.newData.activeSecondAttacker())
      }      
    })
  }

  targetsImported() {
    if (this.newData.findPokemonById(this.pokemonId()).isDefault()) {
      this.pokemonId.set(this.newData.team().activePokemon().id)
    }
  }
 
  calculateDamageForAll(attacker: Pokemon, targets: Target[], field: Field, secondAttacker?: Pokemon) {
    targets.forEach(target => {
      if(this.data.oneVsManyActivated) {
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
    this.newData.targets().sort((a, b) => {
      if (a.pokemon.isDefault()) return 1
      
      return b.damageResult?.damage - a.damageResult?.damage
    })
  }

}
