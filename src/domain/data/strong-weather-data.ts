import { Weather } from "@data/types"

const STRONG_WEATHER_BY_ABILITY: Record<string, Weather> = {
  "Primordial Sea": "Heavy Rain",
  "Desolate Land": "Harsh Sunshine",
  "Delta Stream": "Strong Winds"
}

export function getStrongWeather(ability: string | undefined): Weather | undefined {
  return STRONG_WEATHER_BY_ABILITY[ability ?? ""]
}
