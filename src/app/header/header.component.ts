import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { DataStore } from '../../lib/data-store.service';
import { NgStyle, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [NgStyle, NgIf, MatIcon, MatButton]
})
export class HeaderComponent {

  userDataLink: string

  constructor(public data: DataStore, private _snackBar: MatSnackBar) {}

  enableOneVsOne() {
    this.data.oneVsOneActivated = true
    this.data.oneVsManyActivated = false
    this.data.manyVsOneActivated = false
    this.data.speedCalculatorActivated = false
  }

  enableOneVsMany() {
    this.data.oneVsManyActivated = true
    this.data.oneVsOneActivated = false
    this.data.manyVsOneActivated = false
    this.data.speedCalculatorActivated = false
  }

  enableManyVsOne() {
    this.data.manyVsOneActivated = true
    this.data.oneVsOneActivated = false
    this.data.oneVsManyActivated = false
    this.data.speedCalculatorActivated = false
  }

  enableSpeedCalculator() {
    this.data.speedCalculatorActivated = true
    this.data.oneVsOneActivated = false
    this.data.oneVsManyActivated = false
    this.data.manyVsOneActivated = false    
  }

  uploadData() {
    const id = uuidv4()
    const userData = this.data.buildUserData()
    axios.put(`https://l7enx1vgm7.execute-api.us-east-1.amazonaws.com/v1/vgc-multi-calc/${id}`, userData)
    this.userDataLink = `https://vgcmulticalc.com/data/${id}`
    this._snackBar.open("Your calc link has been created!", "", { duration: 4000 });
  }

  copyUserDataLink() {
    navigator.clipboard.writeText(this.userDataLink)
  }

}
