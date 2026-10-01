data "archive_file" "create_paste" {
  type        = "zip"
  source_dir  = "${path.module}/lambda"
  output_path = "${path.module}/.build/create-paste.zip"
  excludes    = ["node_modules", "og-assets", "fonts", "package.json", "package-lock.json", "og-assets.mjs", "og-image.mjs", "og-render.mjs", "paste-page.mjs"]
}

data "archive_file" "paste_page" {
  type        = "zip"
  source_dir  = "${path.module}/.build/paste-page"
  output_path = "${path.module}/.build/paste-page.zip"
}

locals {
  functions = {
    create-paste = {
      handler     = "create-paste.handler"
      concurrency = var.create_paste_concurrency
      memory      = 256
      package     = data.archive_file.create_paste
      environment = {
        PASTES_BUCKET = aws_s3_bucket.pastes.id
      }
    }

    paste-page = {
      handler     = "paste-page.handler"
      concurrency = var.paste_page_concurrency
      memory      = 512
      package     = data.archive_file.paste_page
      environment = {
        PASTES_BUCKET            = aws_s3_bucket.pastes.id
        SITE_BUCKET              = var.site_bucket_name
        ACTIVE_RELEASE_PARAMETER = var.active_release_parameter_name
        PUBLIC_ORIGIN            = var.public_origin
      }
    }
  }
}

data "aws_iam_policy_document" "lambda_assume" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "function" {
  for_each = local.functions

  name               = "${var.name_prefix}-${each.key}"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

resource "aws_cloudwatch_log_group" "function" {
  for_each = local.functions

  name              = "/aws/lambda/${var.name_prefix}-${each.key}"
  retention_in_days = 14
}

data "aws_iam_policy_document" "create_paste" {
  statement {
    actions   = ["logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["${aws_cloudwatch_log_group.function["create-paste"].arn}:*"]
  }

  statement {
    actions   = ["s3:PutObject"]
    resources = ["${aws_s3_bucket.pastes.arn}/api/pastes/*", "${aws_s3_bucket.pastes.arn}/protected/*"]
  }

  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.pastes.arn}/protected/*"]
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.pastes.arn]
  }
}

data "aws_iam_policy_document" "paste_page" {
  statement {
    actions   = ["logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["${aws_cloudwatch_log_group.function["paste-page"].arn}:*"]
  }

  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.pastes.arn}/api/pastes/*", "${var.site_bucket_arn}/releases/*/404.html"]
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.pastes.arn]
  }

  statement {
    actions   = ["ssm:GetParameter"]
    resources = [var.active_release_parameter_arn]
  }
}

resource "aws_iam_role_policy" "function" {
  for_each = local.functions

  name   = "${var.name_prefix}-${each.key}"
  role   = aws_iam_role.function[each.key].id
  policy = each.key == "create-paste" ? data.aws_iam_policy_document.create_paste.json : data.aws_iam_policy_document.paste_page.json
}

resource "aws_lambda_function" "function" {
  for_each = local.functions

  function_name                  = "${var.name_prefix}-${each.key}"
  role                           = aws_iam_role.function[each.key].arn
  runtime                        = "nodejs24.x"
  architectures                  = ["arm64"]
  handler                        = each.value.handler
  filename                       = each.value.package.output_path
  source_code_hash               = each.value.package.output_base64sha256
  memory_size                    = each.value.memory
  timeout                        = 5
  reserved_concurrent_executions = each.value.concurrency

  logging_config {
    log_format            = "JSON"
    application_log_level = "WARN"
    system_log_level      = "WARN"
    log_group             = aws_cloudwatch_log_group.function[each.key].name
  }

  environment {
    variables = each.value.environment
  }

  depends_on = [aws_cloudwatch_log_group.function, aws_iam_role_policy.function]
}

resource "aws_lambda_function_url" "function" {
  for_each = local.functions

  function_name      = aws_lambda_function.function[each.key].function_name
  authorization_type = "AWS_IAM"
}

resource "aws_lambda_permission" "invoke_url" {
  for_each = local.functions

  statement_id           = "AllowCloudFrontInvokeFunctionUrl"
  action                 = "lambda:InvokeFunctionUrl"
  function_name          = aws_lambda_function.function[each.key].function_name
  principal              = "cloudfront.amazonaws.com"
  source_arn             = var.distribution_arn
  function_url_auth_type = "AWS_IAM"
}

resource "aws_lambda_permission" "invoke" {
  for_each = local.functions

  statement_id             = "AllowCloudFrontInvokeFunction"
  action                   = "lambda:InvokeFunction"
  function_name            = aws_lambda_function.function[each.key].function_name
  principal                = "cloudfront.amazonaws.com"
  source_arn               = var.distribution_arn
  invoked_via_function_url = true
}

resource "aws_cloudfront_origin_access_control" "lambda" {
  name                              = "${var.name_prefix}-pastes-lambda"
  description                       = "CloudFront access to the paste Lambda function URLs"
  origin_access_control_origin_type = "lambda"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}
