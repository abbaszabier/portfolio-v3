import type { Locale } from "@/lib/i18n/locales"

export type ProjectTranslation = {
  name: string
  description: string
  whatIDid: string[]
}

export type Project = {
  id: string
  translations: Record<Locale, ProjectTranslation>
  techStack: string[]
  link: string
  image: string
  platform: string
}

export type LocalizedProject = {
  id: string
  name: string
  description: string
  whatIDid: string[]
  techStack: string[]
  link: string
  image: string
  platform: string
}

export type Skill = {
  id: string
  category: "Frontend" | "Backend" | "Tools"
  name: string
  level: number
}

export type ExperienceTranslation = {
  role: string
  period: string
  type: string
  description: string
}

export type Experience = {
  id: string
  company: string
  translations: Record<Locale, ExperienceTranslation>
  techStack: string[]
}

export type LocalizedExperience = {
  id: string
  role: string
  company: string
  period: string
  type: string
  description: string
  techStack: string[]
}
