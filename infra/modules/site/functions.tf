locals {
  prerendered_routes = [
    for route in split("\n", trimspace(file(var.prerender_routes_file))) : trimspace(route)
    if !contains(["/", "/404", ""], trimspace(route))
  ]
}

resource "aws_cloudfront_function" "viewer_request" {
  name    = "${var.name_prefix}-viewer-request"
  runtime = "cloudfront-js-2.0"
  comment = "Redirects, trailing slash and client-only route rewrites"
  publish = true
  code    = templatefile("${path.module}/functions/viewer-request.js.tftpl", { prerendered_routes = jsonencode(local.prerendered_routes), apex_host = var.apex_host, www_host = var.www_host })
}
