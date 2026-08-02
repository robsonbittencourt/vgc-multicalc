import { Injectable } from "@angular/core"

const SPRITE_FILE_NAME_OVERRIDES: Record<string, string> = {
  "Type: Null": "Type-Null"
}

@Injectable({ providedIn: "root" })
export class SpriteService {
  path(name: string): string {
    return `assets/sprites/pokemon-champions/${this.fileName(name)}.webp`
  }

  homePath(name: string): string {
    return `assets/sprites/pokemon-home/${this.fileName(name)}.webp`
  }

  private fileName(name: string): string {
    return encodeURIComponent(SPRITE_FILE_NAME_OVERRIDES[name] ?? name)
  }
}
