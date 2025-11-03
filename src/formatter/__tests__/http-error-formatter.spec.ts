import assert from "node:assert/strict";
import { describe, it } from "node:test";
import fastify from "fastify";
import { HttpError } from "#http";
import { httpErrorFormatter } from "../http-error-formatter.js";

describe("httpErrorFormatter", () => {
  it("should format HttpError", async () => {
    const app = await fastify();
    const error = HttpError.notFound();
    const result = await httpErrorFormatter.bind(app)(error);
    assert.ok(result);
    assert.equal(result.success, false);
    assert.equal(result.status, 404);
    assert.equal(result.code, "NotFound");
  });

  it("should not format non-HttpError", async () => {
    const app = await fastify();
    const result = await httpErrorFormatter.bind(app)(new Error());
    assert.equal(result, null);
  });
});
