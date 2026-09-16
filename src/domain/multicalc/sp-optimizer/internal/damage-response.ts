import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"

const RECOVERY_BERRIES = ["Sitrus Berry", "Oran Berry", "Figy Berry", "Wiki Berry", "Mago Berry", "Aguav Berry", "Iapapa Berry", "Enigma Berry"]

const BERRY_BLOCKING_ABILITIES = ["Unnerve", "As One (Glastrier)", "As One (Spectrier)"]

export function respondsToDamage(defender: Pokemon, attacker: Pokemon, field: Field): boolean {
  if (!RECOVERY_BERRIES.includes(defender.item)) {
    return false
  }

  return !berriesAreBlocked(attacker, field)
}

function berriesAreBlocked(attacker: Pokemon, field: Field): boolean {
  if (field.isUnnerve) {
    return true
  }

  return BERRY_BLOCKING_ABILITIES.some(ability => attacker.hasAbility(ability))
}
