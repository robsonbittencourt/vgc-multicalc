import { Pokemon } from "@smogon/calc";
import { TypeName } from "@smogon/calc/dist/data/interface";

export class TargetPokemon {
  pokemon: Pokemon;
  evsDescription: String = ""
  damage: number = 0
  result: String = ""
  koChance: String = ""
  name: String = ""
  isTeraActived: boolean = false
  teraTypeStorage: TypeName | null = null

  constructor(pokemon: Pokemon, isTeraActived: boolean = false) {
    this.pokemon = pokemon
    this.isTeraActived = isTeraActived
    this.name = pokemon.name.toLocaleLowerCase().replace(" ", "-")

    if (this.pokemon.teraType) {
      this.teraTypeStorage = this.pokemon.teraType
    }

    if (!isTeraActived) {
      this.pokemon.teraType = undefined
    }

    if (pokemon.evs.hp && pokemon.evs.hp != 0) this.evsDescription += `hp: ${pokemon.evs.hp} `
    if (pokemon.evs.atk && pokemon.evs.atk != 0) this.evsDescription += `atk: ${pokemon.evs.atk} `
    if (pokemon.evs.def && pokemon.evs.def != 0) this.evsDescription += `def: ${pokemon.evs.def} `
    if (pokemon.evs.spa && pokemon.evs.spa != 0) this.evsDescription += `spa: ${pokemon.evs.spa} `
    if (pokemon.evs.spd && pokemon.evs.spd != 0) this.evsDescription += `spd: ${pokemon.evs.spd} `
    if (pokemon.evs.spe && pokemon.evs.spe != 0) this.evsDescription += `spe: ${pokemon.evs.spe}`
  }

  changeTeraStatus() {
    if (!this.teraTypeStorage) {
      return
    }

    if (this.isTeraActived) {
      this.isTeraActived = false
      this.pokemon.teraType = undefined
    } else {
      this.isTeraActived = true
      this.pokemon.teraType = this.teraTypeStorage
    }
  }

  totalEvs(): number {
    return this.pokemon.evs.hp + this.pokemon.evs.atk + this.pokemon.evs.def + this.pokemon.evs.spa + this.pokemon.evs.spd + this.pokemon.evs.spe
  }
}