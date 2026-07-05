import { Field, FieldSide } from "@multicalc/model/field"
import { Side, Field as CalcField } from "@calc"
import { Terrain as CalcTerrain, Weather as CalcWeather } from "@data/types"

export class FieldMapper {
  toCalc(field: Field, rightIsDefender = true): CalcField {
    const calcField = new CalcField()
    calcField.weather = field.weather as CalcWeather
    calcField.terrain = field.terrain as CalcTerrain
    calcField.isBeadsOfRuin = field.isBeadsOfRuin
    calcField.isSwordOfRuin = field.isSwordOfRuin
    calcField.isTabletsOfRuin = field.isTabletsOfRuin
    calcField.isVesselOfRuin = field.isVesselOfRuin
    calcField.isMagicRoom = field.isMagicRoom
    calcField.isWonderRoom = field.isWonderRoom
    calcField.isGravity = field.isGravity
    calcField.isUnnerve = field.isUnnerve
    calcField.isFairyAura = field.isFairyAura

    if (rightIsDefender) {
      calcField.gameType = field.attackerSide.gameType
      calcField.attackerSide = this.toAttackerSide(field.attackerSide)
      calcField.defenderSide = this.toDefenderSide(field.defenderSide)
    } else {
      calcField.gameType = field.defenderSide.gameType
      calcField.attackerSide = this.toAttackerSide(field.defenderSide)
      calcField.defenderSide = this.toDefenderSide(field.attackerSide)
    }

    return calcField
  }

  private toAttackerSide(fieldSide: FieldSide): Side {
    const calcSide = new Side()
    calcSide.isTailwind = fieldSide.isTailwind
    calcSide.isHelpingHand = fieldSide.isHelpingHand
    calcSide.isBattery = fieldSide.isBattery
    calcSide.isPowerSpot = fieldSide.isPowerSpot
    calcSide.isSeeded = fieldSide.isSeeded

    return calcSide
  }

  private toDefenderSide(fieldSide: FieldSide): Side {
    const calcSide = new Side()
    calcSide.isTailwind = fieldSide.isTailwind
    calcSide.isReflect = fieldSide.isReflect
    calcSide.isLightScreen = fieldSide.isLightScreen
    calcSide.isAuroraVeil = fieldSide.isAuroraVeil
    calcSide.isFriendGuard = fieldSide.isFriendGuard
    calcSide.spikes = fieldSide.spikes
    calcSide.isSR = fieldSide.isSR
    calcSide.isSeeded = fieldSide.isSeeded
    calcSide.isProtected = fieldSide.isProtected

    return calcSide
  }
}
