import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { EXPORT_IMAGES } from "@pages/how-to-use/how-to-use-export/how-to-use-export-images"

@Component({
  selector: "app-how-to-use-export-en",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-export-en.component.html"
})
export class HowToUseExportEnComponent {
  protected readonly images = EXPORT_IMAGES
}
