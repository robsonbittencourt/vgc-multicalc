import { Injectable } from "@angular/core"
import { Ability, Move, MoveSet, Pokemon } from "@multicalc/model"
import { adjustName, buildBoosts, parsePokepasteText, withDefaults } from "@multicalc/serialization"

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
      return await this.parseFromVrPaste(input, useSpsMode)
    } else if (input.startsWith("http")) {
      return await this.parseFromPokePaste(input, useSpsMode)
    } else {
      return parsePokepasteText(input, useSpsMode)
    }
  }

  private async parseFromPokePaste(pokePasteLink: string, useSpsMode: boolean): Promise<{ name: string; pokemon: Pokemon[] }> {
    const res = await fetch(`${pokePasteLink}/json`)
    const data = await res.json()
    const parsed = await parsePokepasteText(data.paste, useSpsMode)

    return { name: data.title || parsed.name, pokemon: parsed.pokemon }
  }

  private async parseFromVrPaste(vrPasteLink: string, useSpsMode: boolean): Promise<{ name: string; pokemon: Pokemon[] }> {
    const id = vrPasteLink.split("/").pop()
    const res = await fetch(`https://vrpaste-backend.vercel.app/api/paste/${id}?lang=english`)
    const data = await res.json()

    const pokemon = data.teams.map((poke: any) => {
      const name = adjustName(poke.species)
      const ivs = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
      const { ability, nature, item, teraType, evs } = withDefaults(name, poke, useSpsMode)
      const moveSet = new MoveSet(new Move(poke.moves[0] ?? ""), new Move(poke.moves[1] ?? ""), new Move(poke.moves[2] ?? ""), new Move(poke.moves[3] ?? ""))
      const boosts = buildBoosts({ name })

      return new Pokemon(name, { ability: new Ability(ability, false), nature, item, teraType, evs, moveSet, boosts, ivs })
    })

    return { name: data.title || "", pokemon }
  }
}
