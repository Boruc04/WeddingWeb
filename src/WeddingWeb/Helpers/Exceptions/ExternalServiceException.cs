using System;
using System.Net;
using System.Net.Http;

namespace WeddingWeb.Helpers.Exceptions
{
	public class ExternalServiceException : Exception
	{
		public HttpResponseMessage Response { get; }
		public HttpStatusCode HttpStatusCode { get; }

		public ExternalServiceException(HttpResponseMessage response)
		{
			Response = response;
			HttpStatusCode = response.StatusCode;
		}

		public ExternalServiceException(HttpStatusCode httpStatusCode, string message = null,
			Exception innerException = null) : base(
			message ?? "An error occurred while attempting to call an external service.", innerException)
		{
			HttpStatusCode = httpStatusCode;
		}
	}
}