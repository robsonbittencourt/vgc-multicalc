import { Injectable, PLATFORM_ID, inject, signal } from "@angular/core"
import { isPlatformBrowser } from "@angular/common"

@Injectable({
  providedIn: "root"
})
export class NetworkStatusService {
  private platformId = inject(PLATFORM_ID)

  readonly isOnline = signal(isPlatformBrowser(this.platformId) ? navigator.onLine : true)

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return

    window.addEventListener("online", () => this.isOnline.set(true))
    window.addEventListener("offline", () => this.isOnline.set(false))
  }
}
