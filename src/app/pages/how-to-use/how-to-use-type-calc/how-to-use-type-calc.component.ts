import { Component, output } from "@angular/core"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"

@Component({
  selector: "app-how-to-use-type-calc",
  imports: [MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-type-calc.component.html",
  styleUrl: "./how-to-use-type-calc.component.scss"
})
export class HowToUseTypeCalcComponent {
  back = output<void>()

  onBack() {
    this.back.emit()
  }
}
