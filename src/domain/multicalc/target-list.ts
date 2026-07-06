import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"

export function addMember(targets: Target[], pokemon: Pokemon): Target[] {
  return targets.concat(new Target(pokemon))
}

export function combineAttackers(targets: Target[], targetPokemonId: string, attackerPokemonId: string): Target[] | null {
  const targetIndex = targets.findIndex(t => t.pokemon.id === targetPokemonId)
  const target = targets[targetIndex]

  if (!target || target.secondPokemon) return null

  const activeIndex = targets.findIndex(t => t.pokemon.id === attackerPokemonId)
  const active = targets[activeIndex]

  if (!active) return null

  const combinedTarget = new Target(target.pokemon, active.pokemon)
  const remaining = targets.filter((_, index) => index !== activeIndex && index !== targetIndex)

  return [...remaining, combinedTarget]
}

export function separateAttackers(targets: Target[], pokemonId: string): Target[] {
  const index = targets.findIndex(t => t.pokemon.id === pokemonId || t.secondPokemon?.id === pokemonId)
  const target = targets[index]

  const separatedTarget = new Target(target.pokemon)
  const newTarget = new Target(target.secondPokemon!)

  return [...targets.slice(0, index), separatedTarget, newTarget, ...targets.slice(index + 1)]
}

export function excludeMetaData(targets: Target[], metaPokemon: Pokemon[]): Target[] {
  const metaLeft = [...metaPokemon]

  return [...targets]
    .reverse()
    .filter(target => {
      const index = metaLeft.findIndex(m => m.equals(target.pokemon))

      if (index !== -1) {
        metaLeft.splice(index, 1)

        return false
      }

      return true
    })
    .reverse()
}
