import { inject, Injectable } from "@angular/core"
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker"
import { filter } from "rxjs"
import { SnackbarService } from "@lib/snackbar.service"

const ONE_HOUR = 60 * 60 * 1000

@Injectable({ providedIn: "root" })
export class AppUpdateService {
  private swUpdate = inject(SwUpdate, { optional: true })
  private snackbar = inject(SnackbarService)

  private updateReady = false

  init() {
    if (!this.swUpdate?.isEnabled) return

    this.swUpdate.versionUpdates.pipe(filter((event): event is VersionReadyEvent => event.type === "VERSION_READY")).subscribe(() => {
      if (document.visibilityState === "hidden") {
        this.updateReady = true

        return
      }

      this.snackbar.openWithAction("New version available", "Update", () => {
        this.activateAndReload()
      })
    })

    setInterval(() => this.swUpdate!.checkForUpdate(), ONE_HOUR)

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState !== "visible") return

      if (this.updateReady) {
        this.activateAndReload()

        return
      }

      this.swUpdate!.checkForUpdate()
    })
  }

  private activateAndReload() {
    this.swUpdate!.activateUpdate().then(() => document.location.reload())
  }
}
