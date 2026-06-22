import { toID } from "@lib/calc/engine/data-util"
import { Item, Nature, SpeciesData, Type, MoveData } from "@lib/calc/model/types"
import { ITEMS } from "./items"
import { MOVES } from "./moves"
import { NATURES } from "./natures"
import { SPECIES } from "./species"
import { TYPES } from "./types"

export const getSpecies = (name: string): SpeciesData | undefined => SPECIES[toID(name)]
export const getMove = (name: string): MoveData | undefined => MOVES[toID(name)]
export const getItem = (name: string): Item | undefined => ITEMS[toID(name)]
export const getNature = (name: string): Nature | undefined => NATURES[toID(name)]
export const getType = (name: string): Type | undefined => TYPES[toID(name)]
