import { getBerryResistType, getItemBoostType } from "@calc/model/items"
import { getItemData } from "@data/item-data"
import { getPokemonData } from "@data/pokemon-data"
import { Field } from "@calc/model/field"
import { Move } from "@calc/model/move"
import { Pokemon } from "@calc/model/pokemon"
import { getQPBoostedStat, isGrounded, isQPActive } from "@calc/engine/stats"
import { getMoveEffectiveness } from "@calc/engine/type-effectiveness"
import { RawDesc } from "@data/types"

export interface ModifierContext {
  attacker: Pokemon
  defender: Pokemon
  move: Move
  field: Field
  description: RawDesc
  isCritical: boolean
  turnOrder: "first" | "last"
  hasAteAbilityTypeChange: boolean
  basePower: number
  typeEffectiveness: number
  hitCount: number
  hit: number
  hitsPhysical: boolean
}

type ModifierRule = (ctx: ModifierContext) => number | undefined

const BP_RULES: ModifierRule[] = [
  ({ move, attacker, defender, field, description, basePower, hit }) => {
    if (move.named("Facade") && attacker.hasStatus("brn", "par", "psn", "tox")) {
      description.moveBP = (description.moveBP ?? move.bp) * 2
      return 8192
    } else if (move.named("Venoshock") && defender.hasStatus("psn", "tox")) {
      description.moveBP = (description.moveBP ?? move.bp) * 2
      return 8192
    } else if (move.named("Lash Out") && countNegativeBoosts(attacker)) {
      description.moveBP = (description.moveBP ?? move.bp) * 2
      return 8192
    } else if (move.named("Expanding Force") && isGrounded(attacker, field) && field.hasTerrain("Psychic")) {
      move.target = "allAdjacentFoes"
      description.moveBP = basePower * 1.5
      return 6144
    } else if (move.named("Knock Off") && !resistedKnockOff(defender, hit)) {
      description.moveBP = basePower * 1.5
      return 6144
    } else if (move.named("Misty Explosion") && isGrounded(attacker, field) && field.hasTerrain("Misty")) {
      description.moveBP = basePower * 1.5
      return 6144
    } else if (move.named("Grav Apple") && field.isGravity) {
      description.moveBP = basePower * 1.5
      return 6144
    } else if (move.named("Solar Beam", "Solar Blade") && field.hasWeather("Rain", "Sand", "Hail", "Snow") && !attacker.hasAbility("Mega Sol")) {
      description.moveBP = basePower / 2
      description.weather = field.weather
      return 2048
    } else if (move.named("Collision Course", "Electro Drift")) {
      const isGhostRevealed = attacker.hasAbility("Scrappy") || attacker.hasAbility("Mind's Eye")
      const isRingTarget = defender.hasItem("Ring Target") && !defender.hasAbility("Klutz")
      const types = defender.teraType && defender.teraType !== "Stellar" ? [defender.teraType] : defender.types
      const e1 = getMoveEffectiveness(move, types[0], isGhostRevealed, field.isGravity, isRingTarget)
      const e2 = types[1] ? getMoveEffectiveness(move, types[1], isGhostRevealed, field.isGravity, isRingTarget) : 1

      if (e1 * e2 >= 2) {
        description.moveBP = basePower * (5461 / 4096)
        return 5461
      }
    }

    return undefined
  },

  ({ field, description }) => {
    if (field.attackerSide.isHelpingHand) {
      description.isHelpingHand = true
      return 6144
    }

    return undefined
  },

  ({ attacker, move, field, description }) => {
    if (isGrounded(attacker, field)) {
      if ((field.hasTerrain("Electric") && move.hasType("Electric")) || (field.hasTerrain("Grassy") && move.hasType("Grass")) || (field.hasTerrain("Psychic") && move.hasType("Psychic"))) {
        description.terrain = field.terrain
        return 5325
      }
    }

    return undefined
  },

  ({ defender, move, field, description }) => {
    if (isGrounded(defender, field)) {
      if ((field.hasTerrain("Misty") && move.hasType("Dragon")) || (field.hasTerrain("Grassy") && move.named("Bulldoze", "Earthquake"))) {
        description.terrain = field.terrain
        return 2048
      }
    }

    return undefined
  },

  ({ attacker, move, description }) => {
    if (
      (attacker.hasAbility("Technician") && (description.moveBP ?? move.bp) <= 60) ||
      (attacker.hasAbility("Flare Boost") && attacker.hasStatus("brn") && move.category === "Special") ||
      (attacker.hasAbility("Toxic Boost") && attacker.hasStatus("psn", "tox") && move.category === "Physical") ||
      (attacker.hasAbility("Mega Launcher") && move.flags.pulse) ||
      (attacker.hasAbility("Strong Jaw") && move.flags.bite) ||
      (attacker.hasAbility("Steely Spirit") && move.hasType("Steel")) ||
      (attacker.hasAbility("Sharpness") && move.flags.slicing)
    ) {
      description.attackerAbility = attacker.ability
      return 6144
    }

    return undefined
  },

  ({ attacker, defender, move, field, description }) => {
    const aura = `${move.type} Aura`
    const isAttackerAura = attacker.hasAbility(aura)
    const isDefenderAura = defender.hasAbility(aura)
    const isUserAuraBreak = attacker.hasAbility("Aura Break") || defender.hasAbility("Aura Break")
    const isFieldFairyAura = field.isFairyAura && move.type === "Fairy"
    const isFieldDarkAura = field.isDarkAura && move.type === "Dark"

    if (isAttackerAura || isDefenderAura || isFieldFairyAura || isFieldDarkAura) {
      if (isUserAuraBreak) {
        if (isAttackerAura) description.attackerAbility = attacker.ability
        if (isDefenderAura) description.defenderAbility = defender.ability
        return 3072
      }

      if (isAttackerAura) description.attackerAbility = attacker.ability
      if (isDefenderAura) description.defenderAbility = defender.ability
      if (isFieldFairyAura && !isAttackerAura) description.isFairyAura = true
      return 5448
    }

    return undefined
  },

  ({ attacker, move, field, description, turnOrder }) => {
    const isSwitchingAnalytic = attacker.hasAbility("Analytic") && field.defenderSide.isSwitching === "out"

    if (
      (attacker.hasAbility("Sheer Force") && (move.secondaries || move.named("Electro Shot", "Order Up"))) ||
      (attacker.hasAbility("Analytic") && turnOrder !== "first") ||
      isSwitchingAnalytic ||
      (attacker.hasAbility("Sand Force") && field.hasWeather("Sand") && move.hasType("Rock", "Ground", "Steel")) ||
      (attacker.hasAbility("Tough Claws") && move.flags.contact) ||
      (attacker.hasAbility("Punk Rock") && move.flags.sound)
    ) {
      description.attackerAbility = attacker.ability
      if (isSwitchingAnalytic) description.isSwitching = "out"

      return 5325
    }

    return undefined
  },

  ({ attacker, defender, description }) => {
    if (attacker.hasAbility("Rivalry") && ![attacker.gender, defender.gender].includes("N")) {
      description.attackerAbility = attacker.ability

      if (attacker.gender === defender.gender) {
        description.rivalry = "buffed"
        return 5120
      }

      description.rivalry = "nerfed"
      return 3072
    }

    return undefined
  },

  ({ hasAteAbilityTypeChange }) => {
    return hasAteAbilityTypeChange ? 4915 : undefined
  },

  ({ attacker, move, description }) => {
    if ((attacker.hasAbility("Reckless") && (move.recoil || move.hasCrashDamage)) || (attacker.hasAbility("Iron Fist") && move.flags.punch)) {
      description.attackerAbility = attacker.ability
      return 4915
    }

    return undefined
  },

  ({ attacker, move, description }) => {
    if (attacker.hasAbility("Fire Mane") && move.hasType("Fire")) {
      description.attackerAbility = attacker.ability
      return 6144
    }

    return undefined
  },

  ({ defender, move, description }) => {
    if (defender.hasAbility("Dry Skin") && move.hasType("Fire")) {
      description.defenderAbility = defender.ability
      return 5120
    }

    return undefined
  },

  ({ attacker, description }) => {
    if (attacker.hasAbility("Supreme Overlord") && attacker.alliesFainted) {
      const powMod = [4096, 4506, 4915, 5325, 5734, 6144]
      description.attackerAbility = attacker.ability
      description.alliesFainted = attacker.alliesFainted
      return powMod[Math.min(5, attacker.alliesFainted)]
    }

    return undefined
  },

  ({ attacker, move, description }) => {
    if (attacker.hasItem(`${move.type} Gem`)) {
      description.attackerItem = attacker.item
      return 5325
    }

    if (
      (((attacker.hasItem("Adamant Crystal") && attacker.named("Dialga-Origin")) || (attacker.hasItem("Adamant Orb") && attacker.named("Dialga"))) && move.hasType("Steel", "Dragon")) ||
      (((attacker.hasItem("Lustrous Orb") && attacker.named("Palkia")) || (attacker.hasItem("Lustrous Globe") && attacker.named("Palkia-Origin"))) && move.hasType("Water", "Dragon")) ||
      ((attacker.hasItem("Griseous Orb") || attacker.hasItem("Griseous Core")) && attacker.named("Giratina-Origin", "Giratina") && move.hasType("Ghost", "Dragon")) ||
      (attacker.hasItem("Soul Dew") && attacker.named("Latios", "Latias", "Latios-Mega", "Latias-Mega") && move.hasType("Psychic", "Dragon")) ||
      (attacker.item && move.hasType(getItemBoostType(attacker.item))) ||
      (attacker.name.includes("Ogerpon-Cornerstone") && attacker.hasItem("Cornerstone Mask")) ||
      (attacker.name.includes("Ogerpon-Hearthflame") && attacker.hasItem("Hearthflame Mask")) ||
      (attacker.name.includes("Ogerpon-Wellspring") && attacker.hasItem("Wellspring Mask"))
    ) {
      description.attackerItem = attacker.item
      return 4915
    }

    if ((attacker.hasItem("Muscle Band") && move.category === "Physical") || (attacker.hasItem("Wise Glasses") && move.category === "Special")) {
      description.attackerItem = attacker.item
      return 4505
    }

    if (attacker.hasItem("Punching Glove") && move.flags.punch) {
      return 4506
    }

    return undefined
  },

  ({ move, field, description }) => {
    if (field.attackerSide.isBattery && move.category === "Special") {
      description.isBattery = true
      return 5325
    }

    return undefined
  },

  ({ field, description }) => {
    if (field.attackerSide.isPowerSpot) {
      description.isPowerSpot = true
      return 5325
    }

    return undefined
  }
]

