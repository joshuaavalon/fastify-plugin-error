import assert from "node:assert/strict";
import { describe, it } from "node:test";
import createError from "@fastify/error";
import fastify from "fastify";
import { fastifyErrorFormatter } from "../fastify-error-formatter.js";

describe("fastifyErrorFormatter", () => {
  it("should format supported error", async () => {
    const app = await fastify();
    const LargeError = createError("FST_ERR_CTP_BODY_TOO_LARGE", "message");
    const result = await fastifyErrorFormatter.bind(app)(new LargeError());
    assert.ok(result);
    assert.equal(result.success, false);
    assert.equal(result.status, 413);
    assert.equal(result.code, "BodyTooLarge");
  });

  it("should not format unsupported error", async () => {
    const app = await fastify();
    const LargeError = createError("asd", "message");
    const result = await fastifyErrorFormatter.bind(app)(new LargeError());
    assert.equal(result, null);
  });
});
