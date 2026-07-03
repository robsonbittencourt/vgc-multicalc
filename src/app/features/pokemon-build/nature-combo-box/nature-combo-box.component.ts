import { Component, computed, inject, input, signal } from "@angular/core"
import { KeyValuePair } from "@basic/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@basic/input-select/input-select.component"
import { NATURE_DETAILS, NatureStatID } from "@data/nature-data"
import { CalculatorStore } from "@store/calculator-store"

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

function toID(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "")
}

function natureLabel(natureName: string): string {
  const nature = NATURE_DETAILS[toID(natureName)]

  if (!nature || !nature.plus || !nature.minus || nature.plus === nature.minus) {
    return natureName
  }

  return `${natureName} (+${STAT_LABELS[nature.plus]}, -${STAT_LABELS[nature.minus]})`
}

const ALL_NATURES: KeyValuePair[] = DISPLAY_ORDER.map(name => ({ key: natureLabel(name), value: name }))

@Component({
  selector: "app-nature-combo-box",
  imports: [InputSelectComponent],
  templateUrl: "./nature-combo-box.component.html",
  styleUrl: "./nature-combo-box.component.scss"
})
export class NatureComboBoxComponent {
  pokemonId = input.required<string>()
  leftLabel = input(false)
  isMobile = input(false)

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  selectedNature = signal<string>("")

  allNatureNames = computed(() => {
    return ALL_NATURES
  })

  mobileNatureList = computed(() => {
    return ALL_NATURES
  })

  mobileNatureDisplayMap = computed(() => {
    const map: Record<string, string> = {}
    ALL_NATURES.forEach(nature => {
      map[nature.value] = nature.value
    })
    return map
  })

  handleNatureChange(value: string) {
    this.selectedNature.set(value)
    this.store.nature(this.pokemonId(), value)
  }
}
