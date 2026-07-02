import { Component, computed, inject, input, output, signal } from "@angular/core"
import { ABILITY_DETAILS } from "@data/abiliity-details"
import { POKEMON_DETAILS, PokemonDetail } from "@data/pokemon-details"
import { topUsageByRegulation } from "@configuration/top-usage-regulation"
import { CalculatorStore } from "@data/store/calculator-store"
import { CustomSet } from "@data/store/custom-set"
import { FilterableTableComponent } from "@features/pokemon-build/tables/filterable-table/filterable-table.component"
import { ColumnConfig, TableData } from "@features/pokemon-build/tables/filterable-table/filtered-table-types"
import { Pokemon } from "@lib/model/pokemon"
import { PokemonSpriteComponent } from "@basic/pokemon-sprite/pokemon-sprite.component"
import { MatIcon } from "@angular/material/icon"
import { Stats } from "@lib/types"
import { evToSp } from "@lib/utils/ev-sp-converter"
import { FEATURES } from "@lib/feature-flags"

@Component({
  selector: "app-pokemon-table",
  imports: [FilterableTableComponent, PokemonSpriteComponent, MatIcon],
  templateUrl: "./pokemon-table.component.html",
  styleUrl: "./pokemon-table.component.scss"
})
export class PokemonTableComponent {
  pokemonId = input.required<string>()
  dataFilter = input.required<string>()
  haveFocus = input.required<boolean>()
  isMobile = input<boolean>(false)

  pokemonSelected = output<string>()
  firstPokemonFromList = output<string>()
  escapeWasPressed = output()
  customSetSelected = output<CustomSet>()
  customSetEditRequested = output<CustomSet>()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

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
    this.store.selectCustomSet(this.pokemonId(), set.id)
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
    if (this.hasActiveSetForSlot()) {
      return []
    }

    return [this.pokemon().name]
  })

  initialEntryId = computed(() => {
    if (this.hasActiveSetForSlot()) {
      return this.store.activeSetId()!
    }

    return this.pokemon().name
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
    const details = POKEMON_DETAILS
    const customSetsByPokemon = this.store.customSetsByPokemon()
    const availableNames = new Set(topUsageByRegulation["MB"])
    const allPokemon = Object.values(details)
      .filter(p => FEATURES.allowAllPokes || availableNames.has(p.name))
      .map(p => {
        const pokemon = new Pokemon(p.name)
        const abilities = p.abilities.map(ability => {
          if (!ABILITY_DETAILS[ability]) {
            console.error(`Missing ability "${ability}" for pokemon "${p.name}"`)
            return "Unknown"
          }
          return ABILITY_DETAILS[ability].name
        })

        const subRows = customSetsByPokemon.get(pokemon.name)

        return {
          name: pokemon.name,
          types: [pokemon.type1, pokemon.type2],
          abilities: abilities,
          hp: pokemon.baseHp,
          atk: pokemon.baseAtk,
          def: pokemon.baseDef,
          spa: pokemon.baseSpa,
          spd: pokemon.baseSpd,
          spe: pokemon.baseSpe,
          bst: pokemon.bst,
          group: p.group,
          ...(subRows ? { subRows } : {})
        } as PokemonDetail & { subRows?: CustomSet[] }
      })

    const topUsageOrder = topUsageByRegulation["MB"]

    const groupedData = allPokemon.reduce(
      (acc, pokemon) => {
        const groupName = pokemon.group

        if (!acc[groupName]) {
          acc[groupName] = []
        }

        acc[groupName].push(pokemon)
        return acc
      },
      {} as Record<PokemonDetail["group"], (PokemonDetail & { subRows?: CustomSet[] })[]>
    )

    for (const groupName of Object.keys(groupedData) as PokemonDetail["group"][]) {
      groupedData[groupName].sort((a, b) => {
        const indexA = topUsageOrder.indexOf(a.name)
        const indexB = topUsageOrder.indexOf(b.name)

        if (indexA === -1 && indexB === -1) return a.name.localeCompare(b.name)
        if (indexA === -1) return 1
        if (indexB === -1) return -1

        return indexA - indexB
      })
    }

    const result = Object.keys(groupedData).map(groupName => ({
      group: groupName as PokemonDetail["group"],
      data: groupedData[groupName as PokemonDetail["group"]]
    }))

    type PokemonTableData = TableData<PokemonDetail & { subRows?: CustomSet[] }>
    const groupOrder: PokemonDetail["group"][] = ["Meta", "Low usage", "Regular"]
    const orderedResult = groupOrder.map(groupName => result.find(data => data.group == groupName)).filter((data): data is PokemonTableData => data !== undefined)

    return orderedResult
  }
}
