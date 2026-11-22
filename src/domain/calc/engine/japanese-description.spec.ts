import { calculate, calculateMulti, Field, Move, Pokemon } from "@calc"
import { registerNames } from "@data/i18n/localized-names"
import { NAMES as NAMES_JA } from "@data/i18n/ja"

describe("Damage description in Japanese", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const incineroar = () => new Pokemon("Incineroar", { sps: { atk: 32 }, nature: "Adamant" })
  const blissey = (toxicCounter: number) => new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, status: "tox", toxicCounter })

  beforeAll(() => registerNames("ja", NAMES_JA))

  describe("single attacker", () => {
    it("should name the resist berry that reduced the damage", () => {
      const attacker = new Pokemon("Kangaskhan-Mega", { sps: { atk: 32 }, nature: "Adamant", ability: "Parental Bond" })

      const result = calculate(attacker, new Pokemon("Ferrothorn", { item: "Occa Berry" }), new Move("Fire Punch"), field())

      expect(result.description("%", "ja")).toBe("A32+ おやこあい ガルーラ-メガ の ほのおのパンチ vs. H0 / B0 ナットレイ: 110-132 (73.8 - 88.5%) (オッカのみで軽減) -- 確定2発")
    })

    it("should note that Stamina was considered over the uses", () => {
      const attacker = new Pokemon("Snorlax", { sps: { atk: 32 }, nature: "Adamant" })
      const defender = new Pokemon("Mudsdale", { ability: "Stamina", abilityOn: true, sps: { hp: 32, def: 32 }, nature: "Impish" })

      const result = calculate(attacker, defender, new Move("Body Slam", { timesUsed: 2 }), field())

      expect(result.description("%", "ja")).toBe("A32+ カビゴン の のしかかり (2ターン) vs. H32 / B32+ じきゅうりょく バンバドロ (じきゅうりょく込み): 85-103 (41 - 49.7%) -- 倒せない")
    })

    it("should write a KO over several turns after the end of turn damage", () => {
      const result = calculate(incineroar(), blissey(8), new Move("Knock Off", { timesUsed: 2 }), new Field())

      expect(result.description("%", "ja")).toBe("A32+ ガオガエン の はたきおとす (2ターン) vs. H32 / B32 ハピナス: 218-258 (60.2 - 71.2%) -- 2ターンで確定 (もうどくダメージ8ターン目込み)")
    })

    it("should write a possible KO", () => {
      const result = calculate(new Pokemon("Avalugg", { sps: { atk: 32 } }), new Pokemon("Arcanine", {}), new Move("Gyro Ball"), field())

      expect(result.description("%", "ja")).toBe("A32 クレベース の ジャイロボール (威力60) vs. H0 / B0 ウインディ: 19-23 (11.5 - 13.9%) -- 乱数8発")
    })

    it("should write the KO chance alone", () => {
      const result = calculate(incineroar(), new Pokemon("Dragonite", {}), new Move("Knock Off"), field())

      expect(result.koChance("ja").text).toBe("確定3発")
    })

    it("should write the recoil, the recovery or only the damage in the summary", () => {
      const recoil = calculate(incineroar(), new Pokemon("Dragonite", {}), new Move("Flare Blitz"), field()).moveDesc("%", "ja")
      const drain = calculate(new Pokemon("Amoonguss", { sps: { spa: 32 } }), new Pokemon("Rotom-Wash", {}), new Move("Giga Drain"), field()).moveDesc("%", "ja")
      const plain = calculate(incineroar(), new Pokemon("Dragonite", {}), new Move("Knock Off"), field()).moveDesc("%", "ja")

      expect([recoil, drain, plain]).toEqual(["32.5 - 38.5% (10.4 - 12.4%の反動ダメージ)", "73.6 - 88% (24.3 - 29.1%回復)", "34.9 - 42.1%"])
    })
  })

  describe("combined attackers", () => {
    it("should write the worst move description when no attacker deals damage", () => {
      const rillaboom = new Pokemon("Rillaboom", { sps: { atk: 32 }, nature: "Adamant" })

      const result = calculateMulti(rillaboom, incineroar(), new Move("Body Slam"), new Move("Fake Out"), new Pokemon("Gholdengo", { sps: { hp: 32, def: 1 } }), field())

      expect(result.description("ja")).toBe("ゴリランダー のしかかり ＆ ガオガエン ねこだまし vs. サーフゴー: 0-0 (0 - 0%) -- 史上最悪の技かもしれない")
    })

    it("should write the turns and the stat changes", () => {
      const sylveon = new Pokemon("Sylveon", { nature: "Timid", sps: { spa: 32, spe: 32 } })
      const gardevoir = new Pokemon("Gardevoir", { nature: "Quiet", sps: { spa: 32, spe: 0 } })
      const dondozo = new Pokemon("Dondozo", { nature: "Careful", ability: "Oblivious", sps: { hp: 32, spd: 32 } } as never)

      const result = calculateMulti(sylveon, gardevoir, new Move("Acid Spray", { timesUsed: 3 }), new Move("Psychic", { timesUsed: 3 }), dondozo, field())

      expect(result.description("ja")).toBe("C32 ニンフィア の アシッドボム ＆ C32+ サーナイト の サイコキネシス (3ターン) (能力変化込み) vs. H32 / D32+ ヘイラッシャ: 812-961 (315.9 - 373.9%) -- 3ターンで確定")
    })

    it("should write the defender item and Stamina", () => {
      const magikarp = () => new Pokemon("Magikarp", { sps: { atk: 0 }, nature: "Bold" })
      const ferrothorn = new Pokemon("Ferrothorn", { sps: { hp: 32, def: 32 }, nature: "Bold", ability: "Stamina", abilityOn: true, item: "Occa Berry" })

      const result = calculateMulti(magikarp(), magikarp(), new Move("Ember"), new Move("Ember"), ferrothorn, field())

      expect(result.description("ja")).toBe("C0 コイキング の ひのこ ＆ C0 コイキング の ひのこ vs. H32 / D0 オッカのみ ナットレイ (じきゅうりょく込み): 30-36 (16.5 - 19.8%) -- 確定5発")
    })

    it("should write the KO chance after the end of turn recovery", () => {
      const gholdengo = new Pokemon("Gholdengo", { sps: { hp: 32 }, item: "Leftovers" })

      const result = calculateMulti(new Pokemon("Flutter Mane", { sps: { spa: 32 } }), new Pokemon("Rillaboom", {}), new Move("Moonblast"), new Move("Body Slam"), gholdengo, field())

      expect(result.description("ja")).toBe("C32 ハバタクカミ の ムーンフォース ＆ ゴリランダー の のしかかり vs. H32 / D0 たべのこし サーフゴー: 45-54 (23.1 - 27.8%) -- 乱数5発(77%) (たべのこし回復込み)")
    })

    it("should write ten or more hits to KO", () => {
      const blisseyBold = new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, nature: "Bold" })

      const result = calculateMulti(new Pokemon("Magikarp", {}), new Pokemon("Magikarp", {}), new Move("Tackle"), new Move("Tackle"), blisseyBold, field())

      expect(result.description("ja")).toBe("A0 コイキング の たいあたり ＆ A0 コイキング の たいあたり vs. H32 / B32+ ハピナス: 14-18 (3.8 - 4.9%) -- 10発以上")
    })
  })
})
