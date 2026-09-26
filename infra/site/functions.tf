locals {
  prerendered_routes = [
    for route in split("\n", trimspace(file("${path.module}/../../prerender-routes.txt"))) : trimspace(route)
    if !contains(["/", "/404", ""], trimspace(route))
  ]
}

resource "aws_cloudfront_function" "viewer_request" {
  name    = "vgcmulticalc-viewer-request"
  runtime = "cloudfront-js-2.0"
  comment = "Redirects, trailing slash and client-only route rewrites"
  publish = true
  code    = templatefile("${path.module}/functions/viewer-request.js.tftpl", { prerendered_routes = jsonencode(local.prerendered_routes) })
}