const AT_RULES: ModifierRule[] = [
  ({ attacker, move, field, description }) => {
    if (attacker.hasAbility("Defeatist") && attacker.currrentHp() <= attacker.maxHp() / 2) {
      description.attackerAbility = attacker.ability
      return 2048
    }

    if ((attacker.hasAbility("Solar Power") && field.hasWeather("Sun") && move.category === "Special") || (attacker.named("Cherrim") && attacker.hasAbility("Flower Gift") && field.hasWeather("Sun") && move.category === "Physical")) {
      description.attackerAbility = attacker.ability
      description.weather = field.weather
      return 6144
    }

    if (field.attackerSide.isFlowerGift && !attacker.hasAbility("Flower Gift") && field.hasWeather("Sun") && move.category === "Physical") {
      description.weather = field.weather
      description.isFlowerGiftAttacker = true
      return 6144
    }

    if (field.attackerSide.isSteelySpirit && move.hasType("Steel")) {
      description.isSteelySpiritAttacker = true
      return 6144
    }

    if (attacker.hasAbility("Gorilla Tactics") && move.category === "Physical") {
      description.attackerAbility = attacker.ability
      return 6144
    }

    if (
      (attacker.hasAbility("Guts") && attacker.status && move.category === "Physical") ||
      (attacker.currrentHp() <= attacker.maxHp() / 3 &&
        ((attacker.hasAbility("Overgrow") && move.hasType("Grass")) || (attacker.hasAbility("Blaze") && move.hasType("Fire")) || (attacker.hasAbility("Torrent") && move.hasType("Water")) || (attacker.hasAbility("Swarm") && move.hasType("Bug")))) ||
      (move.category === "Special" && attacker.abilityOn && attacker.hasAbility("Plus", "Minus"))
    ) {
      description.attackerAbility = attacker.ability
      return 6144
    }

    if (attacker.hasAbility("Flash Fire") && attacker.abilityOn && move.hasType("Fire")) {
      description.attackerAbility = "Flash Fire"
      return 6144
    }

    if ((attacker.hasAbility("Steelworker") && move.hasType("Steel")) || (attacker.hasAbility("Dragon's Maw") && move.hasType("Dragon")) || (attacker.hasAbility("Rocky Payload") && move.hasType("Rock"))) {
      description.attackerAbility = attacker.ability
      return 6144
    }

    if (attacker.hasAbility("Transistor") && move.hasType("Electric")) {
      description.attackerAbility = attacker.ability
      return 5325
    }

    if (attacker.hasAbility("Stakeout") && attacker.abilityOn) {
      description.attackerAbility = attacker.ability
      return 8192
    }

    if ((attacker.hasAbility("Water Bubble") && move.hasType("Water")) || (attacker.hasAbility("Huge Power", "Pure Power") && move.category === "Physical")) {
      description.attackerAbility = attacker.ability
      return 8192
    }

    return undefined
  },

  ({ defender, move, description }) => {
    if ((defender.hasAbility("Thick Fat") && move.hasType("Fire", "Ice")) || (defender.hasAbility("Water Bubble") && move.hasType("Fire")) || (defender.hasAbility("Purifying Salt") && move.hasType("Ghost"))) {
      description.defenderAbility = defender.ability
      return 2048
    }

    return undefined
  },

  ({ defender, move, description }) => {
    if (defender.hasAbility("Heatproof") && move.hasType("Fire")) {
      description.defenderAbility = defender.ability
      return 2048
    }

    return undefined
  },

  ({ attacker, move, field, description }) => {
    if (
      (attacker.hasAbility("Hadron Engine") && move.category === "Special" && field.hasTerrain("Electric")) ||
      (attacker.hasAbility("Orichalcum Pulse") && move.category === "Physical" && field.hasWeather("Sun") && !attacker.hasItem("Utility Umbrella"))
    ) {
      description.attackerAbility = attacker.ability
      return 5461
    }

    return undefined
  },

  ({ attacker, move, description }) => {
    if (
      (attacker.hasItem("Thick Club") && attacker.named("Cubone", "Marowak", "Marowak-Alola", "Marowak-Alola-Totem") && move.category === "Physical") ||
      (attacker.hasItem("Deep Sea Tooth") && attacker.named("Clamperl") && move.category === "Special") ||
      (attacker.hasItem("Light Ball") && attacker.name.includes("Pikachu"))
    ) {
      description.attackerItem = attacker.item
      return 8192
    }

    if ((attacker.hasItem("Choice Band") && move.category === "Physical") || (attacker.hasItem("Choice Specs") && move.category === "Special")) {
      description.attackerItem = attacker.item
      return 6144
    }

    return undefined
  },

  ({ attacker, defender, move, field, description }) => {
    const isTabletsOfRuinActive = (defender.hasAbility("Tablets of Ruin") || field.isTabletsOfRuin) && !attacker.hasAbility("Tablets of Ruin")
    const isVesselOfRuinActive = (defender.hasAbility("Vessel of Ruin") || field.isVesselOfRuin) && !attacker.hasAbility("Vessel of Ruin")

    if (isTabletsOfRuinActive && move.category === "Physical") {
      if (defender.hasAbility("Tablets of Ruin")) description.defenderAbility = defender.ability
      else description.isTabletsOfRuin = true
      return 3072
    }

    if (isVesselOfRuinActive && move.category === "Special") {
      if (defender.hasAbility("Vessel of Ruin")) description.defenderAbility = defender.ability
      else description.isVesselOfRuin = true
      return 3072
    }

    return undefined
  },

  ({ attacker, move, field, description }) => {
    if (isQPActive(attacker, field) && ((move.category === "Physical" && getQPBoostedStat(attacker) === "atk") || (move.category === "Special" && getQPBoostedStat(attacker) === "spa"))) {
      description.attackerAbility = attacker.ability
      return 5325
    }

    return undefined
  }
]

