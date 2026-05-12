variable "do_token" {
  description = "đây là token cho phép terraform truy cập vào tài khoản DigitalOcean của bạn"
}

variable "ssh_key" {
  description = "đây là SSH key để terraform có thể truy cập vào droplet của bạn"
}


terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.81.0"
    }
  }
}

provider "digitalocean" {
    token = var.do_token
}

resource "digitalocean_droplet" "web" {
  image   = "ubuntu-24-04-x64"
  name    = "terraform-vps"
  region  = "sgp1"
  size    = "s-1vcpu-1gb"
  ssh_keys = [var.ssh_key]
  
}

output "output_name" {
  value = {
    ipVps: digitalocean_droplet.web.ipv4_address
  }
}
