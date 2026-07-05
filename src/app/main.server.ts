import { importProvidersFrom, provideZonelessChangeDetection } from "@angular/core"
import { provideHttpClient, withFetch } from "@angular/common/http"
import { bootstrapApplication, BootstrapContext } from "@angular/platform-browser"
import { provideServerRendering } from "@angular/ssr"
import { AppRoutingModule } from "@app/app-routing.module"
import { AppComponent } from "@app/app.component"

const bootstrap = (context?: BootstrapContext) =>
  bootstrapApplication(
    AppComponent,
    {
      providers: [importProvidersFrom(AppRoutingModule), provideZonelessChangeDetection(), provideHttpClient(withFetch()), provideServerRendering()]
    },
    context
  )

export default bootstrap