const DF_RULES: ModifierRule[] = [
  ({ defender, field, description, hitsPhysical }) => {
    if (defender.hasAbility("Marvel Scale") && defender.status && hitsPhysical) {
      description.defenderAbility = defender.ability
      return 6144
    }

    if (defender.hasAbility("Grass Pelt") && field.hasTerrain("Grassy") && hitsPhysical) {
      description.defenderAbility = defender.ability
      return 6144
    }

    if (defender.hasAbility("Fur Coat") && hitsPhysical) {
      description.defenderAbility = defender.ability
      return 8192
    }

    return undefined
  },

  ({ defender, description, hitsPhysical }) => {
    if ((defender.hasItem("Eviolite") && (defender.named("Dipplin") || getPokemonData(defender.name)?.notFullyEvolved)) || (!hitsPhysical && defender.hasItem("Assault Vest"))) {
      description.defenderItem = defender.item
      return 6144
    }

    if ((defender.hasItem("Metal Powder") && defender.named("Ditto") && hitsPhysical) || (defender.hasItem("Deep Sea Scale") && defender.named("Clamperl") && !hitsPhysical)) {
      description.defenderItem = defender.item
      return 8192
    }

    return undefined
  },

  ({ attacker, defender, field, description, hitsPhysical }) => {
    const isSwordOfRuinActive = (attacker.hasAbility("Sword of Ruin") || field.isSwordOfRuin) && !defender.hasAbility("Sword of Ruin")
    const isBeadsOfRuinActive = (attacker.hasAbility("Beads of Ruin") || field.isBeadsOfRuin) && !defender.hasAbility("Beads of Ruin")

    if (isSwordOfRuinActive && hitsPhysical) {
      if (attacker.hasAbility("Sword of Ruin")) description.attackerAbility = attacker.ability
      else description.isSwordOfRuin = true
      return 3072
    }

    if (isBeadsOfRuinActive && !hitsPhysical) {
      if (attacker.hasAbility("Beads of Ruin")) description.attackerAbility = attacker.ability
      else description.isBeadsOfRuin = true
      return 3072
    }

    return undefined
  },

  ({ defender, field, description, hitsPhysical }) => {
    if (isQPActive(defender, field) && ((hitsPhysical && getQPBoostedStat(defender) === "def") || (!hitsPhysical && getQPBoostedStat(defender) === "spd"))) {
      description.defenderAbility = defender.ability
      return 5325
    }

    return undefined
  }
]

