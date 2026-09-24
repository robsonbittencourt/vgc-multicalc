import { computed, linkedSignal, signal } from "@angular/core"
import { KoThreshold, OptimizationStatus, SurvivalThreshold, TargetCoverage } from "@multicalc/sp-optimizer"
import { Stats } from "@multicalc/types"
import { formatBestEffortLabel, formatPendingAttackerLabel, formatPendingAttackerParts, formatUnprotectedLabel } from "@features/pokemon-build/utils/best-effort-label"
import { formatOffensiveBestEffortLabel, formatOutOfReachLabel, formatPendingTargetLabel, formatPendingTargetParts } from "@features/pokemon-build/utils/offensive-best-effort-label"
import { formatCostOf, formatKeptStatsLabel } from "@features/pokemon-build/utils/optimization-cost-label"
import { DEFENSIVE_THRESHOLD_OPTIONS, OFFENSIVE_THRESHOLD_OPTIONS, OptimizeMode } from "@features/pokemon-build/utils/optimize-mode"

export type OptimizationCost = { pokemonId: string; name: string; sps: Stats; originalSps: Stats }

export type DefensiveOptimizationRequest = { updateNature: boolean; keepOffensiveSps: boolean; survivalThreshold: SurvivalThreshold }

export type OffensiveOptimizationRequest = { koThreshold: KoThreshold; keepOtherSps: boolean; updateNature: boolean; partnerKeepOtherSps: boolean; partnerUpdateNature: boolean }

export type SpOptimizerSource = {
  status: () => OptimizationStatus | "idle"
  koChance: () => number | null
  optimizedEvs: () => Stats | null
  optimizedNature: () => string | null
  coverage: () => TargetCoverage | null
  costs: () => OptimizationCost[]
  useSpsMode: () => boolean
  isSupported: () => boolean
  canOptimizeBulk: () => boolean
  canOptimizeDamage: () => boolean
}

