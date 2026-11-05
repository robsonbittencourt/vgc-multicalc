resource "aws_acm_certificate" "site" {
  domain_name               = "vgcmulticalc.com"
  subject_alternative_names = ["*.vgcmulticalc.com"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}
