export function toID(text: string): string {
  const lower = `${text}`.toLowerCase()

  if (lower === "flabébé") {
    return "flabebe"
  }

  return lower.replace(/[^a-z0-9]+/g, "")
}
