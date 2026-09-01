import { SkillForm } from "@/components/admin/skill-form"
import { createSkill } from "../actions"

export default function NewSkillPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold tracking-tight">Tambah Skill</h1>
      <div className="mt-6">
        <SkillForm action={createSkill} submitLabel="Simpan Skill" />
      </div>
    </div>
  )
}
