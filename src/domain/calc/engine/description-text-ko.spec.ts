import { registerNames } from "@data/i18n/localized-names"
import { NAMES as NAMES_KO } from "@data/i18n/ko"
import { RawDesc } from "@data/types"
import {
  buildAttackerDescriptionKo,
  buildDefenderBulkKo,
  buildDefenderTailKo,
  buildDescriptionKo,
  DESCRIPTION_KO,
  KO_PHRASES_KO,
  localizeStatsKo,
  nameKo,
  serializeTextKo,
  translateEndOfTurnTextKo,
  translateResidualTextKo,
  typesKo
} from "@calc/engine/description-text-ko"

const base: RawDesc = { attackerName: "Dragonite", defenderName: "Incineroar", moveName: "Extreme Speed" }

describe("Korean damage description", () => {
  beforeAll(() => registerNames("ko", NAMES_KO))

  describe("buildDescriptionKo", () => {
    it("should write the attacker, the defender bulk and the defender in Korean", () => {
      const description = buildDescriptionKo({ ...base, attackEVs: "252+ Atk", attackerItem: "Choice Band", hpEVs: "252 HP", defenseEVs: "4 Def", defenderItem: "Sitrus Berry" })

      expect(description).toBe("A252+ 구애머리띠 망나뇽 신속 vs. H252 / B4 자뭉열매 어흥염")
    })

    it("should leave the defender item out when asked", () => {
      const description = buildDescriptionKo({ ...base, defenderItem: "Occa Berry" }, true)

      expect(description).toBe("망나뇽 신속 vs. 어흥염")
    })
  })

  describe("buildAttackerDescriptionKo", () => {
    it("should place the states after the Pokémon and the move after them", () => {
      const description = buildAttackerDescriptionKo({
        ...base,
        attackBoost: 2,
        attackerAbility: "Multiscale",
        attackerTera: "Normal",
        isBurned: true,
        rivalry: "buffed",
        attackerTypes: "Dragon/Flying",
        isStellarFirstUse: true,
        alliesFainted: 1,
        isBeadsOfRuin: true,
        isSwordOfRuin: true,
        isHelpingHand: true,
        isFlowerGiftAttacker: true,
        isPowerTrickAttacker: true,
        isSteelySpiritAttacker: true,
        isBattery: true,
        isPowerSpot: true,
        isFairyAura: true,
        isSwitching: "out",
        moveBP: 80,
        moveType: "Normal",
        hits: 2,
        moveTurns: "over 3 turns (stat changes considered)"
      })

      expect(description).toBe(
        "+2 멀티스케일 노말 테라스탈 망나뇽 (화상) 투쟁심 강화 (드래곤/비행) (첫 사용) 아군 1마리 기절 재앙의구슬 적용 재앙의검 적용 도우미 적용 아군의 플라워기프트 적용 파워트릭 적용 아군의 강철정신 적용 배터리 적용 파워스폿 적용 페어리오라 적용 교체 시 신속 (위력 80 노말) (2회) (3턴) (능력 변화 포함) "
      )
    })

    it("should write a negative boost, a weakened rivalry and many fainted allies", () => {
      const description = buildAttackerDescriptionKo({ ...base, attackBoost: -1, rivalry: "nerfed", alliesFainted: 7 })

      expect(description).toBe("-1 망나뇽 투쟁심 약화 아군 5마리 기절 신속 ")
    })

    it("should write only the base power or only the type of the move", () => {
      const onlyPower = buildAttackerDescriptionKo({ ...base, moveBP: 60 })
      const onlyType = buildAttackerDescriptionKo({ ...base, moveType: "Fire", moveTurns: "over 2 turns" })

      expect([onlyPower, onlyType]).toEqual(["망나뇽 신속 (위력 60) ", "망나뇽 신속 (불꽃) (2턴) "])
    })
  })

  describe("buildDefenderBulkKo", () => {
    it("should write the defense boosts and the stats with the letters", () => {
      const positive = buildDefenderBulkKo({ ...base, defenseBoost: 1, hpEVs: "252 HP", defenseEVs: "4+ SpD" })
      const negative = buildDefenderBulkKo({ ...base, defenseBoost: -2 })

      expect([positive, negative]).toEqual(["+1 H252 / D4+ ", "-2 "])
    })
  })

  describe("buildDefenderTailKo", () => {
    it("should place the states after the Pokémon and the field after them", () => {
      const description = buildDefenderTailKo({
        ...base,
        defenderAbility: "Intimidate",
        defenderTera: "Water",
        isProtected: true,
        defenderTypes: "Fire/Dark",
        isTabletsOfRuin: true,
        isVesselOfRuin: true,
        weather: "Rain",
        terrain: "Electric",
        isReflect: true,
        isLightScreen: true,
        isFlowerGiftDefender: true,
        isPowerTrickDefender: true,
        isFriendGuard: true,
        isAuroraVeil: true,
        isCritical: true,
        isWonderRoom: true
      })

      expect(description).toBe("위협 물 테라스탈 어흥염 (방어) (불꽃/악) 재앙의목간 적용 재앙의그릇 적용 비·일렉트릭필드 상태 리플렉터·빛의장막 적용 아군의 플라워기프트 적용 파워트릭 적용 아군의 프렌드가드 적용 오로라베일 적용 급소 원더룸 상태")
    })

    it("should write a single weather, terrain or screen", () => {
      const weather = buildDefenderTailKo({ ...base, weather: "Harsh Sunshine", isReflect: true })
      const terrain = buildDefenderTailKo({ ...base, terrain: "Grassy", isLightScreen: true })

      expect([weather, terrain]).toEqual(["어흥염 아주 강한 햇살 상태 리플렉터 적용", "어흥염 그래스필드 상태 빛의장막 적용"])
    })
  })

  describe("translateEndOfTurnTextKo", () => {
    it("should translate every end of turn effect", () => {
      const texts = ["sandstorm damage", "toxic damage (turn 3)", "1 layer of Spikes", "3 layers of Spikes", "Leftovers recovery", "Grassy Terrain recovery", "Black Sludge damage", "Stealth Rock", "Salt Cure", "Unknown effect"].map(
        translateEndOfTurnTextKo
      )

      expect(texts).toEqual(["모래바람 데미지", "맹독 데미지 3턴째", "압정뿌리기 1회", "압정뿌리기 3회", "먹다남은음식 회복", "그래스필드 회복", "검은오물 데미지", "스텔스록", "소금절이", "Unknown effect"])
    })
  })

  describe("serializeTextKo", () => {
    it("should join the texts with a middle dot", () => {
      const texts = [serializeTextKo([]), serializeTextKo(["a"]), serializeTextKo(["a", "b", "c"])]

      expect(texts).toEqual(["", "a", "a·b·c"])
    })
  })

  describe("translateResidualTextKo", () => {
    it("should translate the recovery and the recoil texts", () => {
      const texts = ["5 - 10% recovered", "5 - 10% lost", "9.5 - 11.2% recoil damage", "50% crash damage", "25% struggle damage"].map(translateResidualTextKo)

      expect(texts).toEqual(["5 - 10% 회복", "5 - 10% 감소", "9.5 - 11.2% 반동 데미지", "50% 실패 데미지", "25% 발버둥 데미지"])
    })
  })

  describe("KO phrases", () => {
    it("should write the KOs in hits with the Korean calc terms", () => {
      const texts = [KO_PHRASES_KO.guaranteed("OHKO"), KO_PHRASES_KO.guaranteed(KO_PHRASES_KO.koTurn(2, false)), KO_PHRASES_KO.chance(75, KO_PHRASES_KO.koTurn(1, false)), KO_PHRASES_KO.possible(KO_PHRASES_KO.koTurn(8, false))]

      expect(texts).toEqual(["확정 1타", "확정 2타", "난수 1타(75%)", "난수 8타"])
    })

    it("should write the KOs over several turns with the turns first", () => {
      const turns = KO_PHRASES_KO.koTurn(3, true)

      expect([KO_PHRASES_KO.guaranteed(turns), KO_PHRASES_KO.chance(40.5, turns), KO_PHRASES_KO.possible(turns)]).toEqual(["3턴 확정", "3턴 난수(40.5%)", "3턴 난수"])
    })

    it("should write the approximation and the end of turn effects in parentheses", () => {
      const texts = [KO_PHRASES_KO.qualifier("approx. "), KO_PHRASES_KO.qualifier(""), KO_PHRASES_KO.after(["Stealth Rock", "Leftovers recovery"])]

      expect(texts).toEqual(["약 ", "", " (스텔스록·먹다남은음식 회복 포함)"])
    })
  })

  describe("names and stats", () => {
    it("should translate the names of any kind and keep unknown ones", () => {
      const names = [nameKo("Leftovers"), nameKo("Intimidate"), nameKo("Tailwind"), nameKo("Flutter Mane"), nameKo("Fairy"), nameKo("Nothing Known")]

      expect(names).toEqual(["먹다남은음식", "위협", "순풍", "날개치는머리", "페어리", "Nothing Known"])
    })

    it("should translate the types and the stat letters", () => {
      const texts = [typesKo("Grass/Steel"), localizeStatsKo("252 HP / 4 SpA (SpD)"), localizeStatsKo("32- Spe")]

      expect(texts).toEqual(["풀/강철", "H252 / C4 (D)", "S32-"])
    })
  })

  describe("DESCRIPTION_KO", () => {
    it("should write the extra phrases in Korean", () => {
      const texts = [DESCRIPTION_KO.reducedBy("Occa Berry"), DESCRIPTION_KO.staminaConsidered(), DESCRIPTION_KO.overTurns(3)]

      expect(texts).toEqual([" (오카열매 효과로 감소)", " (지구력 포함)", " (3턴)"])
    })
  })
})
