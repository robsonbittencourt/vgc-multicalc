import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { FieldMapper } from "@lib/field-mapper"
import { Field, FieldSide } from "@lib/model/field"

describe("FieldMapper", () => {
  let mapper: FieldMapper

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    })

    mapper = TestBed.inject(FieldMapper)
  })

  describe("Mapping to Smogon class", () => {
    it("should mapping Field to Smogon Field with some configs turned on", () => {
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
        isTrickRoom: true
      })

      const smogonField = mapper.toSmogon(field)

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
        weather: "Rain",
        terrain: "Psychic",
        isBeadsOfRuin: true,
        isSwordOfRuin: false,
        isTabletsOfRuin: true,
        isVesselOfRuin: false,
        isMagicRoom: true,
        isWonderRoom: false,
        isGravity: true,
        isTrickRoom: false
      })

      const smogonField = mapper.toSmogon(field)

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

    it("should mapping Field Attacker Side to Smogon Attacker Side when rightIsDefender is true", () => {
      const rightIsDefender = true
      const attackerSide = new FieldSide({ isHelpingHand: true, isBattery: true, isPowerSpot: true, isTailwind: true, isSeeded: true })
      const defenderSide = new FieldSide({ isHelpingHand: false, isBattery: false, isPowerSpot: false, isTailwind: false, isSeeded: false })
      const field = new Field({ attackerSide, defenderSide })

      const smogonField = mapper.toSmogon(field, rightIsDefender)

      expect(smogonField.attackerSide.isHelpingHand).toEqual(true)
      expect(smogonField.attackerSide.isBattery).toEqual(true)
      expect(smogonField.attackerSide.isPowerSpot).toEqual(true)
      expect(smogonField.attackerSide.isTailwind).toEqual(true)
      expect(smogonField.attackerSide.isSeeded).toEqual(true)
    })

    it("should mapping Field Defender Side to Smogon Attacker Side when rightIsDefender is false", () => {
      const rightIsDefender = false
      const attackerSide = new FieldSide({ isHelpingHand: true, isBattery: true, isPowerSpot: true, isTailwind: true, isSeeded: true })
      const defenderSide = new FieldSide({ isHelpingHand: false, isBattery: false, isPowerSpot: false, isTailwind: false, isSeeded: false })
      const field = new Field({ attackerSide, defenderSide })

      const smogonField = mapper.toSmogon(field, rightIsDefender)

      expect(smogonField.attackerSide.isHelpingHand).toEqual(false)
      expect(smogonField.attackerSide.isBattery).toEqual(false)
      expect(smogonField.attackerSide.isPowerSpot).toEqual(false)
      expect(smogonField.attackerSide.isTailwind).toEqual(false)
      expect(smogonField.attackerSide.isSeeded).toEqual(false)
    })

    it("should mapping Field Defender Side to Smogon Defender Side when rightIsDefender is true", () => {
      const rightIsDefender = true
      const attackerSide = new FieldSide({ isTailwind: false, isReflect: false, isLightScreen: false, isAuroraVeil: false, isFriendGuard: false, spikes: 0, isSR: false, isSeeded: false })
      const defenderSide = new FieldSide({ isTailwind: true, isReflect: true, isLightScreen: true, isAuroraVeil: true, isFriendGuard: true, spikes: 0, isSR: true, isSeeded: true })
      const field = new Field({ attackerSide, defenderSide })

      const smogonField = mapper.toSmogon(field, rightIsDefender)

      expect(smogonField.defenderSide.isTailwind).toEqual(true)
      expect(smogonField.defenderSide.isReflect).toEqual(true)
      expect(smogonField.defenderSide.isLightScreen).toEqual(true)
      expect(smogonField.defenderSide.isAuroraVeil).toEqual(true)
      expect(smogonField.defenderSide.isFriendGuard).toEqual(true)
      expect(smogonField.defenderSide.spikes).toEqual(0)
      expect(smogonField.defenderSide.isSR).toEqual(true)
      expect(smogonField.defenderSide.isSeeded).toEqual(true)
    })

    it("should mapping Field Attacker Side to Smogon Defender Side when rightIsDefender is false", () => {
      const rightIsDefender = false
      const attackerSide = new FieldSide({ isTailwind: false, isReflect: false, isLightScreen: false, isAuroraVeil: false, isFriendGuard: false, spikes: 0, isSR: false, isSeeded: false })
      const defenderSide = new FieldSide({ isTailwind: true, isReflect: true, isLightScreen: true, isAuroraVeil: true, isFriendGuard: true, spikes: 0, isSR: true, isSeeded: true })
      const field = new Field({ attackerSide, defenderSide })

      const smogonField = mapper.toSmogon(field, rightIsDefender)

      expect(smogonField.defenderSide.isTailwind).toEqual(false)
      expect(smogonField.defenderSide.isReflect).toEqual(false)
      expect(smogonField.defenderSide.isLightScreen).toEqual(false)
      expect(smogonField.defenderSide.isAuroraVeil).toEqual(false)
      expect(smogonField.defenderSide.isFriendGuard).toEqual(false)
      expect(smogonField.defenderSide.spikes).toEqual(0)
      expect(smogonField.defenderSide.isSR).toEqual(false)
      expect(smogonField.defenderSide.isSeeded).toEqual(false)
    })
  })
})
