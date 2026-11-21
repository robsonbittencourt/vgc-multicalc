import { Component, computed, inject, input, output } from "@angular/core"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { CalcStore } from "@store/calc-store"
import { TerastalButtonComponent } from "@features/buttons/terastal-button/terastal-button.component"
import { TypeName } from "@data/types"
import { localizedName } from "@data/i18n/localized-names"
import { KeyValuePair } from "@shared/input-autocomplete/input-autocomplete.component"
import { LanguageStore } from "@store/language-store"

@Component({
  selector: "app-tera-combo-box",
  imports: [InputSelectComponent, TerastalButtonComponent],
  templateUrl: "./tera-combo-box.component.html",
  styleUrl: "./tera-combo-box.component.scss"
})
export class TeraComboBoxComponent {
  pokemonId = input.required<string>()
  haveFocus = input(false)

  selected = output()

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  store = inject(CalcStore)
  private languageStore = inject(LanguageStore)

  private teraTypes: TypeName[] = ["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Stellar", "Water"]

  allTeraTypes = computed<KeyValuePair[]>(() => {
    const language = this.languageStore.language()

    return this.teraTypes.map(type => ({ key: localizedName("types", type, language), value: type }))
  })

  isTeraDisabled() {
    return this.pokemon().name.startsWith("Ogerpon")
  }
}
