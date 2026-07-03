import { Injectable } from "@angular/core"
import { getMoveset, MOVESETS } from "@data/moveset-data"
import { Ability } from "@lib/model/ability"
import { Move } from "@lib/model/move"
import { MoveSet } from "@lib/model/moveset"
import { Pokemon } from "@lib/model/pokemon"
import { Stats } from "@lib/types"
import { spToEv } from "@lib/utils/ev-sp-converter"

@Injectable({
  providedIn: "root"
})
export class PokePasteParserService {
  async parse(input: string, useSpsMode = true): Promise<Pokemon[]> {
    const { pokemon } = await this.parseTeam(input, useSpsMode)

    return pokemon
  }

  async parseTeam(input: string, useSpsMode = true): Promise<{ name: string; pokemon: Pokemon[] }> {
    if (input.startsWith("http") && input.includes("vrpastes.com")) {
      return await this.parseFromVrPaste(input)
    } else if (input.startsWith("http")) {
      return await this.parseFromPokePaste(input, useSpsMode)
    } else {
      return this.parseFromText(input, useSpsMode)
    }
  }

  private async parseFromPokePaste(pokePasteLink: string, useSpsMode: boolean): Promise<{ name: string; pokemon: Pokemon[] }> {
    const res = await fetch(`${pokePasteLink}/json`)
    const data = await res.json()
    const parsed = await this.parseFromText(data.paste, useSpsMode)

    return { name: data.title || parsed.name, pokemon: parsed.pokemon }
  }

  private async parseFromVrPaste(vrPasteLink: string): Promise<{ name: string; pokemon: Pokemon[] }> {
    const id = vrPasteLink.split("/").pop()
    const res = await fetch(`https://vrpaste-backend.vercel.app/api/paste/${id}?lang=english`)
    const data = await res.json()

    const pokemon = data.teams.map((poke: any) => {
      const name = this.adjustName(poke.species)
      const ivs = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
      const evs = { hp: poke.evs?.hp ?? 0, atk: poke.evs?.atk ?? 0, def: poke.evs?.def ?? 0, spa: poke.evs?.spa ?? 0, spd: poke.evs?.spd ?? 0, spe: poke.evs?.spe ?? 0 }
      const moveSet = new MoveSet(new Move(poke.moves[0] ?? ""), new Move(poke.moves[1] ?? ""), new Move(poke.moves[2] ?? ""), new Move(poke.moves[3] ?? ""))
      const boosts = this.buildBoosts({ name })

      return new Pokemon(name, { ability: new Ability(poke.ability, false), nature: poke.nature, item: poke.item, evs, moveSet, boosts, ivs })
    })

    return { name: data.title || "", pokemon }
  }

  private async parseFromText(teamInTextFormat: string, useSpsMode: boolean): Promise<{ name: string; pokemon: Pokemon[] }> {
    const { Koffing } = await import("koffing")
    const parsedTeam = Koffing.parse(teamInTextFormat)
    const team = JSON.parse(parsedTeam.toJson()).teams[0]
    const teamName = team.name && team.name !== "Untitled" ? team.name : ""
    const pokemonList = team.pokemon

    const pokemon = pokemonList.map((poke: any) => {
      const name = this.adjustName(poke.name)
      const ivs = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
      let evs = { hp: poke.evs?.hp ?? 0, atk: poke.evs?.atk ?? 0, def: poke.evs?.def ?? 0, spa: poke.evs?.spa ?? 0, spd: poke.evs?.spd ?? 0, spe: poke.evs?.spe ?? 0 }

      if (useSpsMode) {
        evs = { hp: spToEv(evs.hp), atk: spToEv(evs.atk), def: spToEv(evs.def), spa: spToEv(evs.spa), spd: spToEv(evs.spd), spe: spToEv(evs.spe) }
      }

      const moveSet = new MoveSet(new Move(poke.moves[0] ?? ""), new Move(poke.moves[1] ?? ""), new Move(poke.moves[2] ?? ""), new Move(poke.moves[3] ?? ""))
      const boosts = this.buildBoosts(poke)

      return new Pokemon(name, { ability: new Ability(poke.ability, false), nature: poke.nature, item: poke.item, teraType: poke.teraType, evs, moveSet, boosts, ivs })
    })

    return { name: teamName, pokemon }
  }

  adjustName(pokemonName: string): string {
    if (pokemonName.includes("-")) {
      const onlyName = pokemonName.substring(0, pokemonName.indexOf("-"))

      if (this.pokemonWithAlternativeForm().includes(onlyName)) {
        const fullNameExists = getMoveset(pokemonName, MOVESETS)
        if (fullNameExists) {
          return pokemonName
        }
        return onlyName
      }
    }

    return pokemonName
  }

  pokemonWithAlternativeForm(): string[] {
    return ["Rockruff", "Polteageist", "Sinistea", "Sinistcha", "Vivillon", "Alcremie", "Dudunsparce", "Pikachu", "Flabébé", "Floette", "Florges", "Squawkabilly", "Maushold", "Tatsugiri", "Gastrodon"]
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
