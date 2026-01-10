terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket         = "wewitness-terraform-state-bucket-replace-me"
    key            = "global/s3/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "wewitness-terraform-state-lock"
  }
}

provider "aws" {
  region = var.aws_region
}
