import { CdkScrollable } from "@angular/cdk/scrolling"
import { Component, Inject } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog"

@Component({
  selector: "app-team-import-modal",
  templateUrl: "./team-import-modal.component.html",
  styleUrls: ["./team-import-modal.component.scss"],
  imports: [MatDialogTitle, CdkScrollable, MatDialogContent, ReactiveFormsModule, FormsModule, MatDialogActions, MatButton, MatDialogClose]
})
export class TeamImportModalComponent {
  content: string
  placeholder: string

  constructor(@Inject(MAT_DIALOG_DATA) public data: { placeholder: string }) {
    this.placeholder = data.placeholder
  }
}
