import { PLATFORM_ID, provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { DeviceDetectorService } from "@app/services/device-detector.service"

describe("DeviceDetectorService", () => {
  let resizeListeners: EventListener[] = []

  function buildService(initialWidth: number, platformId: object | string = "browser"): DeviceDetectorService {
    resizeListeners = []

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), DeviceDetectorService, { provide: PLATFORM_ID, useValue: platformId }]
    })

    setWidth(initialWidth)

    const addEventListener = vi.spyOn(window, "addEventListener").mockImplementation((type: string, listener: EventListenerOrEventListenerObject) => {
      if (type === "resize") resizeListeners.push(listener as EventListener)
    })

    const service = TestBed.inject(DeviceDetectorService)
    addEventListener.mockRestore()

    return service
  }

  function setWidth(width: number) {
    Object.defineProperty(window, "innerWidth", { value: width, configurable: true, writable: true })
  }

  function resizeTo(width: number) {
    setWidth(width)
    resizeListeners.forEach(listener => listener(new Event("resize")))
  }

  it("should be desktop when the window is at least 1280px wide", () => {
    const service = buildService(1280)

    expect(service.isDesktop()).toBe(true)
  })

  it("should not be desktop when the window is narrower than 1280px", () => {
    const service = buildService(1279)

    expect(service.isDesktop()).toBe(false)
  })

  it("should become desktop when the window is resized above the threshold", () => {
    const service = buildService(800)

    resizeTo(1440)

    expect(service.isDesktop()).toBe(true)
  })

  it("should stop being desktop when the window is resized below the threshold", () => {
    const service = buildService(1440)

    resizeTo(1024)

    expect(service.isDesktop()).toBe(false)
  })

  it("should not be desktop on the server", () => {
    const service = buildService(1440, "server")

    expect(service.isDesktop()).toBe(false)
  })

  it("should not listen to resize on the server", () => {
    buildService(1440, "server")

    expect(resizeListeners.length).toBe(0)
  })
})
