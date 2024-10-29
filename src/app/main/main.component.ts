import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'src/lib/device-detector.service';
import { DataStore } from '../../lib/data-store.service';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SimpleCalcComponent } from '../simple-calc/simple-calc.component';
import { MultiCalcComponent } from '../multi-calc/multi-calc.component';
import { SpeedCalculatorComponent } from '../speed-calculator/speed-calculator.component';
import { HeaderMobileComponent } from '../header-mobile/header-mobile.component';
import { SimpleCalcMobileComponent } from '../simple-calc-mobile/simple-calc-mobile.component';
import { SpeedCalculatorMobileComponent } from '../speed-calculator-mobile/speed-calculator-mobile.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    standalone: true,
    imports: [NgIf, HeaderComponent, SimpleCalcComponent, MultiCalcComponent, SpeedCalculatorComponent, HeaderMobileComponent, SimpleCalcMobileComponent, SpeedCalculatorMobileComponent]
})
export class MainComponent {

  userDataLink: string
  useUserData: boolean = false

  constructor(
    public data: DataStore, private activatedRoute: ActivatedRoute, private deviceDetectorService: DeviceDetectorService
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
