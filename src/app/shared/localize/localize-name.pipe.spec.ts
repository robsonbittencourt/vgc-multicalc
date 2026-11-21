import { provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { LocalizeNamePipe } from "@shared/localize/localize-name.pipe"
import { LanguageStore } from "@store/language-store"

describe("LocalizeNamePipe", () => {
  let pipe: LocalizeNamePipe

  beforeEach(async () => {
    localStorage.clear()
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), LocalizeNamePipe]
    })
    await TestBed.inject(LanguageStore).updateLanguage("es")
    pipe = TestBed.inject(LocalizeNamePipe)
  })

  it("should translate a name of the given kind to the selected language", () => {
    const names = [pipe.transform("Trick Room", "moves"), pipe.transform("Rotom-Wash", "pokemon")]

    expect(names).toEqual(["Espacio Raro", "Rotom Lavado"])
  })

  it("should show a Pokémon name with or without its form", () => {
    const names = [pipe.transform("Rotom-Wash", "pokemonDisplay"), pipe.transform("Rotom-Wash", "pokemonWithoutSuffix")]

    expect(names).toEqual(["Rotom Lavado", "Rotom"])
  })

  it("should follow a change of language", async () => {
    await TestBed.inject(LanguageStore).updateLanguage("en")

    const name = pipe.transform("Trick Room", "moves")

    expect(name).toBe("Trick Room")
  })

  it("should show nothing when there is no name", () => {
    const names = [pipe.transform(undefined, "items"), pipe.transform(null, "items"), pipe.transform("", "items")]

    expect(names).toEqual(["", "", ""])
  })
})
