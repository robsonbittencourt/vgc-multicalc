locals {
  immutable_paths = join(" or ", [
    "starts_with(http.request.uri.path, \"/assets/\")",
    "starts_with(http.request.uri.path, \"/media/\")",
    "starts_with(http.request.uri.path, \"/api/pastes/\")",
    "http.request.uri.path eq \"/api/teams/most-viewed.json\"",
    "(starts_with(http.request.uri.path, \"/chunk-\") and ends_with(http.request.uri.path, \".js\"))",
    "(starts_with(http.request.uri.path, \"/main-\") and ends_with(http.request.uri.path, \".js\"))",
    "(starts_with(http.request.uri.path, \"/styles-\") and ends_with(http.request.uri.path, \".css\"))"
  ])
}

resource "cloudflare_ruleset" "cache" {
  zone_id = cloudflare_zone.site.id
  name    = "vgcmulticalc cache"
  kind    = "zone"
  phase   = "http_request_cache_settings"

  rules = [
    {
      description = "Cache immutable files"
      expression  = "(${local.immutable_paths})"
      action      = "set_cache_settings"
      action_parameters = {
        cache = true
        edge_ttl = {
          mode = "respect_origin"
          status_code_ttl = [
            {
              status_code_range = {
                from = 400
                to   = 599
              }
              value = -1
            }
          ]
        }
        browser_ttl = {
          mode = "respect_origin"
        }
      }
    },
    {
      description = "Bypass everything else"
      expression  = "not (${local.immutable_paths})"
      action      = "set_cache_settings"
      action_parameters = {
        cache = false
      }
    }
  ]
}

resource "cloudflare_argo_tiered_caching" "site" {
  zone_id = cloudflare_zone.site.id
  value   = "on"
}

resource "cloudflare_tiered_cache" "site" {
  zone_id = cloudflare_zone.site.id
  value   = "on"
}
