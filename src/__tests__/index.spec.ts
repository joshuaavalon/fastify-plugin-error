import assert from "node:assert/strict";
import { before, describe, it } from "node:test";
import fastify from "fastify";
import { HttpError } from "#http";
import errorPlugin from "../index.js";
import type { FastifyInstance } from "fastify";

describe("@joshuaavalon/fastify-plugin-error", () => {
  let app: FastifyInstance;

  before(async () => {
    app = await fastify();
    await app.register(errorPlugin);

    app.get("/http-error-401", async () => {
      const err = new HttpError(401);
      throw err;
    });

    app.get("/http-error-500", async () => {
      throw new Error("Unknown");
    });

    app.post("/empty-json-body", async (_req, res) => {
      res.send({ success: true });
    });

    app.post("/invalid-media-type", async (_req, res) => {
      res.send({ success: true });
    });
  });

  it("should format HttpError 401", async () => {
    const res = await app.inject({
      method: "GET",
      path: "/http-error-401"
    });
    const json = await res.json();
    assert.equal(res.statusCode, 401);
    assert.equal(json.success, false);
    assert.equal(json.code, "Unauthorized");
    assert.ok(json.data.message);
  });

  it("should format HttpError 500", async () => {
    const res = await app.inject({
      method: "GET",
      path: "/http-error-500"
    });
    const json = await res.json();
    assert.equal(res.statusCode, 500);
    assert.equal(json.success, false);
    assert.equal(json.code, "InternalServerError");
    assert.ok(json.data.message);
  });

  it("should format FST_ERR_CTP_EMPTY_JSON_BODY", async () => {
    const res = await app.inject({
      body: "",
      headers: { "content-type": "application/json" },
      method: "POST",
      path: "/empty-json-body"
    });
    const json = await res.json();
    assert.equal(res.statusCode, 400);
    assert.equal(json.success, false);
    assert.equal(json.code, "EmptyJsonBody");
    assert.ok(json.data.message);
  });

  it("should format FST_ERR_CTP_INVALID_MEDIA_TYPE", async () => {
    const res = await app.inject({
      body: "",
      headers: { "content-type": "unknown" },
      method: "POST",
      path: "/invalid-media-type"
    });
    const json = await res.json();
    assert.equal(res.statusCode, 415);
    assert.equal(json.success, false);
    assert.equal(json.code, "InvalidMediaType");
    assert.ok(json.data.message);
  });
});
