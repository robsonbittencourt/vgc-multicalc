import { Injectable, PLATFORM_ID, inject, signal } from "@angular/core"
import { isPlatformBrowser } from "@angular/common"

@Injectable({ providedIn: "root" })
export class PwaInstallService {
  private platformId = inject(PLATFORM_ID)

  canInstall = signal(false)

  private promptEvent: BeforeInstallPromptEvent | null = null

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return

    window.addEventListener("beforeinstallprompt", (event: Event) => {
      event.preventDefault()
      this.promptEvent = event as BeforeInstallPromptEvent
      this.canInstall.set(true)
    })

    window.addEventListener("appinstalled", () => {
      this.promptEvent = null
      this.canInstall.set(false)
    })
  }

  async install() {
    if (!this.promptEvent) return

    this.promptEvent.prompt()
    const { outcome } = await this.promptEvent.userChoice

    if (outcome === "accepted") {
      this.promptEvent = null
      this.canInstall.set(false)
    }
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): void
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}
