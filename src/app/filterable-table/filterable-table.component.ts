import { CommonModule } from "@angular/common"
import { Component, computed, input, signal } from "@angular/core"

export interface ColumnConfig<T> {
  field: keyof T
  header?: string
  sortable?: boolean
  filterable?: boolean
  displayFn?: (item: T) => string | number | boolean | any
  isImageColumn?: boolean
  filterValues?: string[]
  showHeaderInCell?: boolean
}

interface ActiveFilter {
  field: string
  value: any
}

@Component({
  selector: "app-filterable-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./filterable-table.component.html",
  styleUrls: ["./filterable-table.component.scss"]
})
export class FilterableTableComponent<T extends Record<string, any>> {
  data = input.required<T[]>()
  columns = input.required<ColumnConfig<T>[]>()

  currentView = signal<"table" | "filterList">("table")
  currentFilterField = signal<keyof T | null>(null)

  sortColumn = signal<keyof T | null>(null)
  sortDirection = signal<"asc" | "desc" | null>(null)
  activeFilters = signal<ActiveFilter[]>([])

  filteredAndSortedData = computed(() => {
    let dataToProcess = [...this.data()]

    const filters = this.activeFilters()
    filters.forEach(filter => {
      const columnConfig = this.columns().find(col => String(col.field) === filter.field)
      if (columnConfig) {
        dataToProcess = dataToProcess.filter(item => {
          return item[columnConfig.field] === filter.value
        })
      }
    })

    const column = this.sortColumn()
    const direction = this.sortDirection()

    this.orderData(dataToProcess, column, direction)

    return dataToProcess
  })

  currentFilterOptions = computed(() => {
    const field = this.currentFilterField()
    if (!field) return []

    return this.columns()
      .find(col => col.field === field)
      ?.filterValues?.map(value => ({ value: value, label: value }))
  })

  currentFilterConfig = computed(() => {
    return this.columns().find(col => col.field === this.currentFilterField())
  })

  toggleSort(columnField: keyof T): void {
    const currentColumn = this.sortColumn()
    const currentDirection = this.sortDirection()

    if (currentColumn !== columnField) {
      this.sortColumn.set(columnField)
      this.sortDirection.set("asc")
    } else {
      if (currentDirection === "asc") {
        this.sortDirection.set("desc")
      } else {
        this.sortDirection.set("asc")
      }
    }
  }

  showFilterList(columnField: keyof T): void {
    this.currentFilterField.set(columnField)
    this.currentView.set("filterList")
  }

  applyFilter(value: any): void {
    const field = this.currentFilterField()

    this.activeFilters.update(currentFilters => {
      const newFilters = currentFilters.filter(f => f.field !== field)
      newFilters.push({ field: String(field), value: value })
      return newFilters
    })

    this.currentView.set("table")
  }

  removeFilter(filterToRemove: ActiveFilter): void {
    this.activeFilters.update(currentFilters => currentFilters.filter(f => !(f.field === filterToRemove.field && f.value === filterToRemove.value)))
  }

  backToTable(): void {
    this.currentView.set("table")
    this.currentFilterField.set(null)
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

  headerCellAction(column: ColumnConfig<T>) {
    if (column.sortable) {
      this.toggleSort(column.field)
    }

    if (column.filterable) {
      this.showFilterList(column.field)
    }
  }

  private orderData(dataToProcess: T[], column: keyof T | null, direction: "asc" | "desc" | null) {
    if (column && direction) {
      dataToProcess.sort((a, b) => {
        let valueA: any = a[column]
        let valueB: any = b[column]

        if (typeof valueA === "string" && typeof valueB === "string") {
          valueA = valueA.toLowerCase()
          valueB = valueB.toLowerCase()
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
  }
}
