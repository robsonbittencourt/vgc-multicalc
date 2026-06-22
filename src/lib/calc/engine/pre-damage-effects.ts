import { EV_ITEMS } from "@lib/calc/model/items"
import { getModifiedStat } from "@lib/calc/engine/math"
import { Field, Side } from "@lib/calc/model/field"
import { Move } from "@lib/calc/model/move"
import { Pokemon } from "@lib/calc/model/pokemon"
import { getFinalSpeed } from "@lib/calc/engine/stats"
import { ItemName, RawDesc } from "@lib/calc/model/types"

export function checkForecast(pokemon: Pokemon, weather: string | undefined): void {
  if (pokemon.hasAbility("Forecast") && pokemon.named("Castform")) {
    switch (weather) {
      case "Sun":
      case "Harsh Sunshine":
        pokemon.types = ["Fire"]
        break
      case "Rain":
      case "Heavy Rain":
        pokemon.types = ["Water"]
        break
      case "Hail":
      case "Snow":
        pokemon.types = ["Ice"]
        break
      default:
        pokemon.types = ["Normal"]
    }
  }
}

export function checkItem(pokemon: Pokemon, magicRoomActive: boolean): void {
  if ((pokemon.hasAbility("Klutz") && !EV_ITEMS.includes(pokemon.item!)) || magicRoomActive) {
    pokemon.disabledItem = pokemon.item
    pokemon.item = "" as ItemName
  }
}

export function checkRawStatChanges(pokemon: Pokemon, powerTrickActive: boolean, wonderRoomActive: boolean): void {
  if (powerTrickActive) {
    ;[pokemon.rawStats.atk, pokemon.rawStats.def] = [pokemon.rawStats.def, pokemon.rawStats.atk]
  }

  if (wonderRoomActive) {
    ;[pokemon.rawStats.def, pokemon.rawStats.spd] = [pokemon.rawStats.spd, pokemon.rawStats.def]
  }
}

export function checkIntimidate(source: Pokemon, target: Pokemon): void {
  const blocked = target.hasAbility("Clear Body", "White Smoke", "Hyper Cutter", "Full Metal Body") || target.hasAbility("Inner Focus", "Own Tempo", "Oblivious", "Scrappy") || target.hasItem("Clear Amulet")

  if (source.hasAbility("Intimidate") && source.abilityOn && !blocked) {
    if (target.hasAbility("Contrary", "Defiant", "Guard Dog")) {
      target.boosts.atk = Math.min(6, target.boosts.atk + 1)
    } else if (target.hasAbility("Simple")) {
      target.boosts.atk = Math.max(-6, target.boosts.atk - 2)
    } else {
      target.boosts.atk = Math.max(-6, target.boosts.atk - 1)
    }

    if (target.hasAbility("Competitive")) {
      target.boosts.spa = Math.min(6, target.boosts.spa + 2)
    }
  }
}

export function checkInfiltrator(pokemon: Pokemon, affectedSide: Side): void {
  if (pokemon.hasAbility("Infiltrator")) {
    affectedSide.isReflect = false
    affectedSide.isLightScreen = false
    affectedSide.isAuroraVeil = false
  }
}

