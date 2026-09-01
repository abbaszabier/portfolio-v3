import { notFound } from "next/navigation"
import { getExperiences } from "@/lib/data"
import { ExperienceForm } from "@/components/admin/experience-form"
import { updateExperience } from "../actions"

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const experience = getExperiences().find((e) => e.id === id)

  if (!experience) notFound()

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold tracking-tight">Edit Pengalaman</h1>
      <div className="mt-6">
        <ExperienceForm experience={experience} action={updateExperience.bind(null, id)} submitLabel="Simpan Perubahan" />
      </div>
    </div>
  )
}
