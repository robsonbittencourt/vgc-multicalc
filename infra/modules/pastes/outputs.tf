output "origins" {
  value = {
    bucket_regional_domain_name = aws_s3_bucket.pastes.bucket_regional_domain_name
    create_paste_domain_name    = trimsuffix(trimprefix(aws_lambda_function_url.function["create-paste"].function_url, "https://"), "/")
    paste_page_domain_name      = trimsuffix(trimprefix(aws_lambda_function_url.function["paste-page"].function_url, "https://"), "/")
    lambda_access_control_id    = aws_cloudfront_origin_access_control.lambda.id
  }
}

output "bucket_name" {
  value = aws_s3_bucket.pastes.id
}
