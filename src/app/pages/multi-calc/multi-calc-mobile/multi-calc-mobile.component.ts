import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { Component, computed, effect, ElementRef, inject, linkedSignal, OnDestroy, signal, ViewChild } from "@angular/core"
import { NgClass } from "@angular/common"
import { CdkDragDrop, CdkDragMove, CdkDropList, CdkDropListGroup } from "@angular/cdk/drag-drop"
import { ScrollingModule } from "@angular/cdk/scrolling"
import { MatButton } from "@angular/material/button"
import { MatDialog } from "@angular/material/dialog"
import { MatIcon, MatIconRegistry } from "@angular/material/icon"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { DomSanitizer } from "@angular/platform-browser"
import { InputSelectComponent } from "@app/basic/input-select/input-select.component"
import { WidgetComponent } from "@basic/widget/widget.component"
import { SETDEX_CHAMPIONS } from "@data/movesets-champions"
import { pokemonByRegulation } from "@data/regulation-pokemon"
import { CalculatorStore } from "@data/store/calculator-store"
import { CustomSet } from "@data/store/custom-set"
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
import { Regulation, Stats } from "@lib/types"
import { TeamExportModalComponent } from "@features/export-modal/export-modal.component"
import { ExportPokeService } from "@lib/user-data/export-poke.service"
import { PokemonBuildMobileComponent } from "@features/pokemon-build/pokemon-build-mobile/pokemon-build-mobile.component"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { SaveSetButtonComponent } from "@features/buttons/save-set-button/save-set-button.component"
import { PokemonCardComponent } from "@pages/multi-calc/pokemon-card/pokemon-card.component"
import { FieldComponent } from "@features/field/field.component"
import { Pokemon } from "@lib/model/pokemon"
import { defaultPokemon } from "@lib/default-pokemon"
import { Target } from "@lib/model/target"
import { BackNavigationService } from "@lib/back-navigation.service"
import { AddPokemonCardComponent } from "@pages/multi-calc/add-pokemon-card/add-pokemon-card.component"
import { TeamTabsMobileComponent } from "@features/team/team-tabs-mobile/team-tabs-mobile.component"
import { TeamsMobileComponent } from "@features/team/teams-mobile/teams-mobile.component"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { MobileTableOverlayComponent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.component"
import { MobileTableOverlayService, TableSelectEvent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.service"
import { SpriteService } from "@data/sprite.service"

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
    TeamsMobileComponent,
    PokemonCardComponent,
    FieldComponent,
    AddPokemonCardComponent,
    TeamTabsMobileComponent,
    MatButton,
    ImportPokemonButtonComponent,
    SaveSetButtonComponent,
    ExportPokemonButtonComponent,
    MobileTableOverlayComponent,
    InputSelectComponent,
    MatSlideToggle,
    RollConfigComponent,
    WidgetComponent,
    ScrollingModule
  ],
  providers: [FieldStore, AutomaticFieldService, DamageMultiCalcService, DamageResultOrderService, DefensiveEvOptimizerService, MobileTableOverlayService, { provide: FIELD_CONTEXT, useValue: "multi" }]
})
export class MultiCalcMobileComponent implements OnDestroy {
  @ViewChild("scrollContainer") scrollContainer?: ElementRef<HTMLDivElement>
  @ViewChild("pokemonInput") pokemonInput?: ElementRef<HTMLInputElement>
  @ViewChild("itemInput") itemInput?: ElementRef<HTMLInputElement>
  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  fieldStore = inject(FieldStore)
  overlay = inject(MobileTableOverlayService)
  spriteService = inject(SpriteService)

  private damageCalculator = inject(DamageMultiCalcService)
  private automaticFieldService = inject(AutomaticFieldService)
  private defensiveEvOptimizer = inject(DefensiveEvOptimizerService)
  private exportPokeService = inject(ExportPokeService)
  private dialog = inject(MatDialog)
  private backNavigation = inject(BackNavigationService)

