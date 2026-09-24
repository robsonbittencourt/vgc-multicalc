import { signal } from "@angular/core"
import { OptimizationStatus, TargetCoverage } from "@multicalc/sp-optimizer"
import { Stats } from "@multicalc/types"
import { OptimizationCost, SpOptimizer } from "@features/pokemon-build/sp-optimizer/sp-optimizer"
import { DEFENSIVE_THRESHOLD_OPTIONS, OFFENSIVE_THRESHOLD_OPTIONS } from "@features/pokemon-build/utils/optimize-mode"

const empty: Stats = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }

function setup() {
  const source = {
    status: signal<OptimizationStatus | "idle">("idle"),
    koChance: signal<number | null>(null),
    optimizedEvs: signal<Stats | null>(null),
    optimizedNature: signal<string | null>(null),
    coverage: signal<TargetCoverage | null>(null),
    costs: signal<OptimizationCost[]>([]),
    useSpsMode: signal(true),
    isSupported: signal(true),
    canOptimizeBulk: signal(true),
    canOptimizeDamage: signal(false)
  }

  return { source, optimizer: new SpOptimizer(source) }
}

function damageSetup() {
  const context = setup()
  context.source.canOptimizeBulk.set(false)
  context.source.canOptimizeDamage.set(true)

  return context
}

