import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPokemonCardComponent } from './add-pokemon-card.component';

describe('AddPokemonCardComponent', () => {
  let component: AddPokemonCardComponent;
  let fixture: ComponentFixture<AddPokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPokemonCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPokemonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
