import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTabComponent } from './pokemon-tab.component';

describe('PokemonTabComponent', () => {
  let component: PokemonTabComponent;
  let fixture: ComponentFixture<PokemonTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
