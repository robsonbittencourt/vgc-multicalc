import { Component, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { DeviceDetectorService } from 'src/lib/device-detector.service'
import { DataStore } from '../../lib/data-store.service'

import { FieldStore } from 'src/data/field-store'
import { HeaderMobileComponent } from '../header-mobile/header-mobile.component'
import { HeaderComponent } from '../header/header.component'
import { MultiCalcComponent } from '../multi-calc/multi-calc.component'
import { SimpleCalcMobileComponent } from '../simple-calc-mobile/simple-calc-mobile.component'
import { SimpleCalcComponent } from '../simple-calc/simple-calc.component'
import { SpeedCalculatorMobileComponent } from '../speed-calculator-mobile/speed-calculator-mobile.component'
import { SpeedCalculatorComponent } from '../speed-calculator/speed-calculator.component'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [HeaderComponent, SimpleCalcComponent, MultiCalcComponent, SpeedCalculatorComponent, HeaderMobileComponent, SimpleCalcMobileComponent, SpeedCalculatorMobileComponent]
})
export class MainComponent {
  data = inject(DataStore)
  fieldStore = inject(FieldStore)
  private activatedRoute = inject(ActivatedRoute)
  private deviceDetectorService = inject(DeviceDetectorService)

  userDataLink: string
  useUserData: boolean = false

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userData }) => {
      this.useUserData = this.activatedRoute.routeConfig?.path == "data/:userDataId"

      if (this.useUserData) {
        this.data.buildInitialData(userData?.data)
        this.fieldStore.setField(userData?.data.field)
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
