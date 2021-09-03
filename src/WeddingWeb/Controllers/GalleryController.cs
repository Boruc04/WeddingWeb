using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WeddingWeb.Services;

namespace WeddingWeb.Controllers
{
	[ApiController]
	[ApiVersion("1.0")]
	[Route("api/image")]
	public class GalleryController : ControllerBase
	{
		private readonly GalleryService _galleryService;

		public GalleryController(GalleryService galleryService)
		{
			_galleryService = galleryService;
		}

		/// <summary>
		/// Get data.json file.
		/// </summary>
		[HttpGet]
		[Route("{imageSize}/{imageName}")]
		[MapToApiVersion("1.0")]
		[Produces("image/jpeg")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<IActionResult> GetImage(string imageSize, string imageName)
		{
			var imagePath = _galleryService.BuildImagePath(imageSize, imageName);
			return File(imagePath, "image/jpeg");
		}
	}
}
