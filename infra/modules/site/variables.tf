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
