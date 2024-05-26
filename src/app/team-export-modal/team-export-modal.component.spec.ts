import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamExportModalComponent } from './team-export-modal.component';

describe('TeamExportModalComponent', () => {
  let component: TeamExportModalComponent;
  let fixture: ComponentFixture<TeamExportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamExportModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamExportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
