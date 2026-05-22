import { DOCUMENT } from "@angular/common"
import { Component, inject, OnInit } from "@angular/core"
import { Meta, Title } from "@angular/platform-browser"
import { ActivatedRoute } from "@angular/router"
import { ProbabilityCalcComponent } from "@app/pages/probability-calc/probability-calc/probability-calc.component"
import { HeaderMobileComponent } from "@core/header-mobile/header-mobile.component"
import { HeaderComponent } from "@core/header/header.component"
import { CalculatorState, CalculatorStore } from "@data/store/calculator-store"
import { ActiveFieldService } from "@data/store/active-field.service"
import { MenuStore } from "@data/store/menu-store"
import { buildState } from "@data/store/utils/user-data-mapper"
import { DeviceDetectorService } from "@lib/device-detector.service"
import { HowToUseComponent } from "@pages/how-to-use/how-to-use.component"
import { MultiCalcComponent } from "@pages/multi-calc/multi-calc/multi-calc.component"
import { MultiCalcMobileComponent } from "@pages/multi-calc/multi-calc-mobile/multi-calc-mobile.component"
import { ProbabilityCalcMobileComponent } from "@app/pages/probability-calc/probability-calc-mobile/probability-calc-mobile.component"
import { SimpleCalcMobileComponent } from "@pages/simple-calc/simple-calc-mobile/simple-calc-mobile.component"
import { SimpleCalcComponent } from "@pages/simple-calc/simple-calc/simple-calc.component"
import { SpeedCalculatorMobileComponent } from "@pages/speed-calc/speed-calculator-mobile/speed-calculator-mobile.component"
import { SpeedCalculatorComponent } from "@pages/speed-calc/speed-calculator/speed-calculator.component"
import { TypeCalculatorComponent } from "@pages/type-calc/type-calculator/type-calculator.component"
import { TypeCalcMobileComponent } from "@pages/type-calc/type-calc-mobile/type-calc-mobile.component"

type ToolEntry = { enable: (store: InstanceType<typeof MenuStore>) => void; title: string; description: string; path: string }

const TOOL_CONFIG: Record<string, ToolEntry> = {
  oneVsOne: {
    enable: store => store.enableOneVsOne(),
    title: "Pokémon Damage Calculator - One vs One - VGC Champions",
    description: "Classic one-on-one Pokémon damage calculator for VGC and Pokémon Champions. Detailed side-by-side analysis with EVs, Natures, abilities and damage rolls.",
    path: "/one-vs-one"
  },
  oneVsMany: {
    enable: store => store.enableOneVsMany(),
    title: "Pokémon Damage Calculator - Team vs Many - VGC Champions",
    description: "Calculate damage from one Pokémon against multiple targets at once. The ultimate multi-target damage calculator for VGC and Pokémon Champions Doubles.",
    path: "/team-vs-many"
  },
  manyVsOne: {
    enable: store => store.enableManyVsOne(),
    title: "Pokémon Damage Calculator - Many vs Team - VGC Champions",
    description: "Calculate how much damage multiple Pokémon deal to a single target. Evaluate defensive durability across your entire team for VGC and Pokémon Champions.",
    path: "/many-vs-team"
  },
  speed: {
    enable: store => store.enableSpeedCalculator(),
    title: "Pokémon Damage Calculator - Speed Calc - VGC Champions",
    description: "Free Pokémon speed calculator for VGC and Pokémon Champions. Compare speed tiers, Tailwind, Trick Room and nature modifiers to master initiative order.",
    path: "/speed-calc"
  },
  type: {
    enable: store => store.enableTypeCalculator(),
    title: "Pokémon Damage Calculator - Type Calc - VGC Champions",
    description: "Free Pokémon type calculator for VGC and Pokémon Champions. Analyze offensive and defensive type coverage against your team.",
    path: "/type-calc"
  },
  probability: {
    enable: store => store.enableProbabilityCalculator(),
    title: "Pokémon Damage Calculator - Probability Calc - VGC Champions",
    description: "Free Pokémon damage probability calculator for VGC and Pokémon Champions. Calculate KO chance, OHKO and 2HKO probabilities across all damage rolls.",
    path: "/probability-calc"
  },
  howToUse: {
    enable: store => store.enableHowToUse(),
    title: "Pokémon Damage Calculator - How to Use - VGC Champions",
    description: "Learn how to use VGC Multi Calc: multi-target damage calculation, EV optimization, speed tiers, type coverage and damage probability for VGC and Pokémon Champions.",
    path: "/how-to-use"
  }
}

