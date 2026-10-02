import { discardPasteHandoff, savePasteHandoff, takePasteHandoff } from "@store/paste/paste-handoff"
import { SharedTeam } from "@store/paste/shared-team"

describe("paste handoff", () => {
  const team: SharedTeam = { kind: "team", version: 1, name: "Sun Room", useSpsMode: true, showdown: "Incineroar @ Sitrus Berry\n- Fake Out" }
  const now = 1790900000000

  beforeEach(() => {
    localStorage.clear()
  })

  it("should hand the team over once to the tab that takes it", () => {
    savePasteHandoff(localStorage, "a1", { team, asOpponents: true }, now)

    expect(takePasteHandoff(localStorage, "a1", now + 500)).toEqual({ team, asOpponents: true })
    expect(takePasteHandoff(localStorage, "a1", now + 600)).toBeNull()
  })

  it("should not hand over a team saved more than a minute ago", () => {
    savePasteHandoff(localStorage, "a1", { team, asOpponents: false }, now)

    expect(takePasteHandoff(localStorage, "a1", now + 60001)).toBeNull()
    expect(localStorage.getItem("pasteHandoff:a1")).toBeNull()
  })

  it("should ignore a handoff that is not a team", () => {
    localStorage.setItem("pasteHandoff:a1", JSON.stringify({ team: { kind: "calc" }, asOpponents: false, savedAt: now }))
    localStorage.setItem("pasteHandoff:a2", JSON.stringify({ team, asOpponents: "yes", savedAt: now }))

    expect(takePasteHandoff(localStorage, "a1", now)).toBeNull()
    expect(takePasteHandoff(localStorage, "a2", now)).toBeNull()
  })

  it("should ignore a handoff that is not JSON or has no date", () => {
    localStorage.setItem("pasteHandoff:a1", "{")
    localStorage.setItem("pasteHandoff:a2", JSON.stringify({ team, asOpponents: false }))

    expect(takePasteHandoff(localStorage, "a1", now)).toBeNull()
    expect(takePasteHandoff(localStorage, "a2", now)).toBeNull()
  })

  it("should clear the expired handoffs left behind when saving a new one, keeping the rest of the storage", () => {
    savePasteHandoff(localStorage, "old", { team, asOpponents: false }, now)
    savePasteHandoff(localStorage, "recent", { team, asOpponents: false }, now + 30000)
    localStorage.setItem("pasteHandoff:broken", "{")
    localStorage.setItem("userData", "{}")

    savePasteHandoff(localStorage, "new", { team, asOpponents: false }, now + 70000)

    expect(localStorage.getItem("pasteHandoff:old")).toBeNull()
    expect(localStorage.getItem("pasteHandoff:broken")).toBeNull()
    expect(localStorage.getItem("pasteHandoff:recent")).not.toBeNull()
    expect(localStorage.getItem("pasteHandoff:new")).not.toBeNull()
    expect(localStorage.getItem("userData")).toBe("{}")
  })

  it("should discard a handoff that no tab took", () => {
    savePasteHandoff(localStorage, "a1", { team, asOpponents: false }, now)

    discardPasteHandoff(localStorage, "a1")

    expect(localStorage.getItem("pasteHandoff:a1")).toBeNull()
  })
})
