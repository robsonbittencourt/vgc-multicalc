data "aws_route53_zone" "main" {
  name         = "vgcmulticalc.com"
  private_zone = false
}
