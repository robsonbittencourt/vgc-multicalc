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

variable "create_paste_concurrency" {
  type    = number
  default = 2
}

variable "paste_page_concurrency" {
  type    = number
  default = 5
}
