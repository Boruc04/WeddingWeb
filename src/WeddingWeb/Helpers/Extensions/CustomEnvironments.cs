using Microsoft.Extensions.Hosting;
using System;

namespace WeddingWeb.Helpers.Extensions
{
	public static class CustomEnvironments
	{
		public static readonly string Test = "Test";
	}

	public static class CustomHostEnvironmentEnvExtensions
	{
		/// <summary>
		/// Checks if the current host environment name is <see cref="CustomEnvironments.Test"/>.
		/// </summary>
		/// <param name="hostEnvironment">An instance of <see cref="IHostEnvironment"/>.</param>
		/// <returns>True if the environment name is <see cref="CustomEnvironments.Test"/>, otherwise false.</returns>
		public static bool IsTest(this IHostEnvironment hostEnvironment)
		{
			if (hostEnvironment == null)
			{
				throw new ArgumentNullException(nameof(hostEnvironment));
			}

			return hostEnvironment.IsEnvironment(CustomEnvironments.Test);
		}
	}
}
