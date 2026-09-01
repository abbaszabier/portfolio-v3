"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Skill } from "@/lib/types"

type ActionState = { error?: string } | undefined
type Action = (prevState: ActionState, formData: FormData) => Promise<ActionState>

export function SkillForm({
  skill,
  action,
  submitLabel,
}: {
  skill?: Skill
  action: Action
  submitLabel: string
}) {
  const [state, formAction, pending] = useActionState(action, undefined)

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state?.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="category">Kategori</Label>
        <select
          id="category"
          name="category"
          defaultValue={skill?.category ?? "Frontend"}
          required
          className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Tools">Tools</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Nama Skill</Label>
        <Input id="name" name="name" defaultValue={skill?.name} placeholder="React" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="level">Level (0-100)</Label>
        <Input id="level" name="level" type="number" min={0} max={100} defaultValue={skill?.level ?? 50} required />
      </div>

      <Button type="submit" disabled={pending} className="mt-2 self-start">
        {pending ? "Menyimpan..." : submitLabel}
      </Button>
    </form>
  )
}
