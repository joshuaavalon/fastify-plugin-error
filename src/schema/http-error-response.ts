import { statuses } from "#http";
import { createErrorResponseSchema } from "./error-response.js";
import type { TSchema } from "typebox";
import type { StatusCode } from "#http";

export type CreateHttpErrorResponseSchemaOptions = {
  code?: string;
  description?: string;
  message?: string;
  title?: string;
};

export function createHttpErrorResponseSchema(status: number, opts: CreateHttpErrorResponseSchemaOptions = {}): TSchema {
  if (status < 400) {
    throw new Error(`Http error status code cannot be smaller than 400 (${status})`);
  }
  const { message: msg } = opts;
  const message = msg ?? statuses[status as StatusCode];
  if (!message) {
    throw new Error(`Cannot find the message for status code (${status})`);
  }
  return createErrorResponseSchema({ message });
}
