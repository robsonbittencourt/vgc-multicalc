import { Injectable } from "@angular/core"

const SPRITE_FOLDERS = ["pokemon-champions", "pokemon-sv"]

@Injectable({ providedIn: "root" })
export class SpriteService {
  path(name: string): string {
    return this.paths(name)[0]
  }

  paths(name: string): string[] {
    return SPRITE_FOLDERS.map(folder => `assets/sprites/${folder}/${name}.webp`)
  }
}