  constructor() {
    const iconRegistry = inject(MatIconRegistry)
    const sanitizer = inject(DomSanitizer)
    iconRegistry.addSvgIcon("pokeball", sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pokeball.svg"))
    this.backNavigation.register(() => this.activeBottomTab.set("results"))

    effect(() => {
      const level = this.menuStore.manyVsOneActivated() ? this.store.manyVsTeamRollLevel() : this.store.multiCalcRollLevel()
      this.rollLevelConfig.set(RollLevelConfig.fromConfigString(level))
    })

    effect(() => {
      this.menuStore.oneVsManyActivated()
      this.menuStore.manyVsOneActivated()

      this.activeBottomTab.set("results")

      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTo({ top: 0, behavior: "instant" })
      }
    })

    effect(() => {
      const attacker = this.activeAttacker()
      const secondAttacker = this.secondAttacker()

      const firstPokemonChanged = this.lastHandledPokemonNameFirst != attacker?.name || this.lastHandledAbilityNameFirst != attacker?.ability.name
      const secondPokemonChanged = this.lastHandledPokemonNameSecond != secondAttacker?.name || this.lastHandledAbilityNameSecond != secondAttacker?.ability.name

      if (attacker && (firstPokemonChanged || secondPokemonChanged)) {
        this.lastHandledPokemonNameFirst = attacker.name
        this.lastHandledAbilityNameFirst = attacker.ability.name

        this.lastHandledPokemonNameSecond = secondAttacker?.name
        this.lastHandledAbilityNameSecond = secondAttacker?.ability.name

        this.automaticFieldService.checkAutomaticField(attacker, firstPokemonChanged, secondAttacker, secondPokemonChanged)

        if (this.menuStore.manyVsOneActivated()) {
          this.store.targets().forEach((target: Target) => {
            if (!target.pokemon.isDefault && !target.secondPokemon) {
              this.damageCalculator.activateBestMoveForTarget(target.pokemon, attacker, this.fieldStore.field())
            }
          })
        }
      }
    })

    if (this.menuStore.manyVsOneActivated()) {
      this.store.targets().forEach((target: Target) => {
        if (!target.pokemon.isDefault && !target.secondPokemon) {
          const attacker = this.activeAttacker()

          if (attacker) {
            this.damageCalculator.activateBestMoveForTarget(target.pokemon, attacker, this.fieldStore.field())
          }
        }
      })
    }
  }

  activeBottomTab = signal<"results" | "teams" | "field">("results")
  showBottomNav = signal(true)
  private scrollPositions = new Map<string, number>()
  private lastScrollTop = 0
  pokemonOnEditId = signal<string | null>(null)

  lastHandledPokemonNameFirst = "\0"
  lastHandledAbilityNameFirst = "\0"
  lastHandledPokemonNameSecond: string | undefined = undefined
  lastHandledAbilityNameSecond: string | undefined = undefined
  expandedDefenderIds = signal<Set<string>>(new Set())

  effectiveEditingId = computed(() => this.pokemonOnEditId() || this.activePokemonId())

  editingPokemon = computed(() => {
    const id = this.effectiveEditingId()
    return id ? this.store.findNullablePokemonById(id) : undefined
  })

  editingPokemonName = computed(() => this.editingPokemon()?.name ?? "")
  editingPokemonItem = computed(() => this.editingPokemon()?.item ?? "")
  editingMoveIndex = computed(() => Math.max(0, this.editingPokemon()?.activeMoveIndex ?? 0))

  regulation = linkedSignal<Regulation>(() => this.store.targetMetaRegulation() ?? "MA")
  regulationsList = signal(["MA"])
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

  isEditingTarget = computed(() => {
    const editId = this.effectiveEditingId()

    if (!editId) return false

    return this.store.targets().some(t => t.pokemon.id === editId || t.secondPokemon?.id === editId)
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
    const attacker = this.store.findNullablePokemonById(editId)
    return attacker !== undefined && !attacker.isDefault
  })

  shouldShowPokemonSelect = computed(() => {
    const editId = this.effectiveEditingId()
    if (!editId) return false
    const attacker = this.store.findNullablePokemonById(editId)
    return attacker !== undefined && attacker.isDefault && this.teamMemberOnEdit()
  })

  selectPokemonActive = computed(() => {
    return this.store.targets().find(t => t.pokemon.isDefault) != null
  })

  haveMetaData = computed(() => this.store.targetMetaRegulation() != undefined)

  metaButtonLabel = computed(() => (this.haveMetaData() ? "Remove Meta" : "Add Meta"))

