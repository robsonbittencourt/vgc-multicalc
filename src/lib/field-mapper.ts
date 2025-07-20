import { Injectable } from "@angular/core"
import { Field, FieldSide } from "@lib/model/field"
import { Side, Field as SmogonField } from "@robsonbittencourt/calc"
import { Terrain as SmogonTerrain, Weather as SmogonWeather } from "@robsonbittencourt/calc/src/data/interface"

@Injectable({ providedIn: "root" })
export class FieldMapper {
  toSmogon(field: Field, rightIsDefender = true): SmogonField {
    const smogonField = new SmogonField()
    smogonField.weather = field.weather as SmogonWeather
    smogonField.terrain = field.terrain as SmogonTerrain
    smogonField.isBeadsOfRuin = field.isBeadsOfRuin
    smogonField.isSwordOfRuin = field.isSwordOfRuin
    smogonField.isTabletsOfRuin = field.isTabletsOfRuin
    smogonField.isVesselOfRuin = field.isVesselOfRuin
    smogonField.isMagicRoom = field.isMagicRoom
    smogonField.isWonderRoom = field.isWonderRoom
    smogonField.isGravity = field.isGravity

    if (rightIsDefender) {
      smogonField.gameType = field.attackerSide.gameType
      smogonField.attackerSide = this.toAttackerSide(field.attackerSide)
      smogonField.defenderSide = this.toDefenderSide(field.defenderSide)
    } else {
      smogonField.gameType = field.defenderSide.gameType
      smogonField.attackerSide = this.toAttackerSide(field.defenderSide)
      smogonField.defenderSide = this.toDefenderSide(field.attackerSide)
    }

    return smogonField
  }

  private toAttackerSide(fieldSide: FieldSide): Side {
    const smogonSide = new Side()
    smogonSide.isTailwind = fieldSide.isTailwind
    smogonSide.isHelpingHand = fieldSide.isHelpingHand
    smogonSide.isBattery = fieldSide.isBattery
    smogonSide.isPowerSpot = fieldSide.isPowerSpot

    return smogonSide
  }

  private toDefenderSide(fieldSide: FieldSide): Side {
    const smogonSide = new Side()
    smogonSide.isTailwind = fieldSide.isTailwind
    smogonSide.isReflect = fieldSide.isReflect
    smogonSide.isLightScreen = fieldSide.isLightScreen
    smogonSide.isAuroraVeil = fieldSide.isAuroraVeil
    smogonSide.isFriendGuard = fieldSide.isFriendGuard
    smogonSide.spikes = fieldSide.spikes
    smogonSide.isSR = fieldSide.isSR
    smogonSide.isSeeded = fieldSide.isSeeded

    return smogonSide
  }
}
