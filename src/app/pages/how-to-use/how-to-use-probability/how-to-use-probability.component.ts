import { Component, output } from "@angular/core"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"

@Component({
  selector: "app-how-to-use-probability",
  standalone: true,
  imports: [MatButtonModule, MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-probability.component.html",
  styleUrl: "./how-to-use-probability.component.scss"
})
export class HowToUseProbabilityComponent {
  back = output<void>()

  onBack() {
    this.back.emit()
  }
}
