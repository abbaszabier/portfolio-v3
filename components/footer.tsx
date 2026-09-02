"use client";

import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const t = getDictionary(locale).footer;

  return (
    <footer className="border-t border-border/60">
      <div
        className="hidden mx-auto
      
      md:flex w-full max-w-5xl flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-muted-foreground sm:flex-row"
      >
        <p>
          © {new Date().getFullYear()} Abbas Zabier Mohammad. {t.rights}
        </p>
        <p>{t.builtWith}</p>
      </div>
    </footer>
  );
}
