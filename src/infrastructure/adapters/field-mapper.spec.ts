import { FieldMapper } from "@adapters/field-mapper"
import { Field, FieldSide } from "@multicalc/model/field"

describe("FieldMapper", () => {
  let mapper: FieldMapper

  beforeEach(() => {
    mapper = new FieldMapper()
  })

  describe("Mapping to Calc class", () => {
    it("should mapping Field to Calc Field with some configs turned on", () => {
      const field = new Field({
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
        isFairyAura: false
      })

      const calcField = mapper.toCalc(field)

      expect(calcField.gameType).toEqual("Doubles")
      expect(calcField.weather).toEqual("Sun")
      expect(calcField.terrain).toEqual("Grassy")
      expect(calcField.isBeadsOfRuin).toEqual(false)
      expect(calcField.isSwordOfRuin).toEqual(true)
      expect(calcField.isTabletsOfRuin).toEqual(false)
      expect(calcField.isVesselOfRuin).toEqual(true)
      expect(calcField.isMagicRoom).toEqual(false)
      expect(calcField.isWonderRoom).toEqual(true)
      expect(calcField.isGravity).toEqual(false)
      expect(calcField.isFairyAura).toEqual(false)
    })

    it("should mapping Field to Calc Field with another configs turned on", () => {
      const field = new Field({
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
        isFairyAura: true
      })

      const calcField = mapper.toCalc(field)

      expect(calcField.weather).toEqual("Rain")
      expect(calcField.terrain).toEqual("Psychic")
      expect(calcField.isBeadsOfRuin).toEqual(true)
      expect(calcField.isSwordOfRuin).toEqual(false)
      expect(calcField.isTabletsOfRuin).toEqual(true)
      expect(calcField.isVesselOfRuin).toEqual(false)
      expect(calcField.isMagicRoom).toEqual(true)
      expect(calcField.isWonderRoom).toEqual(false)
      expect(calcField.isGravity).toEqual(true)
      expect(calcField.isFairyAura).toEqual(true)
    })

    it("should mapping Field Attacker Side to Calc Attacker Side when rightIsDefender is true", () => {
      const rightIsDefender = true
      const attackerSide = new FieldSide({ isHelpingHand: true, isBattery: true, isPowerSpot: true, isTailwind: true, isSeeded: true })
      const defenderSide = new FieldSide({ isHelpingHand: false, isBattery: false, isPowerSpot: false, isTailwind: false, isSeeded: false })
      const field = new Field({ attackerSide, defenderSide })

      const calcField = mapper.toCalc(field, rightIsDefender)

      expect(calcField.attackerSide.isHelpingHand).toEqual(true)
      expect(calcField.attackerSide.isBattery).toEqual(true)
      expect(calcField.attackerSide.isPowerSpot).toEqual(true)
      expect(calcField.attackerSide.isTailwind).toEqual(true)
      expect(calcField.attackerSide.isSeeded).toEqual(true)
    })

    it("should mapping Field Defender Side to Calc Attacker Side when rightIsDefender is false", () => {
      const rightIsDefender = false
      const attackerSide = new FieldSide({ isHelpingHand: true, isBattery: true, isPowerSpot: true, isTailwind: true, isSeeded: true })
      const defenderSide = new FieldSide({ isHelpingHand: false, isBattery: false, isPowerSpot: false, isTailwind: false, isSeeded: false })
      const field = new Field({ attackerSide, defenderSide })

      const calcField = mapper.toCalc(field, rightIsDefender)

      expect(calcField.attackerSide.isHelpingHand).toEqual(false)
      expect(calcField.attackerSide.isBattery).toEqual(false)
      expect(calcField.attackerSide.isPowerSpot).toEqual(false)
      expect(calcField.attackerSide.isTailwind).toEqual(false)
      expect(calcField.attackerSide.isSeeded).toEqual(false)
    })

    it("should mapping Field Defender Side to Calc Defender Side when rightIsDefender is true", () => {
      const rightIsDefender = true
      const attackerSide = new FieldSide({ isTailwind: false, isReflect: false, isLightScreen: false, isAuroraVeil: false, isFriendGuard: false, spikes: 0, isSR: false, isSeeded: false })
      const defenderSide = new FieldSide({ isTailwind: true, isReflect: true, isLightScreen: true, isAuroraVeil: true, isFriendGuard: true, spikes: 0, isSR: true, isSeeded: true })
      const field = new Field({ attackerSide, defenderSide })

      const calcField = mapper.toCalc(field, rightIsDefender)

      expect(calcField.defenderSide.isTailwind).toEqual(true)
      expect(calcField.defenderSide.isReflect).toEqual(true)
      expect(calcField.defenderSide.isLightScreen).toEqual(true)
      expect(calcField.defenderSide.isAuroraVeil).toEqual(true)
      expect(calcField.defenderSide.isFriendGuard).toEqual(true)
      expect(calcField.defenderSide.spikes).toEqual(0)
      expect(calcField.defenderSide.isSR).toEqual(true)
      expect(calcField.defenderSide.isSeeded).toEqual(true)
    })

    it("should mapping Field Attacker Side to Calc Defender Side when rightIsDefender is false", () => {
      const rightIsDefender = false
      const attackerSide = new FieldSide({ isTailwind: false, isReflect: false, isLightScreen: false, isAuroraVeil: false, isFriendGuard: false, spikes: 0, isSR: false, isSeeded: false })
      const defenderSide = new FieldSide({ isTailwind: true, isReflect: true, isLightScreen: true, isAuroraVeil: true, isFriendGuard: true, spikes: 0, isSR: true, isSeeded: true })
      const field = new Field({ attackerSide, defenderSide })

      const calcField = mapper.toCalc(field, rightIsDefender)

      expect(calcField.defenderSide.isTailwind).toEqual(false)
      expect(calcField.defenderSide.isReflect).toEqual(false)
      expect(calcField.defenderSide.isLightScreen).toEqual(false)
      expect(calcField.defenderSide.isAuroraVeil).toEqual(false)
      expect(calcField.defenderSide.isFriendGuard).toEqual(false)
      expect(calcField.defenderSide.spikes).toEqual(0)
      expect(calcField.defenderSide.isSR).toEqual(false)
      expect(calcField.defenderSide.isSeeded).toEqual(false)
    })
  })
})
