namespace WeddingWeb.Domain.Email
{
	public record GuestNumber
	{
		private readonly int _value;
		private readonly int minGuestNumber = 1;
		private readonly int maxGuestNumber = 10;

		public int Value
		{
			get => _value;
			init
			{
				if (minGuestNumber <= value && value <= maxGuestNumber)
				{
					_value = value;
				}
				else
				{
					throw new DomainException(
						$"Guest Number must be between min number {minGuestNumber} and max number {maxGuestNumber}, but is {value}");
				}

			}
		}
	}
}