namespace WeddingWeb.Domain.AggregatesModel.GalleryAggregate
{
	public class Photo
	{
		private readonly string _imageName;
		private readonly ImageSize _imageSize;

		public Photo(string imageSize, string imageName)
		{
			_imageName = imageName;
			_imageSize = ImageSize.FromName(imageSize);
		}

		public string GetFilePath()
		{
			return $"img/{_imageSize.Name}/{_imageName}.jpg";
		}
	}
}
