import { NoopScrollStrategy } from "@angular/cdk/overlay"
import { CdkDragDrop, CdkDropList, CdkDropListGroup } from "@angular/cdk/drag-drop"
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, inject, input, output, signal } from "@angular/core"
import { MatButton } from "@angular/material/button"
import { MatDialog } from "@angular/material/dialog"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { InputAutocompleteComponent } from "@shared/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { STAT_MODIFIERS } from "@shared/input-select/stat-modifiers"
import { WidgetComponent } from "@shared/widget/widget.component"
import { CalcStore, META_SOURCE, MY_LIST_SOURCE } from "@store/calc-store"
import { MenuStore } from "@store/menu-store"
import { pokemonToState } from "@store/utils/state-mapper"
import { setsMatch } from "@store/utils/sets-match"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { RollConfigComponent } from "@features/roll-config/roll-config.component"
import { TeamExportModalComponent } from "@features/modals/export-modal/export-modal.component"
import { DamageResult, RollLevelConfig } from "@multicalc/damage-calc"
import { Pokemon } from "@multicalc/model"
import { Stats } from "@multicalc/types"
import { SnackbarService } from "@app/services/snackbar.service"
import { ExportPokeService } from "@store/user-data/export-poke.service"
import { AddPokemonCardComponent } from "@pages/multi-calc/add-pokemon-card/add-pokemon-card.component"
import { PokemonCardComponent } from "@pages/multi-calc/pokemon-card/pokemon-card.component"
import { MultiCalcService } from "@pages/multi-calc/multi-calc.service"

