import { animate, style, transition, trigger } from "@angular/animations"
import { ScrollingModule } from "@angular/cdk/scrolling"
import { CommonModule } from "@angular/common"
import { AfterViewInit, Component, computed, effect, ElementRef, HostListener, inject, input, output, signal, viewChild, viewChildren } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { MatTooltip } from "@angular/material/tooltip"
import { HiddenDirective } from "@app/shared/hidden-keepiing/hidden.directive"
import { TypeComboBoxComponent } from "@app/shared/pokemon-build/type-combo-box/type-combo-box.component"
import { ActiveFilter, ColumnConfig, LinkedTableData, TableData } from "./filtered-table-types"
import { TableDataFilterService } from "./table-data-filter.service"

@Component({
  selector: "app-filterable-table",
  standalone: true,
  imports: [CommonModule, ScrollingModule, MatTooltip, MatIcon, TypeComboBoxComponent, HiddenDirective],
  templateUrl: "./filterable-table.component.html",
  styleUrls: ["./filterable-table.component.scss"],
  animations: [trigger("fadeInOut", [transition(":enter", [style({ opacity: 0 }), animate("200ms ease-in", style({ opacity: 1 }))])])]
})
export class FilterableTableComponent<T extends Record<string, any>> implements AfterViewInit {
  filterService = inject(TableDataFilterService)

  data = input.required<TableData<T>[]>()
  selectedValues = input.required<string[]>()
  columns = input.required<ColumnConfig<T>[]>()
  dataFilter = input.required<string>()
  haveFocus = input.required<boolean>()

  rows = viewChildren("row", { read: ElementRef })
  scroll = viewChild("scroll", { read: ElementRef })

  activeLine = signal<LinkedTableData<T> | null>(null)

  itemSelected = output<string>()
  firstListItem = output<string>()
  escapeWasPressed = output()

  currentView = signal<"table" | "filterList">("table")
  currentFilterField = signal<keyof T | null>(null)

  sortColumn = signal<keyof T | null>(null)
  sortDirection = signal<"asc" | "desc" | null>(null)
  activeFilters = signal<ActiveFilter[]>([])
  expanded = signal(false)
  isHoverEnabled = signal(true)

  tableHeight = computed(() => (this.expanded() ? "600px" : "300px"))
  showExpandIcon = computed(() => this.currentView() === "table" && this.viewData().length > 6)

  filteredAndSortedData = computed(() => {
    const data = this.data()

    if (this.dataFilter() !== "") {
      const result = this.filterService.filterDataByInput(data, this.selectedValues(), this.dataFilter())

      if (result[0].data.length > 0) {
        this.firstListItem.emit(result[0].data[0]["name"])
      }

      return result
    }

    if (this.sortColumn() && this.sortDirection()) {
      return this.filterService.processAndOrderData(data, this.selectedValues(), this.sortColumn(), this.sortDirection())
    }

    return this.filterService.filterDataAndGrouping(data, this.activeFilters(), this.columns(), this.selectedValues())
  })

  viewData = computed(() => {
    const a = this.transformTableData(this.filteredAndSortedData())
    const b = this.linkedListToArray(a)

    return b
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

  arrowKeyTimesPressed = 0
  arrowKeyTimeoutId: any
  isComponentFocused = false
  itemWasSelected = false

  constructor() {
    effect(() => {
      if (this.dataFilter()) {
        this.activeLine.set(null)
      }
    })
  }

  ngAfterViewInit() {
    const element = this.scroll()!.nativeElement

    element.addEventListener("scroll", () => {
      this.disableHoverTemporarily()
    })

    document.addEventListener("mousemove", () => {
      if (!this.isHoverEnabled()) {
        this.isHoverEnabled.set(true)
      }
    })
  }

  disableHoverTemporarily() {
    this.isHoverEnabled.set(false)
  }

  isArray(item: LinkedTableData<T>, field: keyof T): boolean {
    return item.data ? Array.isArray(item.data[field]) : false
  }

  @HostListener("window:keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    if (!this.haveFocus() && !this.isComponentFocused) return

    switch (event.key) {
      case "ArrowUp":
        this.handleArrowUp()
        event.preventDefault()
        break

      case "ArrowDown":
        this.handleArrowDown()
        event.preventDefault()
        break

      case "Enter":
        this.handleEnter()
        event.preventDefault()
        break

      default:
        break
    }
  }

  @HostListener("window:keyup", ["$event"])
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      clearTimeout(this.arrowKeyTimeoutId)

      this.arrowKeyTimeoutId = setTimeout(() => {
        this.arrowKeyTimesPressed = 0
      }, 400)
    }
  }

  @HostListener("document:keydown.escape", ["$event"])
  onEscapeDown(event: KeyboardEvent) {
    if (!this.haveFocus() && !this.isComponentFocused) return

    this.escapeWasPressed.emit()
    event.preventDefault()
  }

  selectItem(item: LinkedTableData<T>) {
    this.itemWasSelected = true
    this.isComponentFocused = true
    this.activeLine.set(item)
    this.itemSelected.emit(item.data!["name"])
  }

