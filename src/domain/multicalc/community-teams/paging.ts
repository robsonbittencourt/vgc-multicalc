export function pageCount(total: number, pageSize: number): number {
  return Math.max(1, Math.ceil(total / pageSize))
}

export function pageItems<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize

  return items.slice(start, start + pageSize)
}
