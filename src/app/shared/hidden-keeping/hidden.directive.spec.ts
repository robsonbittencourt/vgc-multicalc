import { Component, provideZonelessChangeDetection, signal } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { HiddenDirective } from "@shared/hidden-keeping/hidden.directive"

@Component({
  imports: [HiddenDirective],
  template: `<span [appHidden]="hidden()">content</span>`
})
class HostComponent {
  hidden = signal(false)
}

describe("HiddenDirective", () => {
  it("should keep the element visible when appHidden is false", () => {
    const fixture = TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] }).createComponent(HostComponent)

    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector("span").style.visibility).toBe("visible")
  })

  it("should hide the element when appHidden is true", () => {
    const fixture = TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] }).createComponent(HostComponent)

    fixture.componentInstance.hidden.set(true)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector("span").style.visibility).toBe("hidden")
  })

  it("should show the element again when appHidden goes back to false", () => {
    const fixture = TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] }).createComponent(HostComponent)

    fixture.componentInstance.hidden.set(true)
    fixture.detectChanges()

    fixture.componentInstance.hidden.set(false)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector("span").style.visibility).toBe("visible")
  })
})
