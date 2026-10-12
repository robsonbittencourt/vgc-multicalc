locals {
  account_id      = "ec454a39271a2c6d328c52522ade6eaa"
  site_cloudfront = "d2qq3fgp6yrf5b.cloudfront.net"
  dev_cloudfront  = "daxlgsrbxnzt9.cloudfront.net"
}

resource "cloudflare_zone" "site" {
  account = {
    id = local.account_id
  }

  name = "vgcmulticalc.com"
  type = "full"

  lifecycle {
    prevent_destroy = true
  }
}

resource "cloudflare_dns_record" "site" {
  for_each = toset(["vgcmulticalc.com", "www.vgcmulticalc.com"])

  zone_id = cloudflare_zone.site.id
  name    = each.value
  type    = "CNAME"
  content = local.site_cloudfront
  proxied = false
  ttl     = 300
}

resource "cloudflare_dns_record" "acm_validation" {
  zone_id = cloudflare_zone.site.id
  name    = "_239660f44cf5d145d13786a388e7a14b.vgcmulticalc.com"
  type    = "CNAME"
  content = "_e393ef846c20b3075378e5b983491fc6.wzccmgtwzk.acm-validations.aws"
  proxied = false
  ttl     = 300
}

resource "cloudflare_dns_record" "dev" {
  zone_id = cloudflare_zone.site.id
  name    = "dev.vgcmulticalc.com"
  type    = "CNAME"
  content = local.dev_cloudfront
  proxied = true
  ttl     = 1
}
