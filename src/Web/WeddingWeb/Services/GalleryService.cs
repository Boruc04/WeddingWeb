using WeddingWeb.Domain.AggregatesModel.GalleryAggregate;

namespace WeddingWeb.Services
{
	public class GalleryService
	{
		public string BuildImagePath(string imageSize, string imageName)
		{
			var photo = new Photo(imageSize, imageName);
			return photo.GetFilePath();
		}
	}
}
