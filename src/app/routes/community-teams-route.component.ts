import { DOCUMENT } from "@angular/common"
import { Component, inject, OnInit } from "@angular/core"
import { Meta, Title } from "@angular/platform-browser"
import { CommunityTeamsComponent } from "@pages/community-teams/community-teams.component"
import { HeaderMobileComponent } from "@layout/header-mobile/header-mobile.component"
import { HeaderComponent } from "@layout/header/header.component"
import { MenuStore } from "@store/menu-store"
import { DeviceDetectorService } from "@app/services/device-detector.service"
import { JsonLdService } from "@app/services/json-ld.service"

const TITLE = "Pokémon Champions VGC Teams & Replica Codes"
const DESCRIPTION = "Pokémon Champions teams from Regionals, Worlds and Global Challenges, with full sets, Stat Points and replica codes. Open any team in the calc."
const OG_IMAGE = "https://vgcmulticalc.com/assets/icons/calc-512x512.png"
const URL = "https://vgcmulticalc.com/teams/"

@Component({
  selector: "app-community-teams-route",
  styleUrls: ["./route-container.scss"],
  template: `
    <div class="container">
      @if (isDesktop()) {
        <app-header />
      } @else {
        <app-header-mobile [showModeSelector]="false" />
      }
      <app-community-teams />
    </div>
  `,
  imports: [HeaderComponent, HeaderMobileComponent, CommunityTeamsComponent]
})
export class CommunityTeamsRouteComponent implements OnInit {
  private menuStore = inject(MenuStore)
  private deviceDetectorService = inject(DeviceDetectorService)
  private meta = inject(Meta)
  private title = inject(Title)
  private document = inject(DOCUMENT)
  private jsonLd = inject(JsonLdService)

  ngOnInit() {
    this.menuStore.enableCommunityTeams()
    this.title.setTitle(TITLE)
    this.meta.updateTag({ name: "description", content: DESCRIPTION })
    this.updateSocialTags()
    this.jsonLd.set("breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://vgcmulticalc.com/" },
        { "@type": "ListItem", position: 2, name: "Teams", item: URL }
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
