import { getPokemonMoveset } from "@data/pokemon-moveset"
import { Move, MoveSet, Pokemon } from "@multicalc/model"

export type ImportValidationResult = {
  pokemon: Pokemon[]
  hadInvalidMoves: boolean
}

export function normalizeName(name: string): string {
  return name.toLowerCase().replace(/ /g, "").replace(/-/g, "").replace(/'/g, "")
}

export function validateImport(parsedList: Pokemon[]): ImportValidationResult {
  const validated = parsedList.map(removeUnlearnedMoves)

  return {
    pokemon: validated.map(v => v.pokemon),
    hadInvalidMoves: validated.some(v => v.hadInvalidMoves)
  }
}

function removeUnlearnedMoves(pokemon: Pokemon): { pokemon: Pokemon; hadInvalidMoves: boolean } {
  let hadInvalidMoves = false

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

  return { pokemon: pokemon.clone({ moveSet: newMoveSet }), hadInvalidMoves }
}

export function importWarningMessage(result: ImportValidationResult): string | null {
  return result.hadInvalidMoves ? "Some moves are not learned by the Pokémon and were removed" : null
}
