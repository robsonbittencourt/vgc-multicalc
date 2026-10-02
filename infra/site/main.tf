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
  pastes                   = module.pastes.origins
}

module "pastes" {
  source = "../modules/pastes"

  name_prefix                   = "vgcmulticalc"
  site_bucket_name              = module.site.bucket_name
  site_bucket_arn               = module.site.bucket_arn
  active_release_parameter_name = module.site.active_release_parameter_name
  active_release_parameter_arn  = module.site.active_release_parameter_arn
  distribution_arn              = module.site.distribution_arn
  public_origin                 = "https://vgcmulticalc.com"
}
