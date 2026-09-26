resource "aws_ssm_parameter" "active_release" {
  name        = "/vgcmulticalc/site/active-release"
  description = "Origin path of the release served by CloudFront. Updated by the deploy and rollback workflows."
  type        = "String"
  value       = "/releases/initial"

  lifecycle {
    ignore_changes = [value]
  }
}
