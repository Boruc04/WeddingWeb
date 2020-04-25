using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using WeddingWeb.Services;

namespace WeddingWeb.Controllers
{
	[ApiController]
	[Produces("application/json")]
	[Route("api/[controller]")]
	public class EmailController : ControllerBase
	{
		private readonly EmailService _emailService;

		public EmailController(ILogger<EmailController> logger)
		{
			_emailService = new EmailService();
		}

		[HttpGet]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public IActionResult Get()
		{
			var email = new Email()
			{
				MainEmail = "test@kasd.pl",
				GuestNumber = 5,
				GuestList = new List<Guest>
				{
					new Guest { FirstName = "imiebakend", LastName = "nazwisko" },
					new Guest { FirstName = "drugieImieback", LastName = "drugieNazwisko" }
				},
				AdditionalInfo = "jakiś tekst"
			};

			return Ok(email);
		}

		[HttpPost]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> SendEmail(Email email)
		{
			var statusCode = await _emailService.SendEmail(email);
			return StatusCode((int)statusCode);
		}
	}

}
