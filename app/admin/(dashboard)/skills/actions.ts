"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { randomUUID } from "crypto"
import { readJsonFile, commitJsonFile } from "@/lib/github"
import { LOCALES } from "@/lib/i18n/locales"
import type { Skill } from "@/lib/types"

const FILE_PATH = "data/skills.json"

function revalidatePublicPaths() {
  revalidatePath("/admin/skills")
  for (const locale of LOCALES) {
    revalidatePath(`/${locale}/about`)
  }
}

const CATEGORIES: Skill["category"][] = ["Frontend", "Backend", "Tools"]

function parseForm(formData: FormData) {
  const level = Number(formData.get("level"))
  const category = String(formData.get("category") || "").trim()
  return {
    category: CATEGORIES.includes(category as Skill["category"])
      ? (category as Skill["category"])
      : "Frontend",
    name: String(formData.get("name") || "").trim(),
    level: Number.isFinite(level) ? Math.min(100, Math.max(0, level)) : 0,
  }
}

export async function createSkill(_prevState: { error?: string } | undefined, formData: FormData) {
  const fields = parseForm(formData)
  if (!fields.name || !fields.category) return { error: "Kategori dan nama skill wajib diisi." }

  try {
    const { data, sha } = await readJsonFile<Skill[]>(FILE_PATH)
    const newSkill: Skill = { id: randomUUID(), ...fields }
    await commitJsonFile(FILE_PATH, [...data, newSkill], sha, `chore: add skill ${fields.name}`)
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Gagal menyimpan skill." }
  }

  revalidatePublicPaths()
  redirect("/admin/skills")
}

export async function updateSkill(
  id: string,
  _prevState: { error?: string } | undefined,
  formData: FormData
) {
  const fields = parseForm(formData)
  if (!fields.name || !fields.category) return { error: "Kategori dan nama skill wajib diisi." }

  try {
    const { data, sha } = await readJsonFile<Skill[]>(FILE_PATH)
    const updated = data.map((s) => (s.id === id ? { ...s, ...fields } : s))
    await commitJsonFile(FILE_PATH, updated, sha, `chore: update skill ${fields.name}`)
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Gagal menyimpan skill." }
  }

  revalidatePublicPaths()
  redirect("/admin/skills")
}

export async function deleteSkill(id: string) {
  const { data, sha } = await readJsonFile<Skill[]>(FILE_PATH)
  const target = data.find((s) => s.id === id)
  const remaining = data.filter((s) => s.id !== id)
  await commitJsonFile(FILE_PATH, remaining, sha, `chore: remove skill ${target?.name ?? id}`)

  revalidatePublicPaths()
}
