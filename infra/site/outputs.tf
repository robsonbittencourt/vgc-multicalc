output "hosted_zone_id" {
  value = data.aws_route53_zone.main.zone_id
}

output "site_bucket_name" {
  value = aws_s3_bucket.site.id
}

output "certificate_arn" {
  value = aws_acm_certificate_validation.site.certificate_arn
}

output "distribution_id" {
  value = aws_cloudfront_distribution.site.id
}

output "distribution_domain_name" {
  value = aws_cloudfront_distribution.site.domain_name
}

output "github_deploy_role_arn" {
  value = aws_iam_role.github_deploy.arn
}
