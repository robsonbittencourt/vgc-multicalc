import { DOCUMENT } from "@angular/common"
import { Directive, inject, OnInit } from "@angular/core"
import { Meta, Title } from "@angular/platform-browser"

const OG_IMAGE = "https://vgcmulticalc.com/assets/icons/calc-512x512.png"
const BASE_URL = "https://vgcmulticalc.com"

@Directive()
export abstract class HowToUseSubpageSeo implements OnInit {
  protected abstract readonly pageTitle: string
  protected abstract readonly pageDescription: string
  protected abstract readonly pageSlug: string

  private meta = inject(Meta)
  private titleService = inject(Title)
  private document = inject(DOCUMENT)

  ngOnInit() {
    const url = `${BASE_URL}/how-to-use/${this.pageSlug}`

    this.titleService.setTitle(this.pageTitle)
    this.meta.updateTag({ name: "description", content: this.pageDescription })
    this.meta.updateTag({ property: "og:title", content: this.pageTitle })
    this.meta.updateTag({ property: "og:description", content: this.pageDescription })
    this.meta.updateTag({ property: "og:url", content: url })
    this.meta.updateTag({ property: "og:type", content: "website" })
    this.meta.updateTag({ property: "og:image", content: OG_IMAGE })
    this.meta.updateTag({ name: "twitter:card", content: "summary_large_image" })
    this.meta.updateTag({ name: "twitter:title", content: this.pageTitle })
    this.meta.updateTag({ name: "twitter:description", content: this.pageDescription })
    this.meta.updateTag({ name: "twitter:image", content: OG_IMAGE })

    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]')

    if (!canonical) {
      canonical = this.document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      this.document.head.appendChild(canonical)
    }

    canonical.setAttribute("href", url)
  }
}
