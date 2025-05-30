import fs from "fs"
import { smogonUsageList } from "./smogon-data.js"

const POKEMON_QUANTITY = 125
const MOVESET_MODULE_PREFIX = `import { Regulation } from "@lib/types"

export const topUsageByRegulation: Record<Regulation, string[]> = {\n  `

export async function topUsage(date, regulation) {
  const usageListReg = await usageList(date, regulation)
  const usageLists = [usageListReg]

  const fileContent = buildFileContent(usageLists)

  fs.writeFileSync("src/data/top-usage-regulation.ts", fileContent)
}

async function usageList(date, regulation) {
  const usageList = await smogonUsageList(date, regulation)

  const lines = usageList.data.split("\n").map(line => line.trim())
  const pokemonNames = []

  const startIndex = 5

  for (let i = startIndex; i < POKEMON_QUANTITY; i++) {
    const line = lines[i]
    if (!line.startsWith("|")) break

    const columns = line.split("|").map(col => col.trim())

    const pokemonName = columns[2]
    if (pokemonName) {
      if (pokemonName == "Terapagos") {
        pokemonNames.push("Terapagos-Terastal")
      } else {
        pokemonNames.push(pokemonName)
      }
    }
  }

  const regulationUsageList = `${regulation.toUpperCase()}: [
    ${pokemonNames.map(name => `"${name}"`).join(",\n    ")}
  ]`

  return regulationUsageList
}

function buildFileContent(usageLists) {
  let classContent = MOVESET_MODULE_PREFIX

  for (let i = 0; i < usageLists.length; i++) {
    classContent += usageLists[i]

    if (i === usageLists.length - 1) {
      classContent += "\n"
    } else {
      classContent += ",\n  "
    }
  }

  classContent += "}\n"

  return classContent
}
