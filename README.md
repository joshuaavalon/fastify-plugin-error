# @joshuaavalon/fastify-plugin-error

Fastify plugin for handling global errors formatting and error schemas.

## Usage

```ts
import errorPlugin from "@joshuaavalon/fastify-plugin-error";

await app.register(errorPlugin);
```

### Error Formatter

An `ErrorFormatter` is responsible for formatter caught error to JSON.
For unsupported error, the formatter should return `null`.
The first formatter that return a non-null value is used.

```ts
import type { ErrorFormatter } from "@joshuaavalon/fastify-plugin-error";

const customErrorFormatter: ErrorFormatter = async function (err) {
  if (!(err instanceof HttpError) || err.status < 400) {
    return null;
  }
  const message = statuses[err.status];
  return {
    code: message,
    data: { message },
    status: err.status,
    success: false
  };
};
```

### Error Schema

A typebox schema must be set in route or added to global schema before throwing.

#### Route Specific Error

```ts
import type { TSchema } from "typebox";

const errorSchema: TSchema;
app.get(
  "/throw-error",
  {
    schema: {
      querystring: querySchema,
      response: {
        200: responseSchema,
        400: errorSchema
      }
    }
  },
  async function (req, res) {
    return res.send({ success: true });
  }
);
```

#### Global Error

```ts
import type { TSchema } from "typebox";

const errorSchema: TSchema;
app.errorSchemas.addSchema(400, errorSchema);
```
