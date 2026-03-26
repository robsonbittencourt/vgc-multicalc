import { Component, computed, inject, model, output } from "@angular/core"
import { NgClass } from "@angular/common"
import { MatIcon } from "@angular/material/icon"
import { CalculatorStore } from "@data/store/calculator-store"
import { MenuStore } from "@data/store/menu-store"
import { defaultPokemon } from "@lib/default-pokemon"

@Component({
  selector: "app-team-tabs-mobile",
  templateUrl: "./team-tabs-mobile.component.html",
  styleUrls: ["./team-tabs-mobile.component.scss"],
  imports: [MatIcon, NgClass]
})
export class TeamTabsMobileComponent {
  pokemonOnEditId = model<string | null>(null)
  memberAddedEvent = output<void>()

  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)

  private longPressTimeout: any
  private preventNextClick = false

  teamMembers = computed(() => this.store.team().teamMembers)

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

  isSecondAttacker(pokemonId: string): boolean {
    return this.menuStore.oneVsManyActivated() && this.store.secondAttackerId() === pokemonId
  }

  onTabTouchStart(_event: TouchEvent, pokemonId: string) {
    if (!this.menuStore.oneVsManyActivated()) return

    this.preventNextClick = false

    this.longPressTimeout = setTimeout(() => {
      this.preventNextClick = true

      if (this.menuStore.oneVsManyActivated() && pokemonId !== this.activePokemonId()) {
        const members = this.teamMembers()
        const actives = [false, false, false, false, false, false]

        members.forEach((m, i) => {
          if (i < 6) actives[i] = m.pokemon.id === this.activePokemonId() || m.pokemon.id === pokemonId
        })

        this.store.updateSecondAttacker(pokemonId)
        this.store.updateTeamMembersActive(actives[0], actives[1], actives[2], actives[3], actives[4], actives[5])
      }
    }, 500)
  }

  onTabTouchEnd() {
    clearTimeout(this.longPressTimeout)
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
    }
  }

  addMember() {
    const members = this.teamMembers()
    const firstDefaultIndex = members.findIndex(m => m.pokemon.isDefault)

    if (firstDefaultIndex !== -1) {
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
}
