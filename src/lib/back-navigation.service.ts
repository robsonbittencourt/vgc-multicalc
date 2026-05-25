import { Injectable, PLATFORM_ID, inject } from "@angular/core"
import { isPlatformBrowser } from "@angular/common"

@Injectable({ providedIn: "root" })
export class BackNavigationService {
  private platformId = inject(PLATFORM_ID)

  private onBack: (() => void) | null = null
  private callbackStack: (() => void)[] = []
  private isPoppingProgrammatically = false

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return

    window.addEventListener("popstate", () => {
      if (this.isPoppingProgrammatically) {
        this.isPoppingProgrammatically = false
        return
      }

      if (this.callbackStack.length > 0) {
        const callback = this.callbackStack.pop()!
        callback()
        return
      }

      if (this.onBack) {
        this.onBack()
        return
      }

      if (history.state?.vgcPhantom) {
        history.back()
      }
    })
  }

  register(onBack: () => void) {
    this.onBack = onBack
    this.callbackStack = []
  }

  push(onBack?: () => void) {
    history.pushState({ vgcPhantom: true }, "")
    this.callbackStack.push(onBack ?? (() => this.onBack?.()))
  }

  pop() {
    if (this.callbackStack.length > 0) {
      this.callbackStack.pop()
      this.isPoppingProgrammatically = true
      history.back()
    }
  }

  unregister() {
    this.onBack = null
    this.callbackStack = []
  }
}
