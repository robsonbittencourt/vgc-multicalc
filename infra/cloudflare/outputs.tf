output "zone_id" {
  value = cloudflare_zone.site.id
}

output "name_servers" {
  value = cloudflare_zone.site.name_servers
}