export function checkMultihitBoost(attacker: Pokemon, defender: Pokemon, move: Move, field: Field, description: RawDesc, attackerUsedItem = false, defenderUsedItem = false): [boolean, boolean] {
  if (move.named("Gyro Ball", "Electro Ball") && defender.hasAbility("Gooey", "Tangling Hair")) {
    if (attacker.hasItem("White Herb") && !attackerUsedItem) {
      description.attackerItem = attacker.item
      attackerUsedItem = true
    } else {
      attacker.boosts.spe = Math.max(attacker.boosts.spe - 1, -6)
      attacker.stats.spe = getFinalSpeed(attacker, field, field.attackerSide)
      description.defenderAbility = defender.ability
    }
  } else if (move.named("Power-Up Punch")) {
    attacker.boosts.atk = Math.min(attacker.boosts.atk + 1, 6)
    attacker.stats.atk = getModifiedStat(attacker.rawStats.atk, attacker.boosts.atk)
  }

  const atkSimple = attacker.hasAbility("Simple") ? 2 : 1
  const defSimple = defender.hasAbility("Simple") ? 2 : 1

  if (!defenderUsedItem && ((defender.hasItem("Luminous Moss") && move.hasType("Water")) || (defender.hasItem("Maranga Berry") && move.category === "Special") || (defender.hasItem("Kee Berry") && move.category === "Physical"))) {
    const defStat = defender.hasItem("Kee Berry") ? "def" : "spd"

    if (attacker.hasAbility("Unaware")) {
      description.attackerAbility = attacker.ability
    } else {
      if (defender.hasAbility("Contrary")) {
        description.defenderAbility = defender.ability

        if (defender.hasItem("White Herb")) {
          description.defenderItem = defender.item
        } else {
          defender.boosts[defStat] = Math.max(-6, defender.boosts[defStat] - defSimple)
        }
      } else {
        defender.boosts[defStat] = Math.min(6, defender.boosts[defStat] + defSimple)
      }

      if (defSimple === 2) description.defenderAbility = defender.ability
      defender.stats[defStat] = getModifiedStat(defender.rawStats[defStat], defender.boosts[defStat])
      description.defenderItem = defender.item
      defenderUsedItem = true
    }
  }

  if (defender.hasAbility("Seed Sower")) {
    field.terrain = "Grassy"
  }

  if (defender.hasAbility("Sand Spit")) {
    field.weather = "Sand"
  }

  if (defender.hasAbility("Stamina")) {
    if (attacker.hasAbility("Unaware")) {
      description.attackerAbility = attacker.ability
    } else {
      defender.boosts.def = Math.min(defender.boosts.def + 1, 6)
      defender.stats.def = getModifiedStat(defender.rawStats.def, defender.boosts.def)
      description.defenderAbility = defender.ability
    }
  } else if (defender.hasAbility("Water Compaction") && move.hasType("Water")) {
    if (attacker.hasAbility("Unaware")) {
      description.attackerAbility = attacker.ability
    } else {
      defender.boosts.def = Math.min(defender.boosts.def + 2, 6)
      defender.stats.def = getModifiedStat(defender.rawStats.def, defender.boosts.def)
      description.defenderAbility = defender.ability
    }
  } else if (defender.hasAbility("Weak Armor")) {
    if (attacker.hasAbility("Unaware")) {
      description.attackerAbility = attacker.ability
    } else {
      if (defender.hasItem("White Herb") && !defenderUsedItem && defender.boosts.def === 0) {
        description.defenderItem = defender.item
        defenderUsedItem = true
      } else {
        defender.boosts.def = Math.max(defender.boosts.def - 1, -6)
        defender.stats.def = getModifiedStat(defender.rawStats.def, defender.boosts.def)
      }

      description.defenderAbility = defender.ability
    }

    defender.boosts.spe = Math.min(defender.boosts.spe + 2, 6)
    defender.stats.spe = getFinalSpeed(defender, field, field.defenderSide)
  }

  if (move.dropsStats) {
    if (attacker.hasAbility("Unaware")) {
      description.attackerAbility = attacker.ability
    } else {
      const stat = move.category === "Special" ? "spa" : "atk"
      let boosts = attacker.boosts[stat]

      if (attacker.hasAbility("Contrary")) {
        boosts = Math.min(6, boosts + move.dropsStats)
        description.attackerAbility = attacker.ability
      } else {
        boosts = Math.max(-6, boosts - move.dropsStats * atkSimple)
      }

      if (atkSimple === 2) description.attackerAbility = attacker.ability

      if (attacker.hasItem("White Herb") && attacker.boosts[stat] < 0 && !attackerUsedItem) {
        boosts += move.dropsStats * atkSimple
        description.attackerItem = attacker.item
        attackerUsedItem = true
      }

      attacker.boosts[stat] = boosts
      attacker.stats[stat] = getModifiedStat(attacker.rawStats[stat], attacker.boosts[stat])
    }
  }

  if (defender.hasAbility("Mummy", "Wandering Spirit", "Lingering Aroma") && move.flags.contact) {
    const oldAttackerAbility = attacker.ability

    attacker.ability = defender.ability

    if (description.attackerAbility) {
      description.defenderAbility = defender.ability
    }

    if (defender.hasAbility("Wandering Spirit")) {
      defender.ability = oldAttackerAbility
    }
  }

  return [attackerUsedItem, defenderUsedItem]
}
