import { errorCodes } from "fastify";
import { fastifyErrorMapping } from "#fastify";
import type { FastifyError } from "fastify";
import type { ErrorFormatter } from "./error-formatter.js";

function isFastifyError(err: Error): err is FastifyError {
  for (const e of Object.values(errorCodes)) {
    if (err instanceof e) {
      return true;
    }
  }
  return false;
}

export const fastifyErrorFormatter: ErrorFormatter = async function (err) {
  if (!isFastifyError(err)) {
    return null;
  }
  const result = fastifyErrorMapping[err.code];
  if (!result) {
    return null;
  }
  const { code, message, status } = result;
  return {
    code,
    data: { message },
    status,
    success: false
  };
};
