import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetPokemonComponent } from './target-pokemon.component';

describe('TargetPokemonComponent', () => {
  let component: TargetPokemonComponent;
  let fixture: ComponentFixture<TargetPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetPokemonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
