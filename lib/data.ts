import projectsData from "@/data/projects.json"
import skillsData from "@/data/skills.json"
import experiencesData from "@/data/experiences.json"
import type {
  Project,
  Skill,
  Experience,
  LocalizedProject,
  LocalizedExperience,
} from "@/lib/types"
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales"

export function getProjects(): Project[] {
  return projectsData as Project[]
}

export function getLocalizedProjects(locale: Locale): LocalizedProject[] {
  return getProjects().map((project) => {
    const t = project.translations[locale] ?? project.translations[DEFAULT_LOCALE]
    return {
      id: project.id,
      name: t.name,
      description: t.description,
      whatIDid: t.whatIDid,
      techStack: project.techStack,
      link: project.link,
      image: project.image,
      platform: project.platform,
    }
  })
}

export function getSkills(): Skill[] {
  return skillsData as Skill[]
}

export function getExperiences(): Experience[] {
  return experiencesData as Experience[]
}

export function getLocalizedExperiences(locale: Locale): LocalizedExperience[] {
  return getExperiences().map((experience) => {
    const t = experience.translations[locale] ?? experience.translations[DEFAULT_LOCALE]
    return {
      id: experience.id,
      company: experience.company,
      techStack: experience.techStack,
      ...t,
    }
  })
}
