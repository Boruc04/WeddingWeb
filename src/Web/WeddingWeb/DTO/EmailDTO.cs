using System.Collections.Generic;
using System.Linq;
using WeddingWeb.Domain.Email;

namespace WeddingWeb.DTO
{
	public class EmailDTO
	{
		public string MainEmail { get; set; }
		public int GuestNumber { get; set; }
		public List<GuestDTO> GuestList { get; set; }
		public string AdditionalInfo { get; set; }
		public bool NeedHotel { get; set; }
		public bool NeedDrive { get; set; }

		public static Email MapFromDto(EmailDTO dto)
		{
			var mainEmail = new MainEmail { Value = dto.MainEmail };
			var guestNumber = new GuestNumber { Value = dto.GuestNumber };
			var guestList = dto.GuestList.Select(GuestDTO.MapFromDto).ToList();
			var additionalInfo = new AdditionalInfo { Value = dto.AdditionalInfo };
			var needHotel = new NeedHotel { Value = dto.NeedHotel };
			var needDrive = new NeedDrive { Value = dto.NeedDrive };

			return new Email(mainEmail, guestNumber, guestList, additionalInfo, needHotel, needDrive);
		}
	}
}