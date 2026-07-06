import { MOVESETS } from "@data/moveset-data"
import { getPokemonData } from "@data/pokemon-data"
import { getPokemonMoveset } from "@data/pokemon-moveset"
import { toPokemon } from "@adapters"
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

export function validateImport(parsedList: Pokemon[], validItems: string[]): ImportValidationResult {
  const processedList = parsedList.map(applyDefaultEvsWhenEmpty)

  const validList = processedList.filter(p => p.name in MOVESETS)
  const removedCount = processedList.length - validList.length

  const validated = validList.map(p => validateAndClean(p, validItems))

  return {
    pokemon: validated.map(v => v.pokemon),
    removedCount,
    hadInvalidMoves: validated.some(v => v.hadInvalidMoves),
    hadInvalidItems: validated.some(v => v.hadInvalidItem)
  }
}

function applyDefaultEvsWhenEmpty(pokemon: Pokemon): Pokemon {
  const allZero = Object.values(pokemon.evs).every(ev => ev === 0)

  if (allZero) {
    const metadata = toPokemon(pokemon.name, MOVESETS)

    return pokemon.clone({ nature: metadata.nature, evs: metadata.evs })
  }

  return pokemon
}

function validateAndClean(pokemon: Pokemon, validItems: string[]): { pokemon: Pokemon; hadInvalidMoves: boolean; hadInvalidItem: boolean } {
  if (!getPokemonData(pokemon.name)) {
    return { pokemon, hadInvalidMoves: false, hadInvalidItem: false }
  }

  let hadInvalidMoves = false
  let hadInvalidItem = false
  let cleanedPokemon = pokemon

  const learnset = getPokemonMoveset(pokemon.name)?.learnset

  if (learnset) {
    const validLearnset = learnset.map(normalizeName)
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
  }

  if (pokemon.item && pokemon.item !== "") {
    const normalizedItem = pokemon.item.toLowerCase().replace(/ /g, "").replace(/'/g, "")

    if (!validItems.includes(normalizedItem)) {
      cleanedPokemon = cleanedPokemon.clone({ item: "" })
      hadInvalidItem = true
    }
  }

  return { pokemon: cleanedPokemon, hadInvalidMoves, hadInvalidItem }
}
