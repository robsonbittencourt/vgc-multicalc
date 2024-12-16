import { animate, style, transition, trigger } from '@angular/animations'
import { NgStyle } from '@angular/common'
import { Component, computed, input } from '@angular/core'
import { ACTUAL } from 'src/lib/constants'
import { SpeedDefinition } from 'src/lib/speed-calculator/speed-definition'

const visible = { transform: 'translateX(0)' }
const timing = '500ms ease-in';

@Component({
  selector: 'app-speed-box',
  templateUrl: './speed-box.component.html',
  styleUrls: ['./speed-box.component.scss'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ transform: 'translateX({{ leaveEnd }})' }),
        animate(timing, style(visible))
      ], {
        params: { leaveEnd: '' }
      })
    ])
  ],
  imports: [NgStyle]
})
export class SpeedBoxComponent {

  speedDefinition = input.required<SpeedDefinition>()
  speedChanged = input.required<boolean>()
  speedIncreasing = input.required<boolean>()

  isActual = computed(() => this.speedDefinition().description.includes(ACTUAL))

  animation = computed(() => {
    if(!this.speedChanged()) {
      return '0'
    } 

    if (this.speedIncreasing()) {
      return '100%'
    } else {
      return '-100%'
    }
  })

}
