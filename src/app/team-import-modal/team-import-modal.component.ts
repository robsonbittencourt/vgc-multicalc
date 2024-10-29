import { Component } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-team-import-modal',
    templateUrl: './team-import-modal.component.html',
    styleUrls: ['./team-import-modal.component.scss'],
    standalone: true,
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, ReactiveFormsModule, FormsModule, MatDialogActions, MatButton, MatDialogClose]
})
export class TeamImportModalComponent {

  content: string

}
