import { DOCUMENT } from "@angular/common"
import { Component, inject, OnInit } from "@angular/core"
import { Meta, Title } from "@angular/platform-browser"
import { MultiCalcComponent } from "@pages/multi-calc/multi-calc/multi-calc.component"
import { MultiCalcMobileComponent } from "@pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component"
import { HeaderMobileComponent } from "@core/header-mobile/header-mobile.component"
import { HeaderComponent } from "@core/header/header.component"
import { MenuStore } from "@data/store/menu-store"
import { DeviceDetectorService } from "@lib/device-detector.service"
import { JsonLdService } from "@lib/json-ld.service"

const TITLE = "Pokémon Damage Calculator — Many vs Team for VGC & Champions"
const DESCRIPTION = "Calculate how much damage multiple Pokémon deal to a single target. Evaluate defensive durability across your entire team for VGC and Pokémon Champions."
const OG_IMAGE = "https://vgcmulticalc.com/assets/icons/calc-512x512.png"
const URL = "https://vgcmulticalc.com/many-vs-team"

@Component({
  selector: "app-many-vs-team-route",
  styleUrls: ["./route-container.scss"],
  template: `
    <div class="container">
      @if (isDesktop()) {
        <app-header />
        <app-multi-calc />
      } @else {
        <app-header-mobile />
        <app-multi-calc-mobile />
      }
    </div>
  `,
  imports: [HeaderComponent, MultiCalcComponent, HeaderMobileComponent, MultiCalcMobileComponent]
})
export class ManyVsTeamRouteComponent implements OnInit {
  private menuStore = inject(MenuStore)
  private deviceDetectorService = inject(DeviceDetectorService)
  private meta = inject(Meta)
  private title = inject(Title)
  private document = inject(DOCUMENT)
  private jsonLd = inject(JsonLdService)

  ngOnInit() {
    this.menuStore.enableManyVsOne()
    this.title.setTitle(TITLE)
    this.meta.updateTag({ name: "description", content: DESCRIPTION })
    this.updateSocialTags()
    this.jsonLd.set("breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://vgcmulticalc.com/" },
        { "@type": "ListItem", position: 2, name: "Many vs Team", item: URL }
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
