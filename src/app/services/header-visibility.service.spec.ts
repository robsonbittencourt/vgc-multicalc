import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { HeaderVisibilityService } from "@app/services/header-visibility.service"

describe("HeaderVisibilityService", () => {
  let service: HeaderVisibilityService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), HeaderVisibilityService]
    })

    service = TestBed.inject(HeaderVisibilityService)
  })

  describe("initial state", () => {
    it("should start with the header visible", () => {
      expect(service.hidden()).toBe(false)
    })
  })

  describe("hide", () => {
    it("should hide the header when it is visible", () => {
      service.hide()

      expect(service.hidden()).toBe(true)
    })

    it("should keep the header hidden when it is already hidden", () => {
      service.hide()

      service.hide()

      expect(service.hidden()).toBe(true)
    })
  })

  describe("show", () => {
    it("should show the header when it is hidden", () => {
      service.hide()

      service.show()

      expect(service.hidden()).toBe(false)
    })

    it("should keep the header visible when it is already visible", () => {
      service.show()

      expect(service.hidden()).toBe(false)
    })
  })

  describe("reset", () => {
    it("should show the header when it is hidden", () => {
      service.hide()

      service.reset()

      expect(service.hidden()).toBe(false)
    })

    it("should keep the header visible when it is already visible", () => {
      service.reset()

      expect(service.hidden()).toBe(false)
    })
  })
})
