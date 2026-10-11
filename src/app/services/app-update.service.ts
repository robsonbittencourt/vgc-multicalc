import { inject, Injectable } from "@angular/core"
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker"
import { filter } from "rxjs"
import { SnackbarService } from "@app/services/snackbar.service"

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

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState !== "visible" || !this.updateReady) return

      this.activateAndReload()
    })
  }

  private activateAndReload() {
    this.swUpdate!.activateUpdate().then(() => document.location.reload())
  }
}
