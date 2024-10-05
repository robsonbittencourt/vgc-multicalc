import { Component } from '@angular/core';
import { MoveSet } from 'src/lib/moveset';
import { Pokemon } from 'src/lib/pokemon';
import { DataStore } from '../data-store.service';

@Component({
  selector: 'app-simple-calc',
  templateUrl: './simple-calc.component.html',
  styleUrls: ['./simple-calc.component.scss']
})
export class SimpleCalcComponent {

  leftPokemon: Pokemon = new Pokemon("Miraidon", { nature: "Timid", item: "Choice Specs", teraType: "Electric", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet("Electro Drift", "Parabolic Charge", "Volt Switch", "Draco Meteor") })
  rightPokemon: Pokemon = new Pokemon('Koraidon', { nature: "Adamant", item: "Clear Amulet", teraType: "Fire", evs: { hp: 36, atk: 220, spe: 252 }, moveSet: new MoveSet("Flame Charge", "Collision Course", "Flare Blitz", "Protect") })

  constructor(public data: DataStore) { }

  fieldChanged() {

  }

}
