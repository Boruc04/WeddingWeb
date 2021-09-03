using System;
using Azure.Extensions.AspNetCore.Configuration.Secrets;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace WeddingWeb.Helpers.Extensions
{
	public static class KeyVaultExtensions
	{
		public static IHostBuilder AddKeyVault(this IHostBuilder builder)
		{
			return builder.ConfigureAppConfiguration((context, config) =>
			{
				if (context.HostingEnvironment.IsProduction())
				{
					var builtConfig = config.Build();
					var credentialOptions = new DefaultAzureCredentialOptions
					{
						ManagedIdentityClientId = builtConfig["UserAssignedManagedIdentityClientId"],
						VisualStudioTenantId = builtConfig["KeyVault:VisualStudioTenantId"]
					};

					var secretClient = new SecretClient(new Uri(builtConfig["KeyVault:Uri"]),
						new DefaultAzureCredential(credentialOptions));
					config.AddAzureKeyVault(secretClient, new KeyVaultSecretManager());
				}
			});
		}
	}
}
