using System.Collections.Generic;
using System.Linq;
using System.Text;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace WeddingWeb.Domain.Email
{
	public class Email
	{
		public MainEmail MainEmail { get; private set; }
		public GuestNumber GuestNumber { get; private set; }
		public IEnumerable<Guest> GuestList { get; private set; }
		public AdditionalInfo AdditionalInfo { get; private set; }
		public NeedHotel NeedHotel { get; private set; }
		public NeedDrive NeedDrive { get; private set; }

		public Email(MainEmail mainEmail, GuestNumber guestNumber, IEnumerable<Guest> guestList, AdditionalInfo additionalInfo,
			NeedHotel needHotel, NeedDrive needDrive)
		{
			MainEmail = mainEmail;
			GuestNumber = guestNumber;
			GuestList = guestList;
			AdditionalInfo = additionalInfo;
			NeedHotel = needHotel;
			NeedDrive = needDrive;

			Validate();
		}

		private void Validate()
		{
			if (GuestList.Count() != GuestNumber.Value)
				throw new DomainException(
					$"Guest number [{GuestNumber.Value}] does not match with number of guests on list [{GuestList.Count()}].");
		}

		public SendGridMessage CreateSendGridMessage()
		{
			var msg = new SendGridMessage();

			msg.SetFrom(new EmailAddress("m.borucinski@outlook.com", "Paulina i Michał"));
			msg.AddTos(new List<EmailAddress> { new("m.borucinski+slub@gmail.com") });
			msg.SetSubject("Paulina i Michał potiwerdzenie obecności - dziękujemy.");
			msg.AddContent(MimeType.Text, "Dziękujemy bardzo za potwierdzenie obecności!");

			var messageText = new StringBuilder($"Email: {MainEmail}, Liczba gości: {GuestNumber}, " +
														  $"Informacje dodatkowe: {AdditionalInfo}, Nocleg {NeedHotel}, " +
														  $"Transport: {NeedDrive}");

			foreach (var guest in GuestList)
			{
				messageText.AppendLine();
				messageText.Append($"\n Imie: {guest.FirstName}, Nazwisko: {guest.LastName}");
			}

			msg.AddContent(MimeType.Html, messageText.ToString());

			return msg;
		}
	}
}

