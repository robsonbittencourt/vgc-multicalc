import { Component, computed, effect, ElementRef, inject, signal, ViewChild, viewChild } from "@angular/core"
import { NgClass } from "@angular/common"
import { CdkDragDrop, CdkDropList, CdkDropListGroup } from "@angular/cdk/drag-drop"
import { MatButton } from "@angular/material/button"
import { MatIcon, MatIconRegistry } from "@angular/material/icon"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { DomSanitizer } from "@angular/platform-browser"
import { WidgetComponent } from "@basic/widget/widget.component"
import { pokemonByRegulation } from "@data/regulation-pokemon"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { FIELD_CONTEXT } from "@data/store/tokens/field-context.token"
import { MenuStore } from "@data/store/menu-store"
import { RollConfigComponent } from "@features/roll-config/roll-config.component"
import { AutomaticFieldService } from "@lib/automatic-field-service"
import { DamageMultiCalcService } from "@lib/damage-calculator/damage-multi-calc.service"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { DamageResultOrderService } from "@lib/damage-calculator/damage-result-order.service"
import { RollLevelConfig } from "@lib/damage-calculator/roll-level-config"
import { DefensiveEvOptimizerService } from "@lib/ev-optimizer/defensive-ev-optimizer.service"
import { Stats, SurvivalThreshold } from "@lib/types"
import { ExportPokeService } from "@lib/user-data/export-poke.service"
import { PokemonBuildMobileComponent } from "@features/pokemon-build/pokemon-build-mobile/pokemon-build-mobile.component"
import { PokemonComboBoxComponent } from "@features/pokemon-build/pokemon-combo-box/pokemon-combo-box.component"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { PokemonCardComponent } from "@pages/multi-calc/pokemon-card/pokemon-card.component"
import { FieldComponent } from "@features/field/field.component"
import { Team } from "@lib/model/team"
import { TeamMember } from "@lib/model/team-member"
import { Pokemon } from "@lib/model/pokemon"
import { defaultPokemon } from "@lib/default-pokemon"
import { Target } from "@lib/model/target"
import { AddPokemonCardComponent } from "@pages/multi-calc/add-pokemon-card/add-pokemon-card.component"
import { TeamTabsMobileComponent } from "@features/team/team-tabs-mobile/team-tabs-mobile.component"
import { TeamsMobileComponent } from "@features/team/teams-mobile/teams-mobile.component"

@Component({
  selector: "app-multi-calc-mobile",
  templateUrl: "./multi-calc-mobile.component.html",
  styleUrls: ["./multi-calc-mobile.component.scss"],
  imports: [
    MatIcon,
    NgClass,
    CdkDropList,
    CdkDropListGroup,
    PokemonBuildMobileComponent,
    PokemonComboBoxComponent,
    PokemonCardComponent,
    FieldComponent,
    AddPokemonCardComponent,
    TeamTabsMobileComponent,
    TeamsMobileComponent,
    MatButton,
    MatIcon,
    ImportPokemonButtonComponent,
    MatSlideToggle,
    RollConfigComponent,
    WidgetComponent
  ],
  providers: [FieldStore, AutomaticFieldService, DamageMultiCalcService, DamageResultOrderService, DefensiveEvOptimizerService, { provide: FIELD_CONTEXT, useValue: "multi" }]
})
export class MultiCalcMobileComponent {
  @ViewChild(PokemonBuildMobileComponent) pokemonBuildMobile?: PokemonBuildMobileComponent
  @ViewChild("scrollContainer") scrollContainer?: ElementRef<HTMLDivElement>
  pokemonSelectComboBox = viewChild<PokemonComboBoxComponent>("pokemonSelectComboBox")
  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  fieldStore = inject(FieldStore)

  private damageCalculator = inject(DamageMultiCalcService)
  private defensiveEvOptimizer = inject(DefensiveEvOptimizerService)
  private exportPokeService = inject(ExportPokeService)

