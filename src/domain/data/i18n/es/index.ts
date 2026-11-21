import { LocalizedDescriptions, LocalizedNames } from "@data/i18n/localized-names"
import { ABILITY_DESCRIPTIONS } from "@data/i18n/es/ability-descriptions"
import { ABILITY_NAMES } from "@data/i18n/es/abilities"
import { ITEM_DESCRIPTIONS } from "@data/i18n/es/item-descriptions"
import { ITEM_NAMES } from "@data/i18n/es/items"
import { MOVE_DESCRIPTIONS } from "@data/i18n/es/move-descriptions"
import { MOVE_NAMES } from "@data/i18n/es/moves"
import { NATURE_NAMES } from "@data/i18n/es/natures"
import { POKEMON_NAMES } from "@data/i18n/es/pokemon"
import { TYPE_NAMES } from "@data/i18n/es/types"

export const NAMES: LocalizedNames = {
  pokemon: POKEMON_NAMES,
  moves: MOVE_NAMES,
  abilities: ABILITY_NAMES,
  items: ITEM_NAMES,
  natures: NATURE_NAMES,
  types: TYPE_NAMES
}

export const DESCRIPTIONS: LocalizedDescriptions = { moves: MOVE_DESCRIPTIONS, abilities: ABILITY_DESCRIPTIONS, items: ITEM_DESCRIPTIONS }
