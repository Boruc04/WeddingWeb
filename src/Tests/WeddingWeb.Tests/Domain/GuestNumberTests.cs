using NUnit.Framework;
using WeddingWeb.Domain;
using WeddingWeb.Domain.Email;

namespace WeddingWeb.Tests.Domain
{
	public class GuestNumberTests
	{
		private const int ValidGuestsNumber = 1;

		[Test]
		public void when_setting_valid_guest_number_expect_success()
		{

			var guestsNumber = CreateValidGuestNumber();

			Assert.AreEqual(ValidGuestsNumber, guestsNumber.Value);
		}


		[Test]
		public void when_setting_invalid_guest_number_expect_fail()
		{
			const int intGuestsNumber = 1000;

			Assert.Throws<DomainException>(() => new GuestNumber { Value = intGuestsNumber });
		}

		public static GuestNumber CreateValidGuestNumber()
		{
			return new() { Value = ValidGuestsNumber };;
		}
	}
}