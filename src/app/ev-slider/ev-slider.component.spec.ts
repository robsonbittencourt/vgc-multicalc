import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvSliderComponent } from './ev-slider.component';

describe('EvSliderComponent', () => {
  let component: EvSliderComponent;
  let fixture: ComponentFixture<EvSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
