import { toID } from "@data/id"
import { getPokemonMoveset } from "@data/pokemon-moveset"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"

export type ImportValidationResult = {
  pokemon: Pokemon[]
  removedCount: number
  hadInvalidMoves: boolean
  hadInvalidItems: boolean
}

export function normalizeName(name: string): string {
  return name.toLowerCase().replace(/ /g, "").replace(/-/g, "").replace(/'/g, "")
}

export function validateImport(parsedList: Pokemon[], validItems: string[], validPokemonIds: string[]): ImportValidationResult {
  const allowedIds = new Set(validPokemonIds)
  const validList = parsedList.filter(p => allowedIds.has(toID(p.name)))
  const removedCount = parsedList.length - validList.length

  const validated = validList.map(p => validateAndClean(p, validItems))

  return {
    pokemon: validated.map(v => v.pokemon),
    removedCount,
    hadInvalidMoves: validated.some(v => v.hadInvalidMoves),
    hadInvalidItems: validated.some(v => v.hadInvalidItem)
  }
}

function validateAndClean(pokemon: Pokemon, validItems: string[]): { pokemon: Pokemon; hadInvalidMoves: boolean; hadInvalidItem: boolean } {
  let hadInvalidMoves = false
  let hadInvalidItem = false
  let cleanedPokemon = pokemon

  const validLearnset = getPokemonMoveset(pokemon.name)!.learnset!.map(normalizeName)
  const cleanedMoves: Move[] = []

  for (const move of pokemon.moveSet.moves) {
    const moveName = normalizeName(move.name)

    if (!moveName || validLearnset.includes(moveName)) {
      cleanedMoves.push(move)
    } else {
      cleanedMoves.push(new Move(""))
      hadInvalidMoves = true
    }
  }

  const newMoveSet = new MoveSet(cleanedMoves[0], cleanedMoves[1], cleanedMoves[2], cleanedMoves[3], pokemon.moveSet.activeMovePosition)
  cleanedPokemon = cleanedPokemon.clone({ moveSet: newMoveSet })

  const normalizedItem = pokemon.item.toLowerCase().replace(/ /g, "").replace(/'/g, "")

  if (!validItems.includes(normalizedItem)) {
    cleanedPokemon = cleanedPokemon.clone({ item: "" })
    hadInvalidItem = true
  }

  return { pokemon: cleanedPokemon, hadInvalidMoves, hadInvalidItem }
}
