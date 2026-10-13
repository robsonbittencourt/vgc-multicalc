module "site" {
  source = "../modules/site"

  name_prefix              = "vgcmulticalc-dev"
  active_release_parameter = "/vgcmulticalc/dev/active-release"
  comment                  = "vgcmulticalc dev"
  aliases                  = ["dev.vgcmulticalc.com"]
  acm_certificate_arn      = "arn:aws:acm:us-east-1:377985789099:certificate/103a98e9-d3b1-4b20-8bf7-de5f65a95e95"
  apex_host                = ""
  www_host                 = "www.dev.invalid"
  prerender_routes_file    = "${path.module}/../../prerender-routes.txt"
  pastes                   = module.pastes.origins
  access_logs              = true
}

module "pastes" {
  source = "../modules/pastes"

  name_prefix                   = "vgcmulticalc-dev"
  site_bucket_name              = module.site.bucket_name
  site_bucket_arn               = module.site.bucket_arn
  active_release_parameter_name = module.site.active_release_parameter_name
  active_release_parameter_arn  = module.site.active_release_parameter_arn
  distribution_arn              = module.site.distribution_arn
  distribution_id               = module.site.distribution_id
  logs_bucket_name              = module.site.logs_bucket_name
  logs_bucket_arn               = module.site.logs_bucket_arn
  public_origin                 = "https://daxlgsrbxnzt9.cloudfront.net"
}
