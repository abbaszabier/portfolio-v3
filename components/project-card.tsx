"use client";

import Image from "next/image";
import { ArrowUpRight, Sparkle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { LocalizedProject } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function ProjectCard({
  project,
  dict,
}: {
  project: LocalizedProject;
  dict: Dictionary;
}) {
  return (
    <Dialog>
      <DialogTrigger className="group relative flex w-full h-full min-h-[19rem] flex-col justify-between overflow-hidden rounded-3xl bg-card p-8 text-left shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-1.5 hover:bg-muted/60 hover:shadow-xl cursor-pointer">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-foreground/5 blur-2xl transition-transform duration-500 group-hover:translate-x-3 group-hover:-translate-y-3"
        />
        <Sparkle
          aria-hidden
          className="absolute right-6 top-6 size-6 scale-50 fill-brand/50 text-brand/50 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:rotate-12 group-hover:opacity-100"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">
            {project.techStack[0]}
          </p>
          <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground line-clamp-3">
            {project.description}
          </p>
        </div>
        <div className="mt-6 flex items-end justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
          <ArrowUpRight className="size-6 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand" />
        </div>
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] max-w-[calc(100%-2rem)] overflow-y-auto sm:max-w-xl p-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button className="sr-only" autoFocus aria-hidden="true" />
        <div className="flex flex-col gap-6">
          <div>
            <DialogTitle className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              {project.name}
            </DialogTitle>
            <p className="mt-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {project.platform}
            </p>
          </div>

          <div className="relative flex w-full shrink-0 items-center justify-center overflow-hidden rounded-sm bg-muted">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.name}
                width={1600}
                height={900}
                className="w-full h-auto object-contain"
              />
            ) : (
              <p className="px-6 text-center text-xs text-muted-foreground py-12">
                {dict.project.imageFallback}
              </p>
            )}
          </div>

          <p className="text-sm leading-6 text-muted-foreground">
            {project.description}
          </p>

          {project.whatIDid.length > 0 && (
            <div>
              <p className="text-sm font-semibold">{dict.project.whatIDid}</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {project.whatIDid.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-6 text-muted-foreground"
                  >
                    <span className="mt-2.5 size-1 shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="text-sm font-semibold">{dict.project.techStack}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-brand hover:underline"
            >
              {dict.project.visitProject}
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
