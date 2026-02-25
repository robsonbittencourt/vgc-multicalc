import { Component, inject, signal } from "@angular/core"
import { PlatformLocation } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseProbabilityComponent } from "./how-to-use-probability/how-to-use-probability.component"
import { HowToUseVideoComponent } from "./how-to-use-video/how-to-use-video.component"
import { HowToUseEvOptimizationComponent } from "./how-to-use-ev-optimization/how-to-use-ev-optimization.component"

@Component({
  selector: "app-how-to-use",
  imports: [MatCardModule, MatIconModule, HowToUseVideoComponent, HowToUseProbabilityComponent, HowToUseEvOptimizationComponent],
  templateUrl: "./how-to-use.component.html",
  styleUrl: "./how-to-use.component.scss"
})
export class HowToUseComponent {
  private location = inject(PlatformLocation)

  activePage = signal<"menu" | "video" | "probability" | "evOptimization">("menu")

  constructor() {
    this.location.onPopState(() => {
      this.activePage.set("menu")
    })
  }

  setActivePage(page: "menu" | "video" | "probability" | "evOptimization") {
    if (page !== "menu") {
      this.location.pushState(null, "", "")
    } else if (this.activePage() !== "menu") {
      window.history.back()
      return
    }

    this.activePage.set(page)
  }
}
