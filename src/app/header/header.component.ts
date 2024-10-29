import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { DataStore } from '../../lib/data-store.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [NgStyle, MatIcon, MatButton]
})
export class HeaderComponent {
  data = inject(DataStore)
  private snackBar = inject(MatSnackBar)

  userDataLink: string
  
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
    this.snackBar.open("Your calc link has been created!", "", { duration: 4000 });
  }

  copyUserDataLink() {
    navigator.clipboard.writeText(this.userDataLink)
  }

}
