import { NextRequest, NextResponse } from "next/server";
import pinoConfig from "./pino/config";
import { errorFormatter } from "./helper";
import { NVEBodyWrapper } from "../variables/interface";
import { applicationErrString } from "../variables/enum";

async function getErrorResponse(
  response: NextResponse,
): Promise<NVEBodyWrapper | undefined> {
  try {
    const clonedResponse = response.clone();
    const contentType = clonedResponse.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      return undefined;
    }

    const body = await clonedResponse.json();
    return {
      message: body.message,
      error: body.error,
    };
  } catch {
    return undefined;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function logger(handler: Function) {
  const isDevelopment = process.env.NODE_ENV === "production";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (req: NextRequest, context?: any) => {
    const start = Date.now();
    const { pathname, search } = req.nextUrl;
    const requestID = crypto.randomUUID();

    try {
      const response = await handler(req, context);
      const duration = Date.now() - start;
      const status = response.status;
      const pinoBody = {
        req: {
          traceId: requestID,
          method: req.method,
          url: `${pathname}${search}`,
        },
        res: {
          status,
        },
        duration: `${duration}ms`,
      };

      if (status >= 400) {
        const NVErrorWrapper = await getErrorResponse(response);

        const errorLogData = {
          ...pinoBody,
          NVErrorWrapper,
        };

        if (status >= 500) {
          pinoConfig.error(
            errorLogData,
            `${req.method} ${pathname}${search} - ${status}`,
          );
        } else {
          pinoConfig.warn(
            errorLogData,
            `${req.method} ${pathname}${search} - ${status}`,
          );
        }
      } else if (!isDevelopment) {
        pinoConfig.info(
          pinoBody,
          `${req.method} ${pathname}${search} - ${status}`,
        );
      }

      return response;
    } catch (error: unknown) {
      const duration = Date.now() - start;
      const pinoBody = {
        req: {
          traceId: requestID,
          method: req.method,
          url: `${pathname}${search}`,
        },
        res: {
          status: 500,
        },
        duration: `${duration}ms`,
        NVErrorWrapper: errorFormatter(error),
      };
      pinoConfig.error(pinoBody, `${req.method} ${pathname}${search} - 500`);
      return NextResponse.json(
        {
          error: applicationErrString.applicationErrUnhandledMessage,
        },
        {
          status: 500,
        },
      );
    }
  };
}
