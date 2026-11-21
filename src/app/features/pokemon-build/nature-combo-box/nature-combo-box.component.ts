import { Component, computed, inject, input, signal } from "@angular/core"
import { KeyValuePair } from "@shared/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { NATURE_DETAILS, NatureStatID } from "@data/nature-data"
import { toID } from "@data/id"
import { CalcStore } from "@store/calc-store"
import { LanguageStore } from "@store/language-store"
import { Language, localizedName } from "@data/i18n/localized-names"
import { uiText } from "@app/i18n/ui-text"

const STAT_LABELS: Record<NatureStatID, string> = {
  atk: "Atk",
  def: "Def",
  spa: "SpA",
  spd: "SpD",
  spe: "Spe"
}

const DISPLAY_ORDER = [
  "Adamant",
  "Modest",
  "Jolly",
  "Timid",
  "Bold",
  "Impish",
  "Calm",
  "Careful",
  "Brave",
  "Quiet",
  "Gentle",
  "Hasty",
  "Lax",
  "Lonely",
  "Mild",
  "Naive",
  "Naughty",
  "Rash",
  "Relaxed",
  "Sassy",
  "Bashful",
  "Docile",
  "Hardy",
  "Quirky",
  "Serious"
]

function natureLabel(natureName: string, language: Language): string {
  const nature = NATURE_DETAILS[toID(natureName)]
  const name = localizedName("natures", natureName, language)

  if (!nature || !nature.plus || !nature.minus || nature.plus === nature.minus) {
    return name
  }

  return `${name} (+${uiText(STAT_LABELS[nature.plus], language)}, -${uiText(STAT_LABELS[nature.minus], language)})`
}

@Component({
  selector: "app-nature-combo-box",
  imports: [InputSelectComponent],
  templateUrl: "./nature-combo-box.component.html"
})
export class NatureComboBoxComponent {
  pokemonId = input.required<string>()
  leftLabel = input(false)
  isMobile = input(false)

  store = inject(CalcStore)
  private languageStore = inject(LanguageStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  selectedNature = signal<string>("")

  allNatureNames = computed<KeyValuePair[]>(() => {
    const language = this.languageStore.language()

    return DISPLAY_ORDER.map(name => ({ key: natureLabel(name, language), value: name }))
  })

  mobileNatureList = computed(() => {
    return this.allNatureNames()
  })

  mobileNatureDisplayMap = computed(() => {
    const language = this.languageStore.language()
    const map: Record<string, string> = {}
    DISPLAY_ORDER.forEach(nature => {
      map[nature] = localizedName("natures", nature, language)
    })
    return map
  })

  handleNatureChange(value: string) {
    this.selectedNature.set(value)
    this.store.nature(this.pokemonId(), value)
  }
}