const FINAL_RULES: ModifierRule[] = [
  ({ move, field, description, isCritical }) => {
    if (field.defenderSide.isReflect && move.category === "Physical" && !isCritical && !field.defenderSide.isAuroraVeil) {
      description.isReflect = true
      return field.gameType !== "Singles" ? 2732 : 2048
    }

    if (field.defenderSide.isLightScreen && move.category === "Special" && !isCritical && !field.defenderSide.isAuroraVeil) {
      description.isLightScreen = true
      return field.gameType !== "Singles" ? 2732 : 2048
    }

    return undefined
  },

  ({ field, description, isCritical }) => {
    if (field.defenderSide.isAuroraVeil && !isCritical) {
      description.isAuroraVeil = true
      return field.gameType !== "Singles" ? 2732 : 2048
    }

    return undefined
  },

  ({ attacker, description, isCritical, typeEffectiveness }) => {
    if (attacker.hasAbility("Neuroforce") && typeEffectiveness > 1) {
      description.attackerAbility = attacker.ability
      return 5120
    }

    if (attacker.hasAbility("Sniper") && isCritical) {
      description.attackerAbility = attacker.ability
      return 6144
    }

    if (attacker.hasAbility("Tinted Lens") && typeEffectiveness < 1) {
      description.attackerAbility = attacker.ability
      return 8192
    }

    return undefined
  },

  ({ defender, move, field, description, hitCount }) => {
    if (
      defender.hasAbility("Multiscale", "Shadow Shield") &&
      defender.currrentHp() === defender.maxHp() &&
      hitCount === 0 &&
      ((!field.defenderSide.isSR && (!field.defenderSide.spikes || defender.hasType("Flying"))) || defender.hasItem("Heavy-Duty Boots")) &&
      !move.isParentalBondChild
    ) {
      description.defenderAbility = defender.ability
      return 2048
    }

    return undefined
  },

  ({ attacker, defender, move, description }) => {
    if (defender.hasAbility("Fluffy") && move.flags.contact && !attacker.hasAbility("Long Reach")) {
      description.defenderAbility = defender.ability
      return 2048
    }

    if ((defender.hasAbility("Punk Rock") && move.flags.sound) || (defender.hasAbility("Ice Scales") && move.category === "Special")) {
      description.defenderAbility = defender.ability
      return 2048
    }

    return undefined
  },

  ({ defender, description, typeEffectiveness }) => {
    if (defender.hasAbility("Solid Rock", "Filter", "Prism Armor") && typeEffectiveness > 1) {
      description.defenderAbility = defender.ability
      return 3072
    }

    return undefined
  },

  ({ defender, move, description }) => {
    if (defender.hasAbility("Fluffy") && move.hasType("Fire")) {
      description.defenderAbility = defender.ability
      return 8192
    }

    return undefined
  },

  ({ field, description }) => {
    if (field.defenderSide.isFriendGuard) {
      description.isFriendGuard = true
      return 3072
    }

    return undefined
  },

  ({ attacker, move, description, typeEffectiveness }) => {
    if (attacker.hasItem("Expert Belt") && typeEffectiveness > 1) {
      description.attackerItem = attacker.item
      return 4915
    }

    if (attacker.hasItem("Life Orb")) {
      description.attackerItem = attacker.item
      return 5324
    }

    if (attacker.hasItem("Metronome") && (move.timesUsedWithMetronome ?? 0) >= 1) {
      const times = Math.floor(move.timesUsedWithMetronome!)
      description.attackerItem = attacker.item
      return times <= 4 ? 4096 + times * 819 : 8192
    }

    return undefined
  },

  ({ attacker, defender, move, field, description, typeEffectiveness, hitCount }) => {
    if (move.hasType(getBerryResistType(defender.item)) && (typeEffectiveness > 1 || move.hasType("Normal")) && hitCount === 0 && !field.isUnnerve && !attacker.hasAbility("Unnerve")) {
      description.defenderItem = defender.item
      return defender.hasAbility("Ripen") ? 1024 : 2048
    }

    return undefined
  }
]

