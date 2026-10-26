import { Component, inject, OnDestroy, OnInit } from "@angular/core"
import { DOCUMENT } from "@angular/common"
import { RouterLink } from "@angular/router"
import { Meta, Title } from "@angular/platform-browser"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { FieldStore } from "@store/field-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"

const TITLE = "How to Use VGC Multi Calc: Guide & Features"
const DESCRIPTION = "Learn how to use VGC Multi Calc: multi-target damage calcs, the SP Optimizer, speed tiers, type coverage, probabilities and tournament teams for Pokémon Champions and VGC."

const FAQ = [
  {
    question: "What is VGC Multi Calc?",
    answer:
      "VGC Multi Calc is a free damage calculator for Pokémon Champions and VGC. Besides the classic One vs One calc, it calcs one Pokémon against a whole list of opponents at once, so you can check your team against the format in a single view."
  },
  {
    question: "How do Stat Points (SPs) and Natures affect damage?",
    answer:
      "In Pokémon Champions, each Pokémon has 66 Stat Points (SPs) to spread, up to 32 in one stat. SPs and the Nature set the final stats: offensive SPs raise the damage you deal and defensive SPs decide which hits you survive. VGC Multi Calc updates the damage rolls and the KO chance as you change them, and the SP Optimizer finds the fewest SPs for a goal."
  },
  {
    question: "What is the difference between OHKO and 2HKO?",
    answer: "OHKO (One-Hit KO) means the move knocks out the target in one hit. 2HKO (Two-Hit KO) means it takes two hits. VGC Multi Calc shows all 16 damage rolls of a move and the chance of each KO."
  },
  {
    question: "Does VGC Multi Calc support Pokémon Champions?",
    answer: "Yes. Pokémon Champions is the default mode, with its Regulations, Mega Evolutions, Stat Points and all available Pokémon, moves, abilities and items. Use the Champions / National Dex switch in the header to change modes."
  }
]
const OG_IMAGE = "https://vgcmulticalc.com/assets/icons/calc-512x512.png"
const URL = "https://vgcmulticalc.com/how-to-use/"

@Component({
  selector: "app-how-to-use",
  imports: [MatCardModule, MatIconModule, RouterLink],
  templateUrl: "./how-to-use.component.html",
  styleUrl: "./how-to-use.component.scss",
  providers: [FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "how-to-use" }]
})
export class HowToUseComponent implements OnInit, OnDestroy {
  readonly faq = FAQ

  private document = inject(DOCUMENT)
  private meta = inject(Meta)
  private title = inject(Title)

  ngOnInit() {
    this.title.setTitle(TITLE)
    this.meta.updateTag({ name: "description", content: DESCRIPTION })
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

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } }))
    }

    const existing = this.document.getElementById("faq-schema")

    if (existing) return

    const script = this.document.createElement("script")
    script.id = "faq-schema"
    script.type = "application/ld+json"
    script.text = JSON.stringify(faqSchema)
    this.document.head.appendChild(script)
  }

  ngOnDestroy() {
    this.document.getElementById("faq-schema")?.remove()
  }
}
