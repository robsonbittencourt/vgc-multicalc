import { Pokemon } from "@smogon/calc";

export class TargetPokemon {
  pokemon: Pokemon;
  evsDescription: String = ""
  damage: number = 0
  result: String = ""
  koChance: String = ""
  name: String = ""

  constructor(pokemon: Pokemon) {
    this.pokemon = pokemon
    this.name = pokemon.name.toLocaleLowerCase().replace(" ", "-")
    if (pokemon.evs.hp != 0) this.evsDescription += `hp: ${pokemon.evs.hp} `
    if (pokemon.evs.atk != 0) this.evsDescription += `atk: ${pokemon.evs.atk} `
    if (pokemon.evs.def != 0) this.evsDescription += `def: ${pokemon.evs.def} `
    if (pokemon.evs.spa != 0) this.evsDescription += `spa: ${pokemon.evs.spa} `
    if (pokemon.evs.spd != 0) this.evsDescription += `spd: ${pokemon.evs.spd} `
    if (pokemon.evs.spe != 0) this.evsDescription += `spe: ${pokemon.evs.spe}`
  }
}