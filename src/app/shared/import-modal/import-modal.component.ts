import { CdkScrollable } from "@angular/cdk/scrolling"
import { Component, inject } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog"

@Component({
  selector: "app-import-modal",
  templateUrl: "./import-modal.component.html",
  styleUrls: ["./import-modal.component.scss"],
  imports: [MatDialogTitle, CdkScrollable, MatDialogContent, ReactiveFormsModule, FormsModule, MatDialogActions, MatButton, MatDialogClose]
})
export class ImportModalComponent {
  data = inject(MAT_DIALOG_DATA)

  content: string
  placeholder: string

  constructor() {
    this.placeholder = this.data.placeholder
  }
}
