import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons";
import { HeroDecor } from "@/components/hero-decor";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { getLocalizedProjects } from "@/lib/data";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/dictionaries";

const SOCIALS = [
  { href: "https://github.com/abbaszabier", label: "GitHub", icon: GithubIcon },
  {
    href: "https://linkedin.com/in/abbaszabier",
    label: "LinkedIn",
    icon: LinkedinIcon,
  },
  {
    href: "https://instagram.com/abzabier_",
    label: "Instagram",
    icon: InstagramIcon,
  },
  { href: "mailto:abbas.zabier06@gmail.com", label: "Email", icon: Mail },
];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const projects = getLocalizedProjects(locale).slice(0, 4);

  return (
    <div className="relative flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative mx-auto flex min-h-svh w-full max-w-6xl flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
        <HeroDecor />

        <div className="animate-in fade-in slide-in-from-bottom-4 flex items-center gap-2 text-sm text-muted-foreground duration-700">
          <span className="size-1.5 rounded-full bg-brand" />
          {dict.home.badge}
        </div>

        <h1 className="animate-in fade-in slide-in-from-bottom-4 mt-6 font-heading text-[51px] font-semibold leading-[0.95] tracking-tight delay-100 duration-700 sm:text-8xl md:text-9xl">
          {dict.home.greeting}
          <br />
          {dict.home.name}
        </h1>

        <p className="animate-in fade-in slide-in-from-bottom-4 mt-8 max-w-xl text-base md:text-lg leading-8 text-muted-foreground delay-200 duration-700">
          {dict.home.subtitle}
        </p>

        <div className="animate-in fade-in slide-in-from-bottom-4 mt-10 flex flex-col gap-3 delay-300 duration-700 sm:flex-row">
          <Button
            size="lg"
            className="gap-1.5"
            nativeButton={false}
            render={
              <Link href={`/${locale}/dashboard`}>
                {dict.home.ctaProject}
                <ArrowRight className="size-4" />
              </Link>
            }
          />
          <Button
            variant="outline"
            size="lg"
            nativeButton={false}
            render={
              <Link href="mailto:hello@example.com">
                {dict.home.ctaContact}
              </Link>
            }
          />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 mt-10 flex items-center gap-2 delay-300 duration-700">
          {SOCIALS.map(({ href, label, icon: Icon }) => (
            <Button
              key={label}
              variant="ghost"
              size="icon"
              aria-label={label}
              nativeButton={false}
              render={
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="size-4" />
                </a>
              }
            />
          ))}
        </div>
      </section>

      {/* Selected projects */}
      <section className="relative border-t border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(var(--foreground)_1px,transparent_1px)] bg-[size:22px_22px] opacity-15 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_25%,#000_50%,transparent_100%)]"
        />
        <div className="mx-auto w-full max-w-5xl px-6 py-24">
          <Reveal className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {dict.home.sectionLabel}
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                {dict.home.sectionTitle}
              </h2>
            </div>
            <Link
              href={`/${locale}/dashboard`}
              className="flex shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
            >
              {dict.home.viewAll}
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={index * 90}>
                <ProjectCard project={project} dict={dict} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
