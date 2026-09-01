import { notFound } from "next/navigation"
import { getSkills } from "@/lib/data"
import { SkillForm } from "@/components/admin/skill-form"
import { updateSkill } from "../actions"

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const skill = getSkills().find((s) => s.id === id)

  if (!skill) notFound()

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold tracking-tight">Edit Skill</h1>
      <div className="mt-6">
        <SkillForm skill={skill} action={updateSkill.bind(null, id)} submitLabel="Simpan Perubahan" />
      </div>
    </div>
  )
}
