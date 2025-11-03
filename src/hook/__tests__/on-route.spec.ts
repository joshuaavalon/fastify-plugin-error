import assert from "node:assert/strict";
import { before, describe, it } from "node:test";
import fastify from "fastify";
import { Type } from "typebox";
import plugin from "../../index.js";
import type { FastifyInstance } from "fastify";


describe("onRoute", () => {
  let app: FastifyInstance;

  before(async () => {
    app = await fastify();
    await app.register(plugin);
    app.get("/disable-global-error-schema", { globalErrorSchemas: "disable" }, async (_req, res) => {
      res.status(500).send({ success: true });
    });

    app.get("/default-global-error-schema", { schema: { response: { 500: Type.Object({ success: true }) } } }, async (_req, res) => {
      res.status(500).send({ success: true });
    });

    app.get("/overwrite-global-error-schema", {
      globalErrorSchemas: "overwrite",
      schema: { response: { 500: Type.Object({ success: true }) } }
    }, async (_req, res) => {
      res.status(500).send({ success: true });
    });

    app.get("/merge-global-error-schema", {
      globalErrorSchemas: "merge",
      schema: { response: { 500: Type.Object({ success: Type.Literal(true) }, { additionalProperties: false }) } }
    }, async (_req, res) => {
      res.status(500).send({ success: true });
    });
  });


  it("should default overwrite global error schema", async () => {
    const res = await app.inject({
      method: "GET",
      path: "/default-global-error-schema"
    });
    const json = await res.json();
    assert.equal(res.statusCode, 500);
    assert.equal(json.success, true);
  });

  it("should overwrite global error schema", async () => {
    const res = await app.inject({
      method: "GET",
      path: "/overwrite-global-error-schema"
    });
    const json = await res.json();
    assert.equal(res.statusCode, 500);
    assert.equal(json.success, true);
  });

  it("should disable global error schema", async () => {
    const res = await app.inject({
      method: "GET",
      path: "/disable-global-error-schema"
    });
    const json = await res.json();
    assert.equal(res.statusCode, 500);
    assert.equal(json.success, true);
  });

  it("should merge global error schema", async () => {
    const res = await app.inject({
      method: "GET",
      path: "/merge-global-error-schema"
    });
    const json = await res.json();
    assert.equal(res.statusCode, 500);
    assert.equal(json.success, true);
  });
});
