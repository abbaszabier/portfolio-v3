import { ProjectForm } from "@/components/admin/project-form"
import { createProject } from "../actions"

export default function NewProjectPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold tracking-tight">Tambah Project</h1>
      <div className="mt-6">
        <ProjectForm action={createProject} submitLabel="Simpan Project" />
      </div>
    </div>
  )
}
