import { Injectable } from "@angular/core"
import { CalcAdjuster } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { Pokemon } from "@lib/model/pokemon"

@Injectable({
  providedIn: 'root'
})
export class CommanderAdjuster implements CalcAdjuster {
  adjust(attacker: Pokemon, target: Pokemon) {
    this.adjustCommander(attacker)
    this.adjustCommander(target)
  }

  private adjustCommander(pokemon: Pokemon) {
    if (pokemon.commanderActivated) {
      const maxStatModifier = 6

      pokemon.pokemonSmogon.boosts = {
        hp: 0,
        atk: pokemon.pokemonSmogon.boosts.atk <= 4 ? pokemon.pokemonSmogon.boosts.atk + 2 : maxStatModifier,
        def: pokemon.pokemonSmogon.boosts.def <= 4 ? pokemon.pokemonSmogon.boosts.def + 2 : maxStatModifier,
        spa: pokemon.pokemonSmogon.boosts.spa <= 4 ? pokemon.pokemonSmogon.boosts.spa + 2 : maxStatModifier,
        spd: pokemon.pokemonSmogon.boosts.spd <= 4 ? pokemon.pokemonSmogon.boosts.spd + 2 : maxStatModifier,
        spe: pokemon.pokemonSmogon.boosts.spe <= 4 ? pokemon.pokemonSmogon.boosts.spe + 2 : maxStatModifier
      }
    }
  }
}

