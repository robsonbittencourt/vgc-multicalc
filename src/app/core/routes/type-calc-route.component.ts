import { DOCUMENT } from "@angular/common"
import { Component, inject, OnInit } from "@angular/core"
import { Meta, Title } from "@angular/platform-browser"
import { TypeCalculatorComponent } from "@pages/type-calc/type-calculator/type-calculator.component"
import { TypeCalcMobileComponent } from "@pages/type-calc/type-calc-mobile/type-calc-mobile.component"
import { HeaderMobileComponent } from "@core/header-mobile/header-mobile.component"
import { HeaderComponent } from "@core/header/header.component"
import { MenuStore } from "@store/menu-store"
import { DeviceDetectorService } from "@core/services/device-detector.service"
import { JsonLdService } from "@core/services/json-ld.service"

const TITLE = "Pokémon Type Calculator for VGC"
const DESCRIPTION = "Pokémon type calculator for VGC and Pokémon Champions. Analyze offensive and defensive type coverage against your team."
const OG_IMAGE = "https://vgcmulticalc.com/assets/icons/calc-512x512.png"
const URL = "https://vgcmulticalc.com/type-calc"

@Component({
  selector: "app-type-calc-route",
  styleUrls: ["./route-container.scss"],
  template: `
    <div class="container">
      @if (isDesktop()) {
        <app-header />
        <app-type-calculator />
      } @else {
        <app-header-mobile />
        <app-type-calc-mobile />
      }
    </div>
  `,
  imports: [HeaderComponent, TypeCalculatorComponent, HeaderMobileComponent, TypeCalcMobileComponent]
})
export class TypeCalcRouteComponent implements OnInit {
  private menuStore = inject(MenuStore)
  private deviceDetectorService = inject(DeviceDetectorService)
  private meta = inject(Meta)
  private title = inject(Title)
  private document = inject(DOCUMENT)
  private jsonLd = inject(JsonLdService)

  ngOnInit() {
    this.menuStore.enableTypeCalculator()
    this.title.setTitle(TITLE)
    this.meta.updateTag({ name: "description", content: DESCRIPTION })
    this.updateSocialTags()
    this.jsonLd.set("breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://vgcmulticalc.com/" },
        { "@type": "ListItem", position: 2, name: "Type Calculator", item: URL }
      ]
    })
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
