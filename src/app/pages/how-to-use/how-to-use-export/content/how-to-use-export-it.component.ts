import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { EXPORT_IMAGES } from "@pages/how-to-use/how-to-use-export/how-to-use-export-images"

@Component({
  selector: "app-how-to-use-export-it",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-export-it.component.html"
})
export class HowToUseExportItComponent {
  protected readonly images = EXPORT_IMAGES
}
