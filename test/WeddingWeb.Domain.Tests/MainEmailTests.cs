using System.Collections.Generic;
using NUnit.Framework;
using WeddingWeb.Domain.Email;

namespace WeddingWeb.Domain.Tests
{
	public class MainEmailTests
	{
		private const string ValidEmail = "validTestEmail@gmail.com";
		
		[Test]
		public void when_create_valid_main_email_expect_success()
		{
			var email = CreateValidMainEmail();

			Assert.AreEqual(ValidEmail, email.Value);
		}

		[TestCaseSource(nameof(InvalidEmails))]
		public void when_create_invalid_main_email_expect_fail(string invalidEmail)
		{
			Assert.Throws<DomainException>(() => new MainEmail { Value = invalidEmail });
		}

		private static IEnumerable<string> InvalidEmails()
		{
			yield return "asd134.com";
			yield return "asdasd";
			yield return "invalidEmail@";
			yield return "";
			yield return null;
			yield return " ";
		}

		public static MainEmail CreateValidMainEmail()
		{
			return new MainEmail { Value = ValidEmail };
		}
	}
}