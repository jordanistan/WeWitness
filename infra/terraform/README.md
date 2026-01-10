# WeWitness Infrastructure

This directory contains the Terraform configuration for the WeWitness infrastructure.

## Structure

- `main.tf`: Defines the Terraform provider and backend configuration.
- `variables.tf`: Defines global variables.
- `modules/`: Contains reusable Terraform modules for core infrastructure components.
  - `network/`: Defines the VPC, subnets, and security groups.
- `environments/`: Contains the configuration for each environment.
  - `dev/`: The development environment.
  - `staging/`: The staging environment.
  - `prod/`: The production environment.

## Usage

To apply the configuration for an environment, navigate to the environment's directory and run the following commands:

```bash
terraform init
terraform plan
terraform apply
```

For example, to apply the configuration for the `dev` environment:

```bash
cd infra/terraform/environments/dev
terraform init
terraform plan
terraform apply
```
