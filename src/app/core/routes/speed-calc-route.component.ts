import { DOCUMENT } from "@angular/common"
import { Component, inject, OnInit } from "@angular/core"
import { Meta, Title } from "@angular/platform-browser"
import { SpeedCalculatorComponent } from "@pages/speed-calc/speed-calculator/speed-calculator.component"
import { SpeedCalculatorMobileComponent } from "@pages/speed-calc/speed-calculator-mobile/speed-calculator-mobile.component"
import { HeaderMobileComponent } from "@core/header-mobile/header-mobile.component"
import { HeaderComponent } from "@core/header/header.component"
import { MenuStore } from "@data/store/menu-store"
import { DeviceDetectorService } from "@lib/device-detector.service"

const TITLE = "Pokémon Damage Calculator - Speed Calc - VGC Champions"
const DESCRIPTION = "Free Pokémon speed calculator for VGC and Pokémon Champions. Compare speed tiers, Tailwind, Trick Room and nature modifiers to master initiative order."
const OG_IMAGE = "https://vgcmulticalc.com/assets/icons/calc-512x512.png"
const URL = "https://vgcmulticalc.com/speed-calc"

@Component({
  selector: "app-speed-calc-route",
  styleUrls: ["./route-container.scss"],
  template: `
    <div class="container">
      @if (isDesktop()) {
        <app-header />
        <app-speed-calculator />
      } @else {
        <app-header-mobile />
        <app-speed-calculator-mobile />
      }
    </div>
  `,
  imports: [HeaderComponent, SpeedCalculatorComponent, HeaderMobileComponent, SpeedCalculatorMobileComponent]
})
export class SpeedCalcRouteComponent implements OnInit {
  private menuStore = inject(MenuStore)
  private deviceDetectorService = inject(DeviceDetectorService)
  private meta = inject(Meta)
  private title = inject(Title)
  private document = inject(DOCUMENT)

  ngOnInit() {
    this.menuStore.enableSpeedCalculator()
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
