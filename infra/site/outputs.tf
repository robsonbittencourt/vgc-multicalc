output "hosted_zone_id" {
  value = data.aws_route53_zone.main.zone_id
}

output "site_bucket_name" {
  value = module.site.bucket_name
}

output "certificate_arn" {
  value = aws_acm_certificate_validation.site.certificate_arn
}

output "distribution_id" {
  value = module.site.distribution_id
}

output "distribution_domain_name" {
  value = module.site.distribution_domain_name
}

output "github_deploy_role_arn" {
  value = aws_iam_role.github_deploy.arn
}
