import { notFound } from "next/navigation";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { HeroDecor } from "@/components/hero-decor";
import { Reveal } from "@/components/reveal";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/dictionaries";

const LOCATION = "Jakarta, Indonesia";
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(LOCATION)}&output=embed`;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <div className="relative flex flex-1 flex-col">
      <section className="relative overflow-hidden min-h-svh">
        <HeroDecor />
        <div className="mx-auto w-full max-w-5xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {dict.contact.label}
            </p>
            <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              {dict.contact.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              {dict.contact.subtitle}
            </p>

            <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
              <span className="flex items-center gap-2">
                <Mail className="size-4 text-brand" />
                abbas.zabier06@gmail.com
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-brand" />
                {LOCATION}
              </span>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Reveal
              delay={80}
              className="rounded-3xl bg-card p-8 ring-1 ring-border"
            >
              <ContactForm dict={dict.contact} />
            </Reveal>

            <Reveal
              delay={140}
              className="relative min-h-80 overflow-hidden rounded-3xl ring-1 ring-border"
            >
              <iframe
                title="Lokasi saya"
                src={MAP_SRC}
                className="absolute inset-x-0 -top-24 h-[calc(100%+6rem)] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
