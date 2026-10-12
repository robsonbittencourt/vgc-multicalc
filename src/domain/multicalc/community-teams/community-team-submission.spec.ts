import { CommunityTeamSubmissionFields, normalizeHandle, normalizeReplicaCode, submissionError, submittedTeam, SubmittedTeamDraft } from "@multicalc/community-teams"

const VALID: CommunityTeamSubmissionFields = { name: "Rain Archaludon", player: "Eric Rios", handle: "@Eric_Rios", event: "Recife Regional 2027", replicaCode: "a4rb rnn9ye", placement: " Top 8 " }

function errorFor(fields: Partial<CommunityTeamSubmissionFields>): string | undefined {
  return submissionError({ ...VALID, ...fields })
}

describe("normalizeHandle", () => {
  it("should drop the spaces and the leading at sign", () => {
    expect(normalizeHandle("  @Eric_Rios ")).toBe("Eric_Rios")
  })
})

describe("normalizeReplicaCode", () => {
  it("should drop the spaces and use capital letters", () => {
    expect(normalizeReplicaCode(" a4rb rnn9ye ")).toBe("A4RBRNN9YE")
  })
})

describe("submissionError", () => {
  it("should accept a team with every field", () => {
    expect(submissionError(VALID)).toBeUndefined()
  })

  it("should accept a team without Twitter handle, event and replica code", () => {
    expect(errorFor({ handle: "", event: "", replicaCode: "", placement: "" })).toBeUndefined()
  })

  it.each([["Champion"], ["runner up"], ["Top 32"], ["5th"], ["21st"], ["Top 32 (Seniors)"]])("should accept the placement %s", placement => {
    expect(errorFor({ placement })).toBeUndefined()
  })

  it.each([["First"], ["Top"], ["Peak 1st"]])("should refuse the placement %s", placement => {
    expect(errorFor({ placement })).toBe("Use a placement like Champion, Runner Up, Top 8 or 5th.")
  })

  it("should accept only a replica code of 10 letters and numbers", () => {
    expect(errorFor({ replicaCode: "A4RBRNN9Y" })).toBe("The replica code has 10 letters and numbers.")
    expect(errorFor({ replicaCode: "A4RBRNN9Y-" })).toBe("The replica code has 10 letters and numbers.")
  })

  it("should require the team name with up to 60 characters", () => {
    expect(errorFor({ name: "  " })).toBe("Add the team name.")
    expect(errorFor({ name: "a".repeat(61) })).toBe("The team name has more than 60 characters.")
    expect(errorFor({ name: ` ${"a".repeat(60)} ` })).toBeUndefined()
  })

  it("should require the creator with up to 40 characters", () => {
    expect(errorFor({ player: "" })).toBe("Add the creator.")
    expect(errorFor({ player: "a".repeat(41) })).toBe("The creator has more than 40 characters.")
  })

  it("should accept only a Twitter handle of up to 15 letters, numbers or underscores", () => {
    expect(errorFor({ handle: "eric rios" })).toBe("The Twitter handle has up to 15 letters, numbers or underscores.")
    expect(errorFor({ handle: "a".repeat(16) })).toBe("The Twitter handle has up to 15 letters, numbers or underscores.")
    expect(errorFor({ handle: "a".repeat(15) })).toBeUndefined()
  })

  it("should accept an event of up to 60 characters", () => {
    expect(errorFor({ event: "a".repeat(61) })).toBe("The event has more than 60 characters.")
  })

  it("should refuse links in any text field", () => {
    expect(errorFor({ name: "see www.example" })).toBe("Links are not allowed.")
    expect(errorFor({ player: "my.site" })).toBe("Links are not allowed.")
    expect(errorFor({ event: "https://example.com" })).toBe("Links are not allowed.")
  })
})

describe("submittedTeam", () => {
  const draft: SubmittedTeamDraft = {
    pasteId: "uZ5ATN1fRy",
    regulation: "M-C",
    date: "2026-10-12T15:22:34.523Z",
    name: "Rain",
    player: "Eric Rios",
    showdown: "Pelipper @ Damp Rock\nEVs: 2 HP / 32 SpA\n- Hurricane",
    members: [{ name: "Pelipper", item: "Damp Rock" }]
  }

  it("should build the team shown in the list right after the submission", () => {
    expect(submittedTeam({ ...draft, handle: "Eric_Rios", event: "Recife Regional 2027", replicaCode: "A4RBRNN9YE", placement: "Top 8" })).toEqual({
      id: "uZ5ATN1fRy",
      pasteId: "uZ5ATN1fRy",
      description: "Rain",
      player: "Eric Rios",
      handle: "Eric_Rios",
      regulation: "M-C",
      event: "Recife Regional 2027",
      replicaCode: "A4RBRNN9YE",
      placement: "Top 8",
      date: "2026-10-12T15:22:34.523Z",
      hasSps: true,
      members: [{ name: "Pelipper", item: "Damp Rock" }],
      source: "community"
    })
  })

  it("should leave out the missing handle and event and tell when the team has no SPs", () => {
    const team = submittedTeam({ ...draft, showdown: "Pelipper @ Damp Rock\n- Hurricane" })

    expect(team.hasSps).toBe(false)
    expect("handle" in team).toBe(false)
    expect("event" in team).toBe(false)
    expect("replicaCode" in team).toBe(false)
    expect("placement" in team).toBe(false)
  })
})
