using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using WeddingWeb.Services;

namespace WeddingWeb.Controllers
{
	[Authorize]
	[ApiController]
	[ApiVersion("1.0")]
	[Route("api/image")]
	public class GalleryController : ControllerBase
	{
		private readonly GalleryService _galleryService;
		static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };

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
		public IActionResult GetImage(string imageSize, string imageName)
		{
			HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);

			var imagePath = _galleryService.BuildImagePath(imageSize, imageName);
			return File(imagePath, "image/jpeg");
		}
	}
}
