import { Component, inject, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { HeaderMobileComponent } from "@app/core/header-mobile/header-mobile.component"
import { HeaderComponent } from "@app/core/header/header.component"
import { MultiCalcComponent } from "@app/features/multi-calc/multi-calc/multi-calc.component"
import { SimpleCalcMobileComponent } from "@app/features/simple-calc/simple-calc-mobile/simple-calc-mobile.component"
import { SimpleCalcComponent } from "@app/features/simple-calc/simple-calc/simple-calc.component"
import { SpeedCalculatorMobileComponent } from "@app/features/speed-calc/speed-calculator-mobile/speed-calculator-mobile.component"
import { SpeedCalculatorComponent } from "@app/features/speed-calc/speed-calculator/speed-calculator.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { MenuStore } from "@data/store/menu-store"
import { buildState } from "@data/store/utils/user-data-mapper"
import { DeviceDetectorService } from "@lib/device-detector.service"

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  imports: [HeaderComponent, SimpleCalcComponent, MultiCalcComponent, SpeedCalculatorComponent, HeaderMobileComponent, SimpleCalcMobileComponent, SpeedCalculatorMobileComponent]
})
export class MainComponent implements OnInit {
  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  fieldStore = inject(FieldStore)
  private activatedRoute = inject(ActivatedRoute)
  private deviceDetectorService = inject(DeviceDetectorService)

  userDataLink: string
  useUserData = false

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
