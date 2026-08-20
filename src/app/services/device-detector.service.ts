import { Injectable, PLATFORM_ID, inject, signal } from "@angular/core"
import { isPlatformBrowser } from "@angular/common"

@Injectable({
  providedIn: "root"
})
export class DeviceDetectorService {
  private platformId = inject(PLATFORM_ID)

  private largeWidthResolution = 1280

  private largeScreen = signal(isPlatformBrowser(this.platformId) && window.innerWidth >= this.largeWidthResolution)

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return

    window.addEventListener("resize", () => {
      this.largeScreen.set(window.innerWidth >= this.largeWidthResolution)
    })
  }

  isDesktop = (): boolean => {
    return this.largeScreen()
  }
}
