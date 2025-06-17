import { CommonModule } from "@angular/common"
import { Component, computed, signal } from "@angular/core"

interface Move {
  name: string
  type: string
  category: string
  power: number
  accuracy: number
  pp: number
  description: string
}

interface ActiveFilter {
  type: "type" | "category"
  value: string
}

@Component({
  selector: "app-filterable-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./filterable-table.component.html",
  styleUrls: ["./filterable-table.component.scss"]
})
export class FilterableTableComponent {
  allMoves = signal<Move[]>([
    {
      name: "Draining Kiss",
      type: "FAIRY",
      category: "Special",
      power: 50,
      accuracy: 100,
      pp: 16,
      description: "User recovers 75% of the damage dealt."
    },
    {
      name: "Alluring Voice",
      type: "FAIRY",
      category: "Special",
      power: 80,
      accuracy: 100,
      pp: 16,
      description: "100% confuse target that had a stat rise this turn."
    },
    {
      name: "Dazzling Gleam",
      type: "FAIRY",
      category: "Special",
      power: 80,
      accuracy: 100,
      pp: 16,
      description: "No additional effect. Hits adjacent foes."
    },
    {
      name: "Flamethrower",
      type: "FIRE",
      category: "Special",
      power: 90,
      accuracy: 100,
      pp: 24,
      description: "The target is scorched with an intense blast of fire. This may also leave the target with a burn."
    },
    {
      name: "Leaf Storm",
      type: "GRASS",
      category: "Special",
      power: 130,
      accuracy: 90,
      pp: 8,
      description: "The user attacks the target with a storm of sharp leaves. This lowers the user's Sp. Atk stat by two stages."
    },
    {
      name: "Aqua Jet",
      type: "WATER",
      category: "Physical",
      power: 40,
      accuracy: 100,
      pp: 32,
      description: "The user attacks first. This move has a heightened priority."
    },
    {
      name: "Bug Buzz",
      type: "BUG",
      category: "Special",
      power: 90,
      accuracy: 100,
      pp: 16,
      description: "The user generates a damaging sound wave. This may also lower the target's Special Defense stat."
    },
    {
      name: "Crunch",
      type: "DARK",
      category: "Physical",
      power: 80,
      accuracy: 100,
      pp: 24,
      description: "The user crunches up the target with sharp fangs. This may also lower the target's Defense stat."
    },
    {
      name: "Draco Meteor",
      type: "DRAGON",
      category: "Special",
      power: 130,
      accuracy: 90,
      pp: 8,
      description: "Comets are summoned down from the sky. This lowers the user's Special Attack stat by two stages."
    },
    {
      name: "Tackle",
      type: "NORMAL",
      category: "Physical",
      power: 40,
      accuracy: 100,
      pp: 56,
      description: "A physical attack in which the user charges and slams into the target with its whole body."
    },
    {
      name: "Growl",
      type: "NORMAL",
      category: "Status",
      power: 0,
      accuracy: 100,
      pp: 64,
      description: "The user growls in an endearing way, making opposing Pokémon less wary. This lowers their Attack stat."
    }
  ])

  currentView = signal<"movesTable" | "typeList" | "categoryList">("movesTable")

  sortColumn = signal<keyof Move | null>("name")

  sortDirection = signal<"asc" | "desc" | null>("asc")

  activeFilters = signal<ActiveFilter[]>([])

  uniqueTypes = computed(() => {
    const types = new Set<string>()
    this.allMoves().forEach(move => types.add(move.type))
    return Array.from(types).sort()
  })

  uniqueCategories = computed(() => {
    const categories = new Set<string>()
    this.allMoves().forEach(move => categories.add(move.category))
    return Array.from(categories).sort()
  })

  filteredAndSortedMoves = computed(() => {
    let movesToProcess = [...this.allMoves()]

    const filters = this.activeFilters()
    filters.forEach(filter => {
      if (filter.type === "type") {
        movesToProcess = movesToProcess.filter(move => move.type === filter.value)
      } else if (filter.type === "category") {
        movesToProcess = movesToProcess.filter(move => move.category === filter.value)
      }
    })

    const column = this.sortColumn()
    const direction = this.sortDirection()

    if (column && direction) {
      movesToProcess.sort((a, b) => {
        let valueA: any
        let valueB: any

        switch (column) {
          case "name":
            valueA = a.name.toLowerCase()
            valueB = b.name.toLowerCase()
            break
          case "power":
            valueA = a.power
            valueB = b.power
            break
          case "accuracy":
            valueA = a.accuracy
            valueB = b.accuracy
            break
          case "pp":
            valueA = a.pp
            valueB = b.pp
            break
          default:
            return 0
        }

        if (valueA < valueB) {
          return direction === "asc" ? -1 : 1
        }
        if (valueA > valueB) {
          return direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    return movesToProcess
  })

  getSortIcon(column: keyof Move): string {
    const currentColumn = this.sortColumn()
    const currentDirection = this.sortDirection()

    if (currentColumn === column) {
      if (currentDirection === "asc") {
        return "▲"
      } else if (currentDirection === "desc") {
        return "▼"
      }
    }
    return ""
  }

  toggleSort(column: keyof Move): void {
    this.currentView.set("movesTable")

    const currentColumn = this.sortColumn()
    const currentDirection = this.sortDirection()

    if (currentColumn !== column) {
      this.sortColumn.set(column)
      this.sortDirection.set("asc")
    } else {
      if (currentDirection === "asc") {
        this.sortDirection.set("desc")
      } else if (currentDirection === "desc") {
        this.sortColumn.set(null)
        this.sortDirection.set(null)
      } else {
        this.sortDirection.set("asc")
      }
    }
  }

  showTypeFilter(): void {
    this.currentView.set("typeList")
  }

  showCategoryFilter(): void {
    this.currentView.set("categoryList")
  }

  applyTypeFilter(typeValue: string): void {
    this.activeFilters.update(currentFilters => {
      const newFilters = currentFilters.filter(f => f.type !== "type")
      newFilters.push({ type: "type", value: typeValue })
      return newFilters
    })
    this.currentView.set("movesTable")
  }

  applyCategoryFilter(categoryValue: string): void {
    this.activeFilters.update(currentFilters => {
      const newFilters = currentFilters.filter(f => f.type !== "category")
      newFilters.push({ type: "category", value: categoryValue })
      return newFilters
    })
    this.currentView.set("movesTable")
  }

  removeFilter(filterToRemove: ActiveFilter): void {
    this.activeFilters.update(currentFilters => currentFilters.filter(f => !(f.type === filterToRemove.type && f.value === filterToRemove.value)))
  }

  isFilterActive(type: "type" | "category", value: string): boolean {
    return this.activeFilters().some(f => f.type === type && f.value === value)
  }

  getCategoryIconPath(category: string): string {
    const iconBase = "assets/icons"
    switch (category) {
      case "Physical":
        return `${iconBase}/physical.png`
      case "Special":
        return `${iconBase}/special.png`
      case "Status":
        return `${iconBase}/other.png`
      default:
        return `${iconBase}/other.png`
    }
  }
}
