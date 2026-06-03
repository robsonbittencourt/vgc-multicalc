import { afterNextRender, Component, inject, OnInit, signal } from "@angular/core"
import { NavigationEnd, Router, RouterOutlet } from "@angular/router"
import { AnnouncementPopupComponent } from "@basic/announcement-popup/announcement-popup.component"
import { AppUpdateService } from "@lib/app-update.service"
import { ChunkErrorRecoveryService } from "@lib/chunk-error-recovery.service"
import { ThemeService } from "@lib/theme.service"
import { filter, take } from "rxjs"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [RouterOutlet, AnnouncementPopupComponent]
})
export class AppComponent implements OnInit {
  private appUpdateService = inject(AppUpdateService)
  private chunkErrorRecoveryService = inject(ChunkErrorRecoveryService)
  private themeService = inject(ThemeService)
  private router = inject(Router)

  appReady = signal(false)

  constructor() {
    afterNextRender(() => {
      document.getElementById("app-splash")?.remove()
    })

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
        this.chunkErrorRecoveryService.markRecovered()

        if (this.themeService.applied()) this.appReady.set(true)
      })
  }

  ngOnInit() {
    this.appUpdateService.init()
    this.chunkErrorRecoveryService.init()
  }
}
