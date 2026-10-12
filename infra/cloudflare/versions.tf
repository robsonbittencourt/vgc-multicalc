terraform {
  required_version = "1.16.4"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "5.27.0"
    }
  }

  backend "s3" {
    bucket       = "vgcmulticalc-terraform-state"
    key          = "cloudflare/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}

provider "cloudflare" {}
