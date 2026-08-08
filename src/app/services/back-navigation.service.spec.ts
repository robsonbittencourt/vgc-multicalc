import { PLATFORM_ID, provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { BackNavigationService } from "@app/services/back-navigation.service"

describe("BackNavigationService", () => {
  const registeredListeners: EventListener[] = []

  function buildService(platformId: object | string = "browser"): BackNavigationService {
    registeredListeners.length = 0

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), BackNavigationService, { provide: PLATFORM_ID, useValue: platformId }]
    })

    const addEventListener = vi.spyOn(window, "addEventListener").mockImplementation((type: string, listener: EventListenerOrEventListenerObject) => {
      if (type === "popstate") registeredListeners.push(listener as EventListener)
    })

    const service = TestBed.inject(BackNavigationService)
    addEventListener.mockRestore()

    return service
  }

  function goBack() {
    registeredListeners.forEach(listener => listener(new PopStateEvent("popstate")))
  }

  let service: BackNavigationService

  beforeEach(() => {
    history.replaceState(null, "")
    service = buildService()
  })

  describe("push", () => {
    it("should add a phantom history entry", () => {
      service.push(() => void 0)

      expect(history.state).toEqual({ vgcPhantom: true })
    })

    it("should run the pushed callback when the user navigates back", () => {
      const onBack = vi.fn()
      service.push(onBack)

      goBack()

      expect(onBack).toHaveBeenCalledTimes(1)
    })

    it("should consume the callback so a second back does not run it again", () => {
      const onBack = vi.fn()
      service.push(onBack)

      goBack()
      goBack()

      expect(onBack).toHaveBeenCalledTimes(1)
    })

    it("should unwind the stacked callbacks in reverse order", () => {
      const order: string[] = []
      service.push(() => order.push("first"))
      service.push(() => order.push("second"))

      goBack()
      goBack()

      expect(order).toEqual(["second", "first"])
    })

    it("should fall back to the registered handler when pushed without a callback", () => {
      const registered = vi.fn()
      service.register(registered)
      service.push()

      goBack()

      expect(registered).toHaveBeenCalledTimes(1)
    })

    it("should not fail when pushed without a callback and nothing is registered", () => {
      service.push()

      expect(() => goBack()).not.toThrow()
    })
  })

  describe("register", () => {
    it("should run the registered handler when there is no stacked callback", () => {
      const registered = vi.fn()
      service.register(registered)

      goBack()

      expect(registered).toHaveBeenCalledTimes(1)
    })

    it("should keep the registered handler active across several back navigations", () => {
      const registered = vi.fn()
      service.register(registered)

      goBack()
      goBack()

      expect(registered).toHaveBeenCalledTimes(2)
    })

    it("should discard the stacked callbacks when a new handler is registered", () => {
      const stacked = vi.fn()
      const registered = vi.fn()
      service.push(stacked)

      service.register(registered)
      goBack()

      expect(stacked).not.toHaveBeenCalled()
      expect(registered).toHaveBeenCalledTimes(1)
    })

    it("should give the stacked callback priority over the registered handler", () => {
      const stacked = vi.fn()
      const registered = vi.fn()
      service.register(registered)
      service.push(stacked)

      goBack()

      expect(stacked).toHaveBeenCalledTimes(1)
      expect(registered).not.toHaveBeenCalled()
    })
  })

  describe("pop", () => {
    it("should discard the stacked callback without running it", () => {
      const onBack = vi.fn()
      service.push(onBack)

      service.pop()

      expect(onBack).not.toHaveBeenCalled()
    })

    it("should do nothing when there is no stacked callback", () => {
      const registered = vi.fn()
      service.register(registered)

      service.pop()

      expect(registered).not.toHaveBeenCalled()
    })

    it("should swallow the popstate event it triggers itself", () => {
      const registered = vi.fn()
      service.register(registered)
      service.push(vi.fn())

      service.pop()
      goBack()

      expect(registered).not.toHaveBeenCalled()
    })
  })

  describe("unregister", () => {
    it("should stop running the registered handler", () => {
      const registered = vi.fn()
      service.register(registered)

      service.unregister()
      goBack()

      expect(registered).not.toHaveBeenCalled()
    })

    it("should clear the stacked callbacks", () => {
      const stacked = vi.fn()
      service.push(stacked)

      service.unregister()
      goBack()

      expect(stacked).not.toHaveBeenCalled()
    })
  })

  describe("phantom history entry", () => {
    it("should step back out of a leftover phantom entry", () => {
      const backSpy = vi.spyOn(history, "back").mockImplementation(() => void 0)

      try {
        history.replaceState({ vgcPhantom: true }, "")

        goBack()

        expect(backSpy).toHaveBeenCalledTimes(1)
      } finally {
        backSpy.mockRestore()
      }
    })

    it("should ignore a back navigation when there is no phantom entry", () => {
      const backSpy = vi.spyOn(history, "back").mockImplementation(() => void 0)

      try {
        history.replaceState(null, "")

        goBack()

        expect(backSpy).not.toHaveBeenCalled()
      } finally {
        backSpy.mockRestore()
      }
    })
  })

  describe("Server side rendering", () => {
    it("should not listen to back navigations when running on the server", () => {
      const serverService = buildService("server")
      const registered = vi.fn()
      serverService.register(registered)

      goBack()

      expect(registered).not.toHaveBeenCalled()
    })
  })
})
