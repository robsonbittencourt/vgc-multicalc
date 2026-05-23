import { Component, inject, OnInit } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { HeaderMobileComponent } from "@core/header-mobile/header-mobile.component"
import { HeaderComponent } from "@core/header/header.component"
import { MenuStore } from "@data/store/menu-store"
import { DeviceDetectorService } from "@lib/device-detector.service"

@Component({
  selector: "app-how-to-use-route",
  styleUrls: ["./route-container.scss"],
  template: `
    <div class="container">
      @if (isDesktop()) {
        <app-header />
      } @else {
        <app-header-mobile />
      }
      <router-outlet />
    </div>
  `,
  imports: [HeaderComponent, HeaderMobileComponent, RouterOutlet]
})
export class HowToUseRouteComponent implements OnInit {
  private menuStore = inject(MenuStore)
  private deviceDetectorService = inject(DeviceDetectorService)

  ngOnInit() {
    this.menuStore.enableHowToUse()
  }

  isDesktop(): boolean {
    return this.deviceDetectorService.isDesktop()
  }
}
