import { getMoveset } from "@data/moveset-data"
import { Ability, isMega, Move, MoveSet, Pokemon } from "@multicalc/model"
import { Stats } from "@multicalc/types"
import { evToSp, MAX_SPS, MAX_SPS_PER_STAT } from "@multicalc/utils"
import { parseShowdownText, ShowdownSet } from "@store/user-data/showdown-text-parser"

export class InvalidSpsError extends Error {
  constructor() {
    super("Invalid SPs")
    this.name = "InvalidSpsError"
  }
}

export function resolveImportedSps(rawValues: Partial<Stats> | undefined, useSpsMode: boolean): Stats {
  const values = { hp: rawValues?.hp ?? 0, atk: rawValues?.atk ?? 0, def: rawValues?.def ?? 0, spa: rawValues?.spa ?? 0, spd: rawValues?.spd ?? 0, spe: rawValues?.spe ?? 0 }

  const sps = useSpsMode ? values : { hp: evToSp(values.hp), atk: evToSp(values.atk), def: evToSp(values.def), spa: evToSp(values.spa), spd: evToSp(values.spd), spe: evToSp(values.spe) }

  if (sps.hp + sps.atk + sps.def + sps.spa + sps.spd + sps.spe > MAX_SPS) {
    throw new InvalidSpsError()
  }

  if (Object.values(sps).some(sp => sp > MAX_SPS_PER_STAT)) {
    throw new InvalidSpsError()
  }

  return sps
}

export async function parsePokepasteText(teamInTextFormat: string, useSpsMode: boolean): Promise<{ name: string; pokemon: Pokemon[] }> {
  const team = parseShowdownText(teamInTextFormat)
  const teamName = team.name && team.name !== "Untitled" ? team.name : ""
  const pokemonList = team.pokemon

  const pokemon = pokemonList.map(poke => {
    const name = adjustName(poke.species)
    const ivs = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
    const { ability, baseFormAbility, nature, item, teraType, sps } = withDefaults(name, poke, useSpsMode)

    const moveSet = new MoveSet(new Move(poke.moves[0] ?? ""), new Move(poke.moves[1] ?? ""), new Move(poke.moves[2] ?? ""), new Move(poke.moves[3] ?? ""))
    const boosts = buildBoosts(poke.species)

    return new Pokemon(name, { ability: new Ability(ability, false), baseFormAbility, nature, item, teraType, sps, moveSet, boosts, ivs })
  })

  return { name: teamName, pokemon }
}

export type ImportedDefaults = { ability: string; baseFormAbility?: string; nature?: string; item?: string; teraType?: string; sps: Stats }

export type ImportedFields = Pick<ShowdownSet, "ability" | "nature" | "item" | "teraType" | "evs">

export function withDefaults(name: string, poke: ImportedFields, useSpsMode: boolean): ImportedDefaults {
  const defaults = getMoveset(name)
  const { ability, baseFormAbility } = resolveMegaAbility(name, poke.ability, defaults!.ability)

  return {
    ability,
    baseFormAbility,
    nature: poke.nature ?? defaults?.nature,
    item: poke.item ?? defaults?.items[0],
    teraType: poke.teraType ?? defaults?.teraType,
    sps: resolveImportedSps(poke.evs, useSpsMode)
  }
}

function resolveMegaAbility(name: string, declaredAbility: string | undefined, megaAbility: string): { ability: string; baseFormAbility?: string } {
  if (!declaredAbility) return { ability: megaAbility }
  if (!isMega(name)) return { ability: declaredAbility }
  if (declaredAbility === megaAbility) return { ability: megaAbility }

  return { ability: megaAbility, baseFormAbility: declaredAbility }
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

export function buildBoosts(species: string): Partial<Stats> {
  if (species.startsWith("Zacian")) {
    return { atk: 1, def: 0, spa: 0, spd: 0, spe: 0 }
  }

  if (species.startsWith("Zamazenta")) {
    return { atk: 0, def: 1, spa: 0, spd: 0, spe: 0 }
  }

  return { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
}
