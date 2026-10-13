locals {
  team_stats_enabled = var.logs_bucket_name != null
}

data "archive_file" "team_stats" {
  count = local.team_stats_enabled ? 1 : 0

  type        = "zip"
  output_path = "${path.module}/.build/team-stats.zip"

  dynamic "source" {
    for_each = ["core.mjs", "stats-core.mjs", "stats-job.mjs", "stats-store.mjs", "team-stats.mjs"]

    content {
      content  = file("${path.module}/lambda/${source.value}")
      filename = source.value
    }
  }
}

resource "aws_cloudwatch_log_group" "team_stats" {
  count = local.team_stats_enabled ? 1 : 0

  name              = "/aws/lambda/${var.name_prefix}-team-stats"
  retention_in_days = 14
}

resource "aws_iam_role" "team_stats" {
  count = local.team_stats_enabled ? 1 : 0

  name               = "${var.name_prefix}-team-stats"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

data "aws_iam_policy_document" "team_stats" {
  count = local.team_stats_enabled ? 1 : 0

  statement {
    actions   = ["logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["${aws_cloudwatch_log_group.team_stats[0].arn}:*"]
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = [var.logs_bucket_arn, aws_s3_bucket.pastes.arn]
  }

  statement {
    actions   = ["s3:GetObject"]
    resources = ["${var.logs_bucket_arn}/*"]
  }

  statement {
    actions   = ["s3:GetObject", "s3:PutObject"]
    resources = ["${aws_s3_bucket.pastes.arn}/stats/*", "${aws_s3_bucket.pastes.arn}/api/teams/most-viewed.json"]
  }
}

resource "aws_iam_role_policy" "team_stats" {
  count = local.team_stats_enabled ? 1 : 0

  name   = "${var.name_prefix}-team-stats"
  role   = aws_iam_role.team_stats[0].id
  policy = data.aws_iam_policy_document.team_stats[0].json
}

resource "aws_lambda_function" "team_stats" {
  count = local.team_stats_enabled ? 1 : 0

  function_name    = "${var.name_prefix}-team-stats"
  role             = aws_iam_role.team_stats[0].arn
  runtime          = "nodejs24.x"
  architectures    = ["arm64"]
  handler          = "team-stats.handler"
  filename         = data.archive_file.team_stats[0].output_path
  source_code_hash = data.archive_file.team_stats[0].output_base64sha256
  memory_size      = 512
  timeout          = 300

  logging_config {
    log_format            = "JSON"
    application_log_level = "WARN"
    system_log_level      = "WARN"
    log_group             = aws_cloudwatch_log_group.team_stats[0].name
  }

  environment {
    variables = {
      LOGS_BUCKET     = var.logs_bucket_name
      PASTES_BUCKET   = aws_s3_bucket.pastes.id
      DISTRIBUTION_ID = var.distribution_id
    }
  }

  depends_on = [aws_cloudwatch_log_group.team_stats, aws_iam_role_policy.team_stats]
}

data "aws_iam_policy_document" "scheduler_assume" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["scheduler.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "team_stats_schedule" {
  count = local.team_stats_enabled ? 1 : 0

  name               = "${var.name_prefix}-team-stats-schedule"
  assume_role_policy = data.aws_iam_policy_document.scheduler_assume.json
}

resource "aws_iam_role_policy" "team_stats_schedule" {
  count = local.team_stats_enabled ? 1 : 0

  name = "${var.name_prefix}-team-stats-schedule"
  role = aws_iam_role.team_stats_schedule[0].id
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [{ Effect = "Allow", Action = "lambda:InvokeFunction", Resource = aws_lambda_function.team_stats[0].arn }]
  })
}

resource "aws_scheduler_schedule" "team_stats" {
  count = local.team_stats_enabled ? 1 : 0

  name                = "${var.name_prefix}-team-stats"
  schedule_expression = var.team_stats_schedule

  flexible_time_window {
    mode = "OFF"
  }

  target {
    arn      = aws_lambda_function.team_stats[0].arn
    role_arn = aws_iam_role.team_stats_schedule[0].arn
  }
}
