import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { SpeedDefinition } from 'src/lib/speed-calculator/speed-definition';

const visible = { transform: 'translateX(0)' };
const timing = '500ms ease-in';

@Component({
  selector: 'app-speed-box',
  templateUrl: './speed-box.component.html',
  styleUrls: ['./speed-box.component.scss'],
  animations: [
    trigger('openClose',[
      transition(':enter', [
        style({ transform: 'translateX({{ leaveEnd }})' }),
        animate(timing, style(visible))
      ],
      { 
        params: {
          leaveEnd: ''
        }
      })
    ])
  ]
})
export class SpeedBoxComponent {

  @Input()
  speedDefinition: SpeedDefinition

  @Input()
  speedChanged: boolean

  @Input()
  speedIncreasing: boolean

  isActual(speedDefinition: SpeedDefinition) {
    return speedDefinition.description.includes("Actual")
  }

  getAnimation(): string {
    if(!this.speedChanged) {
      return '0'
    } 

    if (this.speedIncreasing) {
      return '100%'
    } else {
      return '-100%'
    }    
  }

}
