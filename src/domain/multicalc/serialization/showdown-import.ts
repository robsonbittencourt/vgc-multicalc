import { getMoveset, MOVESETS } from "@data/moveset-data"
import { Ability, Move, MoveSet, Pokemon } from "@multicalc/model"
import { Stats } from "@multicalc/types"
import { spToEv } from "@multicalc/utils"

export async function parseShowdownText(teamInTextFormat: string, useSpsMode: boolean): Promise<{ name: string; pokemon: Pokemon[] }> {
  const { Koffing } = await import("koffing")
  const parsedTeam = Koffing.parse(teamInTextFormat)
  const team = JSON.parse(parsedTeam.toJson()).teams[0]
  const teamName = team.name && team.name !== "Untitled" ? team.name : ""
  const pokemonList = team.pokemon

  const pokemon = pokemonList.map((poke: any) => {
    const name = adjustName(poke.name)
    const ivs = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
    let evs = { hp: poke.evs?.hp ?? 0, atk: poke.evs?.atk ?? 0, def: poke.evs?.def ?? 0, spa: poke.evs?.spa ?? 0, spd: poke.evs?.spd ?? 0, spe: poke.evs?.spe ?? 0 }

    if (useSpsMode) {
      evs = { hp: spToEv(evs.hp), atk: spToEv(evs.atk), def: spToEv(evs.def), spa: spToEv(evs.spa), spd: spToEv(evs.spd), spe: spToEv(evs.spe) }
    }

    const moveSet = new MoveSet(new Move(poke.moves[0] ?? ""), new Move(poke.moves[1] ?? ""), new Move(poke.moves[2] ?? ""), new Move(poke.moves[3] ?? ""))
    const boosts = buildBoosts(poke)

    return new Pokemon(name, { ability: new Ability(poke.ability, false), nature: poke.nature, item: poke.item, teraType: poke.teraType, evs, moveSet, boosts, ivs })
  })

  return { name: teamName, pokemon }
}

export function adjustName(pokemonName: string): string {
  if (pokemonName.includes("-")) {
    const onlyName = pokemonName.substring(0, pokemonName.indexOf("-"))

    const isAlternativeForm = pokemonWithAlternativeForm().some(name => name.normalize("NFC") === onlyName.normalize("NFC"))

    if (isAlternativeForm) {
      const fullNameExists = getMoveset(pokemonName, MOVESETS)

      if (fullNameExists) {
        return pokemonName
      }

      return onlyName
    }
  }

  return pokemonName
}

function pokemonWithAlternativeForm(): string[] {
  return ["Rockruff", "Polteageist", "Sinistea", "Sinistcha", "Vivillon", "Alcremie", "Dudunsparce", "Pikachu", "Flabébé", "Floette", "Florges", "Squawkabilly", "Maushold", "Tatsugiri", "Gastrodon"]
}

export function buildBoosts(poke: any): Partial<Stats> {
  if (poke.name.startsWith("Zacian")) {
    return { atk: 1, def: 0, spa: 0, spd: 0, spe: 0 }
  }

  if (poke.name.startsWith("Zamazenta")) {
    return { atk: 0, def: 1, spa: 0, spd: 0, spe: 0 }
  }

  return { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
}
