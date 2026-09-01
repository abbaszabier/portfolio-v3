"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { randomUUID } from "crypto"
import { readJsonFile, commitJsonFile } from "@/lib/github"
import { LOCALES, type Locale } from "@/lib/i18n/locales"
import type { Experience, ExperienceTranslation } from "@/lib/types"

const FILE_PATH = "data/experiences.json"

function parseForm(formData: FormData) {
  const translations = {} as Record<Locale, ExperienceTranslation>

  for (const locale of LOCALES) {
    translations[locale] = {
      role: String(formData.get(`role_${locale}`) || "").trim(),
      period: String(formData.get(`period_${locale}`) || "").trim(),
      type: String(formData.get(`type_${locale}`) || "").trim(),
      description: String(formData.get(`description_${locale}`) || "").trim(),
    }
  }

  for (const locale of LOCALES) {
    if (!translations[locale].role) translations[locale].role = translations.id.role
    if (!translations[locale].period) translations[locale].period = translations.id.period
    if (!translations[locale].type) translations[locale].type = translations.id.type
    if (!translations[locale].description) {
      translations[locale].description = translations.id.description
    }
  }

  return {
    company: String(formData.get("company") || "").trim(),
    translations,
    techStack: String(formData.get("techStack") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  }
}

function revalidatePublicPaths() {
  revalidatePath("/admin/experience")
  for (const locale of LOCALES) {
    revalidatePath(`/${locale}/about`)
  }
}

export async function createExperience(_prevState: { error?: string } | undefined, formData: FormData) {
  const fields = parseForm(formData)
  if (!fields.translations.id.role || !fields.company) {
    return { error: "Role (Indonesia) dan company wajib diisi." }
  }

  try {
    const { data, sha } = await readJsonFile<Experience[]>(FILE_PATH)
    const newExperience: Experience = { id: randomUUID(), ...fields }
    await commitJsonFile(
      FILE_PATH,
      [...data, newExperience],
      sha,
      `chore: add experience ${fields.translations.id.role}`
    )
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Gagal menyimpan pengalaman." }
  }

  revalidatePublicPaths()
  redirect("/admin/experience")
}

export async function updateExperience(
  id: string,
  _prevState: { error?: string } | undefined,
  formData: FormData
) {
  const fields = parseForm(formData)
  if (!fields.translations.id.role || !fields.company) {
    return { error: "Role (Indonesia) dan company wajib diisi." }
  }

  try {
    const { data, sha } = await readJsonFile<Experience[]>(FILE_PATH)
    const updated = data.map((e) => (e.id === id ? { ...e, ...fields } : e))
    await commitJsonFile(
      FILE_PATH,
      updated,
      sha,
      `chore: update experience ${fields.translations.id.role}`
    )
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Gagal menyimpan pengalaman." }
  }

  revalidatePublicPaths()
  redirect("/admin/experience")
}

export async function deleteExperience(id: string) {
  const { data, sha } = await readJsonFile<Experience[]>(FILE_PATH)
  const target = data.find((e) => e.id === id)
  const remaining = data.filter((e) => e.id !== id)
  await commitJsonFile(
    FILE_PATH,
    remaining,
    sha,
    `chore: remove experience ${target?.translations.id.role ?? id}`
  )

  revalidatePublicPaths()
}
