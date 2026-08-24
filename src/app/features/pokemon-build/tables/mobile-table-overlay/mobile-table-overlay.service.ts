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
    const wasOpen = this.isAnyOpen()

    this.activeKind.set(kind)
    this.filter.set("")

    if (!wasOpen) {
      this.backNavigation.push({ kind: "overlay" })
    }
  }

  closeWithoutHistory() {
    this.closeInternal()
  }

  openWithoutHistory(kind: TableKind) {
    this.activeKind.set(kind)
    this.filter.set("")
  }

  close() {
    const wasOpen = this.isAnyOpen()

    this.closeInternal()

    if (wasOpen) {
      this.backNavigation.pop()
    }
  }

  setFilter(value: string) {
    this.filter.set(value)
  }

  private closeInternal() {
    this.activeKind.set(null)
    this.filter.set("")
  }
}
