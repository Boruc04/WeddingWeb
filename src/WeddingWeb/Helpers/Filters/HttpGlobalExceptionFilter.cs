using Microsoft.ApplicationInsights;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net;
using WeddingWeb.Domain;
using WeddingWeb.Helpers.ActionResults;
using WeddingWeb.Helpers.Exceptions;
using WeddingWeb.Helpers.Extensions;

namespace WeddingWeb.Helpers.Filters
{
	internal class HttpGlobalExceptionFilter : IExceptionFilter
	{
		private readonly IWebHostEnvironment _environment;
		private readonly ILogger<HttpGlobalExceptionFilter> _logger;
		private readonly TelemetryClient _telemetryClient;

		public HttpGlobalExceptionFilter(IWebHostEnvironment environment, ILogger<HttpGlobalExceptionFilter> logger,
			TelemetryClient telemetryClient)
		{
			_environment = environment ?? throw new ArgumentNullException(nameof(environment));
			_logger = logger ?? throw new ArgumentNullException(nameof(logger));
			_telemetryClient = telemetryClient ?? throw new ArgumentNullException(nameof(telemetryClient));
		}

		public void OnException(ExceptionContext context)
		{
			_logger.LogError(new EventId(context.Exception.HResult), context.Exception, context.Exception.Message);

			switch (context.Exception)
			{
				case DomainException:
					OnDomainException(context);
					break;
				default:
					OnDefaultException(context);
					break;
			}
		}

		private void OnDomainException(ExceptionContext context)
		{
			var problemDetails = new ValidationProblemDetails
			{
				Instance = context.HttpContext.Request.Path,
				Status = StatusCodes.Status400BadRequest,
				Detail = "Please refer to the errors property for additional details.",
				Errors = { new KeyValuePair<string, string[]>("DomainValidations", new[] { context.Exception.Message }) }
			};

			context.Result = new BadRequestObjectResult(problemDetails);
		}

		//private void OnValidationException(ExceptionContext context)
		//{
		//	var problemDetails = new ValidationProblemDetails
		//	{
		//		Instance = context.HttpContext.Request.Path,
		//		Status = StatusCodes.Status400BadRequest,
		//		Detail = "Please refer to the errors property for additional details."
		//	};

		//	context.Result = new BadRequestObjectResult(problemDetails);
		//	context.HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;

		//	problemDetails.Errors.Add("CommandValidations",
		//		((ValidationException)context.Exception).Errors
		//		.Select(e => e.ErrorMessage)
		//		.ToArray()
		//	);
		//}

		//private void OnRecordNotFoundException(ExceptionContext context)
		//{
		//	var json = new JsonErrorResponse
		//	{ Messages = new[] { ((RecordNotFoundException)context.Exception).Message } };

		//	context.Result = new NotFoundObjectResult(json);
		//	context.HttpContext.Response.StatusCode = StatusCodes.Status404NotFound;
		//}

		private void OnExternalServiceException(ExceptionContext context)
		{
			var externalServiceException = (ExternalServiceException)context.Exception;

			var json = new JsonErrorResponse { Messages = new[] { externalServiceException.Message } };

			switch (externalServiceException.HttpStatusCode)
			{
				case HttpStatusCode.Forbidden:
					context.Result = new ForbidResult();
					context.HttpContext.Response.StatusCode = StatusCodes.Status403Forbidden;
					break;
				case HttpStatusCode.Unauthorized:
					context.Result = new UnauthorizedResult();
					context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
					break;
				default:
					context.Result = new JsonResult(json);
					context.HttpContext.Response.StatusCode = StatusCodes.Status502BadGateway;
					break;
			}

			_telemetryClient.TrackException(context.Exception);
		}

		private void OnDefaultException(ExceptionContext context)
		{
			var json = new JsonErrorResponse { Messages = new[] { "An error occurred. Try again." } };

			if (_environment.IsDevelopment() || _environment.IsTest())
			{
				json.DeveloperMessage = context.Exception;
			}

			context.Result = new InternalServerErrorObjectResult(json);
			context.HttpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;

			_telemetryClient.TrackException(context.Exception);
		}
	}

	internal class JsonErrorResponse
	{
		public string[] Messages { get; set; }

		public object DeveloperMessage { get; set; }
	}
}

