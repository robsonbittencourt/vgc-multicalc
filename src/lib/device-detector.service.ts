import { Injectable, signal } from "@angular/core"

@Injectable({
  providedIn: "root"
})
export class DeviceDetectorService {
  private largeWidthResolution = 1280

  private largeScreen = signal(window.innerWidth >= this.largeWidthResolution)

  constructor() {
    window.addEventListener("resize", () => {
      this.largeScreen.set(window.innerWidth >= this.largeWidthResolution)
    })
  }

  isDesktop = (): boolean => {
    return this.largeScreen()
  }
}
