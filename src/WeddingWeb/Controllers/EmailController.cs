using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using WeddingWeb.Services;

namespace WeddingWeb.Controllers
{
	[ApiController]
	[Produces("application/json")]
	[Route("api/email")]
	public class EmailController : ControllerBase
	{
		private readonly EmailService _emailService;

		public EmailController(IConfiguration configuration)
		{
			_emailService = new EmailService(configuration);
		}

		[HttpPost]
		[Route("")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> SendEmail(Email email)
		{
			var statusCode = await _emailService.SendEmail(email);
			return StatusCode((int)statusCode);
		}
	}

}
