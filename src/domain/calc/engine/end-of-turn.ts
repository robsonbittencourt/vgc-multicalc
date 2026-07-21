import { Field, Side } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { isGrounded } from "@calc/engine/stats"
import { getType } from "@calc/engine/types"

const TRAPPING = ["Bind", "Clamp", "Fire Spin", "Infestation", "Magma Storm", "Sand Tomb", "Thunder Cage", "Whirlpool", "Wrap"]

export function getHazards(defender: Pokemon, defenderSide: Side) {
  let damage = 0
  const texts: string[] = []

  if (defender.hasItem("Heavy-Duty Boots")) {
    return { damage, texts }
  }

  if (defenderSide.isSR && !defender.hasAbility("Magic Guard", "Mountaineer")) {
    const rockType = getType("rock")!
    const effectiveness = defender.teraType && defender.teraType !== "Stellar" ? rockType.effectiveness[defender.teraType]! : rockType.effectiveness[defender.types[0]]! * (defender.types[1] ? rockType.effectiveness[defender.types[1]]! : 1)
    damage += Math.floor((effectiveness * defender.maxHp()) / 8)
    texts.push("Stealth Rock")
  }

  const spikesDivisor = [0, 8, 6, 4]

  if (!defender.hasType("Flying") && !defender.hasAbility("Magic Guard", "Levitate", "Eelevate") && !defender.hasItem("Air Balloon")) {
    const layers = defenderSide.spikes

    if (layers >= 1 && layers <= 3) {
      damage += Math.floor(defender.maxHp() / spikesDivisor[layers])
      texts.push(`${layers} ${layers === 1 ? "layer" : "layers"} of Spikes`)
    }
  }

  return { damage, texts }
}