export function getBpMods(ctx: ModifierContext): number[] {
  return applyRules(BP_RULES, ctx)
}

export function getAtMods(ctx: ModifierContext): number[] {
  return applyRules(AT_RULES, ctx)
}

export function getDfMods(ctx: ModifierContext): number[] {
  return applyRules(DF_RULES, ctx)
}

export function getFinalMods(ctx: ModifierContext): number[] {
  return applyRules(FINAL_RULES, ctx)
}

function applyRules(rules: ModifierRule[], ctx: ModifierContext): number[] {
  const mods: number[] = []

  for (const rule of rules) {
    const mod = rule(ctx)

    if (mod !== undefined) {
      mods.push(mod)
    }
  }

  return mods
}

function countNegativeBoosts(attacker: Pokemon): boolean {
  const boosts = attacker.boosts
  const sum = (boosts.atk ?? 0) + (boosts.def ?? 0) + (boosts.spa ?? 0) + (boosts.spd ?? 0) + (boosts.spe ?? 0)
  return sum < 0
}

function resistedKnockOff(defender: Pokemon, hit: number): boolean {
  const itemName = defender.item || defender.disabledItem

  if (!itemName) return true

  const item = getItemData(itemName)

  if (item?.megaStone && (item.megaStone[defender.name] || Object.values(item.megaStone).includes(defender.name))) {
    return true
  }

  if (hit > 1 && !defender.hasAbility("Sticky Hold")) return true

  return false
}
