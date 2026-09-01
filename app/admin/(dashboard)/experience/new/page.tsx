import { ExperienceForm } from "@/components/admin/experience-form"
import { createExperience } from "../actions"

export default function NewExperiencePage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold tracking-tight">Tambah Pengalaman</h1>
      <div className="mt-6">
        <ExperienceForm action={createExperience} submitLabel="Simpan Pengalaman" />
      </div>
    </div>
  )
}
