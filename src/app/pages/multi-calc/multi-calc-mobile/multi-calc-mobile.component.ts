import { Component, computed, inject, signal } from "@angular/core"
import { NgClass } from "@angular/common"
import { CdkDropList, CdkDropListGroup } from "@angular/cdk/drag-drop"
import { MatIcon } from "@angular/material/icon"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { FIELD_CONTEXT } from "@data/store/tokens/field-context.token"
import { MenuStore } from "@data/store/menu-store"
import { AutomaticFieldService } from "@lib/automatic-field-service"
import { DamageMultiCalcService } from "@lib/damage-calculator/damage-multi-calc.service"
import { DamageResultOrderService } from "@lib/damage-calculator/damage-result-order.service"
import { RollLevelConfig } from "@lib/damage-calculator/roll-level-config"
import { PokemonBuildMobileComponent } from "@features/pokemon-build/pokemon-build-mobile/pokemon-build-mobile.component"
import { PokemonCardComponent } from "@pages/multi-calc/pokemon-card/pokemon-card.component"

@Component({
  selector: "app-multi-calc-mobile",
  templateUrl: "./multi-calc-mobile.component.html",
  styleUrls: ["./multi-calc-mobile.component.scss"],
  imports: [MatIcon, NgClass, PokemonBuildMobileComponent, PokemonCardComponent, CdkDropList, CdkDropListGroup],
  providers: [FieldStore, AutomaticFieldService, DamageMultiCalcService, DamageResultOrderService, { provide: FIELD_CONTEXT, useValue: "multi" }]
})
export class MultiCalcMobileComponent {
  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)

  private fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageMultiCalcService)

  activeBottomTab = signal<"teams" | "field">("teams")

  rollLevelConfig = RollLevelConfig.high()

  activeAttacker = computed(() => this.store.findPokemonById(this.store.attackerId()))

  damageResults = computed(() => this.damageCalculator.calculateDamageForAll(this.activeAttacker(), this.store.targets(), this.fieldStore.field(), true, undefined))

  teamMembers = computed(() => this.store.team().teamMembers)

  activePokemonId = computed(() => this.store.team().activePokemon().id)
}
