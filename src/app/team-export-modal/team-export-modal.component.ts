import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-team-export-modal',
  templateUrl: './team-export-modal.component.html',
  styleUrls: ['./team-export-modal.component.scss']
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
