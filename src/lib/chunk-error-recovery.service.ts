import { inject, Injectable, PLATFORM_ID } from "@angular/core"
import { isPlatformBrowser } from "@angular/common"
import { NavigationError, Router } from "@angular/router"
import { filter } from "rxjs"

const RELOAD_GUARD_KEY = "chunk-error-reloaded"

@Injectable({ providedIn: "root" })
export class ChunkErrorRecoveryService {
  private platformId = inject(PLATFORM_ID)
  private router = inject(Router)

  init() {
    if (!isPlatformBrowser(this.platformId)) return

    this.router.events.pipe(filter((event): event is NavigationError => event instanceof NavigationError)).subscribe(event => {
      if (this.isChunkLoadError(event.error)) this.reloadOnce()
    })

    window.addEventListener("unhandledrejection", event => {
      if (this.isChunkLoadError(event.reason)) this.reloadOnce()
    })
  }

  markRecovered() {
    if (!isPlatformBrowser(this.platformId)) return

    sessionStorage.removeItem(RELOAD_GUARD_KEY)
  }

  private isChunkLoadError(error: unknown): boolean {
    if (!error) return false

    const message = typeof error === "string" ? error : (error as Error).message

    if (!message) return false

    return /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed/i.test(message)
  }

  private reloadOnce() {
    if (sessionStorage.getItem(RELOAD_GUARD_KEY)) return

    sessionStorage.setItem(RELOAD_GUARD_KEY, "1")
    document.location.reload()
  }
}
