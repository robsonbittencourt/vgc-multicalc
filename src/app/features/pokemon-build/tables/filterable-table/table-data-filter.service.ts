import { Injectable } from "@angular/core"
import { ActiveFilter, ColumnConfig, TableData } from "./filtered-table-types"

@Injectable({
  providedIn: "root"
})
export class TableDataFilterService<T extends Record<string, any>> {
  filterDataByInput(data: TableData<T>[], selectedValues: string[], dataFilter: string): TableData<T>[] {
    let flattenedData = this.flattenedData(data)
    flattenedData = this.filter(dataFilter, flattenedData)

    const processedData = this.markSelectedAndActive(flattenedData, selectedValues)

    return [
      {
        group: "",
        data: processedData
      }
    ]
  }

  processAndOrderData(data: TableData<T>[], selectedValues: string[], sortColumn: keyof T | null, sortDirection: "asc" | "desc" | null): TableData<T>[] {
    const flattenedData = this.flattenedData(data)
    const processedData = this.markSelectedAndActive(flattenedData, selectedValues)

    this.orderData(processedData, sortColumn, sortDirection)

    return [
      {
        group: "",
        data: processedData
      }
    ]
  }

  filterDataAndGrouping(data: TableData<T>[], activeFilters: ActiveFilter[], columns: ColumnConfig<T>[], selectedValues: string[]): TableData<T>[] {
    const result: TableData<T>[] = []

    for (const group of data) {
      let dataToProcess = [...group.data]

      activeFilters.forEach(filter => {
        const columnConfig = columns.find(col => String(col.field) === filter.field)
        if (columnConfig) {
          dataToProcess = dataToProcess.filter(item => {
            return item[columnConfig.field] === filter.value
          })
        }
      })

      const processedGroup = this.markSelectedAndActive(dataToProcess, selectedValues)

      result.push({
        group: group.group,
        data: processedGroup
      })
    }

    return result
  }

  private markSelectedAndActive(data: T[], selectedValues: string[]) {
    const processedGroup = data.map(item => {
      return {
        ...item,
        selected: selectedValues.includes(item["name"])
      }
    }) as T[]

    return processedGroup
  }

  private flattenedData(data: TableData<T>[]): T[] {
    return data.flatMap(group => group.data)
  }

  private filter(value: string, values: T[]): T[] {
    if (!values) return []

    const filterValue = this.normalizeValue(value)

    return values.filter(v => this.matchesFilterValue(v["name"], filterValue))
  }

  private matchesFilterValue(name: string, filterValue: string): boolean {
    const normalizedName = this.normalizeValue(name)

    if (normalizedName.startsWith(filterValue)) return true

    if (normalizedName.includes("-mega")) {
      const baseName = normalizedName.replace(/-mega.*$/, "")
      const megaAliases = this.buildMegaAliases(normalizedName, baseName)

      if (megaAliases.some(alias => alias.startsWith(filterValue))) return true
    }

    return false
  }

  private buildMegaAliases(normalizedName: string, baseName: string): string[] {
    const afterBase = normalizedName.slice(baseName.length + 1)
    const variant = afterBase.replace(/^mega-?/, "")

    const megaBase = "mega-" + baseName
    const nameBase = baseName + "-mega"

    if (!variant) return [megaBase, nameBase]

    return [megaBase + "-" + variant, nameBase + "-" + variant, megaBase, nameBase]
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s+/g, "-")
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
