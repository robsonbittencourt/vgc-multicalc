module "site" {
  source = "../modules/site"

  name_prefix              = "vgcmulticalc-dev"
  active_release_parameter = "/vgcmulticalc/dev/active-release"
  comment                  = "vgcmulticalc dev"
  apex_host                = ""
  www_host                 = "www.dev.invalid"
  prerender_routes_file    = "${path.module}/../../prerender-routes.txt"
}
