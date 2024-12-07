import { Injectable } from '@angular/core'
import axios from 'axios'
import { Koffing } from 'koffing'
import { Move } from './move'
import { MoveSet } from './moveset'
import { Pokemon } from './pokemon'

@Injectable({
  providedIn: 'root'
})
export class PokePasteParserService {

  async parse(input: string): Promise<Pokemon[]> {
    if (input.startsWith("http")) {
      return await this.parseFromPokePaste(input)
    } else {
      return this.parseFromText(input)
    }
  } 

  private async parseFromPokePaste(pokePasteLink: string): Promise<Pokemon[]> {
    const res = await axios.get(`${pokePasteLink}/raw`)
    return this.parseFromText(res.data)
  }

  private parseFromText(teamInTextFormat: string): Pokemon[] {
    const parsedTeam = Koffing.parse(teamInTextFormat)
    const pokemonList = JSON.parse(parsedTeam.toJson()).teams[0].pokemon

    return pokemonList.map((poke: any) => {
      const name = this.adjustName(poke.name)
      const ivs = { hp: poke.ivs?.hp ?? 31, atk: poke.ivs?.atk ?? 31, def: poke.ivs?.def ?? 31, spa: poke.ivs?.spa ?? 31, spd: poke.ivs?.spd ?? 31, spe: poke.ivs?.spe ?? 31 }  
      const evs = { hp: poke.evs?.hp ?? 0, atk: poke.evs?.atk ?? 0, def: poke.evs?.def ?? 0, spa: poke.evs?.spa ?? 0, spd: poke.evs?.spd ?? 0, spe: poke.evs?.spe ?? 0 }
      const moveSet = new MoveSet(new Move(poke.moves[0]), new Move(poke.moves[1]), new Move(poke.moves[2]), new Move(poke.moves[3]))

      return new Pokemon(name, { ability: poke.ability, nature: poke.nature, item: poke.item, teraType: poke.teraType, evs, moveSet, ivs })
    })
  }
  
  adjustName(pokemonName: string): string {
    if (pokemonName.includes("-")) {
      const onlyName = pokemonName.substring(0, pokemonName.indexOf("-"))
      
      if(this.pokemonWithAlternativeForm().includes(onlyName)) {
        return onlyName
      }
    }

    return pokemonName
  }

  pokemonWithAlternativeForm(): string[] {
    return [
      "Vivillon",
      "Alcremie",
      "Dudunsparce",
      "Pikachu",
      "Flabébé",
      "Floette",
      "Florges",
      "Squawkabilly",
      "Maushold",
      "Tatsugiri"
    ]
  }
}
