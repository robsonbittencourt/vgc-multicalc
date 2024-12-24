import { CdkScrollable } from "@angular/cdk/scrolling"
import { Component, inject } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog"

@Component({
  selector: "app-team-export-modal",
  templateUrl: "./team-export-modal.component.html",
  styleUrls: ["./team-export-modal.component.scss"],
  imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton, MatDialogClose]
})
export class TeamExportModalComponent {
  data = inject(MAT_DIALOG_DATA)

  copyText = "Copy"

  copy() {
    navigator.clipboard.writeText(this.data.content)
    this.copyText = "Copied"

    setTimeout(() => {
      this.copyText = "Copy"
    }, 2000)
  }
}
