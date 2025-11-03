import { HttpError, statuses } from "#http";
import { toIdentifier } from "#util";
import type { ErrorFormatter } from "./error-formatter.js";

export const httpErrorFormatter: ErrorFormatter = async function (err) {
  if (!(err instanceof HttpError) || err.status < 400) {
    return null;
  }
  const message = statuses[err.status];
  const code = toIdentifier(message);
  return {
    code,
    data: { message },
    status: err.status,
    success: false
  };
};
