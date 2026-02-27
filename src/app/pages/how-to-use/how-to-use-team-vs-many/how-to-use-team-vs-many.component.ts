import { Component, output } from "@angular/core"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"

@Component({
  selector: "app-how-to-use-team-vs-many",
  imports: [MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-team-vs-many.component.html",
  styleUrl: "./how-to-use-team-vs-many.component.scss"
})
export class HowToUseTeamVsManyComponent {
  back = output<void>()

  onBack() {
    this.back.emit()
  }
}
