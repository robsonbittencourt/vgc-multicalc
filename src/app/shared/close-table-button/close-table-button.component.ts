import { Component } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
import { TranslatePipe } from "@shared/localize/translate.pipe"

@Component({
  selector: "app-close-table-button",
  imports: [MatIcon, TranslatePipe],
  templateUrl: "./close-table-button.component.html",
  styleUrl: "./close-table-button.component.scss",
  host: { class: "close-table-button" }
})
export class CloseTableButtonComponent {}
