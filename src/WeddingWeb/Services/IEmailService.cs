using System.Threading.Tasks;
using WeddingWeb.DTO;

namespace WeddingWeb.Services
{
	public interface IEmailService
	{
		public Task SendEmail(EmailDTO emailDto);
	}
}