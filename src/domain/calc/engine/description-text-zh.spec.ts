import { registerNames } from "@data/i18n/localized-names"
import { NAMES as NAMES_ZH_HANS } from "@data/i18n/zh-Hans"
import { NAMES as NAMES_ZH_HANT } from "@data/i18n/zh-Hant"
import { RawDesc } from "@data/types"
import { DESCRIPTION_ZH_HANS, DESCRIPTION_ZH_HANT, SIMPLIFIED, TRADITIONAL } from "@calc/engine/description-text-zh"

const base: RawDesc = { attackerName: "Dragonite", defenderName: "Incineroar", moveName: "Extreme Speed" }

const { buildAttackerDescription, buildDefenderBulk, buildDefenderTail, buildDescription, localizeStats, nameOf, serializeText, translateEndOfTurnText, translateResidualText, typesOf } = SIMPLIFIED.helpers

const KO = DESCRIPTION_ZH_HANS.ko

describe("Chinese damage description", () => {
  beforeAll(() => {
    registerNames("zh-Hans", NAMES_ZH_HANS)
    registerNames("zh-Hant", NAMES_ZH_HANT)
  })

  describe("buildDescription", () => {
    it("should write the attacker, the defender bulk and the defender in Simplified Chinese", () => {
      const description = buildDescription({ ...base, attackEVs: "252+ Atk", attackerItem: "Choice Band", hpEVs: "252 HP", defenseEVs: "4 Def", defenderItem: "Sitrus Berry" })

      expect(description).toBe("A252+ 讲究头带 快龙 神速 vs. H252 / B4 文柚果 炽焰咆哮虎")
    })

    it("should leave the defender item out when asked", () => {
      const description = buildDescription({ ...base, defenderItem: "Occa Berry" }, true)

      expect(description).toBe("快龙 神速 vs. 炽焰咆哮虎")
    })
  })

  describe("buildAttackerDescription", () => {
    it("should place the states after the Pokémon and the move after them", () => {
      const description = buildAttackerDescription({
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
        "+2 多重鳞片 一般太晶 快龙 (灼伤) 斗争心强化 (龙/飞行) (首次) 同伴1只濒死 灾祸之玉生效 灾祸之剑生效 帮助生效 同伴的花之礼生效 力量戏法生效 同伴的钢之意志生效 蓄电池生效 能量点生效 妖精气场生效 替换时 神速 (威力80 一般) (2次) (3回合) (含能力变化) "
      )
    })

    it("should write a negative boost, a weakened rivalry and many fainted allies", () => {
      const description = buildAttackerDescription({ ...base, attackBoost: -1, rivalry: "nerfed", alliesFainted: 7 })

      expect(description).toBe("-1 快龙 斗争心弱化 同伴5只濒死 神速 ")
    })

    it("should write only the base power or only the type of the move", () => {
      const onlyPower = buildAttackerDescription({ ...base, moveBP: 60 })
      const onlyType = buildAttackerDescription({ ...base, moveType: "Fire", moveTurns: "over 2 turns" })

      expect([onlyPower, onlyType]).toEqual(["快龙 神速 (威力60) ", "快龙 神速 (火) (2回合) "])
    })
  })

  describe("buildDefenderBulk", () => {
    it("should write the defense boosts and the stats with the letters", () => {
      const positive = buildDefenderBulk({ ...base, defenseBoost: 1, hpEVs: "252 HP", defenseEVs: "4+ SpD" })
      const negative = buildDefenderBulk({ ...base, defenseBoost: -2 })

      expect([positive, negative]).toEqual(["+1 H252 / D4+ ", "-2 "])
    })
  })

  describe("buildDefenderTail", () => {
    it("should place the states after the Pokémon and the field after them", () => {
      const description = buildDefenderTail({
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

      expect(description).toBe("威吓 水太晶 炽焰咆哮虎 (守住) (火/恶) 灾祸之简生效 灾祸之鼎生效 雨天·电气场地下 反射壁·光墙生效 同伴的花之礼生效 力量戏法生效 同伴的友情防守生效 极光幕生效 击中要害 奇妙空间下")
    })

    it("should write a single weather, terrain or screen", () => {
      const weather = buildDefenderTail({ ...base, weather: "Harsh Sunshine", isReflect: true })
      const terrain = buildDefenderTail({ ...base, terrain: "Grassy", isLightScreen: true })

      expect([weather, terrain]).toEqual(["炽焰咆哮虎 大日照下 反射壁生效", "炽焰咆哮虎 青草场地下 光墙生效"])
    })
  })

  describe("translateEndOfTurnText", () => {
    it("should translate every end of turn effect", () => {
      const texts = ["sandstorm damage", "toxic damage (turn 3)", "1 layer of Spikes", "3 layers of Spikes", "Leftovers recovery", "Grassy Terrain recovery", "Black Sludge damage", "Stealth Rock", "Salt Cure", "Unknown effect"].map(
        translateEndOfTurnText
      )

      expect(texts).toEqual(["沙暴伤害", "剧毒伤害第3回合", "撒菱1层", "撒菱3层", "吃剩的东西回复", "青草场地回复", "黑色污泥伤害", "隐形岩", "盐腌", "Unknown effect"])
    })
  })

  describe("serializeText", () => {
    it("should join the texts with an enumeration comma", () => {
      const texts = [serializeText([]), serializeText(["a"]), serializeText(["a", "b", "c"])]

      expect(texts).toEqual(["", "a", "a、b、c"])
    })
  })

  describe("translateResidualText", () => {
    it("should translate the recovery and the recoil texts", () => {
      const texts = ["5 - 10% recovered", "5 - 10% lost", "9.5 - 11.2% recoil damage", "50% crash damage", "25% struggle damage"].map(translateResidualText)

      expect(texts).toEqual(["5 - 10%回复", "5 - 10%减少", "9.5 - 11.2%的反作用力伤害", "50%的失败伤害", "25%的挣扎伤害"])
    })
  })

  describe("KO phrases", () => {
    it("should write the KOs in hits with the Chinese calc terms", () => {
      const texts = [KO.guaranteed("OHKO"), KO.guaranteed(KO.koTurn(2, false)), KO.chance(75, KO.koTurn(1, false)), KO.possible(KO.koTurn(8, false)), KO.tenOrMore, KO.notAKo]

      expect(texts).toEqual(["确定1发", "确定2发", "乱数1发(75%)", "乱数8发", "10发以上", "无法击倒"])
    })

    it("should write the KOs over several turns with the turns first", () => {
      const turns = KO.koTurn(3, true)

      expect([KO.guaranteed(turns), KO.chance(40.5, turns), KO.possible(turns)]).toEqual(["3回合内确定", "3回合内乱数(40.5%)", "3回合内乱数"])
    })

    it("should write the approximation and the end of turn effects in parentheses", () => {
      const texts = [KO.qualifier("approx. "), KO.qualifier(""), KO.after(["Stealth Rock", "Leftovers recovery"])]

      expect(texts).toEqual(["约", "", " (含隐形岩、吃剩的东西回复)"])
    })
  })

  describe("names and stats", () => {
    it("should translate the names of any kind and keep unknown ones", () => {
      const names = [nameOf("Leftovers"), nameOf("Intimidate"), nameOf("Tailwind"), nameOf("Flutter Mane"), nameOf("Fairy"), nameOf("Nothing Known")]

      expect(names).toEqual(["吃剩的东西", "威吓", "顺风", "振翼发", "妖精", "Nothing Known"])
    })

    it("should translate the types and the stat letters", () => {
      const texts = [typesOf("Grass/Steel"), localizeStats("252 HP / 4 SpA (SpD)"), localizeStats("32- Spe")]

      expect(texts).toEqual(["草/钢", "H252 / C4 (D)", "S32-"])
    })
  })

  describe("extra phrases", () => {
    it("should write the extra phrases in Simplified Chinese", () => {
      const texts = [DESCRIPTION_ZH_HANS.reducedBy("Occa Berry"), DESCRIPTION_ZH_HANS.staminaConsidered(), DESCRIPTION_ZH_HANS.overTurns(3)]

      expect(texts).toEqual([" (因巧可果减轻)", " (含持久力)", " (3回合)"])
    })
  })

  describe("Traditional Chinese", () => {
    it("should write the description with the Traditional names and words", () => {
      const description = TRADITIONAL.helpers.buildDescription({ ...base, attackerTera: "Fire", isBurned: true, weather: "Strong Winds", isCritical: true, defenderItem: "Sitrus Berry" })

      expect(description).toBe("火太晶 快龍 (灼傷) 神速 vs. 文柚果 熾焰咆哮虎 亂流下 擊中要害")
    })

    it("should write the KOs and the end of turn effects in Traditional Chinese", () => {
      const ko = DESCRIPTION_ZH_HANT.ko
      const texts = [ko.guaranteed(ko.koTurn(2, false)), ko.chance(12.5, ko.koTurn(3, false)), ko.after(["toxic damage (turn 2)", "Leftovers recovery"]), DESCRIPTION_ZH_HANT.reducedBy("Occa Berry")]

      expect(texts).toEqual(["確定2發", "亂數3發(12.5%)", " (含劇毒傷害第2回合、吃剩的東西回復)", " (因巧可果減輕)"])
    })
  })
})
