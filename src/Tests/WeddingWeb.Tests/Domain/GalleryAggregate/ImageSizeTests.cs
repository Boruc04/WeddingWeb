using NUnit.Framework;
using System.Collections.Generic;
using WeddingWeb.Domain;
using WeddingWeb.Domain.AggregatesModel.GalleryAggregate;

namespace WeddingWeb.Tests.Domain.GalleryAggregate
{
	public class ImageSizeTests
	{
		private const string ValidImageSize = "preview_l";

		[Test]
		public void when_create_valid_image_size_expect_success()
		{
			var imageSize = CreateValidImageSize();

			Assert.AreEqual(ValidImageSize, imageSize.Name);
		}


		[TestCaseSource(nameof(InvalidImageSize))]
		public void when_create_invalid_image_size_expect_fail(string invalidImageSize)
		{
			Assert.Throws<DomainException>(() => ImageSize.FromName(invalidImageSize));
		}

		private static IEnumerable<string> InvalidImageSize()
		{
			yield return "preview_L";
			yield return "preView_M";
			yield return "peView_M";
			yield return "preVieasdw_M";
			yield return "asd";
		}

		public static ImageSize CreateValidImageSize()
		{
			return ImageSize.FromName(ValidImageSize);
		}
	}
}
