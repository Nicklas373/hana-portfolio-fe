import "server-only";

import fs from "node:fs";
import { isProd } from "./environment";

const readSecret = (secretName: string): string | undefined => {
  if (!isProd) {
    return undefined;
  }

  const secretPath = `/run/secrets/${secretName}`;

  if (!fs.existsSync(secretPath)) {
    return undefined;
  }

  const value = fs.readFileSync(secretPath, "utf8").trim();

  return value || undefined;
};

export const serverConfig = {
  api: {
    apiCfKey: process.env.APP_API_TURNSTILE_SITE_KEY,
    apiKey: readSecret("hana_portfolio_api_key") ?? process.env.APP_API_KEY,
    apiTestUrl: process.env.APP_API_TEST_URL,
    apiUrl: process.env.APP_API_URL,
  },
};
