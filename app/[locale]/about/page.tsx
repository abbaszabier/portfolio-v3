import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Download, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroDecor } from "@/components/hero-decor";
import { Reveal } from "@/components/reveal";
import { SkillMarquee } from "@/components/skill-marquee";
import { ExperienceItem } from "@/components/experience-item";
import { getLocalizedExperiences, getSkills } from "@/lib/data";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const skills = getSkills();
  const experiences = getLocalizedExperiences(locale);

  const frontend = skills
    .filter((s) => s.category === "Frontend")
    .map((s) => s.name);
  const otherCategories = Array.from(
    new Set(
      skills.filter((s) => s.category !== "Frontend").map((s) => s.category),
    ),
  );

  const hasPhoto = existsSync(join(process.cwd(), "public", "profile.jpg"));
  const hasCv = existsSync(join(process.cwd(), "public", "cv.pdf"));

  return (
    <div className="relative flex flex-1 flex-col">
      {/* About me */}
      <section className="relative flex min-h-svh flex-col justify-center overflow-hidden">
        <HeroDecor />
        <div className="mx-auto w-full max-w-5xl px-6 py-24">
          <Reveal className="grid gap-10 md:grid-cols-[26rem_1fr] md:items-center md:gap-16">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] bg-muted ring-1 ring-border md:mx-0">
              {hasPhoto ? (
                <Image
                  src="/profile.jpg"
                  alt={`Foto ${dict.about.name}`}
                  fill
                  sizes="(min-width: 768px) 26rem, 90vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-2 text-muted-foreground">
                  <User className="size-16" strokeWidth={1.25} />
                  <p className="px-6 text-center text-xs">
                    {dict.about.photoFallback}
                  </p>
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {dict.about.label}
              </p>
              <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                {dict.about.name}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
                {dict.about.bio}
              </p>

              <div className="mt-8">
                <Button
                  size="lg"
                  className="gap-1.5"
                  nativeButton={false}
                  render={
                    <a
                      href={hasCv ? "/cv.pdf" : "#"}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {dict.about.downloadCv}
                      <Download className="size-4" />
                    </a>
                  }
                />
                {!hasCv && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {dict.about.cvFallback}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills & Experience */}
      <section className="relative border-t border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(var(--foreground)_1px,transparent_1px)] bg-[size:22px_22px] opacity-15 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_25%,#000_50%,transparent_100%)]"
        />
        <div className="mx-auto w-full max-w-5xl py-24">
          <Reveal className="px-6">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {dict.about.skillLabel}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.about.skillTitle}
            </h2>
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <SkillMarquee items={frontend} />
          </Reveal>

          <Reveal delay={180} className="mt-12 px-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
              {otherCategories.map((category) => (
                <div key={category}>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {dict.about.categories[category]}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    {skills
                      .filter((s) => s.category === category)
                      .map((s) => (
                        <span key={s.id} className="text-sm text-foreground/80">
                          {s.name}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mx-auto mt-24 max-w-3xl px-6">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {dict.about.experienceLabel}
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                {dict.about.experienceTitle}
              </h2>
            </Reveal>

            <div className="mt-10">
              {experiences.map((experience, index) => (
                <Reveal key={experience.id} delay={index * 90}>
                  <ExperienceItem
                    experience={experience}
                    isLast={index === experiences.length - 1}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
