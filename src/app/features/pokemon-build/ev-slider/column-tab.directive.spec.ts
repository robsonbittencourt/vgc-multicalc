import { Component, CUSTOM_ELEMENTS_SCHEMA, provideZonelessChangeDetection } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ColumnTabDirective } from "@features/pokemon-build/ev-slider/column-tab.directive"

@Component({
  imports: [ColumnTabDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <app-ev-slider>
      <input data-cy="hp-percentage-value" appColumnTab="mod" id="mod-hp" />
      <input data-cy="ev-value" appColumnTab="ev" id="ev-hp" />
    </app-ev-slider>
    <app-ev-slider>
      <input data-cy="stat-modifier" appColumnTab="mod" id="mod-atk" />
      <input data-cy="ev-value" appColumnTab="ev" id="ev-atk" />
    </app-ev-slider>
    <app-ev-slider>
      <input data-cy="stat-modifier" appColumnTab="mod" id="mod-def" />
      <input data-cy="ev-value" appColumnTab="ev" id="ev-def" />
    </app-ev-slider>
  `
})
class HostComponent {}

@Component({
  imports: [ColumnTabDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<input appColumnTab="ev" id="orphan" />`
})
class OrphanHostComponent {}

@Component({
  imports: [ColumnTabDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <app-ev-slider>
      <input data-cy="ev-value" appColumnTab="unknown-column" id="unknown" />
    </app-ev-slider>
    <app-ev-slider>
      <input data-cy="ev-value" id="ev-next" />
    </app-ev-slider>
  `
})
class UnknownColumnHostComponent {}

@Component({
  imports: [ColumnTabDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <app-ev-slider>
      <input data-cy="ev-value" appColumnTab="ev" id="ev-first" />
    </app-ev-slider>
    <div class="remaining-evs">
      <input data-cy="ev-value" id="ev-outside" />
    </div>
  `
})
class NonRowSiblingHostComponent {}

function setup<T>(component: new () => T) {
  TestBed.resetTestingModule()
  TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] })

  const fixture = TestBed.createComponent(component)
  fixture.detectChanges()
  document.body.appendChild(fixture.nativeElement)

  return fixture
}

function findById(fixture: ComponentFixture<unknown>, id: string): HTMLElement {
  const root = fixture.nativeElement as HTMLElement

  return root.querySelector<HTMLElement>(`#${id}`)!
}

function pressTab(fixture: ComponentFixture<unknown>, id: string, shiftKey = false) {
  const element = findById(fixture, id)
  const event = new KeyboardEvent("keydown", { key: "Tab", shiftKey, bubbles: true, cancelable: true })

  element.focus()
  element.dispatchEvent(event)

  return event
}

describe("ColumnTabDirective", () => {
  it("should move focus to the same column of the next row", () => {
    const fixture = setup(HostComponent)

    const event = pressTab(fixture, "ev-hp")

    expect(document.activeElement?.id).toBe("ev-atk")
    expect(event.defaultPrevented).toBe(true)
  })

  it("should move focus to the same column of the previous row when shift is pressed", () => {
    const fixture = setup(HostComponent)

    const event = pressTab(fixture, "ev-def", true)

    expect(document.activeElement?.id).toBe("ev-atk")
    expect(event.defaultPrevented).toBe(true)
  })

  it("should move focus from the hp percentage field to the stat modifier of the next row", () => {
    const fixture = setup(HostComponent)

    pressTab(fixture, "mod-hp")

    expect(document.activeElement?.id).toBe("mod-atk")
  })

  it("should move focus between stat modifiers of consecutive rows", () => {
    const fixture = setup(HostComponent)

    pressTab(fixture, "mod-atk")

    expect(document.activeElement?.id).toBe("mod-def")
  })

  it("should keep the natural flow on the last row", () => {
    const fixture = setup(HostComponent)

    const event = pressTab(fixture, "ev-def")

    expect(document.activeElement?.id).toBe("ev-def")
    expect(event.defaultPrevented).toBe(false)
  })

  it("should keep the natural flow on the first row when shift is pressed", () => {
    const fixture = setup(HostComponent)

    const event = pressTab(fixture, "ev-hp", true)

    expect(document.activeElement?.id).toBe("ev-hp")
    expect(event.defaultPrevented).toBe(false)
  })

  it("should ignore keys other than tab", () => {
    const fixture = setup(HostComponent)
    const element = findById(fixture, "ev-hp")
    const event = new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true, cancelable: true })

    element.focus()
    element.dispatchEvent(event)

    expect(document.activeElement?.id).toBe("ev-hp")
    expect(event.defaultPrevented).toBe(false)
  })

  it("should keep the natural flow when the element is not inside a row", () => {
    const fixture = setup(OrphanHostComponent)

    const event = pressTab(fixture, "orphan")

    expect(document.activeElement?.id).toBe("orphan")
    expect(event.defaultPrevented).toBe(false)
  })

  it("should keep the natural flow when the sibling is not a row", () => {
    const fixture = setup(NonRowSiblingHostComponent)

    const event = pressTab(fixture, "ev-first")

    expect(document.activeElement?.id).toBe("ev-first")
    expect(event.defaultPrevented).toBe(false)
  })

  it("should keep the natural flow when the column is unknown", () => {
    const fixture = setup(UnknownColumnHostComponent)

    const event = pressTab(fixture, "unknown")

    expect(document.activeElement?.id).toBe("unknown")
    expect(event.defaultPrevented).toBe(false)
  })

  it("should keep the natural flow when the next row has no field for the column", () => {
    const fixture = setup(HostComponent)
    findById(fixture, "mod-atk").remove()

    const event = pressTab(fixture, "mod-hp")

    expect(document.activeElement?.id).toBe("mod-hp")
    expect(event.defaultPrevented).toBe(false)
  })
})