  onMetaClick() {
    if (this.haveMetaData()) {
      const newTargets = this.targetsExcludingMetaData()

      this.store.updateTargetMetaRegulation(undefined)
      this.activateTeamMember()
      this.store.updateTargets(newTargets)
    } else {
      this.store.updateTargetMetaRegulation(this.regulation())
      const setdex = SETDEX_CHAMPIONS
      const metaPokemon = pokemonByRegulation(this.regulation(), 33, setdex, false)
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
    const shouldUseSps = this.store.useSpsMode()
    this.exportPokeService.export("Opponent Pokémon", pokemon, shouldUseSps)
  }

  exportCalcs() {
    const content = this.damageResults()
      .map(r => r.description)
      .join("\n\n")

    this.dialog.open(TeamExportModalComponent, {
      data: { title: "Calc Results", content },
      width: "40em",
      position: { top: "2em" },
      autoFocus: false,
      scrollStrategy: new NoopScrollStrategy()
    })
  }

  private targetsExcludingMetaData(): Target[] {
    const setdex = SETDEX_CHAMPIONS
    const metaLeft = pokemonByRegulation(this.store.targetMetaRegulation()!, 33, setdex, false)

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

  handleOptimizeRequest(event: { updateNature: boolean; keepOffensiveEvs: boolean; survivalThreshold: number }) {
    const defender = this.store.findPokemonById(this.effectiveEditingId()!)
    const targets = this.store.targets()
    const field = this.fieldStore.field()

    if (targets.length === 0) return

    this.originalEvs.set({ ...defender.evs })
    this.originalNature.set(defender.nature)

    const rollIndex = this.rollLevelConfig().toRollIndex()
    const result = this.defensiveEvOptimizer.optimize(defender, targets, field, event.updateNature, event.keepOffensiveEvs, event.survivalThreshold as any, rollIndex, false)

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

  private justOpenedTable = false

  onPokemonMouseDown(event: MouseEvent) {
    if (!this.overlay.isAnyOpen()) {
      event.preventDefault()
      this.justOpenedTable = true
      this.overlay.open("pokemon")
    }
  }

  onPokemonClick() {
    if (this.justOpenedTable) {
      this.justOpenedTable = false
      return
    }

    if (this.pokemonInput) {
      this.pokemonInput.nativeElement.value = ""
      this.overlay.setFilter("")
    }
  }

  onPokemonInput(value: string) {
    this.overlay.setFilter(value)
  }

  onPokemonSelected(name: string) {
    const id = this.effectiveEditingId()
    if (!id) return
    this.store.loadPokemonInfo(id, name)
    this.overlay.close()
    this.pokemonInput?.nativeElement.blur()
  }

  onClosePokemonTable() {
    this.overlay.close()

    const editingPokemon = this.editingPokemon()

    if (editingPokemon?.isDefault && this.isEditingTarget()) {
      this.store.updateTargets(this.store.targets().filter(t => t.pokemon.id !== editingPokemon.id))
      this.activateTeamMember()
    }

    if (this.pokemonInput) {
      this.pokemonInput.nativeElement.value = this.editingPokemonName()
    }

    this.pokemonInput?.nativeElement.blur()
  }

  openMovesTable() {
    this.overlay.open("moves")
  }

  onMoveSelected(move: string) {
    const id = this.effectiveEditingId()
    if (!id) return
    const index = this.editingMoveIndex()
    this.store.updateMove(id, move, index)
  }

  onCloseMovesTable() {
    this.overlay.close()
  }

  openAbilitiesTable() {
    this.overlay.open("abilities")
  }

  onAbilitySelected(ability: string) {
    const id = this.effectiveEditingId()
    if (!id) return
    this.store.ability(id, ability)
    this.overlay.close()
  }

  openItemsTable() {
    this.overlay.open("items")
  }

  onItemMouseDown(event: MouseEvent) {
    if (!this.overlay.isAnyOpen()) {
      event.preventDefault()
      this.justOpenedTable = true
      this.overlay.open("items")
    }
  }

  onItemClick() {
    if (this.justOpenedTable) {
      this.justOpenedTable = false
      return
    }

    if (this.itemInput) {
      this.itemInput.nativeElement.value = ""
      this.overlay.setFilter("")
    }
  }

  onItemInput(value: string) {
    this.overlay.setFilter(value)
  }

  onItemSelected(name: string) {
    const id = this.effectiveEditingId()
    if (!id) return
    this.store.item(id, name)
    this.overlay.close()
    this.itemInput?.nativeElement.blur()
  }

  onCloseItemsTable() {
    this.overlay.close()
    this.itemInput?.nativeElement.blur()
  }

  onHeaderImport(pokemon: Pokemon | Pokemon[]) {
    const singlePokemon = Array.isArray(pokemon) ? pokemon[0] : pokemon

    if (!singlePokemon) return

    const id = this.effectiveEditingId()
    if (!id) return

    if (this.isEditingTarget()) {
      const targets = this.store.targets().map(t => {
        if (t.pokemon.id === id) return new Target(singlePokemon, t.secondPokemon)
        if (t.secondPokemon?.id === id) return new Target(t.pokemon, singlePokemon)
        return t
      })
      this.store.updateTargets(targets)
    } else {
      this.store.changePokemon(id, singlePokemon)
    }
  }

  onCustomSetEditRequested(set: CustomSet) {
    const id = this.effectiveEditingId()
    if (!id) return

    this.store.enterCustomSetEditMode(id, set.id)
  }

  onTableSelect(event: TableSelectEvent) {
    switch (event.kind) {
      case "pokemon":
        this.onPokemonSelected(event.value)
        break
      case "moves":
        this.onMoveSelected(event.value)
        break
      case "abilities":
        this.onAbilitySelected(event.value)
        break
      case "items":
        this.onItemSelected(event.value)
        break
    }
  }

  addPokemonToTargets() {
    const pokemon = defaultPokemon()
    const target = new Target(pokemon)
    const deactivatedTargets = this.store.targets().map(t => new Target(t.pokemon, t.secondPokemon))
    const targetsWithDefaultPokemon = deactivatedTargets.concat(target)

    this.store.updateTargets(targetsWithDefaultPokemon)
    this.pokemonOnEditId.set(pokemon.id)
    this.overlay.open("pokemon")
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

      if (target.pokemon.isDefault || active.pokemon.isDefault) return

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

    setTimeout(() => {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTo({ top: 0, behavior: "smooth" })
      }
    }, 150)
  }

  ngOnDestroy() {
    this.backNavigation.unregister()
  }

  switchTab(newTab: "results" | "teams" | "field") {
    const currentTab = this.activeBottomTab()
    if (currentTab === newTab) return

    const currentScroll = this.scrollContainer?.nativeElement.scrollTop || 0
    this.scrollPositions.set(currentTab, currentScroll)

    this.activeBottomTab.set(newTab)
    this.showBottomNav.set(true)

    if (newTab === "results") {
      this.backNavigation.pop()
    } else if (currentTab === "results") {
      this.backNavigation.push()
    }

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
    this.overlay.open("pokemon")
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement
    const currentScroll = target.scrollTop

    if (currentScroll > this.lastScrollTop && currentScroll > 50) {
      this.showBottomNav.set(false)
    } else if (currentScroll < this.lastScrollTop) {
      this.showBottomNav.set(true)
    }

    this.lastScrollTop = currentScroll
  }

  handleDragStarted() {
    this.cancelScroll()
  }

  handleDragMoved(event: CdkDragMove) {
    const scrollContainer = this.scrollContainer?.nativeElement

    if (!scrollContainer) return

    const pointerY = event.pointerPosition.y
    const containerRect = scrollContainer.getBoundingClientRect()
    const threshold = 120

    const distFromTop = pointerY - containerRect.top
    const distFromBottom = containerRect.bottom - pointerY

    if (distFromTop < threshold) {
      const intensity = (threshold - distFromTop) / threshold
      this.scrollVelocity = -Math.pow(intensity, 1.5) * 20
      this.requestScroll()
    } else if (distFromBottom < threshold) {
      const intensity = (threshold - distFromBottom) / threshold
      this.scrollVelocity = Math.pow(intensity, 1.5) * 20
      this.requestScroll()
    } else {
      this.cancelScroll()
    }
  }

  handleDragEnded() {
    this.cancelScroll()
  }

  private scrollFrame: number | null = null
  private scrollVelocity = 0

  private requestScroll() {
    if (this.scrollFrame !== null) return

    const step = () => {
      const container = this.scrollContainer?.nativeElement

      if (container && this.scrollVelocity !== 0) {
        container.scrollBy({ top: this.scrollVelocity, behavior: "auto" })
        this.scrollFrame = requestAnimationFrame(step)
      } else {
        this.scrollFrame = null
      }
    }

    this.scrollFrame = requestAnimationFrame(step)
  }

  private cancelScroll() {
    if (this.scrollFrame !== null) {
      cancelAnimationFrame(this.scrollFrame)
      this.scrollFrame = null
    }
    this.scrollVelocity = 0
  }
}