  toggleSort(columnField: keyof T): void {
    const currentColumn = this.sortColumn()
    const currentDirection = this.sortDirection()

    if (currentColumn !== columnField) {
      this.sortColumn.set(columnField)
      this.sortDirection.set("asc")
    } else {
      if (currentDirection === "asc") {
        this.sortDirection.set("desc")
      } else if (currentDirection === "desc") {
        this.sortDirection.set(null)
        this.sortColumn.set(null)
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
    this.activeLine.set(null)
  }

  removeFilter(filterToRemove: ActiveFilter): void {
    this.activeFilters.update(currentFilters => currentFilters.filter(f => !(f.field === filterToRemove.field && f.value === filterToRemove.value)))
  }

  backToTable(): void {
    this.currentView.set("table")
    this.currentFilterField.set(null)
    this.activeLine.set(null)
  }

  getCategoryIconPath(category: string): string {
    const iconBase = "assets/icons"
    switch (category) {
      case "Physical":
        return `${iconBase}/physical.png`
      case "Special":
        return `${iconBase}/special.png`
      default:
        return `${iconBase}/other.png`
    }
  }

  buildGridTemplateColumns(): string {
    return this.columns()
      .map(col => {
        switch (col.width) {
          case "verysmall":
            return "2.5em"
          case "small":
            return "6em"
          case "medium":
            return "9em"
          case "large":
            return "15em"
          default:
            return "auto"
        }
      })
      .join(" ")
      .concat(" 1em")
  }

  headerCellAction(column: ColumnConfig<T>) {
    if (column.sortable) {
      this.toggleSort(column.field)
    }

    if (column.filterable) {
      this.showFilterList(column.field)
    }
  }

  hasResult(): boolean {
    return this.viewData().find(d => d.group == null) != null
  }

  onFocus() {
    this.isComponentFocused = true
  }

  onBlur() {
    if (!this.itemWasSelected) {
      this.isComponentFocused = false
    }

    this.itemWasSelected = false
  }

  panelStyle() {
    const expandedHeight = "630px"
    const defaultHeight = this.activeFilters().length > 0 ? "22em" : "24em"

    return {
      height: this.expanded() ? expandedHeight : defaultHeight
    }
  }

  getItemClass(item: LinkedTableData<T>): Record<string, boolean> {
    return {
      "move-item-active": item.id === this.activeLine()?.id || item.selected,
      "disable-hover": !this.isHoverEnabled()
    }
  }

  itemDataCy(item: LinkedTableData<T>): string {
    return `table-item-${item.data!["name"]}`
  }

  headerDataCy(column: ColumnConfig<T>): string {
    return `table-header-${column.header}`
  }

  private handleArrowUp() {
    this.arrowKeyTimesPressed++

    if (this.activeLine() == null) {
      return
    }

    let newActiveLine = null
    const previous = this.activeLine()?.prev

    if (previous?.group != null) {
      newActiveLine = previous.prev == null ? this.activeLine() : previous.prev
    } else {
      newActiveLine = previous != null ? previous : this.activeLine()
    }

    this.activeLine.set(newActiveLine)
    this.scrollToActiveItem(newActiveLine!.id!)
  }

  private handleArrowDown() {
    this.arrowKeyTimesPressed++

    if (this.activeLine() == null) {
      const firstLine = this.viewData().find(d => d.group == null)!
      this.activeLine.set(firstLine)
      return
    }

    let newActiveLine = null
    const next = this.activeLine()?.next

    if (next?.group != null) {
      newActiveLine = next.next == null ? this.activeLine() : next.next
    } else {
      newActiveLine = next != null ? next : this.activeLine()
    }

    this.activeLine.set(newActiveLine)
    this.scrollToActiveItem(newActiveLine!.id!)
  }

  private handleEnter() {
    if (this.activeLine() == null) {
      return
    }

    this.itemSelected.emit(this.activeLine()?.data!["name"])
  }

  private scrollToActiveItem(id: string) {
    const targetRow = this.rows().find(row => {
      const text = row.nativeElement.textContent?.trim()
      return text.includes(id)
    })

    targetRow?.nativeElement.scrollIntoView({
      behavior: this.arrowKeyTimesPressed > 1 ? "instant" : "smooth",
      block: "nearest"
    })
  }

  private transformTableData<T extends { name: string; active: boolean; selected: boolean }>(tableDataList: TableData<T>[]): LinkedTableData<T> | null {
    const nodes: LinkedTableData<T>[] = []

    for (const tableData of tableDataList) {
      if (tableData.group != "") {
        nodes.push({
          id: tableData.group,
          group: tableData.group,
          data: null,
          active: false,
          selected: false,
          next: null,
          prev: null
        })
      }

      for (const item of tableData.data) {
        nodes.push({
          id: item.name,
          group: null,
          data: item,
          active: item.active,
          selected: item.selected,
          next: null,
          prev: null
        })
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      if (i > 0) nodes[i].prev = nodes[i - 1]
      if (i < nodes.length - 1) nodes[i].next = nodes[i + 1]
    }

    return nodes.length > 0 ? nodes[0] : null
  }

  private linkedListToArray<T>(head: LinkedTableData<T> | null): LinkedTableData<T>[] {
    const result: LinkedTableData<T>[] = []
    let current = head
    while (current) {
      result.push({
        id: current.id,
        group: current.group,
        data: current.data,
        active: current.active,
        selected: current.selected,
        next: current.next ? current.next : null,
        prev: current.prev ? current.prev : null
      })
      current = current.next
    }
    return result
  }

  trackById(index: number, item: LinkedTableData<any>): string {
    return item.id!
  }
}
