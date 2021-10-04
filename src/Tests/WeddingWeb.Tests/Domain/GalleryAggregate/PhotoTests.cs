using NUnit.Framework;
using WeddingWeb.Domain.AggregatesModel.GalleryAggregate;

namespace WeddingWeb.Tests.Domain.GalleryAggregate
{
	public class PhotoTests
	{
		private static readonly ImageSize ImageSize = ImageSizeTests.CreateValidImageSize();
		private const string ImageName = "66bf31d1-8c71-444f-b462-6b59aae7111d";


		[Test]
		public void when_creating_valid_photo_expect_success()
		{
			var photo = PhotoTests.CreateValidPhoto();

			Assert.AreEqual(photo.GetFilePath(), $"img/{ImageSize.Name}/{ImageName}.jpg");
		}

		public static Photo CreateValidPhoto()
		{
			return new Photo(ImageSize.Name, ImageName);
		}
	}
}
