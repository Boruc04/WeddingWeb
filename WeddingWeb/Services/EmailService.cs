using System;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace WeddingWeb.Services
{
	public class EmailService
	{
		private readonly SendGridClient _client;
		public EmailService()
		{
			_client = new SendGridClient("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");
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

			StringBuilder messageText = new StringBuilder($"Email:{email.MainEmail}, Liczba gości: {email.GuestNumber}, Informacje dodatkowe {email.AdditionalInfo}");

			foreach (var guest in email.GuestList)
			{
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
	}

	public class Guest
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
	}
}
