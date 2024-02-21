import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetPokemonCardComponent } from './target-pokemon-card.component';

describe('TargetPokemonCardComponent', () => {
  let component: TargetPokemonCardComponent;
  let fixture: ComponentFixture<TargetPokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetPokemonCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetPokemonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
