import { Injectable, PLATFORM_ID, inject } from "@angular/core"
import { isPlatformBrowser } from "@angular/common"

@Injectable({ providedIn: "root" })
export class BackNavigationService {
  private platformId = inject(PLATFORM_ID)

  private onBack: (() => void) | null = null
  private isNonDefault = false

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return

    window.addEventListener("popstate", () => {
      if (this.isNonDefault) {
        this.isNonDefault = false
        this.onBack?.()

        return
      }

      if (history.state?.vgcPhantom) {
        history.back()
      }
    })
  }

  register(onBack: () => void) {
    this.onBack = onBack
    this.isNonDefault = false
  }

  push() {
    if (!this.isNonDefault) {
      history.pushState({ vgcPhantom: true }, "")
      this.isNonDefault = true
    }
  }

  pop() {
    if (this.isNonDefault) {
      this.isNonDefault = false
      history.back()
    }
  }

  unregister() {
    this.onBack = null
    this.isNonDefault = false
  }
}
