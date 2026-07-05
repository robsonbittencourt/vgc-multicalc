import { Component, inject, OnInit } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { Meta, Title } from "@angular/platform-browser"
import { HeaderMobileComponent } from "@core/header-mobile/header-mobile.component"
import { HeaderComponent } from "@core/header/header.component"
import { MenuStore } from "@store/menu-store"
import { DeviceDetectorService } from "@core/services/device-detector.service"
import { JsonLdService } from "@core/services/json-ld.service"

const TITLE = "How to Use — Guide & Features"
const DESCRIPTION = "Learn how to use VGC Multi Calc: multi-target damage calculation, EV optimization, speed tiers, type coverage and damage probability for VGC and Pokémon Champions."

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
  private meta = inject(Meta)
  private title = inject(Title)
  private jsonLd = inject(JsonLdService)

  ngOnInit() {
    this.menuStore.enableHowToUse()
    this.title.setTitle(TITLE)
    this.meta.updateTag({ name: "description", content: DESCRIPTION })
    this.jsonLd.set("breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://vgcmulticalc.com/" },
        { "@type": "ListItem", position: 2, name: "How to Use", item: "https://vgcmulticalc.com/how-to-use" }
      ]
    })
    this.jsonLd.set("faq", {
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
          name: "How does the Speed Calculator work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Speed Calculator compares the effective Speed stats of multiple Pokémon after applying Nature, EVs and modifiers like Tailwind or Trick Room. It shows speed tiers so you can determine which Pokémon moves first in VGC and Pokémon Champions Doubles matches."
          }
        },
        {
          "@type": "Question",
          name: "How does the Probability Calculator work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Probability Calculator helps you understand how reliable your team is in battle. It analyzes move accuracy and calculates a Consistency Score for each Pokémon and the overall team. It also shows hit and miss probabilities, secondary effect chances, and reference tables for common game mechanics like critical hits, Protect, sleep, and status effects across multiple turns."
          }
        },
        {
          "@type": "Question",
          name: "What does the Type Calculator do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Type Calculator evaluates offensive and defensive type coverage for your entire team at once. It shows which types your team hits super-effectively, which types threaten your Pokémon, and highlights coverage gaps so you can build a more balanced team for VGC and Pokémon Champions."
          }
        }
      ]
    })
  }

  isDesktop(): boolean {
    return this.deviceDetectorService.isDesktop()
  }
}
