import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-team-export-modal',
    templateUrl: './team-export-modal.component.html',
    styleUrls: ['./team-export-modal.component.scss'],
    standalone: true,
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton, MatDialogClose]
})
export class TeamExportModalComponent {

  copyText: string = "Copy"

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, content: string }) { }

  copy() {
    navigator.clipboard.writeText(this.data.content)
    this.copyText = "Copied"

    setTimeout(() => {
      this.copyText = "Copy"
    }, 2000)
  }

}
