export const LOCALES = ["id", "en", "zh", "ja", "hi"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "id";

export const LOCALE_LABELS: Record<Locale, string> = {
  id: "ID",
  en: "EN",
  zh: "ZH",
  ja: "JA",
  hi: "HI",
};

export const LOCALE_COUNTRY: Record<Locale, string> = {
  id: "ID",
  en: "US",
  zh: "CN",
  ja: "JP",
  hi: "IN",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Ambil locale dari pathname (`/en/about` -> `en`). Fallback ke default kalau tidak valid (mis. `/admin/...`). */
export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/")[1] ?? "";
  return isLocale(segment) ? segment : DEFAULT_LOCALE;
}
