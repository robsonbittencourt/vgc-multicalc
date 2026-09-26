terraform {
  required_version = "1.16.4"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.66.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = {
      Project   = "vgcmulticalc"
      ManagedBy = "terraform"
      Stack     = "bootstrap"
    }
  }
}
