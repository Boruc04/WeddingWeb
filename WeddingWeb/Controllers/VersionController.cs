using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WeddingWeb.Services;
using Version = WeddingWeb.Services.Version;

namespace WeddingWeb.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[ApiVersion("1.0")]
	[Produces("application/json")]
	public class VersionController : ControllerBase
	{
		private readonly VersionService _versionService;

		public VersionController()
		{
			_versionService = new VersionService();
		}

		
		/// <summary>
		/// Get the version of the application.
		/// </summary>
		/// <returns>the version number</returns>
		/// <response code="200">The version was successfully retrieved.</response>
		/// <response code="400">The version request vas invalid.</response>
		[HttpGet]
		[Route("")]
		[MapToApiVersion("1.0")]
		[ProducesResponseType(typeof(Version), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<IActionResult> Get()
		{
			var version = await _versionService.GetApplicationVersion();
			return Ok(version);
		}
	}
}
