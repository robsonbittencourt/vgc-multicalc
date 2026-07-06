import { getItemData } from "@data/item-data"
import { getBasePokemonNameFromItem, MEGA_FORM_MAPPING, MEGA_FORM_REVERSE_MAPPING } from "@data/mega-stone-data"

export function isMegaStone(item: string): boolean {
  return getItemData(item)?.isMegaStone ?? false
}

export function isMega(pokemonName: string): boolean {
  return pokemonName.includes("-Mega-") || pokemonName.endsWith("-Mega")
}

export function getBaseName(megaName: string): string {
  return MEGA_FORM_REVERSE_MAPPING[megaName] ?? megaName.replace(/-Mega-[A-Z]$/, "").replace(/-Mega$/, "")
}

export function extractMegaStoneLetter(item: string): string | null {
  const match = item.match(/([A-Z])$/)

  return match ? match[1] : null
}

export function getMegaFormName(pokemonName: string, item: string): string {
  const megaStoneLetter = extractMegaStoneLetter(item)

  return MEGA_FORM_MAPPING[pokemonName] ?? (megaStoneLetter ? pokemonName + "-Mega-" + megaStoneLetter : pokemonName + "-Mega")
}

export function isMegaStoneCompatible(pokemonName: string, item: string): boolean {
  if (!isMegaStone(item)) return false

  const itemBaseName = getBasePokemonNameFromItem(item)

  if (!itemBaseName) return false

  const reverseMappedName = MEGA_FORM_REVERSE_MAPPING[pokemonName] || pokemonName
  const baseFormName = reverseMappedName.replace(/-Mega-[A-Z]?$/, "").replace(/-Mega$/, "")
  const baseNameMatches = baseFormName === itemBaseName || baseFormName.startsWith(itemBaseName + "-")

  if (!baseNameMatches) return false

  const megaStoneLetter = extractMegaStoneLetter(item)
  const expectedMegaForm = MEGA_FORM_MAPPING[baseFormName] ?? MEGA_FORM_MAPPING[itemBaseName] ?? (megaStoneLetter ? `${baseFormName}-Mega-${megaStoneLetter}` : `${baseFormName}-Mega`)

  return pokemonName === baseFormName || pokemonName === expectedMegaForm
}
