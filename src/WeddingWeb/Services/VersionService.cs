using System.Reflection;
using System.Threading.Tasks;

namespace WeddingWeb.Services
{
	public class VersionService
	{
		private readonly Version _version;

		public VersionService()
		{
			_version = new Version
			{
				Value = Assembly.GetExecutingAssembly().GetName().Version.ToString()
			};
		}

		public Task<Version> GetApplicationVersion() => Task.FromResult(_version);
	}

	public class Version
	{
		public string Value { get; set; }
	}
}