  constructor() {
    const iconRegistry = inject(MatIconRegistry)
    const sanitizer = inject(DomSanitizer)
    iconRegistry.addSvgIcon("pokeball", sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pokeball.svg"))

    effect(() => {
      const level = this.menuStore.manyVsOneActivated() ? this.store.manyVsTeamRollLevel() : this.store.multiCalcRollLevel()
      this.rollLevelConfig.set(RollLevelConfig.fromConfigString(level))
    })
  }

  activeBottomTab = signal<"results" | "teams" | "field">("results")
  private scrollPositions = new Map<string, number>()
  pokemonOnEditId = signal<string | null>(null)
  expandedDefenderIds = signal<Set<string>>(new Set())

  effectiveEditingId = computed(() => this.pokemonOnEditId() || this.activePokemonId())

  rollLevelConfig = signal(RollLevelConfig.fromConfigString(this.store.multiCalcRollLevel()))
  order = signal(false)

  optimizationStatus = signal<"idle" | "success" | "no-solution" | "not-needed">("idle")
  optimizedEvs = signal<Stats | null>(null)
  optimizedNature = signal<string | null>(null)
  private originalEvs = signal<Stats>({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  private originalNature = signal<string>("")

  activeAttacker = computed(() => {
    const id = this.activePokemonId()
    return id ? this.store.findPokemonById(id) : null
  })

  secondAttacker = computed(() => {
    const id = this.store.secondAttackerId()
    return id ? this.store.findPokemonById(id) : undefined
  })

  damageResults = computed(() => {
    const attacker = this.activeAttacker()

    if (!attacker) return []

    return this.damageCalculator.calculateDamageForAll(attacker, this.store.targets(), this.fieldStore.field(), this.order(), this.secondAttacker())
  })

  teamMembers = computed(() => this.store.team().teamMembers)

  teamMemberOnEdit = computed(() => {
    const editId = this.effectiveEditingId()

    if (!editId) return false

    return this.teamMembers().some(m => m.pokemon.id === editId) || this.store.secondAttackerId() === editId
  })

  activePokemonId = computed(() => {
    const members = this.store.team().teamMembers
    if (members.length === 0) return null

    const secondAttackerId = this.store.secondAttackerId()
    const activeMember = members.find(m => m.active && m.pokemon.id !== secondAttackerId)

    return activeMember ? activeMember.pokemon.id : members[0].pokemon.id
  })

  shouldShowBuild = computed(() => {
    const editId = this.effectiveEditingId()
    if (!editId) return false
    const attacker = this.store.findPokemonById(editId)
    return attacker !== null && !attacker.isDefault
  })

  shouldShowPokemonSelect = computed(() => {
    const editId = this.effectiveEditingId()
    if (!editId) return false
    const attacker = this.store.findPokemonById(editId)
    return attacker !== null && attacker.isDefault && this.teamMemberOnEdit()
  })

  selectPokemonActive = computed(() => {
    return this.store.targets().find(t => t.pokemon.isDefault) != null
  })

  canImportPokemon = computed(() => this.teamMembers().length < 6)

  haveMetaData = computed(() => this.store.targetMetaRegulation() != undefined)

  metaButtonLabel = computed(() => (this.haveMetaData() ? "Remove Meta" : "Add Meta"))

  onMetaClick() {
    if (this.haveMetaData()) {
      const newTargets = this.targetsExcludingMetaData()

      this.store.updateTargetMetaRegulation(undefined)
      this.activateTeamMember()
      this.store.updateTargets(newTargets)
    } else {
      this.store.updateTargetMetaRegulation("I")
      const metaPokemon = pokemonByRegulation("I")
      this.onTargetsImported(metaPokemon)
    }
  }

  removeAll() {
    this.activateTeamMember()
    this.store.updateTargetMetaRegulation(undefined)
    this.store.removeAllTargets()
  }

  onTargetsImported(pokemon: Pokemon | Pokemon[]) {
    const pokemonList = Array.isArray(pokemon) ? pokemon : [pokemon]
    const newTargets = []

    for (const p of pokemonList) {
      newTargets.push(new Target(p))
    }

    const allTargets = this.store
      .targets()
      .filter(t => !t.pokemon.isDefault)
      .concat(newTargets)

    this.store.updateTargets(allTargets)
  }

  exportPokemon() {
    const pokemon = this.store.targets().flatMap(t => (t.secondPokemon ? [t.pokemon, t.secondPokemon] : [t.pokemon]))
    this.exportPokeService.export("Opponent Pokémon", ...pokemon)
  }

  private targetsExcludingMetaData(): Target[] {
    const metaLeft = pokemonByRegulation(this.store.targetMetaRegulation()!)

    const newTargets = [...this.store.targets()]
      .reverse()
      .filter(target => {
        const index = metaLeft.findIndex(m => m.equals(target.pokemon))

        if (index !== -1) {
          metaLeft.splice(index, 1)
          return false
        }

        return true
      })
      .reverse()

    return newTargets
  }

  private activateTeamMember() {
    this.pokemonOnEditId.set(this.store.team().activePokemon().id)
  }

  handleOptimizeRequest(event: { updateNature: boolean; keepOffensiveEvs: boolean; survivalThreshold: SurvivalThreshold }) {
    const defender = this.store.findPokemonById(this.effectiveEditingId()!)
    const targets = this.store.targets()
    const field = this.fieldStore.field()

    if (targets.length === 0) return

    this.originalEvs.set({ ...defender.evs })
    this.originalNature.set(defender.nature)

    const rollIndex = this.rollLevelConfig().toRollIndex()
    const result = this.defensiveEvOptimizer.optimize(defender, targets, field, event.updateNature, event.keepOffensiveEvs, event.survivalThreshold, rollIndex, false)

    this.optimizedNature.set(result.nature)

    if (result.evs) {
      if (result.evs.hp === 0 && result.evs.def === 0 && result.evs.spd === 0) {
        this.optimizationStatus.set("not-needed")
        this.optimizedEvs.set(null)
      } else {
        this.store.evs(defender.id, result.evs)
        this.optimizationStatus.set("success")
        this.optimizedEvs.set(result.evs)
      }
    } else {
      this.optimizationStatus.set("no-solution")
      this.optimizedEvs.set(null)
    }

    if (result.nature) {
      this.store.nature(defender.id, result.nature)
    }
  }

  handleOptimizationApplied() {
    this.optimizedEvs.set(null)
    this.optimizedNature.set(null)
    this.optimizationStatus.set("idle")
  }

  handleOptimizationDiscarded() {
    if (this.optimizationStatus() !== "idle") {
      this.store.evs(this.effectiveEditingId()!, this.originalEvs())
      this.store.nature(this.effectiveEditingId()!, this.originalNature())
    }

    this.optimizedEvs.set(null)
    this.optimizedNature.set(null)
    this.optimizationStatus.set("idle")
  }

  addPokemonToTargets() {
    const pokemon = defaultPokemon()
    const target = new Target(pokemon)
    const deactivatedTargets = this.store.targets().map(t => new Target(t.pokemon, t.secondPokemon))
    const targetsWithDefaultPokemon = deactivatedTargets.concat(target)

    this.store.updateTargets(targetsWithDefaultPokemon)
  }

  drop(event: CdkDragDrop<string, any>) {
    const { previousContainer, container, distance } = event
    const movedDistance = Math.abs(distance.x) + Math.abs(distance.y)

    if (movedDistance < 80) return

    if (previousContainer.data != container.data) {
      const target = this.findTarget(container.data)

      if (target.secondPokemon) return

      const activeIndex = this.findTargetIndex(previousContainer.data)
      const active = this.store.targets()[activeIndex]

      target.secondPokemon = active.pokemon

      const newTargets = [...this.store.targets().slice(0, activeIndex), ...this.store.targets().slice(activeIndex + 1)]
      this.store.updateTargets(newTargets)
    }
  }

  separateAttackers(pokemonId: string) {
    const index = this.findTargetIndex(pokemonId)
    const targets = this.store.targets()
    const target = targets[index]

    const secondTarget = new Target(target.secondPokemon!)
    target.secondPokemon = undefined

    const newTargets = [...targets.slice(0, index), target, secondTarget, ...targets.slice(index + 1)]
    this.store.updateTargets(newTargets)
  }

  private findTarget(pokemonId: string): Target {
    return this.store.targets().find(t => t.pokemon.id == pokemonId || t.secondPokemon?.id == pokemonId)!
  }

  private findTargetIndex(pokemonId: string): number {
    return this.store.targets().findIndex(t => t.pokemon.id == pokemonId || t.secondPokemon?.id == pokemonId)
  }

  activateOpponent(pokemonId: string) {
    const targets = this.store.targets()
    const index = targets.findIndex(t => t.pokemon.id === pokemonId || t.secondPokemon?.id === pokemonId)

    if (index !== -1) {
      const targetToMove = targets[index]
      const newTargets = [targetToMove, ...targets.filter((_, i) => i !== index)]
      this.store.updateTargets(newTargets)
    }

    this.pokemonOnEditId.set(pokemonId)

    if (window.innerWidth < 768) {
      setTimeout(() => {
        if (this.scrollContainer) {
          this.scrollContainer.nativeElement.scrollTo({ top: 0, behavior: "smooth" })
        }
      }, 150)
    }
  }

  switchTab(newTab: "results" | "teams" | "field") {
    const currentTab = this.activeBottomTab()
    if (currentTab === newTab) return

    const currentScroll = this.scrollContainer?.nativeElement.scrollTop || 0
    this.scrollPositions.set(currentTab, currentScroll)

    this.activeBottomTab.set(newTab)

    setTimeout(() => {
      const targetScroll = this.scrollPositions.get(newTab) || 0
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTo({ top: targetScroll, behavior: "instant" })
      }
    }, 0)
  }

  onTeamSelected(pokemonId: string) {
    this.pokemonOnEditId.set(pokemonId)
    this.switchTab("results")
  }

  handleExpansionToggle(defenderId: string, isExpanded: boolean) {
    this.expandedDefenderIds.update(ids => {
      const next = new Set(ids)
      if (isExpanded) {
        next.add(defenderId)
      } else {
        next.delete(defenderId)
      }
      return next
    })
  }

  getExpansionKey(result: DamageResult): string {
    return this.menuStore.oneVsManyActivated() ? result.defender.id : result.attacker.id
  }

  handleRollLevelChange(rollLevel: RollLevelConfig) {
    this.rollLevelConfig.set(rollLevel)

    if (this.menuStore.manyVsOneActivated()) {
      this.store.updateManyVsTeamRollLevel(rollLevel.toConfigString())
    } else {
      this.store.updateMultiCalcRollLevel(rollLevel.toConfigString())
    }
  }

  toggleOrder() {
    this.order.update(o => !o)
  }

  focusPokemonComboBox() {
    setTimeout(() => {
      this.pokemonBuildMobile?.focus()
      this.pokemonSelectComboBox()?.focus()
    }, 50)
  }
}
