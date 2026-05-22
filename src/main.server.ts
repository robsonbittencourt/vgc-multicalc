import { importProvidersFrom, provideZonelessChangeDetection } from "@angular/core"
import { provideHttpClient, withFetch } from "@angular/common/http"
import { bootstrapApplication, BootstrapContext } from "@angular/platform-browser"
import { provideServerRendering } from "@angular/ssr"
import { AppRoutingModule } from "@app/app-routing.module"
import { AppComponent } from "@app/app.component"
import { CALC_ADJUSTERS } from "@lib/damage-calculator/calc-adjuster/calc-adjuster"
import { FairyAuraAdjuster } from "@lib/damage-calculator/calc-adjuster/fairy-aura-adjuster"
import { LastRespectsAdjuster } from "@lib/damage-calculator/calc-adjuster/last-respects-adjuster"
import { NeutralizingGasAdjuster } from "@lib/damage-calculator/calc-adjuster/neutralizing-gas-adjuster"
import { OgerponAdjuster } from "@lib/damage-calculator/calc-adjuster/ogerpon-adjuster"
import { SupremeOverlordAdjuster } from "@lib/damage-calculator/calc-adjuster/supreme-overlord-adjuster"
import { RageFistAdjuster } from "@lib/damage-calculator/calc-adjuster/rage-fist-adjuster"
import { StompingTantrumAdjuster } from "@lib/damage-calculator/calc-adjuster/stomping-tantrum-adjuster"
import { RuinsAbilityAdjuster } from "@lib/damage-calculator/calc-adjuster/ruins-ability-adjuster"
import { ZacianZamazentaAdjuster } from "@lib/damage-calculator/calc-adjuster/zacian-zamazenta-adjuster"

const bootstrap = (context?: BootstrapContext) =>
  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(AppRoutingModule),
      provideZonelessChangeDetection(),
      provideHttpClient(withFetch()),
      provideServerRendering(),
      { provide: CALC_ADJUSTERS, useClass: RuinsAbilityAdjuster, multi: true },
      { provide: CALC_ADJUSTERS, useClass: FairyAuraAdjuster, multi: true },
      { provide: CALC_ADJUSTERS, useClass: LastRespectsAdjuster, multi: true },
      { provide: CALC_ADJUSTERS, useClass: RageFistAdjuster, multi: true },
      { provide: CALC_ADJUSTERS, useClass: StompingTantrumAdjuster, multi: true },
      { provide: CALC_ADJUSTERS, useClass: ZacianZamazentaAdjuster, multi: true },
      { provide: CALC_ADJUSTERS, useClass: NeutralizingGasAdjuster, multi: true },
      { provide: CALC_ADJUSTERS, useClass: OgerponAdjuster, multi: true },
      { provide: CALC_ADJUSTERS, useClass: SupremeOverlordAdjuster, multi: true }
    ]
  }, context)

export default bootstrap
