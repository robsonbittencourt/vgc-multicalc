import { Component, output } from "@angular/core"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"

@Component({
  selector: "app-how-to-use-many-vs-team",
  imports: [MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-many-vs-team.component.html",
  styleUrl: "./how-to-use-many-vs-team.component.scss"
})
export class HowToUseManyVsTeamComponent {
  back = output<void>()

  onBack() {
    this.back.emit()
  }
}
