import { Component, inject, OnInit } from "@angular/core"
import { Meta } from "@angular/platform-browser"
import { HeaderMobileComponent } from "@layout/header-mobile/header-mobile.component"
import { HeaderComponent } from "@layout/header/header.component"
import { PastePageComponent } from "@pages/paste/paste-page.component"
import { MenuStore } from "@store/menu-store"
import { DeviceDetectorService } from "@app/services/device-detector.service"

@Component({
  selector: "app-paste-route",
  styleUrls: ["./route-container.scss"],
  template: `
    <div class="container">
      @if (isDesktop()) {
        <app-header [showModeSelector]="false" />
      } @else {
        <app-header-mobile [showModeSelector]="false" />
      }
      <app-paste-page />
    </div>
  `,
  imports: [HeaderComponent, HeaderMobileComponent, PastePageComponent]
})
export class PasteRouteComponent implements OnInit {
  private menuStore = inject(MenuStore)
  private deviceDetectorService = inject(DeviceDetectorService)
  private meta = inject(Meta)

  ngOnInit() {
    this.menuStore.clearNavigation()
    this.meta.updateTag({ name: "robots", content: "noindex, follow" })
  }

  isDesktop(): boolean {
    return this.deviceDetectorService.isDesktop()
  }
}
