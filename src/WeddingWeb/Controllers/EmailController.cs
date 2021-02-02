using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Azure.Security.KeyVault.Secrets;
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

		public EmailController(SecretClient secretClient)
		{
			_emailService = new EmailService(secretClient);
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
