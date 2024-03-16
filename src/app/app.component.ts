import { Component } from '@angular/core';
import { DeviceDetectorService } from 'src/lib/device-detector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private deviceDetectorService: DeviceDetectorService) { }

  isDesktopDevice(): boolean {
    return this.deviceDetectorService.isDesktopDevice()
  }
  
}