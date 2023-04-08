import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMainComponent } from './pokemon-main.component';

describe('PokemonMainComponent', () => {
  let component: PokemonMainComponent;
  let fixture: ComponentFixture<PokemonMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
