namespace WeddingWeb.Domain.Email
{
	public record Guest
	{
		private readonly string _lastName;
		private readonly string _firstName;

		public string FirstName
		{
			get => _firstName;
			init
			{
				if (string.IsNullOrWhiteSpace(value))
					throw new DomainException("First name cannot be null or empty.");
				_firstName = value;
			}
		}

		public string LastName
		{
			get => _lastName;
			init
			{
				if (string.IsNullOrWhiteSpace(value))
					throw new DomainException("Last name cannot be null or empty.");
				_lastName = value;
			}
		}
	}
}