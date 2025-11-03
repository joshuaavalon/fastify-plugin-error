import { fastifyErrorMapping } from "#fastify";
import { fastifyErrorFormatter, httpErrorFormatter } from "#formatter";
import { statusCodes } from "#http";
import { createErrorResponseSchema, createHttpErrorResponseSchema } from "#schema";
import type { FastifyReply } from "fastify";
import type { TSchema } from "typebox";
import type { ErrorFormatter } from "#formatter";

export type ErrorSchemaHandlerOptions = {
  enableGlobalSchemas?: boolean;
  formatFastify?: boolean;
  formatHttp?: boolean;
  httpErrorSchemas?: number[];
};

export class ErrorSchemaHandler {
  private readonly errorSchemas: Record<number | string, TSchema[]>;
  private readonly formatters: ErrorFormatter[];
  private readonly enableSchemas: boolean;

  public constructor(opts: ErrorSchemaHandlerOptions) {
    const {
      enableGlobalSchemas = true,
      formatFastify = true,
      formatHttp = true,
      httpErrorSchemas = [400, 401, 403, 404, 500]
    } = opts;
    this.errorSchemas = {};
    this.formatters = [];
    this.enableSchemas = enableGlobalSchemas;
    if (formatFastify) {
      this.addFormatter(fastifyErrorFormatter);
      for (const e of Object.values(fastifyErrorMapping)) {
        const schema = createErrorResponseSchema(e);
        this.addSchema(e.status, schema);
      }
    }
    if (formatHttp) {
      this.addFormatter(httpErrorFormatter);
      for (const status of statusCodes) {
        if (status < 400 || !httpErrorSchemas.includes(status)) {
          continue;
        }
        const schema = createHttpErrorResponseSchema(status);
        this.addSchema(status, schema);
      }
    }
  }

  public addFormatter<T extends Record<string, unknown>>(formatter: ErrorFormatter<T>): void {
    this.formatters.unshift(formatter);
  }

  public async format(err: Error, res: FastifyReply): Promise<void> {
    for (const formatter of this.formatters) {
      const responseJson = await formatter.call(res.server, err);
      if (!responseJson) {
        continue;
      }
      const { status, ...data } = responseJson;
      return res.status(status).send(data);
    }
    res.log.error({ err }, "Unformatted error");
    return res.status(500).send({
      code: "InternalServerError",
      data: { message: "Internal Server Error" },
      success: false
    });
  }

  public addSchema(status: number | string, schema: TSchema): void {
    const schemas = this.errorSchemas[status] ?? [];
    if (!schemas.includes(schema)) {
      schemas.push(schema);
    }
    this.errorSchemas[status] = schemas;
  }

  public getSchemas(): Record<string, TSchema[]> {
    if (!this.enableSchemas) {
      return {};
    }
    return { ...Object.fromEntries(Object.entries(this.errorSchemas).map(([key, schemas]) => [key, [...schemas]])) };
  }
}
