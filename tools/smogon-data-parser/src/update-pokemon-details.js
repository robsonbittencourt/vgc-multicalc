import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"
import { eggMoves } from "./eggMoves.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function extractPokemonDetailsObject(content) {
  const startIndex = content.indexOf("export const POKEMON_DETAILS")
  if (startIndex === -1) return null

  const firstBrace = content.indexOf("{", startIndex)
  if (firstBrace === -1) return null

  let braceCount = 0
  let endIndex = -1

  for (let i = firstBrace; i < content.length; i++) {
    if (content[i] === "{") braceCount++
    else if (content[i] === "}") braceCount--

    if (braceCount === 0) {
      endIndex = i
      break
    }
  }

  if (endIndex === -1) return null

  return content.slice(firstBrace, endIndex + 1)
}

function replacePokemonDetailsObject(content, newObjectText) {
  const startIndex = content.indexOf("export const POKEMON_DETAILS")
  if (startIndex === -1) return content

  const firstBrace = content.indexOf("{", startIndex)
  if (firstBrace === -1) return content

  let braceCount = 0
  let endIndex = -1

  for (let i = firstBrace; i < content.length; i++) {
    if (content[i] === "{") braceCount++
    else if (content[i] === "}") braceCount--

    if (braceCount === 0) {
      endIndex = i
      break
    }
  }

  if (endIndex === -1) return content

  return content.slice(0, firstBrace) + newObjectText + content.slice(endIndex + 1)
}

function stringifyWithSingleQuotes(obj, indent = 2) {
  const jsonStr = JSON.stringify(obj, null, indent)
  return jsonStr.replace(/"([^"]+)":/g, "$1:").replace(/"([^"]*)"/g, "'$1'")
}

async function main() {
  try {
    const filePath = path.resolve(__dirname, "../../../src/data/pokemon-details.ts")
    let content = await fs.readFile(filePath, "utf-8")

    const objectText = extractPokemonDetailsObject(content)
    if (!objectText) {
      console.error("Não foi possível extrair o objeto POKEMON_DETAILS")
      return
    }

    let pokemonDetails
    try {
      pokemonDetails = eval(`(${objectText})`)
    } catch (e) {
      console.error("Erro ao parsear o objeto POKEMON_DETAILS:", e)
      return
    }

    let updatedCount = 0

    for (const [pokeName, moves] of Object.entries(eggMoves)) {
      if (!pokemonDetails[pokeName]) {
        console.warn(`Pokémon não encontrado no destino: ${pokeName}`)
        continue
      }

      const learnset = pokemonDetails[pokeName].learnset
      const newMoves = moves.filter(m => !learnset.includes(m))

      if (newMoves.length === 0) {
        console.log(`Pokémon ${pokeName} já tem todos os moves do eggMoves.`)
        continue
      }

      pokemonDetails[pokeName].learnset = learnset.concat(newMoves)
      updatedCount++
    }

    if (updatedCount === 0) {
      console.log("Nenhum move novo foi adicionado.")
      return
    }

    const newObjectText = stringifyWithSingleQuotes(pokemonDetails)
    const newContent = replacePokemonDetailsObject(content, newObjectText)

    await fs.writeFile(filePath, newContent, "utf-8")
    console.log(`Arquivo atualizado com sucesso! Moves adicionados em ${updatedCount} pokémons.`)
  } catch (err) {
    console.error("Erro inesperado:", err)
  }
}

main()
