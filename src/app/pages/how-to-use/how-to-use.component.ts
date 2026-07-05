import { Component, inject, OnDestroy, OnInit } from "@angular/core"
import { DOCUMENT } from "@angular/common"
import { RouterLink } from "@angular/router"
import { Meta, Title } from "@angular/platform-browser"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { FieldStore } from "@store/field-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"

const TITLE = "Pokémon Damage Calculator - How to Use - VGC Champions"
const DESCRIPTION = "Learn how to use VGC Multi Calc: multi-target damage calculation, EV optimization, speed tiers, type coverage and damage probability for VGC and Pokémon Champions."
const OG_IMAGE = "https://vgcmulticalc.com/assets/icons/calc-512x512.png"
const URL = "https://vgcmulticalc.com/how-to-use"

@Component({
  selector: "app-how-to-use",
  imports: [MatCardModule, MatIconModule, RouterLink],
  templateUrl: "./how-to-use.component.html",
  styleUrl: "./how-to-use.component.scss",
  providers: [FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "how-to-use" }]
})
export class HowToUseComponent implements OnInit, OnDestroy {
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
      mainEntity: [
        {
          "@type": "Question",
          name: "What is VGC Multi Calc?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "VGC Multi Calc is a free Pokémon damage calculator built for VGC and Pokémon Champions Doubles. Unlike traditional calculators, it lets you calculate damage against multiple Pokémon at once — so you can evaluate your entire team's offensive and defensive matchups in a single view."
          }
        },
        {
          "@type": "Question",
          name: "How does the multi-target damage calculation work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In Team vs Many mode, you pick one attacker and calculate its damage rolls against several targets simultaneously. In Many vs Team mode, you pick one defender and see how much damage multiple attackers deal to it. Both modes show damage ranges, KO chance, OHKO and 2HKO probabilities for each matchup."
          }
        },
        {
          "@type": "Question",
          name: "How do EVs and Natures affect damage in VGC?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "EVs (Effort Values) and Natures directly modify a Pokémon's stats. Offensive EVs increase damage output while defensive EVs determine whether your Pokémon survives key hits. VGC Multi Calc lets you adjust EVs and Natures in real time to see the exact damage rolls and KO chance for any matchup."
          }
        },
        {
          "@type": "Question",
          name: "What is the difference between OHKO and 2HKO?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "OHKO (One-Hit KO) means a move deals enough damage to knock out the target in a single hit. 2HKO (Two-Hit KO) means two hits are required. VGC Multi Calc shows the full damage roll distribution and the KO chance for each spread in the Damage Calculator."
          }
        },
        {
          "@type": "Question",
          name: "How does the Speed Calculator work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Speed Calculator compares the effective Speed stats of multiple Pokémon after applying Nature, EVs and modifiers like Tailwind or Trick Room. It shows speed tiers so you can determine which Pokémon moves first in VGC and Pokémon Champions Doubles matches."
          }
        },
        {
          "@type": "Question",
          name: "Does VGC Multi Calc support Pokémon Champions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. VGC Multi Calc fully supports Pokémon Champions, including its Regulations and all available Pokémon, moves, abilities and items. You can switch between game modes directly in the calculator."
          }
        }
      ]
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
