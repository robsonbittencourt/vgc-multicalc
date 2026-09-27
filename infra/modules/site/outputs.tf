output "bucket_name" {
  value = aws_s3_bucket.site.id
}

output "bucket_arn" {
  value = aws_s3_bucket.site.arn
}

output "distribution_id" {
  value = aws_cloudfront_distribution.site.id
}

output "distribution_arn" {
  value = aws_cloudfront_distribution.site.arn
}

output "distribution_domain_name" {
  value = aws_cloudfront_distribution.site.domain_name
}

output "distribution_hosted_zone_id" {
  value = aws_cloudfront_distribution.site.hosted_zone_id
}

output "active_release_parameter_name" {
  value = aws_ssm_parameter.active_release.name
}

output "active_release_parameter_arn" {
  value = aws_ssm_parameter.active_release.arn
}
