import { inject, Injectable } from "@angular/core"
import { NavigationEnd, Router } from "@angular/router"
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker"
import { filter, take } from "rxjs"

@Injectable({ providedIn: "root" })
export class AppUpdateService {
  private swUpdate = inject(SwUpdate, { optional: true })
  private router = inject(Router)

  init() {
    if (!this.swUpdate?.isEnabled) return

    this.swUpdate.versionUpdates.pipe(filter((event): event is VersionReadyEvent => event.type === "VERSION_READY")).subscribe(() => {
      this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd),
          take(1)
        )
        .subscribe(() => {
          this.swUpdate!.activateUpdate().then(() => document.location.reload())
        })
    })
  }
}
