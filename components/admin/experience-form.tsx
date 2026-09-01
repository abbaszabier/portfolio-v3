"use client"

import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n/locales"
import type { Experience } from "@/lib/types"

type ActionState = { error?: string } | undefined
type Action = (prevState: ActionState, formData: FormData) => Promise<ActionState>

export function ExperienceForm({
  experience,
  action,
  submitLabel,
}: {
  experience?: Experience
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
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" defaultValue={experience?.company} required />
        <p className="text-xs text-muted-foreground">Tidak diterjemahkan.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Role, Periode, Tipe & Deskripsi (per bahasa)</Label>
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
              <Label htmlFor={`role_${locale}`}>
                Role{locale !== "id" && " (opsional, fallback ke Indonesia)"}
              </Label>
              <Input
                id={`role_${locale}`}
                name={`role_${locale}`}
                defaultValue={experience?.translations?.[locale]?.role}
                required={locale === "id"}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`period_${locale}`}>Periode</Label>
                <Input
                  id={`period_${locale}`}
                  name={`period_${locale}`}
                  defaultValue={experience?.translations?.[locale]?.period}
                  placeholder="2024 — Sekarang"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`type_${locale}`}>Tipe</Label>
                <Input
                  id={`type_${locale}`}
                  name={`type_${locale}`}
                  defaultValue={experience?.translations?.[locale]?.type}
                  placeholder="Full-time"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`description_${locale}`}>Deskripsi</Label>
              <Textarea
                id={`description_${locale}`}
                name={`description_${locale}`}
                defaultValue={experience?.translations?.[locale]?.description}
                rows={3}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="techStack">Tech Stack</Label>
        <Input
          id="techStack"
          name="techStack"
          defaultValue={experience?.techStack.join(", ")}
          placeholder="Next.js, TypeScript"
        />
        <p className="text-xs text-muted-foreground">Pisahkan dengan koma. Tidak diterjemahkan.</p>
      </div>

      <Button type="submit" disabled={pending} className="mt-2 self-start">
        {pending ? "Menyimpan..." : submitLabel}
      </Button>
    </form>
  )
}
