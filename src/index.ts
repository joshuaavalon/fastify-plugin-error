import fp from "fastify-plugin";
import { ErrorSchemaHandler } from "#handler";
import { onRoute } from "#hook";
import { HttpError } from "#http";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { FastifyError } from "fastify";
import type { RouteGlobalErrorSchemasOptions } from "#hook";

export type ErrorPluginOptions = {
  /**
   * @default true
   */
  enableGlobalSchemas?: boolean;

  /**
   * `true` to add {@link FastifyError} formatter
   * @default true
   */
  formatFastify?: boolean;

  /**
   * `true` to add {@link HttpError} formatter
   * @default true
   */
  formatHttp?: boolean;

  /**
   * @default [400, 401, 403, 500]
   */
  httpErrorSchemas?: number[];
};

export const name = "@joshuaavalon/fastify-plugin-error";

export default fp<ErrorPluginOptions>(
  async (app, opts) => {
    app.addHook("onRoute", onRoute);
    app.decorate("errorSchemas", new ErrorSchemaHandler(opts));
    app.setErrorHandler(function (error, _req, res) {
      return this.errorSchemas.format(error, res);
    });
    app.setNotFoundHandler(function (_req, res) {
      return this.errorSchemas.format(HttpError.notFound(), res);
    });
  },
  {
    decorators: {},
    dependencies: [],
    fastify: "5.x",
    name
  }
);

export type { ErrorFormatter } from "#formatter";
export type { RouteGlobalErrorSchemasOptions } from "#hook";

declare module "fastify" {
  interface FastifyInstance {
    readonly errorSchemas: ErrorSchemaHandler;
  }

  interface RouteOptions extends ErrorPluginRouteOptions {
  }

  interface RouteShorthandOptions extends ErrorPluginRouteOptions {
  }

  interface FastifyContextConfig extends ErrorPluginRouteOptions {
  }

  interface ErrorPluginRouteOptions {
    globalErrorSchemas?: RouteGlobalErrorSchemasOptions;
  }
}
