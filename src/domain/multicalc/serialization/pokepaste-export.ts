import { Pokemon } from "@multicalc/model"
import { spToEv } from "@multicalc/utils"

export async function toPokepasteText(pokemon: Pokemon, useSpsMode: boolean, includeTeraType: boolean): Promise<string> {
  const { default: dedent } = await import("dedent")
  let text = dedent`
    ${nameForExport(pokemon.name)} @ ${pokemon.item}
    Ability: ${pokemon.ability.name}
    Level: ${pokemon.level}\n
  `

  if (includeTeraType) {
    text += `Tera Type: ${pokemon.teraType}\n`
  }

  const description = useSpsMode ? spsDescription(pokemon) : evsDescription(pokemon)

  if (description.length > 0) {
    text += `EVs: ${description}\n`
  }

  text += `${pokemon.nature} Nature\n`

  const moves = [pokemon.move1Name, pokemon.move2Name, pokemon.move3Name, pokemon.move4Name].filter(move => move && move !== "undefined" && move !== "")
  text += moves.map(move => `- ${move}`).join("\n") + "\n"

  return text
}

function nameForExport(name: string): string {
  if (name === "Aegislash-Shield" || name === "Aegislash-Blade") return "Aegislash"

  return name
}

function evsDescription(pokemon: Pokemon): string {
  const evs: string[] = []

  const stats: [keyof typeof pokemon.sps, string][] = [
    ["hp", "HP"],
    ["atk", "Atk"],
    ["def", "Def"],
    ["spa", "SpA"],
    ["spd", "SpD"],
    ["spe", "Spe"]
  ]

  for (const [stat, label] of stats) {
    const ev = spToEv(pokemon.sps[stat])
    if (ev) evs.push(`${ev} ${label}`)
  }

  return evs.join(" / ")
}

function spsDescription(pokemon: Pokemon): string {
  const sps: string[] = []

  if (pokemon.sps.hp) sps.push(`${pokemon.sps.hp} HP`)
  if (pokemon.sps.atk) sps.push(`${pokemon.sps.atk} Atk`)
  if (pokemon.sps.def) sps.push(`${pokemon.sps.def} Def`)
  if (pokemon.sps.spa) sps.push(`${pokemon.sps.spa} SpA`)
  if (pokemon.sps.spd) sps.push(`${pokemon.sps.spd} SpD`)
  if (pokemon.sps.spe) sps.push(`${pokemon.sps.spe} Spe`)

  return sps.join(" / ")
}
