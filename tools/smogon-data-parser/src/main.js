import { createSpeedStatisticsFile } from "./speed-statistics-class-generator.js"

const date = "2025-07"
const regulation = "i"

await topUsage(date, regulation)
await createMovesetsFile(date, regulation)
await createSpeedStatisticsFile(date, regulation)
