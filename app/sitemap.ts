import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/site";

const PUBLIC_PATHS = ["", "/dashboard", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    PUBLIC_PATHS.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
        ),
      },
    }))
  );
}
