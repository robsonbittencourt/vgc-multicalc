import { PokemonState } from "@store/calc-store"
import { Move } from "@multicalc/model"
import { TypeName } from "@data/types"

export type AddedTypeOffer = { type: TypeName; optional: boolean }

export type AddedTypeOffers = ReadonlyMap<string, AddedTypeOffer>

export type AddedTypeSides = { team: PokemonState[]; opponents: PokemonState[] }

export function simpleCalcAddedTypeOffers(left: PokemonState, right: PokemonState): AddedTypeOffers {
  const offers = new Map<string, AddedTypeOffer>()

  offerTo(offers, left, [right], false)
  offerTo(offers, right, [left], false)

  return offers
}

function offerTo(offers: Map<string, AddedTypeOffer>, source: PokemonState, receivers: PokemonState[], optional: boolean) {
  const type = addedTypeBySource(source)

  if (!type) return

  for (const receiver of receivers) {
    if (receiver.id !== source.id && !offers.has(receiver.id)) {
      offers.set(receiver.id, { type, optional })
    }
  }
}

function addedTypeBySource(source: PokemonState): TypeName | undefined {
  const moveName = source.typeAddingMove

  if (!moveName || !source.moveSet.some(move => move.name === moveName)) return undefined

  return new Move(moveName).addedTypeOnTarget()
}

export function multiCalcAddedTypeOffers(sides: AddedTypeSides): AddedTypeOffers {
  const offers = new Map<string, AddedTypeOffer>()

  for (const source of sides.team) {
    offerTo(offers, source, sides.opponents, false)
    offerTo(offers, source, sides.team, true)
  }

  for (const source of sides.opponents) {
    offerTo(offers, source, sides.team, false)
  }

  return offers
}

export function appliedAddedType(state: PokemonState, offer: AddedTypeOffer | undefined): TypeName | undefined {
  if (!offer) return undefined

  if (offer.optional && !state.addedTypeOn) return undefined

  return offer.type
}

export function sameAddedTypeOffers(first: AddedTypeOffers, second: AddedTypeOffers): boolean {
  if (first.size !== second.size) return false

  return [...first].every(([id, offer]) => {
    const other = second.get(id)

    return other !== undefined && other.type === offer.type && other.optional === offer.optional
  })
}
