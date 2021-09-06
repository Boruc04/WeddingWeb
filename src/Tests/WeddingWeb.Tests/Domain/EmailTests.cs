using NUnit.Framework;
using WeddingWeb.Domain.Email;

namespace WeddingWeb.Tests.Domain
{

	public class EmailTests
	{
		[Test]
		public void when_creating_valid_email_expect_success()
		{
			var validEmail = MainEmailTests.CreateValidMainEmail();
			var validGuestNumber = GuestNumberTests.CreateValidGuestNumber();
			var validGuestList = GuestTests.CreateValidGuestList();
			var validAdditionalInfo = new AdditionalInfo { Value = "test" };
			var validNeedHotel = new NeedHotel { Value = true };
			var validNeedDrive = new NeedDrive { Value = true };

			Assert.DoesNotThrow(() => new Email(validEmail, validGuestNumber, validGuestList, validAdditionalInfo,
				validNeedHotel, validNeedDrive));
		}
	}
}
