import fp from "fastify-plugin";
import { ErrorSchemaHandler } from "#handler";
import { onRoute } from "#hook";
import { HttpError } from "#http";
import type { RouteGlobalErrorSchemasOptions } from "#hook";

export type ErrorPluginOptions = {
  enableGlobalSchemas?: boolean;
  formatFastify?: boolean;
  formatHttp?: boolean;
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

export type { RouteGlobalErrorSchemasOptions as RouteErrorSchemaOptions } from "#hook";

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
