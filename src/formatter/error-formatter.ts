import type { FastifyInstance } from "fastify";

export type ApiResponse<T extends Record<string, unknown>> = {
  code: string;
  data: T;
  status: number;
  success: false;
};

/**
 * Formatter caught error. It should return `null` if it cannot format the error
 */
export type ErrorFormatter<T extends Record<string, unknown> = {}> = (this: FastifyInstance, err: Error) => Promise<ApiResponse<T> | null>;
