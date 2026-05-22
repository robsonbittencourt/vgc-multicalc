import { Component, inject, OnInit, signal } from "@angular/core"
import { PlatformLocation } from "@angular/common"
import { Meta, Title } from "@angular/platform-browser"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseProbabilityComponent } from "./how-to-use-probability/how-to-use-probability.component"
import { HowToUseVideoComponent } from "./how-to-use-video/how-to-use-video.component"
import { HowToUseEvOptimizationComponent } from "./how-to-use-ev-optimization/how-to-use-ev-optimization.component"
import { HowToUseTypeCalcComponent } from "./how-to-use-type-calc/how-to-use-type-calc.component"
import { HowToUseSpeedCalcComponent } from "./how-to-use-speed-calc/how-to-use-speed-calc.component"
import { HowToUseTeamVsManyComponent } from "./how-to-use-team-vs-many/how-to-use-team-vs-many.component"
import { HowToUseManyVsTeamComponent } from "./how-to-use-many-vs-team/how-to-use-many-vs-team.component"
import { HowToUseSimpleCalcComponent } from "./how-to-use-simple-calc/how-to-use-simple-calc.component"
import { HowToUseImportComponent } from "./how-to-use-import/how-to-use-import.component"
import { HowToUseExportComponent } from "./how-to-use-export/how-to-use-export.component"
import { FieldStore } from "@data/store/field-store"
import { FIELD_CONTEXT } from "@data/store/tokens/field-context.token"
import { AutomaticFieldService } from "@lib/automatic-field-service"

@Component({
  selector: "app-how-to-use",
  imports: [
    MatCardModule,
    MatIconModule,
    HowToUseVideoComponent,
    HowToUseProbabilityComponent,
    HowToUseEvOptimizationComponent,
    HowToUseTypeCalcComponent,
    HowToUseSpeedCalcComponent,
    HowToUseTeamVsManyComponent,
    HowToUseManyVsTeamComponent,
    HowToUseSimpleCalcComponent,
    HowToUseImportComponent,
    HowToUseExportComponent
  ],
  templateUrl: "./how-to-use.component.html",
  styleUrl: "./how-to-use.component.scss",
  providers: [FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "how-to-use" }]
})
export class HowToUseComponent implements OnInit {
  private location = inject(PlatformLocation)
  private meta = inject(Meta)
  private title = inject(Title)

  activePage = signal<"menu" | "video" | "probability" | "evOptimization" | "typeCalc" | "speedCalc" | "teamVsMany" | "manyVsTeam" | "simpleCalc" | "import" | "export">("menu")

  constructor() {
    this.location.onPopState(() => {
      this.activePage.set("menu")
    })
  }

  ngOnInit() {
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
            text: "OHKO (One-Hit KO) means a move deals enough damage to knock out the target in a single hit. 2HKO (Two-Hit KO) means two hits are required. VGC Multi Calc shows the full damage roll distribution and the probability of achieving an OHKO or 2HKO for each spread."
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

    if (typeof document === "undefined") return

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.text = JSON.stringify(faqSchema)
    document.head.appendChild(script)
  }

  setActivePage(page: "menu" | "video" | "probability" | "evOptimization" | "typeCalc" | "speedCalc" | "teamVsMany" | "manyVsTeam" | "simpleCalc" | "import" | "export") {
    if (page !== "menu") {
      this.location.pushState(null, "", "")
    } else if (this.activePage() !== "menu") {
      window.history.back()
      return
    }

    this.activePage.set(page)
  }
}
