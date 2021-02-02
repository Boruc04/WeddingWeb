using SendGrid;
using SendGrid.Helpers.Mail;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Azure.Security.KeyVault.Secrets;

namespace WeddingWeb.Services
{
	public class EmailService
	{
		private readonly SendGridClient _client;
		public EmailService(SecretClient secretClient)
		{
			KeyVaultSecret  sendGridApiKey = secretClient.GetSecret("SEND-GRID-API-KEY");
			_client = new SendGridClient(sendGridApiKey.Value);
		}

		public async Task<HttpStatusCode> SendEmail(Email email)
		{
			var msg = new SendGridMessage();

			msg.SetFrom(new EmailAddress("m.borucinski@outlook.com", "Paulina i Michał"));

			var recipients = new List<EmailAddress>
			{
				new EmailAddress("m.borucinski+slub@gmail.com")
			};

			msg.AddTos(recipients);

			msg.SetSubject("Paulina i Michał potiwerdzenie obecności - dziękujemy.");

			msg.AddContent(MimeType.Text, "Dziękujemy bardzo za potwierdzenie obecności!");

			StringBuilder messageText = new StringBuilder($"Email: {email.MainEmail}, Liczba gości: {email.GuestNumber}, " +
														  $"Informacje dodatkowe: {email.AdditionalInfo}, Nocleg {email.NeedHotel}, " +
														  $"Transport: {email.NeedDrive}");

			foreach (var guest in email.GuestList)
			{
				messageText.AppendLine();
				messageText.Append($"\n Imie: {guest.FirstName}, Nazwisko: {guest.LastName}");
			}

			msg.AddContent(MimeType.Html, messageText.ToString());
			var response = await _client.SendEmailAsync(msg);

			return response.StatusCode;
		}
	}

	public class Email
	{
		public string MainEmail { get; set; }
		public int GuestNumber { get; set; }
		public List<Guest> GuestList { get; set; }
		public string AdditionalInfo { get; set; }
		public bool NeedHotel { get; set; }
		public bool NeedDrive { get; set; }
	}

	public class Guest
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
	}
}
