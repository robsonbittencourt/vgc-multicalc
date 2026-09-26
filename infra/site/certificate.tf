resource "aws_acm_certificate" "site" {
  domain_name               = "vgcmulticalc.com"
  subject_alternative_names = ["*.vgcmulticalc.com"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "certificate_validation" {
  for_each = {
    for domain, options in {
      for option in aws_acm_certificate.site.domain_validation_options : trimprefix(option.domain_name, "*.") => option...
    } : domain => options[0]
  }

  zone_id         = data.aws_route53_zone.main.zone_id
  name            = each.value.resource_record_name
  type            = each.value.resource_record_type
  records         = [each.value.resource_record_value]
  ttl             = 300
  allow_overwrite = false
}

resource "aws_acm_certificate_validation" "site" {
  certificate_arn         = aws_acm_certificate.site.arn
  validation_record_fqdns = [for record in aws_route53_record.certificate_validation : record.fqdn]
}
