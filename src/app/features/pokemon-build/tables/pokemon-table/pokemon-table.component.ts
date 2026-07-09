import { Component, computed, inject, input, output, signal } from "@angular/core"
import { CalcStore } from "@store/calc-store"
import { CustomSet } from "@store/custom-set"
import { FilterableTableComponent } from "@features/pokemon-build/tables/filterable-table/filterable-table.component"
import { ColumnConfig, TableData } from "@features/pokemon-build/tables/filterable-table/filtered-table-types"
import { PokemonSpriteComponent } from "@features/pokemon-sprite/pokemon-sprite.component"
import { MatIcon } from "@angular/material/icon"
import { PokemonDetail, pokemonTableData } from "@multicalc/pokemon-table-data"
import { Stats } from "@multicalc/types"
import { evToSp } from "@multicalc/utils/ev-sp-converter"
import { FEATURES } from "@configuration/feature-flags"

@Component({
  selector: "app-pokemon-table",
  imports: [FilterableTableComponent, PokemonSpriteComponent, MatIcon],
  templateUrl: "./pokemon-table.component.html",
  styleUrl: "./pokemon-table.component.scss"
})
export class PokemonTableComponent {
  pokemonId = input<string>()
  dataFilter = input.required<string>()
  haveFocus = input.required<boolean>()
  isMobile = input<boolean>(false)

  pokemonSelected = output<string>()
  firstPokemonFromList = output<string>()
  escapeWasPressed = output()
  customSetSelected = output<CustomSet>()
  customSetEditRequested = output<CustomSet>()

  store = inject(CalcStore)

  pokemon = computed(() => this.store.findNullablePokemonById(this.pokemonId() ?? ""))

  customSetActionId = signal<string | null>(null)

  customSetActionSet = computed(() => this.store.customSetsState().find(s => s.id === this.customSetActionId()))

  private longPressTimeout: any
  private longPressTriggered = false
  private touchStartX = 0
  private touchStartY = 0

  onCustomSetTouchStart(event: TouchEvent, setId: string) {
    event.stopPropagation()

    this.longPressTriggered = false
    this.touchStartX = event.touches[0].clientX
    this.touchStartY = event.touches[0].clientY

    this.longPressTimeout = setTimeout(() => {
      this.longPressTriggered = true
      this.customSetActionId.set(setId)
    }, 500)
  }

  onCustomSetTouchMove(event: TouchEvent) {
    const dx = Math.abs(event.touches[0].clientX - this.touchStartX)
    const dy = Math.abs(event.touches[0].clientY - this.touchStartY)

    if (dx > 8 || dy > 8) {
      clearTimeout(this.longPressTimeout)
    }
  }

  onCustomSetTouchEnd(event: TouchEvent) {
    clearTimeout(this.longPressTimeout)

    if (this.longPressTriggered) {
      event.preventDefault()
    }
  }

  closeCustomSetActionMenu() {
    this.customSetActionId.set(null)
  }

  deleteFromCustomSetMenu() {
    const id = this.customSetActionId()

    if (id) {
      this.store.removeCustomSet(id)
    }

    this.closeCustomSetActionMenu()
  }

  duplicateFromCustomSetMenu() {
    const id = this.customSetActionId()

    if (id) {
      this.store.duplicateCustomSet(id)
    }

    this.closeCustomSetActionMenu()
  }

  editFromCustomSetMenu() {
    const id = this.customSetActionId()

    if (id) {
      const set = this.store.customSetsState().find(s => s.id === id)

      if (set) {
        this.customSetEditRequested.emit(set)
      }
    }

    this.closeCustomSetActionMenu()
  }

  selectCustomSet(set: CustomSet) {
    this.store.selectCustomSet(this.pokemonId() ?? "", set.id)
    this.customSetSelected.emit(set)
  }

  setStats(set: CustomSet): string {
    const labels: Record<keyof Stats, string> = { hp: "HP", atk: "Atk", def: "Def", spa: "SpA", spd: "SpD", spe: "Spe" }
    const stats: (keyof Stats)[] = ["hp", "atk", "def", "spa", "spd", "spe"]
    const useSps = this.store.useSpsMode()

    return stats
      .map(stat => ({ stat, value: useSps ? evToSp(set.state.evs[stat] ?? 0) : (set.state.evs[stat] ?? 0) }))
      .filter(({ value }) => value > 0)
      .map(({ stat, value }) => `${value} ${labels[stat]}`)
      .join(" / ")
  }

  actualPokemon = computed(() => {
    const pokemon = this.pokemon()

    if (this.hasActiveSetForSlot() || pokemon == undefined) {
      return []
    }

    return [pokemon.name]
  })

  initialEntryId = computed(() => {
    if (this.hasActiveSetForSlot()) {
      return this.store.activeSetId()!
    }

    return this.pokemon()?.name ?? ""
  })

  private hasActiveSetForSlot(): boolean {
    return !!this.store.activeSetId() && this.store.activeSetPokemonId() === this.pokemonId()
  }

  pokemonData = computed(() => this.buildGroupedPokemonData() as TableData<PokemonDetail>[])

  pokemonColumns: ColumnConfig<PokemonDetail>[] = [
    new ColumnConfig<PokemonDetail>({
      field: "name",
      isPokemonImageColumn: true,
      displayFn: (item: PokemonDetail) => item.name,
      alignLeft: true,
      width: "small",
      freezeOnMobile: true
    }),
    new ColumnConfig<PokemonDetail>({ field: "name", header: "Name", sortable: true, alignLeft: true, width: "medium" }),
    new ColumnConfig<PokemonDetail>({ field: "types", header: "Types", isPokemonType: true, width: "medium" }),
    new ColumnConfig<PokemonDetail>({ field: "abilities", header: "Abilities", width: "auto" }),
    new ColumnConfig<PokemonDetail>({ field: "hp", header: "HP", showHeaderInCell: true, sortable: true, width: "verysmall" }),
    new ColumnConfig<PokemonDetail>({ field: "atk", header: "Atk", showHeaderInCell: true, sortable: true, width: "verysmall" }),
    new ColumnConfig<PokemonDetail>({ field: "def", header: "Def", showHeaderInCell: true, sortable: true, width: "verysmall" }),
    new ColumnConfig<PokemonDetail>({ field: "spa", header: "SpA", showHeaderInCell: true, sortable: true, width: "verysmall" }),
    new ColumnConfig<PokemonDetail>({ field: "spd", header: "SpD", showHeaderInCell: true, sortable: true, width: "verysmall" }),
    new ColumnConfig<PokemonDetail>({ field: "spe", header: "Spe", showHeaderInCell: true, sortable: true, width: "verysmall" }),
    new ColumnConfig<PokemonDetail>({ field: "bst", header: "BST", showHeaderInCell: true, sortable: true, width: "verysmall" })
  ]

  buildGroupedPokemonData(): TableData<PokemonDetail & { subRows?: CustomSet[] }>[] {
    const customSetsByPokemon = this.store.customSetsByPokemon()

    return pokemonTableData(FEATURES.allowAllPokes).map(group => ({
      group: group.group,
      data: group.data.map(pokemon => {
        const subRows = customSetsByPokemon.get(pokemon.name)

        return { ...pokemon, ...(subRows ? { subRows } : {}) }
      })
    }))
  }
}
