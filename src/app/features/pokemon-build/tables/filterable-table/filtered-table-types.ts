export interface TableData<T> {
  group: string
  data: T[]
}

export interface LinkedTableData<T> {
  id: string | null
  group: string | null
  data: T | null
  active: boolean
  selected: boolean
  next: LinkedTableData<T> | null
  prev: LinkedTableData<T> | null
  isSubRow?: boolean
  subRowData?: any
}

import { uuid } from "@lib/utils/uuid"

export interface ActiveFilter {
  field: string
  value: any
}

export class ColumnConfig<T> {
  id: string = uuid()
  field: keyof T
  header?: string
  description?: string
  sortable = false
  filterable = false
  displayFn?: (item: T) => string | number | boolean | any
  tooltipFn?: (item: T) => string
  isImageColumn = false
  isPokemonImageColumn = false
  isPokemonType = false
  filterValues?: string[]
  showHeaderInCell = false
  alignLeft = false
  width?: string
  freezeOnMobile = false

  constructor(init: Omit<Partial<ColumnConfig<T>>, "id">) {
    Object.assign(this, init)
  }
}
