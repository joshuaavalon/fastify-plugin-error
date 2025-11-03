export const fastifyErrorMapping: Record<string, { code: string; message: string; status: number }> = {
  FST_ERR_CTP_BODY_TOO_LARGE: {
    code: "BodyTooLarge",
    message: "Content-Type wrongly specified.",
    status: 413
  },
  FST_ERR_CTP_EMPTY_JSON_BODY: {
    code: "EmptyJsonBody",
    message: "Body cannot be empty when Content-Type is set to application/json.",
    status: 400
  },
  FST_ERR_CTP_EMPTY_TYPE: {
    code: "EmptyContentType",
    message: "Content-Type is an empty string.",
    status: 400
  },
  FST_ERR_CTP_INVALID_CONTENT_LENGTH: {
    code: "InvalidContentLength",
    message: "Request body size did not match Content-Length.",
    status: 400
  },
  FST_ERR_CTP_INVALID_JSON_BODY: {
    code: "InvalidJsonBody",
    message: "Body is not valid JSON but Content-Type is set to application/json.",
    status: 400
  },
  FST_ERR_CTP_INVALID_MEDIA_TYPE: {
    code: "InvalidMediaType",
    message: "The received media type is not supported.",
    status: 415
  },
  FST_ERR_CTP_INVALID_TYPE: {
    code: "InvalidContentType",
    message: "The request body is larger than the provided limit.",
    status: 400
  }
};
