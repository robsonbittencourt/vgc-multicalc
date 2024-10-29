import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _snackBar = inject(MatSnackBar)

  open(message: string) {
    this._snackBar.open(message, "", { duration: 4000, panelClass: "center", verticalPosition: "top" });
  }
}
