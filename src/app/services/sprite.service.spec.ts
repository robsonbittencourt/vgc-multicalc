import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { SpriteService } from "@app/services/sprite.service"

describe("SpriteService", () => {
  let service: SpriteService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), SpriteService]
    })

    service = TestBed.inject(SpriteService)
  })

  it("should build the champions sprite path for a Pokémon", () => {
    expect(service.path("Incineroar")).toBe("assets/sprites/pokemon-champions/Incineroar.webp")
  })

  it("should build the home sprite path for a Pokémon", () => {
    expect(service.homePath("Incineroar")).toBe("assets/sprites/pokemon-home/Incineroar.webp")
  })

  it("should use the override file name for Type: Null", () => {
    expect(service.path("Type: Null")).toBe("assets/sprites/pokemon-champions/Type-Null.webp")
  })

  it("should use the override file name for Type: Null on the home sprite", () => {
    expect(service.homePath("Type: Null")).toBe("assets/sprites/pokemon-home/Type-Null.webp")
  })

  it("should encode characters that are not safe in a URL", () => {
    expect(service.path("Farfetch'd")).toBe("assets/sprites/pokemon-champions/Farfetch'd.webp")
  })

  it("should encode the space of a Pokémon with a compound name", () => {
    expect(service.path("Flutter Mane")).toBe("assets/sprites/pokemon-champions/Flutter%20Mane.webp")
  })
})
