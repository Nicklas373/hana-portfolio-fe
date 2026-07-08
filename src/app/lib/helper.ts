import { basePath } from "../variables/constant";
import { applicationErrString } from "../variables/enum";

export function emailFormatter(email: string): boolean {
  if (!email) return false;

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return false;
  }
  return true;
}

export function errorFormatter(err: unknown): string {
  if (typeof err === "string") {
    return err.replace(/"/g, "");
  }

  if (err instanceof Error) {
    return err.message.replace(/"/g, "");
  }

  try {
    return JSON.stringify(err).replace(/"/g, "");
  } catch {
    return applicationErrString.applicationErrFailParseMsg;
  }
}

export const baseUrlBuilder = (requestUrl: string, options?: RequestInit) => {
  const uri = requestUrl.startsWith("/") ? requestUrl : `/${requestUrl}`;

  return fetch(`${basePath}${uri}`, {
    ...options,
  });
};

export const baseUrlBuilderTest = (requestUrl: string) => {
  const uri = requestUrl.startsWith("/") ? requestUrl : `/${requestUrl}`;

  return `${process.env.APP_URL}/${basePath}${uri}`;
};
