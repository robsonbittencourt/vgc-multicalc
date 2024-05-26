import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-team-export-modal',
  templateUrl: './team-export-modal.component.html',
  styleUrls: ['./team-export-modal.component.scss']
})
export class TeamExportModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, content: string }) { }

  copy() {
    navigator.clipboard.writeText(this.data.content)
  }

}
