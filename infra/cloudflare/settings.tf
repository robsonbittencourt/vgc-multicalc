locals {
  zone_settings = {
    ssl                      = "strict"
    min_tls_version          = "1.2"
    email_obfuscation        = "off"
    automatic_https_rewrites = "off"
    server_side_exclude      = "off"
    replace_insecure_js      = "off"
    rocket_loader            = "off"
    early_hints              = "off"
  }
}

resource "cloudflare_zone_setting" "site" {
  for_each = local.zone_settings

  zone_id    = cloudflare_zone.site.id
  setting_id = each.key
  value      = each.value
}

resource "cloudflare_zone_setting" "browser_cache_ttl" {
  zone_id    = cloudflare_zone.site.id
  setting_id = "browser_cache_ttl"
  value      = 0
}
