import { createMovesetsFile } from "./moveset-class-generator.js"
import { createSpeedStatisticsFile } from "./speed-statistics-class-generator.js"
import { extractMetaMoves } from "./meta-moves-extractor.js"
import { topUsage } from "./top-usage.js"
import { pokemonDetailsGroup } from "./pokemon-details-group.js"
import { formatGeneratedFiles } from "./format-generated-files.js"
import { downloadSmogonFiles, deleteSmogonFiles } from "./smogon-files.js"

const date = "2026-09"
const regulation = "mc"

let files

const steps = [
  { name: "downloadSmogonFiles", run: async () => (files = await downloadSmogonFiles(date, regulation)) },
  { name: "topUsage", run: () => topUsage(files, regulation) },
  { name: "pokemonDetailsGroup", run: () => pokemonDetailsGroup(regulation) },
  { name: "createMovesetsFile", run: () => createMovesetsFile(files, date, regulation) },
  { name: "createSpeedStatisticsFile", run: () => createSpeedStatisticsFile(files, date, regulation) },
  { name: "extractMetaMoves", run: () => extractMetaMoves(files, date, regulation) },
  { name: "formatGeneratedFiles", run: () => formatGeneratedFiles(regulation) }
]

console.log(`🚀 Starting parser for date ${date} and regulation ${regulation.toUpperCase()}`)

let failed = false

for (const step of steps) {
  try {
    await step.run()
  } catch (error) {
    console.error(`❌ Falha no passo '${step.name}':`, error)
    failed = true
    break
  }
}

if (files) deleteSmogonFiles(files)

if (failed) process.exit(1)

console.log("🏁 All steps completed successfully")
