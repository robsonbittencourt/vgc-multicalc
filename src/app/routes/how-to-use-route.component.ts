import { Component, inject, OnInit } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { HeaderMobileComponent } from "@layout/header-mobile/header-mobile.component"
import { HeaderComponent } from "@layout/header/header.component"
import { MenuStore } from "@store/menu-store"
import { DeviceDetectorService } from "@app/services/device-detector.service"
import { JsonLdService } from "@app/services/json-ld.service"

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
  private jsonLd = inject(JsonLdService)

  ngOnInit() {
    this.menuStore.enableHowToUse()
    this.jsonLd.set("breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://vgcmulticalc.com/" },
        { "@type": "ListItem", position: 2, name: "How to Use", item: "https://vgcmulticalc.com/how-to-use/" }
      ]
    })
  }

  isDesktop(): boolean {
    return this.deviceDetectorService.isDesktop()
  }
}
