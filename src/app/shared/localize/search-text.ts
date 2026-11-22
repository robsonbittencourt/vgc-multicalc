const HIRAGANA = /[ぁ-ゖ]/g

const KATAKANA_OFFSET = 0x60

export function searchText(value: string): string {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(HIRAGANA, kana => String.fromCharCode(kana.charCodeAt(0) + KATAKANA_OFFSET))
}
