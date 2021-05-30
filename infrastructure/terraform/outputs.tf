output "website_endpoint" {
  sensitive = false
  value = "http://${azurerm_app_service.wedding-web.default_site_hostname}"
}

output "website_name" {
  sensitive = false
  value = azurerm_app_service.wedding-web.name
}

output "service_principal_id" {
  sensitive = true
  value = azurerm_user_assigned_identity.mi.principal_id
}

output "client_id" {
  sensitive = true
  value = azurerm_user_assigned_identity.mi.client_id
}
