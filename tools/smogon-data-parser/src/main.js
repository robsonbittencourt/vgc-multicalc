import { createMovesetsFile } from "./moveset-class-generator.js"
import { createSpeedStatisticsFile } from "./speed-statistics-class-generator.js"
import { topUsage } from "./top-usage.js"

const date = "2025-03"
const regulation = "g"

await topUsage(date, regulation)
await createMovesetsFile(date, regulation)
await createSpeedStatisticsFile(date, regulation)
