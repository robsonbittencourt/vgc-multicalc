import { computed, Injectable, signal } from "@angular/core"

export type TableKind = "pokemon" | "moves" | "abilities" | "items"

export interface TableSelectEvent {
  kind: TableKind
  value: string
}

@Injectable()
export class MobileTableOverlayService {
  private activeKind = signal<TableKind | null>(null)
  private filter = signal("")

  readonly kind = this.activeKind.asReadonly()
  readonly currentFilter = this.filter.asReadonly()
  readonly isAnyOpen = computed(() => this.activeKind() !== null)

  open(kind: TableKind) {
    this.activeKind.set(kind)
    this.filter.set("")
  }

  close() {
    this.activeKind.set(null)
    this.filter.set("")
  }

  setFilter(value: string) {
    this.filter.set(value)
  }
}
