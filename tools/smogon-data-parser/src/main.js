import { createMovesetsFile } from "./moveset-class-generator.js"
import { createSpeedStatisticsFile } from "./speed-statistics-class-generator.js"
import { extractMetaMoves } from "./meta-moves-extractor.js"
import { topUsage } from "./top-usage.js"
import { pokemonDetailsGroup } from "./pokemon-details-group.js"

const date = "2026-04"
const regulation = "ma"

await topUsage(date, regulation)
await pokemonDetailsGroup(regulation)
await createMovesetsFile(date, regulation)
await createSpeedStatisticsFile(date, regulation)
await extractMetaMoves(date, regulation)