export function getEndOfTurn(attacker: Pokemon, defender: Pokemon, move: Move, field: Field) {
  let damage = 0
  const texts = []

  const loseItem = move.named("Knock Off") && !defender.hasAbility("Sticky Hold")
  const healBlock = move.named("Psychic Noise") && !(attacker.hasAbility("Sheer Force") || defender.hasItem("Covert Cloak") || defender.hasAbility("Shield Dust", "Aroma Veil"))

  if (field.hasWeather("Sun")) {
    if (defender.hasAbility("Dry Skin", "Solar Power")) {
      damage -= Math.floor(defender.maxHp() / 8)
      texts.push(defender.ability + " damage")
    }
  } else if (field.hasWeather("Rain") && !healBlock) {
    if (defender.hasAbility("Dry Skin")) {
      damage += Math.floor(defender.maxHp() / 8)
      texts.push("Dry Skin recovery")
    } else if (defender.hasAbility("Rain Dish")) {
      damage += Math.floor(defender.maxHp() / 16)
      texts.push("Rain Dish recovery")
    }
  } else if (field.hasWeather("Sand")) {
    if (!defender.hasType("Rock", "Ground", "Steel") && !defender.hasAbility("Magic Guard", "Overcoat", "Sand Force", "Sand Rush", "Sand Veil") && !defender.hasItem("Safety Goggles")) {
      damage -= Math.floor(defender.maxHp() / 16)
      texts.push("sandstorm damage")
    }
  } else if (field.hasWeather("Hail", "Snow")) {
    if (defender.hasAbility("Ice Body") && !healBlock) {
      damage += Math.floor(defender.maxHp() / 16)
      texts.push("Ice Body recovery")
    } else if (!defender.hasType("Ice") && !defender.hasAbility("Magic Guard", "Overcoat", "Snow Cloak") && !defender.hasItem("Safety Goggles") && field.hasWeather("Hail")) {
      damage -= Math.floor(defender.maxHp() / 16)
      texts.push("hail damage")
    }
  }

  if (defender.hasItem("Leftovers") && !loseItem && !healBlock) {
    damage += Math.floor(defender.maxHp() / 16)
    texts.push("Leftovers recovery")
  } else if (defender.hasItem("Black Sludge") && !loseItem) {
    if (defender.hasType("Poison")) {
      if (!healBlock) {
        damage += Math.floor(defender.maxHp() / 16)
        texts.push("Black Sludge recovery")
      }
    } else if (!defender.hasAbility("Magic Guard", "Klutz")) {
      damage -= Math.floor(defender.maxHp() / 8)
      texts.push("Black Sludge damage")
    }
  } else if (defender.hasItem("Sticky Barb") && !loseItem && !defender.hasAbility("Magic Guard", "Klutz")) {
    damage -= Math.floor(defender.maxHp() / 8)
    texts.push("Sticky Barb damage")
  }

  if (field.defenderSide.isSeeded) {
    if (!defender.hasAbility("Magic Guard")) {
      damage -= Math.floor(defender.maxHp() / 8)
      texts.push("Leech Seed damage")
    }
  }

  if (field.attackerSide.isSeeded && !attacker.hasAbility("Magic Guard")) {
    let recovery = Math.floor(attacker.maxHp() / 8)

    if (defender.hasItem("Big Root")) {
      recovery = Math.trunc((recovery * 5324) / 4096)
    }

    if (attacker.hasAbility("Liquid Ooze")) {
      damage -= recovery
      texts.push("Liquid Ooze damage")
    } else if (!healBlock) {
      damage += recovery
      texts.push("Leech Seed recovery")
    }
  }

  if (field.hasTerrain("Grassy")) {
    if (isGrounded(defender, field) && !healBlock) {
      damage += Math.floor(defender.maxHp() / 16)
      texts.push("Grassy Terrain recovery")
    }
  }

  if (defender.hasStatus("psn")) {
    if (defender.hasAbility("Poison Heal")) {
      if (!healBlock) {
        damage += Math.floor(defender.maxHp() / 8)
        texts.push("Poison Heal")
      }
    } else if (!defender.hasAbility("Magic Guard")) {
      damage -= Math.floor(defender.maxHp() / 8)
      texts.push("poison damage")
    }
  } else if (defender.hasStatus("tox")) {
    if (defender.hasAbility("Poison Heal")) {
      if (!healBlock) {
        damage += Math.floor(defender.maxHp() / 8)
        texts.push("Poison Heal")
      }
    } else if (!defender.hasAbility("Magic Guard")) {
      texts.push("toxic damage")
    }
  } else if (defender.hasStatus("brn")) {
    if (defender.hasAbility("Heatproof")) {
      damage -= Math.floor(defender.maxHp() / 32)
      texts.push("reduced burn damage")
    } else if (!defender.hasAbility("Magic Guard")) {
      damage -= Math.floor(defender.maxHp() / 16)
      texts.push("burn damage")
    }
  } else if ((defender.hasStatus("slp") || defender.hasAbility("Comatose")) && attacker.hasAbility("Bad Dreams") && !defender.hasAbility("Magic Guard")) {
    damage -= Math.floor(defender.maxHp() / 8)
    texts.push("Bad Dreams")
  }

  if (!defender.hasAbility("Magic Guard") && TRAPPING.includes(move.name)) {
    if (attacker.hasItem("Binding Band")) {
      damage -= Math.floor(defender.maxHp() / 6)
      texts.push("trapping damage")
    } else {
      damage -= Math.floor(defender.maxHp() / 8)
      texts.push("trapping damage")
    }
  }

  if (field.defenderSide.isSaltCured && !defender.hasAbility("Magic Guard")) {
    const isWaterOrSteel = defender.hasType("Water", "Steel")
    const divisor = isWaterOrSteel ? 8 : 16
    damage -= Math.floor(defender.maxHp() / divisor)
    texts.push("Salt Cure")
  }

  if (!defender.hasType("Fire") && !defender.hasAbility("Magic Guard") && move.named("Fire Pledge (Grass Pledge Boosted)", "Grass Pledge (Fire Pledge Boosted)")) {
    damage -= Math.floor(defender.maxHp() / 8)
    texts.push("Sea of Fire damage")
  }

  return { damage, texts }
}
