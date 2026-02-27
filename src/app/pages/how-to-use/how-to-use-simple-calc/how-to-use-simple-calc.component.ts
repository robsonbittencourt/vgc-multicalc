import { Component, output } from "@angular/core"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"

@Component({
  selector: "app-how-to-use-simple-calc",
  imports: [MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-simple-calc.component.html",
  styleUrl: "./how-to-use-simple-calc.component.scss"
})
export class HowToUseSimpleCalcComponent {
  back = output<void>()

  onBack() {
    this.back.emit()
  }
}
