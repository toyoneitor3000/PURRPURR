terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 1.15.0"
    }
  }
}

provider "vercel" {
  # La API key se configurará como un secret en el entorno de CI/CD
  # api_token = var.VERCEL_API_TOKEN
}

resource "vercel_project" "landing_page" {
  name      = "purpur-landing-page"
  framework = "nextjs"
  root_directory = "."
  # Git repository settings will be configured automatically on first deploy from GitHub
}

output "project_url" {
  value = vercel_project.landing_page.name
}
