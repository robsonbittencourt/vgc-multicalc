import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedBoxComponent } from './speed-box.component';

describe('SpeedBoxComponent', () => {
  let component: SpeedBoxComponent;
  let fixture: ComponentFixture<SpeedBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeedBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeedBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
