import { createMovesetsFile } from "./moveset-class-generator.js"
import { createSpeedStatisticsFile } from "./speed-statistics-class-generator.js"
import { topUsage } from "./top-usage.js"

const date = "2025-06"
const regulation = "i"

await topUsage(date, regulation)
await createMovesetsFile(date, regulation)
await createSpeedStatisticsFile(date, regulation)
