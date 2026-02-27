import { Component, output } from "@angular/core"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"

@Component({
  selector: "app-how-to-use-export",
  imports: [MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-export.component.html",
  styleUrl: "./how-to-use-export.component.scss"
})
export class HowToUseExportComponent {
  back = output<void>()

  onBack() {
    this.back.emit()
  }
}
