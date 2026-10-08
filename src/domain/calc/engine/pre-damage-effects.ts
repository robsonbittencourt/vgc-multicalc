import { dropTargetStat, landsTargetDefensiveDrop } from "@calc/engine/defensive-boost-ladder"
import { effectiveSelfStatChange, nextSelfBoost } from "@calc/engine/self-stat-change"
import { EV_ITEMS } from "@calc/model/items"
import { getModifiedStat } from "@calc/engine/math"
import { Field, Side } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { getFinalSpeed } from "@calc/engine/stats"
import { ItemName, RawDesc } from "@data/types"

export function checkForecast(pokemon: Pokemon, weather: string | undefined): void {
  if (pokemon.hasAbility("Forecast") && pokemon.named("Castform")) {
    switch (weather) {
      case "Sun":
        pokemon.types = ["Fire"]
        break
      case "Rain":
        pokemon.types = ["Water"]
        break
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
  const blocked = blocksStatDrop(target) || target.hasAbility("Hyper Cutter") || target.hasAbility("Inner Focus", "Own Tempo", "Oblivious", "Scrappy")

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

function blocksStatDrop(target: Pokemon): boolean {
  return target.hasAbility("Clear Body", "White Smoke", "Full Metal Body") || target.hasItem("Clear Amulet")
}

export function checkInfiltrator(pokemon: Pokemon, affectedSide: Side): void {
  if (pokemon.hasAbility("Infiltrator")) {
    affectedSide.isReflect = false
    affectedSide.isLightScreen = false
    affectedSide.isAuroraVeil = false
  }
}

type UsedItems = { attacker: boolean; defender: boolean }

export function checkMultihitBoost(attacker: Pokemon, defender: Pokemon, move: Move, field: Field, description: RawDesc, attackerUsedItem = false, defenderUsedItem = false): [boolean, boolean] {
  const usedItems: UsedItems = { attacker: attackerUsedItem, defender: defenderUsedItem }

  applyMultihitSpeedOrAtkReaction(attacker, defender, move, field, description)
  applyDefensiveBerryBoost(attacker, defender, description, usedItems, defender.hasItem("Luminous Moss") && move.hasType("Water"))
  applyFieldSetters(defender, field)
  applyContactDefenseBoost(attacker, defender, move, field, description)
  applyTargetDefensiveDrop(attacker, defender, move, field, description)
  applySelfStatChange(attacker, move, description)
  applyAbilitySwap(attacker, defender, move, description)

  return [usedItems.attacker, usedItems.defender]
}

export function applyAfterMove(attacker: Pokemon, defender: Pokemon, move: Move, field: Field, description: RawDesc, attackerUsedItem: boolean, defenderUsedItem: boolean): [boolean, boolean] {
  const usedItems: UsedItems = { attacker: attackerUsedItem, defender: defenderUsedItem }
  const eatsBerry = (defender.hasItem("Kee Berry") && move.category === "Physical") || (defender.hasItem("Maranga Berry") && move.category === "Special")

  applyDefensiveBerryBoost(attacker, defender, description, usedItems, eatsBerry)

  const attackerUsed = usedItems.attacker || restoreWithWhiteHerb(attacker, field, field.attackerSide)
  const defenderUsed = usedItems.defender || restoreWithWhiteHerb(defender, field, field.defenderSide)

  if (attackerUsed !== usedItems.attacker) description.attackerItem = attacker.item
  if (defenderUsed !== usedItems.defender) description.defenderItem = defender.item

  return [attackerUsed, defenderUsed]
}

function restoreWithWhiteHerb(pokemon: Pokemon, field: Field, side: Side): boolean {
  const lowered = (["atk", "def", "spa", "spd", "spe"] as const).filter(stat => pokemon.boosts[stat] < 0)

  if (lowered.length === 0 || !pokemon.hasItem("White Herb")) return false

  for (const stat of lowered) {
    pokemon.boosts[stat] = 0
    pokemon.stats[stat] = stat === "spe" ? getFinalSpeed(pokemon, field, side) : getModifiedStat(pokemon.rawStats[stat], 0)
  }

  return true
}

function applyMultihitSpeedOrAtkReaction(attacker: Pokemon, defender: Pokemon, move: Move, field: Field, description: RawDesc): void {
  if (move.named("Gyro Ball", "Electro Ball") && move.flags.contact && defender.hasAbility("Gooey", "Tangling Hair")) {
    attacker.boosts.spe = Math.max(attacker.boosts.spe - 1, -6)
    attacker.stats.spe = getFinalSpeed(attacker, field, field.attackerSide)
    description.defenderAbility = defender.ability
  }
}

function applyDefensiveBerryBoost(attacker: Pokemon, defender: Pokemon, description: RawDesc, usedItems: UsedItems, triggers: boolean): void {
  if (usedItems.defender || !triggers) {
    return
  }

  if (attacker.hasAbility("Unaware")) {
    description.attackerAbility = attacker.ability

    return
  }

  const defSimple = defender.hasAbility("Simple") ? 2 : 1
  const defStat = defender.hasItem("Kee Berry") ? "def" : "spd"

  if (defender.hasAbility("Contrary")) {
    description.defenderAbility = defender.ability
    defender.boosts[defStat] = Math.max(-6, defender.boosts[defStat] - defSimple)
  } else {
    defender.boosts[defStat] = Math.min(6, defender.boosts[defStat] + defSimple)
  }

  if (defSimple === 2) description.defenderAbility = defender.ability
  defender.stats[defStat] = getModifiedStat(defender.rawStats[defStat], defender.boosts[defStat])
  description.defenderItem = defender.item
  usedItems.defender = true
}

function applyFieldSetters(defender: Pokemon, field: Field): void {
  if (defender.hasAbility("Seed Sower")) {
    field.terrain = "Grassy"
  }

  if (defender.hasAbility("Sand Spit")) {
    field.weather = "Sand"
  }
}

function applyContactDefenseBoost(attacker: Pokemon, defender: Pokemon, move: Move, field: Field, description: RawDesc): void {
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
      defender.boosts.def = Math.max(defender.boosts.def - 1, -6)
      defender.stats.def = getModifiedStat(defender.rawStats.def, defender.boosts.def)

      description.defenderAbility = defender.ability
    }

    defender.boosts.spe = Math.min(defender.boosts.spe + 2, 6)
    defender.stats.spe = getFinalSpeed(defender, field, field.defenderSide)
  }
}

function applyTargetDefensiveDrop(attacker: Pokemon, defender: Pokemon, move: Move, field: Field, description: RawDesc): void {
  const drop = move.targetDefensiveDrop

  if (!drop || !landsTargetDefensiveDrop(attacker, defender, move, field)) {
    return
  }

  if (defender.hasAbility("Contrary", "Simple")) {
    description.defenderAbility = defender.ability
  }

  defender.boosts[drop.stat] = dropTargetStat(defender, drop.stages, defender.boosts[drop.stat])
  defender.stats[drop.stat] = getModifiedStat(defender.rawStats[drop.stat], defender.boosts[drop.stat])
}

function applySelfStatChange(attacker: Pokemon, move: Move, description: RawDesc): void {
  const change = effectiveSelfStatChange(attacker, move)

  if (!change) {
    return
  }

  if (attacker.hasAbility("Contrary", "Simple")) {
    description.attackerAbility = attacker.ability
  }

  attacker.boosts[change.stat] = nextSelfBoost(attacker, change, attacker.boosts[change.stat])
  attacker.stats[change.stat] = getModifiedStat(attacker.rawStats[change.stat], attacker.boosts[change.stat])
}

function applyAbilitySwap(attacker: Pokemon, defender: Pokemon, move: Move, description: RawDesc): void {
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
}
