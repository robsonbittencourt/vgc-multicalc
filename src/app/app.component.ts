import { afterNextRender, Component, inject, OnInit } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { AppUpdateService } from "@lib/app-update.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  private appUpdateService = inject(AppUpdateService)

  constructor() {
    afterNextRender(() => {
      document.getElementById("app-splash")?.remove()
    })
  }

  ngOnInit() {
    this.appUpdateService.init()
  }
}
