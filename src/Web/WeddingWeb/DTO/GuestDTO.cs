using WeddingWeb.Domain.Email;

namespace WeddingWeb.DTO
{
	public class GuestDTO
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }

		public static Guest MapFromDto(GuestDTO dto)
		{
			return new() { FirstName = dto.FirstName, LastName = dto.LastName };
		}
	}
}