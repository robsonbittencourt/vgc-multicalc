import { FieldMapper } from "@lib/field-mapper"
import { Field, FieldAttackerSide, FieldDefenderSide } from "@lib/model/field"

describe("FieldMapper", () => {
  describe("Mapping to Smogon class", () => {
    it("should mapping Field to Smogon Field with some configs turned on", () => {
      const field = new Field({
        gameType: "Doubles",
        weather: "Sun",
        terrain: "Grassy",
        isBeadsOfRuin: false,
        isSwordOfRuin: true,
        isTabletsOfRuin: false,
        isVesselOfRuin: true,
        isMagicRoom: false,
        isWonderRoom: true,
        isGravity: false,
        isTrickRoom: true,
        isCriticalHit: false
      })

      const smogonField = new FieldMapper().toSmogon(field)

      expect(smogonField.gameType).toEqual("Doubles")
      expect(smogonField.weather).toEqual("Sun")
      expect(smogonField.terrain).toEqual("Grassy")
      expect(smogonField.isBeadsOfRuin).toEqual(false)
      expect(smogonField.isSwordOfRuin).toEqual(true)
      expect(smogonField.isTabletsOfRuin).toEqual(false)
      expect(smogonField.isVesselOfRuin).toEqual(true)
      expect(smogonField.isMagicRoom).toEqual(false)
      expect(smogonField.isWonderRoom).toEqual(true)
      expect(smogonField.isGravity).toEqual(false)
    })

    it("should mapping Field to Smogon Field with another configs turned on", () => {
      const field = new Field({
        gameType: "Singles",
        weather: "Rain",
        terrain: "Psychic",
        isBeadsOfRuin: true,
        isSwordOfRuin: false,
        isTabletsOfRuin: true,
        isVesselOfRuin: false,
        isMagicRoom: true,
        isWonderRoom: false,
        isGravity: true,
        isTrickRoom: false,
        isCriticalHit: true
      })

      const smogonField = new FieldMapper().toSmogon(field)

      expect(smogonField.gameType).toEqual("Singles")
      expect(smogonField.weather).toEqual("Rain")
      expect(smogonField.terrain).toEqual("Psychic")
      expect(smogonField.isBeadsOfRuin).toEqual(true)
      expect(smogonField.isSwordOfRuin).toEqual(false)
      expect(smogonField.isTabletsOfRuin).toEqual(true)
      expect(smogonField.isVesselOfRuin).toEqual(false)
      expect(smogonField.isMagicRoom).toEqual(true)
      expect(smogonField.isWonderRoom).toEqual(false)
      expect(smogonField.isGravity).toEqual(true)
    })

    it("should mapping Field Attacker Side to Smogon Attacker Side with some configs turned on", () => {
      const attackerSide = new FieldAttackerSide({ isHelpingHand: true, isBattery: false, isPowerSpot: true, isTailwind: false })
      const field = new Field({ attackerSide })

      const smogonField = new FieldMapper().toSmogon(field)

      expect(smogonField.attackerSide.isHelpingHand).toEqual(true)
      expect(smogonField.attackerSide.isBattery).toEqual(false)
      expect(smogonField.attackerSide.isPowerSpot).toEqual(true)
      expect(smogonField.attackerSide.isTailwind).toEqual(false)
    })

    it("should mapping Field Attacker Side to Smogon Attacker Side with another configs turned on", () => {
      const attackerSide = new FieldAttackerSide({ isHelpingHand: false, isBattery: true, isPowerSpot: false, isTailwind: true })
      const field = new Field({ attackerSide })

      const smogonField = new FieldMapper().toSmogon(field)

      expect(smogonField.attackerSide.isHelpingHand).toEqual(false)
      expect(smogonField.attackerSide.isBattery).toEqual(true)
      expect(smogonField.attackerSide.isPowerSpot).toEqual(false)
      expect(smogonField.attackerSide.isTailwind).toEqual(true)
    })

    it("should mapping Field Defender Side to Smogon Defender Side with some configs turned on", () => {
      const defenderSide = new FieldDefenderSide({ isTailwind: false, isReflect: true, isLightScreen: false, isAuroraVeil: true, isFriendGuard: false, spikes: 0, isSR: false, isSeeded: true })
      const field = new Field({ defenderSide })

      const smogonField = new FieldMapper().toSmogon(field)

      expect(smogonField.defenderSide.isTailwind).toEqual(false)
      expect(smogonField.defenderSide.isReflect).toEqual(true)
      expect(smogonField.defenderSide.isLightScreen).toEqual(false)
      expect(smogonField.defenderSide.isAuroraVeil).toEqual(true)
      expect(smogonField.defenderSide.isFriendGuard).toEqual(false)
      expect(smogonField.defenderSide.spikes).toEqual(0)
      expect(smogonField.defenderSide.isSR).toEqual(false)
      expect(smogonField.defenderSide.isSeeded).toEqual(true)
    })

    it("should mapping Field Defender Side to Smogon Defender Side with another configs turned on", () => {
      const defenderSide = new FieldDefenderSide({ isTailwind: true, isReflect: false, isLightScreen: true, isAuroraVeil: false, isFriendGuard: true, spikes: 3, isSR: false, isSeeded: true })
      const field = new Field({ defenderSide })

      const smogonField = new FieldMapper().toSmogon(field)

      expect(smogonField.defenderSide.isTailwind).toEqual(true)
      expect(smogonField.defenderSide.isReflect).toEqual(false)
      expect(smogonField.defenderSide.isLightScreen).toEqual(true)
      expect(smogonField.defenderSide.isAuroraVeil).toEqual(false)
      expect(smogonField.defenderSide.isFriendGuard).toEqual(true)
      expect(smogonField.defenderSide.spikes).toEqual(3)
      expect(smogonField.defenderSide.isSR).toEqual(false)
      expect(smogonField.defenderSide.isSeeded).toEqual(true)
    })
  })
})
