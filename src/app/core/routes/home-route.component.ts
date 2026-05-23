import { DOCUMENT } from "@angular/common"
import { Component, inject, OnInit } from "@angular/core"
import { Meta, Title } from "@angular/platform-browser"
import { SimpleCalcComponent } from "@pages/simple-calc/simple-calc/simple-calc.component"
import { SimpleCalcMobileComponent } from "@pages/simple-calc/simple-calc-mobile/simple-calc-mobile.component"
import { HeaderMobileComponent } from "@core/header-mobile/header-mobile.component"
import { HeaderComponent } from "@core/header/header.component"
import { MenuStore } from "@data/store/menu-store"
import { DeviceDetectorService } from "@lib/device-detector.service"

const TITLE = "Pokémon Damage Calculator — Multi Calc for VGC & Champions"
const DESCRIPTION = "Free Pokémon damage calculator with multi-target support — no ads, no signup. Calculate KO chance, damage rolls and 2HKO probability for VGC and Pokémon Champions teams instantly."
const OG_IMAGE = "https://vgcmulticalc.com/assets/icons/calc-512x512.png"
const URL = "https://vgcmulticalc.com/"

@Component({
  selector: "app-home-route",
  styleUrls: ["./route-container.scss"],
  template: `
    <div class="container">
      @if (isDesktop()) {
        <app-header />
        <app-simple-calc />
      } @else {
        <app-header-mobile />
        <app-simple-calc-mobile />
      }
    </div>
  `,
  imports: [HeaderComponent, SimpleCalcComponent, HeaderMobileComponent, SimpleCalcMobileComponent]
})
export class HomeRouteComponent implements OnInit {
  private menuStore = inject(MenuStore)
  private deviceDetectorService = inject(DeviceDetectorService)
  private meta = inject(Meta)
  private title = inject(Title)
  private document = inject(DOCUMENT)

  ngOnInit() {
    this.menuStore.enableOneVsOne()
    this.title.setTitle(TITLE)
    this.meta.updateTag({ name: "description", content: DESCRIPTION })
    this.updateSocialTags()
  }

  isDesktop(): boolean {
    return this.deviceDetectorService.isDesktop()
  }

  private updateSocialTags() {
    this.meta.updateTag({ property: "og:title", content: TITLE })
    this.meta.updateTag({ property: "og:description", content: DESCRIPTION })
    this.meta.updateTag({ property: "og:url", content: URL })
    this.meta.updateTag({ property: "og:type", content: "website" })
    this.meta.updateTag({ property: "og:image", content: OG_IMAGE })
    this.meta.updateTag({ name: "twitter:card", content: "summary_large_image" })
    this.meta.updateTag({ name: "twitter:title", content: TITLE })
    this.meta.updateTag({ name: "twitter:description", content: DESCRIPTION })
    this.meta.updateTag({ name: "twitter:image", content: OG_IMAGE })

    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]')

    if (!canonical) {
      canonical = this.document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      this.document.head.appendChild(canonical)
    }

    canonical.setAttribute("href", URL)
  }
}
