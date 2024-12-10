import { Component, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CalculatorStore } from 'src/data/store/calculator-store'
import { FieldStore } from 'src/data/store/field-store'
import { MenuStore } from 'src/data/store/menu-store'
import { buildState } from 'src/data/store/utils/user-data-mapper'
import { DeviceDetectorService } from 'src/lib/device-detector.service'
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
  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  fieldStore = inject(FieldStore)
  private activatedRoute = inject(ActivatedRoute)
  private deviceDetectorService = inject(DeviceDetectorService)

  userDataLink: string
  useUserData: boolean = false

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userData }) => {
      this.useUserData = this.activatedRoute.routeConfig?.path == "data/:userDataId"

      if (this.useUserData) {
        const state = buildState(userData?.data)
        this.store.updateStateLockingLocalStorage(state)
        this.fieldStore.updateStateLockingLocalStorage(userData?.data.field)
      }
    })
  }

  isDesktopDevice(): boolean {
    return this.deviceDetectorService.isDesktop()
  }

}
