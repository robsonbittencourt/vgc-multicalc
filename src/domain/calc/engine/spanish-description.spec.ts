import { calculate, calculateMulti, Field, Move, Pokemon } from "@calc"
import { registerNames } from "@data/i18n/localized-names"
import { NAMES as NAMES_ES } from "@data/i18n/es"

describe("Damage description in Spanish", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const incineroar = () => new Pokemon("Incineroar", { sps: { atk: 32 }, nature: "Adamant" })
  const blissey = (toxicCounter: number) => new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, status: "tox", toxicCounter })

  beforeAll(() => registerNames("es", NAMES_ES))

  describe("single attacker", () => {
    it("should name the resist berry that reduced the damage", () => {
      const attacker = new Pokemon("Kangaskhan-Mega", { sps: { atk: 32 }, nature: "Adamant", ability: "Parental Bond" })

      const result = calculate(attacker, new Pokemon("Ferrothorn", { item: "Occa Berry" }), new Move("Fire Punch"), field())

      expect(result.description("%", "es")).toBe("32+ Atq Amor Filial Mega-Kangaskhan Puño Fuego vs. 0 PS / 0 Def Ferrothorn: 110-132 (73.8 - 88.5%) reducido por Baya Caoca -- 2HKO garantizado")
    })

    it("should note that Stamina was considered over the uses", () => {
      const attacker = new Pokemon("Snorlax", { sps: { atk: 32 }, nature: "Adamant" })
      const defender = new Pokemon("Mudsdale", { ability: "Stamina", abilityOn: true, sps: { hp: 32, def: 32 }, nature: "Impish" })

      const result = calculate(attacker, defender, new Move("Body Slam", { timesUsed: 2 }), field())

      expect(result.description("%", "es")).toBe("32+ Atq Snorlax Golpe Cuerpo en 2 turnos vs. 32 PS / 32+ Def Firmeza Mudsdale (considerando Firmeza): 85-103 (41 - 49.7%) -- no hace KO")
    })

    it("should write a KO over several turns after the end of turn damage", () => {
      const result = calculate(incineroar(), blissey(8), new Move("Knock Off", { timesUsed: 2 }), new Field())

      expect(result.description("%", "es")).toBe("32+ Atq Incineroar Desarme en 2 turnos vs. 32 PS / 32 Def Blissey: 218-258 (60.2 - 71.2%) -- KO en 2 turnos garantizado tras daño por veneno grave (turno 8)")
    })

    it("should write a possible KO", () => {
      const result = calculate(new Pokemon("Avalugg", { sps: { atk: 32 } }), new Pokemon("Arcanine", {}), new Move("Gyro Ball"), field())

      expect(result.description("%", "es")).toBe("32 Atq Avalugg Giro Bola (60 Pot) vs. 0 PS / 0 Def Arcanine: 19-23 (11.5 - 13.9%) -- 8HKO posible")
    })

    it("should write the KO chance alone", () => {
      const result = calculate(incineroar(), new Pokemon("Dragonite", {}), new Move("Knock Off"), field())

      expect(result.koChance("es").text).toBe("3HKO garantizado")
    })

    it("should write the recoil, the recovery or only the damage in the summary", () => {
      const recoil = calculate(incineroar(), new Pokemon("Dragonite", {}), new Move("Flare Blitz"), field()).moveDesc("%", "es")
      const drain = calculate(new Pokemon("Amoonguss", { sps: { spa: 32 } }), new Pokemon("Rotom-Wash", {}), new Move("Giga Drain"), field()).moveDesc("%", "es")
      const plain = calculate(incineroar(), new Pokemon("Dragonite", {}), new Move("Knock Off"), field()).moveDesc("%", "es")

      expect([recoil, drain, plain]).toEqual(["32.5 - 38.5% (10.4 - 12.4% de daño de retroceso)", "73.6 - 88% (24.3 - 29.1% recuperado)", "34.9 - 42.1%"])
    })
  })

  describe("combined attackers", () => {
    it("should write the worst move description when no attacker deals damage", () => {
      const rillaboom = new Pokemon("Rillaboom", { sps: { atk: 32 }, nature: "Adamant" })

      const result = calculateMulti(rillaboom, incineroar(), new Move("Body Slam"), new Move("Fake Out"), new Pokemon("Gholdengo", { sps: { hp: 32, def: 1 } }), field())

      expect(result.description("es")).toBe("Rillaboom Golpe Cuerpo Y Incineroar Sorpresa vs. Gholdengo: 0-0 (0 - 0%) -- posiblemente el peor movimiento de la historia")
    })

    it("should write the turns and the stat changes", () => {
      const sylveon = new Pokemon("Sylveon", { nature: "Timid", sps: { spa: 32, spe: 32 } })
      const gardevoir = new Pokemon("Gardevoir", { nature: "Quiet", sps: { spa: 32, spe: 0 } })
      const dondozo = new Pokemon("Dondozo", { nature: "Careful", ability: "Oblivious", sps: { hp: 32, spd: 32 } } as never)

      const result = calculateMulti(sylveon, gardevoir, new Move("Acid Spray", { timesUsed: 3 }), new Move("Psychic", { timesUsed: 3 }), dondozo, field())

      expect(result.description("es")).toBe("32 AtEsp Sylveon Bomba Ácida Y 32+ AtEsp Gardevoir Psíquico en 3 turnos (considerando cambios de características) vs. 32 PS / 32+ DefEsp Dondozo: 812-961 (315.9 - 373.9%) -- KO en 3 turnos garantizado")
    })

    it("should write the defender item and Stamina", () => {
      const magikarp = () => new Pokemon("Magikarp", { sps: { atk: 0 }, nature: "Bold" })
      const ferrothorn = new Pokemon("Ferrothorn", { sps: { hp: 32, def: 32 }, nature: "Bold", ability: "Stamina", abilityOn: true, item: "Occa Berry" })

      const result = calculateMulti(magikarp(), magikarp(), new Move("Ember"), new Move("Ember"), ferrothorn, field())

      expect(result.description("es")).toBe("0 AtEsp Magikarp Ascuas Y 0 AtEsp Magikarp Ascuas vs. 32 PS / 0 DefEsp Baya Caoca Ferrothorn (considerando Firmeza): 30-36 (16.5 - 19.8%) -- 5HKO garantizado")
    })

    it("should write the KO chance after the end of turn recovery", () => {
      const gholdengo = new Pokemon("Gholdengo", { sps: { hp: 32 }, item: "Leftovers" })

      const result = calculateMulti(new Pokemon("Flutter Mane", { sps: { spa: 32 } }), new Pokemon("Rillaboom", {}), new Move("Moonblast"), new Move("Body Slam"), gholdengo, field())

      expect(result.description("es")).toBe("32 AtEsp Melenaleteo Fuerza Lunar Y Rillaboom Golpe Cuerpo vs. 32 PS / 0 DefEsp Restos Gholdengo: 45-54 (23.1 - 27.8%) -- 77% de probabilidad de 5HKO tras recuperación de Restos")
    })

    it("should write ten or more hits to KO", () => {
      const blisseyBold = new Pokemon("Blissey", { sps: { hp: 32, def: 32 }, nature: "Bold" })

      const result = calculateMulti(new Pokemon("Magikarp", {}), new Pokemon("Magikarp", {}), new Move("Tackle"), new Move("Tackle"), blisseyBold, field())

      expect(result.description("es")).toBe("0 Atq Magikarp Placaje Y 0 Atq Magikarp Placaje vs. 32 PS / 32+ Def Blissey: 14-18 (3.8 - 4.9%) -- 10HKO o más")
    })
  })
})
