import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { DataStore } from '../../lib/data-store.service';

@Component({
    selector: 'app-header-mobile',
    templateUrl: './header-mobile.component.html',
    styleUrls: ['./header-mobile.component.scss'],
    standalone: true,
    imports: [MatIconButton, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem]
})
export class HeaderMobileComponent {
  data = inject(DataStore)

  enableOneVsMany() {
    this.data.oneVsManyActivated = true
    this.data.manyVsOneActivated = false
    this.data.speedCalculatorActivated = false
  }

  enableSpeedCalculator() {
    this.data.oneVsManyActivated = false
    this.data.manyVsOneActivated = false
    this.data.speedCalculatorActivated = true
  }

}
