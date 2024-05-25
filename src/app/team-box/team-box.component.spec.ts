import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBoxComponent } from './team-box.component';

describe('TeamBoxComponent', () => {
  let component: TeamBoxComponent;
  let fixture: ComponentFixture<TeamBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
