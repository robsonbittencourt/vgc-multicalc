import { Component } from "@angular/core"
import { HowToUseFigureComponent } from "@pages/how-to-use/how-to-use-figure/how-to-use-figure.component"
import { EXPORT_IMAGES } from "@pages/how-to-use/how-to-use-export/how-to-use-export-images"

@Component({
  selector: "app-how-to-use-export-ja",
  imports: [HowToUseFigureComponent],
  templateUrl: "./how-to-use-export-ja.component.html"
})
export class HowToUseExportJaComponent {
  protected readonly images = EXPORT_IMAGES
}
