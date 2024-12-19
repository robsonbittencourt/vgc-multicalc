import { Component, computed, inject, linkedSignal } from '@angular/core'
import { CalculatorStore } from 'src/data/store/calculator-store'
import { FieldStore } from 'src/data/store/field-store'
import { MenuStore } from 'src/data/store/menu-store'
import { DamageMultiCalcService } from 'src/lib/damage-calculator/damage-multi-calc.service'
import { DamageResultOrderService } from 'src/lib/damage-calculator/damage-result-order.service'
import { FieldComponent } from '../field/field.component'
import { TargetPokemonComponent } from '../target-pokemon/target-pokemon.component'
import { TeamComponent } from '../team/team.component'
import { TeamsComponent } from '../teams/teams.component'

@Component({
  selector: 'app-multi-calc',
  templateUrl: './multi-calc.component.html',
  styleUrls: ['./multi-calc.component.scss'],
  providers: [DamageMultiCalcService, DamageResultOrderService],
  imports: [TeamComponent, TeamsComponent, FieldComponent, TargetPokemonComponent]
})
export class MultiCalcComponent {
  
  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  private fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageMultiCalcService)

  pokemonId = linkedSignal<string>(() => this.store.team().activePokemon().id)

  activeAttacker = computed(() => this.store.findPokemonById(this.store.attackerId()))
  activeSecondAttacker = computed(() => this.store.findNullablePokemonById(this.store.secondAttackerId()))
  damageResults = computed(() => this.damageCalculator.calculateDamageForAll(this.activeAttacker(), this.store.targets(), this.fieldStore.field(), this.activeSecondAttacker()))

  ngOnInit() {
    this.pokemonId.set(this.store.team().first().pokemon.id)
    this.store.updateSecondAttacker("")
    this.store.updateTeamMembersActive(true, false, false, false, false, false)
    this.store.deactivateTargets()
  }

  targetsImported() {
    if (this.store.findPokemonById(this.pokemonId()).isDefault()) {
      this.pokemonId.set(this.store.team().activePokemon().id)
    }
  }

}
