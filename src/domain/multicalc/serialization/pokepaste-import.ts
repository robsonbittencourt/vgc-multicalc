import { getMoveset } from "@data/moveset-data"
import { Ability, Move, MoveSet, Pokemon } from "@multicalc/model"
import { Stats } from "@multicalc/types"
import { evToSp, MAX_EVS_PER_STAT, MAX_SPS, spToEv } from "@multicalc/utils"

export class InvalidSpsError extends Error {
  constructor() {
    super("Invalid SPs")
    this.name = "InvalidSpsError"
  }
}

export function resolveImportedEvs(rawEvs: Partial<Stats> | undefined, useSpsMode: boolean): Stats {
  const evs = { hp: rawEvs?.hp ?? 0, atk: rawEvs?.atk ?? 0, def: rawEvs?.def ?? 0, spa: rawEvs?.spa ?? 0, spd: rawEvs?.spd ?? 0, spe: rawEvs?.spe ?? 0 }

  if (!useSpsMode) return evs

  if (evs.hp + evs.atk + evs.def + evs.spa + evs.spd + evs.spe > MAX_SPS) {
    throw new InvalidSpsError()
  }

  if (Object.values(evs).some(sp => sp > evToSp(MAX_EVS_PER_STAT))) {
    throw new InvalidSpsError()
  }

  return { hp: spToEv(evs.hp), atk: spToEv(evs.atk), def: spToEv(evs.def), spa: spToEv(evs.spa), spd: spToEv(evs.spd), spe: spToEv(evs.spe) }
}

export async function parsePokepasteText(teamInTextFormat: string, useSpsMode: boolean): Promise<{ name: string; pokemon: Pokemon[] }> {
  const { Koffing } = await import("koffing")
  const parsedTeam = Koffing.parse(teamInTextFormat)
  const team = JSON.parse(parsedTeam.toJson()).teams[0]
  const teamName = team.name && team.name !== "Untitled" ? team.name : ""
  const pokemonList = team.pokemon

  const pokemon = pokemonList.map((poke: any) => {
    const name = adjustName(poke.name)
    const ivs = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
    const { ability, nature, item, teraType, evs } = withDefaults(name, poke, useSpsMode)

    const moveSet = new MoveSet(new Move(poke.moves[0] ?? ""), new Move(poke.moves[1] ?? ""), new Move(poke.moves[2] ?? ""), new Move(poke.moves[3] ?? ""))
    const boosts = buildBoosts(poke)

    return new Pokemon(name, { ability: new Ability(ability, false), nature, item, teraType, evs, moveSet, boosts, ivs })
  })

  return { name: teamName, pokemon }
}

export type ImportedDefaults = { ability: string; nature?: string; item?: string; teraType?: string; evs: Stats }

export function withDefaults(name: string, poke: any, useSpsMode: boolean): ImportedDefaults {
  const defaults = getMoveset(name)

  return {
    ability: poke.ability ?? defaults!.ability,
    nature: poke.nature ?? defaults?.nature,
    item: poke.item ?? defaults?.items[0],
    teraType: poke.teraType ?? defaults?.teraType,
    evs: resolveImportedEvs(poke.evs, useSpsMode)
  }
}

export function adjustName(pokemonName: string): string {
  if (pokemonName.includes("-")) {
    const onlyName = pokemonName.substring(0, pokemonName.indexOf("-"))

    const isAlternativeForm = pokemonWithAlternativeForm().some(name => name.normalize("NFC") === onlyName.normalize("NFC"))

    if (isAlternativeForm) {
      const fullNameExists = getMoveset(pokemonName)

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
