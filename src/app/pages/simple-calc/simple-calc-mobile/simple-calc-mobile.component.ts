import { Component, computed, inject, signal } from "@angular/core"
import { CopyButtonComponent } from "@basic/copy-button/copy-button.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { FieldComponent } from "@features/field/field.component"
import { PokemonBuildMobileComponent } from "@features/pokemon-build/pokemon-build-mobile/pokemon-build-mobile.component"
import { PokemonComboBoxComponent } from "@features/pokemon-build/pokemon-combo-box/pokemon-combo-box.component"
import { PokemonTabComponent } from "@features/team/pokemon-tab/pokemon-tab.component"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { Pokemon } from "@lib/model/pokemon"

@Component({
  selector: "app-simple-calc-mobile",
  templateUrl: "./simple-calc-mobile.component.html",
  styleUrls: ["./simple-calc-mobile.component.scss"],
  imports: [PokemonComboBoxComponent, PokemonTabComponent, PokemonBuildMobileComponent, FieldComponent, CopyButtonComponent, ImportPokemonButtonComponent, ExportPokemonButtonComponent]
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

  activateLeftPokemon() {
    this.attacker.set(this.store.leftPokemon())
  }

  activateRightPokemon() {
    this.attacker.set(this.store.rightPokemon())
  }

  pokemonChanged() {
    if (this.leftIsAttacker()) {
      this.attacker.set(this.store.leftPokemon())
    } else {
      this.attacker.set(this.store.rightPokemon())
    }
  }

  importPokemon(pokemon: Pokemon | Pokemon[]) {
    const singlePokemon = pokemon as Pokemon

    if (this.leftIsAttacker()) {
      this.attacker.set(singlePokemon)
      this.store.changeLeftPokemon(singlePokemon)
    } else {
      this.attacker.set(singlePokemon)
      this.store.changeRightPokemon(singlePokemon)
    }
  }
}
