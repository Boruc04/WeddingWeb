using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;
using System.Reflection;
using WeddingWeb.Helpers.Extensions;

namespace WeddingWeb
{
	public class Startup
	{
		private readonly IWebHostEnvironment _environment;
		public IConfiguration Configuration { get; }

		public Startup(IConfiguration configuration, IWebHostEnvironment environment)
		{
			_environment = environment;
			Configuration = configuration;
		}


		/// <summary>
		/// This method gets called by the runtime. Use this method to add services to the container.
		/// </summary>
		/// <param name="services"></param>
		public void ConfigureServices(IServiceCollection services)
		{
			if (_environment.IsProduction())
			{
				services.AddApplicationInsightsTelemetry();
			}
			
			services.AddControllers();
			// In production, the Angular files will be served from this directory
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp/dist/wedding-web-app";
			});

			services.AddCustomSwagger();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			app.UseStaticFiles();

			app.UseSwagger()
				.UseSwaggerUI(c =>
				{
					c.SwaggerEndpoint("/swagger/v1/swagger.json", "Wedding Web");
					c.RoutePrefix = "api";
				});

			if (!env.IsDevelopment())
			{
				app.UseSpaStaticFiles();
			}

			app.UseRouting();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute(
					name: "default",
					pattern: "{controller}/{action=Index}/{id?}");
			});

			app.UseSpa(spa =>
			{
				// To learn more about options for serving an Angular SPA from ASP.NET Core,
				// see https://go.microsoft.com/fwlink/?linkid=864501

				spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
				{
					spa.UseAngularCliServer(npmScript: "start");
				}
			});
		}
	}

	internal static class CustomStartupExtensionsMethods
	{
		public static IServiceCollection AddCustomSwagger(this IServiceCollection services)
		{
			var version = Assembly.GetExecutingAssembly()
				.GetCustomAttribute<AssemblyFileVersionAttribute>();

			var desc = $"The Wedding Web <p><strong>Build: </strong>{version?.Version}</p> ";

			services.AddSwaggerGen(options =>
			{
				options.SwaggerDoc("v1", new OpenApiInfo
				{
					Title = $"Wedding Web - {Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}",
					Version = "v1",
					Description = desc,
					Contact = new OpenApiContact
					{
						Name = "Wedding Web",
						Email = "m.borucinski@outlook.com",
						Url = new Uri("https://github.com/Boruc04/WeddingWeb")
					}
				});

				options.IncludeXmlComments($@"{AppDomain.CurrentDomain.BaseDirectory}\{Assembly.GetExecutingAssembly()
					.GetName()
					.Name}.xml");
			});
			return services;
		}
	}
}
