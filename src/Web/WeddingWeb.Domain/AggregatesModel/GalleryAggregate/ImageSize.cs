using System;
using System.Collections.Generic;
using System.Linq;
using WeddingWeb.Domain.SeedWork;

namespace WeddingWeb.Domain.AggregatesModel.GalleryAggregate
{
	public class ImageSize : Enumeration
	{
		public static ImageSize preview_l = new ImageSize(1, nameof(preview_l).ToLowerInvariant());
		public static ImageSize preview_m = new ImageSize(2, nameof(preview_m).ToLowerInvariant());
		public static ImageSize preview_s = new ImageSize(3, nameof(preview_s).ToLowerInvariant());
		public static ImageSize preview_xl = new ImageSize(4, nameof(preview_xl).ToLowerInvariant());
		public static ImageSize preview_xs = new ImageSize(5, nameof(preview_xs).ToLowerInvariant());
		public static ImageSize preview_xxs = new ImageSize(6, nameof(preview_xxs).ToLowerInvariant());
		public static ImageSize raw = new ImageSize(7, nameof(raw).ToLowerInvariant());

		private ImageSize(int id, string name) : base(id, name) { }

		public static IEnumerable<ImageSize> List() => new[] {
			preview_l,preview_m,preview_s, preview_xl, preview_xs, preview_xxs, raw};

		public static ImageSize FromName(string name)
		{
			var imageSize = List().SingleOrDefault(size =>
				string.Equals(size.Name, name, StringComparison.CurrentCultureIgnoreCase));

			if (imageSize == null)
			{
				throw new DomainException(
					$"Possible values for OrderStatus: {string.Join(",", List().Select(size => size.Name))}");
			}

			return imageSize;
		}
	}
}