export class SpOptimizer {
  readonly optimizeMode = signal<OptimizeMode>("bulk")
  readonly keepOffensiveSps = signal(false)
  readonly updateNature = signal(false)
  readonly partnerKeepOtherSps = signal(false)
  readonly partnerUpdateNature = signal(false)
  readonly originalEvs = signal<Stats>({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  readonly originalNature = signal("")

  readonly isDamageMode = computed(() => {
    const canBulk = this.source.canOptimizeBulk()
    const canDamage = this.source.canOptimizeDamage()

    if (!canBulk && canDamage) return true
    if (canBulk && !canDamage) return false

    return this.optimizeMode() === "damage"
  })

  readonly survivalThreshold = linkedSignal<string>(() => (this.isDamageMode() ? "1" : "2"))

  readonly activeOptimizeMode = computed<OptimizeMode>(() => (this.isDamageMode() ? "damage" : "bulk"))

  readonly showModeToggle = computed(() => this.source.canOptimizeBulk() && this.source.canOptimizeDamage())

  readonly thresholdOptions = computed(() => (this.isDamageMode() ? OFFENSIVE_THRESHOLD_OPTIONS : DEFENSIVE_THRESHOLD_OPTIONS))

  readonly spLabel = computed(() => (this.source.useSpsMode() ? "SPs" : "EVs"))

  readonly isBestEffort = computed(() => this.source.status() === "best-effort")

  readonly isSolutionNotNeeded = computed(() => this.source.status() === "not-needed")

  readonly showOptimizeOptions = computed(() => {
    if (!this.source.isSupported()) return false

    return !(this.source.optimizedEvs() !== null || this.isSolutionNotNeeded())
  })

  readonly showOptimizationSuccess = computed(() => this.source.isSupported() && this.source.optimizedEvs() !== null && !this.isSolutionNotNeeded())

  readonly showSolutionNotNeeded = computed(() => this.source.isSupported() && this.isSolutionNotNeeded())

  readonly goalLabel = computed(() => (this.isDamageMode() ? "KO" : "survive"))

  readonly goalTailLabel = computed(() => (this.isDamageMode() ? "the target with" : "the attacker's"))

  readonly bestEffortLabel = computed(() => {
    const koChance = this.source.koChance() ?? 1
    const coverage = this.source.coverage()
    const covered = coverage?.covered ?? 0
    const total = coverage?.total ?? 1
    const bestTargetName = coverage?.bestTargetName ?? null

    if (this.isDamageMode()) {
      return formatOffensiveBestEffortLabel(koChance, Number(this.survivalThreshold()), covered, total, bestTargetName)
    }

    return formatBestEffortLabel(koChance, Number(this.survivalThreshold()), covered, total, bestTargetName)
  })

  readonly impossibleLabel = computed(() => {
    if (this.isDamageMode()) return "No spread reaches this KO"

    const coverage = this.source.coverage()

    return coverage?.bestTargetName && coverage.total > 1 ? `No spread survives ${coverage.bestTargetName}` : "No spread survives this attack"
  })

  private readonly thresholdLabel = computed(() => {
    const threshold = Number(this.survivalThreshold())

    if (this.isDamageMode()) return threshold === 1 ? "OHKO" : `${threshold}HKO`

    return threshold === 2 ? "OHKO" : `${threshold - 1}HKO`
  })

  readonly solutionNotNeededLabel = computed(() => {
    const hko = this.thresholdLabel()

    if (this.isDamageMode()) return `Already reaches the ${hko} with no ${this.spLabel()}`

    const coverage = this.source.coverage()

    if (coverage && coverage.total > 1 && coverage.covered < coverage.total) {
      return `Already survives ${coverage.covered} of ${coverage.total} attackers with no ${this.spLabel()}`
    }

    return `Already survives the ${hko} with no ${this.spLabel()}`
  })

  readonly optimizationVerdictLabel = computed(() => {
    if (this.isBestEffort()) return this.bestEffortLabel()

    const hko = this.thresholdLabel()
    const coverage = this.source.coverage()
    const total = coverage?.total ?? 1
    const covered = coverage?.covered ?? total

    if (this.isDamageMode()) {
      return total > 1 ? `Knocks out all ${total} targets` : `Reaches the ${hko}`
    }

    if (total > 1 && covered < total) {
      return `Survives ${covered} of ${total} attackers`
    }

    return total > 1 ? `Survives all ${total} attackers` : `Survives the ${hko}`
  })

  readonly optimizationCostLabel = computed(() => {
    const optimized = this.source.optimizedEvs()

    if (optimized === null) return ""

    const cost = this.costOf(optimized, this.originalEvs())

    return cost === "" ? `No ${this.spLabel()} needed` : `Costs ${cost}`
  })

  readonly optimizationNotes = computed(() => {
    const optimized = this.source.optimizedEvs()

    if (optimized === null) return []

    const notes: string[] = []
    const nature = this.source.optimizedNature()
    const previousNature = this.originalNature()

    if (nature !== null && nature !== previousNature) {
      notes.push(`Nature changed from ${previousNature} to ${nature}`)
    }

    const kept = this.keepOffensiveSps() ? formatKeptStatsLabel(this.originalEvs(), optimized) : ""

    if (kept !== "") {
      notes.push(`Kept your ${kept}`)
    }

    return notes
  })

  readonly combinedCosts = computed(() => {
    const costs = this.source.costs()

    if (costs.length < 2) return []

    return costs.map(cost => {
      const label = this.costOf(cost.sps, cost.originalSps)

      return { pokemonId: cost.pokemonId, name: cost.name, cost: label === "" ? "Unchanged" : label }
    })
  })

  readonly hasCombinedCosts = computed(() => this.combinedCosts().length > 0)

  readonly outOfReachLabel = computed(() => {
    const coverage = this.source.coverage()

    if (coverage == null) return ""

    const threshold = Number(this.survivalThreshold())

    if (this.isDamageMode()) {
      if (!this.isBestEffort()) return ""

      if (coverage.covered > 0) {
        return formatPendingTargetLabel(this.source.koChance() ?? 0, threshold, coverage.bestTargetName)
      }

      return formatOutOfReachLabel(coverage.outOfReach, coverage.total)
    }

    if (coverage.covered > 0 && coverage.outOfReach > 0) {
      return formatPendingAttackerLabel(this.source.koChance() ?? coverage.bestTargetKoChance ?? 0, threshold, coverage.bestTargetName)
    }

    if (!this.isBestEffort()) return ""

    return formatUnprotectedLabel(coverage.outOfReach, coverage.total)
  })

  readonly pendingTargetParts = computed(() => {
    const coverage = this.source.coverage()

    if (coverage == null || coverage.covered === 0) return null

    const threshold = Number(this.survivalThreshold())

    if (this.isDamageMode()) {
      return formatPendingTargetParts(this.source.koChance() ?? 0, threshold, coverage.bestTargetName)
    }

    if (coverage.outOfReach === 0) return null

    return formatPendingAttackerParts(this.source.koChance() ?? coverage.bestTargetKoChance ?? 0, threshold, coverage.bestTargetName)
  })

  readonly unreachedLabel = computed(() => {
    const coverage = this.source.coverage()

    if (coverage == null || coverage.covered > 0) return ""

    if (this.isDamageMode()) {
      return formatOutOfReachLabel(coverage.outOfReach, coverage.total)
    }

    if (!this.isBestEffort()) return ""

    return formatUnprotectedLabel(coverage.outOfReach, coverage.total)
  })

  readonly isHpOptimized = computed(() => this.isStatOptimized("hp"))

  readonly isDefOptimized = computed(() => this.isStatOptimized("def"))

  readonly isSpdOptimized = computed(() => this.isStatOptimized("spd"))

  readonly isAtkOptimized = computed(() => this.isDamageMode() && this.isStatOptimized("atk"))

  readonly isSpaOptimized = computed(() => this.isDamageMode() && this.isStatOptimized("spa"))

  constructor(private readonly source: SpOptimizerSource) {}

  selectMode(mode: OptimizeMode) {
    if (this.optimizeMode() === mode) return

    this.optimizeMode.set(mode)
  }

  rememberOriginal(sps: Stats, nature: string) {
    this.originalEvs.set({ ...sps })
    this.originalNature.set(nature)
  }

  defensiveRequest(): DefensiveOptimizationRequest {
    return {
      updateNature: this.updateNature(),
      keepOffensiveSps: this.keepOffensiveSps(),
      survivalThreshold: Number(this.survivalThreshold()) as SurvivalThreshold
    }
  }

  offensiveRequest(): OffensiveOptimizationRequest {
    return {
      koThreshold: Number(this.survivalThreshold()) as KoThreshold,
      keepOtherSps: this.keepOffensiveSps(),
      updateNature: this.updateNature(),
      partnerKeepOtherSps: this.partnerKeepOtherSps(),
      partnerUpdateNature: this.partnerUpdateNature()
    }
  }

  private costOf(optimized: Stats, original: Stats) {
    return formatCostOf(optimized, original, this.spLabel(), this.source.useSpsMode(), this.keepOffensiveSps())
  }

  private isStatOptimized(stat: keyof Stats) {
    const optimized = this.source.optimizedEvs()

    return optimized !== null && optimized[stat] !== 0
  }
}
