import { Injector, provideZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { TeamsService } from "@features/team/teams.service"
import { importPasteHandoff } from "@app/routes/paste-import"
import { savePasteHandoff } from "@store/paste/paste-handoff"
import { SharedTeam } from "@store/paste/shared-team"

describe("importPasteHandoff", () => {
  const team: SharedTeam = { kind: "team", version: 1, name: "Sun Room", useSpsMode: true, showdown: "Incineroar @ Sitrus Berry\nEVs: 32 HP / 2 Def / 32 SpD\n- Fake Out" }
  let importPasteTeam: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    localStorage.clear()
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] })
    importPasteTeam = vi.spyOn(TestBed.inject(TeamsService), "importPasteTeam").mockImplementation(vi.fn())
  })

  it("should import the team handed over by the paste page, as asked", async () => {
    savePasteHandoff(localStorage, "a1", { team, asOpponents: true }, Date.now())

    await importPasteHandoff(TestBed.inject(Injector), "a1")

    const [pokemon, importedTeam, asOpponents] = importPasteTeam.mock.calls[0]
    expect((pokemon as { name: string }[]).map(p => p.name)).toEqual(["Incineroar"])
    expect(importedTeam).toEqual(team)
    expect(asOpponents).toBe(true)
    expect(localStorage.getItem("pasteHandoff:a1")).toBeNull()
  })

  it("should import nothing when there is no team to take", async () => {
    await importPasteHandoff(TestBed.inject(Injector), "missing")

    expect(importPasteTeam).not.toHaveBeenCalled()
  })

  it("should import nothing when the team cannot be read", async () => {
    savePasteHandoff(localStorage, "a1", { team: { ...team, showdown: "Fakemon @ Leftovers\n- Tackle" }, asOpponents: false }, Date.now())

    await importPasteHandoff(TestBed.inject(Injector), "a1")

    expect(importPasteTeam).not.toHaveBeenCalled()
  })
})
