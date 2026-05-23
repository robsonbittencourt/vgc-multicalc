import { DOCUMENT } from "@angular/common"
import { inject, Injectable } from "@angular/core"

@Injectable({ providedIn: "root" })
export class JsonLdService {
  private document = inject(DOCUMENT)

  set(id: string, schema: object) {
    let script = this.document.getElementById(id) as HTMLScriptElement | null

    if (!script) {
      script = this.document.createElement("script")
      script.id = id
      script.type = "application/ld+json"
      this.document.head.appendChild(script)
    }

    script.textContent = JSON.stringify(schema)
  }
}
