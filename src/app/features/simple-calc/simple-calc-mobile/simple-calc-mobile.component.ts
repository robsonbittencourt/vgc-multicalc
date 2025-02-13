import { Component, computed, inject, signal } from "@angular/core"
import { CopyButtonComponent } from "@app/shared/buttons/copy-button/copy-button.component"
import { FieldComponent } from "@app/shared/field/field.component"
import { PokemonBuildMobileComponent } from "@app/shared/pokemon-build/pokemon-build-mobile/pokemon-build-mobile.component"
import { PokemonComboBoxComponent } from "@app/shared/pokemon-build/pokemon-combo-box/pokemon-combo-box.component"
import { PokemonTabComponent } from "@app/shared/team/pokemon-tab/pokemon-tab.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"

@Component({
  selector: "app-simple-calc-mobile",
  templateUrl: "./simple-calc-mobile.component.html",
  styleUrls: ["./simple-calc-mobile.component.scss"],
  imports: [PokemonComboBoxComponent, PokemonTabComponent, PokemonBuildMobileComponent, FieldComponent, CopyButtonComponent]
})
export class SimpleCalcMobileComponent {
  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageCalculatorService)

  attacker = signal(this.store.leftPokemon())

  leftIsAttacker = computed(() => this.attacker().id === this.store.leftPokemon().id)
  rightIsAttacker = computed(() => this.attacker().id === this.store.rightPokemon().id)

  damageResult = computed(() => {
    if (this.leftIsAttacker()) {
      return this.damageCalculator.calcDamage(this.store.leftPokemon(), this.store.rightPokemon(), this.fieldStore.field())
    } else {
      return this.damageCalculator.calcDamage(this.store.rightPokemon(), this.store.leftPokemon(), this.fieldStore.field())
    }
  })

  activatePokemon() {
    if (this.leftIsAttacker()) {
      this.attacker.set(this.store.rightPokemon())
    } else {
      this.attacker.set(this.store.leftPokemon())
    }
  }

  pokemonChanged() {
    if (this.leftIsAttacker()) {
      this.attacker.set(this.store.leftPokemon())
    } else {
      this.attacker.set(this.store.rightPokemon())
    }
  }
}
