import { NgStyle } from "@angular/common"
import { Component, computed, inject, input } from "@angular/core"
import { CalculatorStore } from "@data/store/calculator-store"
import { TypeName } from "@robsonbittencourt/calc/dist/data/interface"

@Component({
  selector: "app-type-combo-box",
  imports: [NgStyle],
  templateUrl: "./type-combo-box.component.html",
  styleUrl: "./type-combo-box.component.scss"
})
export class TypeComboBoxComponent {
  pokemonId = input.required<string>()
  reverse = input(false)

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  typeStyle(type?: TypeName): any {
    switch (type) {
      case "Normal": {
        return { "background-color": "#9FA19F" }
      }
      case "Fighting": {
        return { "background-color": "#FF8000" }
      }
      case "Flying": {
        return { "background-color": "#81B9EF" }
      }
      case "Poison": {
        return { "background-color": "#9141CB" }
      }
      case "Ground": {
        return { "background-color": "#915121" }
      }
      case "Rock": {
        return { "background-color": "#AFA981" }
      }
      case "Bug": {
        return { "background-color": "#91A119" }
      }
      case "Ghost": {
        return { "background-color": "#704170" }
      }
      case "Steel": {
        return { "background-color": "#60A1B8" }
      }
      case "Fire": {
        return { "background-color": "#E62829" }
      }
      case "Water": {
        return { "background-color": "#2980EF" }
      }
      case "Grass": {
        return { "background-color": "#3FA129" }
      }
      case "Electric": {
        return { "background-color": "#FAC000" }
      }
      case "Psychic": {
        return { "background-color": "#EF4179" }
      }
      case "Ice": {
        return { "background-color": "#3DCEF3" }
      }
      case "Dragon": {
        return { "background-color": "#5060E1" }
      }
      case "Dark": {
        return { "background-color": "#624D4E" }
      }
      case "Fairy": {
        return { "background-color": "#EF70EF" }
      }

      default: {
        break
      }
    }
  }
}
