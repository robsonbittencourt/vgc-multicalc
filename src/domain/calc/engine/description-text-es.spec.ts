import { registerNames } from "@data/i18n/localized-names"
import { NAMES as NAMES_ES } from "@data/i18n/es"
import { RawDesc } from "@data/types"
import { buildAttackerDescriptionEs, buildDefenderBulkEs, buildDefenderTailEs, buildDescriptionEs, localizeStats, nameEs, serializeTextEs, translateEndOfTurnTextEs, translateResidualTextEs, typesEs } from "@calc/engine/description-text-es"

const base: RawDesc = { attackerName: "Dragonite", defenderName: "Incineroar", moveName: "Extreme Speed" }

describe("Spanish damage description", () => {
  beforeAll(() => registerNames("es", NAMES_ES))

  describe("buildDescriptionEs", () => {
    it("should write the attacker, the defender bulk and the defender in Spanish", () => {
      const description = buildDescriptionEs({ ...base, attackEVs: "252+ Atk", attackerItem: "Choice Band", hpEVs: "252 HP", defenseEVs: "4 Def", defenderItem: "Sitrus Berry" })

      expect(description).toBe("252+ Atq Cinta Elección Dragonite Velocidad Extrema vs. 252 PS / 4 Def Baya Zidra Incineroar")
    })

    it("should leave the defender item out when asked", () => {
      const description = buildDescriptionEs({ ...base, defenderItem: "Occa Berry" }, true)

      expect(description).toBe("Dragonite Velocidad Extrema vs. Incineroar")
    })
  })

  describe("buildAttackerDescriptionEs", () => {
    it("should place the states after the Pokémon and the boosts before the move", () => {
      const description = buildAttackerDescriptionEs({
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
        "+2 Multiescamas Tera Normal Dragonite quemado potenciado por Rivalidad (Dragón/Volador) (Primer Uso) con 1 aliado debilitado con Abalorio Debacle con Espada Debacle con Refuerzo con Don Floral del aliado con Truco Fuerza con Alma Acerada del aliado potenciado por Batería potenciado por Fuente Energía con Aura Feérica potenciado por el cambio Velocidad Extrema (80 Pot Normal) (2 golpes) en 3 turnos (considerando cambios de características) "
      )
    })

    it("should write a negative boost, a weakened rivalry and many fainted allies", () => {
      const description = buildAttackerDescriptionEs({ ...base, attackBoost: -1, rivalry: "nerfed", alliesFainted: 7 })

      expect(description).toBe("-1 Dragonite debilitado por Rivalidad con 5 aliados debilitados Velocidad Extrema ")
    })

    it("should write only the base power or only the type of the move", () => {
      const onlyPower = buildAttackerDescriptionEs({ ...base, moveBP: 60 })
      const onlyType = buildAttackerDescriptionEs({ ...base, moveType: "Fire", moveTurns: "over 2 turns" })

      expect([onlyPower, onlyType]).toEqual(["Dragonite Velocidad Extrema (60 Pot) ", "Dragonite Velocidad Extrema (Fuego) en 2 turnos "])
    })
  })

  describe("buildDefenderBulkEs", () => {
    it("should write the defense boosts and the stats in Spanish", () => {
      const positive = buildDefenderBulkEs({ ...base, defenseBoost: 1, hpEVs: "252 HP", defenseEVs: "4 SpD" })
      const negative = buildDefenderBulkEs({ ...base, defenseBoost: -2 })

      expect([positive, negative]).toEqual(["+1 252 PS / 4 DefEsp ", "-2 "])
    })
  })

  describe("buildDefenderTailEs", () => {
    it("should place the states after the Pokémon and the field after them", () => {
      const description = buildDefenderTailEs({
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
        "Intimidación Tera Agua Incineroar protegido (Fuego/Siniestro) con Tablilla Debacle con Caldero Debacle con Lluvia y en Campo Eléctrico a través de Reflejo y Pantalla de Luz con Don Floral del aliado con Truco Fuerza con Compiescolta del aliado con Velo Aurora del aliado con golpe crítico en Zona Extraña"
      )
    })

    it("should write a single weather, terrain or screen", () => {
      const weather = buildDefenderTailEs({ ...base, weather: "Harsh Sunshine", isReflect: true })
      const terrain = buildDefenderTailEs({ ...base, terrain: "Grassy", isLightScreen: true })

      expect([weather, terrain]).toEqual(["Incineroar con Sol Abrasador a través de Reflejo", "Incineroar en Campo de Hierba a través de Pantalla de Luz"])
    })
  })

  describe("translateEndOfTurnTextEs", () => {
    it("should translate every end of turn effect", () => {
      const texts = ["sandstorm damage", "toxic damage (turn 3)", "1 layer of Spikes", "3 layers of Spikes", "Leftovers recovery", "Grassy Terrain recovery", "Black Sludge damage", "Stealth Rock", "Salt Cure", "Unknown effect"].map(
        translateEndOfTurnTextEs
      )

      expect(texts).toEqual([
        "daño de Tormenta de Arena",
        "daño por veneno grave (turno 3)",
        "1 capa de Púas",
        "3 capas de Púas",
        "recuperación de Restos",
        "recuperación de Campo de Hierba",
        "daño de Lodo Negro",
        "Trampa Rocas",
        "Salazón",
        "Unknown effect"
      ])
    })
  })

  describe("serializeTextEs", () => {
    it("should join the texts with commas and y", () => {
      const texts = [serializeTextEs([]), serializeTextEs(["a"]), serializeTextEs(["a", "b"]), serializeTextEs(["a", "b", "c"])]

      expect(texts).toEqual(["", "a", "a y b", "a, b y c"])
    })
  })

  describe("translateResidualTextEs", () => {
    it("should translate the recovery and the recoil texts", () => {
      const texts = ["5 - 10% recovered", "5 - 10% lost", "9.5 - 11.2% recoil damage", "50% crash damage", "25% struggle damage"].map(translateResidualTextEs)

      expect(texts).toEqual(["5 - 10% recuperado", "5 - 10% perdido", "9.5 - 11.2% de daño de retroceso", "50% de daño por choque", "25% de daño de Forcejeo"])
    })
  })

  describe("names and stats", () => {
    it("should translate the names of any kind and keep unknown ones", () => {
      const names = [nameEs("Leftovers"), nameEs("Intimidate"), nameEs("Tailwind"), nameEs("Flutter Mane"), nameEs("Fairy"), nameEs("Nothing Known")]

      expect(names).toEqual(["Restos", "Intimidación", "Viento Afín", "Melenaleteo", "Hada", "Nothing Known"])
    })

    it("should translate the types and the stat abbreviations", () => {
      const texts = [typesEs("Grass/Steel"), localizeStats("252 HP / 4 SpA (SpD)")]

      expect(texts).toEqual(["Planta/Acero", "252 PS / 4 AtEsp (DefEsp)"])
    })
  })
})
