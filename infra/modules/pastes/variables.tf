variable "name_prefix" {
  type = string
}

variable "site_bucket_name" {
  type = string
}

variable "site_bucket_arn" {
  type = string
}

variable "active_release_parameter_name" {
  type = string
}

variable "active_release_parameter_arn" {
  type = string
}

variable "distribution_arn" {
  type = string
}

variable "public_origin" {
  type = string
}

variable "current_team_regulation" {
  type    = string
  default = "M-C"
}

variable "create_paste_concurrency" {
  type    = number
  default = 2
}

variable "paste_page_concurrency" {
  type    = number
  default = 5
}

variable "distribution_id" {
  type = string
}

variable "logs_bucket_name" {
  type    = string
  default = null
}

variable "logs_bucket_arn" {
  type    = string
  default = null
}

variable "team_stats_schedule" {
  type    = string
  default = "cron(0 3 * * ? *)"
}
