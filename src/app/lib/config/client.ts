export const clientConfig = {
  app: {
    baseUrl: process.env.NEXT_PUBLIC_APP_BASE_PATH,
    cfSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    name: process.env.NEXT_PUBLIC_APP_NAME,
    url: process.env.NEXT_PUBLIC_APP_URL,
  },
};
