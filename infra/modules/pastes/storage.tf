resource "aws_s3_bucket" "pastes" {
  bucket = "${var.name_prefix}-pastes"
}

resource "aws_s3_bucket_public_access_block" "pastes" {
  bucket = aws_s3_bucket.pastes.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_ownership_controls" "pastes" {
  bucket = aws_s3_bucket.pastes.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "pastes" {
  bucket = aws_s3_bucket.pastes.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

data "aws_iam_policy_document" "pastes_bucket" {
  statement {
    sid       = "AllowCloudFrontRead"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.pastes.arn}/api/pastes/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [var.distribution_arn]
    }
  }

  statement {
    sid     = "DenyInsecureTransport"
    effect  = "Deny"
    actions = ["s3:*"]

    resources = [
      aws_s3_bucket.pastes.arn,
      "${aws_s3_bucket.pastes.arn}/*"
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

resource "aws_s3_bucket_policy" "pastes" {
  bucket = aws_s3_bucket.pastes.id
  policy = data.aws_iam_policy_document.pastes_bucket.json

  depends_on = [aws_s3_bucket_public_access_block.pastes]
}
