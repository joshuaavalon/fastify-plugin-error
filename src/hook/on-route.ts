import { Type } from "typebox";
import type { onRouteHookHandler } from "fastify";
import type { TSchema } from "typebox";

export type RouteGlobalErrorSchemasOptions = "disable" | "merge" | "overwrite";

function overwriteGlobalErrorSchemas(globalSchemas: Record<string, TSchema[]>, routeSchemas: Record<string, TSchema>): Record<string, TSchema> {
  return {
    ...Object.fromEntries(Object.entries(globalSchemas)
      .filter(([_key, schemas]) => schemas.length > 0)
      .map(([key, schemas]) => {
        if (schemas.length === 1) {
          const schema = schemas[0] ?? Type.Object({});
          return [key, schema];
        }
        return [key, Type.Union(schemas)];
      })),
    ...routeSchemas
  };
}

function mergeGlobalErrorSchemas(globalSchemas: Record<string, TSchema[]>, routeSchemas: Record<string, TSchema>): Record<string, TSchema> {
  const resultSchemas: Record<string, TSchema> = {};
  const allKeys = new Set([...Object.keys(globalSchemas), ...Object.keys(routeSchemas)]);
  for (const key of allKeys) {
    const globalSchema = globalSchemas[key] ?? [];
    const routeSchema = routeSchemas[key];
    if (routeSchema) {
      globalSchema.push(routeSchema);
    }
    if (globalSchema.length <= 0) {
      continue;
    }
    if (globalSchema.length === 1) {
      const schema = globalSchema[0] ?? Type.Object({});
      resultSchemas[key] = schema;
      continue;
    }
    resultSchemas[key] = Type.Union(globalSchema);
  }
  return resultSchemas;
}

export const onRoute: onRouteHookHandler = async function (opts) {
  const { globalErrorSchemas = "overwrite" } = opts;
  if (globalErrorSchemas === "disable") {
    return;
  }
  opts.schema ??= {};
  const globalSchemas = this.errorSchemas.getSchemas();
  const routeSchemas = (opts.schema.response ?? {}) as Record<string, TSchema>;
  if (globalErrorSchemas !== "merge") {
    opts.schema.response = overwriteGlobalErrorSchemas(globalSchemas, routeSchemas);
  } else {
    opts.schema.response = mergeGlobalErrorSchemas(globalSchemas, routeSchemas);
  }
};
