# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = ">= 2.26"
    }
  }

  backend "azurerm" {
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "test" {
  name     = "wedding-eu-test-rg"
  location = "westeurope"
}

resource "azurerm_app_service_plan" "test" {
  name                = "wedding-web-test-asp"
  location            = azurerm_resource_group.test.location
  resource_group_name = azurerm_resource_group.test.name

  sku {
    tier = "Free"
    size = "F1"
  }
}

resource "azurerm_app_service" "test" {
  name                = "wedding-web-test-app"
  location            = azurerm_resource_group.test.location
  resource_group_name = azurerm_resource_group.test.name
  app_service_plan_id = azurerm_app_service_plan.test.id

  app_settings = {
    "ASPNETCORE_ENVIRONMENT" = "Test"
  }
}