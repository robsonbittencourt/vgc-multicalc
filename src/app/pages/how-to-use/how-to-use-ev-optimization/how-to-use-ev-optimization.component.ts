import { Component, output } from "@angular/core"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"

@Component({
  selector: "app-how-to-use-ev-optimization",
  imports: [MatButtonModule, MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-ev-optimization.component.html",
  styleUrl: "./how-to-use-ev-optimization.component.scss"
})
export class HowToUseEvOptimizationComponent {
  back = output<void>()

  onBack() {
    this.back.emit()
  }
}
