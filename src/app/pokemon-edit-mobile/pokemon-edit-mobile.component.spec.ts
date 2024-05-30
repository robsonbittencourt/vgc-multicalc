import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonEditMobileComponent } from './pokemon-edit-mobile.component';

describe('PokemonEditMobileComponent', () => {
  let component: PokemonEditMobileComponent;
  let fixture: ComponentFixture<PokemonEditMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonEditMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonEditMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
