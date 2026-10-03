import { NgStyle } from "@angular/common"
import { Component, computed, inject, input } from "@angular/core"
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu"
import { CalcStore } from "@store/calc-store"
import { TypeName } from "@data/types"

const ALL_TYPES: TypeName[] = ["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"]

const UNKNOWN_TYPE: TypeName = "???"

@Component({
  selector: "app-type-combo-box",
  imports: [NgStyle, MatMenu, MatMenuItem, MatMenuTrigger],
  templateUrl: "./type-combo-box.component.html",
  styleUrl: "./type-combo-box.component.scss"
})
export class TypeComboBoxComponent {
  type1 = input.required<TypeName>()
  type2 = input<TypeName>()
  reverse = input(false)
  centralized = input(false)
  reduced = input(false)
  editable = input(false)
  pokemonId = input<string>()

  store = inject(CalcStore)

  allTypes = ALL_TYPES
  unknownType = UNKNOWN_TYPE

  pokemon = computed(() => {
    const id = this.pokemonId()

    return id ? this.store.findPokemonById(id) : undefined
  })

  hasOverride = computed(() => this.pokemon()?.hasTypeOverride === true)

  isTeraActive = computed(() => this.pokemon()?.teraTypeActive === true)

  isOverrideDimmed = computed(() => this.hasOverride() && this.isTeraActive())

  selectType1(type: TypeName) {
    this.applyTypes([type, this.type2()])
  }

  private applyTypes(types: (TypeName | undefined)[]) {
    const id = this.pokemonId()

    if (!id) return

    const selected = types.filter(type => type !== undefined) as TypeName[]

    if (selected.length === 0) return

    this.store.overrideTypes(id, selected)
  }

  selectType2(type: TypeName) {
    this.applyTypes([this.type1(), type])
  }

  removeType1() {
    this.applyTypes([this.type2()])
  }

  removeType2() {
    this.applyTypes([this.type1()])
  }

  restoreTypes() {
    const id = this.pokemonId()

    if (!id) return

    this.store.overrideTypes(id, undefined)
  }

  align(): Record<string, string> | null {
    if (this.reverse()) {
      return { "justify-content": "left" }
    }

    if (this.centralized()) {
      return { "justify-content": "center" }
    }

    return null
  }

  typeStyle(type?: TypeName): Record<string, string> {
    const style = this.getTypeBackgroundStyle(type)

    if (this.reduced()) {
      style["font-size"] = "0.8rem"
    }

    return style
  }

  private getTypeBackgroundStyle(type?: TypeName): Record<string, string> {
    if (type === UNKNOWN_TYPE) return { "background-color": "var(--type-unknown)" }

    if (!type || !ALL_TYPES.includes(type)) return {}

    return { "background-color": `var(--type-${type.toLowerCase()})` }
  }
}
