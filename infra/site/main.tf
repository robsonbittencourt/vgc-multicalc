module "site" {
  source = "../modules/site"

  name_prefix              = "vgcmulticalc"
  active_release_parameter = "/vgcmulticalc/site/active-release"
  comment                  = "vgcmulticalc.com"
  aliases                  = ["vgcmulticalc.com", "www.vgcmulticalc.com"]
  acm_certificate_arn      = aws_acm_certificate_validation.site.certificate_arn
  apex_host                = "vgcmulticalc.com"
  www_host                 = "www.vgcmulticalc.com"
  prerender_routes_file    = "${path.module}/../../prerender-routes.txt"
}
