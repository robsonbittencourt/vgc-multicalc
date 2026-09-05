import { Directive, ElementRef, inject, input } from "@angular/core"

const ROW_SELECTOR = "app-ev-slider"
const COLUMN_SELECTORS: Record<string, string> = {
  mod: "[data-cy=stat-modifier], [data-cy=hp-percentage-value]",
  ev: "[data-cy=ev-value]"
}

@Directive({
  selector: "[appColumnTab]",
  host: {
    "(keydown)": "onKeydown($event)"
  }
})
export class ColumnTabDirective {
  appColumnTab = input.required<string>()

  private element = inject<ElementRef<HTMLElement>>(ElementRef)

  onKeydown(event: KeyboardEvent) {
    if (event.key !== "Tab") return

    const target = this.findTargetInSiblingRow(event.shiftKey)

    if (!target) return

    event.preventDefault()
    target.focus()
  }

  private findTargetInSiblingRow(backwards: boolean): HTMLElement | null {
    const row = this.element.nativeElement.closest(ROW_SELECTOR)

    if (!row) return null

    const sibling = backwards ? row.previousElementSibling : row.nextElementSibling

    if (!sibling || !sibling.matches(ROW_SELECTOR)) return null

    const selector = COLUMN_SELECTORS[this.appColumnTab()]

    if (!selector) return null

    return sibling.querySelector<HTMLElement>(selector)
  }
}
