import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourTeamComponent } from './your-team.component';

describe('YourTeamComponent', () => {
  let component: YourTeamComponent;
  let fixture: ComponentFixture<YourTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
