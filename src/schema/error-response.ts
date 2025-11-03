import { Type } from "typebox";
import { toIdentifier } from "#util";
import type { Static, TSchema } from "typebox";

export const errorResponseSchema = Type.Object({
  code: Type.String(),
  data: Type.Object({ message: Type.String() }),
  success: Type.Literal(false)
}, { additionalProperties: false });

export type ErrorResponse = Static<typeof errorResponseSchema>;

export type CreateErrorResponseSchemaOptions = {
  code?: string;
  description?: string;
  message: string;
  title?: string;
};

export function createErrorResponseSchema(opts: CreateErrorResponseSchemaOptions): TSchema {
  const { message } = opts;
  if (!message) {
    throw new Error("Message cannot be empty");
  }
  const {
    code = toIdentifier(message),
    description = message,
    title = message
  } = opts;
  return Type.Object({
    code: Type.Literal(code),
    data: Type.Object({ message: Type.String({ examples: [message] }) }),
    success: Type.Literal(false)
  }, {
    additionalProperties: false,
    description,
    title
  });
}
