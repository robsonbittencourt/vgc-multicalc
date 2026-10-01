const PRODUCTION_HOSTS = ["vgcmulticalc.com", "www.vgcmulticalc.com"]

export function pastesEnabled(hostname: string): boolean {
  return !PRODUCTION_HOSTS.includes(hostname)
}
