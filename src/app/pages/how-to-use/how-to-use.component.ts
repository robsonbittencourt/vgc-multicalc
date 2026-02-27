import { Component, inject, signal } from "@angular/core"
import { PlatformLocation } from "@angular/common"
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
  styleUrl: "./how-to-use.component.scss"
})
export class HowToUseComponent {
  private location = inject(PlatformLocation)

  activePage = signal<"menu" | "video" | "probability" | "evOptimization" | "typeCalc" | "speedCalc" | "teamVsMany" | "manyVsTeam" | "simpleCalc" | "import" | "export">("menu")

  constructor() {
    this.location.onPopState(() => {
      this.activePage.set("menu")
    })
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
