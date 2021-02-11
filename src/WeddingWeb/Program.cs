using Azure.Extensions.AspNetCore.Configuration.Secrets;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;

namespace WeddingWeb
{
	public class Program
	{
		public static void Main(string[] args)
		{
			CreateHostBuilder(args).Build().Run();
		}

		public static IHostBuilder CreateHostBuilder(string[] args) =>
			Host.CreateDefaultBuilder(args).
				ConfigureAppConfiguration((context, config) =>
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
					})
				.ConfigureWebHostDefaults(webBuilder =>
				{
					webBuilder.UseStartup<Startup>();
				});
	}
}
