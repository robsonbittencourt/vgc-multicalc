import { LocalizedDescriptions, LocalizedNames } from "@data/i18n/localized-names"
import { ABILITY_DESCRIPTIONS } from "@data/i18n/de/ability-descriptions"
import { ABILITY_NAMES } from "@data/i18n/de/abilities"
import { ITEM_DESCRIPTIONS } from "@data/i18n/de/item-descriptions"
import { ITEM_NAMES } from "@data/i18n/de/items"
import { MOVE_DESCRIPTIONS } from "@data/i18n/de/move-descriptions"
import { MOVE_NAMES } from "@data/i18n/de/moves"
import { NATURE_NAMES } from "@data/i18n/de/natures"
import { POKEMON_NAMES } from "@data/i18n/de/pokemon"
import { TYPE_NAMES } from "@data/i18n/de/types"

export const NAMES: LocalizedNames = {
  pokemon: POKEMON_NAMES,
  moves: MOVE_NAMES,
  abilities: ABILITY_NAMES,
  items: ITEM_NAMES,
  natures: NATURE_NAMES,
  types: TYPE_NAMES
}

export const DESCRIPTIONS: LocalizedDescriptions = { moves: MOVE_DESCRIPTIONS, abilities: ABILITY_DESCRIPTIONS, items: ITEM_DESCRIPTIONS }
