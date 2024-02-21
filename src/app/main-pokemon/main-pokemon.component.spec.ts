import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPokemonComponent } from './main-pokemon.component';

describe('MainPokemonComponent', () => {
  let component: MainPokemonComponent;
  let fixture: ComponentFixture<MainPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPokemonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
