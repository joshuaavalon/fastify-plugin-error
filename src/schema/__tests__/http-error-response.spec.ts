import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Compile } from "typebox/compile";
import { createHttpErrorResponseSchema } from "../http-error-response.js";


describe("createHttpErrorResponseSchema", () => {
  it("should create http error response schema", async () => {
    const message = "Payment Required";
    const schema = createHttpErrorResponseSchema(402);
    const compiledSchema = Compile(schema);
    assert.ok(compiledSchema.Check({
      code: "PaymentRequired",
      data: { message },
      success: false
    }));
    assert.ok(!compiledSchema.Check({
      code: "PaymentRequired",
      data: { message },
      success: true
    }));
  });

  it("should throw if status < 400", async () => {
    assert.throws(() => createHttpErrorResponseSchema(200));
  });

  it("should throw if status does not have a message", async () => {
    assert.throws(() => createHttpErrorResponseSchema(499));
  });
});
