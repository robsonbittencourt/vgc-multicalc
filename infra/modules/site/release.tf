resource "aws_ssm_parameter" "active_release" {
  name        = var.active_release_parameter
  description = "Origin path of the release served by CloudFront. Updated by the deploy and rollback workflows."
  type        = "String"
  value       = "/releases/initial"

  lifecycle {
    ignore_changes = [value]
  }
}
