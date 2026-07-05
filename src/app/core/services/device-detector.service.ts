import { Injectable, signal } from "@angular/core"

@Injectable({
  providedIn: "root"
})
export class DeviceDetectorService {
  private largeWidthResolution = 1280

  private largeScreen = signal(typeof window !== "undefined" && window.innerWidth >= this.largeWidthResolution)

  constructor() {
    if (typeof window === "undefined") return

    window.addEventListener("resize", () => {
      this.largeScreen.set(window.innerWidth >= this.largeWidthResolution)
    })
  }

  isDesktop = (): boolean => {
    return this.largeScreen()
  }
}