const HOME_TITLE = "Pokémon Damage Calculator - Multi Calc - VGC Champions"
const HOME_DESCRIPTION = "Free Pokémon damage calculator for VGC and Pokémon Champions. Calculate damage against multiple Pokémon at once (multi-target), with IVs/EVs, abilities and full move support."
const OG_IMAGE = "https://vgcmulticalc.com/assets/icons/calc-512x512.png"

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  imports: [
    HeaderComponent,
    SimpleCalcComponent,
    MultiCalcComponent,
    SpeedCalculatorComponent,
    ProbabilityCalcComponent,
    TypeCalculatorComponent,
    HowToUseComponent,
    HeaderMobileComponent,
    SimpleCalcMobileComponent,
    MultiCalcMobileComponent,
    SpeedCalculatorMobileComponent,
    ProbabilityCalcMobileComponent,
    TypeCalcMobileComponent
  ]
})
export class MainComponent implements OnInit {
  store = inject(CalculatorStore)
  menuStore = inject(MenuStore)
  activeFieldService = inject(ActiveFieldService)
  private activatedRoute = inject(ActivatedRoute)
  private deviceDetectorService = inject(DeviceDetectorService)
  private meta = inject(Meta)
  private title = inject(Title)
  private document = inject(DOCUMENT)

  userDataLink: string
  useUserData = false

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userData, tool }) => {
      this.useUserData = this.activatedRoute.routeConfig?.path == "data/:userDataId"

      if (this.useUserData) {
        this.meta.addTag({ name: "robots", content: "noindex, follow" })
        const state = buildState(userData?.data) as CalculatorState
        this.store.updateStateLockingLocalStorage(state)
        this.activeFieldService.initialFieldData.set(userData?.data.field)
      }

      this.applyToolRoute(tool)
    })
  }

  private applyToolRoute(tool: string | undefined) {
    const config = tool ? TOOL_CONFIG[tool] : null

    if (config) {
      config.enable(this.menuStore)
      this.title.setTitle(config.title)
      this.meta.updateTag({ name: "description", content: config.description })
      this.updateSocialTags(config.title, config.description, `https://vgcmulticalc.com${config.path}`)
    } else if (!this.useUserData) {
      this.updateSocialTags(HOME_TITLE, HOME_DESCRIPTION, "https://vgcmulticalc.com/")
    }
  }

  private updateSocialTags(title: string, description: string, url: string) {
    this.meta.updateTag({ property: "og:title", content: title })
    this.meta.updateTag({ property: "og:description", content: description })
    this.meta.updateTag({ property: "og:url", content: url })
    this.meta.updateTag({ property: "og:type", content: "website" })
    this.meta.updateTag({ property: "og:image", content: OG_IMAGE })
    this.meta.updateTag({ name: "twitter:card", content: "summary_large_image" })
    this.meta.updateTag({ name: "twitter:title", content: title })
    this.meta.updateTag({ name: "twitter:description", content: description })
    this.meta.updateTag({ name: "twitter:image", content: OG_IMAGE })

    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]')

    if (!canonical) {
      canonical = this.document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      this.document.head.appendChild(canonical)
    }

    canonical.setAttribute("href", url)
  }

  isDesktopDevice(): boolean {
    return this.deviceDetectorService.isDesktop()
  }
}
