import { Component, computed, inject, linkedSignal, OnInit } from "@angular/core"
import { FieldComponent } from "@app/field/field.component"
import { TargetPokemonComponent } from "@app/target-pokemon/target-pokemon.component"
import { TeamComponent } from "@app/team/team.component"
import { TeamsComponent } from "@app/teams/teams.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { MenuStore } from "@data/store/menu-store"
import { DamageMultiCalcService } from "@lib/damage-calculator/damage-multi-calc.service"
import { DamageResultOrderService } from "@lib/damage-calculator/damage-result-order.service"

@Component({
  selector: "app-multi-calc",
  templateUrl: "./multi-calc.component.html",
  styleUrls: ["./multi-calc.component.scss"],
  providers: [DamageMultiCalcService, DamageResultOrderService],
  imports: [TeamComponent, TeamsComponent, FieldComponent, TargetPokemonComponent]
})
export class MultiCalcComponent implements OnInit {
  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  private fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageMultiCalcService)

  pokemonId = linkedSignal<string>(() => this.store.team().activePokemon().id)

  activeAttacker = computed(() => this.store.findPokemonById(this.store.attackerId()))
  activeSecondAttacker = computed(() => this.store.findNullablePokemonById(this.store.secondAttackerId()))
  damageResults = computed(() => this.damageCalculator.calculateDamageForAll(this.activeAttacker(), this.store.targets(), this.fieldStore.field(), this.activeSecondAttacker()))

  ngOnInit() {
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
