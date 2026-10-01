variable "name_prefix" {
  type = string
}

variable "active_release_parameter" {
  type = string
}

variable "comment" {
  type = string
}

variable "aliases" {
  type    = list(string)
  default = []
}

variable "acm_certificate_arn" {
  type    = string
  default = null
}

variable "apex_host" {
  type = string
}

variable "www_host" {
  type = string
}

variable "prerender_routes_file" {
  type = string
}

variable "pastes" {
  type = object({
    bucket_regional_domain_name = string
    create_paste_domain_name    = string
    paste_page_domain_name      = string
    lambda_access_control_id    = string
  })
  default = null
}
