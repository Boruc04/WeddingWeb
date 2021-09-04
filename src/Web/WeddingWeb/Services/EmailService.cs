using Microsoft.Extensions.Configuration;
using SendGrid;
using System.Net;
using System.Threading.Tasks;
using WeddingWeb.Domain;
using WeddingWeb.DTO;
using WeddingWeb.Helpers.Exceptions;

namespace WeddingWeb.Services
{
	public class EmailService : IEmailService
	{
		private readonly SendGridClient _client;

		public EmailService(IConfiguration configuration)
		{
			_client = new SendGridClient(configuration["SendGrid:ApiKey"]);
		}

		public async Task SendEmail(EmailDTO emailDto)
		{
			var email = EmailDTO.MapFromDto(emailDto);
			var message = email.CreateSendGridMessage();
			var response = await _client.SendEmailAsync(message);
			await response.Validate();
		}
	}

	/// <summary>
	/// Service with mocked integration with Sendgrid api.
	/// </summary>
	public class MockEmailService : IEmailService
	{
		public MockEmailService() { }

		public async Task SendEmail(EmailDTO emailDto)
		{
			var email = EmailDTO.MapFromDto(emailDto);
			email.CreateSendGridMessage();
			await Task.CompletedTask;
		}
	}

	public static class SendGridResponseExtensions
	{
		public static async Task Validate(this Response response)
		{
			if (!response.IsSuccessStatusCode)
			{
				var requestContent = await response.Body.ReadAsStringAsync();

				throw response.StatusCode switch
				{
					HttpStatusCode.BadRequest => new DomainException(requestContent),
					_ => new ExternalServiceException(response.StatusCode)
				};
			}
		}
	}
}
