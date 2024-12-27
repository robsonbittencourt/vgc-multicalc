import fs from "fs"
import { getSmogonData } from "./smogon-data.js"

await createSpeedMetaFile()

export async function createSpeedMetaFile() {
  const regGData = await getSmogonData("2024-08", "g")
  const regHData = await getSmogonData("2024-11", "h")

  let classContent = `import { Ability } from "@lib/model/ability"
import { Pokemon } from "@lib/model/pokemon"

export function speedMeta(regulation: string): Pokemon[] {
  if (regulation == "Reg G") {
    return regG()
  } else {
    return regH()
  }
}

export function regG(): Pokemon[] {
  return [
${printNewPokemon(regGData)}  ]
}

export function regH(): Pokemon[] {
  return [
${printNewPokemon(regHData)}  ]
}
`

  fs.writeFileSync("src/lib/speed-calculator/speed-meta.ts", classContent)
}

function printNewPokemon(pokemon) {
  return (
    pokemon
      .map(p => {
        const item = p.items.find(it => it == "Choice Scarf") ? "Choice Scarf" : p.items[0]

        return (
          "    " + `new Pokemon("${p.name}", { ability: new Ability("${p.ability}"), nature: "${p.nature}", item: "${item}", evs: { hp: ${p.evs.hp}, atk: ${p.evs.atk}, def: ${p.evs.def}, spa: ${p.evs.spa}, spd: ${p.evs.spd}, spe: ${p.evs.spe} } })`
        )
      })
      .join(",\n") + "\n"
  )
}
