import { Injectable } from "@angular/core"
import { Ability } from "@lib/model/ability"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Stats } from "@lib/types"
import axios from "axios"
import { Koffing } from "koffing"

@Injectable({
  providedIn: "root"
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
      const boosts = this.buildBoosts(poke)

      return new Pokemon(name, { ability: new Ability(poke.ability, false), nature: poke.nature, item: poke.item, teraType: poke.teraType, evs, moveSet, boosts, ivs })
    })
  }

  adjustName(pokemonName: string): string {
    if (pokemonName.includes("-")) {
      const onlyName = pokemonName.substring(0, pokemonName.indexOf("-"))

      if (this.pokemonWithAlternativeForm().includes(onlyName)) {
        return onlyName
      }
    }

    return pokemonName
  }

  pokemonWithAlternativeForm(): string[] {
    return ["Rockruff", "Polteageist", "Sinistea", "Sinistcha", "Vivillon", "Alcremie", "Dudunsparce", "Pikachu", "Flabébé", "Floette", "Florges", "Squawkabilly", "Maushold", "Tatsugiri"]
  }

  buildBoosts(poke: any): Partial<Stats> {
    if (poke.name.startsWith("Zacian")) {
      return { atk: 1, def: 0, spa: 0, spd: 0, spe: 0 }
    }

    if (poke.name.startsWith("Zamazenta")) {
      return { atk: 0, def: 1, spa: 0, spd: 0, spe: 0 }
    }

    return { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
  }
}
