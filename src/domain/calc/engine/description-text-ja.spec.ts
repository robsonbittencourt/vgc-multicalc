import { registerNames } from "@data/i18n/localized-names"
import { NAMES as NAMES_JA } from "@data/i18n/ja"
import { RawDesc } from "@data/types"
import {
  buildAttackerDescriptionJa,
  buildDefenderBulkJa,
  buildDefenderTailJa,
  buildDescriptionJa,
  KO_PHRASES_JA,
  localizeStatsJa,
  nameJa,
  serializeTextJa,
  translateEndOfTurnTextJa,
  translateResidualTextJa,
  typesJa
} from "@calc/engine/description-text-ja"

const base: RawDesc = { attackerName: "Dragonite", defenderName: "Incineroar", moveName: "Extreme Speed" }

describe("Japanese damage description", () => {
  beforeAll(() => registerNames("ja", NAMES_JA))

  describe("buildDescriptionJa", () => {
    it("should write the attacker, the defender bulk and the defender in Japanese", () => {
      const description = buildDescriptionJa({ ...base, attackEVs: "252+ Atk", attackerItem: "Choice Band", hpEVs: "252 HP", defenseEVs: "4 Def", defenderItem: "Sitrus Berry" })

      expect(description).toBe("A252+ こだわりハチマキ カイリュー の しんそく vs. H252 / B4 オボンのみ ガオガエン")
    })

    it("should leave the defender item out when asked", () => {
      const description = buildDescriptionJa({ ...base, defenderItem: "Occa Berry" }, true)

      expect(description).toBe("カイリュー の しんそく vs. ガオガエン")
    })
  })

  describe("buildAttackerDescriptionJa", () => {
    it("should place the states after the Pokémon and the move after them", () => {
      const description = buildAttackerDescriptionJa({
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
        "+2 マルチスケイル ノーマルテラスタル カイリュー (やけど) とうそうしん強化 (ドラゴン/ひこう) (初回) 味方1体ひんし わざわいのたまあり わざわいのつるぎあり てだすけあり 味方のフラワーギフトあり パワートリックあり 味方のはがねのせいしんあり バッテリーあり パワースポットあり フェアリーオーラあり 交代時 の しんそく (威力80 ノーマル) (2回) (3ターン) (能力変化込み) "
      )
    })

    it("should write a negative boost, a weakened rivalry and many fainted allies", () => {
      const description = buildAttackerDescriptionJa({ ...base, attackBoost: -1, rivalry: "nerfed", alliesFainted: 7 })

      expect(description).toBe("-1 カイリュー とうそうしん弱化 味方5体ひんし の しんそく ")
    })

    it("should write only the base power or only the type of the move", () => {
      const onlyPower = buildAttackerDescriptionJa({ ...base, moveBP: 60 })
      const onlyType = buildAttackerDescriptionJa({ ...base, moveType: "Fire", moveTurns: "over 2 turns" })

      expect([onlyPower, onlyType]).toEqual(["カイリュー の しんそく (威力60) ", "カイリュー の しんそく (ほのお) (2ターン) "])
    })
  })

  describe("buildDefenderBulkJa", () => {
    it("should write the defense boosts and the stats with the Japanese letters", () => {
      const positive = buildDefenderBulkJa({ ...base, defenseBoost: 1, hpEVs: "252 HP", defenseEVs: "4+ SpD" })
      const negative = buildDefenderBulkJa({ ...base, defenseBoost: -2 })

      expect([positive, negative]).toEqual(["+1 H252 / D4+ ", "-2 "])
    })
  })

  describe("buildDefenderTailJa", () => {
    it("should place the states after the Pokémon and the field after them", () => {
      const description = buildDefenderTailJa({
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

      expect(description).toBe(
        "いかく みずテラスタル ガオガエン (まもる) (ほのお/あく) わざわいのおふだあり わざわいのうつわあり あめ・エレキフィールド下 リフレクター・ひかりのかべあり 味方のフラワーギフトあり パワートリックあり 味方のフレンドガードあり オーロラベールあり 急所 ワンダールーム下"
      )
    })

    it("should write a single weather, terrain or screen", () => {
      const weather = buildDefenderTailJa({ ...base, weather: "Harsh Sunshine", isReflect: true })
      const terrain = buildDefenderTailJa({ ...base, terrain: "Grassy", isLightScreen: true })

      expect([weather, terrain]).toEqual(["ガオガエン おおひでり下 リフレクターあり", "ガオガエン グラスフィールド下 ひかりのかべあり"])
    })
  })

  describe("translateEndOfTurnTextJa", () => {
    it("should translate every end of turn effect", () => {
      const texts = ["sandstorm damage", "toxic damage (turn 3)", "1 layer of Spikes", "3 layers of Spikes", "Leftovers recovery", "Grassy Terrain recovery", "Black Sludge damage", "Stealth Rock", "Salt Cure", "Unknown effect"].map(
        translateEndOfTurnTextJa
      )

      expect(texts).toEqual(["すなあらしダメージ", "もうどくダメージ3ターン目", "まきびし1回", "まきびし3回", "たべのこし回復", "グラスフィールド回復", "くろいヘドロダメージ", "ステルスロック", "しおづけ", "Unknown effect"])
    })
  })

  describe("serializeTextJa", () => {
    it("should join the texts with a middle dot", () => {
      const texts = [serializeTextJa([]), serializeTextJa(["a"]), serializeTextJa(["a", "b", "c"])]

      expect(texts).toEqual(["", "a", "a・b・c"])
    })
  })

  describe("translateResidualTextJa", () => {
    it("should translate the recovery and the recoil texts", () => {
      const texts = ["5 - 10% recovered", "5 - 10% lost", "9.5 - 11.2% recoil damage", "50% crash damage", "25% struggle damage"].map(translateResidualTextJa)

      expect(texts).toEqual(["5 - 10%回復", "5 - 10%減少", "9.5 - 11.2%の反動ダメージ", "50%の自爆ダメージ", "25%のわるあがきダメージ"])
    })
  })

  describe("KO phrases", () => {
    it("should write the KOs in hits with the Japanese calc terms", () => {
      const texts = [KO_PHRASES_JA.guaranteed("OHKO"), KO_PHRASES_JA.guaranteed(KO_PHRASES_JA.koTurn(2, false)), KO_PHRASES_JA.chance(75, KO_PHRASES_JA.koTurn(1, false)), KO_PHRASES_JA.possible(KO_PHRASES_JA.koTurn(8, false))]

      expect(texts).toEqual(["確定1発", "確定2発", "乱数1発(75%)", "乱数8発"])
    })

    it("should write the KOs over several turns with the turns first", () => {
      const turns = KO_PHRASES_JA.koTurn(3, true)

      expect([KO_PHRASES_JA.guaranteed(turns), KO_PHRASES_JA.chance(40.5, turns), KO_PHRASES_JA.possible(turns)]).toEqual(["3ターンで確定", "3ターンで乱数(40.5%)", "3ターンで乱数"])
    })

    it("should write the approximation and the end of turn effects in parentheses", () => {
      const texts = [KO_PHRASES_JA.qualifier("approx. "), KO_PHRASES_JA.qualifier(""), KO_PHRASES_JA.after(["Stealth Rock", "Leftovers recovery"])]

      expect(texts).toEqual(["約", "", " (ステルスロック・たべのこし回復込み)"])
    })
  })

  describe("names and stats", () => {
    it("should translate the names of any kind and keep unknown ones", () => {
      const names = [nameJa("Leftovers"), nameJa("Intimidate"), nameJa("Tailwind"), nameJa("Flutter Mane"), nameJa("Fairy"), nameJa("Nothing Known")]

      expect(names).toEqual(["たべのこし", "いかく", "おいかぜ", "ハバタクカミ", "フェアリー", "Nothing Known"])
    })

    it("should translate the types and the stat letters", () => {
      const texts = [typesJa("Grass/Steel"), localizeStatsJa("252 HP / 4 SpA (SpD)"), localizeStatsJa("32- Spe")]

      expect(texts).toEqual(["くさ/はがね", "H252 / C4 (D)", "S32-"])
    })
  })
})
