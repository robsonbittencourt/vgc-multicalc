import { DOCUMENT } from "@angular/common"
import { Component, inject, OnInit } from "@angular/core"
import { Meta } from "@angular/platform-browser"
import { ActivatedRoute } from "@angular/router"
import { SimpleCalcComponent } from "@pages/simple-calc/simple-calc/simple-calc.component"
import { SimpleCalcMobileComponent } from "@pages/simple-calc/simple-calc-mobile/simple-calc-mobile.component"
import { HeaderMobileComponent } from "@core/header-mobile/header-mobile.component"
import { HeaderComponent } from "@core/header/header.component"
import { CalculatorState, CalculatorStore } from "@data/store/calculator-store"
import { ActiveFieldService } from "@data/store/active-field.service"
import { buildState } from "@data/store/utils/user-data-mapper"
import { DeviceDetectorService } from "@lib/device-detector.service"

@Component({
  selector: "app-user-data-route",
  styleUrls: ["./route-container.scss"],
  template: `
    <div class="container">
      @if (isDesktop()) {
        <app-header />
        <app-simple-calc />
      } @else {
        <app-header-mobile />
        <app-simple-calc-mobile />
      }
    </div>
  `,
  imports: [HeaderComponent, SimpleCalcComponent, HeaderMobileComponent, SimpleCalcMobileComponent]
})
export class UserDataRouteComponent implements OnInit {
  private store = inject(CalculatorStore)
  private activeFieldService = inject(ActiveFieldService)
  private activatedRoute = inject(ActivatedRoute)
  private deviceDetectorService = inject(DeviceDetectorService)
  private meta = inject(Meta)
  private document = inject(DOCUMENT)

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userData }) => {
      this.meta.addTag({ name: "robots", content: "noindex, follow" })
      const state = buildState(userData?.data) as CalculatorState
      this.store.updateStateLockingLocalStorage(state)
      this.activeFieldService.initialFieldData.set(userData?.data.field)
    })
  }

  isDesktop(): boolean {
    return this.deviceDetectorService.isDesktop()
  }
}
