import { NgStyle } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DataStore } from 'src/data/data-store';

@Component({
  selector: 'app-pokemon-tab',
  templateUrl: './pokemon-tab.component.html',
  styleUrls: ['./pokemon-tab.component.scss'],
  standalone: true,
  imports: [NgStyle, MatIcon]
})
export class PokemonTabComponent {

  pokemonId = input.required<string>()
  active = input.required<boolean>()
  
  tabActivated = output<string>()

  data = inject(DataStore)

  pokemon = computed(() => this.data.findPokemonById(this.pokemonId()))

  activateTab() {
    this.tabActivated.emit(this.pokemonId())
  }

  tabStyle(): any {
    const activeTabStyle = { 'border-bottom': 'solid 2px', 'border-color': '#673ab7', 'background-color': '#f9f7fc' }

    if (this.active() == true) {
      return activeTabStyle
    } else {
      return null
    }
  }

}
