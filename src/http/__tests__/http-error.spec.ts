import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { HttpError } from "../http-error.js";

describe("HttpError", () => {
  it("should create Bad Request HttpError", async () => {
    const error = HttpError.badRequest();
    assert.equal(error.status, 400);
  });

  it("should create Unauthorized HttpError", async () => {
    const error = HttpError.unauthorized();
    assert.equal(error.status, 401);
  });

  it("should create Payment Required HttpError", async () => {
    const error = HttpError.paymentRequired();
    assert.equal(error.status, 402);
  });

  it("should create Forbidden HttpError", async () => {
    const error = HttpError.forbidden();
    assert.equal(error.status, 403);
  });

  it("should create Not Found HttpError", async () => {
    const error = HttpError.notFound();
    assert.equal(error.status, 404);
  });

  it("should create Method Not Allowed HttpError", async () => {
    const error = HttpError.methodNotAllowed();
    assert.equal(error.status, 405);
  });

  it("should create Not Acceptable HttpError", async () => {
    const error = HttpError.notAcceptable();
    assert.equal(error.status, 406);
  });

  it("should create Proxy Authentication Required HttpError", async () => {
    const error = HttpError.proxyAuthenticationRequired();
    assert.equal(error.status, 407);
  });

  it("should create Request Timeout HttpError", async () => {
    const error = HttpError.requestTimeout();
    assert.equal(error.status, 408);
  });

  it("should create Conflict HttpError", async () => {
    const error = HttpError.conflict();
    assert.equal(error.status, 409);
  });

  it("should create Gone HttpError", async () => {
    const error = HttpError.gone();
    assert.equal(error.status, 410);
  });

  it("should create Length Required HttpError", async () => {
    const error = HttpError.lengthRequired();
    assert.equal(error.status, 411);
  });

  it("should create Precondition Failed HttpError", async () => {
    const error = HttpError.preconditionFailed();
    assert.equal(error.status, 412);
  });

  it("should create Payload Too Large HttpError", async () => {
    const error = HttpError.payloadTooLarge();
    assert.equal(error.status, 413);
  });

  it("should create URI Too Long HttpError", async () => {
    const error = HttpError.uriTooLong();
    assert.equal(error.status, 414);
  });

  it("should create Unsupported Media Type HttpError", async () => {
    const error = HttpError.unsupportedMediaType();
    assert.equal(error.status, 415);
  });

  it("should create Range Not Satisfiable HttpError", async () => {
    const error = HttpError.rangeNotSatisfiable();
    assert.equal(error.status, 416);
  });

  it("should create Expectation Failed HttpError", async () => {
    const error = HttpError.expectationFailed();
    assert.equal(error.status, 417);
  });

  it("should create Im a Teapot HttpError", async () => {
    const error = HttpError.imaTeapot();
    assert.equal(error.status, 418);
  });

  it("should create Misdirected Request HttpError", async () => {
    const error = HttpError.misdirectedRequest();
    assert.equal(error.status, 421);
  });

  it("should create Unprocessable Entity HttpError", async () => {
    const error = HttpError.unprocessableEntity();
    assert.equal(error.status, 422);
  });

  it("should create Locked HttpError", async () => {
    const error = HttpError.locked();
    assert.equal(error.status, 423);
  });

  it("should create Failed Dependency HttpError", async () => {
    const error = HttpError.failedDependency();
    assert.equal(error.status, 424);
  });

  it("should create Too Early HttpError", async () => {
    const error = HttpError.tooEarly();
    assert.equal(error.status, 425);
  });

  it("should create Upgrade Required HttpError", async () => {
    const error = HttpError.upgradeRequired();
    assert.equal(error.status, 426);
  });

  it("should create Precondition Required HttpError", async () => {
    const error = HttpError.preconditionRequired();
    assert.equal(error.status, 428);
  });

  it("should create Too Many Requests HttpError", async () => {
    const error = HttpError.tooManyRequests();
    assert.equal(error.status, 429);
  });

  it("should create Request Header Fields Too Large HttpError", async () => {
    const error = HttpError.requestHeaderFieldsTooLarge();
    assert.equal(error.status, 431);
  });

  it("should create Unavailable For Legal Reasons HttpError", async () => {
    const error = HttpError.unavailableForLegalReasons();
    assert.equal(error.status, 451);
  });

  it("should create Internal Server Error HttpError", async () => {
    const error = HttpError.internalServerError();
    assert.equal(error.status, 500);
  });

  it("should create Not Implemented HttpError", async () => {
    const error = HttpError.notImplemented();
    assert.equal(error.status, 501);
  });

  it("should create Bad Gateway HttpError", async () => {
    const error = HttpError.badGateway();
    assert.equal(error.status, 502);
  });

  it("should create Service Unavailable HttpError", async () => {
    const error = HttpError.serviceUnavailable();
    assert.equal(error.status, 503);
  });

  it("should create Gateway Timeout HttpError", async () => {
    const error = HttpError.gatewayTimeout();
    assert.equal(error.status, 504);
  });

  it("should create HTTP Version Not Supported HttpError", async () => {
    const error = HttpError.httpVersionNotSupported();
    assert.equal(error.status, 505);
  });

  it("should create Variant Also Negotiates HttpError", async () => {
    const error = HttpError.variantAlsoNegotiates();
    assert.equal(error.status, 506);
  });

  it("should create Insufficient Storage HttpError", async () => {
    const error = HttpError.insufficientStorage();
    assert.equal(error.status, 507);
  });

  it("should create Loop Detected HttpError", async () => {
    const error = HttpError.loopDetected();
    assert.equal(error.status, 508);
  });

  it("should create Bandwidth Limit Exceeded HttpError", async () => {
    const error = HttpError.bandwidthLimitExceeded();
    assert.equal(error.status, 509);
  });

  it("should create Not Extended HttpError", async () => {
    const error = HttpError.notExtended();
    assert.equal(error.status, 510);
  });

  it("should create Network Authentication Required HttpError", async () => {
    const error = HttpError.networkAuthenticationRequired();
    assert.equal(error.status, 511);
  });
});
