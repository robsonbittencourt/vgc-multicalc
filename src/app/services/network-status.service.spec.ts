import { PLATFORM_ID, provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { NetworkStatusService } from "@app/services/network-status.service"

describe("NetworkStatusService", () => {
  let listeners: Record<string, EventListener[]> = {}

  function buildService(initialOnline: boolean, platformId: object | string = "browser"): NetworkStatusService {
    listeners = {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), NetworkStatusService, { provide: PLATFORM_ID, useValue: platformId }]
    })

    Object.defineProperty(navigator, "onLine", { value: initialOnline, configurable: true, writable: true })

    const addEventListener = vi.spyOn(window, "addEventListener").mockImplementation((type: string, listener: EventListenerOrEventListenerObject) => {
      listeners[type] = [...(listeners[type] ?? []), listener as EventListener]
    })

    const service = TestBed.inject(NetworkStatusService)
    addEventListener.mockRestore()

    return service
  }

  function dispatch(type: string) {
    ;(listeners[type] ?? []).forEach(listener => listener(new Event(type)))
  }

  it("should start online when the navigator is online", () => {
    const service = buildService(true)

    expect(service.isOnline()).toBe(true)
  })

  it("should start offline when the navigator is offline", () => {
    const service = buildService(false)

    expect(service.isOnline()).toBe(false)
  })

  it("should become offline when the offline event fires", () => {
    const service = buildService(true)

    dispatch("offline")

    expect(service.isOnline()).toBe(false)
  })

  it("should become online when the online event fires", () => {
    const service = buildService(false)

    dispatch("online")

    expect(service.isOnline()).toBe(true)
  })

  it("should be online on the server even when the navigator is offline", () => {
    const service = buildService(false, "server")

    expect(service.isOnline()).toBe(true)
  })

  it("should not listen to connectivity events on the server", () => {
    buildService(true, "server")

    expect(Object.keys(listeners).length).toBe(0)
  })
})
