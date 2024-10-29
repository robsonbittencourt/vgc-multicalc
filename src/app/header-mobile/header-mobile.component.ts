import { Component } from '@angular/core';
import { DataStore } from '../../lib/data-store.service';
import { MatIconButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-header-mobile',
    templateUrl: './header-mobile.component.html',
    styleUrls: ['./header-mobile.component.scss'],
    standalone: true,
    imports: [MatIconButton, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem]
})
export class HeaderMobileComponent {

  constructor(public data: DataStore) {}

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
