import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { BackNavigationService } from "@app/services/back-navigation.service"
import { MobileTableOverlayService } from "./mobile-table-overlay.service"

describe("MobileTableOverlayService", () => {
  let service: MobileTableOverlayService
  let backNavigation: { push: ReturnType<typeof vi.fn>; pop: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    backNavigation = { push: vi.fn(), pop: vi.fn() }

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), MobileTableOverlayService, { provide: BackNavigationService, useValue: backNavigation }]
    })

    service = TestBed.inject(MobileTableOverlayService)
  })

  it("should start with no table open", () => {
    expect(service.kind()).toBeNull()
    expect(service.currentFilter()).toBe("")
    expect(service.isAnyOpen()).toBe(false)
  })

  it("should open the requested table", () => {
    service.open("abilities")

    expect(service.kind()).toBe("abilities")
    expect(service.isAnyOpen()).toBe(true)
  })

  it("should push an overlay step when opening a table", () => {
    service.open("moves")

    expect(backNavigation.push).toHaveBeenCalledWith({ kind: "overlay" })
  })

  it("should not push a second step when another table replaces the open one", () => {
    service.open("moves")

    service.open("items")

    expect(backNavigation.push).toHaveBeenCalledTimes(1)
  })

  it("should clear the filter when another table is opened", () => {
    service.open("pokemon")
    service.setFilter("Incineroar")

    service.open("items")

    expect(service.kind()).toBe("items")
    expect(service.currentFilter()).toBe("")
  })

  it("should keep the filter while the same table stays open", () => {
    service.open("pokemon")

    service.setFilter("Rillaboom")

    expect(service.currentFilter()).toBe("Rillaboom")
  })

  it("should close the table and clear the filter", () => {
    service.open("moves")
    service.setFilter("Fake Out")

    service.close()

    expect(service.kind()).toBeNull()
    expect(service.currentFilter()).toBe("")
    expect(service.isAnyOpen()).toBe(false)
  })

  it("should pop the back navigation entry when closing", () => {
    service.open("moves")

    service.close()

    expect(backNavigation.pop).toHaveBeenCalledTimes(1)
  })

  it("should not pop the back navigation entry when no table was open", () => {
    service.close()

    expect(service.kind()).toBeNull()
    expect(backNavigation.pop).not.toHaveBeenCalled()
  })

  it("should close the table without touching the history", () => {
    service.open("items")
    service.setFilter("Sitrus Berry")

    service.closeWithoutHistory()

    expect(service.kind()).toBeNull()
    expect(service.currentFilter()).toBe("")
    expect(backNavigation.pop).not.toHaveBeenCalled()
  })

  it("should open a table without pushing a step", () => {
    service.openWithoutHistory("pokemon")

    expect(service.kind()).toBe("pokemon")
    expect(backNavigation.push).not.toHaveBeenCalled()
  })
})
