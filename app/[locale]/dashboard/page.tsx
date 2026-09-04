import { notFound } from "next/navigation";
import { FolderGit2, Layers, Sparkles } from "lucide-react";
import { getLocalizedProjects } from "@/lib/data";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Card, CardContent } from "@/components/ui/card";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const projects = getLocalizedProjects(locale);
  const uniqueTechCount = new Set(projects.flatMap((p) => p.techStack)).size;

  const stats = [
    {
      label: dict.dashboard.statTotal,
      value: projects.length,
      icon: FolderGit2,
    },
    { label: dict.dashboard.statTech, value: uniqueTechCount, icon: Layers },
    { label: dict.dashboard.statActive, value: 7, icon: Sparkles },
  ];

  return (
    <div className="relative flex flex-1 flex-col">
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(var(--foreground)_1px,transparent_1px)] bg-[size:22px_22px] opacity-15 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_50%,transparent_100%)]"
        />
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {dict.dashboard.label}
            </p>
            <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.dashboard.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {dict.dashboard.subtitle}
            </p>
          </div>

          <Reveal delay={80} className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map(({ label, value, icon: Icon }) => (
              <Card key={label} className="rounded-2xl ring-border">
                <CardContent className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold leading-none">
                      {value}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
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
