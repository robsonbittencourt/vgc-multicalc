import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamImportModalComponent } from './team-import-modal.component';

describe('TeamImportModalComponent', () => {
  let component: TeamImportModalComponent;
  let fixture: ComponentFixture<TeamImportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamImportModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamImportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
