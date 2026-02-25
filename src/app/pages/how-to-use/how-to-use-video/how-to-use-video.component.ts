import { Component, output } from "@angular/core"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { HowToUseSubpageComponent } from "@pages/how-to-use/how-to-use-subpage/how-to-use-subpage.component"

@Component({
  selector: "app-how-to-use-video",
  standalone: true,
  imports: [MatButtonModule, MatIconModule, HowToUseSubpageComponent],
  templateUrl: "./how-to-use-video.component.html",
  styleUrl: "./how-to-use-video.component.scss"
})
export class HowToUseVideoComponent {
  back = output<void>()

  onBack() {
    this.back.emit()
  }
}
