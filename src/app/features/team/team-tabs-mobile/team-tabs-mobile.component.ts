import { Component, computed, inject, model, output, signal } from "@angular/core"
import { PokemonSpriteComponent } from "@basic/pokemon-sprite/pokemon-sprite.component"
import { NgClass } from "@angular/common"
import { MatIcon } from "@angular/material/icon"
import { CalculatorStore } from "@data/store/calculator-store"
import { MenuStore } from "@data/store/menu-store"
import { defaultPokemon } from "@lib/default-pokemon"
import { SnackbarService } from "@lib/snackbar.service"

const COMBINE_HINT_KEY = "combineAttackersHintDismissed"

@Component({
  selector: "app-team-tabs-mobile",
  templateUrl: "./team-tabs-mobile.component.html",
  styleUrls: ["./team-tabs-mobile.component.scss"],
  imports: [MatIcon, NgClass, PokemonSpriteComponent]
})
export class TeamTabsMobileComponent {
  pokemonOnEditId = model<string | null>(null)

  memberAddedEvent = output<void>()
  pokemonDeleted = output<string | null>()

  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  private snackbar = inject(SnackbarService)

  actionMenuPokemonId = signal<string | null>(null)

  private combineHintDismissed = signal(this.readCombineHintDismissed())

  private longPressTimeout: any
  private preventNextClick = false

  teamMembers = computed(() => this.store.team().teamMembers)

  showCombineHint = computed(() => {
    return this.menuStore.oneVsManyActivated() && this.nonDefaultMembersCount() >= 2 && this.store.secondAttackerId() === "" && !this.combineHintDismissed()
  })

  effectiveEditingId = computed(() => this.pokemonOnEditId() || this.activePokemonId())

  activePokemonId = computed(() => {
    const members = this.store.team().teamMembers
    if (members.length === 0) return null

    const secondAttackerId = this.store.secondAttackerId()
    const activeMember = members.find(m => m.active && m.pokemon.id !== secondAttackerId)

    return activeMember ? activeMember.pokemon.id : members[0].pokemon.id
  })

  shouldShowPokemonTabs = computed(() => {
    return this.teamMembers().length > 0
  })

  nonDefaultMembersCount = computed(() => {
    return this.teamMembers().filter(m => !m.pokemon.isDefault).length
  })

  canImportPokemon = computed(() => this.teamMembers().length < 6 || this.hasDefaultMember())

  canDuplicate = computed(() => this.teamMembers().filter(m => !m.pokemon.isDefault).length < 6)

  isEditingDefault = computed(() => {
    const id = this.effectiveEditingId()

    if (!id) return false

    const p = this.store.findPokemonById(id)

    return p?.isDefault ?? false
  })

  hasDefaultMember = computed(() => this.teamMembers().some(m => m.pokemon.isDefault))

  editingTarget = computed(() => {
    const editId = this.pokemonOnEditId()
    if (!editId) return null

    const isInTeam = this.teamMembers().some(m => m.pokemon.id === editId) || this.store.secondAttackerId() === editId
    if (isInTeam) return null

    return this.store.targets().find(t => t.pokemon.id === editId || t.secondPokemon?.id === editId)
  })

  editingPokemon = computed(() => {
    const editId = this.pokemonOnEditId()
    if (!editId) return null
    return this.store.findPokemonById(editId)
  })

  editingCustomSetPokemon = computed(() => {
    const pokemonId = this.store.activeSetPokemonId()
    if (!pokemonId) return null
    return this.store.findPokemonById(pokemonId)
  })

  exitCustomSetEditMode() {
    this.store.exitCustomSetEditMode()
    this.pokemonOnEditId.set(null)
  }

  isSecondAttacker(pokemonId: string): boolean {
    return this.menuStore.oneVsManyActivated() && this.store.secondAttackerId() === pokemonId
  }

  onTabTouchStart(_event: TouchEvent, pokemonId: string) {
    this.preventNextClick = false

    this.longPressTimeout = setTimeout(() => {
      this.preventNextClick = true

      if (this.menuStore.oneVsManyActivated() && pokemonId !== this.activePokemonId()) {
        const activePokeId = this.activePokemonId() ?? ""
        const activePokemon = this.store.findNullablePokemonById(activePokeId)
        const targetPokemon = this.store.findPokemonById(pokemonId)

        if (!activePokemon?.isDefault && !targetPokemon?.isDefault) {
          const members = this.teamMembers()
          const actives = [false, false, false, false, false, false]

          members.forEach((m, i) => {
            if (i < 6) actives[i] = m.pokemon.id === activePokeId || m.pokemon.id === pokemonId
          })

          this.store.updateSecondAttacker(pokemonId)
          this.store.updateTeamMembersActive(actives[0], actives[1], actives[2], actives[3], actives[4], actives[5])
          this.dismissCombineHint()
        }

        return
      }

      this.actionMenuPokemonId.set(pokemonId)
    }, 500)
  }

