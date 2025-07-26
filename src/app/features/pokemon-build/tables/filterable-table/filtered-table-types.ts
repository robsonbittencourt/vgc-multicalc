import { v4 as uuidv4 } from "uuid"

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
}

export interface ActiveFilter {
  field: string
  value: any
}

export class ColumnConfig<T> {
  id: string = uuidv4()
  field: keyof T
  header?: string
  description?: string
  sortable = false
  filterable = false
  displayFn?: (item: T) => string | number | boolean | any
  isImageColumn = false
  isPokemonType = false
  filterValues?: string[]
  showHeaderInCell = false
  alignLeft = false
  width?: string

  constructor(init: Omit<Partial<ColumnConfig<T>>, "id">) {
    Object.assign(this, init)
  }
}
