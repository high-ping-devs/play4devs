variable "SPOTIFY_CLIENT_ID" {}
variable "SPOTIFY_CLIENT_SECRET" {}
variable "AUTH0_SECRET" {}
variable "AUTH0_BASE_URL" {}
variable "AUTH0_ISSUER_BASE_URL" {}
variable "AUTH0_DOMAIN" {}
variable "AUTH0_API_CLIENT_ID" {}
variable "AUTH0_CLIENT_ID" {}
variable "AUTH0_API_CLIENT_SECRET" {}
variable "AUTH0_CLIENT_SECRET" {}
variable "MONGODB_URI" {}

resource "digitalocean_app" "www" {
  spec {
    name   = "play4devs"
    region = "nyc3"

    service {
      name               = "play4devs"
      instance_count     = 1
      instance_size_slug = "basic-xxs"
      dockerfile_path    = "./Dockerfile"

      git {
        branch         = "develop"
        repo_clone_url = "https://github.com/high-ping-devs/play4devs.git"
      }

      env {
        key   = "SPOTIFY_CLIENT_ID"
        value = var.SPOTIFY_CLIENT_ID
        type  = "SECRET"
      }

      env {
        key   = "SPOTIFY_CLIENT_SECRET"
        value = var.SPOTIFY_CLIENT_SECRET
        type  = "SECRET"
      }

      env {
        key   = "AUTH0_SECRET"
        value = var.AUTH0_SECRET
        type  = "SECRET"
      }

      env {
        key   = "AUTH0_BASE_URL"
        value = var.AUTH0_BASE_URL
      }

      env {
        key   = "AUTH0_ISSUER_BASE_URL"
        value = var.AUTH0_ISSUER_BASE_URL
      }

      env {
        key   = "AUTH0_DOMAIN"
        value = var.AUTH0_DOMAIN
      }

      env {
        key   = "AUTH0_API_CLIENT_ID"
        value = var.AUTH0_API_CLIENT_ID
        type  = "SECRET"
      }

      env {
        key   = "AUTH0_CLIENT_ID"
        value = var.AUTH0_CLIENT_ID
        type  = "SECRET"
      }

      env {
        key   = "AUTH0_API_CLIENT_SECRET"
        value = var.AUTH0_API_CLIENT_SECRET
        type  = "SECRET"
      }

      env {
        key   = "AUTH0_CLIENT_SECRET"
        value = var.AUTH0_CLIENT_SECRET
        type  = "SECRET"
      }

      env {
        key   = "MONGODB_URI"
        value = var.MONGODB_URI
        type  = "SECRET"
      }
    }
  }
}

output "live_url" {
  value = digitalocean_app.www.live_url
}

