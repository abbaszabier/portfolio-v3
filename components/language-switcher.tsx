"use client";

import { usePathname, useRouter } from "next/navigation";
import * as Flags from "country-flag-icons/react/3x2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LOCALES,
  LOCALE_COUNTRY,
  LOCALE_LABELS,
  getLocaleFromPathname,
  type Locale,
} from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/dictionaries";

function Flag({ locale }: { locale: Locale }) {
  const code = LOCALE_COUNTRY[locale] as keyof typeof Flags;
  const Icon = Flags[code];
  if (!Icon) return null;
  return (
    <Icon
      className="h-4 w-5 rounded-[2px] object-cover"
      title={LOCALE_LABELS[locale]}
    />
  );
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);
  const t = getDictionary(locale).nav;

  function handleChange(value: Locale | null) {
    if (!value) return;
    const segments = pathname.split("/");
    segments[1] = value;
    router.push(segments.join("/") || "/");
  }

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger
        aria-label={t.language}
        className="h-8 gap-1 rounded-full border-none bg-transparent  pr-0 pl-2.5 shadow-none hover:bg-muted cursor-pointer"
      >
        <SelectValue>
          <Flag locale={locale} />
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end">
        {LOCALES.map((l) => (
          <SelectItem
            key={l}
            value={l}
            className="flex gap-2 p-2 cursor-pointer"
          >
            <Flag locale={l} />
            <span>{LOCALE_LABELS[l]}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
