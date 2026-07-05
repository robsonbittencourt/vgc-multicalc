import fs from "fs"
import { smogonUsageList } from "./smogon-data.js"

const POKEMON_QUANTITY = 125
const MOVESET_MODULE_PREFIX = `import { Regulation } from "@multicalc/types"

export const topUsageByRegulation: Record<Regulation, string[]> = {\n  `
const OUTPUT_FILE = "src/configuration/top-usage-regulation.ts"

export async function topUsage(date, regulation) {
  console.log("⏳ [topUsage] Generating top usage list...")

  const usageListReg = await usageList(date, regulation)

  let fileContent = ""
  if (fs.existsSync(OUTPUT_FILE)) {
    fileContent = fs.readFileSync(OUTPUT_FILE, "utf-8")
    fileContent = updateRegulationEntry(fileContent, regulation, usageListReg)
  } else {
    fileContent = buildFileContent([usageListReg])
  }

  fs.writeFileSync(OUTPUT_FILE, fileContent)

  console.log(`✅ [topUsage] '${OUTPUT_FILE}' updated successfully`)
}

async function usageList(date, regulation) {
  const usageList = await smogonUsageList(date, regulation)

  const lines = usageList.data.split("\n").map(line => line.trim())
  const pokemonNames = []

  const startIndex = 5

  for (let i = startIndex; i < startIndex + POKEMON_QUANTITY; i++) {
    const line = lines[i]
    if (!line.startsWith("|")) break

    const columns = line.split("|").map(col => col.trim())
    const pokemonName = columns[2]
    if (pokemonName) {
      pokemonNames.push(pokemonName)
    }
  }

  const regulationUsageList = `${regulation.toUpperCase()}: [
    ${pokemonNames.map(name => `"${name}"`).join(",\n    ")}
  ]`

  return regulationUsageList
}

function updateRegulationEntry(fileContent, regulation, usageListReg) {
  const regex = new RegExp(`(${regulation.toUpperCase()}\\s*:\\s*\\[)[\\s\\S]*?(\\])`, "")

  if (regex.test(fileContent)) {
    const pokemonList = extractPokemonList(usageListReg)
    return fileContent.replace(regex, `$1\n    ${pokemonList.join(",\n    ")}\n  $2`)
  }

  return fileContent
}

function extractPokemonList(usageListReg) {
  const match = usageListReg.match(/\[\s*([^\]]*)\s*\]/)
  if (!match) return []
  return match[1]
    .split(",\n    ")
    .map(p => p.trim())
    .filter(Boolean)
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
