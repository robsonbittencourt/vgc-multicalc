import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { DeviceDetectorService } from 'src/lib/device-detector.service';
import { v4 as uuidv4 } from 'uuid';
import { DataStore } from '../data-store.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  userDataLink: string
  useUserData: boolean = false

  constructor(
    public data: DataStore, private activatedRoute: ActivatedRoute, private _snackBar: MatSnackBar, private deviceDetectorService: DeviceDetectorService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userData }) => {
      this.useUserData = this.activatedRoute.routeConfig?.path == "data/:userDataId"

      if (this.useUserData) {
        this.data.buildInitialData(userData?.data)      
      } else {
        const userData = JSON.parse(localStorage.getItem('userData')!)
        this.data.buildInitialData(userData)
      }      
    })
  }

  enableOneVsMany() {
    this.data.oneVsManyActivated = true
    this.data.manyVsOneActivated = false
    this.data.speedCalculatorActivated = false
    this.updateLocalStorage()
  }

  enableManyVsOne() {
    this.data.manyVsOneActivated = true
    this.data.oneVsManyActivated = false
    this.data.speedCalculatorActivated = false
    this.updateLocalStorage()
  }

  enableSpeedCalculator() {
    this.data.oneVsManyActivated = false
    this.data.manyVsOneActivated = false
    this.data.speedCalculatorActivated = true
    this.updateLocalStorage()
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

  isDesktopDevice(): boolean {
    return this.deviceDetectorService.isDesktop()
  }

  updateLocalStorage() {
    if(!this.useUserData) {
      localStorage.setItem('userData', JSON.stringify(this.data.buildUserData()))
    }    
  }

}