describe("SpOptimizer", () => {
  describe("isDamageMode", () => {
    it("should be the damage mode when only the damage optimization is available", () => {
      const { optimizer } = damageSetup()

      const damageMode = optimizer.isDamageMode()

      expect(damageMode).toBe(true)
    })

    it("should be the bulk mode when only the bulk optimization is available", () => {
      const { optimizer } = setup()

      const damageMode = optimizer.isDamageMode()

      expect(damageMode).toBe(false)
    })

    it("should follow the selected mode when both optimizations are available", () => {
      const { source, optimizer } = setup()
      source.canOptimizeDamage.set(true)

      optimizer.selectMode("damage")

      expect(optimizer.isDamageMode()).toBe(true)
      expect(optimizer.activeOptimizeMode()).toEqual("damage")
    })

    it("should start in the bulk mode when both optimizations are available", () => {
      const { source, optimizer } = setup()
      source.canOptimizeDamage.set(true)

      const mode = optimizer.activeOptimizeMode()

      expect(mode).toEqual("bulk")
    })

    it("should be the bulk mode when no optimization is available", () => {
      const { source, optimizer } = setup()
      source.canOptimizeBulk.set(false)

      const damageMode = optimizer.isDamageMode()

      expect(damageMode).toBe(false)
    })
  })

  describe("selectMode", () => {
    it("should keep the current mode when the same mode is selected", () => {
      const { optimizer } = setup()
      optimizer.selectMode("damage")

      optimizer.selectMode("damage")

      expect(optimizer.optimizeMode()).toEqual("damage")
    })
  })

  describe("showModeToggle", () => {
    it("should show the toggle only when both optimizations are available", () => {
      const { source, optimizer } = setup()

      const onlyBulk = optimizer.showModeToggle()
      source.canOptimizeDamage.set(true)
      const both = optimizer.showModeToggle()

      expect(onlyBulk).toBe(false)
      expect(both).toBe(true)
    })
  })

  describe("survivalThreshold", () => {
    it("should default to the 2HKO survival threshold in the bulk mode", () => {
      const { optimizer } = setup()

      const threshold = optimizer.survivalThreshold()

      expect(threshold).toEqual("2")
      expect(optimizer.thresholdOptions()).toEqual(DEFENSIVE_THRESHOLD_OPTIONS)
    })

    it("should default to the OHKO threshold in the damage mode", () => {
      const { optimizer } = damageSetup()

      const threshold = optimizer.survivalThreshold()

      expect(threshold).toEqual("1")
      expect(optimizer.thresholdOptions()).toEqual(OFFENSIVE_THRESHOLD_OPTIONS)
    })

    it("should reset the chosen threshold when the mode changes", () => {
      const { source, optimizer } = setup()
      source.canOptimizeDamage.set(true)
      optimizer.survivalThreshold.set("4")

      optimizer.selectMode("damage")

      expect(optimizer.survivalThreshold()).toEqual("1")
    })
  })

  describe("spLabel", () => {
    it("should name the points after the active unit", () => {
      const { source, optimizer } = setup()

      const sps = optimizer.spLabel()
      source.useSpsMode.set(false)
      const evs = optimizer.spLabel()

      expect(sps).toEqual("SPs")
      expect(evs).toEqual("EVs")
    })
  })

  describe("panel visibility", () => {
    it("should hide everything when the optimization is not supported", () => {
      const { source, optimizer } = setup()
      source.isSupported.set(false)
      source.optimizedEvs.set({ ...empty, hp: 4 })

      expect(optimizer.showOptimizeOptions()).toBe(false)
      expect(optimizer.showOptimizationSuccess()).toBe(false)
      expect(optimizer.showSolutionNotNeeded()).toBe(false)
    })

    it("should offer the options while there is no result", () => {
      const { optimizer } = setup()

      const options = optimizer.showOptimizeOptions()

      expect(options).toBe(true)
      expect(optimizer.showOptimizationSuccess()).toBe(false)
    })

    it("should show the result once a spread is proposed", () => {
      const { source, optimizer } = setup()
      source.status.set("success")

      source.optimizedEvs.set({ ...empty, hp: 4 })

      expect(optimizer.showOptimizeOptions()).toBe(false)
      expect(optimizer.showOptimizationSuccess()).toBe(true)
    })

    it("should show the not needed verdict instead of the options", () => {
      const { source, optimizer } = setup()

      source.status.set("not-needed")

      expect(optimizer.showOptimizeOptions()).toBe(false)
      expect(optimizer.showSolutionNotNeeded()).toBe(true)
    })

    it("should not show the result when the proposal is not needed", () => {
      const { source, optimizer } = setup()
      source.status.set("not-needed")

      source.optimizedEvs.set({ ...empty })

      expect(optimizer.showOptimizationSuccess()).toBe(false)
    })
  })

  describe("goal labels", () => {
    it("should describe the survival goal in the bulk mode", () => {
      const { optimizer } = setup()

      expect(optimizer.goalLabel()).toEqual("survive")
      expect(optimizer.goalTailLabel()).toEqual("the attacker's")
    })

    it("should describe the KO goal in the damage mode", () => {
      const { optimizer } = damageSetup()

      expect(optimizer.goalLabel()).toEqual("KO")
      expect(optimizer.goalTailLabel()).toEqual("the target with")
    })
  })

  describe("bestEffortLabel", () => {
    it("should report the survival chance of the best effort", () => {
      const { source, optimizer } = setup()
      source.koChance.set(0.375)

      const label = optimizer.bestEffortLabel()

      expect(label).toEqual("Best effort: 37.5% chance to OHKO")
    })

    it("should assume a guaranteed KO when the chance is unknown", () => {
      const { optimizer } = setup()

      const label = optimizer.bestEffortLabel()

      expect(label).toEqual("Can't avoid a guaranteed OHKO")
    })

    it("should name the worst attacker when there are many", () => {
      const { source, optimizer } = setup()
      source.koChance.set(0.25)
      source.coverage.set({ covered: 0, total: 3, outOfReach: 3, bestTargetName: "Kingambit" })

      const label = optimizer.bestEffortLabel()

      expect(label).toEqual("Best effort: 25% chance to OHKO from Kingambit")
    })

    it("should report the KO chance in the damage mode", () => {
      const { source, optimizer } = damageSetup()
      source.koChance.set(0.8125)
      optimizer.survivalThreshold.set("2")

      const label = optimizer.bestEffortLabel()

      expect(label).toEqual("Best effort: 81.3% chance to 2HKO")
    })
  })

  describe("impossibleLabel", () => {
    it("should say no spread reaches the KO in the damage mode", () => {
      const { optimizer } = damageSetup()

      const label = optimizer.impossibleLabel()

      expect(label).toEqual("No spread reaches this KO")
    })

    it("should name the attacker that cannot be survived among many", () => {
      const { source, optimizer } = setup()
      source.coverage.set({ covered: 1, total: 2, outOfReach: 1, bestTargetName: "Garchomp" })

      const label = optimizer.impossibleLabel()

      expect(label).toEqual("No spread survives Garchomp")
    })

    it("should not name the attacker when there is only one", () => {
      const { source, optimizer } = setup()
      source.coverage.set({ covered: 0, total: 1, outOfReach: 1, bestTargetName: "Garchomp" })

      const label = optimizer.impossibleLabel()

      expect(label).toEqual("No spread survives this attack")
    })

    it("should fall back to the single attack label without coverage", () => {
      const { optimizer } = setup()

      const label = optimizer.impossibleLabel()

      expect(label).toEqual("No spread survives this attack")
    })
  })

  describe("solutionNotNeededLabel", () => {
    it("should report the survival threshold already reached", () => {
      const { optimizer } = setup()
      optimizer.survivalThreshold.set("3")

      const label = optimizer.solutionNotNeededLabel()

      expect(label).toEqual("Already survives the 2HKO with no SPs")
    })

    it("should report how many attackers are already survived", () => {
      const { source, optimizer } = setup()
      source.useSpsMode.set(false)
      source.coverage.set({ covered: 2, total: 3, outOfReach: 1, bestTargetName: "Garchomp" })

      const label = optimizer.solutionNotNeededLabel()

      expect(label).toEqual("Already survives 2 of 3 attackers with no EVs")
    })

    it("should report the survival threshold when every attacker is survived", () => {
      const { source, optimizer } = setup()
      source.coverage.set({ covered: 3, total: 3, outOfReach: 0, bestTargetName: null })

      const label = optimizer.solutionNotNeededLabel()

      expect(label).toEqual("Already survives the OHKO with no SPs")
    })

    it("should report the KO already reached in the damage mode", () => {
      const { optimizer } = damageSetup()
      optimizer.survivalThreshold.set("3")

      const label = optimizer.solutionNotNeededLabel()

      expect(label).toEqual("Already reaches the 3HKO with no SPs")
    })

    it("should call the single hit KO an OHKO in the damage mode", () => {
      const { optimizer } = damageSetup()

      const label = optimizer.solutionNotNeededLabel()

      expect(label).toEqual("Already reaches the OHKO with no SPs")
    })
  })

  describe("optimizationVerdictLabel", () => {
    it("should use the best effort label for a best effort result", () => {
      const { source, optimizer } = setup()
      source.status.set("best-effort")
      source.koChance.set(0.5)

      const label = optimizer.optimizationVerdictLabel()

      expect(label).toEqual("Best effort: 50% chance to OHKO")
    })

    it("should report the survived threshold against a single attacker", () => {
      const { optimizer } = setup()
      optimizer.survivalThreshold.set("4")

      const label = optimizer.optimizationVerdictLabel()

      expect(label).toEqual("Survives the 3HKO")
    })

    it("should report every attacker survived", () => {
      const { source, optimizer } = setup()
      source.coverage.set({ covered: 4, total: 4, outOfReach: 0, bestTargetName: null })

      const label = optimizer.optimizationVerdictLabel()

      expect(label).toEqual("Survives all 4 attackers")
    })

    it("should report the attackers survived out of the total", () => {
      const { source, optimizer } = setup()
      source.coverage.set({ covered: 2, total: 5, outOfReach: 3, bestTargetName: "Kingambit" })

      const label = optimizer.optimizationVerdictLabel()

      expect(label).toEqual("Survives 2 of 5 attackers")
    })

    it("should report the KO reached against a single target", () => {
      const { optimizer } = damageSetup()
      optimizer.survivalThreshold.set("2")

      const label = optimizer.optimizationVerdictLabel()

      expect(label).toEqual("Reaches the 2HKO")
    })

    it("should report every target knocked out", () => {
      const { source, optimizer } = damageSetup()
      source.coverage.set({ covered: 3, total: 3, outOfReach: 0, bestTargetName: null })

      const label = optimizer.optimizationVerdictLabel()

      expect(label).toEqual("Knocks out all 3 targets")
    })
  })

  describe("optimizationCostLabel", () => {
    it("should be empty without a proposal", () => {
      const { optimizer } = setup()

      const label = optimizer.optimizationCostLabel()

      expect(label).toEqual("")
    })

    it("should report the points spent by the proposal", () => {
      const { source, optimizer } = setup()

      source.optimizedEvs.set({ ...empty, hp: 9, def: 14 })

      expect(optimizer.optimizationCostLabel()).toEqual("Costs 23 SPs — HP 9, Def 14")
    })

    it("should say no points are needed when the spread is empty", () => {
      const { source, optimizer } = setup()
      source.useSpsMode.set(false)

      source.optimizedEvs.set({ ...empty })

      expect(optimizer.optimizationCostLabel()).toEqual("No EVs needed")
    })

    it("should report only the changes when the other points are kept", () => {
      const { source, optimizer } = setup()
      optimizer.keepOffensiveSps.set(true)
      optimizer.rememberOriginal({ ...empty, atk: 32, hp: 2 }, "Adamant")

      source.optimizedEvs.set({ ...empty, atk: 32, hp: 7 })

      expect(optimizer.optimizationCostLabel()).toEqual("Costs 5 SPs — HP +5")
    })
  })

  describe("optimizationNotes", () => {
    it("should have no notes without a proposal", () => {
      const { optimizer } = setup()

      const notes = optimizer.optimizationNotes()

      expect(notes).toEqual([])
    })

    it("should note the nature change and the kept points", () => {
      const { source, optimizer } = setup()
      optimizer.keepOffensiveSps.set(true)
      optimizer.rememberOriginal({ ...empty, spa: 32 }, "Modest")
      source.optimizedNature.set("Calm")

      source.optimizedEvs.set({ ...empty, spa: 32, hp: 11 })

      expect(optimizer.optimizationNotes()).toEqual(["Nature changed from Modest to Calm", "Kept your SpA 32"])
    })

    it("should not note an unchanged nature", () => {
      const { source, optimizer } = setup()
      optimizer.rememberOriginal({ ...empty }, "Bold")
      source.optimizedNature.set("Bold")

      source.optimizedEvs.set({ ...empty, def: 6 })

      expect(optimizer.optimizationNotes()).toEqual([])
    })

    it("should not note the kept points when nothing was kept", () => {
      const { source, optimizer } = setup()
      optimizer.keepOffensiveSps.set(true)
      optimizer.rememberOriginal({ ...empty, atk: 20 }, "Jolly")

      source.optimizedEvs.set({ ...empty, atk: 12, hp: 8 })

      expect(optimizer.optimizationNotes()).toEqual([])
    })

    it("should not note the kept points when the keep option is off", () => {
      const { source, optimizer } = setup()
      optimizer.rememberOriginal({ ...empty, atk: 20 }, "Jolly")

      source.optimizedEvs.set({ ...empty, atk: 20, hp: 8 })

      expect(optimizer.optimizationNotes()).toEqual([])
    })
  })

  describe("combinedCosts", () => {
    it("should have no combined costs for a single attacker", () => {
      const { source, optimizer } = setup()
      source.costs.set([{ pokemonId: "a", name: "Garchomp", sps: { ...empty, atk: 32 }, originalSps: { ...empty } }])

      const costs = optimizer.combinedCosts()

      expect(costs).toEqual([])
      expect(optimizer.hasCombinedCosts()).toBe(false)
    })

    it("should report the cost of each attacker of the pair", () => {
      const { source, optimizer } = setup()
      source.costs.set([
        { pokemonId: "a", name: "Garchomp", sps: { ...empty, atk: 24 }, originalSps: { ...empty } },
        { pokemonId: "b", name: "Sylveon", sps: { ...empty }, originalSps: { ...empty } }
      ])

      const costs = optimizer.combinedCosts()

      expect(costs).toEqual([
        { pokemonId: "a", name: "Garchomp", cost: "24 SPs — Atk 24" },
        { pokemonId: "b", name: "Sylveon", cost: "Unchanged" }
      ])
      expect(optimizer.hasCombinedCosts()).toBe(true)
    })
  })

  describe("outOfReachLabel", () => {
    it("should be empty without coverage", () => {
      const { optimizer } = setup()

      const label = optimizer.outOfReachLabel()

      expect(label).toEqual("")
    })

    it("should be empty for a successful KO", () => {
      const { source, optimizer } = damageSetup()
      source.coverage.set({ covered: 2, total: 3, outOfReach: 1, bestTargetName: "Politoed" })

      const label = optimizer.outOfReachLabel()

      expect(label).toEqual("")
    })

    it("should name the best pending target of a partial KO", () => {
      const { source, optimizer } = damageSetup()
      source.status.set("best-effort")
      source.koChance.set(0.375)
      source.coverage.set({ covered: 7, total: 61, outOfReach: 54, bestTargetName: "Politoed" })

      const label = optimizer.outOfReachLabel()

      expect(label).toEqual("Best result: Politoed — 37.5% chance to OHKO")
    })

    it("should count the targets out of reach when none is knocked out", () => {
      const { source, optimizer } = damageSetup()
      source.status.set("best-effort")
      source.coverage.set({ covered: 0, total: 5, outOfReach: 3, bestTargetName: "Politoed" })

      const label = optimizer.outOfReachLabel()

      expect(label).toEqual("3 of 5 targets out of reach")
    })

    it("should hide the pending target when its KO chance is unknown", () => {
      const { source, optimizer } = damageSetup()
      source.status.set("best-effort")
      source.coverage.set({ covered: 1, total: 2, outOfReach: 1, bestTargetName: "Politoed" })

      const label = optimizer.outOfReachLabel()

      expect(label).toEqual("")
    })

    it("should name the worst attacker still pending", () => {
      const { source, optimizer } = setup()
      source.koChance.set(0.25)
      source.coverage.set({ covered: 2, total: 3, outOfReach: 1, bestTargetName: "Kingambit" })

      const label = optimizer.outOfReachLabel()

      expect(label).toEqual("Worst case: Kingambit — 25% chance to OHKO")
    })

    it("should use the chance of the worst attacker when the overall chance is unknown", () => {
      const { source, optimizer } = setup()
      source.coverage.set({ covered: 2, total: 3, outOfReach: 1, bestTargetName: "Kingambit", bestTargetKoChance: 0.5 })

      const label = optimizer.outOfReachLabel()

      expect(label).toEqual("Worst case: Kingambit — 50% chance to OHKO")
    })

    it("should hide the worst attacker when no chance is known", () => {
      const { source, optimizer } = setup()
      source.coverage.set({ covered: 2, total: 3, outOfReach: 1, bestTargetName: "Kingambit" })

      const label = optimizer.outOfReachLabel()

      expect(label).toEqual("")
    })

    it("should be empty when every attacker is survived", () => {
      const { source, optimizer } = setup()
      source.coverage.set({ covered: 3, total: 3, outOfReach: 0, bestTargetName: null })

      const label = optimizer.outOfReachLabel()

      expect(label).toEqual("")
    })

    it("should count the attackers that cannot be survived in a best effort", () => {
      const { source, optimizer } = setup()
      source.status.set("best-effort")
      source.coverage.set({ covered: 0, total: 3, outOfReach: 2, bestTargetName: "Kingambit" })

      const label = optimizer.outOfReachLabel()

      expect(label).toEqual("2 of 3 attackers can't be survived")
    })
  })

  describe("pendingTargetParts", () => {
    it("should have no parts without coverage", () => {
      const { optimizer } = setup()

      const parts = optimizer.pendingTargetParts()

      expect(parts).toBeNull()
    })

    it("should have no parts when nothing is covered", () => {
      const { source, optimizer } = damageSetup()
      source.coverage.set({ covered: 0, total: 4, outOfReach: 4, bestTargetName: "Garchomp" })

      const parts = optimizer.pendingTargetParts()

      expect(parts).toBeNull()
    })

    it("should split the best pending target of a partial KO", () => {
      const { source, optimizer } = damageSetup()
      source.koChance.set(0.625)
      optimizer.survivalThreshold.set("2")
      source.coverage.set({ covered: 1, total: 2, outOfReach: 1, bestTargetName: "Garchomp" })

      const parts = optimizer.pendingTargetParts()

      expect(parts).toEqual({ target: "Best result: Garchomp", chance: "62.5% chance to 2HKO" })
    })

    it("should have no target parts when the KO chance is unknown", () => {
      const { source, optimizer } = damageSetup()
      source.coverage.set({ covered: 1, total: 2, outOfReach: 1, bestTargetName: "Garchomp" })

      const parts = optimizer.pendingTargetParts()

      expect(parts).toBeNull()
    })

    it("should have no attacker parts when every attacker is survived", () => {
      const { source, optimizer } = setup()
      source.koChance.set(0.4)
      source.coverage.set({ covered: 2, total: 2, outOfReach: 0, bestTargetName: "Sylveon" })

      const parts = optimizer.pendingTargetParts()

      expect(parts).toBeNull()
    })

    it("should split the worst attacker with the overall chance", () => {
      const { source, optimizer } = setup()
      source.koChance.set(0.75)
      source.coverage.set({ covered: 1, total: 2, outOfReach: 1, bestTargetName: "Sylveon" })

      const parts = optimizer.pendingTargetParts()

      expect(parts).toEqual({ target: "Worst case: Sylveon", chance: "75% chance to OHKO" })
    })

    it("should split the worst attacker with its own chance when the overall one is unknown", () => {
      const { source, optimizer } = setup()
      optimizer.survivalThreshold.set("3")
      source.coverage.set({ covered: 1, total: 2, outOfReach: 1, bestTargetName: "Sylveon", bestTargetKoChance: 0.125 })

      const parts = optimizer.pendingTargetParts()

      expect(parts).toEqual({ target: "Worst case: Sylveon", chance: "12.5% chance to 2HKO" })
    })

    it("should have no attacker parts when no chance is known", () => {
      const { source, optimizer } = setup()
      source.coverage.set({ covered: 1, total: 2, outOfReach: 1, bestTargetName: "Sylveon" })

      const parts = optimizer.pendingTargetParts()

      expect(parts).toBeNull()
    })
  })

  describe("unreachedLabel", () => {
    it("should be empty without coverage", () => {
      const { optimizer } = setup()

      const label = optimizer.unreachedLabel()

      expect(label).toEqual("")
    })

    it("should be empty when something is covered", () => {
      const { source, optimizer } = damageSetup()
      source.coverage.set({ covered: 1, total: 6, outOfReach: 5, bestTargetName: "Garchomp" })

      const label = optimizer.unreachedLabel()

      expect(label).toEqual("")
    })

    it("should count the targets out of reach in the damage mode", () => {
      const { source, optimizer } = damageSetup()
      source.coverage.set({ covered: 0, total: 6, outOfReach: 4, bestTargetName: "Garchomp" })

      const label = optimizer.unreachedLabel()

      expect(label).toEqual("4 of 6 targets out of reach")
    })

    it("should be empty for a bulk result that is not a best effort", () => {
      const { source, optimizer } = setup()
      source.coverage.set({ covered: 0, total: 2, outOfReach: 1, bestTargetName: "Garchomp" })

      const label = optimizer.unreachedLabel()

      expect(label).toEqual("")
    })

    it("should count the attackers that cannot be survived in a best effort", () => {
      const { source, optimizer } = setup()
      source.status.set("best-effort")
      source.coverage.set({ covered: 0, total: 2, outOfReach: 1, bestTargetName: "Garchomp" })

      const label = optimizer.unreachedLabel()

      expect(label).toEqual("1 of 2 attackers can't be survived")
    })
  })

  describe("optimized stats", () => {
    it("should flag nothing without a proposal", () => {
      const { optimizer } = damageSetup()

      expect(optimizer.isHpOptimized()).toBe(false)
      expect(optimizer.isAtkOptimized()).toBe(false)
    })

    it("should flag the defensive stats that received points", () => {
      const { source, optimizer } = setup()

      source.optimizedEvs.set({ ...empty, hp: 3, spd: 5 })

      expect(optimizer.isHpOptimized()).toBe(true)
      expect(optimizer.isDefOptimized()).toBe(false)
      expect(optimizer.isSpdOptimized()).toBe(true)
    })

    it("should flag the offensive stats only in the damage mode", () => {
      const { source, optimizer } = setup()
      source.optimizedEvs.set({ ...empty, atk: 20, spa: 12 })

      const bulkAtk = optimizer.isAtkOptimized()
      const bulkSpa = optimizer.isSpaOptimized()
      source.canOptimizeBulk.set(false)
      source.canOptimizeDamage.set(true)

      expect(bulkAtk).toBe(false)
      expect(bulkSpa).toBe(false)
      expect(optimizer.isAtkOptimized()).toBe(true)
      expect(optimizer.isSpaOptimized()).toBe(true)
    })
  })

  describe("requests", () => {
    it("should build the defensive request from the chosen options", () => {
      const { optimizer } = setup()
      optimizer.updateNature.set(true)
      optimizer.keepOffensiveSps.set(true)
      optimizer.survivalThreshold.set("3")

      const request = optimizer.defensiveRequest()

      expect(request).toEqual({ updateNature: true, keepOffensiveSps: true, survivalThreshold: 3 })
    })

    it("should build the offensive request with the partner options", () => {
      const { optimizer } = damageSetup()
      optimizer.survivalThreshold.set("2")
      optimizer.partnerKeepOtherSps.set(true)
      optimizer.partnerUpdateNature.set(true)

      const request = optimizer.offensiveRequest()

      expect(request).toEqual({ koThreshold: 2, keepOtherSps: false, updateNature: false, partnerKeepOtherSps: true, partnerUpdateNature: true })
    })

    it("should remember a copy of the original spread and nature", () => {
      const { optimizer } = setup()
      const sps = { ...empty, def: 10 }

      optimizer.rememberOriginal(sps, "Impish")
      sps.def = 0

      expect(optimizer.originalEvs()).toEqual({ ...empty, def: 10 })
      expect(optimizer.originalNature()).toEqual("Impish")
    })
  })
})
