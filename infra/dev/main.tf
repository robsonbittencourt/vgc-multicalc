module "site" {
  source = "../modules/site"

  name_prefix              = "vgcmulticalc-dev"
  active_release_parameter = "/vgcmulticalc/dev/active-release"
  comment                  = "vgcmulticalc dev"
  apex_host                = ""
  www_host                 = "www.dev.invalid"
  prerender_routes_file    = "${path.module}/../../prerender-routes.txt"
  pastes                   = module.pastes.origins
}

module "pastes" {
  source = "../modules/pastes"

  name_prefix                   = "vgcmulticalc-dev"
  site_bucket_name              = module.site.bucket_name
  site_bucket_arn               = module.site.bucket_arn
  active_release_parameter_name = module.site.active_release_parameter_name
  active_release_parameter_arn  = module.site.active_release_parameter_arn
  distribution_arn              = module.site.distribution_arn
  public_origin                 = "https://daxlgsrbxnzt9.cloudfront.net"
}
