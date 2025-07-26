import { Directive, effect, ElementRef, inject, input, Renderer2 } from "@angular/core"

@Directive({
  selector: "[appHidden]",
  standalone: true
})
export class HiddenDirective {
  appHidden = input(false)

  private el = inject(ElementRef)
  private renderer = inject(Renderer2)

  constructor() {
    effect(() => {
      if (this.appHidden()) {
        this.renderer.setStyle(this.el.nativeElement, "visibility", "hidden")
      } else {
        this.renderer.setStyle(this.el.nativeElement, "visibility", "visible")
      }
    })
  }
}
