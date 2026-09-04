const FALLBACK_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_URL;

export const SITE_NAME = "Abbas Zabier Mohammad";
