import { Component, output } from "@angular/core"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"

@Component({
  selector: "app-how-to-use-import",
  imports: [MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-import.component.html",
  styleUrl: "./how-to-use-import.component.scss"
})
export class HowToUseImportComponent {
  back = output<void>()

  onBack() {
    this.back.emit()
  }
}
