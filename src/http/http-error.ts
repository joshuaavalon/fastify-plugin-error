import { statuses } from "./status.js";
import type { StatusCode } from "./status.js";

export class HttpError extends Error {
  public readonly status: StatusCode;

  public constructor(status: StatusCode) {
    super(statuses[status]);
    this.status = status;
  }

  public static badRequest(): HttpError {
    return new HttpError(400);
  }

  public static unauthorized(): HttpError {
    return new HttpError(401);
  }

  public static paymentRequired(): HttpError {
    return new HttpError(402);
  }

  public static forbidden(): HttpError {
    return new HttpError(403);
  }

  public static notFound(): HttpError {
    return new HttpError(404);
  }

  public static methodNotAllowed(): HttpError {
    return new HttpError(405);
  }

  public static notAcceptable(): HttpError {
    return new HttpError(406);
  }

  public static proxyAuthenticationRequired(): HttpError {
    return new HttpError(407);
  }

  public static requestTimeout(): HttpError {
    return new HttpError(408);
  }

  public static conflict(): HttpError {
    return new HttpError(409);
  }

  public static gone(): HttpError {
    return new HttpError(410);
  }

  public static lengthRequired(): HttpError {
    return new HttpError(411);
  }

  public static preconditionFailed(): HttpError {
    return new HttpError(412);
  }

  public static payloadTooLarge(): HttpError {
    return new HttpError(413);
  }

  public static uriTooLong(): HttpError {
    return new HttpError(414);
  }

  public static unsupportedMediaType(): HttpError {
    return new HttpError(415);
  }

  public static rangeNotSatisfiable(): HttpError {
    return new HttpError(416);
  }

  public static expectationFailed(): HttpError {
    return new HttpError(417);
  }

  public static imaTeapot(): HttpError {
    return new HttpError(418);
  }

  public static misdirectedRequest(): HttpError {
    return new HttpError(421);
  }

  public static unprocessableEntity(): HttpError {
    return new HttpError(422);
  }

  public static locked(): HttpError {
    return new HttpError(423);
  }

  public static failedDependency(): HttpError {
    return new HttpError(424);
  }

  public static tooEarly(): HttpError {
    return new HttpError(425);
  }

  public static upgradeRequired(): HttpError {
    return new HttpError(426);
  }

  public static preconditionRequired(): HttpError {
    return new HttpError(428);
  }

  public static tooManyRequests(): HttpError {
    return new HttpError(429);
  }

  public static requestHeaderFieldsTooLarge(): HttpError {
    return new HttpError(431);
  }

  public static unavailableForLegalReasons(): HttpError {
    return new HttpError(451);
  }

  public static internalServerError(): HttpError {
    return new HttpError(500);
  }

  public static notImplemented(): HttpError {
    return new HttpError(501);
  }

  public static badGateway(): HttpError {
    return new HttpError(502);
  }

  public static serviceUnavailable(): HttpError {
    return new HttpError(503);
  }

  public static gatewayTimeout(): HttpError {
    return new HttpError(504);
  }

  public static httpVersionNotSupported(): HttpError {
    return new HttpError(505);
  }

  public static variantAlsoNegotiates(): HttpError {
    return new HttpError(506);
  }

  public static insufficientStorage(): HttpError {
    return new HttpError(507);
  }

  public static loopDetected(): HttpError {
    return new HttpError(508);
  }

  public static bandwidthLimitExceeded(): HttpError {
    return new HttpError(509);
  }

  public static notExtended(): HttpError {
    return new HttpError(510);
  }

  public static networkAuthenticationRequired(): HttpError {
    return new HttpError(511);
  }
}
