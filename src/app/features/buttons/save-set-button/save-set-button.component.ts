import { Component, computed, effect, ElementRef, inject, input, output, signal, viewChild } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { CalcStore } from "@store/calc-store"
import { CustomSet } from "@store/custom-set"
import { setsMatch } from "@store/utils/sets-match"

@Component({
  selector: "app-save-set-button",
  templateUrl: "./save-set-button.component.html",
  styleUrls: ["./save-set-button.component.scss"],
  imports: [MatIcon]
})
export class SaveSetButtonComponent {
  pokemonId = input.required<string>()
  displayMode = input<"full" | "button" | "name">("full")
  showMatchingSet = input(false)
  openPokemonTable = output()

  store = inject(CalcStore)

  setNameInput = viewChild<ElementRef<HTMLInputElement>>("setNameInput")

  updateSuccess = signal(false)

  show = signal(true)

  showSaveButton = computed(() => this.displayMode() !== "name")

  showNameBlock = computed(() => this.displayMode() !== "button")

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  matchingSet = computed<CustomSet | null>(() => {
    if (!this.showMatchingSet() || this.isEditMode()) return null

    const p = this.store.findPokemonStateById(this.pokemonId())
    if (!p) return null

    const sets = this.store.customSetsByPokemon().get(p.name) ?? []
    return sets.find(s => setsMatch(s.state, p)) ?? null
  })

  savedSetName = computed(() => {
    if (this.store.activeSetPokemonId() !== this.pokemonId()) return null

    const setId = this.store.activeSetId()
    if (!setId) return null

    const set = this.store.customSetsState().find(s => s.id === setId)

    return set?.setName ?? null
  })

  localSetName = signal<string | null>(null)

  activeSetName = computed(() => this.localSetName() ?? this.savedSetName())

  isLinked = computed(() => this.activeSetName() !== null)

  isEditMode = computed(() => this.store.isEditingCustomSet() && this.store.activeSetPokemonId() === this.pokemonId())

  canUpdate = computed(() => this.isLinked() && (this.store.activeSetHasChanges() || this.localSetName() !== null))

  shouldFocusName = signal(false)

  constructor() {
    effect(() => {
      const input = this.setNameInput()
      if (input && this.shouldFocusName()) {
        this.shouldFocusName.set(false)
        setTimeout(() => input.nativeElement.focus())
      }
    })

    effect(() => {
      this.savedSetName()
      this.localSetName.set(null)
    })

    effect(() => {
      if (!this.isEditMode()) {
        this.setNameInput()?.nativeElement.blur()
      }
    })
  }

  onSetNameChange(name: string) {
    const trimmed = name.trim()
    this.localSetName.set(trimmed || null)

    if (this.isEditMode() && trimmed) {
      this.store.updateActiveSetName(trimmed)
    }
  }

  saveSet() {
    const pokemonName = this.pokemon().name
    const existingSets = this.store.customSetsByPokemon().get(pokemonName) ?? []
    const setName = `${pokemonName} #${existingSets.length + 1}`
    this.shouldFocusName.set(true)
    this.store.addCustomSet(this.pokemonId(), setName)
  }

  updateSet() {
    if (!this.canUpdate()) return

    const name = this.activeSetName()!
    this.store.updateActiveSet(name)
    this.localSetName.set(null)
    this.updateSuccess.set(true)
    setTimeout(() => this.updateSuccess.set(false), 1000)
  }
}
