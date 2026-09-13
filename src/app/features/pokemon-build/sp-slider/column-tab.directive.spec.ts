import { Component, CUSTOM_ELEMENTS_SCHEMA, provideZonelessChangeDetection } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ColumnTabDirective } from "@features/pokemon-build/sp-slider/column-tab.directive"

@Component({
  imports: [ColumnTabDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <app-sp-slider>
      <input data-cy="hp-percentage-value" appColumnTab="mod" id="mod-hp" />
      <input data-cy="sp-value" appColumnTab="sp" id="sp-hp" />
    </app-sp-slider>
    <app-sp-slider>
      <input data-cy="stat-modifier" appColumnTab="mod" id="mod-atk" />
      <input data-cy="sp-value" appColumnTab="sp" id="sp-atk" />
    </app-sp-slider>
    <app-sp-slider>
      <input data-cy="stat-modifier" appColumnTab="mod" id="mod-def" />
      <input data-cy="sp-value" appColumnTab="sp" id="sp-def" />
    </app-sp-slider>
  `
})
class HostComponent {}

@Component({
  imports: [ColumnTabDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<input appColumnTab="sp" id="orphan" />`
})
class OrphanHostComponent {}

@Component({
  imports: [ColumnTabDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <app-sp-slider>
      <input data-cy="sp-value" appColumnTab="unknown-column" id="unknown" />
    </app-sp-slider>
    <app-sp-slider>
      <input data-cy="sp-value" id="sp-next" />
    </app-sp-slider>
  `
})
class UnknownColumnHostComponent {}

@Component({
  imports: [ColumnTabDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <app-sp-slider>
      <input data-cy="sp-value" appColumnTab="sp" id="sp-first" />
    </app-sp-slider>
    <div class="remaining-sps">
      <input data-cy="sp-value" id="sp-outside" />
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

    const event = pressTab(fixture, "sp-hp")

    expect(document.activeElement?.id).toBe("sp-atk")
    expect(event.defaultPrevented).toBe(true)
  })

  it("should move focus to the same column of the previous row when shift is pressed", () => {
    const fixture = setup(HostComponent)

    const event = pressTab(fixture, "sp-def", true)

    expect(document.activeElement?.id).toBe("sp-atk")
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

    const event = pressTab(fixture, "sp-def")

    expect(document.activeElement?.id).toBe("sp-def")
    expect(event.defaultPrevented).toBe(false)
  })

  it("should keep the natural flow on the first row when shift is pressed", () => {
    const fixture = setup(HostComponent)

    const event = pressTab(fixture, "sp-hp", true)

    expect(document.activeElement?.id).toBe("sp-hp")
    expect(event.defaultPrevented).toBe(false)
  })

  it("should ignore keys other than tab", () => {
    const fixture = setup(HostComponent)
    const element = findById(fixture, "sp-hp")
    const event = new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true, cancelable: true })

    element.focus()
    element.dispatchEvent(event)

    expect(document.activeElement?.id).toBe("sp-hp")
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

    const event = pressTab(fixture, "sp-first")

    expect(document.activeElement?.id).toBe("sp-first")
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
