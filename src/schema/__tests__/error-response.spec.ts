import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Compile } from "typebox/compile";
import { createErrorResponseSchema } from "../error-response.js";


describe("createErrorResponseSchema", () => {
  it("should create error response schema", async () => {
    const message = "Hello World";
    const schema = createErrorResponseSchema({ message });
    const compiledSchema = Compile(schema);
    assert.ok(compiledSchema.Check({
      code: "HelloWorld",
      data: { message },
      success: false
    }));
    assert.ok(!compiledSchema.Check({
      code: "HelloWorld",
      data: { message },
      success: true
    }));
  });

  it("should throw if message is empty", async () => {
    assert.throws(() => createErrorResponseSchema({ message: "" }));
  });
});