@Component({
  selector: "app-target-pokemon",
  templateUrl: "./target-pokemon.component.html",
  styleUrls: ["./target-pokemon.component.scss"],
  imports: [CdkDropList, CdkDropListGroup, MatButton, MatSlideToggle, WidgetComponent, InputAutocompleteComponent, InputSelectComponent, PokemonCardComponent, AddPokemonCardComponent, ImportPokemonButtonComponent, RollConfigComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TargetPokemonComponent {
  damageResults = input.required<DamageResult[]>()
  isAttacker = input.required<boolean>()

  addingTarget = input<boolean>(false)

  targetActivated = output<string>()
  addTargetRequested = output()
  targetRemoved = output()
  targetsImported = output()
  bestMoveForTargetsToggled = output()
  opponentSourceSelected = output()
  rollLevelChange = output<RollLevelConfig>()

  store = inject(CalcStore)
  menuStore = inject(MenuStore)
  private exportPokeService = inject(ExportPokeService)
  private multiCalcService = inject(MultiCalcService)
  private dialog = inject(MatDialog)
  private snackBar = inject(SnackbarService)

  rollLevelConfig = signal(RollLevelConfig.fromConfigString(this.store.multiCalcRollLevel()))

  constructor() {
    effect(() => {
      const level = this.isAttacker() ? this.store.manyVsTeamRollLevel() : this.store.multiCalcRollLevel()
      this.rollLevelConfig.set(RollLevelConfig.fromConfigString(level))
    })
  }

  cardsFilter = signal("")
  setFilter = signal("")

  readonly statModifiers = STAT_MODIFIERS

  physicalBoost = signal("0")
  specialBoost = signal("0")

  readonly physicalBoostStat = computed<keyof Stats>(() => (this.isAttacker() ? "atk" : "def"))
  readonly specialBoostStat = computed<keyof Stats>(() => (this.isAttacker() ? "spa" : "spd"))

  readonly physicalBoostLabel = computed(() => (this.isAttacker() ? "Atk" : "Def"))
  readonly specialBoostLabel = computed(() => (this.isAttacker() ? "SpA" : "SpD"))

  applyBoostToOpponents(stat: keyof Stats, value: string) {
    const boost = parseInt(value)

    this.store
      .displayedTargets()
      .flatMap(target => target.pokemons())
      .forEach(pokemon => this.store.boosts(pokemon.id, { ...pokemon.boosts, [stat]: boost }))
  }

  toggleManyVsOneBestMove() {
    this.menuStore.toggleManyVsOneBestMove()
    this.bestMoveForTargetsToggled.emit()
  }

  title = computed(() => (this.isAttacker() ? "Opponent Attackers" : "Opponent Defenders"))

  readonly opponentSourceOptions = computed(() => [{ key: "My List", value: MY_LIST_SOURCE }, { key: "Meta", value: META_SOURCE }, ...this.store.opponentTeamOptions().map(t => ({ key: t.name, value: t.id }))])

  selectOpponentSource(source: string) {
    this.activateTeamMember()
    this.store.selectOpponentSource(source)
    this.opponentSourceSelected.emit()
  }

  getExpansionKey(result: DamageResult): string {
    return this.isAttacker() ? result.attacker.id : result.defender.id
  }

  private cardPokemons(result: DamageResult): Pokemon[] {
    if (this.isAttacker()) {
      return result.secondAttacker ? [result.attacker, result.secondAttacker] : [result.attacker]
    }

    return [result.defender]
  }

  readonly setNameByPokemonId = computed(() => {
    const customSets = this.store.customSetsByPokemon()
    const map = new Map<string, string>()

    for (const result of this.damageResults()) {
      for (const pokemon of this.cardPokemons(result)) {
        const sets = customSets.get(pokemon.name) ?? []
        const state = pokemonToState(pokemon)
        const matched = sets.find(s => setsMatch(s.state, state))

        if (matched) {
          map.set(pokemon.id, `${pokemon.name} - ${matched.setName}`)
        }
      }
    }

    return map
  })

  readonly availableSetNames = computed(() => [...new Set(this.setNameByPokemonId().values())].sort())

  filteredDamageResults = computed(() => {
    const filter = this.cardsFilter().toLocaleLowerCase()
    const setFilter = this.setFilter()

    let results = this.damageResults()

    if (filter) {
      if (this.isAttacker()) {
        results = results.filter(result => result.attacker.name.toLocaleLowerCase().includes(filter) || result.secondAttacker?.name.toLocaleLowerCase().includes(filter))
      } else {
        results = results.filter(result => result.defender.name.toLocaleLowerCase().includes(filter))
      }
    }

    if (setFilter) {
      const normalizedSetFilter = setFilter.toLocaleLowerCase()
      const setNameById = this.setNameByPokemonId()
      results = results.filter(result =>
        this.cardPokemons(result).some(pokemon => {
          const setName = setNameById.get(pokemon.id)

          return setName != undefined && setName.toLocaleLowerCase().includes(normalizedSetFilter)
        })
      )
    }

    return results
  })

  readonly targetPokemonNames = computed(() => {
    const names = this.damageResults().flatMap(result => (this.isAttacker() ? [result.attacker.name, result.secondAttacker?.name] : [result.defender.name]))

    return [...new Set(names.filter((name): name is string => !!name))].sort()
  })

  removeAll() {
    this.activateTeamMember()
    this.store.removeAllTargets()
    this.snackBar.open("Pokémon removed")
  }

  pokemonImported(pokemon: Pokemon | Pokemon[]) {
    const pokemonList = pokemon as Pokemon[]
    const allTargets = pokemonList.reduce((targets, p) => this.multiCalcService.addMember(targets, p), this.store.targets())

    this.store.updateTargets(allTargets)

    this.targetsImported.emit()

    this.snackBar.open("Pokémon imported")
  }

  exportPokemon() {
    const pokemon = this.store.displayedTargets().flatMap(t => t.pokemons())
    const shouldUseSps = this.store.useSpsMode()
    this.exportPokeService.export("Opponent Pokémon", pokemon, shouldUseSps)
  }

  exportCalcs() {
    const content = this.filteredDamageResults()
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

  addPokemonToTargets() {
    this.addTargetRequested.emit()
  }

  selectPokemonActive(): boolean {
    return this.addingTarget()
  }

  activateTarget(pokemonId: string) {
    this.targetActivated.emit(pokemonId)
  }

  drop(event: CdkDragDrop<string, any>) {
    const { previousContainer, container } = event

    if (previousContainer.data == container.data) return

    const newTargets = this.multiCalcService.combineAttackers(this.store.displayedTargets(), container.data, previousContainer.data)

    if (newTargets) {
      this.store.updateDisplayedTargets(newTargets)
    }
  }

  separateAttackers(pokemonId: string) {
    const newTargets = this.multiCalcService.separateAttackers(this.store.displayedTargets(), pokemonId)
    this.store.updateDisplayedTargets(newTargets)
  }

  updateCardsFilter(event: string) {
    const cardsFilter = event
    this.cardsFilter.set(cardsFilter)
  }

  clearCardsFilter() {
    this.cardsFilter.set("")
  }

  readonly anyFilterActive = computed(() => this.cardsFilter() !== "" || this.setFilter() !== "")

  readonly canAddTarget = computed(() => this.store.isMyListSource() && !this.anyFilterActive())

  updateSetFilter(event: string) {
    this.setFilter.set(event)
  }

  clearSetFilter() {
    this.setFilter.set("")
  }

  handleRollLevelChange(rollLevel: RollLevelConfig) {
    this.rollLevelConfig.set(rollLevel)
    this.rollLevelChange.emit(rollLevel)

    if (this.isAttacker()) {
      this.store.updateManyVsTeamRollLevel(rollLevel.toConfigString())
    } else {
      this.store.updateMultiCalcRollLevel(rollLevel.toConfigString())
    }
  }

  private activateTeamMember() {
    this.targetActivated.emit(this.store.team().activePokemon()?.id ?? "")
  }
}
