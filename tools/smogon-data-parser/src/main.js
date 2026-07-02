import { createMovesetsFile } from "./moveset-class-generator.js"
import { createSpeedStatisticsFile } from "./speed-statistics-class-generator.js"
import { extractMetaMoves } from "./meta-moves-extractor.js"
import { topUsage } from "./top-usage.js"
import { pokemonDetailsGroup } from "./pokemon-details-group.js"
import { formatGeneratedFiles } from "./format-generated-files.js"

const date = "2026-06"
const regulation = "mb"

const steps = [
  { name: "topUsage", run: () => topUsage(date, regulation) },
  { name: "pokemonDetailsGroup", run: () => pokemonDetailsGroup(regulation) },
  { name: "createMovesetsFile", run: () => createMovesetsFile(date, regulation) },
  { name: "createSpeedStatisticsFile", run: () => createSpeedStatisticsFile(date, regulation) },
  { name: "extractMetaMoves", run: () => extractMetaMoves(date, regulation) },
  { name: "formatGeneratedFiles", run: () => formatGeneratedFiles(regulation) }
]

console.log(`🚀 Starting parser for date ${date} and regulation ${regulation.toUpperCase()}`)

for (const step of steps) {
  try {
    await step.run()
  } catch (error) {
    console.error(`❌ Falha no passo '${step.name}':`, error)
    process.exit(1)
  }
}

console.log("🏁 All steps completed successfully")
