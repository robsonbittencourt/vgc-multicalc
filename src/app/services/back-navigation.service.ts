import { Injectable, PLATFORM_ID, inject } from "@angular/core"
import { isPlatformBrowser } from "@angular/common"

export interface TabStep {
  kind: "tab"
  tab: string
}

export interface OverlayStep {
  kind: "overlay"
}

export interface CreationStep {
  kind: "creation"
  originTab: string | null
}

export type NavStep = TabStep | OverlayStep | CreationStep

export interface BackNavigationResolvers {
  tab: (step: TabStep) => void
  overlay: (step: OverlayStep) => void
  exhausted: () => void
  creation?: (step: CreationStep) => void
}

@Injectable({ providedIn: "root" })
export class BackNavigationService {
  private platformId = inject(PLATFORM_ID)

  private resolvers: BackNavigationResolvers | null = null
  private steps: NavStep[] = []
  private isPoppingProgrammatically = false

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return

    window.addEventListener("popstate", () => {
      if (this.isPoppingProgrammatically) {
        this.isPoppingProgrammatically = false

        return
      }

      const resolvers = this.resolvers

      if (!resolvers) {
        if (history.state?.vgcPhantom) {
          history.back()
        }

        return
      }

      const step = this.steps.pop()

      if (step) {
        this.resolve(step, resolvers)

        return
      }

      resolvers.exhausted()
    })
  }

  private resolve(step: NavStep, resolvers: BackNavigationResolvers) {
    if (step.kind === "tab") {
      resolvers.tab(step)

      return
    }

    if (step.kind === "overlay") {
      resolvers.overlay(step)

      return
    }

    resolvers.creation?.(step)
  }

  register(resolvers: BackNavigationResolvers) {
    this.resolvers = resolvers
    this.steps = []
  }

  push(step: NavStep) {
    if (!isPlatformBrowser(this.platformId) || !this.resolvers) return

    history.pushState({ vgcPhantom: true }, "")
    this.steps.push(step)
  }

  pop() {
    if (this.steps.length === 0) return

    this.steps.pop()

    if (!history.state?.vgcPhantom) return

    this.isPoppingProgrammatically = true
    history.back()
  }

  get depth() {
    return this.steps.length
  }

  contains(kind: NavStep["kind"]) {
    return this.steps.some(step => step.kind === kind)
  }

  unregister() {
    this.resolvers = null
    this.steps = []
  }
}
