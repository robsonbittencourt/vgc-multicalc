import { Injectable } from "@angular/core"

@Injectable({ providedIn: "root" })
export class SpriteService {
  path(name: string): string {
    return `assets/sprites/pokemon-champions/${name}.webp`
  }
}
