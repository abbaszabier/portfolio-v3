"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { randomUUID } from "crypto"
import { readJsonFile, commitJsonFile } from "@/lib/github"
import { LOCALES, type Locale } from "@/lib/i18n/locales"
import type { Project, ProjectTranslation } from "@/lib/types"

const FILE_PATH = "data/projects.json"

function parseForm(formData: FormData) {
  const translations = {} as Record<Locale, ProjectTranslation>

  for (const locale of LOCALES) {
    translations[locale] = {
      name: String(formData.get(`name_${locale}`) || "").trim(),
      description: String(formData.get(`description_${locale}`) || "").trim(),
      whatIDid: String(formData.get(`whatIDid_${locale}`) || "")
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean),
    }
  }

  for (const locale of LOCALES) {
    if (!translations[locale].name) translations[locale].name = translations.id.name
    if (!translations[locale].description) {
      translations[locale].description = translations.id.description
    }
    if (translations[locale].whatIDid.length === 0) {
      translations[locale].whatIDid = translations.id.whatIDid
    }
  }

  return {
    translations,
    techStack: String(formData.get("techStack") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    link: String(formData.get("link") || "").trim(),
    image: String(formData.get("image") || "").trim(),
    platform: String(formData.get("platform") || "").trim(),
  }
}

function revalidatePublicPaths() {
  revalidatePath("/admin/projects")
  for (const locale of LOCALES) {
    revalidatePath(`/${locale}`)
    revalidatePath(`/${locale}/dashboard`)
  }
}

export async function createProject(_prevState: { error?: string } | undefined, formData: FormData) {
  const fields = parseForm(formData)
  if (!fields.translations.id.name) return { error: "Nama project (Indonesia) wajib diisi." }

  try {
    const { data, sha } = await readJsonFile<Project[]>(FILE_PATH)
    const newProject: Project = { id: randomUUID(), ...fields }
    await commitJsonFile(FILE_PATH, [...data, newProject], sha, `chore: add project ${fields.translations.id.name}`)
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Gagal menyimpan project." }
  }

  revalidatePublicPaths()
  redirect("/admin/projects")
}

export async function updateProject(
  id: string,
  _prevState: { error?: string } | undefined,
  formData: FormData
) {
  const fields = parseForm(formData)
  if (!fields.translations.id.name) return { error: "Nama project (Indonesia) wajib diisi." }

  try {
    const { data, sha } = await readJsonFile<Project[]>(FILE_PATH)
    const updated = data.map((p) => (p.id === id ? { ...p, ...fields } : p))
    await commitJsonFile(FILE_PATH, updated, sha, `chore: update project ${fields.translations.id.name}`)
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Gagal menyimpan project." }
  }

  revalidatePublicPaths()
  redirect("/admin/projects")
}

export async function deleteProject(id: string) {
  const { data, sha } = await readJsonFile<Project[]>(FILE_PATH)
  const target = data.find((p) => p.id === id)
  const remaining = data.filter((p) => p.id !== id)
  await commitJsonFile(FILE_PATH, remaining, sha, `chore: remove project ${target?.translations.id.name ?? id}`)

  revalidatePublicPaths()
}
