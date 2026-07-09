import { computed, inject, Injectable, signal } from "@angular/core"
import { BackNavigationService } from "@app/services/back-navigation.service"

export type TableKind = "pokemon" | "moves" | "abilities" | "items"

export interface TableSelectEvent {
  kind: TableKind
  value: string
}

@Injectable()
export class MobileTableOverlayService {
  private backNavigation = inject(BackNavigationService)

  private activeKind = signal<TableKind | null>(null)
  private filter = signal("")

  readonly kind = this.activeKind.asReadonly()
  readonly currentFilter = this.filter.asReadonly()
  readonly isAnyOpen = computed(() => this.activeKind() !== null)

  open(kind: TableKind) {
    this.activeKind.set(kind)
    this.filter.set("")
    this.backNavigation.push(() => this.closeInternal())
  }

  close() {
    this.closeInternal()
    this.backNavigation.pop()
  }

  setFilter(value: string) {
    this.filter.set(value)
  }

  private closeInternal() {
    this.activeKind.set(null)
    this.filter.set("")
  }
}
