# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 2.26"
    }
  }

  backend "azurerm" {
    resource_group_name  = "boruc-common-eu-rg"
    storage_account_name = "weddingwebterraform"
    container_name       = "terraform"
    key                  = "test.terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

data "azurerm_client_config" "current" {}

resource "azurerm_resource_group" "rg" {
  name     = "wedding-eu-${var.prefix}-rg"
  location = "westeurope"
}

resource "azurerm_user_assigned_identity" "mi" {
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  name                = "wedding-web-eu-${var.prefix}-mi"
}

resource "azurerm_key_vault" "kv" {
  name                        = "wedding-eu-${var.prefix}-kv"
  location                    = azurerm_resource_group.rg.location
  resource_group_name         = azurerm_resource_group.rg.name
  enabled_for_disk_encryption = false
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false
  sku_name                    = "standard"

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions = [
      "Get", "List", "Create", "Delete"
    ]

    secret_permissions = [
      "Get", "List", "Set", "Delete"
    ]

    storage_permissions = [
      "Get", "List", "Set", "Delete"
    ]
  }

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = azurerm_user_assigned_identity.mi.principal_id

    key_permissions = [
      "Get"
    ]

    secret_permissions = [
      "Get"
    ]

    storage_permissions = [
      "Get"
    ]
  }

}

resource "azurerm_app_service_plan" "webapp" {
  name                = "wedding-web-${var.prefix}-asp"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  sku {
    tier = var.appserviceplan_sku.tier
    size = var.appserviceplan_sku.size
  }
}

resource "azurerm_app_service" "wedding-web" {
  name                = "wedding-web-${var.prefix}-app"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_app_service_plan.webapp.id
  https_only          = true

  app_settings = {
    "ASPNETCORE_ENVIRONMENT" = var.ASPNETCORE_ENVIRONMENT
  }
}

