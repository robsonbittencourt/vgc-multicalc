import { getItemData } from "@data/item-data"
import { getMoveData } from "@data/move-data"
import { StatIDExceptHP } from "@data/types"
import { natureEffect, Pokemon } from "@multicalc/model"
import { PasteCard, PasteForm } from "@shared/paste-card/paste-card"
import { Stats } from "@multicalc/types"
import { spToEv } from "@multicalc/utils"
import { unknownPokemonList } from "@store/paste/paste-from-text"
import { baseForm, megaForm, SharedTeam } from "@store/paste/shared-team"
import { parsePokepasteText, UnknownPokemonError } from "@store/user-data/pokepaste-import"

const MAX_TEAM_MEMBERS = 6
const STATS: [keyof Stats, string][] = [
  ["hp", "HP"],
  ["atk", "Atk"],
  ["def", "Def"],
  ["spa", "SpA"],
  ["spd", "SpD"],
  ["spe", "Spe"]
]

export function buildPasteCards(pokemon: Pokemon[], useSpsMode: boolean, withTera: boolean[]): PasteCard[] {
  return pokemon.map(baseForm).map((p, index) => {
    const mega = megaForm(p)

    return {
      ...pasteForm(p),
      ...(mega ? { mega: pasteForm(mega) } : {}),
      item: p.item,
      itemSprite: getItemData(p.item)?.sprite,
      nature: p.nature,
      natureBoost: natureStat(p.nature, "+"),
      natureDrop: natureStat(p.nature, "-"),
      ...(withTera[index] ? { teraType: p.teraType } : {}),
      moves: p.moveSet.moves.filter(move => move.name !== "").map(move => ({ name: move.name, type: getMoveData(move.name)?.type.toLowerCase() })),
      spread: spread(p.sps, useSpsMode)
    }
  })
}

function pasteForm(pokemon: Pokemon): PasteForm {
  return {
    name: pokemon.name,
    ability: pokemon.ability.name,
    type1: pokemon.type1,
    type2: pokemon.type2
  }
}

function natureStat(nature: string, effect: "+" | "-"): string | undefined {
  return STATS.find(([stat]) => stat !== "hp" && natureEffect(nature, stat as StatIDExceptHP) === effect)?.[1]
}

function spread(sps: Stats, useSpsMode: boolean): string {
  return STATS.filter(([stat]) => sps[stat] > 0)
    .map(([stat, label]) => `${useSpsMode ? sps[stat] : spToEv(sps[stat])}\u00a0${label}`)
    .join("\u00a0/ ")
}

export async function sharedTeamPokemon(team: SharedTeam): Promise<Pokemon[]> {
  const { pokemon } = await parsePokepasteText(team.showdown, team.useSpsMode)

  if (pokemon.length === 0 || pokemon.length > MAX_TEAM_MEMBERS) throw new Error(`A paste team has 1 to ${MAX_TEAM_MEMBERS} Pokémon`)

  return pokemon
}

export function unreadablePasteMessage(error: unknown): string {
  if (error instanceof UnknownPokemonError) return `This paste has Pokémon that the calc does not know. ${unknownPokemonList(error)}.`

  return "The calc could not read this paste."
}

export function unlockErrorMessage(wrongPassword: boolean, retryAfter?: number): string {
  const wrong = wrongPassword ? "Wrong password." : ""

  if (!retryAfter) return wrong

  const minutes = Math.ceil(retryAfter / 60)
  const wait = `Too many attempts. Try again in ${minutes} ${minutes === 1 ? "minute" : "minutes"}.`

  return wrong ? `${wrong} ${wait}` : wait
}
