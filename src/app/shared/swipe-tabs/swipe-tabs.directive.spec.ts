import { Component, PLATFORM_ID, provideZonelessChangeDetection, signal, viewChild } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { SwipeTabsDirective } from "./swipe-tabs.directive"

const SETTLE_DURATION = 220
const VIEWPORT_WIDTH = 400
const FLING_MAX_DURATION = 300

@Component({
  imports: [SwipeTabsDirective],
  template: `
    <div class="swipe-viewport" appSwipeTabs [swipeTabCount]="tabCount()" [(swipeActiveIndex)]="activeIndex" [swipeDisabled]="disabled()">
      <div class="swipe-track">
        <div class="panel"></div>
      </div>
    </div>
  `
})
class HostComponent {
  readonly tabCount = signal(3)
  readonly activeIndex = signal(0)
  readonly disabled = signal(false)
  readonly directive = viewChild.required(SwipeTabsDirective)
}

describe("SwipeTabsDirective", () => {
  let fixture: ComponentFixture<HostComponent>
  let host: HostComponent
  let directive: SwipeTabsDirective
  let viewport: HTMLElement
  let track: HTMLElement

  function build(platformId = "browser") {
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), { provide: PLATFORM_ID, useValue: platformId }]
    })

    fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    host = fixture.componentInstance
    directive = host.directive()
    viewport = fixture.nativeElement.querySelector(".swipe-viewport")
    track = fixture.nativeElement.querySelector(".swipe-track")

    Object.defineProperty(viewport, "clientWidth", { value: VIEWPORT_WIDTH, configurable: true })
  }

  function touchEvent(points: { clientX: number; clientY: number }[], target: EventTarget | null = track): TouchEvent {
    return {
      touches: Object.assign(points, { length: points.length }),
      target,
      preventDefault: vi.fn()
    } as unknown as TouchEvent
  }

  function startAt(clientX: number, clientY: number, target: EventTarget | null = track) {
    directive.onTouchStart(touchEvent([{ clientX, clientY }], target))
  }

  function moveTo(clientX: number, clientY: number) {
    const event = touchEvent([{ clientX, clientY }])

    directive.onTouchMove(event)

    return event
  }

  function restingX(): number {
    return -host.activeIndex() * VIEWPORT_WIDTH + 0
  }

  function translateX(): number {
    return Number(/translate3d\((-?[\d.]+)px/.exec(track.style.transform)?.[1] ?? NaN)
  }

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] })
    build()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  describe("axis locking", () => {
    it("should not move before the gesture passes the axis lock threshold", () => {
      startAt(200, 200)

      moveTo(206, 203)

      expect(translateX()).toBe(restingX())
    })

    it("should follow the finger once the gesture locks horizontally", () => {
      startAt(200, 200)

      moveTo(160, 202)

      expect(translateX()).toBe(-40)
    })

    it("should ignore a gesture that locks vertically", () => {
      startAt(200, 200)

      moveTo(202, 160)

      expect(translateX()).toBe(restingX())
    })

    it("should keep following the finger after the axis is locked", () => {
      startAt(200, 200)

      moveTo(160, 200)
      moveTo(120, 260)

      expect(translateX()).toBe(-80)
    })

    it("should prevent the default scroll on a horizontal gesture", () => {
      startAt(200, 200)
      moveTo(160, 200)

      const event = moveTo(150, 200)

      expect(event.preventDefault).toHaveBeenCalled()
    })

    it("should mark the track as changing while dragging horizontally", () => {
      startAt(200, 200)

      moveTo(160, 200)

      expect(track.style.willChange).toBe("transform")
    })
  })

  describe("rubber banding at the edges", () => {
    it("should resist a swipe back from the first tab", () => {
      startAt(200, 200)

      moveTo(300, 200)

      expect(translateX()).toBe(25)
    })

    it("should resist a swipe forward from the last tab", () => {
      host.activeIndex.set(2)
      fixture.detectChanges()
      startAt(200, 200)

      moveTo(100, 200)

      expect(translateX()).toBe(-2 * VIEWPORT_WIDTH - 25)
    })

    it("should not resist a swipe in the middle of the tabs", () => {
      host.activeIndex.set(1)
      fixture.detectChanges()
      startAt(200, 200)

      moveTo(300, 200)

      expect(translateX()).toBe(-VIEWPORT_WIDTH + 100)
    })
  })

  describe("settling the gesture", () => {
    it("should advance a tab when the drag passes the distance threshold", () => {
      startAt(200, 200)
      moveTo(200 - VIEWPORT_WIDTH * 0.5, 200)

      directive.onTouchEnd()

      expect(host.activeIndex()).toBe(1)
    })

    it("should go back a tab when dragging the other way past the threshold", () => {
      host.activeIndex.set(1)
      fixture.detectChanges()
      startAt(100, 200)
      moveTo(100 + VIEWPORT_WIDTH * 0.5, 200)

      directive.onTouchEnd()

      expect(host.activeIndex()).toBe(0)
    })

    it("should stay on the tab when the drag is too short and too slow", () => {
      startAt(200, 200)
      moveTo(180, 200)
      vi.advanceTimersByTime(FLING_MAX_DURATION)

      directive.onTouchEnd()

      expect(host.activeIndex()).toBe(0)
    })

    it("should advance on a short but fast fling", () => {
      startAt(200, 200)
      moveTo(160, 200)

      directive.onTouchEnd()

      expect(host.activeIndex()).toBe(1)
    })

    it("should not advance past the last tab", () => {
      host.activeIndex.set(2)
      fixture.detectChanges()
      startAt(200, 200)
      moveTo(200 - VIEWPORT_WIDTH * 0.5, 200)

      directive.onTouchEnd()

      expect(host.activeIndex()).toBe(2)
    })

    it("should not move back before the first tab", () => {
      startAt(200, 200)
      moveTo(200 + VIEWPORT_WIDTH * 0.5, 200)

      directive.onTouchEnd()

      expect(host.activeIndex()).toBe(0)
    })

    it("should snap the track to the settled tab", () => {
      startAt(200, 200)
      moveTo(200 - VIEWPORT_WIDTH * 0.5, 200)

      directive.onTouchEnd()

      expect(translateX()).toBe(-VIEWPORT_WIDTH)
    })

    it("should clear the transition and the will-change after settling", () => {
      startAt(200, 200)
      moveTo(160, 200)

      directive.onTouchEnd()
      vi.advanceTimersByTime(SETTLE_DURATION)

      expect(track.style.transition).toBe("none")
      expect(track.style.willChange).toBe("")
    })

    it("should ignore a touch end when no gesture is being tracked", () => {
      directive.onTouchEnd()

      expect(translateX()).toBe(restingX())
    })

    it("should ignore a touch end when the gesture locked vertically", () => {
      startAt(200, 200)
      moveTo(202, 160)

      directive.onTouchEnd()

      expect(translateX()).toBe(restingX())
    })
  })

  describe("gestures that must not start", () => {
    it("should ignore a multi touch gesture", () => {
      directive.onTouchStart(
        touchEvent([
          { clientX: 200, clientY: 200 },
          { clientX: 260, clientY: 200 }
        ])
      )

      moveTo(100, 200)

      expect(translateX()).toBe(restingX())
    })

    it("should ignore a gesture that starts on the left edge", () => {
      startAt(10, 200)

      moveTo(100, 200)

      expect(translateX()).toBe(restingX())
    })

    it("should ignore a gesture that starts on the right edge", () => {
      startAt(window.innerWidth - 10, 200)

      moveTo(100, 200)

      expect(translateX()).toBe(restingX())
    })

    it("should ignore a gesture while swiping is disabled", () => {
      host.disabled.set(true)
      fixture.detectChanges()

      startAt(200, 200)
      moveTo(100, 200)

      expect(translateX()).toBe(restingX())
    })

    it("should ignore a move that was never started", () => {
      moveTo(100, 200)

      expect(translateX()).toBe(restingX())
    })
  })

  describe("horizontally interactive targets", () => {
    it("should ignore a gesture that starts on a slider", () => {
      const slider = document.createElement("div")
      slider.setAttribute("role", "slider")
      track.appendChild(slider)

      startAt(200, 200, slider)
      moveTo(100, 200)

      expect(translateX()).toBe(restingX())
    })

    it("should ignore a gesture that starts on a horizontally scrollable area", () => {
      const scroller = document.createElement("div")
      scroller.style.overflowX = "auto"
      track.appendChild(scroller)
      Object.defineProperty(scroller, "scrollWidth", { value: 900, configurable: true })
      Object.defineProperty(scroller, "clientWidth", { value: 300, configurable: true })

      startAt(200, 200, scroller)
      moveTo(100, 200)

      expect(translateX()).toBe(restingX())
    })

    it("should swipe over a scrollable area that has nothing to scroll", () => {
      const scroller = document.createElement("div")
      scroller.style.overflowX = "auto"
      track.appendChild(scroller)
      Object.defineProperty(scroller, "scrollWidth", { value: 300, configurable: true })
      Object.defineProperty(scroller, "clientWidth", { value: 300, configurable: true })

      startAt(200, 200, scroller)
      moveTo(100, 200)

      expect(translateX()).toBe(-100)
    })

    it("should swipe over an area that does not scroll horizontally", () => {
      const plain = document.createElement("div")
      plain.style.overflowX = "hidden"
      track.appendChild(plain)

      startAt(200, 200, plain)
      moveTo(100, 200)

      expect(translateX()).toBe(-100)
    })

    it("should swipe when the gesture starts outside the viewport element", () => {
      const outside = document.createElement("div")
      document.body.appendChild(outside)

      startAt(200, 200, outside)
      moveTo(100, 200)

      expect(translateX()).toBe(-100)

      outside.remove()
    })
  })

  describe("drag targets", () => {
    it("should ignore a gesture that starts on a draggable item", () => {
      const drag = document.createElement("div")
      drag.className = "cdk-drag"
      track.appendChild(drag)

      startAt(200, 200, drag)
      moveTo(100, 200)

      expect(translateX()).toBe(restingX())
    })

    it("should swipe over a disabled draggable item", () => {
      const drag = document.createElement("div")
      drag.className = "cdk-drag cdk-drag-disabled"
      track.appendChild(drag)

      startAt(200, 200, drag)
      moveTo(100, 200)

      expect(translateX()).toBe(-100)
    })

    it("should ignore a gesture that starts on the handle of a draggable item", () => {
      const drag = document.createElement("div")
      drag.className = "cdk-drag"
      const handle = document.createElement("div")
      handle.className = "cdk-drag-handle"
      drag.appendChild(handle)
      track.appendChild(drag)

      startAt(200, 200, handle)
      moveTo(100, 200)

      expect(translateX()).toBe(restingX())
    })

    it("should swipe when the draggable item is only movable by a handle elsewhere", () => {
      const drag = document.createElement("div")
      drag.className = "cdk-drag"
      const handle = document.createElement("div")
      handle.className = "cdk-drag-handle"
      const body = document.createElement("div")
      drag.append(handle, body)
      track.appendChild(drag)

      startAt(200, 200, body)
      moveTo(100, 200)

      expect(translateX()).toBe(-100)
    })
  })

  describe("reacting to an index change from outside", () => {
    it("should animate to the neighbouring tab", () => {
      host.activeIndex.set(1)
      fixture.detectChanges()

      expect(translateX()).toBe(-VIEWPORT_WIDTH)
      expect(track.style.transition).toContain("transform")
    })

    it("should clear the transition once the animation settled", () => {
      host.activeIndex.set(1)
      fixture.detectChanges()

      vi.advanceTimersByTime(SETTLE_DURATION)

      expect(track.style.transition).toBe("none")
    })

    it("should land on a distant tab without passing through the ones between", () => {
      host.activeIndex.set(2)
      fixture.detectChanges()

      expect(translateX()).toBe(-2 * VIEWPORT_WIDTH)
    })

    it("should land on a distant tab when moving backwards", () => {
      host.activeIndex.set(2)
      fixture.detectChanges()
      vi.advanceTimersByTime(SETTLE_DURATION)

      host.activeIndex.set(0)
      fixture.detectChanges()

      expect(translateX()).toBe(0)
    })

    it("should not animate the jump to a distant tab", () => {
      host.activeIndex.set(2)
      fixture.detectChanges()

      expect(track.style.transition).toBe("none")
    })

    it("should keep animating a move to the neighbour tab", () => {
      host.activeIndex.set(1)
      fixture.detectChanges()

      expect(track.style.transition).toContain("transform")

      vi.advanceTimersByTime(SETTLE_DURATION)

      expect(track.style.transition).toBe("none")
    })

    it("should not animate the index it settled itself", () => {
      startAt(200, 200)
      moveTo(200 - VIEWPORT_WIDTH * 0.5, 200)
      directive.onTouchEnd()

      track.style.transform = ""
      fixture.detectChanges()

      expect(track.style.transform).toBe("")
    })
  })

  describe("without a track element", () => {
    it("should not fail when the track is missing", () => {
      track.remove()

      startAt(200, 200)
      moveTo(100, 200)
      directive.onTouchEnd()
      vi.advanceTimersByTime(SETTLE_DURATION)

      expect(host.activeIndex()).toBe(1)
    })

    it("should not fail when jumping to a distant tab without a track", () => {
      track.remove()

      host.activeIndex.set(2)
      fixture.detectChanges()

      expect(host.activeIndex()).toBe(2)
    })
  })

  describe("a viewport with no measured width", () => {
    beforeEach(() => {
      Object.defineProperty(viewport, "clientWidth", { value: 0, configurable: true })
    })

    it("should fall back to a single pixel while dragging", () => {
      host.activeIndex.set(1)
      fixture.detectChanges()
      startAt(200, 200)

      moveTo(150, 200)

      expect(translateX()).toBe(-51)
    })

    it("should fall back to a single pixel when jumping to a distant tab", () => {
      host.activeIndex.set(2)
      fixture.detectChanges()

      expect(translateX()).toBe(-2)
    })

    it("should still advance a tab on a fling", () => {
      startAt(200, 200)
      moveTo(160, 200)

      directive.onTouchEnd()

      expect(host.activeIndex()).toBe(1)
    })
  })

  describe("host bindings", () => {
    function dispatch(type: string) {
      viewport.dispatchEvent(new Event(type, { bubbles: true }))
    }

    it("should start tracking from a touch start event", () => {
      const event = new Event("touchstart", { bubbles: true, cancelable: true })
      Object.defineProperty(event, "touches", { value: Object.assign([{ clientX: 200, clientY: 200 }], { length: 1 }) })
      Object.defineProperty(event, "target", { value: track })

      viewport.dispatchEvent(event)
      moveTo(100, 200)

      expect(translateX()).toBe(-100)
    })

    it("should settle the gesture on a touch end event", () => {
      startAt(200, 200)
      moveTo(200 - VIEWPORT_WIDTH * 0.5, 200)

      dispatch("touchend")

      expect(host.activeIndex()).toBe(1)
    })

    it("should settle the gesture when the touch is cancelled", () => {
      startAt(200, 200)
      moveTo(200 - VIEWPORT_WIDTH * 0.5, 200)

      dispatch("touchcancel")

      expect(host.activeIndex()).toBe(1)
    })
  })

  describe("outside the browser", () => {
    it("should not track gestures on the server", () => {
      build("server")

      startAt(200, 200)
      moveTo(100, 200)

      expect(track.style.transform).toBe("")
    })
  })
})