  onTabTouchEnd() {
    clearTimeout(this.longPressTimeout)
  }

  dismissCombineHint() {
    this.combineHintDismissed.set(true)

    if (typeof localStorage !== "undefined") {
      localStorage.setItem(COMBINE_HINT_KEY, "true")
    }
  }

  private readCombineHintDismissed(): boolean {
    if (typeof localStorage === "undefined") return false

    return localStorage.getItem(COMBINE_HINT_KEY) === "true"
  }

  closeActionMenu() {
    this.actionMenuPokemonId.set(null)
  }

  deleteFromActionMenu() {
    const id = this.actionMenuPokemonId()

    if (id) {
      this.pokemonOnEditId.set(id)
      this.removeActivePokemon()
    }

    this.closeActionMenu()
  }

  duplicateFromActionMenu() {
    const id = this.actionMenuPokemonId()

    if (id && this.canDuplicate()) {
      const source = this.store.findPokemonById(id)
      this.store.addTeamMember(source.clone())
      this.snackbar.open("Pokemon duplicated")
    }

    this.closeActionMenu()
  }

  setActivePokemon(pokemonId: string) {
    if (this.preventNextClick) {
      this.preventNextClick = false

      return
    }

    const index = this.teamMembers().findIndex(member => member.pokemon.id === pokemonId)

    if (index !== -1) {
      if (!this.menuStore.oneVsManyActivated()) {
        this.store.updateSecondAttacker("")
      }

      if (this.store.secondAttackerId() !== "") {
        const members = this.teamMembers()
        const actives = [false, false, false, false, false, false]

        members.forEach((m, i) => {
          if (i < 6) actives[i] = m.pokemon.id === pokemonId
        })

        this.store.updateSecondAttacker("")
        this.store.updateTeamMembersActive(actives[0], actives[1], actives[2], actives[3], actives[4], actives[5])
      } else {
        this.store.activateTeamMember(index)
      }

      this.pokemonOnEditId.set(pokemonId)

      if (this.store.activeSetPokemonId() !== pokemonId) {
        this.store.clearActiveSet()
      }
    }
  }

  addMember() {
    const members = this.teamMembers()
    const firstDefaultIndex = members.findIndex(m => m.pokemon.isDefault)

    if (firstDefaultIndex !== -1) {
      this.store.updateSecondAttacker("")
      this.store.activateTeamMember(firstDefaultIndex)
      this.pokemonOnEditId.set(members[firstDefaultIndex].pokemon.id)
      this.memberAddedEvent.emit()

      return
    }

    if (members.length < 6) {
      this.store.addTeamMember(defaultPokemon())
      const newIndex = members.length
      this.store.activateTeamMember(newIndex)
      this.pokemonOnEditId.set(this.teamMembers()[newIndex].pokemon.id)
      this.memberAddedEvent.emit()
    }
  }

  clearEditMode() {
    this.pokemonOnEditId.set(null)
  }

  removeActivePokemon() {
    const idToRemove = this.effectiveEditingId()

    if (!idToRemove) return

    const target = this.editingTarget()

    if (target) {
      const allTargets = this.store.targets()

      if (allTargets.length > 1) {
        const index = allTargets.findIndex(t => t.pokemon.id === idToRemove || t.secondPokemon?.id === idToRemove)
        const nextIndex = index === 0 ? 1 : index - 1
        const nextId = allTargets[nextIndex].pokemon.id

        const newTargets = allTargets.filter(t => t.pokemon.id !== idToRemove && t.secondPokemon?.id !== idToRemove)
        this.store.updateTargets(newTargets)
        this.pokemonOnEditId.set(nextId)
        this.pokemonDeleted.emit(nextId)
      } else {
        this.store.changePokemon(idToRemove, defaultPokemon())
        this.pokemonDeleted.emit(idToRemove)
      }

      return
    }

    let nextId: string | null = null

    if (this.teamMembers().length > 1) {
      nextId = this.teamMembers().find(m => m.pokemon.id !== idToRemove)?.pokemon.id || null

      if (nextId) {
        const nextIndex = this.teamMembers().findIndex(m => m.pokemon.id === nextId)
        this.store.activateTeamMember(nextIndex)
      }

      this.store.removeTeamMember(idToRemove)
      this.snackbar.open("Pokemon deleted")
    } else {
      this.store.changePokemon(idToRemove, defaultPokemon())
      nextId = idToRemove
    }

    this.pokemonOnEditId.set(nextId)
    this.pokemonDeleted.emit(nextId)
  }
}
