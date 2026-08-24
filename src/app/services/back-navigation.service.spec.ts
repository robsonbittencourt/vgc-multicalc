import { PLATFORM_ID, provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { BackNavigationResolvers, BackNavigationService } from "@app/services/back-navigation.service"

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
  let resolvers: BackNavigationResolvers & { tab: any; overlay: any; creation: any; exhausted: any }

  beforeEach(() => {
    history.replaceState(null, "")
    service = buildService()

    resolvers = {
      tab: vi.fn(),
      overlay: vi.fn(),
      creation: vi.fn(),
      exhausted: vi.fn()
    }

    service.register(resolvers)
  })

  describe("push", () => {
    it("should add a phantom history entry", () => {
      service.push({ kind: "overlay" })

      expect(history.state).toEqual({ vgcPhantom: true })
    })

    it("should grow the stack depth", () => {
      service.push({ kind: "overlay" })
      service.push({ kind: "tab", tab: "teams" })

      expect(service.depth).toBe(2)
    })

    it("should report which kinds are on the stack", () => {
      service.push({ kind: "tab", tab: "teams" })
      service.push({ kind: "creation", originTab: "teams" })

      expect(service.contains("creation")).toBe(true)
      expect(service.contains("overlay")).toBe(false)
    })
  })

  describe("resolving a back navigation", () => {
    it("should resolve the top step with the matching resolver", () => {
      service.push({ kind: "overlay" })

      goBack()

      expect(resolvers.overlay).toHaveBeenCalledTimes(1)
      expect(resolvers.tab).not.toHaveBeenCalled()
    })

    it("should hand the tab step to the tab resolver", () => {
      service.push({ kind: "tab", tab: "teams" })

      goBack()

      expect(resolvers.tab).toHaveBeenCalledWith({ kind: "tab", tab: "teams" })
    })

    it("should hand the creation step with its origin tab", () => {
      service.push({ kind: "creation", originTab: "teams" })

      goBack()

      expect(resolvers.creation).toHaveBeenCalledWith({ kind: "creation", originTab: "teams" })
    })

    it("should unwind the steps in reverse order", () => {
      service.push({ kind: "tab", tab: "teams" })
      service.push({ kind: "creation", originTab: "teams" })

      goBack()
      goBack()

      expect(resolvers.creation).toHaveBeenCalledTimes(1)
      expect(resolvers.tab).toHaveBeenCalledTimes(1)
      expect(service.depth).toBe(0)
    })

    it("should consume the step so a second back does not resolve it again", () => {
      service.push({ kind: "overlay" })

      goBack()
      goBack()

      expect(resolvers.overlay).toHaveBeenCalledTimes(1)
    })

    it("should call the exhausted resolver when the stack is empty", () => {
      goBack()

      expect(resolvers.exhausted).toHaveBeenCalledTimes(1)
    })

    it("should not resolve a creation step when no creation resolver is registered", () => {
      service.register({ tab: resolvers.tab, overlay: resolvers.overlay, exhausted: resolvers.exhausted })
      service.push({ kind: "creation", originTab: "teams" })

      goBack()

      expect(resolvers.exhausted).not.toHaveBeenCalled()
      expect(service.depth).toBe(0)
    })
  })

  describe("pop", () => {
    it("should remove the top step", () => {
      service.push({ kind: "tab", tab: "teams" })
      service.push({ kind: "overlay" })

      service.pop()

      expect(service.depth).toBe(1)
      expect(service.contains("overlay")).toBe(false)
    })

    it("should do nothing when the stack is empty", () => {
      service.pop()

      expect(service.depth).toBe(0)
    })

    it("should not step back when the current entry is not a phantom", () => {
      const back = vi.spyOn(history, "back").mockImplementation(vi.fn())

      service.push({ kind: "overlay" })
      history.replaceState(null, "")
      service.pop()

      expect(back).not.toHaveBeenCalled()
      expect(service.depth).toBe(0)

      back.mockRestore()
    })

    it("should not resolve the step it popped programmatically", () => {
      service.push({ kind: "overlay" })

      service.pop()
      goBack()

      expect(resolvers.overlay).not.toHaveBeenCalled()
    })
  })

  describe("register", () => {
    it("should clear the stack of the previous screen", () => {
      service.push({ kind: "tab", tab: "teams" })

      service.register(resolvers)

      expect(service.depth).toBe(0)
    })
  })

  describe("unregister", () => {
    it("should clear the stack", () => {
      service.push({ kind: "tab", tab: "teams" })

      service.unregister()

      expect(service.depth).toBe(0)
    })

    it("should stop resolving back navigations", () => {
      service.push({ kind: "overlay" })

      service.unregister()
      goBack()

      expect(resolvers.overlay).not.toHaveBeenCalled()
      expect(resolvers.exhausted).not.toHaveBeenCalled()
    })

    it("should step back again when a phantom entry is left behind", () => {
      const back = vi.spyOn(history, "back").mockImplementation(vi.fn())
      history.pushState({ vgcPhantom: true }, "")

      service.unregister()
      goBack()

      expect(back).toHaveBeenCalledTimes(1)

      back.mockRestore()
    })

    it("should not step back when the current entry is not a phantom", () => {
      const back = vi.spyOn(history, "back").mockImplementation(vi.fn())
      history.replaceState(null, "")

      service.unregister()
      goBack()

      expect(back).not.toHaveBeenCalled()

      back.mockRestore()
    })
  })

  describe("outside the browser", () => {
    it("should not listen to popstate on the server", () => {
      buildService("server")

      expect(registeredListeners.length).toBe(0)
    })

    it("should not push history entries on the server", () => {
      const serverService = buildService("server")
      serverService.register(resolvers)

      serverService.push({ kind: "overlay" })

      expect(serverService.depth).toBe(0)
    })
  })
})
