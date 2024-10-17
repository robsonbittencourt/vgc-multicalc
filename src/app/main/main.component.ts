import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'src/lib/device-detector.service';
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

  isDesktopDevice(): boolean {
    return this.deviceDetectorService.isDesktop()
  }

  updateLocalStorage() {
    if(!this.useUserData) {
      localStorage.setItem('userData', JSON.stringify(this.data.buildUserData()))
    }    
  }

}
