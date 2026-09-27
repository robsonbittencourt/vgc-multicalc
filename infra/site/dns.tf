data "aws_route53_zone" "main" {
  name         = "vgcmulticalc.com"
  private_zone = false
}

locals {
  site_records = {
    apex_a    = { name = "vgcmulticalc.com", type = "A" }
    apex_aaaa = { name = "vgcmulticalc.com", type = "AAAA" }
    www_a     = { name = "www.vgcmulticalc.com", type = "A" }
    www_aaaa  = { name = "www.vgcmulticalc.com", type = "AAAA" }
  }
}

resource "aws_route53_record" "site" {
  for_each = local.site_records

  zone_id = data.aws_route53_zone.main.zone_id
  name    = each.value.name
  type    = each.value.type

  alias {
    name                   = module.site.distribution_domain_name
    zone_id                = module.site.distribution_hosted_zone_id
    evaluate_target_health = false
  }

  lifecycle {
    prevent_destroy = true
  }
}
