resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
}

data "aws_iam_policy_document" "github_deploy_trust" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:robsonbittencourt/vgc-multicalc:ref:refs/heads/main"]
    }
  }
}

resource "aws_iam_role" "github_deploy" {
  name                 = "vgcmulticalc-github-deploy"
  description          = "Assumed by GitHub Actions (main branch) to publish and switch site releases"
  assume_role_policy   = data.aws_iam_policy_document.github_deploy_trust.json
  max_session_duration = 3600
}

data "aws_iam_policy_document" "github_deploy" {
  statement {
    sid       = "ListReleases"
    actions   = ["s3:ListBucket"]
    resources = [module.site.bucket_arn]
  }

  statement {
    sid       = "WriteReleases"
    actions   = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
    resources = ["${module.site.bucket_arn}/releases/*"]
  }

  statement {
    sid       = "WriteSharedAssets"
    actions   = ["s3:GetObject", "s3:PutObject"]
    resources = ["${module.site.bucket_arn}/shared/*"]
  }

  statement {
    sid       = "SwitchRelease"
    actions   = ["cloudfront:GetDistribution", "cloudfront:GetDistributionConfig", "cloudfront:UpdateDistribution", "cloudfront:CreateInvalidation", "cloudfront:GetInvalidation"]
    resources = [module.site.distribution_arn]
  }

  statement {
    sid       = "ActiveReleaseParameter"
    actions   = ["ssm:GetParameter", "ssm:PutParameter"]
    resources = [module.site.active_release_parameter_arn]
  }
}

resource "aws_iam_role_policy" "github_deploy" {
  name   = "deploy-site"
  role   = aws_iam_role.github_deploy.id
  policy = data.aws_iam_policy_document.github_deploy.json
}
