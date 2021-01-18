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
	//[ApiVersion("1.0")]
	[Produces("application/json")]
	public class VersionController : ControllerBase
	{
		private readonly VersionService _versionService;

		public VersionController()
		{
			_versionService = new VersionService();
		}

		[HttpGet]
		[Route("")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> Get()
		{
			var version = await _versionService.GetApplicationVersion();
			return Ok(version);
		}
	}
}
