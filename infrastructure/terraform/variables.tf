variable "prefix" {
  type        = string
  default     = "test"
  description = "This is the environment where your webapp is deployed. test, prod."
}

variable "ASPNETCORE_ENVIRONMENT" {
  type        = string
  default     = "Test"
  description = "This is the ASPNETCORE_ENVIRONMENT appsetting value. Test, Production."
}

variable "appserviceplan_sku" {
  type = object({
    tier = string
    size = string
  })
  default = {
    tier = "Free"
    size = "F1"
  }
  description = "This is the sku for an app service plan"
}
