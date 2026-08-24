import { Directive, effect, ElementRef, inject, input, model, PLATFORM_ID } from "@angular/core"
import { isPlatformBrowser } from "@angular/common"

const AXIS_LOCK_THRESHOLD = 10
const FLING_VELOCITY = 0.35
const FLING_MAX_DURATION = 300
const DISTANCE_RATIO = 0.35
const SETTLE_DURATION = 220
const EDGE_ZONE = 24
const RUBBER_BAND = 0.25
const HORIZONTAL_CONTROLS = 'mat-slider, input[matSliderThumb], [role="slider"], mat-select, .mat-mdc-select-panel'
const DRAG_SELECTOR = ".cdk-drag, [cdkDrag]"
const DRAG_HANDLE_SELECTOR = ".cdk-drag-handle, [cdkDragHandle]"

@Directive({
  selector: "[appSwipeTabs]",
  host: {
    "(touchstart)": "onTouchStart($event)",
    "(touchmove)": "onTouchMove($event)",
    "(touchend)": "onTouchEnd()",
    "(touchcancel)": "onTouchEnd()"
  }
})
export class SwipeTabsDirective {
  private element = inject<ElementRef<HTMLElement>>(ElementRef)
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID))

  swipeTabCount = input.required<number>()
  swipeActiveIndex = model.required<number>()
  swipeDisabled = input(false)

  private startX = 0
  private startY = 0
  private startTime = 0
  private offset = 0
  private axis: "none" | "horizontal" | "vertical" = "none"
  private tracking = false
  private settlingFromGesture = false
  private lastIndex = 0

  constructor() {
    effect(() => {
      const index = this.swipeActiveIndex()
      const previousIndex = this.lastIndex
      this.lastIndex = index

      if (!this.isBrowser || this.tracking) return

      if (this.settlingFromGesture) {
        this.settlingFromGesture = false
        return
      }

      this.animateTo(index, previousIndex)
    })
  }

  private animateTo(index: number, previousIndex: number) {
    const distance = Math.abs(index - previousIndex)

    if (distance > 1) {
      this.setTransition(false)
      this.applyOffset(0)

      return
    }

    this.setTransition(true)
    this.applyOffset(0)
    window.setTimeout(() => this.setTransition(false), SETTLE_DURATION)
  }

  onTouchStart(event: TouchEvent) {
    this.axis = "none"
    this.tracking = false

    if (!this.isBrowser || this.swipeDisabled() || event.touches.length !== 1) return

    const touch = event.touches[0]

    if (touch.clientX < EDGE_ZONE || touch.clientX > window.innerWidth - EDGE_ZONE) return
    if (this.isHorizontallyInteractive(event.target as HTMLElement | null)) return

    this.startX = touch.clientX
    this.startY = touch.clientY
    this.startTime = Date.now()
    this.offset = 0
    this.tracking = true
  }

  private isHorizontallyInteractive(target: HTMLElement | null): boolean {
    if (target?.closest(HORIZONTAL_CONTROLS)) return true
    if (this.isActiveDrag(target)) return true

    let current = target

    while (current && current !== this.element.nativeElement) {
      const overflowX = getComputedStyle(current).overflowX

      if ((overflowX === "auto" || overflowX === "scroll") && current.scrollWidth > current.clientWidth) return true

      current = current.parentElement
    }

    return false
  }

  private isActiveDrag(target: HTMLElement | null): boolean {
    const drag = target?.closest(DRAG_SELECTOR)

    if (!drag || drag.classList.contains("cdk-drag-disabled")) return false

    const handle = drag.querySelector(DRAG_HANDLE_SELECTOR)

    if (handle) return !!target?.closest(DRAG_HANDLE_SELECTOR)

    return true
  }

  onTouchMove(event: TouchEvent) {
    if (!this.tracking) return

    const touch = event.touches[0]
    const deltaX = touch.clientX - this.startX
    const deltaY = touch.clientY - this.startY

    if (this.axis === "none") {
      if (Math.abs(deltaX) < AXIS_LOCK_THRESHOLD && Math.abs(deltaY) < AXIS_LOCK_THRESHOLD) return

      this.axis = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical"

      if (this.axis === "horizontal") {
        this.setTransition(false)
        this.setWillChange(true)
      }
    }

    if (this.axis !== "horizontal") return

    event.preventDefault()

    this.offset = this.applyResistance(deltaX)
    this.applyOffset(this.offset)
  }

  private applyResistance(deltaX: number): number {
    const index = this.swipeActiveIndex()
    const atStart = index === 0 && deltaX > 0
    const atEnd = index === this.swipeTabCount() - 1 && deltaX < 0

    if (atStart || atEnd) return deltaX * RUBBER_BAND

    return deltaX
  }

  onTouchEnd() {
    if (!this.tracking) return

    this.tracking = false

    if (this.axis !== "horizontal") return

    this.axis = "none"

    const width = this.element.nativeElement.clientWidth || 1
    const elapsed = Date.now() - this.startTime
    const velocity = Math.abs(this.offset) / Math.max(elapsed, 1)
    const isFling = elapsed < FLING_MAX_DURATION && velocity > FLING_VELOCITY
    const passedThreshold = Math.abs(this.offset) > width * DISTANCE_RATIO
    const direction = this.offset < 0 ? 1 : -1
    const nextIndex = this.swipeActiveIndex() + direction
    const canMove = nextIndex >= 0 && nextIndex < this.swipeTabCount()

    this.setTransition(true)

    if ((isFling || passedThreshold) && canMove) {
      this.settlingFromGesture = true
      this.swipeActiveIndex.set(nextIndex)
    }

    this.offset = 0
    this.applyOffset(0)

    window.setTimeout(() => {
      this.setTransition(false)
      this.setWillChange(false)
    }, SETTLE_DURATION)
  }

  private applyOffset(offset: number) {
    const track = this.trackElement()

    if (!track) return

    const width = this.element.nativeElement.clientWidth || 1
    const base = -this.swipeActiveIndex() * width

    track.style.transform = `translate3d(${base + offset}px, 0, 0)`
  }

  private setWillChange(enabled: boolean) {
    const track = this.trackElement()

    if (!track) return

    track.style.willChange = enabled ? "transform" : ""
  }

  private setTransition(enabled: boolean) {
    const track = this.trackElement()

    if (!track) return

    track.style.transition = enabled ? `transform ${SETTLE_DURATION}ms cubic-bezier(0.25, 0.8, 0.35, 1)` : "none"
  }

  private trackElement(): HTMLElement | null {
    return this.element.nativeElement.querySelector(".swipe-track")
  }
}
