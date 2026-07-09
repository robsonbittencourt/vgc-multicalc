import { Component, inject, signal } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog"

export interface MetaRegulationModalData {
  regulations: string[]
  selected: string
}

@Component({
  selector: "app-meta-regulation-modal",
  templateUrl: "./meta-regulation-modal.component.html",
  styleUrls: ["./meta-regulation-modal.component.scss"],
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton, MatDialogClose, MatButtonToggleGroup, MatButtonToggle]
})
export class MetaRegulationModalComponent {
  data = inject<MetaRegulationModalData>(MAT_DIALOG_DATA)
  private dialogRef = inject(MatDialogRef<MetaRegulationModalComponent>)

  regulation = signal(this.data.selected)

  confirm() {
    this.dialogRef.close(this.regulation())
  }
}
