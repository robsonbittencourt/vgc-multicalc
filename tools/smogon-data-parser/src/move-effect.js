import fs from "fs"

const movesPath = new URL("./moves.ts", import.meta.url).pathname
const moveDetailsPath = new URL("./move-details.ts", import.meta.url).pathname

console.log("🟢 Lendo arquivos...")
const movesText = fs.readFileSync(movesPath, "utf8")
const moveDetailsText = fs.readFileSync(moveDetailsPath, "utf8")

console.log("🔍 Extraindo secondary com boosts e target de moves.ts...")

function extractMoveBlocks(text) {
  const moves = {}
  const regex = /(\w+):\s*{/g
  let match

  while ((match = regex.exec(text))) {
    const name = match[1]
    let i = regex.lastIndex
    let depth = 1
    let start = i
    while (i < text.length && depth > 0) {
      if (text[i] === "{") depth++
      else if (text[i] === "}") depth--
      i++
    }
    const block = text.slice(start, i - 1)
    moves[name] = block
  }

  return moves
}

// Função que encontra o bloco secundário completo (respeitando chaves internas)
function extractNestedBlock(block, key) {
  const idx = block.indexOf(key)
  if (idx === -1) return null
  const start = block.indexOf("{", idx)
  if (start === -1) return null
  let depth = 1
  let i = start + 1
  while (i < block.length && depth > 0) {
    if (block[i] === "{") depth++
    else if (block[i] === "}") depth--
    i++
  }
  return block.slice(start, i)
}

const moveBlocks = extractMoveBlocks(movesText)
const movesMap = {}

for (const [name, block] of Object.entries(moveBlocks)) {
  let secondary = null
  const secondaryBlock = extractNestedBlock(block, "secondary")
  if (secondaryBlock && secondaryBlock.includes("boosts")) {
    try {
      const safe = secondaryBlock
        .replace(/(\w+)\s*:/g, '"$1":')
        .replace(/'/g, '"')
        .replace(/,\s*}/g, "}")
      secondary = JSON.parse(safe)
    } catch (err) {
      console.log(`⚠️ Erro parseando ${name}:`, err.message)
    }
  }

  const targetMatch = block.match(/target\s*:\s*["']([^"']+)["']/)
  const target = targetMatch ? targetMatch[1] : null

  if (secondary && secondary.boosts) {
    movesMap[name] = { secondary, target }
  }
}

console.log(`✅ Encontrados ${Object.keys(movesMap).length} golpes com boosts.`)

console.log("💾 Atualizando move-details.ts...")

let updated = 0
let newText = moveDetailsText

for (const [name, { secondary }] of Object.entries(movesMap)) {
  // substitui apenas se secondary: null
  const regex = new RegExp(`(${name}:\\s*{[\\s\\S]*?secondary:)\\s*null`, "g")
  newText = newText.replace(regex, (match, prefix) => {
    const secText = JSON.stringify(secondary, null, 0)
    updated++
    return `${prefix} ${secText}`
  })
}

fs.writeFileSync(moveDetailsPath, newText)
console.log(`✅ move-details.ts atualizado — ${updated} golpes modificados.`)
