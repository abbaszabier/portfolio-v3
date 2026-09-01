"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Home, FolderGit2, User, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";
import { getLocaleFromPathname } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function Navbar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const locale = getLocaleFromPathname(pathname);

  useEffect(() => {
    if (!isAdmin) document.documentElement.lang = locale;
  }, [isAdmin, locale]);

  if (isAdmin) {
    return null;
  }

  const t = getDictionary(locale).nav;
  const NAV_LINKS = [
    { href: `/${locale}`, label: t.home, icon: Home },
    { href: `/${locale}/about`, label: t.about, icon: User },
    { href: `/${locale}/dashboard`, label: t.project, icon: FolderGit2 },
    { href: `/${locale}/contact`, label: t.contact, icon: Mail },
  ];

  return (
    <>
      {/* Desktop: floating pill, top */}
      <header className="fixed inset-x-0 top-5 z-50 hidden justify-center px-6 md:flex">
        <nav className="flex items-center gap-1 rounded-full border border-border/60 bg-muted/80 p-1.5 shadow-md shadow-black/5 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mx-1 h-5 w-px bg-border" />
          <LanguageSwitcher />
          <ThemeToggle />
        </nav>
      </header>

      {/* Mobile: language + theme toggle, top-right */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded-full border border-border/60 bg-muted/80 shadow-lg shadow-black/5 backdrop-blur-xl md:hidden">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      {/* Mobile: app-style tab bar, bottom */}
      <nav className="fixed inset-x-0 bottom-0 z-50 flex items-stretch justify-around border-t border-border/60 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <Icon className={cn("size-5", active && "text-brand")} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
