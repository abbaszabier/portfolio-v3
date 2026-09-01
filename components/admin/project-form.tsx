"use client"

import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n/locales"
import type { Project } from "@/lib/types"

type ActionState = { error?: string } | undefined
type Action = (prevState: ActionState, formData: FormData) => Promise<ActionState>

export function ProjectForm({
  project,
  action,
  submitLabel,
}: {
  project?: Project
  action: Action
  submitLabel: string
}) {
  const [state, formAction, pending] = useActionState(action, undefined)
  const [activeLocale, setActiveLocale] = useState<Locale>("id")

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state?.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-1.5">
        <Label>Nama & Deskripsi (per bahasa)</Label>
        <div className="flex flex-wrap gap-1 rounded-lg bg-muted p-1">
          {LOCALES.map((locale) => (
            <button
              key={locale}
              type="button"
              onClick={() => setActiveLocale(locale)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                activeLocale === locale
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {LOCALE_LABELS[locale]}
            </button>
          ))}
        </div>

        {LOCALES.map((locale) => (
          <div
            key={locale}
            hidden={activeLocale !== locale}
            className="flex flex-col gap-3 rounded-lg border border-border/60 p-3"
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`name_${locale}`}>
                Nama Project{locale !== "id" && " (opsional, fallback ke Indonesia)"}
              </Label>
              <Input
                id={`name_${locale}`}
                name={`name_${locale}`}
                defaultValue={project?.translations?.[locale]?.name}
                required={locale === "id"}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`description_${locale}`}>Deskripsi</Label>
              <Textarea
                id={`description_${locale}`}
                name={`description_${locale}`}
                defaultValue={project?.translations?.[locale]?.description}
                rows={3}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`whatIDid_${locale}`}>Apa yang dilakukan</Label>
              <Textarea
                id={`whatIDid_${locale}`}
                name={`whatIDid_${locale}`}
                defaultValue={project?.translations?.[locale]?.whatIDid?.join("\n")}
                rows={3}
                placeholder={"Satu poin per baris"}
              />
              <p className="text-xs text-muted-foreground">Satu poin per baris, jadi list di halaman project.</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="platform">Platform</Label>
        <Input
          id="platform"
          name="platform"
          defaultValue={project?.platform}
          placeholder="Web Application, Mobile App, dll"
        />
        <p className="text-xs text-muted-foreground">Tidak diterjemahkan.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="image">Gambar Project</Label>
        <Input
          id="image"
          name="image"
          defaultValue={project?.image}
          placeholder="/projects/nama-file.png"
        />
        <p className="text-xs text-muted-foreground">
          Upload file gambar manual ke folder public/projects, lalu isi path-nya di sini (mis. /projects/nama-file.png).
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="techStack">Tech Stack</Label>
        <Input
          id="techStack"
          name="techStack"
          defaultValue={project?.techStack.join(", ")}
          placeholder="Next.js, TypeScript, Tailwind CSS"
        />
        <p className="text-xs text-muted-foreground">Pisahkan dengan koma. Tidak diterjemahkan.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="link">Link</Label>
        <Input id="link" name="link" type="url" defaultValue={project?.link} placeholder="https://" />
      </div>

      <Button type="submit" disabled={pending} className="mt-2 self-start">
        {pending ? "Menyimpan..." : submitLabel}
      </Button>
    </form>
  )
}
