import { Component, computed, inject, signal } from '@angular/core'
import { CalculatorStore } from 'src/data/store/calculator-store'
import { FieldStore } from 'src/data/store/field-store'
import { MenuStore } from 'src/data/store/menu-store'
import { DamageCalculatorService } from 'src/lib/damage-calculator.service'
import { DamageResult } from 'src/lib/damage-result'
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

  activeAttacker = computed(() => this.store.findPokemonById(this.store.attackerId()))
  activeSecondAttacker = computed(() => this.store.findNullablePokemonById(this.store.secondAttackerId()))
  damageResults = computed(() => this.calculateDamageForAll(this.activeAttacker(), this.store.targets(), this.fieldStore.field(), this.activeSecondAttacker()))

  targetWithSpecificCalc = this.targetsWithSpecificCalc()
  targetsActive = this.activeTargetsIds()
  actualOrder: string[] = []

  targetsImported() {
    if (this.store.findPokemonById(this.pokemonId()).isDefault()) {
      this.pokemonId.set(this.store.team().activePokemon().id)
    }
  }
 
  calculateDamageForAll(attacker: Pokemon, targets: Target[], field: Field, secondAttacker?: Pokemon): DamageResult[] {
    const results = targets.flatMap(target => {
      if(this.menuStore.oneVsManyActivated()) {
        return this.calculateDamageOneVsMany(attacker, target, field, secondAttacker)
      } else {
        return this.calculateDamageManyVsOne(attacker, target, targets, field)      
      }
    })

    const withoutDuplicates = this.removeDuplicatedResults(results)
      
    return this.order(withoutDuplicates)
  }

  private calculateDamageOneVsMany(attacker: Pokemon, target: Target, field: Field, secondAttacker?: Pokemon): DamageResult[] {
    if(secondAttacker && attacker != secondAttacker) {
      return this.damageCalculator.calcDamageForTwoAttackers(attacker, secondAttacker, target.pokemon, field)
    } else {
      return [this.damageCalculator.calcDamage(attacker, target.pokemon, field)]
    }
  }

  private calculateDamageManyVsOne(activeTeamMember: Pokemon, target: Target, targets: Target[], field: Field): DamageResult[] {
    const activeTargets = targets.filter(t => t.active)
    
    if(activeTargets.length > 1 && target.active) {
      return this.damageCalculator.calcDamageForTwoAttackers(activeTargets[0].pokemon, activeTargets[1].pokemon, activeTeamMember, field)
    } else {
      return [this.damageCalculator.calcDamage(target.pokemon, activeTeamMember, field)]
    }
  }

  private removeDuplicatedResults(results: DamageResult[]) {
    if(this.menuStore.oneVsManyActivated()) {
      return results.filter((result, index) =>
        results.findIndex(other => result.defender.equals(other.defender)) === index
      )
    } else {
      return results.filter((result, index) =>
        results.findIndex(other => result.attacker.equals(other.attacker)) === index
      )
    }
  }

  private targetsWithSpecificCalc(): number {
    const withTera = this.store.targets().filter(t => t.pokemon.teraTypeActive).length
    const withCommander = this.store.targets().filter(t => t.pokemon.commanderActivated).length

    return withTera + withCommander
  }

  private activeTargetsIds(): string[] {
    return this.store.targets().filter(target => target.active).map(target => target.pokemon.id)
  }

  private order(results: DamageResult[]): DamageResult[] {
    const actualTargetsActive = this.activeTargetsIds()
    const actualTargetWithSpecificCalc = this.targetsWithSpecificCalc()

    if (this.changeHappenedInTargets(actualTargetsActive, actualTargetWithSpecificCalc)) {
      this.applyActualOrder(results)
      this.targetsActive = actualTargetsActive
      this.targetWithSpecificCalc = actualTargetWithSpecificCalc
    } else {
      this.applyOrderByDamage(results)
    }    

    this.actualOrder = results.map(result => this.pokemonIdToOrder(result))

    return results
  }

  private changeHappenedInTargets(activeTargetsIds: string[], targetIdsWithSpecificCalc: number) {
    return activeTargetsIds[0] != this.targetsActive[0] ||
      activeTargetsIds[1] != this.targetsActive[1] ||
      targetIdsWithSpecificCalc != this.targetWithSpecificCalc
  }

  private applyActualOrder(results: DamageResult[]) {
    results.sort((a, b) => {
      const indexA = this.actualOrder.indexOf(this.pokemonIdToOrder(a))
      const indexB = this.actualOrder.indexOf(this.pokemonIdToOrder(b))
      return indexA - indexB
    })
  }

  private applyOrderByDamage(results: DamageResult[]) {
    results.sort((a, b) => {
      if(this.menuStore.oneVsManyActivated() && a.defender.isDefault()) return 1
      if(this.menuStore.manyVsOneActivated() && a.attacker.isDefault()) return 1
      
      return b.damage - a.damage
    })
  }

  private pokemonIdToOrder(result: DamageResult): string {
    return this.menuStore.oneVsManyActivated() ? result.defender.id : result.attacker.id
  }

}
