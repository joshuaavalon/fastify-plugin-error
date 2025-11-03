import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";
import createError from "@fastify/error";
import createLogger from "pino";
import { HttpError } from "#http";
import { ErrorSchemaHandler } from "../error-schema-handler.js";
import type { FastifyReply } from "fastify";

describe("ErrorSchemaHandler", () => {
  it("should handle HttpError", async () => {
    const handler = new ErrorSchemaHandler({});
    const error = HttpError.forbidden();
    const res = {
      send(_payload: unknown) {
        return this;
      },
      status(_code: number) {
        return this;
      }
    } as FastifyReply;
    const statusMock = mock.method(res, "status");
    const sendMock = mock.method(res, "send");
    await handler.format(error, res);
    assert.equal(statusMock.mock.callCount(), 1);
    assert.equal(sendMock.mock.callCount(), 1);
    const statusCall = statusMock.mock.calls[0];
    if (statusCall) {
      const arg1 = statusCall.arguments[0];
      assert.equal(arg1, error.status);
    }
    const sendCall = sendMock.mock.calls[0];
    if (sendCall) {
      const arg1 = sendCall.arguments[0];
      assert.ok(typeof arg1 === "object");
      assert.ok(!!arg1);
      assert.ok("success" in arg1);
      assert.equal(arg1.success, false);
    }
  });

  it("not should handle HttpError if formatHttp is false", async () => {
    const handler = new ErrorSchemaHandler({ formatHttp: false });
    const error = HttpError.forbidden();
    const res = {
      log: createLogger({ enabled: false }) as any,
      send(_payload: unknown) {
        return this;
      },
      status(_code: number) {
        return this;
      }
    } as FastifyReply;
    const statusMock = mock.method(res, "status");
    const sendMock = mock.method(res, "send");
    await handler.format(error, res);
    assert.equal(statusMock.mock.callCount(), 1);
    assert.equal(sendMock.mock.callCount(), 1);
    const statusCall = statusMock.mock.calls[0];
    if (statusCall) {
      const arg1 = statusCall.arguments[0];
      assert.equal(arg1, 500);
    }
    const sendCall = sendMock.mock.calls[0];
    if (sendCall) {
      const arg1 = sendCall.arguments[0];
      assert.ok(typeof arg1 === "object");
      assert.ok(!!arg1);
      assert.ok("success" in arg1);
      assert.equal(arg1.success, false);
    }
  });

  it("should handle FastifyError", async () => {
    const handler = new ErrorSchemaHandler({});
    const LargeError = createError("FST_ERR_CTP_BODY_TOO_LARGE", "message");
    const error = new LargeError();
    const res = {
      send(_payload: unknown) {
        return this;
      },
      status(_code: number) {
        return this;
      }
    } as FastifyReply;
    const statusMock = mock.method(res, "status");
    const sendMock = mock.method(res, "send");
    await handler.format(error, res);
    assert.equal(statusMock.mock.callCount(), 1);
    assert.equal(sendMock.mock.callCount(), 1);
    const statusCall = statusMock.mock.calls[0];
    if (statusCall) {
      const arg1 = statusCall.arguments[0];
      assert.equal(arg1, 413);
    }
    const sendCall = sendMock.mock.calls[0];
    if (sendCall) {
      const arg1 = sendCall.arguments[0];
      assert.ok(typeof arg1 === "object");
      assert.ok(!!arg1);
      assert.ok("success" in arg1);
      assert.equal(arg1.success, false);
    }
  });

  it("not should handle FastifyError if formatFastify is false", async () => {
    const handler = new ErrorSchemaHandler({ formatFastify: false });
    const LargeError = createError("FST_ERR_CTP_BODY_TOO_LARGE", "message");
    const error = new LargeError();
    const res = {
      log: createLogger({ enabled: false }) as any,
      send(_payload: unknown) {
        return this;
      },
      status(_code: number) {
        return this;
      }
    } as FastifyReply;
    const statusMock = mock.method(res, "status");
    const sendMock = mock.method(res, "send");
    await handler.format(error, res);
    assert.equal(statusMock.mock.callCount(), 1);
    assert.equal(sendMock.mock.callCount(), 1);
    const statusCall = statusMock.mock.calls[0];
    if (statusCall) {
      const arg1 = statusCall.arguments[0];
      assert.equal(arg1, 500);
    }
    const sendCall = sendMock.mock.calls[0];
    if (sendCall) {
      const arg1 = sendCall.arguments[0];
      assert.ok(typeof arg1 === "object");
      assert.ok(!!arg1);
      assert.ok("success" in arg1);
      assert.equal(arg1.success, false);
    }
  });
});
