resource "aws_cloudfront_cache_policy" "site" {
  name        = "${var.name_prefix}-site"
  comment     = "Honors origin Cache-Control; compressed variants"
  min_ttl     = 0
  default_ttl = 86400
  max_ttl     = 31536000

  parameters_in_cache_key_and_forwarded_to_origin {
    enable_accept_encoding_brotli = true
    enable_accept_encoding_gzip   = true

    cookies_config {
      cookie_behavior = "none"
    }

    headers_config {
      header_behavior = "none"
    }

    query_strings_config {
      query_string_behavior = "none"
    }
  }
}

locals {
  paste_origins = var.pastes == null ? [] : [
    { id = "pastes", domain_name = var.pastes.bucket_regional_domain_name, access_control_id = aws_cloudfront_origin_access_control.site.id, s3 = true },
    { id = "create-paste", domain_name = var.pastes.create_paste_domain_name, access_control_id = var.pastes.lambda_access_control_id, s3 = false },
    { id = "paste-page", domain_name = var.pastes.paste_page_domain_name, access_control_id = var.pastes.lambda_access_control_id, s3 = false }
  ]

  paste_behaviors = var.pastes == null ? [] : [
    { path_pattern = "/api/pastes", origin = "create-paste", allowed_methods = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"], cache_policy_id = data.aws_cloudfront_cache_policy.caching_disabled.id, origin_request_policy_id = aws_cloudfront_origin_request_policy.create_paste[0].id },
    { path_pattern = "/api/pastes/*/unlock", origin = "create-paste", allowed_methods = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"], cache_policy_id = data.aws_cloudfront_cache_policy.caching_disabled.id, origin_request_policy_id = aws_cloudfront_origin_request_policy.create_paste[0].id },
    { path_pattern = "/api/pastes/*", origin = "pastes", allowed_methods = ["GET", "HEAD", "OPTIONS"], cache_policy_id = aws_cloudfront_cache_policy.site.id, origin_request_policy_id = null },
    { path_pattern = "/paste/?*", origin = "paste-page", allowed_methods = ["GET", "HEAD", "OPTIONS"], cache_policy_id = aws_cloudfront_cache_policy.site.id, origin_request_policy_id = null }
  ]
}

data "aws_cloudfront_cache_policy" "caching_disabled" {
  name = "Managed-CachingDisabled"
}

resource "aws_cloudfront_origin_request_policy" "create_paste" {
  count = var.pastes == null ? 0 : 1

  name    = "${var.name_prefix}-create-paste"
  comment = "Headers forwarded to the create-paste function"

  cookies_config {
    cookie_behavior = "none"
  }

  headers_config {
    header_behavior = "whitelist"

    headers {
      items = ["content-type", "x-paste-stamp", "CloudFront-Viewer-Address"]
    }
  }

  query_strings_config {
    query_string_behavior = "none"
  }
}

resource "aws_cloudfront_distribution" "site" {
  enabled         = true
  comment         = var.comment
  aliases         = var.aliases
  http_version    = "http2and3"
  is_ipv6_enabled = true
  price_class     = "PriceClass_All"

  origin {
    origin_id                = "site"
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_path              = aws_ssm_parameter.active_release.value
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  origin {
    origin_id                = "shared-assets"
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_path              = "/shared"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  dynamic "origin" {
    for_each = local.paste_origins

    content {
      origin_id                = origin.value.id
      domain_name              = origin.value.domain_name
      origin_access_control_id = origin.value.access_control_id

      dynamic "custom_origin_config" {
        for_each = origin.value.s3 ? [] : [true]

        content {
          http_port              = 80
          https_port             = 443
          origin_protocol_policy = "https-only"
          origin_ssl_protocols   = ["TLSv1.2"]
        }
      }
    }
  }

  default_cache_behavior {
    target_origin_id       = "site"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    cache_policy_id        = aws_cloudfront_cache_policy.site.id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.viewer_request.arn
    }
  }

  dynamic "ordered_cache_behavior" {
    for_each = local.paste_behaviors

    content {
      path_pattern             = ordered_cache_behavior.value.path_pattern
      target_origin_id         = ordered_cache_behavior.value.origin
      viewer_protocol_policy   = "redirect-to-https"
      allowed_methods          = ordered_cache_behavior.value.allowed_methods
      cached_methods           = ["GET", "HEAD"]
      compress                 = true
      cache_policy_id          = ordered_cache_behavior.value.cache_policy_id
      origin_request_policy_id = ordered_cache_behavior.value.origin_request_policy_id
    }
  }

  dynamic "ordered_cache_behavior" {
    for_each = [{ path = "/assets/*", origin = "shared-assets" }, { path = "/media/*", origin = "site" }, { path = "*.js", origin = "site" }, { path = "*.css", origin = "site" }, { path = "*.json", origin = "site" }]

    content {
      path_pattern           = ordered_cache_behavior.value.path
      target_origin_id       = ordered_cache_behavior.value.origin
      viewer_protocol_policy = "redirect-to-https"
      allowed_methods        = ["GET", "HEAD", "OPTIONS"]
      cached_methods         = ["GET", "HEAD"]
      compress               = true
      cache_policy_id        = aws_cloudfront_cache_policy.site.id
    }
  }

  custom_error_response {
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 10
  }

  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 10
  }

  dynamic "custom_error_response" {
    for_each = var.pastes == null ? [] : [500, 502, 503, 504]

    content {
      error_code            = custom_error_response.value
      response_code         = custom_error_response.value
      response_page_path    = "/404.html"
      error_caching_min_ttl = 10
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn            = var.acm_certificate_arn
    ssl_support_method             = var.acm_certificate_arn == null ? null : "sni-only"
    minimum_protocol_version       = var.acm_certificate_arn == null ? "TLSv1" : "TLSv1.2_2021"
    cloudfront_default_certificate = var.acm_certificate_arn == null
  }
}

data "aws_iam_policy_document" "site_bucket" {
  statement {
    sid       = "AllowCloudFrontRead"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.site.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.site.arn]
    }
  }

  statement {
    sid     = "DenyInsecureTransport"
    effect  = "Deny"
    actions = ["s3:*"]

    resources = [
      aws_s3_bucket.site.arn,
      "${aws_s3_bucket.site.arn}/*"
    ]

    principals {
      type        = "*"
      identifiers = ["*"]
    }

    condition {
      test     = "Bool"
      variable = "aws:SecureTransport"
      values   = ["false"]
    }
  }
}

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.site_bucket.json

  depends_on = [aws_s3_bucket_public_access_block.site]
}
