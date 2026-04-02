import { extractMetaMoves } from "./meta-moves-extractor.js"

const date = "2026-03"
const regulation = "i"

await topUsage(date, regulation)
await createMovesetsFile(date, regulation)
await createSpeedStatisticsFile(date, regulation)
await extractMetaMoves(date, regulation)
