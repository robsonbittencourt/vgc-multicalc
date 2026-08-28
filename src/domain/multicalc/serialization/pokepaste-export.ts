import { Pokemon } from "@multicalc/model"
import { evToSp } from "@multicalc/utils"

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

  if (pokemon.evs.hp) evs.push(`${pokemon.evs.hp} HP`)
  if (pokemon.evs.atk) evs.push(`${pokemon.evs.atk} Atk`)
  if (pokemon.evs.def) evs.push(`${pokemon.evs.def} Def`)
  if (pokemon.evs.spa) evs.push(`${pokemon.evs.spa} SpA`)
  if (pokemon.evs.spd) evs.push(`${pokemon.evs.spd} SpD`)
  if (pokemon.evs.spe) evs.push(`${pokemon.evs.spe} Spe`)

  return evs.join(" / ")
}

function spsDescription(pokemon: Pokemon): string {
  const sps: string[] = []

  const hpSps = evToSp(pokemon.evs.hp)
  if (hpSps) sps.push(`${hpSps} HP`)
  const atkSps = evToSp(pokemon.evs.atk)
  if (atkSps) sps.push(`${atkSps} Atk`)
  const defSps = evToSp(pokemon.evs.def)
  if (defSps) sps.push(`${defSps} Def`)
  const spaSps = evToSp(pokemon.evs.spa)
  if (spaSps) sps.push(`${spaSps} SpA`)
  const spdSps = evToSp(pokemon.evs.spd)
  if (spdSps) sps.push(`${spdSps} SpD`)
  const speSps = evToSp(pokemon.evs.spe)
  if (speSps) sps.push(`${speSps} Spe`)

  return sps.join(" / ")
}
