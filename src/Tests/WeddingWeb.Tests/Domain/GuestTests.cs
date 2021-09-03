using NUnit.Framework;
using System.Collections.Generic;
using WeddingWeb.Domain.Email;

namespace WeddingWeb.Domain.Tests
{
	public class GuestTests
	{
		private const string ValidFirstName = "ValidName";
		private const string ValidLastName = "ValidLastName";

		[Test]
		public void when_creating_valid_guest_expect_success()
		{
			Assert.DoesNotThrow(() => CreateValidGuest());
		}

		private static Guest CreateValidGuest()
		{
			return new() { FirstName = ValidFirstName, LastName = ValidLastName };
		}

		public static IEnumerable<Guest> CreateValidGuestList()
		{
			return new List<Guest> { CreateValidGuest() };
		}


		[TestCaseSource(nameof(InvalidInputs))]
		public void when_creating_invalid_guest_expect_fail(string firstName, string lastName)
		{
			Assert.Throws<DomainException>(() => new Guest { FirstName = firstName, LastName = lastName });
		}

		private static IEnumerable<object[]> InvalidInputs()
		{
			yield return new object[] { "valid", " " };
			yield return new object[] { " ", "valid" };
			yield return new object[] { "valid", "" };
			yield return new object[] { "", "valid" };
		}
	}

}